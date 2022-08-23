import { Hono } from 'hono'
import {TokenResponse} from 'auth0'

const {log} = console

interface SESSIONInterface {
  session: TokenResponse | null
  created: boolean
  createdDate: Date
  endOfLife: number 
  state: DurableObjectState
  app: Hono
}

type SESSIONRead = Pick<SESSIONInterface, 'session' | 'created' | 'createdDate'>


export class State {
  created = false
  state: DurableObjectState
  app: Hono = new Hono()

  constructor(state: DurableObjectState) {
    this.state = state
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage?.get<boolean>('created')
      this.created = stored || false
    })


    this.app.get('/created', async (c) => {
      this.created = true
      await this.state.storage?.put('created', this.created)
      const dt = new Date();
      dt.setDate(dt.getDate() + 1);
      this.state.storage.setAlarm(dt)

      return c.json(this.created)
    })

    this.app.get('/', async (c) => {
      return c.json(this.created)
    })
  }

  async fetch(request: Request) {
    return this.app.fetch(request)
  }

  async alarm(){
    this.created = false
    await this.state.storage.deleteAll()
  }
}

export class Session implements SESSIONInterface  {
  session = null
  created = false
  createdDate = new Date()
  endOfLife = 360*24*60*60 + new Date().getTime()
  state
  app = new Hono()

  constructor(state: DurableObjectState) {
    this.state = state
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage?.get<any|boolean>(['created', 'session', 'createdDate', 'endOfLife'])
      this.created = stored.get('created') || false
      this.session = stored.get('session') || null
      const createdDate = stored.get('createdDate')
      if (createdDate){
        this.createdDate = createdDate
      } else {
        await this.state.storage?.put('createdDate', this.createdDate)
      }
      this.endOfLife = stored.get('endOfLife') || 360*24*60*60 + new Date().getTime()
    })

    this.app.post('/', async (c) => {
      const body: TokenResponse = await c.req.parseBody()
      if (this.created == false){
        this.created = true
        await this.state.storage?.put('created', this.created)
        const ok = this.extension(c)
        if (!ok){
          return c.notFound()
        }
      }
      this.state.storage?.put('session', body)
      this.session = body
      console.log('recieved', body)
      const response: SESSIONRead = {createdDate: this.createdDate, created: this.created, session: this.session}
      return c.json(response)
    })
    this.app.get('/', async (c) => {
      const ok = this.extension(c)
      if (ok){
        const response: SESSIONRead = {createdDate: this.createdDate, created: this.created, session: this.session}
        return c.json(response)
      } else {
        return c.notFound()
      }
    })
  }
  async fetch(request: Request) {
    return this.app.fetch(request)
  }

  async alarm(){
    this.reset()
  }
  async reset(){
    this.session = null
    this.created = false
    this.createdDate = null
    await this.state.storage.deleteAll()
  }
  //auth0 has point at which extendion session is impossible
  extension(c){
    const days = 24*60
    const extension = new Date();
    const exp = c.env.AUTH0EXPIRY*1
    const relo = c.env.AUTH0MANDATORYRELOG*1
    if(exp== 0 || relo==0 || isNaN(relo) || isNaN(exp)){
      return true
    }
    extension.setDate(extension.getDate() + exp/days);
    const origin = this.createdDate
    const endOfLife = new Date(origin.setDate(origin.getDate() + relo/days))
    if (endOfLife<extension){
      this.reset()
      return false
    }
    this.state.storage.setAlarm(extension)
    this.endOfLife = extension.getTime()
    return true
  }
}
