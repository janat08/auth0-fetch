import cookie from 'cookie'
import {jwtVerify, flattenedVerify, generalVerify} from 'jose'
import {TokenResponse} from 'auth0'
import {SESSIONInterface} from './durables'
export const cookieKey = 'AUTH0-AUTH'

const {log} = console
export type env = {
  STATE: DurableObjectNamespace;
  SESSION: DurableObjectNamespace;
  MODE: 'dev' | 'production'
  AUTH0RS256SIGNATURE: string;
  AUTHREDIRECTPRODUCTION: string;
  AUTHREDIRECT: string
  AUTH0ID: string
  AUTH0DOMAIN: string
  AUTH0SECRET: string
  SALT: string
}


export function globals({MODE, ...env}: env, request2: Request<any>){
const {SESSION, STATE, AUTH0RS256SIGNATURE} = env

const devBase = env.AUTHREDIRECT
const callbackBase = MODE != 'production'? devBase : env.AUTHREDIRECTPRODUCTION
const auth0 = {
  domain: env.AUTH0DOMAIN,
  clientId: env.AUTH0ID,
  clientSecret: env.AUTH0SECRET,
  callbackUrl: callbackBase + "/auth",
}

const AUTH0_DOMAIN = "https://" + auth0.domain 
const AUTH0_CLIENT_ID = auth0.clientId
const generateStateParam = async () => {
  const id = STATE.newUniqueId()
  const obj = STATE.get(id)
  const resp = await obj.fetch('/created')
  return id.toString() 
} 

const exchangeCode = async (code: string) => {
  const body = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: auth0.clientId,
    client_secret: auth0.clientSecret,
    code,
    redirect_uri: auth0.callbackUrl,
  })
  if(!auth0.clientId || !auth0.clientSecret ||  !auth0.callbackUrl){
    throw new Error('auth0 client or secret undefined')
  }
  const res = await fetch(AUTH0_DOMAIN + '/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  })
  return persistAuth(
    res
  )
}

// https://github.com/pose/webcrypto-jwt/blob/master/index.js
const decodeJWT = function(token: string) {
  var output = token
    .split('.')[1]
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  switch (output.length % 4) {
    case 0:
      break
    case 2:
      output += '=='
      break
    case 3:
      output += '='
      break
    default:
      throw 'Illegal base64url string!'
  }

  const result = atob(output)

  try {
    return decodeURIComponent(escape(result))
  } catch (err) {
    console.log(err)
    return result
  }
}

const validateToken = (token: any) => {
  try {
    const dateInSecs = d => Math.ceil(Number(d) / 1000)
    const date = new Date()

    let iss = token.iss

    // ISS can include a trailing slash but should otherwise be identical to
    // the AUTH0_DOMAIN, so we should remove the trailing slash if it exists
    iss = iss.endsWith('/') ? iss.slice(0, -1) : iss

    if (iss !== AUTH0_DOMAIN) {
      throw new Error(
        `Token iss value (${iss}) doesn't match AUTH0_DOMAIN (${AUTH0_DOMAIN})`,
      )
    }

    if (token.aud !== AUTH0_CLIENT_ID) {
      throw new Error(
        `Token aud value (${token.aud}) doesn't match AUTH0_CLIENT_ID (${AUTH0_CLIENT_ID})`,
      )
    }

    if (token.exp < dateInSecs(date)) {
      throw new Error(`Token exp value is before current time`)
    }

    // Token should have been issued within the last day
    date.setDate(date.getDate() - 1)
    if (token.iat < dateInSecs(date)) {
      throw new Error(`Token was issued before one day ago and is now invalid`)
    }

    return true
  } catch (err) {
    console.log(err.message)
    return false
  }
}

