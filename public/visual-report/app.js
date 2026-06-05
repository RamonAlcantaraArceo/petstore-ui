function uf(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, 'default') ? c.default : c;
}
var Di = { exports: {} },
  Sr = {},
  Ii = { exports: {} },
  Y = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oa;
function sf() {
  if (Oa) return Y;
  Oa = 1;
  var c = Symbol.for('react.element'),
    f = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    w = Symbol.for('react.strict_mode'),
    C = Symbol.for('react.profiler'),
    M = Symbol.for('react.provider'),
    D = Symbol.for('react.context'),
    H = Symbol.for('react.forward_ref'),
    j = Symbol.for('react.suspense'),
    Q = Symbol.for('react.memo'),
    X = Symbol.for('react.lazy'),
    O = Symbol.iterator;
  function b(p) {
    return p === null || typeof p != 'object'
      ? null
      : ((p = (O && p[O]) || p['@@iterator']), typeof p == 'function' ? p : null);
  }
  var ae = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    F = Object.assign,
    $ = {};
  function R(p, y, K) {
    ((this.props = p), (this.context = y), (this.refs = $), (this.updater = K || ae));
  }
  ((R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (p, y) {
      if (typeof p != 'object' && typeof p != 'function' && p != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, p, y, 'setState');
    }),
    (R.prototype.forceUpdate = function (p) {
      this.updater.enqueueForceUpdate(this, p, 'forceUpdate');
    }));
  function ne() {}
  ne.prototype = R.prototype;
  function ve(p, y, K) {
    ((this.props = p), (this.context = y), (this.refs = $), (this.updater = K || ae));
  }
  var re = (ve.prototype = new ne());
  ((re.constructor = ve), F(re, R.prototype), (re.isPureReactComponent = !0));
  var fe = Array.isArray,
    Ce = Object.prototype.hasOwnProperty,
    ie = { current: null },
    Ne = { key: !0, ref: !0, __self: !0, __source: !0 };
  function qe(p, y, K) {
    var G,
      J = {},
      ee = null,
      ue = null;
    if (y != null)
      for (G in (y.ref !== void 0 && (ue = y.ref), y.key !== void 0 && (ee = '' + y.key), y))
        Ce.call(y, G) && !Ne.hasOwnProperty(G) && (J[G] = y[G]);
    var le = arguments.length - 2;
    if (le === 1) J.children = K;
    else if (1 < le) {
      for (var pe = Array(le), be = 0; be < le; be++) pe[be] = arguments[be + 2];
      J.children = pe;
    }
    if (p && p.defaultProps)
      for (G in ((le = p.defaultProps), le)) J[G] === void 0 && (J[G] = le[G]);
    return { $$typeof: c, type: p, key: ee, ref: ue, props: J, _owner: ie.current };
  }
  function _t(p, y) {
    return { $$typeof: c, type: p.type, key: y, ref: p.ref, props: p.props, _owner: p._owner };
  }
  function kt(p) {
    return typeof p == 'object' && p !== null && p.$$typeof === c;
  }
  function Gt(p) {
    var y = { '=': '=0', ':': '=2' };
    return (
      '$' +
      p.replace(/[=:]/g, function (K) {
        return y[K];
      })
    );
  }
  var ft = /\/+/g;
  function Qe(p, y) {
    return typeof p == 'object' && p !== null && p.key != null ? Gt('' + p.key) : y.toString(36);
  }
  function lt(p, y, K, G, J) {
    var ee = typeof p;
    (ee === 'undefined' || ee === 'boolean') && (p = null);
    var ue = !1;
    if (p === null) ue = !0;
    else
      switch (ee) {
        case 'string':
        case 'number':
          ue = !0;
          break;
        case 'object':
          switch (p.$$typeof) {
            case c:
            case f:
              ue = !0;
          }
      }
    if (ue)
      return (
        (ue = p),
        (J = J(ue)),
        (p = G === '' ? '.' + Qe(ue, 0) : G),
        fe(J)
          ? ((K = ''),
            p != null && (K = p.replace(ft, '$&/') + '/'),
            lt(J, y, K, '', function (be) {
              return be;
            }))
          : J != null &&
            (kt(J) &&
              (J = _t(
                J,
                K +
                  (!J.key || (ue && ue.key === J.key)
                    ? ''
                    : ('' + J.key).replace(ft, '$&/') + '/') +
                  p,
              )),
            y.push(J)),
        1
      );
    if (((ue = 0), (G = G === '' ? '.' : G + ':'), fe(p)))
      for (var le = 0; le < p.length; le++) {
        ee = p[le];
        var pe = G + Qe(ee, le);
        ue += lt(ee, y, K, pe, J);
      }
    else if (((pe = b(p)), typeof pe == 'function'))
      for (p = pe.call(p), le = 0; !(ee = p.next()).done; )
        ((ee = ee.value), (pe = G + Qe(ee, le++)), (ue += lt(ee, y, K, pe, J)));
    else if (ee === 'object')
      throw (
        (y = String(p)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (y === '[object Object]' ? 'object with keys {' + Object.keys(p).join(', ') + '}' : y) +
            '). If you meant to render a collection of children, use an array instead.',
        )
      );
    return ue;
  }
  function pt(p, y, K) {
    if (p == null) return p;
    var G = [],
      J = 0;
    return (
      lt(p, G, '', '', function (ee) {
        return y.call(K, ee, J++);
      }),
      G
    );
  }
  function Ue(p) {
    if (p._status === -1) {
      var y = p._result;
      ((y = y()),
        y.then(
          function (K) {
            (p._status === 0 || p._status === -1) && ((p._status = 1), (p._result = K));
          },
          function (K) {
            (p._status === 0 || p._status === -1) && ((p._status = 2), (p._result = K));
          },
        ),
        p._status === -1 && ((p._status = 0), (p._result = y)));
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var ye = { current: null },
    P = { transition: null },
    B = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: P, ReactCurrentOwner: ie };
  function _() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  return (
    (Y.Children = {
      map: pt,
      forEach: function (p, y, K) {
        pt(
          p,
          function () {
            y.apply(this, arguments);
          },
          K,
        );
      },
      count: function (p) {
        var y = 0;
        return (
          pt(p, function () {
            y++;
          }),
          y
        );
      },
      toArray: function (p) {
        return (
          pt(p, function (y) {
            return y;
          }) || []
        );
      },
      only: function (p) {
        if (!kt(p))
          throw Error('React.Children.only expected to receive a single React element child.');
        return p;
      },
    }),
    (Y.Component = R),
    (Y.Fragment = s),
    (Y.Profiler = C),
    (Y.PureComponent = ve),
    (Y.StrictMode = w),
    (Y.Suspense = j),
    (Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = B),
    (Y.act = _),
    (Y.cloneElement = function (p, y, K) {
      if (p == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            p +
            '.',
        );
      var G = F({}, p.props),
        J = p.key,
        ee = p.ref,
        ue = p._owner;
      if (y != null) {
        if (
          (y.ref !== void 0 && ((ee = y.ref), (ue = ie.current)),
          y.key !== void 0 && (J = '' + y.key),
          p.type && p.type.defaultProps)
        )
          var le = p.type.defaultProps;
        for (pe in y)
          Ce.call(y, pe) &&
            !Ne.hasOwnProperty(pe) &&
            (G[pe] = y[pe] === void 0 && le !== void 0 ? le[pe] : y[pe]);
      }
      var pe = arguments.length - 2;
      if (pe === 1) G.children = K;
      else if (1 < pe) {
        le = Array(pe);
        for (var be = 0; be < pe; be++) le[be] = arguments[be + 2];
        G.children = le;
      }
      return { $$typeof: c, type: p.type, key: J, ref: ee, props: G, _owner: ue };
    }),
    (Y.createContext = function (p) {
      return (
        (p = {
          $$typeof: D,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (p.Provider = { $$typeof: M, _context: p }),
        (p.Consumer = p)
      );
    }),
    (Y.createElement = qe),
    (Y.createFactory = function (p) {
      var y = qe.bind(null, p);
      return ((y.type = p), y);
    }),
    (Y.createRef = function () {
      return { current: null };
    }),
    (Y.forwardRef = function (p) {
      return { $$typeof: H, render: p };
    }),
    (Y.isValidElement = kt),
    (Y.lazy = function (p) {
      return { $$typeof: X, _payload: { _status: -1, _result: p }, _init: Ue };
    }),
    (Y.memo = function (p, y) {
      return { $$typeof: Q, type: p, compare: y === void 0 ? null : y };
    }),
    (Y.startTransition = function (p) {
      var y = P.transition;
      P.transition = {};
      try {
        p();
      } finally {
        P.transition = y;
      }
    }),
    (Y.unstable_act = _),
    (Y.useCallback = function (p, y) {
      return ye.current.useCallback(p, y);
    }),
    (Y.useContext = function (p) {
      return ye.current.useContext(p);
    }),
    (Y.useDebugValue = function () {}),
    (Y.useDeferredValue = function (p) {
      return ye.current.useDeferredValue(p);
    }),
    (Y.useEffect = function (p, y) {
      return ye.current.useEffect(p, y);
    }),
    (Y.useId = function () {
      return ye.current.useId();
    }),
    (Y.useImperativeHandle = function (p, y, K) {
      return ye.current.useImperativeHandle(p, y, K);
    }),
    (Y.useInsertionEffect = function (p, y) {
      return ye.current.useInsertionEffect(p, y);
    }),
    (Y.useLayoutEffect = function (p, y) {
      return ye.current.useLayoutEffect(p, y);
    }),
    (Y.useMemo = function (p, y) {
      return ye.current.useMemo(p, y);
    }),
    (Y.useReducer = function (p, y, K) {
      return ye.current.useReducer(p, y, K);
    }),
    (Y.useRef = function (p) {
      return ye.current.useRef(p);
    }),
    (Y.useState = function (p) {
      return ye.current.useState(p);
    }),
    (Y.useSyncExternalStore = function (p, y, K) {
      return ye.current.useSyncExternalStore(p, y, K);
    }),
    (Y.useTransition = function () {
      return ye.current.useTransition();
    }),
    (Y.version = '18.3.1'),
    Y
  );
}
var Ua;
function $i() {
  return (Ua || ((Ua = 1), (Ii.exports = sf())), Ii.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Aa;
function af() {
  if (Aa) return Sr;
  Aa = 1;
  var c = $i(),
    f = Symbol.for('react.element'),
    s = Symbol.for('react.fragment'),
    w = Object.prototype.hasOwnProperty,
    C = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    M = { key: !0, ref: !0, __self: !0, __source: !0 };
  function D(H, j, Q) {
    var X,
      O = {},
      b = null,
      ae = null;
    (Q !== void 0 && (b = '' + Q),
      j.key !== void 0 && (b = '' + j.key),
      j.ref !== void 0 && (ae = j.ref));
    for (X in j) w.call(j, X) && !M.hasOwnProperty(X) && (O[X] = j[X]);
    if (H && H.defaultProps) for (X in ((j = H.defaultProps), j)) O[X] === void 0 && (O[X] = j[X]);
    return { $$typeof: f, type: H, key: b, ref: ae, props: O, _owner: C.current };
  }
  return ((Sr.Fragment = s), (Sr.jsx = D), (Sr.jsxs = D), Sr);
}
var Ba;
function cf() {
  return (Ba || ((Ba = 1), (Di.exports = af())), Di.exports);
}
var E = cf(),
  q = $i();
const df = uf(q);
var Ml = {},
  Mi = { exports: {} },
  We = {},
  ji = { exports: {} },
  Fi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $a;
function ff() {
  return (
    $a ||
      (($a = 1),
      (function (c) {
        function f(P, B) {
          var _ = P.length;
          P.push(B);
          e: for (; 0 < _; ) {
            var p = (_ - 1) >>> 1,
              y = P[p];
            if (0 < C(y, B)) ((P[p] = B), (P[_] = y), (_ = p));
            else break e;
          }
        }
        function s(P) {
          return P.length === 0 ? null : P[0];
        }
        function w(P) {
          if (P.length === 0) return null;
          var B = P[0],
            _ = P.pop();
          if (_ !== B) {
            P[0] = _;
            e: for (var p = 0, y = P.length, K = y >>> 1; p < K; ) {
              var G = 2 * (p + 1) - 1,
                J = P[G],
                ee = G + 1,
                ue = P[ee];
              if (0 > C(J, _))
                ee < y && 0 > C(ue, J)
                  ? ((P[p] = ue), (P[ee] = _), (p = ee))
                  : ((P[p] = J), (P[G] = _), (p = G));
              else if (ee < y && 0 > C(ue, _)) ((P[p] = ue), (P[ee] = _), (p = ee));
              else break e;
            }
          }
          return B;
        }
        function C(P, B) {
          var _ = P.sortIndex - B.sortIndex;
          return _ !== 0 ? _ : P.id - B.id;
        }
        if (typeof performance == 'object' && typeof performance.now == 'function') {
          var M = performance;
          c.unstable_now = function () {
            return M.now();
          };
        } else {
          var D = Date,
            H = D.now();
          c.unstable_now = function () {
            return D.now() - H;
          };
        }
        var j = [],
          Q = [],
          X = 1,
          O = null,
          b = 3,
          ae = !1,
          F = !1,
          $ = !1,
          R = typeof setTimeout == 'function' ? setTimeout : null,
          ne = typeof clearTimeout == 'function' ? clearTimeout : null,
          ve = typeof setImmediate < 'u' ? setImmediate : null;
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function re(P) {
          for (var B = s(Q); B !== null; ) {
            if (B.callback === null) w(Q);
            else if (B.startTime <= P) (w(Q), (B.sortIndex = B.expirationTime), f(j, B));
            else break;
            B = s(Q);
          }
        }
        function fe(P) {
          if ((($ = !1), re(P), !F))
            if (s(j) !== null) ((F = !0), Ue(Ce));
            else {
              var B = s(Q);
              B !== null && ye(fe, B.startTime - P);
            }
        }
        function Ce(P, B) {
          ((F = !1), $ && (($ = !1), ne(qe), (qe = -1)), (ae = !0));
          var _ = b;
          try {
            for (re(B), O = s(j); O !== null && (!(O.expirationTime > B) || (P && !Gt())); ) {
              var p = O.callback;
              if (typeof p == 'function') {
                ((O.callback = null), (b = O.priorityLevel));
                var y = p(O.expirationTime <= B);
                ((B = c.unstable_now()),
                  typeof y == 'function' ? (O.callback = y) : O === s(j) && w(j),
                  re(B));
              } else w(j);
              O = s(j);
            }
            if (O !== null) var K = !0;
            else {
              var G = s(Q);
              (G !== null && ye(fe, G.startTime - B), (K = !1));
            }
            return K;
          } finally {
            ((O = null), (b = _), (ae = !1));
          }
        }
        var ie = !1,
          Ne = null,
          qe = -1,
          _t = 5,
          kt = -1;
        function Gt() {
          return !(c.unstable_now() - kt < _t);
        }
        function ft() {
          if (Ne !== null) {
            var P = c.unstable_now();
            kt = P;
            var B = !0;
            try {
              B = Ne(!0, P);
            } finally {
              B ? Qe() : ((ie = !1), (Ne = null));
            }
          } else ie = !1;
        }
        var Qe;
        if (typeof ve == 'function')
          Qe = function () {
            ve(ft);
          };
        else if (typeof MessageChannel < 'u') {
          var lt = new MessageChannel(),
            pt = lt.port2;
          ((lt.port1.onmessage = ft),
            (Qe = function () {
              pt.postMessage(null);
            }));
        } else
          Qe = function () {
            R(ft, 0);
          };
        function Ue(P) {
          ((Ne = P), ie || ((ie = !0), Qe()));
        }
        function ye(P, B) {
          qe = R(function () {
            P(c.unstable_now());
          }, B);
        }
        ((c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (P) {
            P.callback = null;
          }),
          (c.unstable_continueExecution = function () {
            F || ae || ((F = !0), Ue(Ce));
          }),
          (c.unstable_forceFrameRate = function (P) {
            0 > P || 125 < P
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                )
              : (_t = 0 < P ? Math.floor(1e3 / P) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return b;
          }),
          (c.unstable_getFirstCallbackNode = function () {
            return s(j);
          }),
          (c.unstable_next = function (P) {
            switch (b) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = b;
            }
            var _ = b;
            b = B;
            try {
              return P();
            } finally {
              b = _;
            }
          }),
          (c.unstable_pauseExecution = function () {}),
          (c.unstable_requestPaint = function () {}),
          (c.unstable_runWithPriority = function (P, B) {
            switch (P) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                P = 3;
            }
            var _ = b;
            b = P;
            try {
              return B();
            } finally {
              b = _;
            }
          }),
          (c.unstable_scheduleCallback = function (P, B, _) {
            var p = c.unstable_now();
            switch (
              (typeof _ == 'object' && _ !== null
                ? ((_ = _.delay), (_ = typeof _ == 'number' && 0 < _ ? p + _ : p))
                : (_ = p),
              P)
            ) {
              case 1:
                var y = -1;
                break;
              case 2:
                y = 250;
                break;
              case 5:
                y = 1073741823;
                break;
              case 4:
                y = 1e4;
                break;
              default:
                y = 5e3;
            }
            return (
              (y = _ + y),
              (P = {
                id: X++,
                callback: B,
                priorityLevel: P,
                startTime: _,
                expirationTime: y,
                sortIndex: -1,
              }),
              _ > p
                ? ((P.sortIndex = _),
                  f(Q, P),
                  s(j) === null &&
                    P === s(Q) &&
                    ($ ? (ne(qe), (qe = -1)) : ($ = !0), ye(fe, _ - p)))
                : ((P.sortIndex = y), f(j, P), F || ae || ((F = !0), Ue(Ce))),
              P
            );
          }),
          (c.unstable_shouldYield = Gt),
          (c.unstable_wrapCallback = function (P) {
            var B = b;
            return function () {
              var _ = b;
              b = B;
              try {
                return P.apply(this, arguments);
              } finally {
                b = _;
              }
            };
          }));
      })(Fi)),
    Fi
  );
}
var Va;
function pf() {
  return (Va || ((Va = 1), (ji.exports = ff())), ji.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ha;
function mf() {
  if (Ha) return We;
  Ha = 1;
  var c = $i(),
    f = pf();
  function s(e) {
    for (
      var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
      n < arguments.length;
      n++
    )
      t += '&args[]=' + encodeURIComponent(arguments[n]);
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  var w = new Set(),
    C = {};
  function M(e, t) {
    (D(e, t), D(e + 'Capture', t));
  }
  function D(e, t) {
    for (C[e] = t, e = 0; e < t.length; e++) w.add(t[e]);
  }
  var H = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    j = Object.prototype.hasOwnProperty,
    Q =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    X = {},
    O = {};
  function b(e) {
    return j.call(O, e) ? !0 : j.call(X, e) ? !1 : Q.test(e) ? (O[e] = !0) : ((X[e] = !0), !1);
  }
  function ae(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case 'function':
      case 'symbol':
        return !0;
      case 'boolean':
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
      default:
        return !1;
    }
  }
  function F(e, t, n, r) {
    if (t === null || typeof t > 'u' || ae(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function $(e, t, n, r, l, o, i) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = o),
      (this.removeEmptyString = i));
  }
  var R = {};
  ('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
      R[e] = new $(e, 0, !1, e, null, !1, !1);
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var t = e[0];
      R[t] = new $(t, 1, !1, e[1], null, !1, !1);
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
      R[e] = new $(e, 2, !1, e.toLowerCase(), null, !1, !1);
    }),
    ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(
      function (e) {
        R[e] = new $(e, 2, !1, e, null, !1, !1);
      },
    ),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        R[e] = new $(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      R[e] = new $(e, 3, !0, e, null, !1, !1);
    }),
    ['capture', 'download'].forEach(function (e) {
      R[e] = new $(e, 4, !1, e, null, !1, !1);
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      R[e] = new $(e, 6, !1, e, null, !1, !1);
    }),
    ['rowSpan', 'start'].forEach(function (e) {
      R[e] = new $(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var ne = /[\-:]([a-z])/g;
  function ve(e) {
    return e[1].toUpperCase();
  }
  ('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
      var t = e.replace(ne, ve);
      R[t] = new $(t, 1, !1, e, null, !1, !1);
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(ne, ve);
        R[t] = new $(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var t = e.replace(ne, ve);
      R[t] = new $(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (e) {
      R[e] = new $(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (R.xlinkHref = new $('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)),
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      R[e] = new $(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function re(e, t, n, r) {
    var l = R.hasOwnProperty(t) ? R[t] : null;
    (l !== null
      ? l.type !== 0
      : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
      (F(t, n, l, r) && (n = null),
      r || l === null
        ? b(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var fe = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Ce = Symbol.for('react.element'),
    ie = Symbol.for('react.portal'),
    Ne = Symbol.for('react.fragment'),
    qe = Symbol.for('react.strict_mode'),
    _t = Symbol.for('react.profiler'),
    kt = Symbol.for('react.provider'),
    Gt = Symbol.for('react.context'),
    ft = Symbol.for('react.forward_ref'),
    Qe = Symbol.for('react.suspense'),
    lt = Symbol.for('react.suspense_list'),
    pt = Symbol.for('react.memo'),
    Ue = Symbol.for('react.lazy'),
    ye = Symbol.for('react.offscreen'),
    P = Symbol.iterator;
  function B(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (P && e[P]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var _ = Object.assign,
    p;
  function y(e) {
    if (p === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        p = (t && t[1]) || '';
      }
    return (
      `
` +
      p +
      e
    );
  }
  var K = !1;
  function G(e, t) {
    if (!e || K) return '';
    K = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, 'props', {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (g) {
            var r = g;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (g) {
            r = g;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (g) {
          r = g;
        }
        e();
      }
    } catch (g) {
      if (g && r && typeof g.stack == 'string') {
        for (
          var l = g.stack.split(`
`),
            o = r.stack.split(`
`),
            i = l.length - 1,
            u = o.length - 1;
          1 <= i && 0 <= u && l[i] !== o[u];
        )
          u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (l[i] !== o[u]) {
            if (i !== 1 || u !== 1)
              do
                if ((i--, u--, 0 > u || l[i] !== o[u])) {
                  var a =
                    `
` + l[i].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      a.includes('<anonymous>') &&
                      (a = a.replace('<anonymous>', e.displayName)),
                    a
                  );
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      ((K = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : '') ? y(e) : '';
  }
  function J(e) {
    switch (e.tag) {
      case 5:
        return y(e.type);
      case 16:
        return y('Lazy');
      case 13:
        return y('Suspense');
      case 19:
        return y('SuspenseList');
      case 0:
      case 2:
      case 15:
        return ((e = G(e.type, !1)), e);
      case 11:
        return ((e = G(e.type.render, !1)), e);
      case 1:
        return ((e = G(e.type, !0)), e);
      default:
        return '';
    }
  }
  function ee(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Ne:
        return 'Fragment';
      case ie:
        return 'Portal';
      case _t:
        return 'Profiler';
      case qe:
        return 'StrictMode';
      case Qe:
        return 'Suspense';
      case lt:
        return 'SuspenseList';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case Gt:
          return (e.displayName || 'Context') + '.Consumer';
        case kt:
          return (e._context.displayName || 'Context') + '.Provider';
        case ft:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case pt:
          return ((t = e.displayName || null), t !== null ? t : ee(e.type) || 'Memo');
        case Ue:
          ((t = e._payload), (e = e._init));
          try {
            return ee(e(t));
          } catch {}
      }
    return null;
  }
  function ue(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return 'Cache';
      case 9:
        return (t.displayName || 'Context') + '.Consumer';
      case 10:
        return (t._context.displayName || 'Context') + '.Provider';
      case 18:
        return 'DehydratedFragment';
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ''),
          t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
        );
      case 7:
        return 'Fragment';
      case 5:
        return t;
      case 4:
        return 'Portal';
      case 3:
        return 'Root';
      case 6:
        return 'Text';
      case 16:
        return ee(t);
      case 8:
        return t === qe ? 'StrictMode' : 'Mode';
      case 22:
        return 'Offscreen';
      case 12:
        return 'Profiler';
      case 21:
        return 'Scope';
      case 13:
        return 'Suspense';
      case 19:
        return 'SuspenseList';
      case 25:
        return 'TracingMarker';
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == 'function') return t.displayName || t.name || null;
        if (typeof t == 'string') return t;
    }
    return null;
  }
  function le(e) {
    switch (typeof e) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e;
      case 'object':
        return e;
      default:
        return '';
    }
  }
  function pe(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function be(e) {
    var t = pe(e) ? 'checked' : 'value',
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = '' + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var l = n.get,
        o = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (i) {
            ((r = '' + i), o.call(this, i));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (i) {
            r = '' + i;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Er(e) {
    e._valueTracker || (e._valueTracker = be(e));
  }
  function Hi(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = '';
    return (
      e && (r = pe(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Pr(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Ul(e, t) {
    var n = t.checked;
    return _({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Wi(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = le(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
      }));
  }
  function Qi(e, t) {
    ((t = t.checked), t != null && re(e, 'checked', t, !1));
  }
  function Al(e, t) {
    Qi(e, t);
    var n = le(t.value),
      r = t.type;
    if (n != null)
      r === 'number'
        ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
        : e.value !== '' + n && (e.value = '' + n);
    else if (r === 'submit' || r === 'reset') {
      e.removeAttribute('value');
      return;
    }
    (t.hasOwnProperty('value')
      ? Bl(e, t.type, n)
      : t.hasOwnProperty('defaultValue') && Bl(e, t.type, le(t.defaultValue)),
      t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
  }
  function bi(e, t, n) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
      var r = t.type;
      if (!((r !== 'submit' && r !== 'reset') || (t.value !== void 0 && t.value !== null))) return;
      ((t = '' + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = e.name),
      n !== '' && (e.name = ''),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== '' && (e.name = n));
  }
  function Bl(e, t, n) {
    (t !== 'number' || Pr(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = '' + e._wrapperState.initialValue)
        : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
  }
  var Fn = Array.isArray;
  function cn(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        ((l = t.hasOwnProperty('$' + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && r && (e[n].defaultSelected = !0));
    } else {
      for (n = '' + le(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function $l(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return _({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: '' + e._wrapperState.initialValue,
    });
  }
  function Ki(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(s(92));
        if (Fn(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ''), (n = t));
    }
    e._wrapperState = { initialValue: le(n) };
  }
  function Yi(e, t) {
    var n = le(t.value),
      r = le(t.defaultValue);
    (n != null &&
      ((n = '' + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = '' + r));
  }
  function Gi(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
  }
  function Xi(e) {
    switch (e) {
      case 'svg':
        return 'http://www.w3.org/2000/svg';
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML';
      default:
        return 'http://www.w3.org/1999/xhtml';
    }
  }
  function Vl(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
      ? Xi(t)
      : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
  }
  var Lr,
    qi = (function (e) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, l);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
      else {
        for (
          Lr = Lr || document.createElement('div'),
            Lr.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
            t = Lr.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function On(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Un = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    cc = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(Un).forEach(function (e) {
    cc.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Un[t] = Un[e]));
    });
  });
  function Zi(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
      ? ''
      : n || typeof t != 'number' || t === 0 || (Un.hasOwnProperty(e) && Un[e])
        ? ('' + t).trim()
        : t + 'px';
  }
  function Ji(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf('--') === 0,
          l = Zi(n, t[n], r);
        (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l));
      }
  }
  var dc = _(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function Hl(e, t) {
    if (t) {
      if (dc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (
          typeof t.dangerouslySetInnerHTML != 'object' ||
          !('__html' in t.dangerouslySetInnerHTML)
        )
          throw Error(s(61));
      }
      if (t.style != null && typeof t.style != 'object') throw Error(s(62));
    }
  }
  function Wl(e, t) {
    if (e.indexOf('-') === -1) return typeof t.is == 'string';
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Ql = null;
  function bl(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Kl = null,
    dn = null,
    fn = null;
  function eu(e) {
    if ((e = ir(e))) {
      if (typeof Kl != 'function') throw Error(s(280));
      var t = e.stateNode;
      t && ((t = Gr(t)), Kl(e.stateNode, e.type, t));
    }
  }
  function tu(e) {
    dn ? (fn ? fn.push(e) : (fn = [e])) : (dn = e);
  }
  function nu() {
    if (dn) {
      var e = dn,
        t = fn;
      if (((fn = dn = null), eu(e), t)) for (e = 0; e < t.length; e++) eu(t[e]);
    }
  }
  function ru(e, t) {
    return e(t);
  }
  function lu() {}
  var Yl = !1;
  function ou(e, t, n) {
    if (Yl) return e(t, n);
    Yl = !0;
    try {
      return ru(e, t, n);
    } finally {
      ((Yl = !1), (dn !== null || fn !== null) && (lu(), nu()));
    }
  }
  function An(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Gr(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((r = !r.disabled) ||
          ((e = e.type),
          (r = !(e === 'button' || e === 'input' || e === 'select' || e === 'textarea'))),
          (e = !r));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != 'function') throw Error(s(231, t, typeof n));
    return n;
  }
  var Gl = !1;
  if (H)
    try {
      var Bn = {};
      (Object.defineProperty(Bn, 'passive', {
        get: function () {
          Gl = !0;
        },
      }),
        window.addEventListener('test', Bn, Bn),
        window.removeEventListener('test', Bn, Bn));
    } catch {
      Gl = !1;
    }
  function fc(e, t, n, r, l, o, i, u, a) {
    var g = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, g);
    } catch (k) {
      this.onError(k);
    }
  }
  var $n = !1,
    zr = null,
    _r = !1,
    Xl = null,
    pc = {
      onError: function (e) {
        (($n = !0), (zr = e));
      },
    };
  function mc(e, t, n, r, l, o, i, u, a) {
    (($n = !1), (zr = null), fc.apply(pc, arguments));
  }
  function hc(e, t, n, r, l, o, i, u, a) {
    if ((mc.apply(this, arguments), $n)) {
      if ($n) {
        var g = zr;
        (($n = !1), (zr = null));
      } else throw Error(s(198));
      _r || ((_r = !0), (Xl = g));
    }
  }
  function Xt(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function iu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function uu(e) {
    if (Xt(e) !== e) throw Error(s(188));
  }
  function gc(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = Xt(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (((r = l.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return (uu(l), e);
          if (o === r) return (uu(l), t);
          o = o.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) ((n = l), (r = o));
      else {
        for (var i = !1, u = l.child; u; ) {
          if (u === n) {
            ((i = !0), (n = l), (r = o));
            break;
          }
          if (u === r) {
            ((i = !0), (r = l), (n = o));
            break;
          }
          u = u.sibling;
        }
        if (!i) {
          for (u = o.child; u; ) {
            if (u === n) {
              ((i = !0), (n = o), (r = l));
              break;
            }
            if (u === r) {
              ((i = !0), (r = o), (n = l));
              break;
            }
            u = u.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function su(e) {
    return ((e = gc(e)), e !== null ? au(e) : null);
  }
  function au(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = au(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var cu = f.unstable_scheduleCallback,
    du = f.unstable_cancelCallback,
    vc = f.unstable_shouldYield,
    yc = f.unstable_requestPaint,
    we = f.unstable_now,
    kc = f.unstable_getCurrentPriorityLevel,
    ql = f.unstable_ImmediatePriority,
    fu = f.unstable_UserBlockingPriority,
    Tr = f.unstable_NormalPriority,
    wc = f.unstable_LowPriority,
    pu = f.unstable_IdlePriority,
    Rr = null,
    mt = null;
  function Sc(e) {
    if (mt && typeof mt.onCommitFiberRoot == 'function')
      try {
        mt.onCommitFiberRoot(Rr, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var ot = Math.clz32 ? Math.clz32 : Ec,
    xc = Math.log,
    Cc = Math.LN2;
  function Ec(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((xc(e) / Cc) | 0)) | 0);
  }
  var Nr = 64,
    Dr = 4194304;
  function Vn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Ir(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      l = e.suspendedLanes,
      o = e.pingedLanes,
      i = n & 268435455;
    if (i !== 0) {
      var u = i & ~l;
      u !== 0 ? (r = Vn(u)) : ((o &= i), o !== 0 && (r = Vn(o)));
    } else ((i = n & ~l), i !== 0 ? (r = Vn(i)) : o !== 0 && (r = Vn(o)));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      (t & l) === 0 &&
      ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
    )
      return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        ((n = 31 - ot(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
    return r;
  }
  function Pc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Lc(e, t) {
    for (
      var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes;
      0 < o;
    ) {
      var i = 31 - ot(o),
        u = 1 << i,
        a = l[i];
      (a === -1
        ? ((u & n) === 0 || (u & r) !== 0) && (l[i] = Pc(u, t))
        : a <= t && (e.expiredLanes |= u),
        (o &= ~u));
    }
  }
  function Zl(e) {
    return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
  }
  function mu() {
    var e = Nr;
    return ((Nr <<= 1), (Nr & 4194240) === 0 && (Nr = 64), e);
  }
  function Jl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Hn(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - ot(t)),
      (e[t] = n));
  }
  function zc(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - ot(n),
        o = 1 << l;
      ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o));
    }
  }
  function eo(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - ot(n),
        l = 1 << r;
      ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
    }
  }
  var oe = 0;
  function hu(e) {
    return ((e &= -e), 1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1);
  }
  var gu,
    to,
    vu,
    yu,
    ku,
    no = !1,
    Mr = [],
    Tt = null,
    Rt = null,
    Nt = null,
    Wn = new Map(),
    Qn = new Map(),
    Dt = [],
    _c =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' ',
      );
  function wu(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Tt = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Rt = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Nt = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Wn.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Qn.delete(t.pointerId);
    }
  }
  function bn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: o,
          targetContainers: [l],
        }),
        t !== null && ((t = ir(t)), t !== null && to(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function Tc(e, t, n, r, l) {
    switch (t) {
      case 'focusin':
        return ((Tt = bn(Tt, e, t, n, r, l)), !0);
      case 'dragenter':
        return ((Rt = bn(Rt, e, t, n, r, l)), !0);
      case 'mouseover':
        return ((Nt = bn(Nt, e, t, n, r, l)), !0);
      case 'pointerover':
        var o = l.pointerId;
        return (Wn.set(o, bn(Wn.get(o) || null, e, t, n, r, l)), !0);
      case 'gotpointercapture':
        return ((o = l.pointerId), Qn.set(o, bn(Qn.get(o) || null, e, t, n, r, l)), !0);
    }
    return !1;
  }
  function Su(e) {
    var t = qt(e.target);
    if (t !== null) {
      var n = Xt(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = iu(n)), t !== null)) {
            ((e.blockedOn = t),
              ku(e.priority, function () {
                vu(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function jr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = lo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((Ql = r), n.target.dispatchEvent(r), (Ql = null));
      } else return ((t = ir(n)), t !== null && to(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function xu(e, t, n) {
    jr(e) && n.delete(t);
  }
  function Rc() {
    ((no = !1),
      Tt !== null && jr(Tt) && (Tt = null),
      Rt !== null && jr(Rt) && (Rt = null),
      Nt !== null && jr(Nt) && (Nt = null),
      Wn.forEach(xu),
      Qn.forEach(xu));
  }
  function Kn(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      no || ((no = !0), f.unstable_scheduleCallback(f.unstable_NormalPriority, Rc)));
  }
  function Yn(e) {
    function t(l) {
      return Kn(l, e);
    }
    if (0 < Mr.length) {
      Kn(Mr[0], e);
      for (var n = 1; n < Mr.length; n++) {
        var r = Mr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      Tt !== null && Kn(Tt, e),
        Rt !== null && Kn(Rt, e),
        Nt !== null && Kn(Nt, e),
        Wn.forEach(t),
        Qn.forEach(t),
        n = 0;
      n < Dt.length;
      n++
    )
      ((r = Dt[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < Dt.length && ((n = Dt[0]), n.blockedOn === null); )
      (Su(n), n.blockedOn === null && Dt.shift());
  }
  var pn = fe.ReactCurrentBatchConfig,
    Fr = !0;
  function Nc(e, t, n, r) {
    var l = oe,
      o = pn.transition;
    pn.transition = null;
    try {
      ((oe = 1), ro(e, t, n, r));
    } finally {
      ((oe = l), (pn.transition = o));
    }
  }
  function Dc(e, t, n, r) {
    var l = oe,
      o = pn.transition;
    pn.transition = null;
    try {
      ((oe = 4), ro(e, t, n, r));
    } finally {
      ((oe = l), (pn.transition = o));
    }
  }
  function ro(e, t, n, r) {
    if (Fr) {
      var l = lo(e, t, n, r);
      if (l === null) (xo(e, t, r, Or, n), wu(e, r));
      else if (Tc(l, e, t, n, r)) r.stopPropagation();
      else if ((wu(e, r), t & 4 && -1 < _c.indexOf(e))) {
        for (; l !== null; ) {
          var o = ir(l);
          if (
            (o !== null && gu(o), (o = lo(e, t, n, r)), o === null && xo(e, t, r, Or, n), o === l)
          )
            break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else xo(e, t, r, null, n);
    }
  }
  var Or = null;
  function lo(e, t, n, r) {
    if (((Or = null), (e = bl(r)), (e = qt(e)), e !== null))
      if (((t = Xt(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = iu(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((Or = e), null);
  }
  function Cu(e) {
    switch (e) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4;
      case 'message':
        switch (kc()) {
          case ql:
            return 1;
          case fu:
            return 4;
          case Tr:
          case wc:
            return 16;
          case pu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var It = null,
    oo = null,
    Ur = null;
  function Eu() {
    if (Ur) return Ur;
    var e,
      t = oo,
      n = t.length,
      r,
      l = 'value' in It ? It.value : It.textContent,
      o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
    return (Ur = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Ar(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Br() {
    return !0;
  }
  function Pu() {
    return !1;
  }
  function Ke(e) {
    function t(n, r, l, o, i) {
      ((this._reactName = n),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = o),
        (this.target = i),
        (this.currentTarget = null));
      for (var u in e) e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? Br
          : Pu),
        (this.isPropagationStopped = Pu),
        this
      );
    }
    return (
      _(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
            (this.isDefaultPrevented = Br));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
            (this.isPropagationStopped = Br));
        },
        persist: function () {},
        isPersistent: Br,
      }),
      t
    );
  }
  var mn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    io = Ke(mn),
    Gn = _({}, mn, { view: 0, detail: 0 }),
    Ic = Ke(Gn),
    uo,
    so,
    Xn,
    $r = _({}, Gn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: co,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== Xn &&
              (Xn && e.type === 'mousemove'
                ? ((uo = e.screenX - Xn.screenX), (so = e.screenY - Xn.screenY))
                : (so = uo = 0),
              (Xn = e)),
            uo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : so;
      },
    }),
    Lu = Ke($r),
    Mc = _({}, $r, { dataTransfer: 0 }),
    jc = Ke(Mc),
    Fc = _({}, Gn, { relatedTarget: 0 }),
    ao = Ke(Fc),
    Oc = _({}, mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Uc = Ke(Oc),
    Ac = _({}, mn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Bc = Ke(Ac),
    $c = _({}, mn, { data: 0 }),
    zu = Ke($c),
    Vc = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Hc = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Wc = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Qc(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Wc[e]) ? !!t[e] : !1;
  }
  function co() {
    return Qc;
  }
  var bc = _({}, Gn, {
      key: function (e) {
        if (e.key) {
          var t = Vc[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Ar(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Hc[e.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: co,
      charCode: function (e) {
        return e.type === 'keypress' ? Ar(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Ar(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Kc = Ke(bc),
    Yc = _({}, $r, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    _u = Ke(Yc),
    Gc = _({}, Gn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: co,
    }),
    Xc = Ke(Gc),
    qc = _({}, mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Zc = Ke(qc),
    Jc = _({}, $r, {
      deltaX: function (e) {
        return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    ed = Ke(Jc),
    td = [9, 13, 27, 32],
    fo = H && 'CompositionEvent' in window,
    qn = null;
  H && 'documentMode' in document && (qn = document.documentMode);
  var nd = H && 'TextEvent' in window && !qn,
    Tu = H && (!fo || (qn && 8 < qn && 11 >= qn)),
    Ru = ' ',
    Nu = !1;
  function Du(e, t) {
    switch (e) {
      case 'keyup':
        return td.indexOf(t.keyCode) !== -1;
      case 'keydown':
        return t.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Iu(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var hn = !1;
  function rd(e, t) {
    switch (e) {
      case 'compositionend':
        return Iu(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Nu = !0), Ru);
      case 'textInput':
        return ((e = t.data), e === Ru && Nu ? null : e);
      default:
        return null;
    }
  }
  function ld(e, t) {
    if (hn)
      return e === 'compositionend' || (!fo && Du(e, t))
        ? ((e = Eu()), (Ur = oo = It = null), (hn = !1), e)
        : null;
    switch (e) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case 'compositionend':
        return Tu && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var od = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Mu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!od[e.type] : t === 'textarea';
  }
  function ju(e, t, n, r) {
    (tu(r),
      (t = br(t, 'onChange')),
      0 < t.length &&
        ((n = new io('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
  }
  var Zn = null,
    Jn = null;
  function id(e) {
    Ju(e, 0);
  }
  function Vr(e) {
    var t = wn(e);
    if (Hi(t)) return e;
  }
  function ud(e, t) {
    if (e === 'change') return t;
  }
  var Fu = !1;
  if (H) {
    var po;
    if (H) {
      var mo = 'oninput' in document;
      if (!mo) {
        var Ou = document.createElement('div');
        (Ou.setAttribute('oninput', 'return;'), (mo = typeof Ou.oninput == 'function'));
      }
      po = mo;
    } else po = !1;
    Fu = po && (!document.documentMode || 9 < document.documentMode);
  }
  function Uu() {
    Zn && (Zn.detachEvent('onpropertychange', Au), (Jn = Zn = null));
  }
  function Au(e) {
    if (e.propertyName === 'value' && Vr(Jn)) {
      var t = [];
      (ju(t, Jn, e, bl(e)), ou(id, t));
    }
  }
  function sd(e, t, n) {
    e === 'focusin'
      ? (Uu(), (Zn = t), (Jn = n), Zn.attachEvent('onpropertychange', Au))
      : e === 'focusout' && Uu();
  }
  function ad(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Vr(Jn);
  }
  function cd(e, t) {
    if (e === 'click') return Vr(t);
  }
  function dd(e, t) {
    if (e === 'input' || e === 'change') return Vr(t);
  }
  function fd(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var it = typeof Object.is == 'function' ? Object.is : fd;
  function er(e, t) {
    if (it(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!j.call(t, l) || !it(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Bu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function $u(e, t) {
    var n = Bu(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Bu(n);
    }
  }
  function Vu(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Vu(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Hu() {
    for (var e = window, t = Pr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == 'string';
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Pr(e.document);
    }
    return t;
  }
  function ho(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    );
  }
  function pd(e) {
    var t = Hu(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Vu(n.ownerDocument.documentElement, n)) {
      if (r !== null && ho(n)) {
        if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
          ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
        ) {
          e = e.getSelection();
          var l = n.textContent.length,
            o = Math.min(r.start, l);
          ((r = r.end === void 0 ? o : Math.min(r.end, l)),
            !e.extend && o > r && ((l = r), (r = o), (o = l)),
            (l = $u(n, o)));
          var i = $u(n, r);
          l &&
            i &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== i.node ||
              e.focusOffset !== i.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            o > r
              ? (e.addRange(t), e.extend(i.node, i.offset))
              : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
        ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
    }
  }
  var md = H && 'documentMode' in document && 11 >= document.documentMode,
    gn = null,
    go = null,
    tr = null,
    vo = !1;
  function Wu(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    vo ||
      gn == null ||
      gn !== Pr(r) ||
      ((r = gn),
      'selectionStart' in r && ho(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (tr && er(tr, r)) ||
        ((tr = r),
        (r = br(go, 'onSelect')),
        0 < r.length &&
          ((t = new io('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = gn))));
  }
  function Hr(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    );
  }
  var vn = {
      animationend: Hr('Animation', 'AnimationEnd'),
      animationiteration: Hr('Animation', 'AnimationIteration'),
      animationstart: Hr('Animation', 'AnimationStart'),
      transitionend: Hr('Transition', 'TransitionEnd'),
    },
    yo = {},
    Qu = {};
  H &&
    ((Qu = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete vn.animationend.animation,
      delete vn.animationiteration.animation,
      delete vn.animationstart.animation),
    'TransitionEvent' in window || delete vn.transitionend.transition);
  function Wr(e) {
    if (yo[e]) return yo[e];
    if (!vn[e]) return e;
    var t = vn[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Qu) return (yo[e] = t[n]);
    return e;
  }
  var bu = Wr('animationend'),
    Ku = Wr('animationiteration'),
    Yu = Wr('animationstart'),
    Gu = Wr('transitionend'),
    Xu = new Map(),
    qu =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
  function Mt(e, t) {
    (Xu.set(e, t), M(t, [e]));
  }
  for (var ko = 0; ko < qu.length; ko++) {
    var wo = qu[ko],
      hd = wo.toLowerCase(),
      gd = wo[0].toUpperCase() + wo.slice(1);
    Mt(hd, 'on' + gd);
  }
  (Mt(bu, 'onAnimationEnd'),
    Mt(Ku, 'onAnimationIteration'),
    Mt(Yu, 'onAnimationStart'),
    Mt('dblclick', 'onDoubleClick'),
    Mt('focusin', 'onFocus'),
    Mt('focusout', 'onBlur'),
    Mt(Gu, 'onTransitionEnd'),
    D('onMouseEnter', ['mouseout', 'mouseover']),
    D('onMouseLeave', ['mouseout', 'mouseover']),
    D('onPointerEnter', ['pointerout', 'pointerover']),
    D('onPointerLeave', ['pointerout', 'pointerover']),
    M('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    M(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    ),
    M('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    M('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    M(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    ),
    M(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    ));
  var nr =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' ',
      ),
    vd = new Set('cancel close invalid load scroll toggle'.split(' ').concat(nr));
  function Zu(e, t, n) {
    var r = e.type || 'unknown-event';
    ((e.currentTarget = n), hc(r, t, void 0, e), (e.currentTarget = null));
  }
  function Ju(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var i = r.length - 1; 0 <= i; i--) {
            var u = r[i],
              a = u.instance,
              g = u.currentTarget;
            if (((u = u.listener), a !== o && l.isPropagationStopped())) break e;
            (Zu(l, u, g), (o = a));
          }
        else
          for (i = 0; i < r.length; i++) {
            if (
              ((u = r[i]),
              (a = u.instance),
              (g = u.currentTarget),
              (u = u.listener),
              a !== o && l.isPropagationStopped())
            )
              break e;
            (Zu(l, u, g), (o = a));
          }
      }
    }
    if (_r) throw ((e = Xl), (_r = !1), (Xl = null), e);
  }
  function ce(e, t) {
    var n = t[_o];
    n === void 0 && (n = t[_o] = new Set());
    var r = e + '__bubble';
    n.has(r) || (es(t, e, 2, !1), n.add(r));
  }
  function So(e, t, n) {
    var r = 0;
    (t && (r |= 4), es(n, e, r, t));
  }
  var Qr = '_reactListening' + Math.random().toString(36).slice(2);
  function rr(e) {
    if (!e[Qr]) {
      ((e[Qr] = !0),
        w.forEach(function (n) {
          n !== 'selectionchange' && (vd.has(n) || So(n, !1, e), So(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Qr] || ((t[Qr] = !0), So('selectionchange', !1, t));
    }
  }
  function es(e, t, n, r) {
    switch (Cu(t)) {
      case 1:
        var l = Nc;
        break;
      case 4:
        l = Dc;
        break;
      default:
        l = ro;
    }
    ((n = l.bind(null, t, n, e)),
      (l = void 0),
      !Gl || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1));
  }
  function xo(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var i = r.tag;
        if (i === 3 || i === 4) {
          var u = r.stateNode.containerInfo;
          if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
          if (i === 4)
            for (i = r.return; i !== null; ) {
              var a = i.tag;
              if (
                (a === 3 || a === 4) &&
                ((a = i.stateNode.containerInfo),
                a === l || (a.nodeType === 8 && a.parentNode === l))
              )
                return;
              i = i.return;
            }
          for (; u !== null; ) {
            if (((i = qt(u)), i === null)) return;
            if (((a = i.tag), a === 5 || a === 6)) {
              r = o = i;
              continue e;
            }
            u = u.parentNode;
          }
        }
        r = r.return;
      }
    ou(function () {
      var g = o,
        k = bl(n),
        S = [];
      e: {
        var v = Xu.get(e);
        if (v !== void 0) {
          var L = io,
            T = e;
          switch (e) {
            case 'keypress':
              if (Ar(n) === 0) break e;
            case 'keydown':
            case 'keyup':
              L = Kc;
              break;
            case 'focusin':
              ((T = 'focus'), (L = ao));
              break;
            case 'focusout':
              ((T = 'blur'), (L = ao));
              break;
            case 'beforeblur':
            case 'afterblur':
              L = ao;
              break;
            case 'click':
              if (n.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              L = Lu;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              L = jc;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              L = Xc;
              break;
            case bu:
            case Ku:
            case Yu:
              L = Uc;
              break;
            case Gu:
              L = Zc;
              break;
            case 'scroll':
              L = Ic;
              break;
            case 'wheel':
              L = ed;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              L = Bc;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              L = _u;
          }
          var N = (t & 4) !== 0,
            Se = !N && e === 'scroll',
            m = N ? (v !== null ? v + 'Capture' : null) : v;
          N = [];
          for (var d = g, h; d !== null; ) {
            h = d;
            var x = h.stateNode;
            if (
              (h.tag === 5 &&
                x !== null &&
                ((h = x), m !== null && ((x = An(d, m)), x != null && N.push(lr(d, x, h)))),
              Se)
            )
              break;
            d = d.return;
          }
          0 < N.length && ((v = new L(v, T, null, n, k)), S.push({ event: v, listeners: N }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((v = e === 'mouseover' || e === 'pointerover'),
            (L = e === 'mouseout' || e === 'pointerout'),
            v && n !== Ql && (T = n.relatedTarget || n.fromElement) && (qt(T) || T[wt]))
          )
            break e;
          if (
            (L || v) &&
            ((v =
              k.window === k
                ? k
                : (v = k.ownerDocument)
                  ? v.defaultView || v.parentWindow
                  : window),
            L
              ? ((T = n.relatedTarget || n.toElement),
                (L = g),
                (T = T ? qt(T) : null),
                T !== null &&
                  ((Se = Xt(T)), T !== Se || (T.tag !== 5 && T.tag !== 6)) &&
                  (T = null))
              : ((L = null), (T = g)),
            L !== T)
          ) {
            if (
              ((N = Lu),
              (x = 'onMouseLeave'),
              (m = 'onMouseEnter'),
              (d = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((N = _u), (x = 'onPointerLeave'), (m = 'onPointerEnter'), (d = 'pointer')),
              (Se = L == null ? v : wn(L)),
              (h = T == null ? v : wn(T)),
              (v = new N(x, d + 'leave', L, n, k)),
              (v.target = Se),
              (v.relatedTarget = h),
              (x = null),
              qt(k) === g &&
                ((N = new N(m, d + 'enter', T, n, k)),
                (N.target = h),
                (N.relatedTarget = Se),
                (x = N)),
              (Se = x),
              L && T)
            )
              t: {
                for (N = L, m = T, d = 0, h = N; h; h = yn(h)) d++;
                for (h = 0, x = m; x; x = yn(x)) h++;
                for (; 0 < d - h; ) ((N = yn(N)), d--);
                for (; 0 < h - d; ) ((m = yn(m)), h--);
                for (; d--; ) {
                  if (N === m || (m !== null && N === m.alternate)) break t;
                  ((N = yn(N)), (m = yn(m)));
                }
                N = null;
              }
            else N = null;
            (L !== null && ts(S, v, L, N, !1), T !== null && Se !== null && ts(S, Se, T, N, !0));
          }
        }
        e: {
          if (
            ((v = g ? wn(g) : window),
            (L = v.nodeName && v.nodeName.toLowerCase()),
            L === 'select' || (L === 'input' && v.type === 'file'))
          )
            var I = ud;
          else if (Mu(v))
            if (Fu) I = dd;
            else {
              I = ad;
              var U = sd;
            }
          else
            (L = v.nodeName) &&
              L.toLowerCase() === 'input' &&
              (v.type === 'checkbox' || v.type === 'radio') &&
              (I = cd);
          if (I && (I = I(e, g))) {
            ju(S, I, n, k);
            break e;
          }
          (U && U(e, v, g),
            e === 'focusout' &&
              (U = v._wrapperState) &&
              U.controlled &&
              v.type === 'number' &&
              Bl(v, 'number', v.value));
        }
        switch (((U = g ? wn(g) : window), e)) {
          case 'focusin':
            (Mu(U) || U.contentEditable === 'true') && ((gn = U), (go = g), (tr = null));
            break;
          case 'focusout':
            tr = go = gn = null;
            break;
          case 'mousedown':
            vo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((vo = !1), Wu(S, n, k));
            break;
          case 'selectionchange':
            if (md) break;
          case 'keydown':
          case 'keyup':
            Wu(S, n, k);
        }
        var A;
        if (fo)
          e: {
            switch (e) {
              case 'compositionstart':
                var V = 'onCompositionStart';
                break e;
              case 'compositionend':
                V = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                V = 'onCompositionUpdate';
                break e;
            }
            V = void 0;
          }
        else
          hn
            ? Du(e, n) && (V = 'onCompositionEnd')
            : e === 'keydown' && n.keyCode === 229 && (V = 'onCompositionStart');
        (V &&
          (Tu &&
            n.locale !== 'ko' &&
            (hn || V !== 'onCompositionStart'
              ? V === 'onCompositionEnd' && hn && (A = Eu())
              : ((It = k), (oo = 'value' in It ? It.value : It.textContent), (hn = !0))),
          (U = br(g, V)),
          0 < U.length &&
            ((V = new zu(V, e, null, n, k)),
            S.push({ event: V, listeners: U }),
            A ? (V.data = A) : ((A = Iu(n)), A !== null && (V.data = A)))),
          (A = nd ? rd(e, n) : ld(e, n)) &&
            ((g = br(g, 'onBeforeInput')),
            0 < g.length &&
              ((k = new zu('onBeforeInput', 'beforeinput', null, n, k)),
              S.push({ event: k, listeners: g }),
              (k.data = A))));
      }
      Ju(S, t);
    });
  }
  function lr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function br(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
      var l = e,
        o = l.stateNode;
      (l.tag === 5 &&
        o !== null &&
        ((l = o),
        (o = An(e, n)),
        o != null && r.unshift(lr(e, o, l)),
        (o = An(e, t)),
        o != null && r.push(lr(e, o, l))),
        (e = e.return));
    }
    return r;
  }
  function yn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function ts(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
      var u = n,
        a = u.alternate,
        g = u.stateNode;
      if (a !== null && a === r) break;
      (u.tag === 5 &&
        g !== null &&
        ((u = g),
        l
          ? ((a = An(n, o)), a != null && i.unshift(lr(n, a, u)))
          : l || ((a = An(n, o)), a != null && i.push(lr(n, a, u)))),
        (n = n.return));
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var yd = /\r\n?/g,
    kd = /\u0000|\uFFFD/g;
  function ns(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        yd,
        `
`,
      )
      .replace(kd, '');
  }
  function Kr(e, t, n) {
    if (((t = ns(t)), ns(e) !== t && n)) throw Error(s(425));
  }
  function Yr() {}
  var Co = null,
    Eo = null;
  function Po(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Lo = typeof setTimeout == 'function' ? setTimeout : void 0,
    wd = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    rs = typeof Promise == 'function' ? Promise : void 0,
    Sd =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof rs < 'u'
          ? function (e) {
              return rs.resolve(null).then(e).catch(xd);
            }
          : Lo;
  function xd(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function zo(e, t) {
    var n = t,
      r = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === '/$')) {
          if (r === 0) {
            (e.removeChild(l), Yn(t));
            return;
          }
          r--;
        } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
      n = l;
    } while (n);
    Yn(t);
  }
  function jt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
        if (t === '/$') return null;
      }
    }
    return e;
  }
  function ls(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === '$' || n === '$!' || n === '$?') {
          if (t === 0) return e;
          t--;
        } else n === '/$' && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var kn = Math.random().toString(36).slice(2),
    ht = '__reactFiber$' + kn,
    or = '__reactProps$' + kn,
    wt = '__reactContainer$' + kn,
    _o = '__reactEvents$' + kn,
    Cd = '__reactListeners$' + kn,
    Ed = '__reactHandles$' + kn;
  function qt(e) {
    var t = e[ht];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[wt] || n[ht])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = ls(e); e !== null; ) {
            if ((n = e[ht])) return n;
            e = ls(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function ir(e) {
    return (
      (e = e[ht] || e[wt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
    );
  }
  function wn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Gr(e) {
    return e[or] || null;
  }
  var To = [],
    Sn = -1;
  function Ft(e) {
    return { current: e };
  }
  function de(e) {
    0 > Sn || ((e.current = To[Sn]), (To[Sn] = null), Sn--);
  }
  function se(e, t) {
    (Sn++, (To[Sn] = e.current), (e.current = t));
  }
  var Ot = {},
    De = Ft(Ot),
    Ae = Ft(!1),
    Zt = Ot;
  function xn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Ot;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
      o;
    for (o in n) l[o] = t[o];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    );
  }
  function Be(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function Xr() {
    (de(Ae), de(De));
  }
  function os(e, t, n) {
    if (De.current !== Ot) throw Error(s(168));
    (se(De, t), se(Ae, n));
  }
  function is(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(s(108, ue(e) || 'Unknown', l));
    return _({}, n, r);
  }
  function qr(e) {
    return (
      (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ot),
      (Zt = De.current),
      se(De, e),
      se(Ae, Ae.current),
      !0
    );
  }
  function us(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    (n
      ? ((e = is(e, t, Zt)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        de(Ae),
        de(De),
        se(De, e))
      : de(Ae),
      se(Ae, n));
  }
  var St = null,
    Zr = !1,
    Ro = !1;
  function ss(e) {
    St === null ? (St = [e]) : St.push(e);
  }
  function Pd(e) {
    ((Zr = !0), ss(e));
  }
  function Ut() {
    if (!Ro && St !== null) {
      Ro = !0;
      var e = 0,
        t = oe;
      try {
        var n = St;
        for (oe = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        ((St = null), (Zr = !1));
      } catch (l) {
        throw (St !== null && (St = St.slice(e + 1)), cu(ql, Ut), l);
      } finally {
        ((oe = t), (Ro = !1));
      }
    }
    return null;
  }
  var Cn = [],
    En = 0,
    Jr = null,
    el = 0,
    Ze = [],
    Je = 0,
    Jt = null,
    xt = 1,
    Ct = '';
  function en(e, t) {
    ((Cn[En++] = el), (Cn[En++] = Jr), (Jr = e), (el = t));
  }
  function as(e, t, n) {
    ((Ze[Je++] = xt), (Ze[Je++] = Ct), (Ze[Je++] = Jt), (Jt = e));
    var r = xt;
    e = Ct;
    var l = 32 - ot(r) - 1;
    ((r &= ~(1 << l)), (n += 1));
    var o = 32 - ot(t) + l;
    if (30 < o) {
      var i = l - (l % 5);
      ((o = (r & ((1 << i) - 1)).toString(32)),
        (r >>= i),
        (l -= i),
        (xt = (1 << (32 - ot(t) + l)) | (n << l) | r),
        (Ct = o + e));
    } else ((xt = (1 << o) | (n << l) | r), (Ct = e));
  }
  function No(e) {
    e.return !== null && (en(e, 1), as(e, 1, 0));
  }
  function Do(e) {
    for (; e === Jr; ) ((Jr = Cn[--En]), (Cn[En] = null), (el = Cn[--En]), (Cn[En] = null));
    for (; e === Jt; )
      ((Jt = Ze[--Je]),
        (Ze[Je] = null),
        (Ct = Ze[--Je]),
        (Ze[Je] = null),
        (xt = Ze[--Je]),
        (Ze[Je] = null));
  }
  var Ye = null,
    Ge = null,
    me = !1,
    ut = null;
  function cs(e, t) {
    var n = rt(5, null, null, 0);
    ((n.elementType = 'DELETED'),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function ds(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
          t !== null ? ((e.stateNode = t), (Ye = e), (Ge = jt(t.firstChild)), !0) : !1
        );
      case 6:
        return (
          (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (Ye = e), (Ge = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = Jt !== null ? { id: xt, overflow: Ct } : null),
              (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
              (n = rt(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (Ye = e),
              (Ge = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Io(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Mo(e) {
    if (me) {
      var t = Ge;
      if (t) {
        var n = t;
        if (!ds(e, t)) {
          if (Io(e)) throw Error(s(418));
          t = jt(n.nextSibling);
          var r = Ye;
          t && ds(e, t) ? cs(r, n) : ((e.flags = (e.flags & -4097) | 2), (me = !1), (Ye = e));
        }
      } else {
        if (Io(e)) throw Error(s(418));
        ((e.flags = (e.flags & -4097) | 2), (me = !1), (Ye = e));
      }
    }
  }
  function fs(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Ye = e;
  }
  function tl(e) {
    if (e !== Ye) return !1;
    if (!me) return (fs(e), (me = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type), (t = t !== 'head' && t !== 'body' && !Po(e.type, e.memoizedProps))),
      t && (t = Ge))
    ) {
      if (Io(e)) throw (ps(), Error(s(418)));
      for (; t; ) (cs(e, t), (t = jt(t.nextSibling)));
    }
    if ((fs(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === '/$') {
              if (t === 0) {
                Ge = jt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
          }
          e = e.nextSibling;
        }
        Ge = null;
      }
    } else Ge = Ye ? jt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ps() {
    for (var e = Ge; e; ) e = jt(e.nextSibling);
  }
  function Pn() {
    ((Ge = Ye = null), (me = !1));
  }
  function jo(e) {
    ut === null ? (ut = [e]) : ut.push(e);
  }
  var Ld = fe.ReactCurrentBatchConfig;
  function ur(e, t, n) {
    if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var l = r,
          o = '' + e;
        return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === o
          ? t.ref
          : ((t = function (i) {
              var u = l.refs;
              i === null ? delete u[o] : (u[o] = i);
            }),
            (t._stringRef = o),
            t);
      }
      if (typeof e != 'string') throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function nl(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        s(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e),
      )
    );
  }
  function ms(e) {
    var t = e._init;
    return t(e._payload);
  }
  function hs(e) {
    function t(m, d) {
      if (e) {
        var h = m.deletions;
        h === null ? ((m.deletions = [d]), (m.flags |= 16)) : h.push(d);
      }
    }
    function n(m, d) {
      if (!e) return null;
      for (; d !== null; ) (t(m, d), (d = d.sibling));
      return null;
    }
    function r(m, d) {
      for (m = new Map(); d !== null; )
        (d.key !== null ? m.set(d.key, d) : m.set(d.index, d), (d = d.sibling));
      return m;
    }
    function l(m, d) {
      return ((m = bt(m, d)), (m.index = 0), (m.sibling = null), m);
    }
    function o(m, d, h) {
      return (
        (m.index = h),
        e
          ? ((h = m.alternate),
            h !== null ? ((h = h.index), h < d ? ((m.flags |= 2), d) : h) : ((m.flags |= 2), d))
          : ((m.flags |= 1048576), d)
      );
    }
    function i(m) {
      return (e && m.alternate === null && (m.flags |= 2), m);
    }
    function u(m, d, h, x) {
      return d === null || d.tag !== 6
        ? ((d = Li(h, m.mode, x)), (d.return = m), d)
        : ((d = l(d, h)), (d.return = m), d);
    }
    function a(m, d, h, x) {
      var I = h.type;
      return I === Ne
        ? k(m, d, h.props.children, x, h.key)
        : d !== null &&
            (d.elementType === I ||
              (typeof I == 'object' && I !== null && I.$$typeof === Ue && ms(I) === d.type))
          ? ((x = l(d, h.props)), (x.ref = ur(m, d, h)), (x.return = m), x)
          : ((x = Ll(h.type, h.key, h.props, null, m.mode, x)),
            (x.ref = ur(m, d, h)),
            (x.return = m),
            x);
    }
    function g(m, d, h, x) {
      return d === null ||
        d.tag !== 4 ||
        d.stateNode.containerInfo !== h.containerInfo ||
        d.stateNode.implementation !== h.implementation
        ? ((d = zi(h, m.mode, x)), (d.return = m), d)
        : ((d = l(d, h.children || [])), (d.return = m), d);
    }
    function k(m, d, h, x, I) {
      return d === null || d.tag !== 7
        ? ((d = an(h, m.mode, x, I)), (d.return = m), d)
        : ((d = l(d, h)), (d.return = m), d);
    }
    function S(m, d, h) {
      if ((typeof d == 'string' && d !== '') || typeof d == 'number')
        return ((d = Li('' + d, m.mode, h)), (d.return = m), d);
      if (typeof d == 'object' && d !== null) {
        switch (d.$$typeof) {
          case Ce:
            return (
              (h = Ll(d.type, d.key, d.props, null, m.mode, h)),
              (h.ref = ur(m, null, d)),
              (h.return = m),
              h
            );
          case ie:
            return ((d = zi(d, m.mode, h)), (d.return = m), d);
          case Ue:
            var x = d._init;
            return S(m, x(d._payload), h);
        }
        if (Fn(d) || B(d)) return ((d = an(d, m.mode, h, null)), (d.return = m), d);
        nl(m, d);
      }
      return null;
    }
    function v(m, d, h, x) {
      var I = d !== null ? d.key : null;
      if ((typeof h == 'string' && h !== '') || typeof h == 'number')
        return I !== null ? null : u(m, d, '' + h, x);
      if (typeof h == 'object' && h !== null) {
        switch (h.$$typeof) {
          case Ce:
            return h.key === I ? a(m, d, h, x) : null;
          case ie:
            return h.key === I ? g(m, d, h, x) : null;
          case Ue:
            return ((I = h._init), v(m, d, I(h._payload), x));
        }
        if (Fn(h) || B(h)) return I !== null ? null : k(m, d, h, x, null);
        nl(m, h);
      }
      return null;
    }
    function L(m, d, h, x, I) {
      if ((typeof x == 'string' && x !== '') || typeof x == 'number')
        return ((m = m.get(h) || null), u(d, m, '' + x, I));
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case Ce:
            return ((m = m.get(x.key === null ? h : x.key) || null), a(d, m, x, I));
          case ie:
            return ((m = m.get(x.key === null ? h : x.key) || null), g(d, m, x, I));
          case Ue:
            var U = x._init;
            return L(m, d, h, U(x._payload), I);
        }
        if (Fn(x) || B(x)) return ((m = m.get(h) || null), k(d, m, x, I, null));
        nl(d, x);
      }
      return null;
    }
    function T(m, d, h, x) {
      for (var I = null, U = null, A = d, V = (d = 0), _e = null; A !== null && V < h.length; V++) {
        A.index > V ? ((_e = A), (A = null)) : (_e = A.sibling);
        var te = v(m, A, h[V], x);
        if (te === null) {
          A === null && (A = _e);
          break;
        }
        (e && A && te.alternate === null && t(m, A),
          (d = o(te, d, V)),
          U === null ? (I = te) : (U.sibling = te),
          (U = te),
          (A = _e));
      }
      if (V === h.length) return (n(m, A), me && en(m, V), I);
      if (A === null) {
        for (; V < h.length; V++)
          ((A = S(m, h[V], x)),
            A !== null && ((d = o(A, d, V)), U === null ? (I = A) : (U.sibling = A), (U = A)));
        return (me && en(m, V), I);
      }
      for (A = r(m, A); V < h.length; V++)
        ((_e = L(A, m, V, h[V], x)),
          _e !== null &&
            (e && _e.alternate !== null && A.delete(_e.key === null ? V : _e.key),
            (d = o(_e, d, V)),
            U === null ? (I = _e) : (U.sibling = _e),
            (U = _e)));
      return (
        e &&
          A.forEach(function (Kt) {
            return t(m, Kt);
          }),
        me && en(m, V),
        I
      );
    }
    function N(m, d, h, x) {
      var I = B(h);
      if (typeof I != 'function') throw Error(s(150));
      if (((h = I.call(h)), h == null)) throw Error(s(151));
      for (
        var U = (I = null), A = d, V = (d = 0), _e = null, te = h.next();
        A !== null && !te.done;
        V++, te = h.next()
      ) {
        A.index > V ? ((_e = A), (A = null)) : (_e = A.sibling);
        var Kt = v(m, A, te.value, x);
        if (Kt === null) {
          A === null && (A = _e);
          break;
        }
        (e && A && Kt.alternate === null && t(m, A),
          (d = o(Kt, d, V)),
          U === null ? (I = Kt) : (U.sibling = Kt),
          (U = Kt),
          (A = _e));
      }
      if (te.done) return (n(m, A), me && en(m, V), I);
      if (A === null) {
        for (; !te.done; V++, te = h.next())
          ((te = S(m, te.value, x)),
            te !== null && ((d = o(te, d, V)), U === null ? (I = te) : (U.sibling = te), (U = te)));
        return (me && en(m, V), I);
      }
      for (A = r(m, A); !te.done; V++, te = h.next())
        ((te = L(A, m, V, te.value, x)),
          te !== null &&
            (e && te.alternate !== null && A.delete(te.key === null ? V : te.key),
            (d = o(te, d, V)),
            U === null ? (I = te) : (U.sibling = te),
            (U = te)));
      return (
        e &&
          A.forEach(function (of) {
            return t(m, of);
          }),
        me && en(m, V),
        I
      );
    }
    function Se(m, d, h, x) {
      if (
        (typeof h == 'object' &&
          h !== null &&
          h.type === Ne &&
          h.key === null &&
          (h = h.props.children),
        typeof h == 'object' && h !== null)
      ) {
        switch (h.$$typeof) {
          case Ce:
            e: {
              for (var I = h.key, U = d; U !== null; ) {
                if (U.key === I) {
                  if (((I = h.type), I === Ne)) {
                    if (U.tag === 7) {
                      (n(m, U.sibling), (d = l(U, h.props.children)), (d.return = m), (m = d));
                      break e;
                    }
                  } else if (
                    U.elementType === I ||
                    (typeof I == 'object' && I !== null && I.$$typeof === Ue && ms(I) === U.type)
                  ) {
                    (n(m, U.sibling),
                      (d = l(U, h.props)),
                      (d.ref = ur(m, U, h)),
                      (d.return = m),
                      (m = d));
                    break e;
                  }
                  n(m, U);
                  break;
                } else t(m, U);
                U = U.sibling;
              }
              h.type === Ne
                ? ((d = an(h.props.children, m.mode, x, h.key)), (d.return = m), (m = d))
                : ((x = Ll(h.type, h.key, h.props, null, m.mode, x)),
                  (x.ref = ur(m, d, h)),
                  (x.return = m),
                  (m = x));
            }
            return i(m);
          case ie:
            e: {
              for (U = h.key; d !== null; ) {
                if (d.key === U)
                  if (
                    d.tag === 4 &&
                    d.stateNode.containerInfo === h.containerInfo &&
                    d.stateNode.implementation === h.implementation
                  ) {
                    (n(m, d.sibling), (d = l(d, h.children || [])), (d.return = m), (m = d));
                    break e;
                  } else {
                    n(m, d);
                    break;
                  }
                else t(m, d);
                d = d.sibling;
              }
              ((d = zi(h, m.mode, x)), (d.return = m), (m = d));
            }
            return i(m);
          case Ue:
            return ((U = h._init), Se(m, d, U(h._payload), x));
        }
        if (Fn(h)) return T(m, d, h, x);
        if (B(h)) return N(m, d, h, x);
        nl(m, h);
      }
      return (typeof h == 'string' && h !== '') || typeof h == 'number'
        ? ((h = '' + h),
          d !== null && d.tag === 6
            ? (n(m, d.sibling), (d = l(d, h)), (d.return = m), (m = d))
            : (n(m, d), (d = Li(h, m.mode, x)), (d.return = m), (m = d)),
          i(m))
        : n(m, d);
    }
    return Se;
  }
  var Ln = hs(!0),
    gs = hs(!1),
    rl = Ft(null),
    ll = null,
    zn = null,
    Fo = null;
  function Oo() {
    Fo = zn = ll = null;
  }
  function Uo(e) {
    var t = rl.current;
    (de(rl), (e._currentValue = t));
  }
  function Ao(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function _n(e, t) {
    ((ll = e),
      (Fo = zn = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && ($e = !0), (e.firstContext = null)));
  }
  function et(e) {
    var t = e._currentValue;
    if (Fo !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), zn === null)) {
        if (ll === null) throw Error(s(308));
        ((zn = e), (ll.dependencies = { lanes: 0, firstContext: e }));
      } else zn = zn.next = e;
    return t;
  }
  var tn = null;
  function Bo(e) {
    tn === null ? (tn = [e]) : tn.push(e);
  }
  function vs(e, t, n, r) {
    var l = t.interleaved;
    return (
      l === null ? ((n.next = n), Bo(t)) : ((n.next = l.next), (l.next = n)),
      (t.interleaved = n),
      Et(e, r)
    );
  }
  function Et(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      ((e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
  }
  var At = !1;
  function $o(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function ys(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function Pt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Bt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (Z & 2) !== 0)) {
      var l = r.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (r.pending = t),
        Et(e, n)
      );
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), Bo(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      Et(e, n)
    );
  }
  function ol(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), eo(e, n));
    }
  }
  function ks(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var l = null,
        o = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var i = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          (o === null ? (l = o = i) : (o = o.next = i), (n = n.next));
        } while (n !== null);
        o === null ? (l = o = t) : (o = o.next = t);
      } else l = o = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: o,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  function il(e, t, n, r) {
    var l = e.updateQueue;
    At = !1;
    var o = l.firstBaseUpdate,
      i = l.lastBaseUpdate,
      u = l.shared.pending;
    if (u !== null) {
      l.shared.pending = null;
      var a = u,
        g = a.next;
      ((a.next = null), i === null ? (o = g) : (i.next = g), (i = a));
      var k = e.alternate;
      k !== null &&
        ((k = k.updateQueue),
        (u = k.lastBaseUpdate),
        u !== i && (u === null ? (k.firstBaseUpdate = g) : (u.next = g), (k.lastBaseUpdate = a)));
    }
    if (o !== null) {
      var S = l.baseState;
      ((i = 0), (k = g = a = null), (u = o));
      do {
        var v = u.lane,
          L = u.eventTime;
        if ((r & v) === v) {
          k !== null &&
            (k = k.next =
              {
                eventTime: L,
                lane: 0,
                tag: u.tag,
                payload: u.payload,
                callback: u.callback,
                next: null,
              });
          e: {
            var T = e,
              N = u;
            switch (((v = t), (L = n), N.tag)) {
              case 1:
                if (((T = N.payload), typeof T == 'function')) {
                  S = T.call(L, S, v);
                  break e;
                }
                S = T;
                break e;
              case 3:
                T.flags = (T.flags & -65537) | 128;
              case 0:
                if (
                  ((T = N.payload), (v = typeof T == 'function' ? T.call(L, S, v) : T), v == null)
                )
                  break e;
                S = _({}, S, v);
                break e;
              case 2:
                At = !0;
            }
          }
          u.callback !== null &&
            u.lane !== 0 &&
            ((e.flags |= 64), (v = l.effects), v === null ? (l.effects = [u]) : v.push(u));
        } else
          ((L = {
            eventTime: L,
            lane: v,
            tag: u.tag,
            payload: u.payload,
            callback: u.callback,
            next: null,
          }),
            k === null ? ((g = k = L), (a = S)) : (k = k.next = L),
            (i |= v));
        if (((u = u.next), u === null)) {
          if (((u = l.shared.pending), u === null)) break;
          ((v = u),
            (u = v.next),
            (v.next = null),
            (l.lastBaseUpdate = v),
            (l.shared.pending = null));
        }
      } while (!0);
      if (
        (k === null && (a = S),
        (l.baseState = a),
        (l.firstBaseUpdate = g),
        (l.lastBaseUpdate = k),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t;
        do ((i |= l.lane), (l = l.next));
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      ((ln |= i), (e.lanes = i), (e.memoizedState = S));
    }
  }
  function ws(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          l = r.callback;
        if (l !== null) {
          if (((r.callback = null), (r = n), typeof l != 'function')) throw Error(s(191, l));
          l.call(r);
        }
      }
  }
  var sr = {},
    gt = Ft(sr),
    ar = Ft(sr),
    cr = Ft(sr);
  function nn(e) {
    if (e === sr) throw Error(s(174));
    return e;
  }
  function Vo(e, t) {
    switch ((se(cr, t), se(ar, e), se(gt, sr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Vl(null, '');
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Vl(t, e)));
    }
    (de(gt), se(gt, t));
  }
  function Tn() {
    (de(gt), de(ar), de(cr));
  }
  function Ss(e) {
    nn(cr.current);
    var t = nn(gt.current),
      n = Vl(t, e.type);
    t !== n && (se(ar, e), se(gt, n));
  }
  function Ho(e) {
    ar.current === e && (de(gt), de(ar));
  }
  var he = Ft(0);
  function ul(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!'))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Wo = [];
  function Qo() {
    for (var e = 0; e < Wo.length; e++) Wo[e]._workInProgressVersionPrimary = null;
    Wo.length = 0;
  }
  var sl = fe.ReactCurrentDispatcher,
    bo = fe.ReactCurrentBatchConfig,
    rn = 0,
    ge = null,
    Ee = null,
    Le = null,
    al = !1,
    dr = !1,
    fr = 0,
    zd = 0;
  function Ie() {
    throw Error(s(321));
  }
  function Ko(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!it(e[n], t[n])) return !1;
    return !0;
  }
  function Yo(e, t, n, r, l, o) {
    if (
      ((rn = o),
      (ge = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (sl.current = e === null || e.memoizedState === null ? Nd : Dd),
      (e = n(r, l)),
      dr)
    ) {
      o = 0;
      do {
        if (((dr = !1), (fr = 0), 25 <= o)) throw Error(s(301));
        ((o += 1), (Le = Ee = null), (t.updateQueue = null), (sl.current = Id), (e = n(r, l)));
      } while (dr);
    }
    if (
      ((sl.current = fl),
      (t = Ee !== null && Ee.next !== null),
      (rn = 0),
      (Le = Ee = ge = null),
      (al = !1),
      t)
    )
      throw Error(s(300));
    return e;
  }
  function Go() {
    var e = fr !== 0;
    return ((fr = 0), e);
  }
  function vt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Le === null ? (ge.memoizedState = Le = e) : (Le = Le.next = e), Le);
  }
  function tt() {
    if (Ee === null) {
      var e = ge.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ee.next;
    var t = Le === null ? ge.memoizedState : Le.next;
    if (t !== null) ((Le = t), (Ee = e));
    else {
      if (e === null) throw Error(s(310));
      ((Ee = e),
        (e = {
          memoizedState: Ee.memoizedState,
          baseState: Ee.baseState,
          baseQueue: Ee.baseQueue,
          queue: Ee.queue,
          next: null,
        }),
        Le === null ? (ge.memoizedState = Le = e) : (Le = Le.next = e));
    }
    return Le;
  }
  function pr(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Xo(e) {
    var t = tt(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = Ee,
      l = r.baseQueue,
      o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var i = l.next;
        ((l.next = o.next), (o.next = i));
      }
      ((r.baseQueue = l = o), (n.pending = null));
    }
    if (l !== null) {
      ((o = l.next), (r = r.baseState));
      var u = (i = null),
        a = null,
        g = o;
      do {
        var k = g.lane;
        if ((rn & k) === k)
          (a !== null &&
            (a = a.next =
              {
                lane: 0,
                action: g.action,
                hasEagerState: g.hasEagerState,
                eagerState: g.eagerState,
                next: null,
              }),
            (r = g.hasEagerState ? g.eagerState : e(r, g.action)));
        else {
          var S = {
            lane: k,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null,
          };
          (a === null ? ((u = a = S), (i = r)) : (a = a.next = S), (ge.lanes |= k), (ln |= k));
        }
        g = g.next;
      } while (g !== null && g !== o);
      (a === null ? (i = r) : (a.next = u),
        it(r, t.memoizedState) || ($e = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = a),
        (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do ((o = l.lane), (ge.lanes |= o), (ln |= o), (l = l.next));
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function qo(e) {
    var t = tt(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      l = n.pending,
      o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = (l = l.next);
      do ((o = e(o, i.action)), (i = i.next));
      while (i !== l);
      (it(o, t.memoizedState) || ($e = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (n.lastRenderedState = o));
    }
    return [o, r];
  }
  function xs() {}
  function Cs(e, t) {
    var n = ge,
      r = tt(),
      l = t(),
      o = !it(r.memoizedState, l);
    if (
      (o && ((r.memoizedState = l), ($e = !0)),
      (r = r.queue),
      Zo(Ls.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || o || (Le !== null && Le.memoizedState.tag & 1))
    ) {
      if (((n.flags |= 2048), mr(9, Ps.bind(null, n, r, l, t), void 0, null), ze === null))
        throw Error(s(349));
      (rn & 30) !== 0 || Es(n, t, l);
    }
    return l;
  }
  function Es(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }), (ge.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Ps(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), zs(t) && _s(e));
  }
  function Ls(e, t, n) {
    return n(function () {
      zs(t) && _s(e);
    });
  }
  function zs(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !it(e, n);
    } catch {
      return !0;
    }
  }
  function _s(e) {
    var t = Et(e, 1);
    t !== null && dt(t, e, 1, -1);
  }
  function Ts(e) {
    var t = vt();
    return (
      typeof e == 'function' && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Rd.bind(null, ge, e)),
      [t.memoizedState, e]
    );
  }
  function mr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function Rs() {
    return tt().memoizedState;
  }
  function cl(e, t, n, r) {
    var l = vt();
    ((ge.flags |= e), (l.memoizedState = mr(1 | t, n, void 0, r === void 0 ? null : r)));
  }
  function dl(e, t, n, r) {
    var l = tt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Ee !== null) {
      var i = Ee.memoizedState;
      if (((o = i.destroy), r !== null && Ko(r, i.deps))) {
        l.memoizedState = mr(t, n, o, r);
        return;
      }
    }
    ((ge.flags |= e), (l.memoizedState = mr(1 | t, n, o, r)));
  }
  function Ns(e, t) {
    return cl(8390656, 8, e, t);
  }
  function Zo(e, t) {
    return dl(2048, 8, e, t);
  }
  function Ds(e, t) {
    return dl(4, 2, e, t);
  }
  function Is(e, t) {
    return dl(4, 4, e, t);
  }
  function Ms(e, t) {
    if (typeof t == 'function')
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function js(e, t, n) {
    return ((n = n != null ? n.concat([e]) : null), dl(4, 4, Ms.bind(null, t, e), n));
  }
  function Jo() {}
  function Fs(e, t) {
    var n = tt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ko(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
  }
  function Os(e, t) {
    var n = tt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ko(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Us(e, t, n) {
    return (rn & 21) === 0
      ? (e.baseState && ((e.baseState = !1), ($e = !0)), (e.memoizedState = n))
      : (it(n, t) || ((n = mu()), (ge.lanes |= n), (ln |= n), (e.baseState = !0)), t);
  }
  function _d(e, t) {
    var n = oe;
    ((oe = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = bo.transition;
    bo.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((oe = n), (bo.transition = r));
    }
  }
  function As() {
    return tt().memoizedState;
  }
  function Td(e, t, n) {
    var r = Wt(e);
    if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Bs(e)))
      $s(t, n);
    else if (((n = vs(e, t, n, r)), n !== null)) {
      var l = Oe();
      (dt(n, e, r, l), Vs(n, t, r));
    }
  }
  function Rd(e, t, n) {
    var r = Wt(e),
      l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Bs(e)) $s(t, l);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var i = t.lastRenderedState,
            u = o(i, n);
          if (((l.hasEagerState = !0), (l.eagerState = u), it(u, i))) {
            var a = t.interleaved;
            (a === null ? ((l.next = l), Bo(t)) : ((l.next = a.next), (a.next = l)),
              (t.interleaved = l));
            return;
          }
        } catch {
        } finally {
        }
      ((n = vs(e, t, l, r)), n !== null && ((l = Oe()), dt(n, e, r, l), Vs(n, t, r)));
    }
  }
  function Bs(e) {
    var t = e.alternate;
    return e === ge || (t !== null && t === ge);
  }
  function $s(e, t) {
    dr = al = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
  }
  function Vs(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), eo(e, n));
    }
  }
  var fl = {
      readContext: et,
      useCallback: Ie,
      useContext: Ie,
      useEffect: Ie,
      useImperativeHandle: Ie,
      useInsertionEffect: Ie,
      useLayoutEffect: Ie,
      useMemo: Ie,
      useReducer: Ie,
      useRef: Ie,
      useState: Ie,
      useDebugValue: Ie,
      useDeferredValue: Ie,
      useTransition: Ie,
      useMutableSource: Ie,
      useSyncExternalStore: Ie,
      useId: Ie,
      unstable_isNewReconciler: !1,
    },
    Nd = {
      readContext: et,
      useCallback: function (e, t) {
        return ((vt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: et,
      useEffect: Ns,
      useImperativeHandle: function (e, t, n) {
        return ((n = n != null ? n.concat([e]) : null), cl(4194308, 4, Ms.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return cl(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return cl(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = vt();
        return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
      },
      useReducer: function (e, t, n) {
        var r = vt();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = Td.bind(null, ge, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = vt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: Ts,
      useDebugValue: Jo,
      useDeferredValue: function (e) {
        return (vt().memoizedState = e);
      },
      useTransition: function () {
        var e = Ts(!1),
          t = e[0];
        return ((e = _d.bind(null, e[1])), (vt().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = ge,
          l = vt();
        if (me) {
          if (n === void 0) throw Error(s(407));
          n = n();
        } else {
          if (((n = t()), ze === null)) throw Error(s(349));
          (rn & 30) !== 0 || Es(r, t, n);
        }
        l.memoizedState = n;
        var o = { value: n, getSnapshot: t };
        return (
          (l.queue = o),
          Ns(Ls.bind(null, r, o, e), [e]),
          (r.flags |= 2048),
          mr(9, Ps.bind(null, r, o, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = vt(),
          t = ze.identifierPrefix;
        if (me) {
          var n = Ct,
            r = xt;
          ((n = (r & ~(1 << (32 - ot(r) - 1))).toString(32) + n),
            (t = ':' + t + 'R' + n),
            (n = fr++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += ':'));
        } else ((n = zd++), (t = ':' + t + 'r' + n.toString(32) + ':'));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Dd = {
      readContext: et,
      useCallback: Fs,
      useContext: et,
      useEffect: Zo,
      useImperativeHandle: js,
      useInsertionEffect: Ds,
      useLayoutEffect: Is,
      useMemo: Os,
      useReducer: Xo,
      useRef: Rs,
      useState: function () {
        return Xo(pr);
      },
      useDebugValue: Jo,
      useDeferredValue: function (e) {
        var t = tt();
        return Us(t, Ee.memoizedState, e);
      },
      useTransition: function () {
        var e = Xo(pr)[0],
          t = tt().memoizedState;
        return [e, t];
      },
      useMutableSource: xs,
      useSyncExternalStore: Cs,
      useId: As,
      unstable_isNewReconciler: !1,
    },
    Id = {
      readContext: et,
      useCallback: Fs,
      useContext: et,
      useEffect: Zo,
      useImperativeHandle: js,
      useInsertionEffect: Ds,
      useLayoutEffect: Is,
      useMemo: Os,
      useReducer: qo,
      useRef: Rs,
      useState: function () {
        return qo(pr);
      },
      useDebugValue: Jo,
      useDeferredValue: function (e) {
        var t = tt();
        return Ee === null ? (t.memoizedState = e) : Us(t, Ee.memoizedState, e);
      },
      useTransition: function () {
        var e = qo(pr)[0],
          t = tt().memoizedState;
        return [e, t];
      },
      useMutableSource: xs,
      useSyncExternalStore: Cs,
      useId: As,
      unstable_isNewReconciler: !1,
    };
  function st(e, t) {
    if (e && e.defaultProps) {
      ((t = _({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function ei(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : _({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var pl = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Xt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = Oe(),
        l = Wt(e),
        o = Pt(r, l);
      ((o.payload = t),
        n != null && (o.callback = n),
        (t = Bt(e, o, l)),
        t !== null && (dt(t, e, l, r), ol(t, e, l)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = Oe(),
        l = Wt(e),
        o = Pt(r, l);
      ((o.tag = 1),
        (o.payload = t),
        n != null && (o.callback = n),
        (t = Bt(e, o, l)),
        t !== null && (dt(t, e, l, r), ol(t, e, l)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Oe(),
        r = Wt(e),
        l = Pt(n, r);
      ((l.tag = 2),
        t != null && (l.callback = t),
        (t = Bt(e, l, r)),
        t !== null && (dt(t, e, r, n), ol(t, e, r)));
    },
  };
  function Hs(e, t, n, r, l, o, i) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(r, o, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !er(n, r) || !er(l, o)
          : !0
    );
  }
  function Ws(e, t, n) {
    var r = !1,
      l = Ot,
      o = t.contextType;
    return (
      typeof o == 'object' && o !== null
        ? (o = et(o))
        : ((l = Be(t) ? Zt : De.current),
          (r = t.contextTypes),
          (o = (r = r != null) ? xn(e, l) : Ot)),
      (t = new t(n, o)),
      (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = pl),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      t
    );
  }
  function Qs(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && pl.enqueueReplaceState(t, t.state, null));
  }
  function ti(e, t, n, r) {
    var l = e.stateNode;
    ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), $o(e));
    var o = t.contextType;
    (typeof o == 'object' && o !== null
      ? (l.context = et(o))
      : ((o = Be(t) ? Zt : De.current), (l.context = xn(e, o))),
      (l.state = e.memoizedState),
      (o = t.getDerivedStateFromProps),
      typeof o == 'function' && (ei(e, t, o, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == 'function' ||
        typeof l.getSnapshotBeforeUpdate == 'function' ||
        (typeof l.UNSAFE_componentWillMount != 'function' &&
          typeof l.componentWillMount != 'function') ||
        ((t = l.state),
        typeof l.componentWillMount == 'function' && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == 'function' && l.UNSAFE_componentWillMount(),
        t !== l.state && pl.enqueueReplaceState(l, l.state, null),
        il(e, n, l, r),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == 'function' && (e.flags |= 4194308));
  }
  function Rn(e, t) {
    try {
      var n = '',
        r = t;
      do ((n += J(r)), (r = r.return));
      while (r);
      var l = n;
    } catch (o) {
      l =
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function ni(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function ri(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var Md = typeof WeakMap == 'function' ? WeakMap : Map;
  function bs(e, t, n) {
    ((n = Pt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
      (n.callback = function () {
        (wl || ((wl = !0), (yi = r)), ri(e, t));
      }),
      n
    );
  }
  function Ks(e, t, n) {
    ((n = Pt(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == 'function') {
      var l = t.value;
      ((n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          ri(e, t);
        }));
    }
    var o = e.stateNode;
    return (
      o !== null &&
        typeof o.componentDidCatch == 'function' &&
        (n.callback = function () {
          (ri(e, t),
            typeof r != 'function' && (Vt === null ? (Vt = new Set([this])) : Vt.add(this)));
          var i = t.stack;
          this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' });
        }),
      n
    );
  }
  function Ys(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Md();
      var l = new Set();
      r.set(t, l);
    } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
    l.has(n) || (l.add(n), (e = Yd.bind(null, e, t, n)), t.then(e, e));
  }
  function Gs(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Xs(e, t, n, r, l) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null ? (n.tag = 17) : ((t = Pt(-1, 1)), (t.tag = 2), Bt(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = l), e);
  }
  var jd = fe.ReactCurrentOwner,
    $e = !1;
  function Fe(e, t, n, r) {
    t.child = e === null ? gs(t, null, n, r) : Ln(t, e.child, n, r);
  }
  function qs(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return (
      _n(t, l),
      (r = Yo(e, t, n, r, o, l)),
      (n = Go()),
      e !== null && !$e
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), Lt(e, t, l))
        : (me && n && No(t), (t.flags |= 1), Fe(e, t, r, l), t.child)
    );
  }
  function Zs(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == 'function' &&
        !Pi(o) &&
        o.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = o), Js(e, t, o, r, l))
        : ((e = Ll(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((o = e.child), (e.lanes & l) === 0)) {
      var i = o.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : er), n(i, r) && e.ref === t.ref))
        return Lt(e, t, l);
    }
    return ((t.flags |= 1), (e = bt(o, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Js(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (er(o, r) && e.ref === t.ref)
        if ((($e = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
          (e.flags & 131072) !== 0 && ($e = !0);
        else return ((t.lanes = e.lanes), Lt(e, t, l));
    }
    return li(e, t, n, r, l);
  }
  function ea(e, t, n) {
    var r = t.pendingProps,
      l = r.children,
      o = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden')
      if ((t.mode & 1) === 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          se(Dn, Xe),
          (Xe |= n));
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = o !== null ? o.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
            (t.updateQueue = null),
            se(Dn, Xe),
            (Xe |= e),
            null
          );
        ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (r = o !== null ? o.baseLanes : n),
          se(Dn, Xe),
          (Xe |= r));
      }
    else
      (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
        se(Dn, Xe),
        (Xe |= r));
    return (Fe(e, t, l, n), t.child);
  }
  function ta(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function li(e, t, n, r, l) {
    var o = Be(n) ? Zt : De.current;
    return (
      (o = xn(t, o)),
      _n(t, l),
      (n = Yo(e, t, n, r, o, l)),
      (r = Go()),
      e !== null && !$e
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), Lt(e, t, l))
        : (me && r && No(t), (t.flags |= 1), Fe(e, t, n, l), t.child)
    );
  }
  function na(e, t, n, r, l) {
    if (Be(n)) {
      var o = !0;
      qr(t);
    } else o = !1;
    if ((_n(t, l), t.stateNode === null)) (hl(e, t), Ws(t, n, r), ti(t, n, r, l), (r = !0));
    else if (e === null) {
      var i = t.stateNode,
        u = t.memoizedProps;
      i.props = u;
      var a = i.context,
        g = n.contextType;
      typeof g == 'object' && g !== null
        ? (g = et(g))
        : ((g = Be(n) ? Zt : De.current), (g = xn(t, g)));
      var k = n.getDerivedStateFromProps,
        S = typeof k == 'function' || typeof i.getSnapshotBeforeUpdate == 'function';
      (S ||
        (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof i.componentWillReceiveProps != 'function') ||
        ((u !== r || a !== g) && Qs(t, i, r, g)),
        (At = !1));
      var v = t.memoizedState;
      ((i.state = v),
        il(t, r, i, l),
        (a = t.memoizedState),
        u !== r || v !== a || Ae.current || At
          ? (typeof k == 'function' && (ei(t, n, k, r), (a = t.memoizedState)),
            (u = At || Hs(t, n, u, r, v, a, g))
              ? (S ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = a)),
            (i.props = r),
            (i.state = a),
            (i.context = g),
            (r = u))
          : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
    } else {
      ((i = t.stateNode),
        ys(e, t),
        (u = t.memoizedProps),
        (g = t.type === t.elementType ? u : st(t.type, u)),
        (i.props = g),
        (S = t.pendingProps),
        (v = i.context),
        (a = n.contextType),
        typeof a == 'object' && a !== null
          ? (a = et(a))
          : ((a = Be(n) ? Zt : De.current), (a = xn(t, a))));
      var L = n.getDerivedStateFromProps;
      ((k = typeof L == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
        (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof i.componentWillReceiveProps != 'function') ||
        ((u !== S || v !== a) && Qs(t, i, r, a)),
        (At = !1),
        (v = t.memoizedState),
        (i.state = v),
        il(t, r, i, l));
      var T = t.memoizedState;
      u !== S || v !== T || Ae.current || At
        ? (typeof L == 'function' && (ei(t, n, L, r), (T = t.memoizedState)),
          (g = At || Hs(t, n, g, r, v, T, a) || !1)
            ? (k ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(r, T, a),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(r, T, a)),
              typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (u === e.memoizedProps && v === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (u === e.memoizedProps && v === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = T)),
          (i.props = r),
          (i.state = T),
          (i.context = a),
          (r = g))
        : (typeof i.componentDidUpdate != 'function' ||
            (u === e.memoizedProps && v === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (u === e.memoizedProps && v === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return oi(e, t, n, r, o, l);
  }
  function oi(e, t, n, r, l, o) {
    ta(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return (l && us(t, n, !1), Lt(e, t, o));
    ((r = t.stateNode), (jd.current = t));
    var u = i && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && i
        ? ((t.child = Ln(t, e.child, null, o)), (t.child = Ln(t, null, u, o)))
        : Fe(e, t, u, o),
      (t.memoizedState = r.state),
      l && us(t, n, !0),
      t.child
    );
  }
  function ra(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? os(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && os(e, t.context, !1),
      Vo(e, t.containerInfo));
  }
  function la(e, t, n, r, l) {
    return (Pn(), jo(l), (t.flags |= 256), Fe(e, t, n, r), t.child);
  }
  var ii = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ui(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function oa(e, t, n) {
    var r = t.pendingProps,
      l = he.current,
      o = !1,
      i = (t.flags & 128) !== 0,
      u;
    if (
      ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      u ? ((o = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
      se(he, l & 1),
      e === null)
    )
      return (
        Mo(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === '$!'
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((i = r.children),
            (e = r.fallback),
            o
              ? ((r = t.mode),
                (o = t.child),
                (i = { mode: 'hidden', children: i }),
                (r & 1) === 0 && o !== null
                  ? ((o.childLanes = 0), (o.pendingProps = i))
                  : (o = zl(i, r, 0, null)),
                (e = an(e, r, n, null)),
                (o.return = t),
                (e.return = t),
                (o.sibling = e),
                (t.child = o),
                (t.child.memoizedState = ui(n)),
                (t.memoizedState = ii),
                e)
              : si(t, i))
      );
    if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
      return Fd(e, t, i, r, u, l, n);
    if (o) {
      ((o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling));
      var a = { mode: 'hidden', children: r.children };
      return (
        (i & 1) === 0 && t.child !== l
          ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = a), (t.deletions = null))
          : ((r = bt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
        u !== null ? (o = bt(u, o)) : ((o = an(o, i, n, null)), (o.flags |= 2)),
        (o.return = t),
        (r.return = t),
        (r.sibling = o),
        (t.child = r),
        (r = o),
        (o = t.child),
        (i = e.child.memoizedState),
        (i =
          i === null
            ? ui(n)
            : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
        (o.memoizedState = i),
        (o.childLanes = e.childLanes & ~n),
        (t.memoizedState = ii),
        r
      );
    }
    return (
      (o = e.child),
      (e = o.sibling),
      (r = bt(o, { mode: 'visible', children: r.children })),
      (t.mode & 1) === 0 && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function si(e, t) {
    return (
      (t = zl({ mode: 'visible', children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ml(e, t, n, r) {
    return (
      r !== null && jo(r),
      Ln(t, e.child, null, n),
      (e = si(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Fd(e, t, n, r, l, o, i) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = ni(Error(s(422)))), ml(e, t, i, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((o = r.fallback),
            (l = t.mode),
            (r = zl({ mode: 'visible', children: r.children }, l, 0, null)),
            (o = an(o, l, i, null)),
            (o.flags |= 2),
            (r.return = t),
            (o.return = t),
            (r.sibling = o),
            (t.child = r),
            (t.mode & 1) !== 0 && Ln(t, e.child, null, i),
            (t.child.memoizedState = ui(i)),
            (t.memoizedState = ii),
            o);
    if ((t.mode & 1) === 0) return ml(e, t, i, null);
    if (l.data === '$!') {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
      return ((r = u), (o = Error(s(419))), (r = ni(o, r, void 0)), ml(e, t, i, r));
    }
    if (((u = (i & e.childLanes) !== 0), $e || u)) {
      if (((r = ze), r !== null)) {
        switch (i & -i) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        ((l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l),
          l !== 0 && l !== o.retryLane && ((o.retryLane = l), Et(e, l), dt(r, e, l, -1)));
      }
      return (Ei(), (r = ni(Error(s(421)))), ml(e, t, i, r));
    }
    return l.data === '$?'
      ? ((t.flags |= 128), (t.child = e.child), (t = Gd.bind(null, e)), (l._reactRetry = t), null)
      : ((e = o.treeContext),
        (Ge = jt(l.nextSibling)),
        (Ye = t),
        (me = !0),
        (ut = null),
        e !== null &&
          ((Ze[Je++] = xt),
          (Ze[Je++] = Ct),
          (Ze[Je++] = Jt),
          (xt = e.id),
          (Ct = e.overflow),
          (Jt = t)),
        (t = si(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function ia(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), Ao(e.return, t, n));
  }
  function ai(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: l,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = r),
        (o.tail = n),
        (o.tailMode = l));
  }
  function ua(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      o = r.tail;
    if ((Fe(e, t, r.children, n), (r = he.current), (r & 2) !== 0))
      ((r = (r & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && ia(e, n, t);
          else if (e.tag === 19) ia(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      r &= 1;
    }
    if ((se(he, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (l) {
        case 'forwards':
          for (n = t.child, l = null; n !== null; )
            ((e = n.alternate), e !== null && ul(e) === null && (l = n), (n = n.sibling));
          ((n = l),
            n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)),
            ai(t, !1, l, n, o));
          break;
        case 'backwards':
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && ul(e) === null)) {
              t.child = l;
              break;
            }
            ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
          }
          ai(t, !0, n, null, o);
          break;
        case 'together':
          ai(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function hl(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Lt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (ln |= t.lanes), (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = bt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        ((e = e.sibling), (n = n.sibling = bt(e, e.pendingProps)), (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Od(e, t, n) {
    switch (t.tag) {
      case 3:
        (ra(t), Pn());
        break;
      case 5:
        Ss(t);
        break;
      case 1:
        Be(t.type) && qr(t);
        break;
      case 4:
        Vo(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        (se(rl, r._currentValue), (r._currentValue = l));
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (se(he, he.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? oa(e, t, n)
              : (se(he, he.current & 1), (e = Lt(e, t, n)), e !== null ? e.sibling : null);
        se(he, he.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (r) return ua(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          se(he, he.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), ea(e, t, n));
    }
    return Lt(e, t, n);
  }
  var sa, ci, aa, ca;
  ((sa = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  }),
    (ci = function () {}),
    (aa = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        ((e = t.stateNode), nn(gt.current));
        var o = null;
        switch (n) {
          case 'input':
            ((l = Ul(e, l)), (r = Ul(e, r)), (o = []));
            break;
          case 'select':
            ((l = _({}, l, { value: void 0 })), (r = _({}, r, { value: void 0 })), (o = []));
            break;
          case 'textarea':
            ((l = $l(e, l)), (r = $l(e, r)), (o = []));
            break;
          default:
            typeof l.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = Yr);
        }
        Hl(n, r);
        var i;
        n = null;
        for (g in l)
          if (!r.hasOwnProperty(g) && l.hasOwnProperty(g) && l[g] != null)
            if (g === 'style') {
              var u = l[g];
              for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''));
            } else
              g !== 'dangerouslySetInnerHTML' &&
                g !== 'children' &&
                g !== 'suppressContentEditableWarning' &&
                g !== 'suppressHydrationWarning' &&
                g !== 'autoFocus' &&
                (C.hasOwnProperty(g) ? o || (o = []) : (o = o || []).push(g, null));
        for (g in r) {
          var a = r[g];
          if (
            ((u = l != null ? l[g] : void 0),
            r.hasOwnProperty(g) && a !== u && (a != null || u != null))
          )
            if (g === 'style')
              if (u) {
                for (i in u)
                  !u.hasOwnProperty(i) ||
                    (a && a.hasOwnProperty(i)) ||
                    (n || (n = {}), (n[i] = ''));
                for (i in a) a.hasOwnProperty(i) && u[i] !== a[i] && (n || (n = {}), (n[i] = a[i]));
              } else (n || (o || (o = []), o.push(g, n)), (n = a));
            else
              g === 'dangerouslySetInnerHTML'
                ? ((a = a ? a.__html : void 0),
                  (u = u ? u.__html : void 0),
                  a != null && u !== a && (o = o || []).push(g, a))
                : g === 'children'
                  ? (typeof a != 'string' && typeof a != 'number') || (o = o || []).push(g, '' + a)
                  : g !== 'suppressContentEditableWarning' &&
                    g !== 'suppressHydrationWarning' &&
                    (C.hasOwnProperty(g)
                      ? (a != null && g === 'onScroll' && ce('scroll', e), o || u === a || (o = []))
                      : (o = o || []).push(g, a));
        }
        n && (o = o || []).push('style', n);
        var g = o;
        (t.updateQueue = g) && (t.flags |= 4);
      }
    }),
    (ca = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    }));
  function hr(e, t) {
    if (!me)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var n = null; t !== null; ) (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case 'collapsed':
          n = e.tail;
          for (var r = null; n !== null; ) (n.alternate !== null && (r = n), (n = n.sibling));
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Me(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 14680064),
          (r |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling));
    else
      for (l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags),
          (r |= l.flags),
          (l.return = e),
          (l = l.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function Ud(e, t, n) {
    var r = t.pendingProps;
    switch ((Do(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Me(t), null);
      case 1:
        return (Be(t.type) && Xr(), Me(t), null);
      case 3:
        return (
          (r = t.stateNode),
          Tn(),
          de(Ae),
          de(De),
          Qo(),
          r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (tl(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ut !== null && (Si(ut), (ut = null)))),
          ci(e, t),
          Me(t),
          null
        );
      case 5:
        Ho(t);
        var l = nn(cr.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (aa(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return (Me(t), null);
          }
          if (((e = nn(gt.current)), tl(t))) {
            ((r = t.stateNode), (n = t.type));
            var o = t.memoizedProps;
            switch (((r[ht] = t), (r[or] = o), (e = (t.mode & 1) !== 0), n)) {
              case 'dialog':
                (ce('cancel', r), ce('close', r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                ce('load', r);
                break;
              case 'video':
              case 'audio':
                for (l = 0; l < nr.length; l++) ce(nr[l], r);
                break;
              case 'source':
                ce('error', r);
                break;
              case 'img':
              case 'image':
              case 'link':
                (ce('error', r), ce('load', r));
                break;
              case 'details':
                ce('toggle', r);
                break;
              case 'input':
                (Wi(r, o), ce('invalid', r));
                break;
              case 'select':
                ((r._wrapperState = { wasMultiple: !!o.multiple }), ce('invalid', r));
                break;
              case 'textarea':
                (Ki(r, o), ce('invalid', r));
            }
            (Hl(n, o), (l = null));
            for (var i in o)
              if (o.hasOwnProperty(i)) {
                var u = o[i];
                i === 'children'
                  ? typeof u == 'string'
                    ? r.textContent !== u &&
                      (o.suppressHydrationWarning !== !0 && Kr(r.textContent, u, e),
                      (l = ['children', u]))
                    : typeof u == 'number' &&
                      r.textContent !== '' + u &&
                      (o.suppressHydrationWarning !== !0 && Kr(r.textContent, u, e),
                      (l = ['children', '' + u]))
                  : C.hasOwnProperty(i) && u != null && i === 'onScroll' && ce('scroll', r);
              }
            switch (n) {
              case 'input':
                (Er(r), bi(r, o, !0));
                break;
              case 'textarea':
                (Er(r), Gi(r));
                break;
              case 'select':
              case 'option':
                break;
              default:
                typeof o.onClick == 'function' && (r.onclick = Yr);
            }
            ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
          } else {
            ((i = l.nodeType === 9 ? l : l.ownerDocument),
              e === 'http://www.w3.org/1999/xhtml' && (e = Xi(n)),
              e === 'http://www.w3.org/1999/xhtml'
                ? n === 'script'
                  ? ((e = i.createElement('div')),
                    (e.innerHTML = '<script><\/script>'),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == 'string'
                    ? (e = i.createElement(n, { is: r.is }))
                    : ((e = i.createElement(n)),
                      n === 'select' &&
                        ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
                : (e = i.createElementNS(e, n)),
              (e[ht] = t),
              (e[or] = r),
              sa(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((i = Wl(n, r)), n)) {
                case 'dialog':
                  (ce('cancel', e), ce('close', e), (l = r));
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  (ce('load', e), (l = r));
                  break;
                case 'video':
                case 'audio':
                  for (l = 0; l < nr.length; l++) ce(nr[l], e);
                  l = r;
                  break;
                case 'source':
                  (ce('error', e), (l = r));
                  break;
                case 'img':
                case 'image':
                case 'link':
                  (ce('error', e), ce('load', e), (l = r));
                  break;
                case 'details':
                  (ce('toggle', e), (l = r));
                  break;
                case 'input':
                  (Wi(e, r), (l = Ul(e, r)), ce('invalid', e));
                  break;
                case 'option':
                  l = r;
                  break;
                case 'select':
                  ((e._wrapperState = { wasMultiple: !!r.multiple }),
                    (l = _({}, r, { value: void 0 })),
                    ce('invalid', e));
                  break;
                case 'textarea':
                  (Ki(e, r), (l = $l(e, r)), ce('invalid', e));
                  break;
                default:
                  l = r;
              }
              (Hl(n, l), (u = l));
              for (o in u)
                if (u.hasOwnProperty(o)) {
                  var a = u[o];
                  o === 'style'
                    ? Ji(e, a)
                    : o === 'dangerouslySetInnerHTML'
                      ? ((a = a ? a.__html : void 0), a != null && qi(e, a))
                      : o === 'children'
                        ? typeof a == 'string'
                          ? (n !== 'textarea' || a !== '') && On(e, a)
                          : typeof a == 'number' && On(e, '' + a)
                        : o !== 'suppressContentEditableWarning' &&
                          o !== 'suppressHydrationWarning' &&
                          o !== 'autoFocus' &&
                          (C.hasOwnProperty(o)
                            ? a != null && o === 'onScroll' && ce('scroll', e)
                            : a != null && re(e, o, a, i));
                }
              switch (n) {
                case 'input':
                  (Er(e), bi(e, r, !1));
                  break;
                case 'textarea':
                  (Er(e), Gi(e));
                  break;
                case 'option':
                  r.value != null && e.setAttribute('value', '' + le(r.value));
                  break;
                case 'select':
                  ((e.multiple = !!r.multiple),
                    (o = r.value),
                    o != null
                      ? cn(e, !!r.multiple, o, !1)
                      : r.defaultValue != null && cn(e, !!r.multiple, r.defaultValue, !0));
                  break;
                default:
                  typeof l.onClick == 'function' && (e.onclick = Yr);
              }
              switch (n) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  r = !!r.autoFocus;
                  break e;
                case 'img':
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (Me(t), null);
      case 6:
        if (e && t.stateNode != null) ca(e, t, e.memoizedProps, r);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(s(166));
          if (((n = nn(cr.current)), nn(gt.current), tl(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[ht] = t),
              (o = r.nodeValue !== n) && ((e = Ye), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Kr(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Kr(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            o && (t.flags |= 4);
          } else
            ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[ht] = t),
              (t.stateNode = r));
        }
        return (Me(t), null);
      case 13:
        if (
          (de(he),
          (r = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (me && Ge !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (ps(), Pn(), (t.flags |= 98560), (o = !1));
          else if (((o = tl(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
                throw Error(s(317));
              o[ht] = t;
            } else (Pn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Me(t), (o = !1));
          } else (ut !== null && (Si(ut), (ut = null)), (o = !0));
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (he.current & 1) !== 0 ? Pe === 0 && (Pe = 3) : Ei())),
            t.updateQueue !== null && (t.flags |= 4),
            Me(t),
            null);
      case 4:
        return (Tn(), ci(e, t), e === null && rr(t.stateNode.containerInfo), Me(t), null);
      case 10:
        return (Uo(t.type._context), Me(t), null);
      case 17:
        return (Be(t.type) && Xr(), Me(t), null);
      case 19:
        if ((de(he), (o = t.memoizedState), o === null)) return (Me(t), null);
        if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
          if (r) hr(o, !1);
          else {
            if (Pe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = ul(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      hr(o, !1),
                      r = i.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;
                  )
                    ((o = n),
                      (e = r),
                      (o.flags &= 14680066),
                      (i = o.alternate),
                      i === null
                        ? ((o.childLanes = 0),
                          (o.lanes = e),
                          (o.child = null),
                          (o.subtreeFlags = 0),
                          (o.memoizedProps = null),
                          (o.memoizedState = null),
                          (o.updateQueue = null),
                          (o.dependencies = null),
                          (o.stateNode = null))
                        : ((o.childLanes = i.childLanes),
                          (o.lanes = i.lanes),
                          (o.child = i.child),
                          (o.subtreeFlags = 0),
                          (o.deletions = null),
                          (o.memoizedProps = i.memoizedProps),
                          (o.memoizedState = i.memoizedState),
                          (o.updateQueue = i.updateQueue),
                          (o.type = i.type),
                          (e = i.dependencies),
                          (o.dependencies =
                            e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                      (n = n.sibling));
                  return (se(he, (he.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            o.tail !== null &&
              we() > In &&
              ((t.flags |= 128), (r = !0), hr(o, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = ul(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                hr(o, !0),
                o.tail === null && o.tailMode === 'hidden' && !i.alternate && !me)
              )
                return (Me(t), null);
            } else
              2 * we() - o.renderingStartTime > In &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), hr(o, !1), (t.lanes = 4194304));
          o.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((n = o.last), n !== null ? (n.sibling = i) : (t.child = i), (o.last = i));
        }
        return o.tail !== null
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = we()),
            (t.sibling = null),
            (n = he.current),
            se(he, r ? (n & 1) | 2 : n & 1),
            t)
          : (Me(t), null);
      case 22:
      case 23:
        return (
          Ci(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && (t.mode & 1) !== 0
            ? (Xe & 1073741824) !== 0 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Me(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Ad(e, t) {
    switch ((Do(t), t.tag)) {
      case 1:
        return (
          Be(t.type) && Xr(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Tn(),
          de(Ae),
          de(De),
          Qo(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return (Ho(t), null);
      case 13:
        if ((de(he), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          Pn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (de(he), null);
      case 4:
        return (Tn(), null);
      case 10:
        return (Uo(t.type._context), null);
      case 22:
      case 23:
        return (Ci(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var gl = !1,
    je = !1,
    Bd = typeof WeakSet == 'function' ? WeakSet : Set,
    z = null;
  function Nn(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == 'function')
        try {
          n(null);
        } catch (r) {
          ke(e, t, r);
        }
      else n.current = null;
  }
  function di(e, t, n) {
    try {
      n();
    } catch (r) {
      ke(e, t, r);
    }
  }
  var da = !1;
  function $d(e, t) {
    if (((Co = Fr), (e = Hu()), ho(e))) {
      if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset,
              o = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, o.nodeType);
            } catch {
              n = null;
              break e;
            }
            var i = 0,
              u = -1,
              a = -1,
              g = 0,
              k = 0,
              S = e,
              v = null;
            t: for (;;) {
              for (
                var L;
                S !== n || (l !== 0 && S.nodeType !== 3) || (u = i + l),
                  S !== o || (r !== 0 && S.nodeType !== 3) || (a = i + r),
                  S.nodeType === 3 && (i += S.nodeValue.length),
                  (L = S.firstChild) !== null;
              )
                ((v = S), (S = L));
              for (;;) {
                if (S === e) break t;
                if (
                  (v === n && ++g === l && (u = i),
                  v === o && ++k === r && (a = i),
                  (L = S.nextSibling) !== null)
                )
                  break;
                ((S = v), (v = S.parentNode));
              }
              S = L;
            }
            n = u === -1 || a === -1 ? null : { start: u, end: a };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Eo = { focusedElem: e, selectionRange: n }, Fr = !1, z = t; z !== null; )
      if (((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (z = e));
      else
        for (; z !== null; ) {
          t = z;
          try {
            var T = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (T !== null) {
                    var N = T.memoizedProps,
                      Se = T.memoizedState,
                      m = t.stateNode,
                      d = m.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? N : st(t.type, N),
                        Se,
                      );
                    m.__reactInternalSnapshotBeforeUpdate = d;
                  }
                  break;
                case 3:
                  var h = t.stateNode.containerInfo;
                  h.nodeType === 1
                    ? (h.textContent = '')
                    : h.nodeType === 9 && h.documentElement && h.removeChild(h.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(s(163));
              }
          } catch (x) {
            ke(t, t.return, x);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (z = e));
            break;
          }
          z = t.return;
        }
    return ((T = da), (da = !1), T);
  }
  function gr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          ((l.destroy = void 0), o !== void 0 && di(t, n, o));
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function vl(e, t) {
    if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function fi(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == 'function' ? t(e) : (t.current = e);
    }
  }
  function fa(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), fa(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null && (delete t[ht], delete t[or], delete t[_o], delete t[Cd], delete t[Ed])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function pa(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ma(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || pa(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function pi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Yr)));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (pi(e, t, n), e = e.sibling; e !== null; ) (pi(e, t, n), (e = e.sibling));
  }
  function mi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (mi(e, t, n), e = e.sibling; e !== null; ) (mi(e, t, n), (e = e.sibling));
  }
  var Te = null,
    at = !1;
  function $t(e, t, n) {
    for (n = n.child; n !== null; ) (ha(e, t, n), (n = n.sibling));
  }
  function ha(e, t, n) {
    if (mt && typeof mt.onCommitFiberUnmount == 'function')
      try {
        mt.onCommitFiberUnmount(Rr, n);
      } catch {}
    switch (n.tag) {
      case 5:
        je || Nn(n, t);
      case 6:
        var r = Te,
          l = at;
        ((Te = null),
          $t(e, t, n),
          (Te = r),
          (at = l),
          Te !== null &&
            (at
              ? ((e = Te),
                (n = n.stateNode),
                e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
              : Te.removeChild(n.stateNode)));
        break;
      case 18:
        Te !== null &&
          (at
            ? ((e = Te),
              (n = n.stateNode),
              e.nodeType === 8 ? zo(e.parentNode, n) : e.nodeType === 1 && zo(e, n),
              Yn(e))
            : zo(Te, n.stateNode));
        break;
      case 4:
        ((r = Te),
          (l = at),
          (Te = n.stateNode.containerInfo),
          (at = !0),
          $t(e, t, n),
          (Te = r),
          (at = l));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!je && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
          l = r = r.next;
          do {
            var o = l,
              i = o.destroy;
            ((o = o.tag),
              i !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && di(n, t, i),
              (l = l.next));
          } while (l !== r);
        }
        $t(e, t, n);
        break;
      case 1:
        if (!je && (Nn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
          try {
            ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
          } catch (u) {
            ke(n, t, u);
          }
        $t(e, t, n);
        break;
      case 21:
        $t(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((je = (r = je) || n.memoizedState !== null), $t(e, t, n), (je = r))
          : $t(e, t, n);
        break;
      default:
        $t(e, t, n);
    }
  }
  function ga(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new Bd()),
        t.forEach(function (r) {
          var l = Xd.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(l, l));
        }));
    }
  }
  function ct(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        try {
          var o = e,
            i = t,
            u = i;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case 5:
                ((Te = u.stateNode), (at = !1));
                break e;
              case 3:
                ((Te = u.stateNode.containerInfo), (at = !0));
                break e;
              case 4:
                ((Te = u.stateNode.containerInfo), (at = !0));
                break e;
            }
            u = u.return;
          }
          if (Te === null) throw Error(s(160));
          (ha(o, i, l), (Te = null), (at = !1));
          var a = l.alternate;
          (a !== null && (a.return = null), (l.return = null));
        } catch (g) {
          ke(l, t, g);
        }
      }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (va(t, e), (t = t.sibling));
  }
  function va(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((ct(t, e), yt(e), r & 4)) {
          try {
            (gr(3, e, e.return), vl(3, e));
          } catch (N) {
            ke(e, e.return, N);
          }
          try {
            gr(5, e, e.return);
          } catch (N) {
            ke(e, e.return, N);
          }
        }
        break;
      case 1:
        (ct(t, e), yt(e), r & 512 && n !== null && Nn(n, n.return));
        break;
      case 5:
        if ((ct(t, e), yt(e), r & 512 && n !== null && Nn(n, n.return), e.flags & 32)) {
          var l = e.stateNode;
          try {
            On(l, '');
          } catch (N) {
            ke(e, e.return, N);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var o = e.memoizedProps,
            i = n !== null ? n.memoizedProps : o,
            u = e.type,
            a = e.updateQueue;
          if (((e.updateQueue = null), a !== null))
            try {
              (u === 'input' && o.type === 'radio' && o.name != null && Qi(l, o), Wl(u, i));
              var g = Wl(u, o);
              for (i = 0; i < a.length; i += 2) {
                var k = a[i],
                  S = a[i + 1];
                k === 'style'
                  ? Ji(l, S)
                  : k === 'dangerouslySetInnerHTML'
                    ? qi(l, S)
                    : k === 'children'
                      ? On(l, S)
                      : re(l, k, S, g);
              }
              switch (u) {
                case 'input':
                  Al(l, o);
                  break;
                case 'textarea':
                  Yi(l, o);
                  break;
                case 'select':
                  var v = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!o.multiple;
                  var L = o.value;
                  L != null
                    ? cn(l, !!o.multiple, L, !1)
                    : v !== !!o.multiple &&
                      (o.defaultValue != null
                        ? cn(l, !!o.multiple, o.defaultValue, !0)
                        : cn(l, !!o.multiple, o.multiple ? [] : '', !1));
              }
              l[or] = o;
            } catch (N) {
              ke(e, e.return, N);
            }
        }
        break;
      case 6:
        if ((ct(t, e), yt(e), r & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((l = e.stateNode), (o = e.memoizedProps));
          try {
            l.nodeValue = o;
          } catch (N) {
            ke(e, e.return, N);
          }
        }
        break;
      case 3:
        if ((ct(t, e), yt(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
          try {
            Yn(t.containerInfo);
          } catch (N) {
            ke(e, e.return, N);
          }
        break;
      case 4:
        (ct(t, e), yt(e));
        break;
      case 13:
        (ct(t, e),
          yt(e),
          (l = e.child),
          l.flags & 8192 &&
            ((o = l.memoizedState !== null),
            (l.stateNode.isHidden = o),
            !o || (l.alternate !== null && l.alternate.memoizedState !== null) || (vi = we())),
          r & 4 && ga(e));
        break;
      case 22:
        if (
          ((k = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((je = (g = je) || k), ct(t, e), (je = g)) : ct(t, e),
          yt(e),
          r & 8192)
        ) {
          if (
            ((g = e.memoizedState !== null), (e.stateNode.isHidden = g) && !k && (e.mode & 1) !== 0)
          )
            for (z = e, k = e.child; k !== null; ) {
              for (S = z = k; z !== null; ) {
                switch (((v = z), (L = v.child), v.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    gr(4, v, v.return);
                    break;
                  case 1:
                    Nn(v, v.return);
                    var T = v.stateNode;
                    if (typeof T.componentWillUnmount == 'function') {
                      ((r = v), (n = v.return));
                      try {
                        ((t = r),
                          (T.props = t.memoizedProps),
                          (T.state = t.memoizedState),
                          T.componentWillUnmount());
                      } catch (N) {
                        ke(r, n, N);
                      }
                    }
                    break;
                  case 5:
                    Nn(v, v.return);
                    break;
                  case 22:
                    if (v.memoizedState !== null) {
                      wa(S);
                      continue;
                    }
                }
                L !== null ? ((L.return = v), (z = L)) : wa(S);
              }
              k = k.sibling;
            }
          e: for (k = null, S = e; ; ) {
            if (S.tag === 5) {
              if (k === null) {
                k = S;
                try {
                  ((l = S.stateNode),
                    g
                      ? ((o = l.style),
                        typeof o.setProperty == 'function'
                          ? o.setProperty('display', 'none', 'important')
                          : (o.display = 'none'))
                      : ((u = S.stateNode),
                        (a = S.memoizedProps.style),
                        (i = a != null && a.hasOwnProperty('display') ? a.display : null),
                        (u.style.display = Zi('display', i))));
                } catch (N) {
                  ke(e, e.return, N);
                }
              }
            } else if (S.tag === 6) {
              if (k === null)
                try {
                  S.stateNode.nodeValue = g ? '' : S.memoizedProps;
                } catch (N) {
                  ke(e, e.return, N);
                }
            } else if (
              ((S.tag !== 22 && S.tag !== 23) || S.memoizedState === null || S === e) &&
              S.child !== null
            ) {
              ((S.child.return = S), (S = S.child));
              continue;
            }
            if (S === e) break e;
            for (; S.sibling === null; ) {
              if (S.return === null || S.return === e) break e;
              (k === S && (k = null), (S = S.return));
            }
            (k === S && (k = null), (S.sibling.return = S.return), (S = S.sibling));
          }
        }
        break;
      case 19:
        (ct(t, e), yt(e), r & 4 && ga(e));
        break;
      case 21:
        break;
      default:
        (ct(t, e), yt(e));
    }
  }
  function yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (pa(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (On(l, ''), (r.flags &= -33));
            var o = ma(e);
            mi(e, o, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo,
              u = ma(e);
            pi(e, u, i);
            break;
          default:
            throw Error(s(161));
        }
      } catch (a) {
        ke(e, e.return, a);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Vd(e, t, n) {
    ((z = e), ya(e));
  }
  function ya(e, t, n) {
    for (var r = (e.mode & 1) !== 0; z !== null; ) {
      var l = z,
        o = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || gl;
        if (!i) {
          var u = l.alternate,
            a = (u !== null && u.memoizedState !== null) || je;
          u = gl;
          var g = je;
          if (((gl = i), (je = a) && !g))
            for (z = l; z !== null; )
              ((i = z),
                (a = i.child),
                i.tag === 22 && i.memoizedState !== null
                  ? Sa(l)
                  : a !== null
                    ? ((a.return = i), (z = a))
                    : Sa(l));
          for (; o !== null; ) ((z = o), ya(o), (o = o.sibling));
          ((z = l), (gl = u), (je = g));
        }
        ka(e);
      } else (l.subtreeFlags & 8772) !== 0 && o !== null ? ((o.return = l), (z = o)) : ka(e);
    }
  }
  function ka(e) {
    for (; z !== null; ) {
      var t = z;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                je || vl(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !je)
                  if (n === null) r.componentDidMount();
                  else {
                    var l =
                      t.elementType === t.type ? n.memoizedProps : st(t.type, n.memoizedProps);
                    r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var o = t.updateQueue;
                o !== null && ws(t, o, r);
                break;
              case 3:
                var i = t.updateQueue;
                if (i !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  ws(t, i, n);
                }
                break;
              case 5:
                var u = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = u;
                  var a = t.memoizedProps;
                  switch (t.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      a.autoFocus && n.focus();
                      break;
                    case 'img':
                      a.src && (n.src = a.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var g = t.alternate;
                  if (g !== null) {
                    var k = g.memoizedState;
                    if (k !== null) {
                      var S = k.dehydrated;
                      S !== null && Yn(S);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(s(163));
            }
          je || (t.flags & 512 && fi(t));
        } catch (v) {
          ke(t, t.return, v);
        }
      }
      if (t === e) {
        z = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (z = n));
        break;
      }
      z = t.return;
    }
  }
  function wa(e) {
    for (; z !== null; ) {
      var t = z;
      if (t === e) {
        z = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (z = n));
        break;
      }
      z = t.return;
    }
  }
  function Sa(e) {
    for (; z !== null; ) {
      var t = z;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              vl(4, t);
            } catch (a) {
              ke(t, n, a);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == 'function') {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (a) {
                ke(t, l, a);
              }
            }
            var o = t.return;
            try {
              fi(t);
            } catch (a) {
              ke(t, o, a);
            }
            break;
          case 5:
            var i = t.return;
            try {
              fi(t);
            } catch (a) {
              ke(t, i, a);
            }
        }
      } catch (a) {
        ke(t, t.return, a);
      }
      if (t === e) {
        z = null;
        break;
      }
      var u = t.sibling;
      if (u !== null) {
        ((u.return = t.return), (z = u));
        break;
      }
      z = t.return;
    }
  }
  var Hd = Math.ceil,
    yl = fe.ReactCurrentDispatcher,
    hi = fe.ReactCurrentOwner,
    nt = fe.ReactCurrentBatchConfig,
    Z = 0,
    ze = null,
    xe = null,
    Re = 0,
    Xe = 0,
    Dn = Ft(0),
    Pe = 0,
    vr = null,
    ln = 0,
    kl = 0,
    gi = 0,
    yr = null,
    Ve = null,
    vi = 0,
    In = 1 / 0,
    zt = null,
    wl = !1,
    yi = null,
    Vt = null,
    Sl = !1,
    Ht = null,
    xl = 0,
    kr = 0,
    ki = null,
    Cl = -1,
    El = 0;
  function Oe() {
    return (Z & 6) !== 0 ? we() : Cl !== -1 ? Cl : (Cl = we());
  }
  function Wt(e) {
    return (e.mode & 1) === 0
      ? 1
      : (Z & 2) !== 0 && Re !== 0
        ? Re & -Re
        : Ld.transition !== null
          ? (El === 0 && (El = mu()), El)
          : ((e = oe), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Cu(e.type))), e);
  }
  function dt(e, t, n, r) {
    if (50 < kr) throw ((kr = 0), (ki = null), Error(s(185)));
    (Hn(e, n, r),
      ((Z & 2) === 0 || e !== ze) &&
        (e === ze && ((Z & 2) === 0 && (kl |= n), Pe === 4 && Qt(e, Re)),
        He(e, r),
        n === 1 && Z === 0 && (t.mode & 1) === 0 && ((In = we() + 500), Zr && Ut())));
  }
  function He(e, t) {
    var n = e.callbackNode;
    Lc(e, t);
    var r = Ir(e, e === ze ? Re : 0);
    if (r === 0) (n !== null && du(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && du(n), t === 1))
        (e.tag === 0 ? Pd(Ca.bind(null, e)) : ss(Ca.bind(null, e)),
          Sd(function () {
            (Z & 6) === 0 && Ut();
          }),
          (n = null));
      else {
        switch (hu(r)) {
          case 1:
            n = ql;
            break;
          case 4:
            n = fu;
            break;
          case 16:
            n = Tr;
            break;
          case 536870912:
            n = pu;
            break;
          default:
            n = Tr;
        }
        n = Na(n, xa.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function xa(e, t) {
    if (((Cl = -1), (El = 0), (Z & 6) !== 0)) throw Error(s(327));
    var n = e.callbackNode;
    if (Mn() && e.callbackNode !== n) return null;
    var r = Ir(e, e === ze ? Re : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Pl(e, r);
    else {
      t = r;
      var l = Z;
      Z |= 2;
      var o = Pa();
      (ze !== e || Re !== t) && ((zt = null), (In = we() + 500), un(e, t));
      do
        try {
          bd();
          break;
        } catch (u) {
          Ea(e, u);
        }
      while (!0);
      (Oo(), (yl.current = o), (Z = l), xe !== null ? (t = 0) : ((ze = null), (Re = 0), (t = Pe)));
    }
    if (t !== 0) {
      if ((t === 2 && ((l = Zl(e)), l !== 0 && ((r = l), (t = wi(e, l)))), t === 1))
        throw ((n = vr), un(e, 0), Qt(e, r), He(e, we()), n);
      if (t === 6) Qt(e, r);
      else {
        if (
          ((l = e.current.alternate),
          (r & 30) === 0 &&
            !Wd(l) &&
            ((t = Pl(e, r)),
            t === 2 && ((o = Zl(e)), o !== 0 && ((r = o), (t = wi(e, o)))),
            t === 1))
        )
          throw ((n = vr), un(e, 0), Qt(e, r), He(e, we()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            sn(e, Ve, zt);
            break;
          case 3:
            if ((Qt(e, r), (r & 130023424) === r && ((t = vi + 500 - we()), 10 < t))) {
              if (Ir(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                (Oe(), (e.pingedLanes |= e.suspendedLanes & l));
                break;
              }
              e.timeoutHandle = Lo(sn.bind(null, e, Ve, zt), t);
              break;
            }
            sn(e, Ve, zt);
            break;
          case 4:
            if ((Qt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - ot(r);
              ((o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o));
            }
            if (
              ((r = l),
              (r = we() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * Hd(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = Lo(sn.bind(null, e, Ve, zt), r);
              break;
            }
            sn(e, Ve, zt);
            break;
          case 5:
            sn(e, Ve, zt);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return (He(e, we()), e.callbackNode === n ? xa.bind(null, e) : null);
  }
  function wi(e, t) {
    var n = yr;
    return (
      e.current.memoizedState.isDehydrated && (un(e, t).flags |= 256),
      (e = Pl(e, t)),
      e !== 2 && ((t = Ve), (Ve = n), t !== null && Si(t)),
      e
    );
  }
  function Si(e) {
    Ve === null ? (Ve = e) : Ve.push.apply(Ve, e);
  }
  function Wd(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              o = l.getSnapshot;
            l = l.value;
            try {
              if (!it(o(), l)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Qt(e, t) {
    for (
      t &= ~gi, t &= ~kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
      0 < t;
    ) {
      var n = 31 - ot(t),
        r = 1 << n;
      ((e[n] = -1), (t &= ~r));
    }
  }
  function Ca(e) {
    if ((Z & 6) !== 0) throw Error(s(327));
    Mn();
    var t = Ir(e, 0);
    if ((t & 1) === 0) return (He(e, we()), null);
    var n = Pl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Zl(e);
      r !== 0 && ((t = r), (n = wi(e, r)));
    }
    if (n === 1) throw ((n = vr), un(e, 0), Qt(e, t), He(e, we()), n);
    if (n === 6) throw Error(s(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      sn(e, Ve, zt),
      He(e, we()),
      null
    );
  }
  function xi(e, t) {
    var n = Z;
    Z |= 1;
    try {
      return e(t);
    } finally {
      ((Z = n), Z === 0 && ((In = we() + 500), Zr && Ut()));
    }
  }
  function on(e) {
    Ht !== null && Ht.tag === 0 && (Z & 6) === 0 && Mn();
    var t = Z;
    Z |= 1;
    var n = nt.transition,
      r = oe;
    try {
      if (((nt.transition = null), (oe = 1), e)) return e();
    } finally {
      ((oe = r), (nt.transition = n), (Z = t), (Z & 6) === 0 && Ut());
    }
  }
  function Ci() {
    ((Xe = Dn.current), de(Dn));
  }
  function un(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), wd(n)), xe !== null))
      for (n = xe.return; n !== null; ) {
        var r = n;
        switch ((Do(r), r.tag)) {
          case 1:
            ((r = r.type.childContextTypes), r != null && Xr());
            break;
          case 3:
            (Tn(), de(Ae), de(De), Qo());
            break;
          case 5:
            Ho(r);
            break;
          case 4:
            Tn();
            break;
          case 13:
            de(he);
            break;
          case 19:
            de(he);
            break;
          case 10:
            Uo(r.type._context);
            break;
          case 22:
          case 23:
            Ci();
        }
        n = n.return;
      }
    if (
      ((ze = e),
      (xe = e = bt(e.current, null)),
      (Re = Xe = t),
      (Pe = 0),
      (vr = null),
      (gi = kl = ln = 0),
      (Ve = yr = null),
      tn !== null)
    ) {
      for (t = 0; t < tn.length; t++)
        if (((n = tn[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var l = r.next,
            o = n.pending;
          if (o !== null) {
            var i = o.next;
            ((o.next = l), (r.next = i));
          }
          n.pending = r;
        }
      tn = null;
    }
    return e;
  }
  function Ea(e, t) {
    do {
      var n = xe;
      try {
        if ((Oo(), (sl.current = fl), al)) {
          for (var r = ge.memoizedState; r !== null; ) {
            var l = r.queue;
            (l !== null && (l.pending = null), (r = r.next));
          }
          al = !1;
        }
        if (
          ((rn = 0),
          (Le = Ee = ge = null),
          (dr = !1),
          (fr = 0),
          (hi.current = null),
          n === null || n.return === null)
        ) {
          ((Pe = 1), (vr = t), (xe = null));
          break;
        }
        e: {
          var o = e,
            i = n.return,
            u = n,
            a = t;
          if (
            ((t = Re),
            (u.flags |= 32768),
            a !== null && typeof a == 'object' && typeof a.then == 'function')
          ) {
            var g = a,
              k = u,
              S = k.tag;
            if ((k.mode & 1) === 0 && (S === 0 || S === 11 || S === 15)) {
              var v = k.alternate;
              v
                ? ((k.updateQueue = v.updateQueue),
                  (k.memoizedState = v.memoizedState),
                  (k.lanes = v.lanes))
                : ((k.updateQueue = null), (k.memoizedState = null));
            }
            var L = Gs(i);
            if (L !== null) {
              ((L.flags &= -257), Xs(L, i, u, o, t), L.mode & 1 && Ys(o, g, t), (t = L), (a = g));
              var T = t.updateQueue;
              if (T === null) {
                var N = new Set();
                (N.add(a), (t.updateQueue = N));
              } else T.add(a);
              break e;
            } else {
              if ((t & 1) === 0) {
                (Ys(o, g, t), Ei());
                break e;
              }
              a = Error(s(426));
            }
          } else if (me && u.mode & 1) {
            var Se = Gs(i);
            if (Se !== null) {
              ((Se.flags & 65536) === 0 && (Se.flags |= 256), Xs(Se, i, u, o, t), jo(Rn(a, u)));
              break e;
            }
          }
          ((o = a = Rn(a, u)),
            Pe !== 4 && (Pe = 2),
            yr === null ? (yr = [o]) : yr.push(o),
            (o = i));
          do {
            switch (o.tag) {
              case 3:
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var m = bs(o, a, t);
                ks(o, m);
                break e;
              case 1:
                u = a;
                var d = o.type,
                  h = o.stateNode;
                if (
                  (o.flags & 128) === 0 &&
                  (typeof d.getDerivedStateFromError == 'function' ||
                    (h !== null &&
                      typeof h.componentDidCatch == 'function' &&
                      (Vt === null || !Vt.has(h))))
                ) {
                  ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                  var x = Ks(o, u, t);
                  ks(o, x);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        za(n);
      } catch (I) {
        ((t = I), xe === n && n !== null && (xe = n = n.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Pa() {
    var e = yl.current;
    return ((yl.current = fl), e === null ? fl : e);
  }
  function Ei() {
    ((Pe === 0 || Pe === 3 || Pe === 2) && (Pe = 4),
      ze === null || ((ln & 268435455) === 0 && (kl & 268435455) === 0) || Qt(ze, Re));
  }
  function Pl(e, t) {
    var n = Z;
    Z |= 2;
    var r = Pa();
    (ze !== e || Re !== t) && ((zt = null), un(e, t));
    do
      try {
        Qd();
        break;
      } catch (l) {
        Ea(e, l);
      }
    while (!0);
    if ((Oo(), (Z = n), (yl.current = r), xe !== null)) throw Error(s(261));
    return ((ze = null), (Re = 0), Pe);
  }
  function Qd() {
    for (; xe !== null; ) La(xe);
  }
  function bd() {
    for (; xe !== null && !vc(); ) La(xe);
  }
  function La(e) {
    var t = Ra(e.alternate, e, Xe);
    ((e.memoizedProps = e.pendingProps), t === null ? za(e) : (xe = t), (hi.current = null));
  }
  function za(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = Ud(n, t, Xe)), n !== null)) {
          xe = n;
          return;
        }
      } else {
        if (((n = Ad(n, t)), n !== null)) {
          ((n.flags &= 32767), (xe = n));
          return;
        }
        if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((Pe = 6), (xe = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        xe = t;
        return;
      }
      xe = t = e;
    } while (t !== null);
    Pe === 0 && (Pe = 5);
  }
  function sn(e, t, n) {
    var r = oe,
      l = nt.transition;
    try {
      ((nt.transition = null), (oe = 1), Kd(e, t, n, r));
    } finally {
      ((nt.transition = l), (oe = r));
    }
    return null;
  }
  function Kd(e, t, n, r) {
    do Mn();
    while (Ht !== null);
    if ((Z & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(s(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var o = n.lanes | n.childLanes;
    if (
      (zc(e, o),
      e === ze && ((xe = ze = null), (Re = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        Sl ||
        ((Sl = !0),
        Na(Tr, function () {
          return (Mn(), null);
        })),
      (o = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || o)
    ) {
      ((o = nt.transition), (nt.transition = null));
      var i = oe;
      oe = 1;
      var u = Z;
      ((Z |= 4),
        (hi.current = null),
        $d(e, n),
        va(n, e),
        pd(Eo),
        (Fr = !!Co),
        (Eo = Co = null),
        (e.current = n),
        Vd(n),
        yc(),
        (Z = u),
        (oe = i),
        (nt.transition = o));
    } else e.current = n;
    if (
      (Sl && ((Sl = !1), (Ht = e), (xl = l)),
      (o = e.pendingLanes),
      o === 0 && (Vt = null),
      Sc(n.stateNode),
      He(e, we()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
    if (wl) throw ((wl = !1), (e = yi), (yi = null), e);
    return (
      (xl & 1) !== 0 && e.tag !== 0 && Mn(),
      (o = e.pendingLanes),
      (o & 1) !== 0 ? (e === ki ? kr++ : ((kr = 0), (ki = e))) : (kr = 0),
      Ut(),
      null
    );
  }
  function Mn() {
    if (Ht !== null) {
      var e = hu(xl),
        t = nt.transition,
        n = oe;
      try {
        if (((nt.transition = null), (oe = 16 > e ? 16 : e), Ht === null)) var r = !1;
        else {
          if (((e = Ht), (Ht = null), (xl = 0), (Z & 6) !== 0)) throw Error(s(331));
          var l = Z;
          for (Z |= 4, z = e.current; z !== null; ) {
            var o = z,
              i = o.child;
            if ((z.flags & 16) !== 0) {
              var u = o.deletions;
              if (u !== null) {
                for (var a = 0; a < u.length; a++) {
                  var g = u[a];
                  for (z = g; z !== null; ) {
                    var k = z;
                    switch (k.tag) {
                      case 0:
                      case 11:
                      case 15:
                        gr(8, k, o);
                    }
                    var S = k.child;
                    if (S !== null) ((S.return = k), (z = S));
                    else
                      for (; z !== null; ) {
                        k = z;
                        var v = k.sibling,
                          L = k.return;
                        if ((fa(k), k === g)) {
                          z = null;
                          break;
                        }
                        if (v !== null) {
                          ((v.return = L), (z = v));
                          break;
                        }
                        z = L;
                      }
                  }
                }
                var T = o.alternate;
                if (T !== null) {
                  var N = T.child;
                  if (N !== null) {
                    T.child = null;
                    do {
                      var Se = N.sibling;
                      ((N.sibling = null), (N = Se));
                    } while (N !== null);
                  }
                }
                z = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && i !== null) ((i.return = o), (z = i));
            else
              e: for (; z !== null; ) {
                if (((o = z), (o.flags & 2048) !== 0))
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      gr(9, o, o.return);
                  }
                var m = o.sibling;
                if (m !== null) {
                  ((m.return = o.return), (z = m));
                  break e;
                }
                z = o.return;
              }
          }
          var d = e.current;
          for (z = d; z !== null; ) {
            i = z;
            var h = i.child;
            if ((i.subtreeFlags & 2064) !== 0 && h !== null) ((h.return = i), (z = h));
            else
              e: for (i = d; z !== null; ) {
                if (((u = z), (u.flags & 2048) !== 0))
                  try {
                    switch (u.tag) {
                      case 0:
                      case 11:
                      case 15:
                        vl(9, u);
                    }
                  } catch (I) {
                    ke(u, u.return, I);
                  }
                if (u === i) {
                  z = null;
                  break e;
                }
                var x = u.sibling;
                if (x !== null) {
                  ((x.return = u.return), (z = x));
                  break e;
                }
                z = u.return;
              }
          }
          if (((Z = l), Ut(), mt && typeof mt.onPostCommitFiberRoot == 'function'))
            try {
              mt.onPostCommitFiberRoot(Rr, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        ((oe = n), (nt.transition = t));
      }
    }
    return !1;
  }
  function _a(e, t, n) {
    ((t = Rn(n, t)),
      (t = bs(e, t, 1)),
      (e = Bt(e, t, 1)),
      (t = Oe()),
      e !== null && (Hn(e, 1, t), He(e, t)));
  }
  function ke(e, t, n) {
    if (e.tag === 3) _a(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          _a(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof r.componentDidCatch == 'function' && (Vt === null || !Vt.has(r)))
          ) {
            ((e = Rn(n, e)),
              (e = Ks(t, e, 1)),
              (t = Bt(t, e, 1)),
              (e = Oe()),
              t !== null && (Hn(t, 1, e), He(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Yd(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (t = Oe()),
      (e.pingedLanes |= e.suspendedLanes & n),
      ze === e &&
        (Re & n) === n &&
        (Pe === 4 || (Pe === 3 && (Re & 130023424) === Re && 500 > we() - vi)
          ? un(e, 0)
          : (gi |= n)),
      He(e, t));
  }
  function Ta(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = Dr), (Dr <<= 1), (Dr & 130023424) === 0 && (Dr = 4194304)));
    var n = Oe();
    ((e = Et(e, t)), e !== null && (Hn(e, t, n), He(e, n)));
  }
  function Gd(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), Ta(e, n));
  }
  function Xd(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    (r !== null && r.delete(t), Ta(e, n));
  }
  var Ra;
  Ra = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ae.current) $e = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return (($e = !1), Od(e, t, n));
        $e = (e.flags & 131072) !== 0;
      }
    else (($e = !1), me && (t.flags & 1048576) !== 0 && as(t, el, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        (hl(e, t), (e = t.pendingProps));
        var l = xn(t, De.current);
        (_n(t, n), (l = Yo(null, t, r, e, l, n)));
        var o = Go();
        return (
          (t.flags |= 1),
          typeof l == 'object' &&
          l !== null &&
          typeof l.render == 'function' &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Be(r) ? ((o = !0), qr(t)) : (o = !1),
              (t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
              $o(t),
              (l.updater = pl),
              (t.stateNode = l),
              (l._reactInternals = t),
              ti(t, r, e, n),
              (t = oi(null, t, r, !0, o, n)))
            : ((t.tag = 0), me && o && No(t), Fe(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (hl(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = Zd(r)),
            (e = st(r, e)),
            l)
          ) {
            case 0:
              t = li(null, t, r, e, n);
              break e;
            case 1:
              t = na(null, t, r, e, n);
              break e;
            case 11:
              t = qs(null, t, r, e, n);
              break e;
            case 14:
              t = Zs(null, t, r, st(r.type, e), n);
              break e;
          }
          throw Error(s(306, r, ''));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : st(r, l)),
          li(e, t, r, l, n)
        );
      case 1:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : st(r, l)),
          na(e, t, r, l, n)
        );
      case 3:
        e: {
          if ((ra(t), e === null)) throw Error(s(387));
          ((r = t.pendingProps),
            (o = t.memoizedState),
            (l = o.element),
            ys(e, t),
            il(t, r, null, n));
          var i = t.memoizedState;
          if (((r = i.element), o.isDehydrated))
            if (
              ((o = {
                element: r,
                isDehydrated: !1,
                cache: i.cache,
                pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                transitions: i.transitions,
              }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              t.flags & 256)
            ) {
              ((l = Rn(Error(s(423)), t)), (t = la(e, t, r, n, l)));
              break e;
            } else if (r !== l) {
              ((l = Rn(Error(s(424)), t)), (t = la(e, t, r, n, l)));
              break e;
            } else
              for (
                Ge = jt(t.stateNode.containerInfo.firstChild),
                  Ye = t,
                  me = !0,
                  ut = null,
                  n = gs(t, null, r, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((Pn(), r === l)) {
              t = Lt(e, t, n);
              break e;
            }
            Fe(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          Ss(t),
          e === null && Mo(t),
          (r = t.type),
          (l = t.pendingProps),
          (o = e !== null ? e.memoizedProps : null),
          (i = l.children),
          Po(r, l) ? (i = null) : o !== null && Po(r, o) && (t.flags |= 32),
          ta(e, t),
          Fe(e, t, i, n),
          t.child
        );
      case 6:
        return (e === null && Mo(t), null);
      case 13:
        return oa(e, t, n);
      case 4:
        return (
          Vo(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Ln(t, null, r, n)) : Fe(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : st(r, l)),
          qs(e, t, r, l, n)
        );
      case 7:
        return (Fe(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Fe(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Fe(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (o = t.memoizedProps),
            (i = l.value),
            se(rl, r._currentValue),
            (r._currentValue = i),
            o !== null)
          )
            if (it(o.value, i)) {
              if (o.children === l.children && !Ae.current) {
                t = Lt(e, t, n);
                break e;
              }
            } else
              for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                var u = o.dependencies;
                if (u !== null) {
                  i = o.child;
                  for (var a = u.firstContext; a !== null; ) {
                    if (a.context === r) {
                      if (o.tag === 1) {
                        ((a = Pt(-1, n & -n)), (a.tag = 2));
                        var g = o.updateQueue;
                        if (g !== null) {
                          g = g.shared;
                          var k = g.pending;
                          (k === null ? (a.next = a) : ((a.next = k.next), (k.next = a)),
                            (g.pending = a));
                        }
                      }
                      ((o.lanes |= n),
                        (a = o.alternate),
                        a !== null && (a.lanes |= n),
                        Ao(o.return, n, t),
                        (u.lanes |= n));
                      break;
                    }
                    a = a.next;
                  }
                } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
                else if (o.tag === 18) {
                  if (((i = o.return), i === null)) throw Error(s(341));
                  ((i.lanes |= n),
                    (u = i.alternate),
                    u !== null && (u.lanes |= n),
                    Ao(i, n, t),
                    (i = o.sibling));
                } else i = o.child;
                if (i !== null) i.return = o;
                else
                  for (i = o; i !== null; ) {
                    if (i === t) {
                      i = null;
                      break;
                    }
                    if (((o = i.sibling), o !== null)) {
                      ((o.return = i.return), (i = o));
                      break;
                    }
                    i = i.return;
                  }
                o = i;
              }
          (Fe(e, t, l.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          _n(t, n),
          (l = et(l)),
          (r = r(l)),
          (t.flags |= 1),
          Fe(e, t, r, n),
          t.child
        );
      case 14:
        return ((r = t.type), (l = st(r, t.pendingProps)), (l = st(r.type, l)), Zs(e, t, r, l, n));
      case 15:
        return Js(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : st(r, l)),
          hl(e, t),
          (t.tag = 1),
          Be(r) ? ((e = !0), qr(t)) : (e = !1),
          _n(t, n),
          Ws(t, r, l),
          ti(t, r, l, n),
          oi(null, t, r, !0, e, n)
        );
      case 19:
        return ua(e, t, n);
      case 22:
        return ea(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function Na(e, t) {
    return cu(e, t);
  }
  function qd(e, t, n, r) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function rt(e, t, n, r) {
    return new qd(e, t, n, r);
  }
  function Pi(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Zd(e) {
    if (typeof e == 'function') return Pi(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === ft)) return 11;
      if (e === pt) return 14;
    }
    return 2;
  }
  function bt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = rt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function Ll(e, t, n, r, l, o) {
    var i = 2;
    if (((r = e), typeof e == 'function')) Pi(e) && (i = 1);
    else if (typeof e == 'string') i = 5;
    else
      e: switch (e) {
        case Ne:
          return an(n.children, l, o, t);
        case qe:
          ((i = 8), (l |= 8));
          break;
        case _t:
          return ((e = rt(12, n, t, l | 2)), (e.elementType = _t), (e.lanes = o), e);
        case Qe:
          return ((e = rt(13, n, t, l)), (e.elementType = Qe), (e.lanes = o), e);
        case lt:
          return ((e = rt(19, n, t, l)), (e.elementType = lt), (e.lanes = o), e);
        case ye:
          return zl(n, l, o, t);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case kt:
                i = 10;
                break e;
              case Gt:
                i = 9;
                break e;
              case ft:
                i = 11;
                break e;
              case pt:
                i = 14;
                break e;
              case Ue:
                ((i = 16), (r = null));
                break e;
            }
          throw Error(s(130, e == null ? e : typeof e, ''));
      }
    return ((t = rt(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t);
  }
  function an(e, t, n, r) {
    return ((e = rt(7, e, r, t)), (e.lanes = n), e);
  }
  function zl(e, t, n, r) {
    return (
      (e = rt(22, e, r, t)),
      (e.elementType = ye),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Li(e, t, n) {
    return ((e = rt(6, e, null, t)), (e.lanes = n), e);
  }
  function zi(e, t, n) {
    return (
      (t = rt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Jd(e, t, n, r, l) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Jl(0)),
      (this.expirationTimes = Jl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Jl(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null));
  }
  function _i(e, t, n, r, l, o, i, u, a) {
    return (
      (e = new Jd(e, t, n, u, a)),
      t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
      (o = rt(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      $o(o),
      e
    );
  }
  function ef(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ie,
      key: r == null ? null : '' + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Da(e) {
    if (!e) return Ot;
    e = e._reactInternals;
    e: {
      if (Xt(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Be(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Be(n)) return is(e, n, t);
    }
    return t;
  }
  function Ia(e, t, n, r, l, o, i, u, a) {
    return (
      (e = _i(n, r, !0, e, l, o, i, u, a)),
      (e.context = Da(null)),
      (n = e.current),
      (r = Oe()),
      (l = Wt(n)),
      (o = Pt(r, l)),
      (o.callback = t ?? null),
      Bt(n, o, l),
      (e.current.lanes = l),
      Hn(e, l, r),
      He(e, r),
      e
    );
  }
  function _l(e, t, n, r) {
    var l = t.current,
      o = Oe(),
      i = Wt(l);
    return (
      (n = Da(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Pt(o, i)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Bt(l, t, i)),
      e !== null && (dt(e, l, i, o), ol(e, l, i)),
      i
    );
  }
  function Tl(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Ma(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Ti(e, t) {
    (Ma(e, t), (e = e.alternate) && Ma(e, t));
  }
  function tf() {
    return null;
  }
  var ja =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Ri(e) {
    this._internalRoot = e;
  }
  ((Rl.prototype.render = Ri.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      _l(e, t, null, null);
    }),
    (Rl.prototype.unmount = Ri.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (on(function () {
            _l(null, e, null, null);
          }),
            (t[wt] = null));
        }
      }));
  function Rl(e) {
    this._internalRoot = e;
  }
  Rl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = yu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Dt.length && t !== 0 && t < Dt[n].priority; n++);
      (Dt.splice(n, 0, e), n === 0 && Su(e));
    }
  };
  function Ni(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Nl(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    );
  }
  function Fa() {}
  function nf(e, t, n, r, l) {
    if (l) {
      if (typeof r == 'function') {
        var o = r;
        r = function () {
          var g = Tl(i);
          o.call(g);
        };
      }
      var i = Ia(t, r, e, 0, null, !1, !1, '', Fa);
      return (
        (e._reactRootContainer = i),
        (e[wt] = i.current),
        rr(e.nodeType === 8 ? e.parentNode : e),
        on(),
        i
      );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == 'function') {
      var u = r;
      r = function () {
        var g = Tl(a);
        u.call(g);
      };
    }
    var a = _i(e, 0, !1, null, null, !1, !1, '', Fa);
    return (
      (e._reactRootContainer = a),
      (e[wt] = a.current),
      rr(e.nodeType === 8 ? e.parentNode : e),
      on(function () {
        _l(t, a, n, r);
      }),
      a
    );
  }
  function Dl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var i = o;
      if (typeof l == 'function') {
        var u = l;
        l = function () {
          var a = Tl(i);
          u.call(a);
        };
      }
      _l(t, i, e, l);
    } else i = nf(n, t, e, l, r);
    return Tl(i);
  }
  ((gu = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Vn(t.pendingLanes);
          n !== 0 && (eo(t, n | 1), He(t, we()), (Z & 6) === 0 && ((In = we() + 500), Ut()));
        }
        break;
      case 13:
        (on(function () {
          var r = Et(e, 1);
          if (r !== null) {
            var l = Oe();
            dt(r, e, 1, l);
          }
        }),
          Ti(e, 1));
    }
  }),
    (to = function (e) {
      if (e.tag === 13) {
        var t = Et(e, 134217728);
        if (t !== null) {
          var n = Oe();
          dt(t, e, 134217728, n);
        }
        Ti(e, 134217728);
      }
    }),
    (vu = function (e) {
      if (e.tag === 13) {
        var t = Wt(e),
          n = Et(e, t);
        if (n !== null) {
          var r = Oe();
          dt(n, e, t, r);
        }
        Ti(e, t);
      }
    }),
    (yu = function () {
      return oe;
    }),
    (ku = function (e, t) {
      var n = oe;
      try {
        return ((oe = e), t());
      } finally {
        oe = n;
      }
    }),
    (Kl = function (e, t, n) {
      switch (t) {
        case 'input':
          if ((Al(e, n), (t = n.name), n.type === 'radio' && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = Gr(r);
                if (!l) throw Error(s(90));
                (Hi(r), Al(r, l));
              }
            }
          }
          break;
        case 'textarea':
          Yi(e, n);
          break;
        case 'select':
          ((t = n.value), t != null && cn(e, !!n.multiple, t, !1));
      }
    }),
    (ru = xi),
    (lu = on));
  var rf = { usingClientEntryPoint: !1, Events: [ir, wn, Gr, tu, nu, xi] },
    wr = {
      findFiberByHostInstance: qt,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    lf = {
      bundleType: wr.bundleType,
      version: wr.version,
      rendererPackageName: wr.rendererPackageName,
      rendererConfig: wr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: fe.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = su(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: wr.findFiberByHostInstance || tf,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Il = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Il.isDisabled && Il.supportsFiber)
      try {
        ((Rr = Il.inject(lf)), (mt = Il));
      } catch {}
  }
  return (
    (We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rf),
    (We.createPortal = function (e, t) {
      var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Ni(t)) throw Error(s(200));
      return ef(e, t, null, n);
    }),
    (We.createRoot = function (e, t) {
      if (!Ni(e)) throw Error(s(299));
      var n = !1,
        r = '',
        l = ja;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = _i(e, 1, !1, null, null, n, !1, r, l)),
        (e[wt] = t.current),
        rr(e.nodeType === 8 ? e.parentNode : e),
        new Ri(t)
      );
    }),
    (We.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(s(188))
          : ((e = Object.keys(e).join(',')), Error(s(268, e)));
      return ((e = su(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (We.flushSync = function (e) {
      return on(e);
    }),
    (We.hydrate = function (e, t, n) {
      if (!Nl(t)) throw Error(s(200));
      return Dl(null, e, t, !0, n);
    }),
    (We.hydrateRoot = function (e, t, n) {
      if (!Ni(e)) throw Error(s(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        o = '',
        i = ja;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
        (t = Ia(t, null, e, 1, n ?? null, l, !1, o, i)),
        (e[wt] = t.current),
        rr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          ((n = r[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l));
      return new Rl(t);
    }),
    (We.render = function (e, t, n) {
      if (!Nl(t)) throw Error(s(200));
      return Dl(null, e, t, !1, n);
    }),
    (We.unmountComponentAtNode = function (e) {
      if (!Nl(e)) throw Error(s(40));
      return e._reactRootContainer
        ? (on(function () {
            Dl(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[wt] = null));
            });
          }),
          !0)
        : !1;
    }),
    (We.unstable_batchedUpdates = xi),
    (We.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Nl(n)) throw Error(s(200));
      if (e == null || e._reactInternals === void 0) throw Error(s(38));
      return Dl(e, t, n, !1, r);
    }),
    (We.version = '18.3.1-next-f1338f8080-20240426'),
    We
  );
}
var Wa;
function Xa() {
  if (Wa) return Mi.exports;
  Wa = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return (c(), (Mi.exports = mf()), Mi.exports);
}
var Qa;
function hf() {
  if (Qa) return Ml;
  Qa = 1;
  var c = Xa();
  return ((Ml.createRoot = c.createRoot), (Ml.hydrateRoot = c.hydrateRoot), Ml);
}
var qa = hf();
const W = {
    typography: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
      lineHeight: { tight: '1.25' },
    },
    spacing: {
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
    },
    borderRadius: { md: '0.375rem', lg: '0.5rem', xl: '0.75rem' },
    zIndex: { 20: '20' },
  },
  gf = {
    components: {
      button: {
        loading: 'Loading: {content}',
        submit: 'Submit',
        cancel: 'Cancel',
        delete: 'Delete',
        save: 'Save',
        edit: 'Edit',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        ariaLabel: 'Button: {content}',
        ariaLabelLoading: 'Loading: {content}',
        ariaPressed: 'Button pressed: {content}',
        ariaExpanded: 'Button expanded: {content}',
      },
      userCreateForm: {
        title: 'Create New User',
        formLabel: 'User creation form',
        fields: {
          username: 'Username',
          password: 'Password',
          email: 'Email (optional)',
          firstName: 'First Name (optional)',
          lastName: 'Last Name (optional)',
          phone: 'Phone (optional)',
        },
        submit: 'Create User',
        loading: 'Creating user...',
        success: 'User created successfully!',
        errors: {
          usernameRequired: 'Username is required',
          passwordRequired: 'Password is required',
          emailInvalid: 'Invalid email address',
          generic: 'Failed to create user. Please try again.',
        },
        announceOnCreate: 'User created',
      },
      input: {
        required: 'Required field',
        invalid: 'Invalid input',
        placeholder: 'Enter text...',
        ariaLabel: 'Input field: {label}',
        ariaRequired: 'Required input: {label}',
        ariaInvalid: 'Invalid input: {label}',
        emailPlaceholder: 'Enter email address...',
        passwordPlaceholder: 'Enter password...',
        searchPlaceholder: 'Search...',
      },
      card: {
        ariaLabel: 'Card: {title}',
        ariaLabelContent: 'Card content: {content}',
        defaultTitle: 'Card',
        moreActions: 'More actions',
      },
      navigation: {
        menu: 'Navigation menu',
        mainMenu: 'Main navigation',
        skipToMain: 'Skip to main content',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
      },
      form: {
        submitSuccess: 'Form submitted successfully',
        submitError: 'Error submitting form',
        validationError: 'Please fix validation errors',
        fieldRequired: 'This field is required',
        fieldInvalid: 'This field is invalid',
      },
      loading: {
        default: 'Loading...',
        content: 'Loading content...',
        page: 'Loading page...',
        ariaLabel: 'Loading indicator',
      },
      error: {
        general: 'An error occurred',
        notFound: 'Content not found',
        network: 'Network error occurred',
        ariaLabel: 'Error message: {message}',
      },
    },
    stories: {
      button: {
        title: 'Button Component',
        description:
          'Basic button component with multiple variants, sizes, and accessibility features. Supports primary, secondary, and danger color schemes.',
        variants: {
          primary: 'Primary Button',
          secondary: 'Secondary Button',
          danger: 'Danger Button',
        },
        sizes: { small: 'Small Button', medium: 'Medium Button', large: 'Large Button' },
        states: {
          default: 'Default Button',
          disabled: 'Disabled Button',
          loading: 'Loading Button',
          fullWidth: 'Full Width Button',
        },
        examples: {
          clickMe: 'Click me',
          submitForm: 'Submit Form',
          deleteAccount: 'Delete Account',
          saveChanges: 'Save Changes',
          cancelOrder: 'Cancel Order',
        },
        accessibility: {
          title: 'Accessibility Features',
          description:
            'Demonstrates button accessibility features including ARIA labels, focus management, and keyboard navigation.',
        },
        allVariants: {
          title: 'All Variants',
          description: 'Shows all button variants in a single view for comparison.',
        },
      },
      input: {
        title: 'Input Component',
        description:
          'Form input component with validation, accessibility features, and multiple types.',
        variants: {
          text: 'Text Input',
          email: 'Email Input',
          password: 'Password Input',
          search: 'Search Input',
        },
        states: {
          default: 'Default Input',
          required: 'Required Input',
          invalid: 'Invalid Input',
          disabled: 'Disabled Input',
        },
        examples: {
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email Address',
          password: 'Password',
        },
      },
      card: {
        title: 'Card Component',
        description:
          'Flexible card component for displaying content with optional headers, footers, and actions.',
        variants: {
          basic: 'Basic Card',
          withHeader: 'Card with Header',
          withFooter: 'Card with Footer',
          interactive: 'Interactive Card',
        },
        examples: {
          title: 'Example Card',
          content: 'This is an example card with some content to demonstrate the component.',
          headerTitle: 'Card Header',
          footerText: 'Card Footer',
        },
      },
      general: {
        examples: 'Examples',
        variants: 'Variants',
        states: 'States',
        accessibility: 'Accessibility',
        documentation: 'Documentation',
        playground: 'Playground',
      },
    },
    accessibility: {
      announcements: {
        localeChanged: 'Language changed to {locale}',
        pageLoaded: 'Page loaded',
        contentUpdated: 'Content updated',
        formSubmitted: 'Form submitted',
        errorOccurred: 'Error occurred: {error}',
      },
      instructions: {
        keyboard: 'Use Tab to navigate between elements',
        buttonActivation: 'Press Enter or Space to activate button',
        menuNavigation: 'Use arrow keys to navigate menu items',
        formNavigation: 'Use Tab to move between form fields',
      },
      labels: {
        required: 'Required',
        optional: 'Optional',
        invalid: 'Invalid',
        loading: 'Loading',
        expanded: 'Expanded',
        collapsed: 'Collapsed',
      },
    },
    petstore: {
      common: {
        close: 'Close',
        selectLabel: 'Select option',
        status: {
          available: 'Available',
          pending: 'Pending',
          sold: 'Sold',
          placed: 'Placed',
          approved: 'Approved',
          delivered: 'Delivered',
          info: 'Info',
          default: 'Status',
        },
        confirm: {
          defaultTitle: 'Are you sure?',
          confirm: 'Confirm',
          cancel: 'Cancel',
          announceConfirmed: 'Action confirmed',
          announceCancelled: 'Action cancelled',
        },
      },
      navigation: {
        tabsAriaLabel: 'Petstore sections',
        pets: 'Pets',
        orders: 'Orders',
        users: 'Users',
      },
      tabs: { activeLabel: 'Active tab' },
      select: {
        statusLabel: 'Status',
        petTypeLabel: 'Pet type',
        petTypes: { dog: 'Dog', cat: 'Cat', bird: 'Bird', fish: 'Fish' },
      },
      modal: {
        defaultTitle: 'Modal',
        openButton: 'Open modal',
        content: 'Modal content goes here.',
        editPetTitle: 'Edit Pet',
        smallTitle: 'Small modal',
        mediumTitle: 'Medium modal',
        largeTitle: 'Large modal',
        reopenButton: 'Re-open modal',
        focusTrapTitle: 'Focus trap demo',
        firstInputPlaceholder: 'First input',
        secondInputPlaceholder: 'Second input',
        doneButton: 'Done',
      },
      table: {
        ariaLabel: 'Data table',
        emptyState: 'No data available',
        emptyInventory: 'No inventory found',
        headers: { status: 'Status', count: 'Count', id: 'ID', petId: 'Pet ID' },
      },
      users: {
        title: 'User Management',
        lookup: {
          label: 'Lookup User',
          placeholder: 'Enter username...',
          button: 'Search',
          notFound: 'User not found',
          ariaLabel: 'User lookup form',
        },
        form: {
          createTitle: 'Create User',
          editTitle: 'Edit User',
          username: 'Username',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          password: 'Password',
          phone: 'Phone',
          save: 'Save',
          cancel: 'Cancel',
          ariaLabel: 'User form',
          announceSubmit: 'User form submitted',
        },
        card: {
          ariaLabel: 'User card: {username}',
          emailLabel: 'Email',
          phoneLabel: 'Phone',
          edit: 'Edit',
          delete: 'Delete',
          announceEdit: 'Editing user {username}',
          announceDelete: 'Deleting user {username}',
        },
      },
      auth: {
        form: {
          ariaLabel: 'Sign in form',
          username: 'Username',
          usernamePlaceholder: 'Enter username...',
          password: 'Password',
          passwordPlaceholder: 'Enter password...',
          submit: 'Sign In',
          announceSubmit: 'Signing in...',
        },
      },
      pets: {
        card: {
          ariaLabel: 'Pet card: {name}',
          categoryLabel: 'Category',
          tagsLabel: 'Tags',
          edit: 'Edit',
          delete: 'Delete',
          announceEdit: 'Editing pet {name}',
          announceDelete: 'Deleting pet {name}',
        },
        form: {
          createTitle: 'Add Pet',
          editTitle: 'Edit Pet',
          name: 'Name',
          category: 'Category',
          photoUrl: 'Photo URL',
          status: 'Status',
          save: 'Save',
          cancel: 'Cancel',
          ariaLabel: 'Pet form',
          announceSubmit: 'Pet form submitted',
        },
        filter: {
          label: 'Filter by status',
          refresh: 'Refresh',
          ariaLabel: 'Pet status filter',
          announceRefresh: 'Refreshing pet list',
        },
      },
      orders: {
        card: {
          ariaLabel: 'Order card: #{id}',
          orderId: 'Order',
          petId: 'Pet ID',
          quantity: 'Quantity',
          shipDate: 'Ship Date',
          delete: 'Delete',
          announceDelete: 'Deleting order #{id}',
        },
        form: {
          ariaLabel: 'Place order form',
          petId: 'Pet ID',
          quantity: 'Quantity',
          submit: 'Place Order',
          cancel: 'Cancel',
          announceSubmit: 'Order submitted',
        },
      },
      app: {
        navigation: {
          ariaLabel: 'Petstore application navigation',
          signIn: 'Sign In',
          signOut: 'Sign Out',
          loggedInAs: 'Logged in as {username}',
          announceSignIn: 'Opening sign in form',
          announceSignOut: 'Signing out',
        },
        pets: {
          ariaLabel: 'Pet management',
          addButton: 'Add Pet',
          announceAdd: 'Opening add pet form',
          emptyState: 'No pets found for this status.',
          deleteTitle: 'Delete Pet',
          deleteMessage: 'Are you sure you want to delete {name}?',
        },
        orders: {
          ariaLabel: 'Store orders',
          inventoryTitle: 'Inventory',
          loading: 'Loading...',
          lookupTitle: 'Order Lookup',
          lookupLabel: 'Order ID',
          lookupPlaceholder: 'Enter order ID...',
          lookupButton: 'Search',
          notFound: 'Order not found.',
          placeOrderButton: 'Place Order',
          announcePlaceOrder: 'Opening place order form',
          deleteTitle: 'Delete Order',
          deleteMessage: 'Are you sure you want to delete order #{id}?',
        },
        users: {
          ariaLabel: 'User management',
          createButton: 'Create User',
          announceCreate: 'Opening create user form',
          deleteTitle: 'Delete User',
          deleteMessage: 'Are you sure you want to delete user {username}?',
        },
        shell: {
          loginTitle: 'Sign In',
          loginFailed: 'Login failed. Please check your credentials.',
        },
      },
    },
    visualReport: {
      title: 'Visual Report',
      generatedAt: 'Generated {date} · {count} components',
      filters: {
        ariaLabel: 'Status filters',
        all: 'All',
        passed: 'Passed',
        failed: 'Failed',
        flaky: 'Flaky',
        skipped: 'Skipped',
        unknown: 'Unknown',
      },
      selection: {
        noMatchingComponents: 'No matching components',
        tryDifferentFilter: 'Try a different status filter.',
        shownOf: '{shown} shown of {total} variant(s)',
      },
      modes: {
        ariaLabel: 'Comparison mode',
        diff: 'Diff',
        actual: 'Actual',
        expected: 'Expected',
        sideBySide: 'Side by Side',
        slider: 'Slider',
        slideLeftRight: 'Slide: Left/Right',
        slideUpDown: 'Slide: Up/Down',
        sliderAria: 'Compare expected and actual image',
      },
      messages: {
        missingExpectedActual: 'Missing expected/actual image for this variant.',
        missingDiff: 'Diff image is not available for this variant.',
        missingActual: 'Actual image is not available for this variant.',
        missingExpected: 'Expected image is not available for this variant.',
      },
    },
  },
  vf = {
    components: {
      button: {
        loading: 'Lüødíñg zee böøk: {content} - børk børk!',
        submit: 'Süßmït zee förm, ja! Børk!',
        cancel: 'Çäñçél zee tíñg nøw, børk børk!',
        delete: 'Délétê zee stüff - børk børk børk!',
        save: 'Sävê zee dätä förevér, ja!',
        edit: 'Édït zee cøntént - børk børk!',
        close: 'Çløsé zee wïñdøw, børk børk!',
        back: 'Gø bäçk të zee prëvïøüs, ja!',
        next: 'Gø fürthér tø zee nëxt øñë!',
        previous: 'Zee prëvïøüs øñë, børk børk!',
        ariaLabel: 'Büttön för zee açtïøñ: {content} - børk børk zee çlïçkäßlë!',
        ariaLabelLoading: 'Lüødíñg zee büttön: {content} - børk børk wäït plëäsë!',
        ariaPressed: 'Büttön prëssëd døwñ: {content} - børk børk açtïvätëd!',
        ariaExpanded: 'Büttön ëxpäñdëd øpëñ: {content} - børk børk shøwíñg møré!',
      },
      userCreateForm: {
        title: 'Crëätë Ñëw Üsër-a',
        formLabel: 'Üsër crëätïøñ førm-a',
        fields: {
          username: 'Üsërnämë-a',
          password: 'Påsswørd-a',
          email: 'Émäïl (øptïøñäl)-a',
          firstName: 'Fïrst Nämë (øptïøñäl)-a',
          lastName: 'Läst Nämë (øptïøñäl)-a',
          phone: 'Phøñë (øptïøñäl)-a',
        },
        submit: 'Crëätë Üsër-a',
        loading: 'Crëätïñg üsër...-a',
        success: 'Üsër crëätëd süççëssfûlly!-a',
        errors: {
          usernameRequired: 'Üsërnämë ïs rëqüïrëd-a',
          passwordRequired: 'Påsswørd ïs rëqüïrëd-a',
          emailInvalid: 'Ïñvälïd émâïl ädrëss-a',
          generic: 'Fäïlëd tø crëätë üsër. Plëäsë try ägäïñ.-a',
        },
        announceOnCreate: 'Üsër crëätëd-a',
      },
      input: {
        required: 'Rëqüïrëd fïëld - müst hävë dätä, børk børk!',
        invalid: 'Ïñvälïd ïñpüt - nø güüd, børk børk!',
        placeholder: 'Éñtér zee tëxt hërë... børk børk!',
        ariaLabel: 'Ïñpüt fïëld för zee: {label} - børk børk typë hërë!',
        ariaRequired: 'Rëqüïrëd ïñpüt må st hävë: {label} - børk børk nëëd dätä!',
        ariaInvalid: 'Ïñvälïd ïñpüt nø güüd: {label} - børk børk fïx plëäsë!',
        emailPlaceholder: 'Éñtér zee ëmäïl ädrëss hërë... børk børk!',
        passwordPlaceholder: 'Éñtér zee sëçrët påsswørd... børk børk!',
        searchPlaceholder: 'Sëärçh för zee stüff... børk børk!',
      },
      card: {
        ariaLabel: 'Çärd cøñtäïñër för: {title} - børk børk zee ïñförmatïøñ!',
        ariaLabelContent: 'Çärd wïth zee cøñtént: {content} - børk børk zee dätä!',
        defaultTitle: 'Çärd Çøñtäïñër - børk børk!',
        moreActions: 'Møré äçtïøñs ävä ïläßlë - børk børk zee øptïøñs!',
      },
      navigation: {
        menu: 'Nävïgätïøñ mëñü för zee sïtë - børk børk!',
        mainMenu: 'Mäïñ nävïgätïøñ för zee päges - børk børk mövë äröüñd!',
        skipToMain: 'Skïp tø zee mäïñ cøñtént - børk børk gø dïrëçt!',
        openMenu: 'Øpëñ zee mëñü nøw - børk børk shøw øptïøñs!',
        closeMenu: 'Çløsë zee mëñü nøw - børk børk hïdë øptïøñs!',
      },
      form: {
        submitSuccess: 'Förm süßmïttëd süççëssfülly - børk børk süççëss!',
        submitError: 'Érrør süßmïttïñg zee förm - børk børk sømëthïñg wrøñg!',
        validationError: 'Plëäsë fïx väl ïdätïøñ ërrørs - børk børk nëëd çørrëçt dätä!',
        fieldRequired: 'Thïs fïëld ïs rëqüïrëd - børk børk müst fïll øüt!',
        fieldInvalid: 'Thïs fïëld ïs ïñvälïd - børk børk nøt çørrëçt förmat!',
      },
      loading: {
        default: 'Lüødíñg zee dätä... børk børk wäït plëäsë!',
        content: 'Lüødíñg zee cøñtént nøw... børk børk äl møst rëädy!',
        page: 'Lüødíñg zee påge føryöü... børk børk çømïñg søøñ!',
        ariaLabel: 'Lüødíñg ïñdïçätør äçtïvë - børk børk prøçëssïñg dätä!',
      },
      error: {
        general: 'Äñ ërrør øççürrëd - børk børk sømëthïñg nøt rïght!',
        notFound: 'Çøñtént nøt föüñd - børk børk mïssïñg stüff!',
        network: 'Nëtwørk ërrør øççürrëd - børk børk çøññëçtïøñ prøßlëm!',
        ariaLabel: 'Érrør mëssägë shøwïñg: {message} - børk børk prøßlëm älërt!',
      },
    },
    stories: {
      button: {
        title: 'Büttön Çømpønëñt - børk børk zee çlïçkäßlë!',
        description:
          'Bäsïç büttön çømpønëñt wïth mültïplë värïäñts, sïzës, äñd äççëssïßïlïty fëätürës. Süppørts prïmäry, sëçøñdäry, äñd däñgër çølør sçhëmës - børk børk äll zee øptïøñs!',
        variants: {
          primary: 'Prïmäry Büttön - børk børk zee mäïñ øñë!',
          secondary: 'Sëçøñdäry Büttön - børk børk zee sëçøñd øñë!',
          danger: 'Däñgër Büttön - børk børk zee wärñïñg øñë!',
        },
        sizes: {
          small: 'Smäll Büttön - børk børk zee tïñy øñë!',
          medium: 'Mëdïüm Büttön - børk børk zee nørmal sïzë!',
          large: 'Lärgë Büttön - børk børk zee ßïg øñë!',
        },
        states: {
          default: 'Dëfäült Büttön - børk børk zee nørmal stätë!',
          disabled: 'Dïsäßlëd Büttön - børk børk çäññøt üsë nøw!',
          loading: 'Lüødíñg Büttön - børk børk wäïtïñg før äçtïøñ!',
          fullWidth: 'Füll Wïdth Büttön - børk børk äll zee wäy äçrøss!',
        },
        examples: {
          clickMe: 'Çlïçk mé nøw - børk børk!',
          submitForm: 'Süßmït zee Förm - børk børk sëñd dätä!',
          deleteAccount: 'Délétê zee Äççøüñt - børk børk rëmøvë förëvër!',
          saveChanges: 'Sävê zee Çhäñgës - børk børk këëp üpdätës!',
          cancelOrder: 'Çäñçél zee Ørdër - børk børk støp træñsäçtïøñ!',
        },
        accessibility: {
          title: 'Äççëssïßïlïty Fëätürës - børk børk äll çäñ üsë!',
          description:
            'Dëmøñsträtës büttön äççëssïßïlïty fëätürës ïñçlüdïñg ÄRÏÄ läßëls, føçüs mäñägëmëñt, äñd kë yßøärd nävïgätïøñ - børk børk äll üsërs wëlçømë!',
        },
        allVariants: {
          title: 'Äll Värïäñts Shøwñ - børk børk çømpärë äll!',
          description:
            'Shøws äll büttön värïäñts ïñ ä sïñglë vïëw før çømpärïsøñ - børk børk sëë äll øptïøñs tøgëthër!',
        },
      },
      input: {
        title: 'Ïñpüt Çømpønëñt - børk børk zee typïñg fïëld!',
        description:
          'Förm ïñpüt çømpønëñt wïth väl ïdätïøñ, äççëssïßïlïty fëätürës, äñd mültïplë typës - børk børk äll data ïñpüts!',
        variants: {
          text: 'Têxt Ïñpüt - børk børk zee wørds!',
          email: 'Émäïl Ïñpüt - børk børk zee ädrëss!',
          password: 'Påsswørd Ïñpüt - børk børk zee sëçrët!',
          search: 'Sëärçh Ïñpüt - børk børk zee fïñdïñg!',
        },
        states: {
          default: 'Dëfäült Ïñpüt - børk børk zee nørmal stätë!',
          required: 'Rëqüïrëd Ïñpüt - børk børk müst fïll øüt!',
          invalid: 'Ïñvälïd Ïñpüt - børk børk çhëçk zee dätä!',
          disabled: 'Dïsäßlëd Ïñpüt - børk børk çäññøt typë nøw!',
        },
        examples: {
          firstName: 'Fïrst Nämë - børk børk zee gïvëñ nämë!',
          lastName: 'Läst Nämë - børk børk zee fämïly nämë!',
          email: 'Émäïl Ädrëss - børk børk zee mäïl løçätïøñ!',
          password: 'Påsswørd - børk børk zee sëçrët çødë!',
        },
      },
      card: {
        title: 'Çärd Çømpønëñt - børk børk zee ïñförmatïøñ böx!',
        description:
          'Flëxïßlë çärd çømpønëñt för dïsplayïñg cøñtént wïth øptïøñal hëädërs, føøtërs, äñd äçtïøñs - børk børk äll zee ïñfø!',
        variants: {
          basic: 'Bäsïç Çärd - børk børk zee sï mplë øñë!',
          withHeader: 'Çärd wïth Hëädër - børk børk hä s tøp pärt!',
          withFooter: 'Çärd wïth Føøtër - børk børk häs ßøttøm pärt!',
          interactive: 'Ïñtëräçtïvë Çärd - børk børk çäñ çlïçk äñd üsë!',
        },
        examples: {
          title: 'Éxämplë Çärd Tïtlë - børk børk!',
          content:
            'Thïs ïs äñ éxämplë çärd wïth sømë cøñtént tø dëmøñsträtë thee çømpønëñt füñçtïøñälïty - børk børk äll zee ïñförmatïøñ shøwñ hërë!',
          headerTitle: 'Çärd Hëädër Tï tlë - børk børk zee tøp!',
          footerText: 'Çärd Føøtër Têxt - børk børk zee ßøttøm pärt!',
        },
      },
      general: {
        examples: 'Éxämplës Shøwñ - børk børk zee dë møs!',
        variants: 'Värïäñts Ävä ïläßlë - børk børk äll zee typës!',
        states: 'Stätës Dïsplayd - børk børk äll zee çøñdïtïøñs!',
        accessibility: 'Äççëssïßïlïty - børk børk äll üsërs wëlçømë!',
        documentation: 'Døçümëñtätïøñ - børk børk zee ïñstrüçtïøñs!',
        playground: 'Playg røüñd - børk børk zee ëxpërïmëñt äreä!',
      },
    },
    accessibility: {
      announcements: {
        localeChanged: 'Läñgüägë çhäñgëd tø zee {locale} - børk børk ñëw wørds!',
        pageLoaded: 'Påge løädëd çømpletëly - børk børk rëädy tø üsë!',
        contentUpdated: 'Çøñtént üpdätëd süççëssfülly - børk børk ñëw ïñförmatïøñ!',
        formSubmitted: 'Förm süßmïttëd süççëss fülly - børk børk dätä sëñt!',
        errorOccurred: 'Érrør øççürrëd wïth prøßlëm: {error} - børk børk sømëthïñg wrøñg!',
      },
      instructions: {
        keyboard: 'Üsë Taß kéy tø nävïgä të ßëtwëëñ äll zee ëlëmëñts - børk børk mövë äröüñd!',
        buttonActivation:
          'Prëss Éñtër ør Spä çë kéy tø äçtïvä të zee büttön - børk børk mäkë ït wørk!',
        menuNavigation: 'Üsë ärrøw kéys tø nävïgä të zee mëñü ïtëms - børk børk mø vë üp äñd døwñ!',
        formNavigation: 'Üsë Taß kéy tø møvë ßëtwëëñ zee förm fïëlds - børk børk gø tø ñëxt ïñpüt!',
      },
      labels: {
        required: 'Rëqüïrëd - børk børk müst hävë!',
        optional: 'Øptïøñal - børk børk çäñ skïp!',
        invalid: 'Ïñvälïd - børk børk nøt çørrëçt!',
        loading: 'Lüødíñg - børk børk wäït plëäsë!',
        expanded: 'Éxpäñdëd - børk børk øpëñ ñøw!',
        collapsed: 'Çøl läpsëd - børk børk çløsëd ñøw!',
      },
    },
    petstore: {
      common: {
        close: 'Çløøsë-a',
        selectLabel: 'Sëlëct-a øptïøñ',
        status: {
          available: 'Aväïläblë-a',
          pending: 'Pëñdïñg-a',
          sold: 'Søld-a',
          placed: 'Pläcëd-a',
          approved: 'Äpprøved-a',
          delivered: 'Dëlïvërëd-a',
          info: 'Ïñfø-a',
          default: 'Stätüs-a',
        },
        confirm: {
          defaultTitle: 'Ärë yøü sürë?-a',
          confirm: 'Cøñfïrm-a',
          cancel: 'Cäñcël-a',
          announceConfirmed: 'Äctïøñ cøñfïrmëd-a',
          announceCancelled: 'Äctïøñ cäñcëllëd-a',
        },
      },
      navigation: {
        tabsAriaLabel: 'Pëtstørë-a sëctïøñs',
        pets: 'Pëts-a',
        orders: 'Ørdërs-a',
        users: 'Üsërs-a',
      },
      tabs: { activeLabel: 'Äctïvë täb-a' },
      select: {
        statusLabel: 'Stätüs-a',
        petTypeLabel: 'Pët typë-a',
        petTypes: { dog: 'Døg-a', cat: 'Cät-a', bird: 'Bïrd-a', fish: 'Fïsh-a' },
      },
      modal: {
        defaultTitle: 'Mødäl-a',
        openButton: 'Øpën mødäl-a',
        content: 'Mødäl cøñtënt göës hërë-a.',
        editPetTitle: 'Édït Pët-a',
        smallTitle: 'Smäll mødäl-a',
        mediumTitle: 'Mëdïüm mødäl-a',
        largeTitle: 'Lärgë mødäl-a',
        reopenButton: 'Rë-øpën mødäl-a',
        focusTrapTitle: 'Føçüs träp dëmø-a',
        firstInputPlaceholder: 'Fïrst ïñpüt-a',
        secondInputPlaceholder: 'Sëcøñd ïñpüt-a',
        doneButton: 'Døñë-a',
      },
      table: {
        ariaLabel: 'Dätä täblë-a',
        emptyState: 'Nø dätä äväïläblë-a',
        emptyInventory: 'Nø ïñvëntøry føüñd-a',
        headers: { status: 'Stätüs-a', count: 'Cøüñt-a', id: 'ÏD-a', petId: 'Pët ÏD-a' },
      },
      users: {
        title: 'Üsër Mänägëmëñt-a',
        lookup: {
          label: 'Løøküp Üsër-a',
          placeholder: 'Ëñtër üsërnämë-a...',
          button: 'Sëärçh-a',
          notFound: 'Üsër nøt føüñd-a',
          ariaLabel: 'Üsër løøküp førm-a',
        },
        form: {
          createTitle: 'Crëätë Üsër-a',
          editTitle: 'Édït Üsër-a',
          username: 'Üsërnämë-a',
          firstName: 'Fïrst Nämë-a',
          lastName: 'Läst Nämë-a',
          email: 'Émäïl-a',
          password: 'Påsswørd-a',
          phone: 'Phøñë-a',
          save: 'Sävë-a',
          cancel: 'Cäñcël-a',
          ariaLabel: 'Üsër førm-a',
          announceSubmit: 'Üsër førm süßmïttëd-a',
        },
        card: {
          ariaLabel: 'Üsër cärd: {username}-a',
          emailLabel: 'Émäïl-a',
          phoneLabel: 'Phøñë-a',
          edit: 'Édït-a',
          delete: 'Dëlëtë-a',
          announceEdit: 'Édïtïng üsër {username}-a',
          announceDelete: 'Dëlëtïng üsër {username}-a',
        },
      },
      auth: {
        form: {
          ariaLabel: 'Sïgñ ïñ førm-a',
          username: 'Üsërnämë-a',
          usernamePlaceholder: 'Éntër üsërnämë...-a',
          password: 'Påsswørd-a',
          passwordPlaceholder: 'Éntër påsswørd...-a',
          submit: 'Sïgñ Ïñ-a',
          announceSubmit: 'Sïgnïng ïñ...-a',
        },
      },
      pets: {
        card: {
          ariaLabel: 'Pët cärd: {name}-a',
          categoryLabel: 'Cätëgøry-a',
          tagsLabel: 'Tägs-a',
          edit: 'Édït-a',
          delete: 'Dëlëtë-a',
          announceEdit: 'Édïtïng pët {name}-a',
          announceDelete: 'Dëlëtïng pët {name}-a',
        },
        form: {
          createTitle: 'Ädd Pët-a',
          editTitle: 'Édït Pët-a',
          name: 'Nämë-a',
          category: 'Cätëgøry-a',
          photoUrl: 'Phøtø URL-a',
          status: 'Stätüs-a',
          save: 'Sävë-a',
          cancel: 'Cäñcël-a',
          ariaLabel: 'Pët førm-a',
          announceSubmit: 'Pët førm süßmïttëd-a',
        },
        filter: {
          label: 'Fïltër by stätüs-a',
          refresh: 'Rëfrësh-a',
          ariaLabel: 'Pët stätüs fïltër-a',
          announceRefresh: 'Rëfrëshïng pët lïst-a',
        },
      },
      orders: {
        card: {
          ariaLabel: 'Ørdër cärd: #{id}-a',
          orderId: 'Ørdër-a',
          petId: 'Pët ÏD-a',
          quantity: 'Qüäntïty-a',
          shipDate: 'Shïp Dätë-a',
          delete: 'Dëlëtë-a',
          announceDelete: 'Dëlëtïng ørdër #{id}-a',
        },
        form: {
          ariaLabel: 'Plåcë ørdër førm-a',
          petId: 'Pët ÏD-a',
          quantity: 'Qüäntïty-a',
          submit: 'Plåcë Ørdër-a',
          cancel: 'Cäñcël-a',
          announceSubmit: 'Ørdër süßmïttëd-a',
        },
      },
      app: {
        navigation: {
          ariaLabel: 'Pëtstørë äpplïcätïøñ nävïgätïøñ-a',
          signIn: 'Sïgñ Ïñ-a',
          signOut: 'Sïgñ Øüt-a',
          loggedInAs: 'Løggëd ïñ äs {username}-a',
          announceSignIn: 'Øpëñïñg sïgñ ïñ førm-a',
          announceSignOut: 'Sïgñïñg øüt-a',
        },
        pets: {
          ariaLabel: 'Pët mänägëmëñt-a',
          addButton: 'Ädd Pët-a',
          announceAdd: 'Øpëñïñg ädd pët førm-a',
          emptyState: 'Nø pëts føüñd før thïs stätüs-a.',
          deleteTitle: 'Dëlëtë Pët-a',
          deleteMessage: 'Ärë yøü sürë yøü wäñt tø dëlëtë {name}?-a',
        },
        orders: {
          ariaLabel: 'Størë ørdërs-a',
          inventoryTitle: 'Ïñvëñtøry-a',
          loading: 'Løädïñg...-a',
          lookupTitle: 'Ørdër Løøküp-a',
          lookupLabel: 'Ørdër ÏD-a',
          lookupPlaceholder: 'Ëñtër ørdër ÏD...-a',
          lookupButton: 'Sëärçh-a',
          notFound: 'Ørdër nøt føüñd-a.',
          placeOrderButton: 'Pläcë Ørdër-a',
          announcePlaceOrder: 'Øpëñïñg pläcë ørdër førm-a',
          deleteTitle: 'Dëlëtë Ørdër-a',
          deleteMessage: 'Ärë yøü sürë yøü wäñt tø dëlëtë ørdër #{id}?-a',
        },
        users: {
          ariaLabel: 'Üsër mänägëmëñt-a',
          createButton: 'Crëätë Üsër-a',
          announceCreate: 'Øpëñïñg crëätë üsër førm-a',
          deleteTitle: 'Dëlëtë Üsër-a',
          deleteMessage: 'Ärë yøü sürë yøü wäñt tø dëlëtë üsër {username}?-a',
        },
        shell: {
          loginTitle: 'Sïgñ Ïñ-a',
          loginFailed: 'Løgïñ fäïlëd. Plëäsë chëck yøür crëdëñtïäls.-a',
        },
      },
    },
    visualReport: {
      title: 'Vïsüäl Rëpørt-a',
      generatedAt: 'Gënërätëd {date} · {count} cømpønëñts-a',
      filters: {
        ariaLabel: 'Stätüs fïltërs-a',
        all: 'Äll-a',
        passed: 'Pässëd-a',
        failed: 'Fäïlëd-a',
        flaky: 'Fläky-a',
        skipped: 'Skïppëd-a',
        unknown: 'Üñkñøwñ-a',
      },
      selection: {
        noMatchingComponents: 'Nø mätchïñg cømpønëñts-a',
        tryDifferentFilter: 'Try ä dïffërëñt stätüs fïltër-a.',
        shownOf: '{shown} shøwñ øf {total} värïäñt(s)-a',
      },
      modes: {
        ariaLabel: 'Cømpärïsøñ mødë-a',
        diff: 'Dïff-a',
        actual: 'Äctüäl-a',
        expected: 'Éxpëctëd-a',
        sideBySide: 'Sïdë by Sïdë-a',
        slider: 'Slïdër-a',
        slideLeftRight: 'Slïdë: Lëft/Rïght-a',
        slideUpDown: 'Slïdë: Üp/Døwñ-a',
        sliderAria: 'Cømpärë ëxpëctëd äñd äctüäl ïmägë-a',
      },
      messages: {
        missingExpectedActual: 'Mïssïñg ëxpëctëd/äctüäl ïmägë før thïs värïäñt-a.',
        missingDiff: 'Dïff ïmägë ïs nøt äväïläblë før thïs värïäñt-a.',
        missingActual: 'Äctüäl ïmägë ïs nøt äväïläblë før thïs värïäñt-a.',
        missingExpected: 'Éxpëctëd ïmägë ïs nøt äväïläblë før thïs värïäñt-a.',
      },
    },
  },
  yf = new Proxy(
    {},
    {
      get: (c, f) => {
        if (typeof f == 'string') {
          const s = f,
            w = (C) => (C && Object.keys(C).length > 0 ? `${s} ${JSON.stringify(C)}` : s);
          return ((w.toString = () => s), w);
        }
      },
    },
  ),
  Vi = { en: gf, chef: vf, debug: yf },
  ba = 'en',
  kf = [];
function wf(c, f) {
  if (!f || Object.keys(f).length === 0) return c;
  const s = Object.entries(f)
    .map(([w, C]) => `${w}=${String(C)}`)
    .join(', ');
  return `${c} [${s}]`;
}
function Za(c, f, s) {
  if (c === Vi.debug) return wf(f, s);
  try {
    const w = f.split('.');
    let C = c;
    for (const M of w)
      if (C && typeof C == 'object' && C !== null && Object.prototype.hasOwnProperty.call(C, M))
        C = C[M];
      else return (console.warn(`Translation key "${f}" not found in locale`), f);
    return typeof C == 'string'
      ? s
        ? Sf(C, s)
        : C
      : (console.warn(`Translation key "${f}" does not point to a string value`), f);
  } catch (w) {
    return (console.error(`Error retrieving translation for key "${f}":`, w), f);
  }
}
function Sf(c, f) {
  return c.replace(/\{(\w+)\}/g, (s, w) => {
    const C = f[w];
    return C !== void 0
      ? String(C)
      : (console.warn(`Parameter "${w}" not found for interpolation in: ${c}`), s);
  });
}
function xf(c) {
  return c in Vi;
}
function Ja(c) {
  return Vi[c];
}
function Cf(c) {
  return kf.includes(c);
}
const ec = q.createContext(null),
  tc = 'petstore-ui-locale';
function Ef() {
  const c = q.useContext(ec);
  if (!c) throw new Error('useLocaleContext must be used within a LocaleProvider');
  return c;
}
function jn() {
  const { t: c, locale: f, setLocale: s, isRTL: w } = Ef();
  return { t: q.useCallback((M, D) => c(M, D), [c]), locale: f, setLocale: s, isRTL: w };
}
function Pf() {
  if (typeof window > 'u') return ba;
  try {
    const c = localStorage.getItem(tc);
    if (c && xf(c)) return c;
  } catch (c) {
    console.warn('Failed to read locale from localStorage:', c);
  }
  return ba;
}
function Lf(c) {
  if (!(typeof window > 'u'))
    try {
      localStorage.setItem(tc, c);
    } catch (f) {
      console.warn('Failed to store locale in localStorage:', f);
    }
}
function zf(c) {
  if (!(typeof window > 'u' || !('speechSynthesis' in window)))
    try {
      const f = document.createElement('div');
      (f.setAttribute('aria-live', 'polite'),
        f.setAttribute('aria-atomic', 'true'),
        (f.style.position = 'absolute'),
        (f.style.left = '-10000px'),
        (f.style.width = '1px'),
        (f.style.height = '1px'),
        (f.style.overflow = 'hidden'));
      const s = Ja(c),
        w = Za(s, 'accessibility.announcements.localeChanged', { locale: c });
      ((f.textContent = w),
        document.body.appendChild(f),
        setTimeout(() => {
          f.parentNode && f.parentNode.removeChild(f);
        }, 1e3));
    } catch (f) {
      console.warn('Failed to announce locale change:', f);
    }
}
const _f = ({ locale: c, children: f }) => {
  const [s, w] = q.useState(() => c || Pf());
  q.useEffect(() => {
    c && c !== s && w(c);
  }, [c, s]);
  const C = q.useCallback(
      (j) => {
        j !== s && (w(j), Lf(j), zf(j));
      },
      [s],
    ),
    M = q.useCallback(
      (j, Q) => {
        const X = Ja(s);
        return Za(X, j, Q);
      },
      [s],
    ),
    D = q.useMemo(() => Cf(s), [s]),
    H = q.useMemo(() => ({ locale: s, setLocale: C, t: M, isRTL: D }), [s, C, M, D]);
  return (
    q.useEffect(() => {
      typeof document < 'u' &&
        ((document.documentElement.dir = D ? 'rtl' : 'ltr'),
        (document.documentElement.lang = s === 'chef' ? 'en' : s));
    }, [D, s]),
    E.jsx(ec.Provider, { value: H, children: f })
  );
};
Xa();
const nc = ['failed', 'flaky', 'unknown', 'skipped', 'passed'],
  rc = ['all', 'passed', 'failed', 'flaky', 'skipped', 'unknown'],
  Tf = { all: '📋', passed: '✅', failed: '❌', flaky: '⚠️', skipped: '⏭️', unknown: '❔' },
  lc = { passed: '✅', failed: '❌', flaky: '⚠️', skipped: '⏭️', unknown: '❔' },
  Ka = [
    { value: 'diff', labelKey: 'visualReport.modes.diff' },
    { value: 'actual', labelKey: 'visualReport.modes.actual' },
    { value: 'expected', labelKey: 'visualReport.modes.expected' },
    { value: 'side-by-side', labelKey: 'visualReport.modes.sideBySide' },
    { value: 'slider', labelKey: 'visualReport.modes.slider' },
  ],
  Yt = 'slider',
  Rf = (c) => `${c.namespace}::${c.atomicLevel}::${c.component}`,
  Nf = (c) => {
    const f = new Map();
    for (const s of c) {
      const w = Rf(s),
        C = f.get(w);
      if (C) {
        C.stories.push(s);
        continue;
      }
      f.set(w, {
        key: w,
        namespace: s.namespace,
        atomicLevel: s.atomicLevel,
        component: s.component,
        stories: [s],
      });
    }
    return [...f.values()].sort((s, w) => s.component.localeCompare(w.component));
  },
  Df = (c) => ({ ...c, componentGroups: Nf(c.components ?? []) }),
  Ol = (c) => c ?? 'unknown',
  If = () => ({ passed: 0, failed: 0, flaky: 0, skipped: 0, unknown: 0 }),
  xr = (c) => {
    const f = If();
    for (const s of c) {
      const w = Ol(s.status);
      f[w] += 1;
    }
    return f;
  },
  Ya = (c, f) => ({
    passed: c.passed + f.passed,
    failed: c.failed + f.failed,
    flaky: c.flaky + f.flaky,
    skipped: c.skipped + f.skipped,
    unknown: c.unknown + f.unknown,
  }),
  Oi = (c) =>
    nc
      .filter((f) => c[f] > 0)
      .map((f) => `${f} ${c[f]}`)
      .join(', '),
  Fl = (c, f) => (f.size === 0 ? !0 : f.has(Ol(c.status))),
  Mf = (c, f) => {
    if (c === 'all') return new Set();
    const s = new Set(f);
    return s.has(c) ? (s.delete(c), s) : (s.add(c), s);
  },
  Ui = (c, f) => c.stories.flatMap((s) => s.variants.filter((w) => Fl(w, f))),
  jf = (c) => c.flatMap((f) => f.stories.flatMap((s) => s.variants)),
  Ff = (c) => {
    const f = jf(c),
      s = new Map(rc.map((w) => [w, 0]));
    s.set('all', f.length);
    for (const w of f) {
      const C = Ol(w.status);
      s.set(C, (s.get(C) ?? 0) + 1);
    }
    return s;
  },
  Of = (c, f) => c.filter((s) => s.stories.some((w) => w.variants.some((C) => Fl(C, f)))),
  Uf = (c, f) => {
    var s;
    return f.length
      ? c && f.some((w) => w.key === c)
        ? c
        : (((s = f[0]) == null ? void 0 : s.key) ?? null)
      : null;
  },
  Af = (c) => {
    const f = new Map();
    for (const s of c) {
      const w = f.get(s.namespace) ?? new Map(),
        C = w.get(s.atomicLevel) ?? [];
      (C.push(s), w.set(s.atomicLevel, C), f.set(s.namespace, w));
    }
    return [...f.entries()]
      .sort((s, w) => s[0].localeCompare(w[0]))
      .map(([s, w]) => ({
        namespace: s,
        levels: [...w.entries()]
          .sort((C, M) => C[0].localeCompare(M[0]))
          .map(([C, M]) => ({
            level: C,
            groups: [...M].sort((D, H) => D.component.localeCompare(H.component)),
          })),
      }));
  },
  Bf = (c, f) => c.get(f) ?? Yt,
  oc = (c, f) => (f.includes(c) ? c : f.includes(Yt) ? Yt : (f[0] ?? Yt)),
  ic = {
    failed: {
      border: 'var(--color-danger)',
      text: 'var(--color-danger-soft)',
      bg: 'var(--color-surface-2)',
    },
    flaky: {
      border: 'var(--color-warning)',
      text: 'var(--color-warning-soft)',
      bg: 'var(--color-surface-2)',
    },
    passed: {
      border: 'var(--color-success)',
      text: 'var(--color-success-soft)',
      bg: 'var(--color-surface-2)',
    },
    skipped: {
      border: 'var(--color-border-strong)',
      text: 'var(--color-text-soft)',
      bg: 'var(--color-surface-2)',
    },
    unknown: {
      border: 'var(--color-border-strong)',
      text: 'var(--color-text-soft)',
      bg: 'var(--color-surface-2)',
    },
  },
  jl = {
    root: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      minHeight: '100vh',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      fontFamily: W.typography.fontFamily.sans.join(', '),
    },
    sidebar: {
      borderRight: '1px solid var(--color-border)',
      padding: W.spacing[4],
      background: 'var(--color-sidebar)',
      overflowY: 'auto',
      minHeight: 0,
    },
    content: {
      padding: W.spacing[4],
      overflowY: 'auto',
      minHeight: 0,
      background: 'var(--color-main)',
    },
    toolbar: {
      position: 'sticky',
      top: 0,
      zIndex: Number(W.zIndex[20]),
      background: 'var(--color-header)',
      paddingBottom: W.spacing[3],
      borderBottom: '1px solid var(--color-border)',
      boxShadow: '0 6px 10px var(--color-shadow)',
    },
  },
  $f = ({ filter: c, label: f, count: s, active: w, onClick: C }) => {
    const M = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: W.spacing[2],
        border: 'none',
        borderRight: '1px solid var(--color-border-strong)',
        background: w ? 'var(--color-primary)' : 'var(--color-surface)',
        color: 'var(--color-text)',
        padding: `${W.spacing[2.5]} ${W.spacing[3.5]}`,
        cursor: 'pointer',
        fontSize: W.typography.fontSize.sm,
      },
      D = {
        minWidth: '22px',
        textAlign: 'center',
        fontSize: W.typography.fontSize.xs,
        borderRadius: '999px',
        padding: '2px 8px',
        background: w ? 'var(--color-primary-strong)' : 'var(--color-count-bg)',
        color: 'var(--color-text)',
      };
    return E.jsxs('button', {
      type: 'button',
      style: M,
      'aria-pressed': w,
      onClick: () => C(c),
      children: [
        E.jsx('span', { 'aria-hidden': !0, children: Tf[c] }),
        E.jsx('span', { children: f }),
        E.jsx('span', { style: D, children: s }),
      ],
    });
  },
  Vf = ({ counts: c, selectedStatusFilters: f, onToggle: s }) => {
    const { t: w } = jn(),
      C = {
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--color-border-strong)',
        borderRadius: W.borderRadius.xl,
        overflow: 'hidden',
      },
      M = (D) => (D === 'all' ? f.size === 0 : f.has(D));
    return E.jsx('div', {
      style: C,
      'aria-label': w('visualReport.filters.ariaLabel'),
      children: rc.map((D) =>
        E.jsx(
          $f,
          {
            filter: D,
            label: w(`visualReport.filters.${D}`),
            count: c.get(D) ?? 0,
            active: M(D),
            onClick: s,
          },
          D,
        ),
      ),
    });
  },
  uc = 'visual-report-theme';
function Hf() {
  const c = localStorage.getItem(uc);
  return c === 'light' || c === 'dark' ? c : 'dark';
}
function Ga(c) {
  (document.documentElement.setAttribute('data-theme', c), localStorage.setItem(uc, c));
}
const Wf = () => {
    const [c, f] = q.useState('dark'),
      [s, w] = q.useState(!1);
    q.useEffect(() => {
      const D = Hf();
      (f(D), Ga(D), w(!0));
    }, []);
    const C = () => {
        const D = c === 'dark' ? 'light' : 'dark';
        (f(D), Ga(D));
      },
      M = {
        background: 'var(--color-toggle-bg)',
        color: 'var(--color-toggle-icon)',
        border: '1px solid var(--color-border-strong)',
        borderRadius: '999px',
        fontSize: '1rem',
        padding: '6px 10px',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
      };
    return s
      ? E.jsx('button', {
          id: 'theme-toggle',
          onClick: C,
          'aria-label': c === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
          title: c === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
          style: M,
          children: c === 'dark' ? '☀️' : '🌙',
        })
      : null;
  },
  Qf = ({ status: c, count: f }) => {
    if (!f) return null;
    const s = ic[c],
      w = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        borderRadius: '999px',
        border: `1px solid ${s.border}`,
        background: s.bg,
        color: s.text,
        fontSize: '0.68rem',
        lineHeight: 1,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
      };
    return E.jsxs('span', { style: w, 'aria-label': `${c} ${f}`, children: [lc[c], ' ', f] });
  },
  Ai = ({ text: c, counts: f }) => {
    const s = { display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: 0 },
      w = { display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' };
    return E.jsxs('span', {
      style: s,
      children: [
        E.jsx('span', { style: { minWidth: 0 }, children: c }),
        E.jsx('span', {
          style: w,
          children: nc.map((C) => E.jsx(Qf, { status: C, count: f[C] }, C)),
        }),
      ],
    });
  },
  bf = ({ groups: c, selectedKey: f, selectedStatusFilters: s, onSelect: w }) => {
    const C = q.useMemo(() => Af(c), [c]),
      M = { marginTop: W.spacing[3.5], display: 'grid', gap: W.spacing[2.5] },
      D = {
        border: '1px solid var(--color-border)',
        borderRadius: W.borderRadius.lg,
        padding: W.spacing[2],
        background: 'var(--color-surface)',
      },
      H = { marginTop: W.spacing[2], display: 'grid', gap: W.spacing[1.5] },
      j = {
        textAlign: 'left',
        width: '100%',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        borderRadius: W.borderRadius.md,
        padding: '6px 8px',
        cursor: 'pointer',
      };
    return E.jsx('div', {
      style: M,
      'aria-label': 'Component hierarchy',
      children: C.map((Q) => {
        let X = xr([]);
        for (const b of Q.levels) for (const ae of b.groups) X = Ya(X, xr(Ui(ae, s)));
        const O = Oi(X);
        return E.jsxs(
          'details',
          {
            open: !0,
            style: D,
            children: [
              E.jsx('summary', {
                'aria-label': O ? `${Q.namespace}. ${O}` : Q.namespace,
                children: E.jsx(Ai, { text: Q.namespace, counts: X }),
              }),
              Q.levels.map((b) => {
                let ae = xr([]);
                for (const R of b.groups) ae = Ya(ae, xr(Ui(R, s)));
                const F = `${b.level} (${b.groups.length})`,
                  $ = Oi(ae);
                return E.jsxs(
                  'details',
                  {
                    open: !0,
                    style: D,
                    children: [
                      E.jsx('summary', {
                        'aria-label': $ ? `${F}. ${$}` : F,
                        children: E.jsx(Ai, { text: F, counts: ae }),
                      }),
                      E.jsx('div', {
                        style: H,
                        children: b.groups.map((R) => {
                          const ne = Ui(R, s),
                            ve = ne.length,
                            re = xr(ne),
                            fe = `${R.component} (${ve})`,
                            Ce = Oi(re);
                          return E.jsx(
                            'button',
                            {
                              type: 'button',
                              style: {
                                ...j,
                                borderColor:
                                  f === R.key
                                    ? 'var(--color-primary)'
                                    : 'var(--color-border-strong)',
                                background:
                                  f === R.key
                                    ? 'var(--color-primary-soft)'
                                    : 'var(--color-surface)',
                              },
                              'aria-label': Ce ? `${fe}. ${Ce}` : fe,
                              onClick: () => w(R.key),
                              children: E.jsx(Ai, { text: fe, counts: re }),
                            },
                            R.key,
                          );
                        }),
                      }),
                    ],
                  },
                  `${Q.namespace}-${b.level}`,
                );
              }),
            ],
          },
          Q.namespace,
        );
      }),
    });
  },
  Kf = ({ status: c }) => {
    const f = Ol(c),
      s = ic[f],
      w = {
        borderRadius: '999px',
        fontSize: '0.75rem',
        padding: '2px 8px',
        border: `1px solid ${s.border}`,
        color: s.text,
        background: s.bg,
        whiteSpace: 'nowrap',
      };
    return E.jsxs('span', { style: w, 'aria-label': `Status: ${f}`, children: [lc[f], ' ', f] });
  },
  Bi = (c, f) => {
    if (!c) return null;
    if (!f) return c;
    const s = c.includes('?') ? '&' : '?';
    return `${c}${s}v=${encodeURIComponent(f)}`;
  },
  Cr = ({ imageUrl: c, altText: f, missingKey: s }) => {
    const { t: w } = jn(),
      C = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--color-border)',
        borderRadius: W.borderRadius.lg,
        overflow: 'hidden',
        background: 'var(--color-main)',
        padding: W.spacing[3],
        minHeight: '120px',
      },
      M = {
        color: 'var(--color-text-muted)',
        border: '1px dashed var(--color-border-strong)',
        borderRadius: W.borderRadius.lg,
        padding: W.spacing[3],
      };
    return c
      ? E.jsx('div', {
          style: C,
          children: E.jsx('img', {
            src: c,
            alt: f,
            draggable: !1,
            style: { maxWidth: '100%', height: 'auto' },
          }),
        })
      : E.jsx('div', { style: C, children: E.jsx('div', { style: M, children: w(s) }) });
  },
  Yf = ({ expectedUrl: c, actualUrl: f, altBase: s }) => {
    const { t: w } = jn(),
      C = q.useRef(null),
      M = q.useId(),
      [D, H] = q.useState(50),
      [j, Q] = q.useState('horizontal');
    q.useEffect(() => {
      H(50);
    }, [j, c, f]);
    const X = {
      color: 'var(--color-text-muted)',
      border: '1px dashed var(--color-border-strong)',
      borderRadius: W.borderRadius.lg,
      padding: W.spacing[3],
    };
    if (!c || !f)
      return E.jsx('div', {
        style: {
          border: '1px solid var(--color-border)',
          borderRadius: W.borderRadius.lg,
          padding: W.spacing[3],
        },
        children: E.jsx('div', {
          style: X,
          children: w('visualReport.messages.missingExpectedActual'),
        }),
      });
    const O = `${D}%`,
      b = j === 'vertical' ? `inset(0 0 ${100 - D}% 0)` : `inset(0 ${100 - D}% 0 0)`,
      ae = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid var(--color-border)',
        borderRadius: W.borderRadius.lg,
        overflow: 'hidden',
        background: 'var(--color-main)',
        padding: W.spacing[3],
        width: '100%',
      },
      F = {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minHeight: '200px',
        overflow: 'hidden',
      },
      $ = {
        display: 'block',
        width: '100%',
        height: 'auto',
        userSelect: 'none',
        pointerEvents: 'none',
      },
      R = { position: 'absolute', inset: 0, clipPath: b },
      ne =
        j === 'vertical'
          ? {
              position: 'absolute',
              left: 0,
              right: 0,
              top: O,
              height: '2px',
              background: 'var(--color-slider-track)',
            }
          : {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: O,
              width: '2px',
              background: 'var(--color-slider-track)',
            },
      ve = (re, fe) => {
        const Ce = C.current;
        if (!Ce) return;
        const ie = Ce.getBoundingClientRect();
        if (!ie.width || !ie.height) return;
        const Ne = Math.round(
          j === 'vertical'
            ? (Math.min(Math.max(fe - ie.top, 0), ie.height) / ie.height) * 100
            : (Math.min(Math.max(re - ie.left, 0), ie.width) / ie.width) * 100,
        );
        H(Ne);
      };
    return E.jsxs('div', {
      style: ae,
      children: [
        E.jsxs('div', {
          ref: C,
          style: F,
          onPointerDown: (re) => ve(re.clientX, re.clientY),
          onPointerMove: (re) => {
            re.buttons === 1 && ve(re.clientX, re.clientY);
          },
          children: [
            E.jsx('img', { src: c, alt: `${s} expected`, draggable: !1, style: $ }),
            E.jsx('div', {
              style: R,
              children: E.jsx('img', { src: f, alt: `${s} actual`, draggable: !1, style: $ }),
            }),
            E.jsx('div', { style: ne }),
          ],
        }),
        E.jsxs('div', {
          style: {
            marginTop: W.spacing[2],
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: W.spacing[2],
          },
          children: [
            E.jsx('label', {
              htmlFor: M,
              style: { color: 'var(--color-text-muted)', fontSize: W.typography.fontSize.xs },
              children: w('visualReport.modes.slider'),
            }),
            E.jsx('button', {
              type: 'button',
              style: {
                border: '1px solid var(--color-border-strong)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                borderRadius: W.borderRadius.md,
                padding: '4px 8px',
                cursor: 'pointer',
              },
              onClick: () => Q((re) => (re === 'horizontal' ? 'vertical' : 'horizontal')),
              children: w(
                j === 'vertical'
                  ? 'visualReport.modes.slideUpDown'
                  : 'visualReport.modes.slideLeftRight',
              ),
            }),
          ],
        }),
        E.jsx('input', {
          id: M,
          type: 'range',
          min: 0,
          max: 100,
          value: D,
          onChange: (re) => H(Number(re.target.value)),
          'aria-label': w('visualReport.modes.sliderAria'),
          style: { width: '100%', marginTop: W.spacing[2] },
        }),
      ],
    });
  },
  Gf = ({ mode: c, generatedAt: f, expected: s, actual: w, diff: C, altBase: M }) => {
    const { t: D } = jn(),
      H = Bi(s, f),
      j = Bi(w, f),
      Q = Bi(C ?? null, f);
    if (c === 'diff')
      return E.jsx(Cr, {
        imageUrl: Q,
        altText: `${M} diff`,
        missingKey: 'visualReport.messages.missingDiff',
      });
    if (c === 'actual')
      return E.jsx(Cr, {
        imageUrl: j,
        altText: `${M} actual`,
        missingKey: 'visualReport.messages.missingActual',
      });
    if (c === 'expected')
      return E.jsx(Cr, {
        imageUrl: H,
        altText: `${M} expected`,
        missingKey: 'visualReport.messages.missingExpected',
      });
    if (c === 'side-by-side') {
      const X = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' },
        O = { margin: '0 0 6px', fontSize: '0.8rem', fontWeight: 600 };
      return E.jsxs('div', {
        style: X,
        children: [
          E.jsxs('section', {
            children: [
              E.jsx('h4', { style: O, children: D('visualReport.modes.expected') }),
              E.jsx(Cr, {
                imageUrl: H,
                altText: `${M} expected`,
                missingKey: 'visualReport.messages.missingExpected',
              }),
            ],
          }),
          E.jsxs('section', {
            children: [
              E.jsx('h4', { style: O, children: D('visualReport.modes.actual') }),
              E.jsx(Cr, {
                imageUrl: j,
                altText: `${M} actual`,
                missingKey: 'visualReport.messages.missingActual',
              }),
            ],
          }),
        ],
      });
    }
    return E.jsx(Yf, { expectedUrl: H, actualUrl: j, altBase: M });
  },
  Xf = ({ variant: c, variantKey: f, activeMode: s, onModeChange: w }) => {
    const { t: C } = jn(),
      M = q.useRef({}),
      D = q.useMemo(() => {
        const F = new Set();
        return (c.status === 'passed' && F.add('diff'), F);
      }, [c.status]),
      H = q.useMemo(() => Ka.filter((F) => !D.has(F.value)).map((F) => F.value), [D]),
      j = `variant-${f.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
      Q = (F) => {
        const $ = () => {
          var R;
          return (R = M.current[F]) == null ? void 0 : R.focus();
        };
        if (($(), typeof globalThis.requestAnimationFrame == 'function')) {
          globalThis.requestAnimationFrame($);
          return;
        }
        setTimeout($, 0);
      },
      X = (F, $ = !1) => {
        (w(F, $), $ && Q(F));
      },
      O = (F) => {
        const $ = oc(s, H),
          ne = (H.indexOf($) + F + H.length) % H.length;
        X(H[ne] ?? Yt, !0);
      },
      b = (F) => {
        if (F.key === 'ArrowRight' || F.key === 'ArrowDown') {
          (F.preventDefault(), O(1));
          return;
        }
        if (F.key === 'ArrowLeft' || F.key === 'ArrowUp') {
          (F.preventDefault(), O(-1));
          return;
        }
        if (F.key === 'Home') {
          (F.preventDefault(), X(H[0] ?? Yt, !0));
          return;
        }
        F.key === 'End' && (F.preventDefault(), X(H[H.length - 1] ?? Yt, !0));
      },
      ae = {
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: W.spacing[2.5],
      };
    return E.jsx('div', {
      role: 'tablist',
      'aria-label': C('visualReport.modes.ariaLabel'),
      style: ae,
      children: Ka.map((F) => {
        const $ = D.has(F.value),
          R = s === F.value,
          ne = {
            border: `1px solid ${R ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
            background: R ? 'var(--color-primary-soft)' : 'var(--color-surface)',
            color: 'var(--color-text)',
            borderRadius: W.borderRadius.md,
            padding: '6px 10px',
            fontSize: W.typography.fontSize.xs,
            lineHeight: W.typography.lineHeight.tight,
            cursor: $ ? 'not-allowed' : 'pointer',
            opacity: $ ? 0.45 : 1,
          };
        return E.jsx(
          'button',
          {
            id: `${j}-tab-${F.value}`,
            type: 'button',
            role: 'tab',
            'aria-controls': `${j}-panel`,
            'aria-selected': R,
            'aria-disabled': $,
            disabled: $,
            tabIndex: R ? 0 : -1,
            style: ne,
            onKeyDown: b,
            onClick: () => !$ && X(F.value),
            ref: (ve) => {
              M.current[F.value] = ve;
            },
            children: C(F.labelKey),
          },
          F.value,
        );
      }),
    });
  },
  qf = ({ story: c, variant: f, generatedAt: s, activeMode: w, onModeChange: C }) => {
    const M = `${c.id}::${f.viewport}`,
      D = `variant-${M.replace(/[^a-zA-Z0-9_-]/g, '-')}-panel`,
      H = `${c.name} ${f.viewport}`,
      j = q.useMemo(
        () =>
          f.status === 'passed'
            ? ['actual', 'expected', 'side-by-side', 'slider']
            : ['diff', 'actual', 'expected', 'side-by-side', 'slider'],
        [f.status],
      ),
      Q = oc(w, j) ?? Yt,
      X = {
        border: '1px solid var(--color-border)',
        borderRadius: W.borderRadius.xl,
        background: 'var(--color-surface)',
        padding: W.spacing[3],
      },
      O = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: W.spacing[2.5],
        marginBottom: W.spacing[2.5],
      };
    return E.jsxs('article', {
      style: X,
      children: [
        E.jsxs('header', {
          style: O,
          children: [
            E.jsxs('h3', {
              style: { margin: 0, fontSize: W.typography.fontSize.sm },
              children: [c.name, ' · ', f.viewport],
            }),
            E.jsx(Kf, { status: f.status }),
          ],
        }),
        E.jsx(Xf, { variant: f, variantKey: M, activeMode: Q, onModeChange: (b) => C(M, b) }),
        E.jsx('div', {
          id: D,
          role: 'tabpanel',
          'aria-label': `Comparison preview for ${c.name} ${f.viewport}`,
          style: { minWidth: 0 },
          children: E.jsx(Gf, {
            mode: Q,
            generatedAt: s,
            expected: f.expected,
            actual: f.actual,
            diff: f.diff ?? null,
            altBase: H,
          }),
        }),
      ],
    });
  },
  Zf = ({ data: c }) => {
    var $;
    const { t: f } = jn(),
      s = q.useMemo(() => Df(c), [c]),
      [w, C] = q.useState(new Set()),
      [M, D] = q.useState((($ = s.componentGroups[0]) == null ? void 0 : $.key) ?? null),
      [H, j] = q.useState(new Map()),
      Q = q.useMemo(() => Of(s.componentGroups, w), [s.componentGroups, w]);
    q.useEffect(() => {
      D((R) => Uf(R, Q));
    }, [Q]);
    const X = q.useMemo(() => Ff(s.componentGroups), [s.componentGroups]),
      O = q.useMemo(() => Q.find((R) => R.key === M) ?? null, [Q, M]),
      b = q.useMemo(
        () =>
          O ? O.stories.reduce((R, ne) => R + ne.variants.filter((ve) => Fl(ve, w)).length, 0) : 0,
        [O, w],
      ),
      ae = q.useMemo(() => (O ? O.stories.reduce((R, ne) => R + ne.variants.length, 0) : 0), [O]),
      F = O
        ? f('visualReport.selection.shownOf', { shown: b, total: ae })
        : f('visualReport.selection.tryDifferentFilter');
    return E.jsxs('main', {
      style: jl.root,
      children: [
        E.jsxs('aside', {
          style: jl.sidebar,
          children: [
            E.jsxs('header', {
              children: [
                E.jsx('h1', {
                  style: { margin: 0, fontSize: '1.1rem' },
                  children: f('visualReport.title'),
                }),
                E.jsx('p', {
                  style: {
                    margin: '6px 0 0',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.85rem',
                  },
                  children: f('visualReport.generatedAt', {
                    date: new Date(c.generatedAt).toLocaleString(),
                    count: s.componentGroups.length,
                  }),
                }),
              ],
            }),
            E.jsx(bf, { groups: Q, selectedKey: M, selectedStatusFilters: w, onSelect: D }),
          ],
        }),
        E.jsxs('section', {
          style: jl.content,
          children: [
            E.jsxs('div', {
              style: {
                ...jl.toolbar,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              children: [
                E.jsx(Vf, {
                  counts: X,
                  selectedStatusFilters: w,
                  onToggle: (R) => {
                    C((ne) => Mf(R, ne));
                  },
                }),
                E.jsx(Wf, {}),
              ],
            }),
            E.jsxs('header', {
              children: [
                E.jsx('h2', {
                  style: { margin: 0, fontSize: '1.2rem' },
                  children: O
                    ? `${O.namespace} / ${O.atomicLevel} / ${O.component}`
                    : f('visualReport.selection.noMatchingComponents'),
                }),
                E.jsx('p', {
                  style: { margin: '6px 0 0', color: 'var(--color-text-muted)' },
                  children: F,
                }),
              ],
            }),
            E.jsx('div', {
              style: { marginTop: W.spacing[4], display: 'grid', gap: W.spacing[3.5] },
              children:
                O == null
                  ? void 0
                  : O.stories
                      .slice()
                      .sort((R, ne) => R.name.localeCompare(ne.name))
                      .flatMap((R) =>
                        R.variants
                          .filter((ne) => Fl(ne, w))
                          .map((ne) => {
                            const ve = `${R.id}::${ne.viewport}`;
                            return E.jsx(
                              qf,
                              {
                                story: R,
                                variant: ne,
                                generatedAt: c.generatedAt,
                                activeMode: Bf(H, ve),
                                onModeChange: (re, fe) => {
                                  j((Ce) => {
                                    const ie = new Map(Ce);
                                    return (ie.set(re, fe), ie);
                                  });
                                },
                              },
                              ve,
                            );
                          }),
                      ),
            }),
          ],
        }),
      ],
    });
  },
  sc = 'visual-report-root',
  ac = (c) => {
    const f = document.getElementById(sc);
    if (!f) return;
    qa.createRoot(f).render(
      E.jsx('div', {
        style: {
          padding: '16px',
          color: 'var(--color-danger-soft)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-danger)',
          borderRadius: '12px',
          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        },
        role: 'alert',
        'aria-live': 'assertive',
        children: c,
      }),
    );
  },
  Jf = async () => {
    const c = document.getElementById(sc);
    if (!c) return;
    const f = await fetch('/visual-report/data.json', { cache: 'no-store' });
    if (!f.ok) {
      ac('data.json not found. Run: pnpm run report:visual:build');
      return;
    }
    const s = await f.json();
    qa.createRoot(c).render(
      E.jsx(df.StrictMode, {
        children: E.jsx(_f, { locale: 'en', children: E.jsx(Zf, { data: s }) }),
      }),
    );
  };
Jf().catch((c) => {
  const f = c instanceof Error ? c.message : String(c);
  ac(`Failed to load report data: ${f}`);
});
