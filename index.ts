// import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

//import { authorize as makeAuth, logout, handleRedirect, cookieKey } from './auth0'
import { globals, cookieKey } from './auth0'
import {Session, State} from './durables.js'
export {Session, State}
import cookie from 'cookie'
const {log} = console
// see the readme for more info on what these config options do!
const config = {
  // opt into automatic authorization state hydration
  hydrateState: false,
  // return responses at the edge
  originless: false,
}

export function authorizedCookie(event: Request){
  const cookieHeader = event.headers.get('Cookie')
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    console.log('bad cookie', cookieHeader)
    const cookies = cookie.parse(cookieHeader)
    if (cookies[cookieKey] != '') return true
  }
  return false
}

//point of this is to have a function  that doesnt demand user be logged in, unlike for navbar profile button for example
export function authorized(event: Request, env: env){
  return authorize(event, env, true)
}

//event is actually request
export async function authorize(event, env, verifyOnly=false) {
const {MODE} = env
const { authorize: makeAuth, logout, handleRedirect} = globals(env, event)

  const stubs = {
    user: {
        authorization: {
            userInfo: {
                sub: 'testSubId'
            }
          },
          authorized: true
    }
  }
  const isTest = MODE == 'test'
  if (isTest) return stubs.user

  try {
    //original coded expected worker event
    //and wanted non-worktop event
    // let {body, ...other} = event
    // let request = new Request(event.url, {
    // //   ...event, body: await event.body()})
    // // request = new Request(event.url, {
    //     ...other})
        
    // event = request
    let request = event
    console.log('makeauth',)
    const [authorized, authorization, redirectUrl] = await makeAuth(event)
    console.log('stuck makeauth?')
    if (authorized && authorization.accessToken) {
      
      request = new Request(request, {
        headers: {
          Authorization: `Bearer ${authorization.accessToken}`,
        },
      })
    }
 
    let response = new Response(null)
    const url = new URL(request.url)
    console.log('auth', url.pathname)
    if (url.pathname === '/auth') {
      log('auth true')
      const authorizedResponse = await handleRedirect(event)
      
      if (!authorizedResponse) {
        log('failed')
        return new Response('Unauthorized', { status: 401 })
      }
      console.log(authorizedResponse, response.body)
      response = new Response(response.body, {
        ...response,
        ...authorizedResponse,
      })

      return response
    }
    if (!authorized && !verifyOnly) {
      const url = new URL(event.url)
      let path = url.pathname + url.search
      if (path == '/login'){
        path = '/'
      }
      console.log('setting cookie', 33333, path)
      return new Response('', {
        status: 302,
        headers: {
          'Location': 'https://' + redirectUrl,
          'Set-cookie': `loginRedirect="${path}"; HttpOnly; Secure; SameSite=Lax; Path=/`,
        },
      })
    }

    const logoutHeaders = {'Location': '/'}

    if (url.pathname === '/logout') {
      const { headers } = logout(event)
      const merged = Object.assign({}, logoutHeaders, headers)
      console.log(merged)
      return new Response(response.body, {
            status: 302,
            headers: merged
          })
    }
    if (authorized){
      return  {authorized, authorization}
    } else {
      return {authorized}
    }
    
  } catch (err) {
    console.log(err)
    return new Response(err.toString())
  }
}