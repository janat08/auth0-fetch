var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/itty-router/dist/itty-router.min.js
var require_itty_router_min = __commonJS({
  "node_modules/itty-router/dist/itty-router.min.js"(exports, module) {
    module.exports = { Router: ({ base: p = "", routes: u = [] } = {}) => ({ __proto__: new Proxy({}, { get: (e, a, o) => (e2, ...r) => u.push([a.toUpperCase(), RegExp(`^${(p + e2).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), r]) && o }), routes: u, async handle(e, ...r) {
      let a, o, p2 = new URL(e.url);
      e.query = Object.fromEntries(p2.searchParams);
      for (var [t, s, c] of u)
        if ((t === e.method || t === "ALL") && (o = p2.pathname.match(s))) {
          e.params = o.groups;
          for (var l of c)
            if ((a = await l(e.proxy || e, ...r)) !== void 0)
              return a;
        }
    } }) };
  }
});

// node_modules/itty-router-extras/middleware/withContent.js
var require_withContent = __commonJS({
  "node_modules/itty-router-extras/middleware/withContent.js"(exports, module) {
    var withContent = async (t) => {
      let n = t.headers.get("content-type");
      t.content = void 0;
      try {
        n && n.includes("application/json") && (t.content = await t.json());
      } catch (t2) {
      }
    };
    module.exports = { withContent };
  }
});

// node_modules/itty-router-extras/middleware/withCookies.js
var require_withCookies = __commonJS({
  "node_modules/itty-router-extras/middleware/withCookies.js"(exports, module) {
    var withCookies = (o) => {
      o.cookies = {};
      try {
        o.cookies = (o.headers.get("Cookie") || "").split(/;\s*/).map((o2) => o2.split("=")).reduce((o2, [e, i]) => (o2[e] = i, o2), {});
      } catch (o2) {
      }
    };
    module.exports = { withCookies };
  }
});

// node_modules/itty-router-extras/middleware/withParams.js
var require_withParams = __commonJS({
  "node_modules/itty-router-extras/middleware/withParams.js"(exports, module) {
    var withParams = (a) => {
      for (const s in a.params || {})
        a[s] = a.params[s];
    };
    module.exports = { withParams };
  }
});

// node_modules/itty-router-extras/middleware/index.js
var require_middleware = __commonJS({
  "node_modules/itty-router-extras/middleware/index.js"(exports, module) {
    module.exports = { ...require_withContent(), ...require_withCookies(), ...require_withParams() };
  }
});

// node_modules/itty-router-extras/response/createResponseType.js
var require_createResponseType = __commonJS({
  "node_modules/itty-router-extras/response/createResponseType.js"(exports, module) {
    var createResponseType = (e = "text/plain; charset=utf-8") => (s, t = {}) => {
      const { headers: n = {}, ...o } = t;
      return typeof s == "object" ? new Response(JSON.stringify(s), { headers: { "Content-Type": e, ...n }, ...o }) : new Response(s, t);
    };
    module.exports = { createResponseType };
  }
});

// node_modules/itty-router-extras/response/json.js
var require_json = __commonJS({
  "node_modules/itty-router-extras/response/json.js"(exports, module) {
    var { createResponseType } = require_createResponseType();
    var json = createResponseType("application/json; charset=utf-8");
    module.exports = { json };
  }
});

// node_modules/itty-router-extras/response/error.js
var require_error = __commonJS({
  "node_modules/itty-router-extras/response/error.js"(exports, module) {
    var { json } = require_json();
    var error = (r = 500, o = "Internal Server Error.") => json({ ...typeof o == "object" ? o : { status: r, error: o } }, { status: r });
    module.exports = { error };
  }
});

// node_modules/itty-router-extras/response/missing.js
var require_missing = __commonJS({
  "node_modules/itty-router-extras/response/missing.js"(exports, module) {
    var { error } = require_error();
    var missing = (r = "Not found.") => error(404, r);
    module.exports = { missing };
  }
});

// node_modules/itty-router-extras/response/status.js
var require_status = __commonJS({
  "node_modules/itty-router-extras/response/status.js"(exports, module) {
    var { json } = require_json();
    var status = (s, t) => t ? json({ ...typeof t == "object" ? t : { status: s, message: t } }, { status: s }) : new Response(null, { status: s });
    module.exports = { status };
  }
});

// node_modules/itty-router-extras/response/text.js
var require_text = __commonJS({
  "node_modules/itty-router-extras/response/text.js"(exports, module) {
    var text = (e, t = {}) => new Response(e, t);
    module.exports = { text };
  }
});

// node_modules/itty-router-extras/response/index.js
var require_response = __commonJS({
  "node_modules/itty-router-extras/response/index.js"(exports, module) {
    module.exports = { ...require_error(), ...require_json(), ...require_missing(), ...require_status(), ...require_text() };
  }
});

// node_modules/itty-router-extras/router/ThrowableRouter.js
var require_ThrowableRouter = __commonJS({
  "node_modules/itty-router-extras/router/ThrowableRouter.js"(exports, module) {
    "use strict";
    var { Router } = require_itty_router_min();
    var { error } = require_response();
    var ThrowableRouter = (r = {}) => {
      const { stack: e = false } = r;
      return new Proxy(Router(r), { get: (r2, t) => (...o) => t === "handle" ? r2[t](...o).catch((r3) => error(r3.status || 500, { status: r3.status || 500, error: r3.message, stack: e && r3.stack || void 0 })) : r2[t](...o) });
    };
    module.exports = { ThrowableRouter };
  }
});

// node_modules/itty-router-extras/router/index.js
var require_router = __commonJS({
  "node_modules/itty-router-extras/router/index.js"(exports, module) {
    module.exports = { ...require_ThrowableRouter() };
  }
});

// node_modules/itty-router-extras/classes/StatusError.js
var require_StatusError = __commonJS({
  "node_modules/itty-router-extras/classes/StatusError.js"(exports, module) {
    var StatusError = class extends Error {
      constructor(r = 500, t = "Internal Error.") {
        super(t), this.name = "StatusError", this.status = r;
      }
    };
    module.exports = { StatusError };
  }
});

// node_modules/itty-router-extras/classes/index.js
var require_classes = __commonJS({
  "node_modules/itty-router-extras/classes/index.js"(exports, module) {
    module.exports = { ...require_StatusError() };
  }
});

// node_modules/itty-router-extras/index.js
var require_itty_router_extras = __commonJS({
  "node_modules/itty-router-extras/index.js"(exports, module) {
    module.exports = { ...require_middleware(), ...require_response(), ...require_router(), ...require_classes() };
  }
});

// node_modules/itty-durable/proxy-durable.js
var require_proxy_durable = __commonJS({
  "node_modules/itty-durable/proxy-durable.js"(exports, module) {
    var { json, StatusError } = require_itty_router_extras();
    var transformResponse = (t) => {
      try {
        return t.json();
      } catch (t2) {
      }
      try {
        return t.text();
      } catch (t2) {
      }
      return t;
    };
    var proxyDurable2 = (t, r = {}) => {
      if (!t || !t.idFromName)
        throw new StatusError(500, `${r.name || "That"} is not a valid Durable Object binding.`);
      return { get: (e, o = {}) => {
        o = { ...r, ...o };
        try {
          typeof e == "string" && (e = t.idFromName(e));
          const r2 = t.get(e), n = typeof o.class == "function" && new o.class(), s = (t2) => t2 !== "fetch" && (!n || typeof n[t2] == "function"), a = (t2, r3, e2) => new Request(`https://itty-durable/${t2}/${r3}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e2) }), u = (t2, r3, e2, n2) => {
            const s2 = t2.fetch(a(r3, e2, n2));
            return o.parse ? s2.then(transformResponse) : s2;
          };
          return new Proxy(r2, { get: (t2, r3) => s(r3) ? (...e2) => u(t2, "call", r3, e2) : u(t2, "get-prop", r3), set: (t2, r3, e2) => u(t2, "set", r3, e2) });
        } catch (t2) {
          throw new StatusError(500, t2.message);
        }
      } };
    };
    module.exports = { proxyDurable: proxyDurable2 };
  }
});

// node_modules/itty-durable/itty-durable.js
var require_itty_durable = __commonJS({
  "node_modules/itty-durable/itty-durable.js"(exports, module) {
    var { Router } = require_itty_router_min();
    var { error, json, withParams, withContent, StatusError } = require_itty_router_extras();
    var { proxyDurable: proxyDurable2 } = require_proxy_durable();
    var createIttyDurable = (t = {}) => {
      const { persistOnChange: e = true, alwaysReturnThis: s = true, onError: r = (t2) => error(t2.status || 500, t2.message) } = t;
      return class {
        constructor(t2 = {}, e2 = {}) {
          this.state = { defaultState: void 0, ...e2, ...t2 }, this.storage = t2.storage;
          for (const [t3, s3] of Object.entries(e2))
            this.state[t3] = typeof s3.idFromName == "function" ? proxyDurable2(s3, { name: t3, parse: true }) : s3;
          this.router = Router();
          const s2 = new Proxy(this, { get: (t3, e3, s3) => typeof t3[e3] == "function" ? t3[e3].bind(s3) : t3[e3], set: (t3, e3, s3) => (t3[e3] !== s3 && (this.state.isDirty = true), t3[e3] = s3, true) });
          return this.router.post("/:action/:target", withParams, withContent, async (t3, e3) => {
            const { action: r2, target: i, content: a = [] } = t3;
            if (r2 === "call") {
              if (typeof this[i] != "function")
                throw new StatusError(500, `Durable Object ${this.constructor.name} does not contain method ${i}()`);
              const t4 = await s2[i](...a);
              if (t4 !== void 0)
                return t4 instanceof Response ? t4 : json(t4);
            } else if (r2 === "set")
              s2[i] = a;
            else if (r2 === "get-prop")
              return json(await s2[i]);
          }, s2.optionallyPersist, s2.optionallyReturnThis), s2;
        }
        getPersistable() {
          const { state: t2, storage: e2, router: s2, ...r2 } = this;
          return r2;
        }
        async persist() {
          this.state.isDirty && await this.storage.put("data", this.getPersistable());
        }
        async loadFromStorage() {
          const t2 = await this.storage.get("data") || {};
          Object.assign(this, t2), this.state.isDirty = false;
        }
        async initialize() {
          this.state.initializePromise || (this.state.defaultState = JSON.stringify(this.getPersistable()), this.state.initializePromise = this.loadFromStorage().catch((t2) => {
            throw this.state.initializePromise = void 0, t2;
          })), await this.state.initializePromise;
        }
        async fetch(...t2) {
          return await this.initialize(), this.state.isDirty = false, await this.router.handle(...t2).catch(r) || error(400, "Bad request to durable object");
        }
        async optionallyPersist(t2, s2 = {}, r2 = {}) {
          e && (r2.waitUntil ? r2.waitUntil(this.persist()) : await this.persist());
        }
        reset() {
          for (const t2 in this.getPersistable())
            Reflect.deleteProperty(this, t2);
          Object.assign(this, JSON.parse(this.state.defaultState));
        }
        async destroy(t2 = {}) {
          const { reset: e2 = false } = t2;
          await this.storage.deleteAll(), e2 && this.reset();
        }
        optionallyReturnThis() {
          if (s)
            return json(this.toJSON ? this.toJSON() : this);
        }
        toJSON() {
          return this.getPersistable();
        }
      };
    };
    var IttyDurable2 = createIttyDurable();
    module.exports = { createIttyDurable, IttyDurable: IttyDurable2 };
  }
});

// node_modules/itty-durable/with-durables.js
var require_with_durables = __commonJS({
  "node_modules/itty-durable/with-durables.js"(exports, module) {
    var { proxyDurable: proxyDurable2 } = require_proxy_durable();
    var { StatusError, json } = require_itty_router_extras();
    var isDurable = (r) => typeof r.idFromName == "function";
    var withDurables = (r = {}) => (e, s) => {
      const { parse: t = false, classes: o = {} } = r;
      e.durables = e.durables || {};
      for (const [r2, t2] of Object.entries(s))
        if (isDurable(t2)) {
          const s2 = proxyDurable2(t2, { name: r2, class: o[r2] });
          try {
            e[r2] = e.durables[r2] = s2;
          } catch (e2) {
            throw new StatusError(500, `Could not set Durable binding "${r2}" on Request`);
          }
        }
    };
    module.exports = { withDurables };
  }
});

// node_modules/itty-durable/index.js
var require_itty_durable2 = __commonJS({
  "node_modules/itty-durable/index.js"(exports, module) {
    module.exports = { ...require_itty_durable(), ...require_with_durables(), ...require_proxy_durable() };
  }
});

// auth0.js
var import_cookie = __toModule(require_cookie());
var import_itty_durable = __toModule(require_itty_durable2());
var cookieKey = "AUTH0-AUTH";
function globals({ kv, MODE, ...env }, request2) {
  const { SESSION, STATE } = env;
  const SEDO = (0, import_itty_durable.proxyDurable)(SESSION);
  const STDO = (0, import_itty_durable.proxyDurable)(STATE);
  const AUTH_STORE = kv;
  const devBase = env.AUTHREDIRECT;
  const callbackBase = MODE != "production" ? devBase : env.AUTHREDIRECTPRODUCTION;
  const auth0 = {
    domain: env.AUTH0DOMAIN,
    clientId: env.AUTH0ID,
    clientSecret: env.AUTH0SECRET,
    callbackUrl: callbackBase + "/auth"
  };
  const AUTH0_DOMAIN = "https://" + auth0.domain;
  const AUTH0_CLIENT_ID = auth0.clientId;
  const generateStateParam = async () => {
    const resp = await fetch("https://csprng.xyz/v1/api");
    const { Data: state } = await resp.json();
    const nada = await request2.STATE.get(`state-${state}`).set({ url: request2.url, created: true }).then((x) => x.json());
    console.log("1.11", state, nada, request2.url);
    return state;
  };
  const exchangeCode = async (code) => {
    const body = JSON.stringify({
      grant_type: "authorization_code",
      client_id: auth0.clientId,
      client_secret: auth0.clientSecret,
      code,
      redirect_uri: auth0.callbackUrl
    });
    const res = await fetch(AUTH0_DOMAIN + "/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body
    });
    return persistAuth(res);
  };
  const decodeJWT = function(token) {
    var output = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }
    const result = atob(output);
    try {
      return decodeURIComponent(escape(result));
    } catch (err) {
      console.log(err);
      return result;
    }
  };
  const validateToken = (token) => {
    try {
      const dateInSecs = (d) => Math.ceil(Number(d) / 1e3);
      const date = new Date();
      let iss = token.iss;
      iss = iss.endsWith("/") ? iss.slice(0, -1) : iss;
      if (iss !== AUTH0_DOMAIN) {
        throw new Error(`Token iss value (${iss}) doesn't match AUTH0_DOMAIN (${AUTH0_DOMAIN})`);
      }
      if (token.aud !== AUTH0_CLIENT_ID) {
        throw new Error(`Token aud value (${token.aud}) doesn't match AUTH0_CLIENT_ID (${AUTH0_CLIENT_ID})`);
      }
      if (token.exp < dateInSecs(date)) {
        throw new Error(`Token exp value is before current time`);
      }
      date.setDate(date.getDate() - 1);
      if (token.iat < dateInSecs(date)) {
        throw new Error(`Token was issued before one day ago and is now invalid`);
      }
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };
  const persistAuth = async (exchange) => {
    const body = await exchange.json();
    if (body.error) {
      console.log("err", body);
      throw new Error(body.error);
    }
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const decoded = JSON.parse(decodeJWT(body.id_token));
    const validToken = validateToken(decoded);
    if (!validToken) {
      return { status: 401 };
    }
    const text = new TextEncoder().encode(`${env.SALT}-${decoded.sub}`);
    const digest = await crypto.subtle.digest({ name: "SHA-256" }, text);
    const digestArray = new Uint8Array(digest);
    const id = btoa(String.fromCharCode.apply(null, digestArray));
    await request2.SESSION.get(id).set(JSON.stringify(body));
    const cookieHeader = request2.headers.get("Cookie");
    const cookies = import_cookie.default.parse(cookieHeader);
    let path = cookies["loginRedirect"];
    console.log("cookies", 33333, path, cookies);
    const headers = {
      Location: path,
      "Set-cookie": `${cookieKey}=${id}; Secure; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}`
    };
    return { headers, status: 302 };
  };
  const redirectUrl = (state) => `${auth0.domain}/authorize?response_type=code&client_id=${auth0.clientId}&redirect_uri=${auth0.callbackUrl}&scope=openid%20profile%20email&state=${encodeURIComponent(state)}`;
  const handleRedirect = async (request) => {
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    if (!state) {
      return null;
    }
    console.log(1.1);
    const storedState = await request2.STATE.get(`state-${state}`).toJSON().then((x) => x.json()).then((x) => x.origin);
    console.log(1.2, "slow?", storedState, state);
    if (!storedState.created) {
      console.log(3);
      return null;
    }
    const code = url.searchParams.get("code");
    if (code) {
      console.log(4, code, url);
      return exchangeCode(code);
    }
    console.log(2);
    return null;
  };
  const verify = async (request) => {
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader && cookieHeader.includes(cookieKey)) {
      const cookies = import_cookie.default.parse(cookieHeader);
      if (!cookies[cookieKey])
        return {};
      const sub = cookies[cookieKey];
      const { session: kvData } = await request2.SESSION.get(sub).toJSON().then((x) => x.json());
      if (!kvData) {
        throw new Error("Unable to find authorization data");
      }
      let kvStored;
      try {
        kvStored = JSON.parse(kvData);
      } catch (err) {
        throw new Error("Unable to parse auth information from Workers KV", err);
      }
      const { access_token: accessToken, id_token: idToken } = kvStored;
      const userInfo = JSON.parse(decodeJWT(idToken));
      return { accessToken, idToken, userInfo };
    }
    return {};
  };
  const authorize2 = async (event) => {
    const authorization = await verify(event);
    if (authorization.accessToken) {
      return [true, { authorization }];
    } else {
      const state = await generateStateParam();
      return [false, { redirectUrl: redirectUrl(state) }];
    }
  };
  const logout = (request) => {
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader && cookieHeader.includes(cookieKey)) {
      return {
        headers: {
          "Location": `https://${auth0.domain}/v2/logout?client_id=${auth0.clientId}&returnTo=${callbackBase}`,
          "Set-cookie": `${cookieKey}=""; HttpOnly; Secure; SameSite=Lax;Path=/;`
        }
      };
    }
    console.log("didnt logout, no cookie found");
    return {};
  };
  return { logout, cookieKey, authorize: authorize2, handleRedirect };
}