const persistAuth = async (exchange: Response) => {
  const body: TokenResponse | {error: string} = await exchange.json()
  if ("error" in body) {
    console.log('err body', body)
    throw new Error(body.error)
  }
  log(body)
  //https://github.com/panva/jose/blob/664279d468a508635c55c2c466a207790ce13ed7/docs/interfaces/jwt_verify.JWTVerifyOptions.md
  const validationOptions = {

  }
  // const { payload, protectedHeader } = await jwtVerify(atob(body.access_token), AUTH0RS256SIGNATURE)
  // const { payload: decoded } = await jwtVerify(atob(body.id_token), AUTH0RS256SIGNATURE)
  // const { payload, protectedHeader } = await flattenedVerify(body.access_token, AUTH0RS256SIGNATURE)
  // const { payload: decoded } = await flattenedVerify(body.id_token, AUTH0RS256SIGNATURE)
  //  const { payload, protectedHeader } = await generalVerify(body.access_token, AUTH0RS256SIGNATURE)
  //  const { payload: decoded } = await generalVerify(body.id_token, AUTH0RS256SIGNATURE)
  
  
  const decoded = JSON.parse(decodeJWT(body.id_token))
  
  const validToken = validateToken(decoded)
  if (!validToken) {
    return { status: 401 }
  }
  // log('decoded', decoded, payload)
  log(body.access_token)
  // log('access decoded', body.access_token, decodeJWT(body.access_token)+"", JSON.parse(decodeJWT(body.access_token)))
  if (!env.SALT){
    throw new Error('SALT undefined for auth0')
  }
  const text = new TextEncoder().encode(`${env.SALT}-${decoded.sub}`)
  const digest = await crypto.subtle.digest({ name: 'SHA-256' }, text)
  const digestArray = new Uint8Array(digest)
  const id = btoa(String.fromCharCode.apply(null, digestArray))
  const idSession = SESSION.idFromName(id)
  const obj = SESSION.get(idSession)
  const resp: <SESSIONInterface> = await obj.fetch('/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  const cookieHeader = request2.headers.get('Cookie') || ''
    const cookies = cookie.parse(cookieHeader)
    let path = cookies['loginRedirect'] || '/'
    //endOfLife value is determined by auth0 session rules so that they're in sync
    log('setting cookie')
    const headers = {
    Location: path,
    'Set-cookie': `${cookieKey}=${id}; Secure; HttpOnly; SameSite=Lax; Expires=${new Date(resp.endOfLife).toUTCString()}`,
    // 'Set-cookie': `loginRedirect=/`
  }

  return { headers, status: 302 }
}

const redirectUrl = state =>
  `${auth0.domain}/authorize?response_type=code&client_id=${
    auth0.clientId
  }&redirect_uri=${
    auth0.callbackUrl
  }&scope=openid%20profile%20email&state=${state}`

 const handleRedirect = async request => {
  const url = new URL(request.url)

  const state = url.searchParams.get('state')
  if (!state) {
    return null
  }

  const obj = await STATE.get(STATE.idFromString(state))//.toJSON().then(x=>x.json())
  const resp = await obj.fetch('/').then(x=>x.json())
  if (!resp) {
    log('failed state restore', resp)
    return null
  }
  
  const code = url.searchParams.get('code')
  if (code) {
    log('exchanging code')
    return exchangeCode(code)
  }

  return null
}

const verify = async request => {
  const cookieHeader = request.headers.get('Cookie')
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    const cookies = cookie.parse(cookieHeader)
    if (!cookies[cookieKey]) return {}
    const sub = cookies[cookieKey]
    const id= SESSION.idFromName(sub)
    const obj = await SESSION.get(id)
    const {session: kvStored} = await obj.fetch('/').then(x=>x.json())

    if (!kvStored) {
      throw new Error('Unable to find authorization data')
    }

    const { access_token: accessToken, id_token: idToken } = kvStored
    const userInfo = JSON.parse(decodeJWT(idToken))
    log('acces token', accessToken, decodeJWT(accessToken))
    return { accessToken, idToken, userInfo }
  }
  return {}
}

 const authorize = async (event: Request<any>): Promise<[true, typeof authorization, null] | [false, null, string]> => {
  const authorization = await verify(event)
  if (authorization.accessToken) {
    return [true, authorization , null]
  } else {
    const state = await generateStateParam()
    return [false, null, redirectUrl(state) ]
  }
}

 const logout = request => {
  const cookieHeader = request.headers.get('Cookie')
    return {
      headers: {
        'Location': `https://${auth0.domain}/v2/logout?client_id=${
          auth0.clientId}&returnTo=${
          callbackBase
          }`,
        'Set-cookie': `${cookieKey}=""; HttpOnly; Secure; SameSite=Lax;Path=/;`,
      },
    }
}
return {logout, cookieKey, authorize, handleRedirect, verify}
}
const validateToken = ()=>{}
export {validateToken}