var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "../../node_modules/.pnpm/cookie@0.4.2/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(";");
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var index = pair.indexOf("=");
        if (index < 0) {
          continue;
        }
        var key = pair.substring(0, index).trim();
        if (void 0 == obj[key]) {
          var val = pair.substring(index + 1, pair.length).trim();
          if (val[0] === '"') {
            val = val.slice(1, -1);
          }
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
      if (null != opt.maxAge) {
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

// ../../node_modules/.pnpm/itty-router@2.6.1/node_modules/itty-router/dist/itty-router.min.js
var require_itty_router_min = __commonJS({
  "../../node_modules/.pnpm/itty-router@2.6.1/node_modules/itty-router/dist/itty-router.min.js"(exports, module) {
    module.exports = { Router: function({ base: t = "", routes: n = [] } = {}) {
      return { __proto__: new Proxy({}, { get: (e, a, o) => (e2, ...r) => n.push([a.toUpperCase(), RegExp(`^${(t + e2).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), r]) && o }), routes: n, async handle(e, ...r) {
        let a, o, t2 = new URL(e.url);
        e.query = Object.fromEntries(t2.searchParams);
        for (var [p, s, u] of n)
          if ((p === e.method || "ALL" === p) && (o = t2.pathname.match(s))) {
            e.params = o.groups;
            for (var c of u)
              if (void 0 !== (a = await c(e.proxy || e, ...r)))
                return a;
          }
      } };
    } };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/withContent.js
var require_withContent = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/withContent.js"(exports, module) {
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

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/withCookies.js
var require_withCookies = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/withCookies.js"(exports, module) {
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

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/withParams.js
var require_withParams = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/withParams.js"(exports, module) {
    var withParams = (a) => {
      for (const s in a.params || {})
        a[s] = a.params[s];
    };
    module.exports = { withParams };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/index.js
var require_middleware = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/middleware/index.js"(exports, module) {
    module.exports = { ...require_withContent(), ...require_withCookies(), ...require_withParams() };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/createResponseType.js
var require_createResponseType = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/createResponseType.js"(exports, module) {
    var createResponseType = (e = "text/plain; charset=utf-8") => (s, t = {}) => {
      const { headers: n = {}, ...o } = t;
      return "object" == typeof s ? new Response(JSON.stringify(s), { headers: { "Content-Type": e, ...n }, ...o }) : new Response(s, t);
    };
    module.exports = { createResponseType };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/json.js
var require_json = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/json.js"(exports, module) {
    var { createResponseType } = require_createResponseType();
    var json = createResponseType("application/json; charset=utf-8");
    module.exports = { json };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/error.js"(exports, module) {
    var { json } = require_json();
    var error = (r = 500, o = "Internal Server Error.") => json({ ..."object" == typeof o ? o : { status: r, error: o } }, { status: r });
    module.exports = { error };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/missing.js
var require_missing = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/missing.js"(exports, module) {
    var { error } = require_error();
    var missing = (r = "Not found.") => error(404, r);
    module.exports = { missing };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/status.js
var require_status = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/status.js"(exports, module) {
    var { json } = require_json();
    var status = (s, t) => t ? json({ ..."object" == typeof t ? t : { status: s, message: t } }, { status: s }) : new Response(null, { status: s });
    module.exports = { status };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/text.js
var require_text = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/text.js"(exports, module) {
    var text = (e, t = {}) => new Response(e, t);
    module.exports = { text };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/index.js
var require_response = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/response/index.js"(exports, module) {
    module.exports = { ...require_error(), ...require_json(), ...require_missing(), ...require_status(), ...require_text() };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/router/ThrowableRouter.js
var require_ThrowableRouter = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/router/ThrowableRouter.js"(exports, module) {
    "use strict";
    var { Router } = require_itty_router_min();
    var { error } = require_response();
    var ThrowableRouter = (r = {}) => {
      const { stack: e = false } = r;
      return new Proxy(Router(r), { get: (r2, t) => (...o) => "handle" === t ? r2[t](...o).catch((r3) => error(r3.status || 500, { status: r3.status || 500, error: r3.message, stack: e && r3.stack || void 0 })) : r2[t](...o) });
    };
    module.exports = { ThrowableRouter };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/router/index.js
var require_router = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/router/index.js"(exports, module) {
    module.exports = { ...require_ThrowableRouter() };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/classes/StatusError.js
var require_StatusError = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/classes/StatusError.js"(exports, module) {
    var StatusError = class extends Error {
      constructor(r = 500, t = "Internal Error.") {
        super(t), this.name = "StatusError", this.status = r;
      }
    };
    module.exports = { StatusError };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/classes/index.js
var require_classes = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/classes/index.js"(exports, module) {
    module.exports = { ...require_StatusError() };
  }
});

// ../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/index.js
var require_itty_router_extras = __commonJS({
  "../../node_modules/.pnpm/itty-router-extras@0.4.2/node_modules/itty-router-extras/index.js"(exports, module) {
    module.exports = { ...require_middleware(), ...require_response(), ...require_router(), ...require_classes() };
  }
});

// ../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/proxy-durable.js
var require_proxy_durable = __commonJS({
  "../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/proxy-durable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.proxyDurable = void 0;
    var itty_router_extras_1 = require_itty_router_extras();
    var transformResponse = (response) => {
      try {
        return response.json();
      } catch (err) {
      }
      try {
        return response.text();
      } catch (err) {
      }
      return response;
    };
    var proxyDurable2 = (durable, middlewareOptions = {}) => {
      if (!durable || !durable.idFromName) {
        throw new itty_router_extras_1.StatusError(500, `${middlewareOptions.name || "That"} is not a valid Durable Object binding.`);
      }
      return {
        get: (id, options = {}) => {
          options = Object.assign(Object.assign({}, middlewareOptions), options);
          try {
            if (typeof id === "string") {
              id = durable.idFromName(id);
            }
            const stub = durable.get(id);
            const mock = typeof options.class === "function" && new options.class();
            const isValidMethod = (prop) => prop !== "fetch" && (!mock || typeof mock[prop] === "function");
            const buildRequest = (type, prop, content) => new Request(`https://itty-durable/${type}/${prop}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(content)
            });
            const stubFetch = (obj, type, prop, content) => {
              const theFetch = obj.fetch(buildRequest(type, prop, content));
              return options.parse ? theFetch.then(transformResponse) : theFetch;
            };
            return new Proxy(stub, {
              get: (obj, prop) => isValidMethod(prop) ? (...args) => stubFetch(obj, "call", prop, args) : stubFetch(obj, "get-prop", prop),
              set: (obj, prop, value) => stubFetch(obj, "set", prop, value)
            });
          } catch (err) {
            throw new itty_router_extras_1.StatusError(500, err.message);
          }
        }
      };
    };
    exports.proxyDurable = proxyDurable2;
  }
});

// ../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/itty-durable.js
var require_itty_durable = __commonJS({
  "../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/itty-durable.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDurable = void 0;
    var itty_router_1 = require_itty_router_min();
    var itty_router_extras_1 = require_itty_router_extras();
    var proxy_durable_1 = require_proxy_durable();
    var createDurable = (options = {}) => {
      const { autoPersist = false, autoReturn = false, onError = (err) => (0, itty_router_extras_1.error)(err.status || 500, err.message) } = options;
      return class IttyDurable {
        constructor(state = {}, env = {}) {
          this.state = Object.assign(Object.assign({ defaultState: void 0, initialized: false, router: (0, itty_router_1.Router)() }, env), state);
          for (const [key, binding] of Object.entries(env)) {
            this.state[key] = typeof binding.idFromName === "function" ? (0, proxy_durable_1.proxyDurable)(binding, { name: key, parse: true }) : binding;
          }
          const proxied = new Proxy(this, {
            get: (obj, prop, receiver) => typeof obj[prop] === "function" ? obj[prop].bind(receiver) : obj[prop],
            set: (obj, prop, value) => {
              obj[prop] = value;
              return true;
            }
          });
          this.state.router.post("/:action/:target", itty_router_extras_1.withParams, itty_router_extras_1.withContent, (request, env2) => __awaiter(this, void 0, void 0, function* () {
            const { action, target, content = [] } = request;
            if (action === "call") {
              if (typeof this[target] !== "function") {
                throw new itty_router_extras_1.StatusError(500, `Durable Object state{this.constructor.name} does not contain method state{target}()`);
              }
              const response = yield proxied[target](...content);
              if (response !== void 0) {
                return response instanceof Response ? response : (0, itty_router_extras_1.json)(response);
              }
            } else if (action === "set") {
              proxied[target] = content;
            } else if (action === "get-prop") {
              return (0, itty_router_extras_1.json)(yield proxied[target]);
            }
          }), proxied.optionallyReturnThis);
          return proxied;
        }
        destroy(options2 = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            const { reset = false } = options2;
            yield this.state.storage.deleteAll();
            if (reset) {
              this.reset();
            }
          });
        }
        fetch(...args) {
          return __awaiter(this, void 0, void 0, function* () {
            if (!this.state.initialized) {
              this.state.defaultState = JSON.stringify(this.getPersistable());
            }
            yield this.loadFromStorage();
            const response = yield this.state.router.handle(...args).catch(onError);
            if (autoPersist) {
              this.persist();
            }
            return response || (0, itty_router_extras_1.error)(400, "Bad request to durable object");
          });
        }
        getPersistable() {
          const _a = this, { state } = _a, persistable = __rest(_a, ["state"]);
          return persistable;
        }
        loadFromStorage() {
          return __awaiter(this, void 0, void 0, function* () {
            if (!this.state.initialized) {
              const stored = (yield this.state.storage.get("data")) || {};
              Object.assign(this, stored);
              this.state.initialized = true;
            }
          });
        }
        optionallyReturnThis() {
          if (autoReturn) {
            return (0, itty_router_extras_1.json)(this.toJSON ? this.toJSON() : this);
          }
        }
        persist() {
          return __awaiter(this, void 0, void 0, function* () {
            const _a = this.getPersistable(), { state } = _a, persistable = __rest(_a, ["state"]);
            yield this.state.storage.put("data", persistable);
          });
        }
        reset() {
          return __awaiter(this, void 0, void 0, function* () {
            const _a = this.getPersistable(), { state } = _a, persistable = __rest(_a, ["state"]);
            for (const key in persistable) {
              Reflect.deleteProperty(this, key);
            }
            Object.assign(this, JSON.parse(this.state.defaultState));
          });
        }
        toJSON() {
          const _a = this, { state } = _a, other = __rest(_a, ["state"]);
          return other;
        }
      };
    };
    exports.createDurable = createDurable;
  }
});

// ../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/with-durables.js
var require_with_durables = __commonJS({
  "../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/with-durables.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withDurables = void 0;
    var itty_router_extras_1 = require_itty_router_extras();
    var proxy_durable_1 = require_proxy_durable();
    var isDurable = (binding) => typeof binding.idFromName === "function";
    var withDurables = (options = {}) => (request, env) => {
      const { parse = false, classes = {} } = options;
      request.durables = request.durables || {};
      for (const [key, binding] of Object.entries(env)) {
        if (isDurable(binding)) {
          const proxied = (0, proxy_durable_1.proxyDurable)(binding, {
            name: key,
            class: classes[key],
            parse
          });
          try {
            request[key] = request.durables[key] = proxied;
          } catch (err) {
            throw new itty_router_extras_1.StatusError(500, `Could not set Durable binding "${key}" on Request`);
          }
        }
      }
    };
    exports.withDurables = withDurables;
  }
});

