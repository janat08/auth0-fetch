import { createDurable } from 'itty-durable'
import { Hono } from 'hono'
const {log} = console
export class State {
  created: boolean = false
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
      var dt = new Date();
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
4320
export class Session  {
  session: any = null
  created: boolean = false
  state: DurableObjectState
  app: Hono = new Hono()

  constructor(state: DurableObjectState) {
    this.state = state
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage?.get<any|boolean>(['created', 'session'])
      this.created = stored.get('created') || false
      this.session = stored.get('session') || null
    })

    this.app.post('/', async (c) => {
      const body = await c.req.parseBody()
      if (this.created == false){
        this.created = true
        await this.state.storage?.put('created', this.created)
        var dt = new Date();
        dt.setDate(dt.getDate() + 3);
        this.state.storage.setAlarm(dt)
      }
      this.state.storage.put('session', body)
      this.session = body
      console.log('recieved', body)
      return c.json(body)
    })
    this.app.get('/', async (c) => {
      log('durable state replying for durable session')
      return c.json({session: this.session, created: this.created})
    })
  }
  async fetch(request: Request) {
    return this.app.fetch(request)
  }

  async alarm(){
    this.session = null
    this.created = false
    await this.state.storage.deleteAll()
  }
}


// export class State extends createDurable({autoPersist: false}) {
//   constructor(...args) {
//     super(...args)
//     this.created = false
//   }

//   created(o) {
//     this.created = true
//     return this.created
//   }
// }

  // export class Session extends createDurable({autoPersist: true}) {
  //   constructor(state, env) {
  //     super(state, env)
  //   }
  
  //   set(o) {
  //     // this.state.storage.put('session', o)
  //     this.session = o
  //     return
  //   }
  //   read(){
  //     return this.session
  //   }
  // }