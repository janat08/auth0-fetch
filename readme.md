## Fetch based library for cloudflare workers with sessions based on durable objects (which requires premium subscription.)

Based on work from cf worker guide with some fixes that make it more production worthy: https://developers.cloudflare.com/workers/tutorials/authorize-users-with-auth0

- [Fetch based library for cloudflare workers with sessions based on durable objects (which requires premium subscription.)](#fetch-based-library-for-cloudflare-workers-with-sessions-based-on-durable-objects-which-requires-premium-subscription)
  - [Bugfixes:](#bugfixes)
  - [Bugs:](#bugs)
- [Instructions:](#instructions)
  - [1. Have these variables in second argument passed into authorization:](#1-have-these-variables-in-second-argument-passed-into-authorization)
  - [2. In index.js:](#2-in-indexjs)
  - [3. in wrangler.toml that is configured to use esmodules (exports fetch function and doesn't handle event with a callback)](#3-in-wranglertoml-that-is-configured-to-use-esmodules-exports-fetch-function-and-doesnt-handle-event-with-a-callback)
  - [4. Basic Usage, auth route is a necessary hook](#4-basic-usage-auth-route-is-a-necessary-hook)
  - [5. Verifying user is logged in](#5-verifying-user-is-logged-in)

### Bugfixes:
- fixes exchange codes getting stored in session per user, rather then kv globally
- Stores sessions, but doesn't store userID within it
- Redirects user back to original location after verifying logged in status (which is just logging in, so not advised as it introduces extra lag)

### Bugs:
- Doesn't ever delete any of code/session durable objects while hopefully consuming the storage
- Its possible that the session isn't stored in persistent storage
- No way to indicate redirect url at login hook integrated into package
- Session expiry won't logout user from auth0 session, and paid no attention to session expiry logic written for kv and not DO
- No account linking logic (auth0 has limited support for it)

## Instructions:
### 1. Have these variables in second argument passed into authorization:
They can be configured with wrangler.toml as environment variables and secrets
- AUTH0SECRET
- MODE if 'test' returns a stub for user (always logged in), if not production returns dev redirect (localhost)
- SALT https://csprng.xyz/v1/api or read the blog above
- AUTH0ID
- AUTH0DOMAIN 
- AUTHREDIRECT = 'http://127.0.0.1:8787'
- AUTHREDIRECTPRODUCTION 

### 2. In index.js:
````js
import { authorize, Session, State } from './auth/index.js'
export {Session, State}
````
### 3. in wrangler.toml that is configured to use esmodules (exports fetch function and doesn't handle event with a callback)
````
[durable_objects]
bindings = [
  { name = "SESSION", class_name = "Session" },
  { name = "STATE", class_name = "State" }
]
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["State", "Session"]
[env.production]
name = "auth-production"
durable_objects.bindings = [
  { name = "SESSION", class_name = "Session" },
  { name = "STATE", class_name = "State" }
]
````
### 4. Basic Usage, auth route is a necessary hook
````js
API.get('/login', async (req, env)=>{
  const auth = await authorize(req,env) 
  
  if (auth.authorized === true ){
    return seeOther('/')
  }
  
  if (auth instanceof Response){
    return auth
  } else {
    return seeOther('/')
  }
   
})
//necessery route for autho0 hook, you don't have this a login doesn't work
API.get('/auth', async (req,env)=>{
  return authorize(req,env)
})
API.get('/logout', async (r,e)=>{
  const b= await authorize(r,e)
  return b
})
````
### 5. Verifying user is logged in
````js
import { authorizedCookie, authorize, authorized } from '../auth/index.js'
await authorizedCookie(environmentVariablesFromStepOne) //Returns boolean that just checks if browser sent a session cookie
  
  const auth = await authorize(req,env) //sends a respones if user isn't logged in, otherwise user data, check

  if (auth.authorized === true ){
    //do your stuff
  }
  //or
  if (auth instanceof Response){
    return auth
  } else {
    //do your stuff
  }

await authorized(req, env) //checks against auth0 session store if user is logged in, if not returns object {authorized: false}, rather then a response to login with auth0 like authorize function does
````