// ../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/index.js
var require_itty_durable2 = __commonJS({
  "../../node_modules/.pnpm/itty-durable@1.0.0/node_modules/itty-durable/index.js"(exports, module) {
    "use strict";
    module.exports = Object.assign(Object.assign(Object.assign({}, require_itty_durable()), require_with_durables()), require_proxy_durable());
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/utils/cookie.js
var require_cookie2 = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/utils/cookie.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = exports.parse = void 0;
    var parse = (cookie3) => {
      const pairs = cookie3.split(/;\s*/g);
      const parsedCookie = {};
      for (let i = 0, len = pairs.length; i < len; i++) {
        const pair = pairs[i].split(/\s*=\s*([^\s]+)/);
        parsedCookie[pair[0]] = decodeURIComponent(pair[1]);
      }
      return parsedCookie;
    };
    exports.parse = parse;
    var serialize = (name, value, opt = {}) => {
      value = encodeURIComponent(value);
      let cookie3 = `${name}=${value}`;
      if (opt.maxAge) {
        cookie3 += `; Max-Age=${Math.floor(opt.maxAge)}`;
      }
      if (opt.domain) {
        cookie3 += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        cookie3 += "; Path=" + opt.path;
      }
      if (opt.expires) {
        cookie3 += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        cookie3 += "; HttpOnly";
      }
      if (opt.secure) {
        cookie3 += "; Secure";
      }
      if (opt.sameSite) {
        cookie3 += `; SameSite=${opt.sameSite}`;
      }
      return cookie3;
    };
    exports.serialize = serialize;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/utils/url.js
var require_url = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/utils/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergePath = exports.isAbsoluteURL = exports.getPathFromURL = exports.getPattern = exports.splitPath = void 0;
    var URL_REGEXP = /^https?:\/\/[a-zA-Z0-9\-\.:]+(\/?[^?#]*)/;
    var splitPath = (path) => {
      const paths = path.split(/\//);
      if (paths[0] === "") {
        paths.shift();
      }
      return paths;
    };
    exports.splitPath = splitPath;
    var patternCache = {};
    var getPattern = (label) => {
      if (label === "*") {
        return "*";
      }
      const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      if (match) {
        if (!patternCache[label]) {
          if (match[2]) {
            patternCache[label] = [label, match[1], new RegExp("^" + match[2] + "$")];
          } else {
            patternCache[label] = [label, match[1], true];
          }
        }
        return patternCache[label];
      }
      return null;
    };
    exports.getPattern = getPattern;
    var getPathFromURL = (url, strict = true) => {
      const queryIndex = url.indexOf("?");
      const result = url.substring(url.indexOf("/", 8), queryIndex === -1 ? url.length : queryIndex);
      if (strict === false && result.endsWith("/")) {
        return result.slice(0, -1);
      }
      return result;
    };
    exports.getPathFromURL = getPathFromURL;
    var isAbsoluteURL = (url) => {
      const match = url.match(URL_REGEXP);
      if (match) {
        return true;
      }
      return false;
    };
    exports.isAbsoluteURL = isAbsoluteURL;
    var mergePath = (...paths) => {
      let p = "";
      let endsWithSlash = false;
      for (let path of paths) {
        if (p.endsWith("/")) {
          p = p.slice(0, -1);
          endsWithSlash = true;
        }
        if (!path.startsWith("/")) {
          path = `/${path}`;
        }
        if (path === "/" && endsWithSlash) {
          p = `${p}/`;
        } else if (path !== "/") {
          p = `${p}${path}`;
        }
        if (path === "/" && p === "") {
          p = "/";
        }
      }
      return p;
    };
    exports.mergePath = mergePath;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/context.js
var require_context = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HonoContext = void 0;
    var cookie_1 = require_cookie2();
    var url_1 = require_url();
    var HonoContext = class {
      constructor(req, env = void 0, executionCtx = void 0, notFoundHandler = () => new Response()) {
        this._status = 200;
        this._pretty = false;
        this._prettySpace = 2;
        this._executionCtx = executionCtx;
        this.req = req;
        this.env = env ? env : {};
        this.notFoundHandler = notFoundHandler;
        this.finalized = false;
      }
      get event() {
        if (this._executionCtx instanceof FetchEvent) {
          return this._executionCtx;
        } else {
          throw Error("This context has no FetchEvent");
        }
      }
      get executionCtx() {
        if (this._executionCtx) {
          return this._executionCtx;
        } else {
          throw Error("This context has no ExecutionContext");
        }
      }
      get res() {
        return this._res || (this._res = new Response());
      }
      set res(_res) {
        this._res = _res;
        this.finalized = true;
      }
      header(name, value) {
        this._headers || (this._headers = {});
        this._headers[name] = value;
        if (this.finalized) {
          this.res.headers.set(name, value);
        }
      }
      status(status) {
        this._status = status;
      }
      set(key, value) {
        this._map || (this._map = {});
        this._map[key] = value;
      }
      get(key) {
        if (!this._map) {
          return void 0;
        }
        return this._map[key];
      }
      pretty(prettyJSON, space = 2) {
        this._pretty = prettyJSON;
        this._prettySpace = space;
      }
      newResponse(data, status, headers = {}) {
        const _headers = { ...this._headers, ...headers };
        if (this._res) {
          this._res.headers.forEach((v, k) => {
            _headers[k] = v;
          });
        }
        return new Response(data, {
          status: status || this._status || 200,
          headers: _headers
        });
      }
      body(data, status = this._status, headers = {}) {
        return this.newResponse(data, status, headers);
      }
      text(text, status = this._status, headers = {}) {
        headers["Content-Type"] || (headers["Content-Type"] = "text/plain; charset=UTF-8");
        return this.body(text, status, headers);
      }
      json(object, status = this._status, headers = {}) {
        const body = this._pretty ? JSON.stringify(object, null, this._prettySpace) : JSON.stringify(object);
        headers["Content-Type"] || (headers["Content-Type"] = "application/json; charset=UTF-8");
        return this.body(body, status, headers);
      }
      html(html, status = this._status, headers = {}) {
        headers["Content-Type"] || (headers["Content-Type"] = "text/html; charset=UTF-8");
        return this.body(html, status, headers);
      }
      redirect(location, status = 302) {
        if (!(0, url_1.isAbsoluteURL)(location)) {
          const url = new URL(this.req.url);
          url.pathname = location;
          location = url.toString();
        }
        return this.newResponse(null, status, {
          Location: location
        });
      }
      cookie(name, value, opt) {
        const cookie3 = (0, cookie_1.serialize)(name, value, opt);
        this.header("Set-Cookie", cookie3);
      }
      notFound() {
        return this.notFoundHandler(this);
      }
    };
    exports.HonoContext = HonoContext;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/compose.js
var require_compose = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/compose.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compose = void 0;
    var context_1 = require_context();
    var compose = (middleware, onError, onNotFound) => {
      return (context, next) => {
        let index = -1;
        return dispatch(0);
        async function dispatch(i) {
          if (i <= index) {
            return Promise.reject(new Error("next() called multiple times"));
          }
          let handler = middleware[i];
          index = i;
          if (i === middleware.length && next)
            handler = next;
          if (!handler) {
            if (context instanceof context_1.HonoContext && context.finalized === false && onNotFound) {
              context.res = await onNotFound(context);
            }
            return Promise.resolve(context);
          }
          return Promise.resolve(handler(context, () => dispatch(i + 1))).then((res) => {
            if (res && context instanceof context_1.HonoContext) {
              context.res = res;
            }
            return context;
          }).catch((err) => {
            if (context instanceof context_1.HonoContext && onError) {
              if (err instanceof Error) {
                context.res = onError(err, context);
              }
              return context;
            } else {
              throw err;
            }
          });
        }
      };
    };
    exports.compose = compose;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/utils/body.js
var require_body = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/utils/body.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseBody = void 0;
    var parseBody = async (r) => {
      const contentType = r.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        let body = {};
        try {
          body = await r.json();
        } catch {
        }
        return body;
      } else if (contentType.includes("application/text")) {
        return await r.text();
      } else if (contentType.startsWith("text")) {
        return await r.text();
      } else if (contentType.includes("form")) {
        const form = {};
        const data = [...await r.formData()].reduce((acc, cur) => {
          acc[cur[0]] = cur[1];
          return acc;
        }, form);
        return data;
      }
      const arrayBuffer = await r.arrayBuffer();
      return arrayBuffer;
    };
    exports.parseBody = parseBody;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/request.js
var require_request = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/request.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendRequestPrototype = void 0;
    var body_1 = require_body();
    var cookie_1 = require_cookie2();
    function extendRequestPrototype() {
      if (!!Request.prototype.param) {
        return;
      }
      Request.prototype.param = function(key) {
        if (this.paramData) {
          if (key) {
            return this.paramData[key];
          } else {
            return this.paramData;
          }
        }
        return null;
      };
      Request.prototype.header = function(name) {
        if (name) {
          return this.headers.get(name);
        } else {
          const result = {};
          for (const [key, value] of this.headers) {
            result[key] = value;
          }
          return result;
        }
      };
      Request.prototype.query = function(key) {
        const url = new URL(this.url);
        if (key) {
          return url.searchParams.get(key);
        } else {
          const result = {};
          for (const key2 of url.searchParams.keys()) {
            result[key2] = url.searchParams.get(key2) || "";
          }
          return result;
        }
      };
      Request.prototype.queries = function(key) {
        const url = new URL(this.url);
        if (key) {
          return url.searchParams.getAll(key);
        } else {
          const result = {};
          for (const key2 of url.searchParams.keys()) {
            result[key2] = url.searchParams.getAll(key2);
          }
          return result;
        }
      };
      Request.prototype.cookie = function(key) {
        const cookie3 = this.headers.get("Cookie") || "";
        const obj = (0, cookie_1.parse)(cookie3);
        if (key) {
          const value = obj[key];
          return value;
        } else {
          return obj;
        }
      };
      Request.prototype.parseBody = function() {
        if (!this.parsedBody) {
          this.parsedBody = (0, body_1.parseBody)(this);
        }
        return this.parsedBody;
      };
    }
    exports.extendRequestPrototype = extendRequestPrototype;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router.js
var require_router2 = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METHOD_NAME_ALL_LOWERCASE = exports.METHOD_NAME_ALL = void 0;
    exports.METHOD_NAME_ALL = "ALL";
    exports.METHOD_NAME_ALL_LOWERCASE = "all";
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router/trie-router/node.js
var require_node = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router/trie-router/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Node = void 0;
    var router_1 = require_router2();
    var url_1 = require_url();
    function findParam(node, name) {
      for (let i = 0, len = node.patterns.length; i < len; i++) {
        if (typeof node.patterns[i] === "object" && node.patterns[i][1] === name) {
          return true;
        }
      }
      const nodes = Object.values(node.children);
      for (let i = 0, len = nodes.length; i < len; i++) {
        if (findParam(nodes[i], name)) {
          return true;
        }
      }
      return false;
    }
    var Node = class {
      constructor(method, handler, children) {
        this.order = 0;
        this.children = children || {};
        this.methods = [];
        this.name = "";
        if (method && handler) {
          const m = {};
          m[method] = { handler, score: 0, name: this.name };
          this.methods = [m];
        }
        this.patterns = [];
        this.handlerSetCache = {};
      }
      insert(method, path, handler) {
        this.name = `${method} ${path}`;
        this.order = ++this.order;
        let curNode = this;
        const parts = (0, url_1.splitPath)(path);
        const parentPatterns = [];
        const errorMessage = (name) => {
          return `Duplicate param name, use another name instead of '${name}' - ${method} ${path} <--- '${name}'`;
        };
        for (let i = 0, len = parts.length; i < len; i++) {
          const p = parts[i];
          if (Object.keys(curNode.children).includes(p)) {
            parentPatterns.push(...curNode.patterns);
            curNode = curNode.children[p];
            continue;
          }
          curNode.children[p] = new Node();
          const pattern = (0, url_1.getPattern)(p);
          if (pattern) {
            if (typeof pattern === "object") {
              for (let j = 0, len2 = parentPatterns.length; j < len2; j++) {
                if (typeof parentPatterns[j] === "object" && parentPatterns[j][1] === pattern[1]) {
                  throw new Error(errorMessage(pattern[1]));
                }
              }
              if (Object.values(curNode.children).some((n) => findParam(n, pattern[1]))) {
                throw new Error(errorMessage(pattern[1]));
              }
            }
            curNode.patterns.push(pattern);
            parentPatterns.push(...curNode.patterns);
          }
          parentPatterns.push(...curNode.patterns);
          curNode = curNode.children[p];
        }
        if (!curNode.methods.length) {
          curNode.methods = [];
        }
        const m = {};
        const handlerSet = { handler, name: this.name, score: this.order };
        m[method] = handlerSet;
        curNode.methods.push(m);
        return curNode;
      }
      getHandlerSets(node, method, wildcard) {
        var _a, _b;
        return (_a = node.handlerSetCache)[_b = `${method}:${wildcard ? "1" : "0"}`] || (_a[_b] = (() => {
          const handlerSets = [];
          node.methods.map((m) => {
            const handlerSet = m[method] || m[router_1.METHOD_NAME_ALL];
            if (handlerSet !== void 0) {
              const hs = { ...handlerSet };
              handlerSets.push(hs);
              return;
            }
          });
          return handlerSets;
        })());
      }
      search(method, path) {
        const handlerSets = [];
        const params = {};
        const curNode = this;
        let curNodes = [curNode];
        const parts = (0, url_1.splitPath)(path);
        for (let i = 0, len = parts.length; i < len; i++) {
          const part = parts[i];
          const isLast = i === len - 1;
          const tempNodes = [];
          let matched = false;
          for (let j = 0, len2 = curNodes.length; j < len2; j++) {
            const node = curNodes[j];
            const nextNode = node.children[part];
            if (nextNode) {
              if (isLast === true) {
                if (nextNode.children["*"]) {
                  handlerSets.push(...this.getHandlerSets(nextNode.children["*"], method, true));
                }
                handlerSets.push(...this.getHandlerSets(nextNode, method));
                matched = true;
              }
              tempNodes.push(nextNode);
            }
            for (let k = 0, len3 = node.patterns.length; k < len3; k++) {
              const pattern = node.patterns[k];
              if (pattern === "*") {
                const astNode = node.children["*"];
                if (astNode) {
                  handlerSets.push(...this.getHandlerSets(astNode, method));
                  tempNodes.push(astNode);
                }
                continue;
              }
              if (part === "")
                continue;
              const [key, name, matcher] = pattern;
              if (matcher === true || matcher instanceof RegExp && matcher.test(part)) {
                if (typeof key === "string") {
                  if (isLast === true) {
                    handlerSets.push(...this.getHandlerSets(node.children[key], method));
                  }
                  tempNodes.push(node.children[key]);
                }
                if (typeof name === "string" && !matched) {
                  params[name] = part;
                }
              }
            }
          }
          curNodes = tempNodes;
        }
        if (handlerSets.length <= 0)
          return null;
        const handlers = handlerSets.sort((a, b) => {
          return a.score - b.score;
        }).map((s) => {
          return s.handler;
        });
        return { handlers, params };
      }
    };
    exports.Node = Node;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router/trie-router/router.js
var require_router3 = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router/trie-router/router.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrieRouter = void 0;
    var node_1 = require_node();
    var TrieRouter = class {
      constructor() {
        this.node = new node_1.Node();
      }
      add(method, path, handler) {
        this.node.insert(method, path, handler);
      }
      match(method, path) {
        return this.node.search(method, path);
      }
    };
    exports.TrieRouter = TrieRouter;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router/trie-router/index.js
var require_trie_router = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/router/trie-router/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrieRouter = void 0;
    var router_1 = require_router3();
    Object.defineProperty(exports, "TrieRouter", { enumerable: true, get: function() {
      return router_1.TrieRouter;
    } });
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/hono.js
var require_hono = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/hono.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hono = void 0;
    var compose_1 = require_compose();
    var context_1 = require_context();
    var request_1 = require_request();
    var router_1 = require_router2();
    var trie_router_1 = require_trie_router();
    var url_1 = require_url();
    var methods = ["get", "post", "put", "delete", "head", "options", "patch"];
    function defineDynamicClass() {
      return class {
      };
    }
    var Hono2 = class extends defineDynamicClass() {
      constructor(init = {}) {
        super();
        this.router = new trie_router_1.TrieRouter();
        this.strict = true;
        this._tempPath = "";
        this.path = "/";
        this.routes = [];
        this.notFoundHandler = (c) => {
          const message = "404 Not Found";
          return c.text(message, 404);
        };
        this.errorHandler = (err, c) => {
          console.error(`${err.stack || err.message}`);
          const message = "Internal Server Error";
          return c.text(message, 500);
        };
        this.fetch = (request, env, executionCtx) => {
          return this.dispatch(request, executionCtx, env);
        };
        (0, request_1.extendRequestPrototype)();
        const allMethods = [...methods, router_1.METHOD_NAME_ALL_LOWERCASE];
        allMethods.map((method) => {
          this[method] = (args1, ...args) => {
            if (typeof args1 === "string") {
              this.path = args1;
            } else {
              this.addRoute(method, this.path, args1);
            }
            args.map((handler) => {
              if (typeof handler !== "string") {
                this.addRoute(method, this.path, handler);
              }
            });
            return this;
          };
        });
        Object.assign(this, init);
      }
      route(path, app) {
        this._tempPath = path;
        if (app) {
          app.routes.map((r) => {
            this.addRoute(r.method, r.path, r.handler);
          });
          this._tempPath = "";
        }
        return this;
      }
      use(arg1, ...handlers) {
        if (typeof arg1 === "string") {
          this.path = arg1;
        } else {
          handlers.unshift(arg1);
        }
        handlers.map((handler) => {
          this.addRoute(router_1.METHOD_NAME_ALL, this.path, handler);
        });
        return this;
      }
      onError(handler) {
        this.errorHandler = handler;
        return this;
      }
      notFound(handler) {
        this.notFoundHandler = handler;
        return this;
      }
      addRoute(method, path, handler) {
        method = method.toUpperCase();
        if (this._tempPath) {
          path = (0, url_1.mergePath)(this._tempPath, path);
        }
        this.router.add(method, path, handler);
        const r = { path, method, handler };
        this.routes.push(r);
      }
      matchRoute(method, path) {
        return this.router.match(method, path);
      }
      async dispatch(request, eventOrExecutionCtx, env) {
        const path = (0, url_1.getPathFromURL)(request.url, this.strict);
        const method = request.method;
        const result = this.matchRoute(method, path);
        request.paramData = result?.params;
        const handlers = result ? result.handlers : [this.notFoundHandler];
        const c = new context_1.HonoContext(request, env, eventOrExecutionCtx, this.notFoundHandler);
        const composed = (0, compose_1.compose)(handlers, this.errorHandler, this.notFoundHandler);
        let context;
        try {
          context = await composed(c);
          if (!context.finalized) {
            throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");
          }
        } catch (err) {
          if (err instanceof Error) {
            return this.errorHandler(err, c);
          }
          throw err;
        }
        return context.res;
      }
      handleEvent(event) {
        return this.dispatch(event.request, event);
      }
      request(input, requestInit) {
        const req = input instanceof Request ? input : new Request(input, requestInit);
        return this.dispatch(req);
      }
    };
    exports.Hono = Hono2;
  }
});

// ../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/hono@2.0.7/node_modules/hono/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hono = void 0;
    var hono_1 = require_hono();
    Object.defineProperty(exports, "Hono", { enumerable: true, get: function() {
      return hono_1.Hono;
    } });
    hono_1.Hono.prototype.fire = function() {
      addEventListener("fetch", (event) => {
        void event.respondWith(this.handleEvent(event));
      });
    };
  }
});

