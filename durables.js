import { IttyDurable } from 'itty-durable'

export class State extends IttyDurable {
    constructor(state, env) {
      super(state, env)
      this.origin= {created: false, url: '/'}
    //   this.state=state
    // //   this.state.blockConcurrencyWhile(async () => {
    // //     let stored = await this.state.storage.get("origin");
    // //     this.origin = stored || '/';
    // // })
    }
  
    set(o) {
      // this.state.storage.put('origin', o)
      console.log('url',99999, new URL(o.url))
      try {
      const url = new URL(o.url)
      o.url = url.pathname + url.search
      console.log('new url', o.url)
      if (o.url == '/login'){
        o.url = '/'
      }
      
      this.origin = o
      return o
      } catch (e){
        console.log(e)
        
      }
    }

    read(){
      return this.origin
    }
  }

  export class Session extends IttyDurable {
    constructor(state, env) {
      super(state, env)
      this.session = 0
      // this.state = state
      // this.state.blockConcurrencyWhile(async () => {
      //   let stored = await this.state.storage.get("session");
      //   this.session = stored || null;
    // })
    }
  
    set(o) {
      // this.state.storage.put('session', o)
      this.session = o
    }
    read(){
      return this.session
    }
  }