// durables.js
var import_itty_durable2 = __toModule(require_itty_durable2());
var State = class extends import_itty_durable2.IttyDurable {
  constructor(state, env) {
    super(state, env);
    this.origin = { created: false, url: "/" };
  }
  set(o) {
    console.log("url", 99999, new URL(o.url));
    try {
      const url = new URL(o.url);
      o.url = url.pathname + url.search;
      console.log("new url", o.url);
      if (o.url == "/login") {
        o.url = "/";
      }
      this.origin = o;
      return o;
    } catch (e) {
      console.log(e);
    }
  }
  read() {
    return this.origin;
  }
};
var Session = class extends import_itty_durable2.IttyDurable {
  constructor(state, env) {
    super(state, env);
    this.session = 0;
  }
  set(o) {
    this.session = o;
  }
  read() {
    return this.session;
  }
};

// index.js
var import_cookie2 = __toModule(require_cookie());
function authorizedCookie(event) {
  const cookieHeader = event.headers.get("Cookie");
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    const cookies = import_cookie2.default.parse(cookieHeader);
    if (cookies[cookieKey] != "")
      return true;
  }
  return false;
}
function authorized(event, env) {
  return authorize(event, env, true);
}
async function authorize(event, env, verifyOnly = false) {
  const { MODE } = env;
  const { authorize: makeAuth, logout, handleRedirect } = globals(env, event);
  const stubs = {
    user: {
      authorization: {
        userInfo: {
          sub: "testSubId"
        }
      },
      authorized: true
    }
  };
  const isTest = MODE == "test";
  if (isTest)
    return stubs.user;
  try {
    let request = event;
    console.log("makeauth");
    const [authorized2, { authorization, redirectUrl }] = await makeAuth(event);
    console.log("stuck makeauth?");
    if (authorized2 && authorization.accessToken) {
      request = new Request(request, {
        headers: {
          Authorization: `Bearer ${authorization.accessToken}`
        }
      });
    }
    let response = new Response(null);
    const url = new URL(request.url);
    console.log("auth");
    if (url.pathname === "/auth") {
      const authorizedResponse = await handleRedirect(event);
      if (!authorizedResponse) {
        return new Response("Unauthorized", { status: 401 });
      }
      console.log(authorizedResponse, response.body);
      response = new Response(response.body, {
        response,
        ...authorizedResponse
      });
      return response;
    }
    console.log("authorize redirect");
    if (!authorized2 && !verifyOnly) {
      console.log("redirect", redirectUrl);
      const url2 = new URL(event.url);
      let path = url2.pathname + url2.search;
      if (path == "/login") {
        path = "/";
      }
      console.log("setting cookie", 33333, path);
      return new Response("", {
        status: 302,
        headers: {
          "Location": "https://" + redirectUrl,
          "Set-cookie": `loginRedirect="${path}"; HttpOnly; Secure; SameSite=Lax; Path=/`
        }
      });
    }
    const logoutHeaders = { "Location": "/" };
    if (url.pathname === "/logout") {
      const { headers } = logout(event);
      const merged = Object.assign({}, logoutHeaders, headers);
      console.log(merged);
      return new Response(response.body, {
        status: 302,
        headers: merged
      });
    }
    return { authorized: authorized2, authorization };
  } catch (err) {
    console.log(err);
    return new Response(err.toString());
  }
}
export {
  Session,
  State,
  authorize,
  authorized,
  authorizedCookie
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=index.mjs.map