// auth0.js
var import_cookie = __toESM(require_cookie(), 1);
var import_itty_durable = __toESM(require_itty_durable2(), 1);
var cookieKey = "AUTH0-AUTH";
var { log } = console;
function globals({ kv, MODE, ...env }, request2) {
  const { SESSION, STATE } = env;
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
    const id = STATE.newUniqueId();
    const obj = STATE.get(id);
    const resp = await obj.fetch("/created");
    return id.toString();
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
    return persistAuth(
      res
    );
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
        throw new Error(
          `Token iss value (${iss}) doesn't match AUTH0_DOMAIN (${AUTH0_DOMAIN})`
        );
      }
      if (token.aud !== AUTH0_CLIENT_ID) {
        throw new Error(
          `Token aud value (${token.aud}) doesn't match AUTH0_CLIENT_ID (${AUTH0_CLIENT_ID})`
        );
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
      console.log("err", body, exchange);
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
    const idSession = SESSION.idFromName(id);
    const obj = SESSION.get(idSession);
    const resp = await obj.fetch("/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const cookieHeader = request2.headers.get("Cookie");
    const cookies = import_cookie.default.parse(cookieHeader);
    let path = cookies["loginRedirect"] || "/";
    const headers = {
      Location: path,
      "Set-cookie": `${cookieKey}=${id}; Secure; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}`
    };
    return { headers, status: 302 };
  };
  const redirectUrl = (state) => `${auth0.domain}/authorize?response_type=code&client_id=${auth0.clientId}&redirect_uri=${auth0.callbackUrl}&scope=openid%20profile%20email&state=${state}`;
  const handleRedirect = async (request) => {
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    if (!state) {
      return null;
    }
    const obj = await STATE.get(STATE.idFromString(state));
    const resp = await obj.fetch("/").then((x) => x.json());
    if (!resp) {
      log("failed state restore", resp);
      return null;
    }
    const code = url.searchParams.get("code");
    if (code) {
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
      const id = SESSION.idFromName(sub);
      const obj = await SESSION.get(id);
      const { session: kvStored } = await obj.fetch("/").then((x) => x.json());
      if (!kvStored) {
        throw new Error("Unable to find authorization data");
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
    return {};
  };
  return { logout, cookieKey, authorize: authorize2, handleRedirect };
}

// durables.ts
var import_hono = __toESM(require_dist(), 1);
var { log: log2 } = console;
var State = class {
  created = false;
  state;
  app = new import_hono.Hono();
  constructor(state) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage?.get("created");
      this.created = stored || false;
    });
    this.app.get("/created", async (c) => {
      this.created = true;
      await this.state.storage?.put("created", this.created);
      var dt = new Date();
      dt.setDate(dt.getDate() + 1);
      this.state.storage.setAlarm(dt);
      return c.json(this.created);
    });
    this.app.get("/", async (c) => {
      return c.json(this.created);
    });
  }
  async fetch(request) {
    return this.app.fetch(request);
  }
  async alarm() {
    this.created = false;
    await this.state.storage.deleteAll();
  }
};
var Session = class {
  session = null;
  created = false;
  state;
  app = new import_hono.Hono();
  constructor(state) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage?.get(["created", "session"]);
      this.created = stored.get("created") || false;
      this.session = stored.get("session") || null;
    });
    this.app.post("/", async (c) => {
      const body = await c.req.parseBody();
      if (this.created == false) {
        this.created = true;
        await this.state.storage?.put("created", this.created);
        var dt = new Date();
        dt.setDate(dt.getDate() + 3);
        this.state.storage.setAlarm(dt);
      }
      this.state.storage.put("session", body);
      this.session = body;
      console.log("recieved", body);
      return c.json(body);
    });
    this.app.get("/", async (c) => {
      log2("durable state replying for durable session");
      return c.json({ session: this.session, created: this.created });
    });
  }
  async fetch(request) {
    return this.app.fetch(request);
  }
  async alarm() {
    this.session = null;
    this.created = false;
    await this.state.storage.deleteAll();
  }
};

// index.js
var import_cookie2 = __toESM(require_cookie(), 1);
var { log: log3 } = console;
function authorizedCookie(event) {
  const cookieHeader = event.headers.get("Cookie");
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    console.log("bad cookie", cookieHeader);
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
    console.log("auth", url.pathname);
    if (url.pathname === "/auth") {
      log3("auth true");
      const authorizedResponse = await handleRedirect(event);
      if (!authorizedResponse) {
        log3("failed");
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
