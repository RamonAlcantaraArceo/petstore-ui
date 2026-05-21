var up = Object.create;
var $a = Object.defineProperty;
var cp = Object.getOwnPropertyDescriptor;
var dp = Object.getOwnPropertyNames;
var pp = Object.getPrototypeOf,
  fp = Object.prototype.hasOwnProperty;
var qe = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var mp = (e, t, n, r) => {
  if ((t && typeof t == 'object') || typeof t == 'function')
    for (let o of dp(t))
      !fp.call(e, o) &&
        o !== n &&
        $a(e, o, { get: () => t[o], enumerable: !(r = cp(t, o)) || r.enumerable });
  return e;
};
var b = (e, t, n) => (
  (n = e != null ? up(pp(e)) : {}),
  mp(t || !e || !e.__esModule ? $a(n, 'default', { value: e, enumerable: !0 }) : n, e)
);
var Za = qe((z) => {
  'use strict';
  var Tn = Symbol.for('react.element'),
    gp = Symbol.for('react.portal'),
    yp = Symbol.for('react.fragment'),
    hp = Symbol.for('react.strict_mode'),
    vp = Symbol.for('react.profiler'),
    Sp = Symbol.for('react.provider'),
    kp = Symbol.for('react.context'),
    wp = Symbol.for('react.forward_ref'),
    xp = Symbol.for('react.suspense'),
    Cp = Symbol.for('react.memo'),
    bp = Symbol.for('react.lazy'),
    Ba = Symbol.iterator;
  function Ep(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Ba && e[Ba]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var Ha = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Ka = Object.assign,
    Wa = {};
  function Qt(e, t, n) {
    ((this.props = e), (this.context = t), (this.refs = Wa), (this.updater = n || Ha));
  }
  Qt.prototype.isReactComponent = {};
  Qt.prototype.setState = function (e, t) {
    if (typeof e != 'object' && typeof e != 'function' && e != null)
      throw Error(
        'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
      );
    this.updater.enqueueSetState(this, e, t, 'setState');
  };
  Qt.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
  };
  function Qa() {}
  Qa.prototype = Qt.prototype;
  function dl(e, t, n) {
    ((this.props = e), (this.context = t), (this.refs = Wa), (this.updater = n || Ha));
  }
  var pl = (dl.prototype = new Qa());
  pl.constructor = dl;
  Ka(pl, Qt.prototype);
  pl.isPureReactComponent = !0;
  var Ua = Array.isArray,
    Ga = Object.prototype.hasOwnProperty,
    fl = { current: null },
    Ya = { key: !0, ref: !0, __self: !0, __source: !0 };
  function qa(e, t, n) {
    var r,
      o = {},
      l = null,
      i = null;
    if (t != null)
      for (r in (t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (l = '' + t.key), t))
        Ga.call(t, r) && !Ya.hasOwnProperty(r) && (o[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) o.children = n;
    else if (1 < a) {
      for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 2];
      o.children = s;
    }
    if (e && e.defaultProps) for (r in ((a = e.defaultProps), a)) o[r] === void 0 && (o[r] = a[r]);
    return { $$typeof: Tn, type: e, key: l, ref: i, props: o, _owner: fl.current };
  }
  function Pp(e, t) {
    return { $$typeof: Tn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
  }
  function ml(e) {
    return typeof e == 'object' && e !== null && e.$$typeof === Tn;
  }
  function Lp(e) {
    var t = { '=': '=0', ':': '=2' };
    return (
      '$' +
      e.replace(/[=:]/g, function (n) {
        return t[n];
      })
    );
  }
  var ja = /\/+/g;
  function cl(e, t) {
    return typeof e == 'object' && e !== null && e.key != null ? Lp('' + e.key) : t.toString(36);
  }
  function Lr(e, t, n, r, o) {
    var l = typeof e;
    (l === 'undefined' || l === 'boolean') && (e = null);
    var i = !1;
    if (e === null) i = !0;
    else
      switch (l) {
        case 'string':
        case 'number':
          i = !0;
          break;
        case 'object':
          switch (e.$$typeof) {
            case Tn:
            case gp:
              i = !0;
          }
      }
    if (i)
      return (
        (i = e),
        (o = o(i)),
        (e = r === '' ? '.' + cl(i, 0) : r),
        Ua(o)
          ? ((n = ''),
            e != null && (n = e.replace(ja, '$&/') + '/'),
            Lr(o, t, n, '', function (c) {
              return c;
            }))
          : o != null &&
            (ml(o) &&
              (o = Pp(
                o,
                n +
                  (!o.key || (i && i.key === o.key) ? '' : ('' + o.key).replace(ja, '$&/') + '/') +
                  e,
              )),
            t.push(o)),
        1
      );
    if (((i = 0), (r = r === '' ? '.' : r + ':'), Ua(e)))
      for (var a = 0; a < e.length; a++) {
        l = e[a];
        var s = r + cl(l, a);
        i += Lr(l, t, n, s, o);
      }
    else if (((s = Ep(e)), typeof s == 'function'))
      for (e = s.call(e), a = 0; !(l = e.next()).done; )
        ((l = l.value), (s = r + cl(l, a++)), (i += Lr(l, t, n, s, o)));
    else if (l === 'object')
      throw (
        (t = String(e)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
            '). If you meant to render a collection of children, use an array instead.',
        )
      );
    return i;
  }
  function Pr(e, t, n) {
    if (e == null) return e;
    var r = [],
      o = 0;
    return (
      Lr(e, r, '', '', function (l) {
        return t.call(n, l, o++);
      }),
      r
    );
  }
  function Tp(e) {
    if (e._status === -1) {
      var t = e._result;
      ((t = t()),
        t.then(
          function (n) {
            (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = n));
          },
          function (n) {
            (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = n));
          },
        ),
        e._status === -1 && ((e._status = 0), (e._result = t)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var se = { current: null },
    Tr = { transition: null },
    Rp = { ReactCurrentDispatcher: se, ReactCurrentBatchConfig: Tr, ReactCurrentOwner: fl };
  function Xa() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  z.Children = {
    map: Pr,
    forEach: function (e, t, n) {
      Pr(
        e,
        function () {
          t.apply(this, arguments);
        },
        n,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        Pr(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        Pr(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!ml(e))
        throw Error('React.Children.only expected to receive a single React element child.');
      return e;
    },
  };
  z.Component = Qt;
  z.Fragment = yp;
  z.Profiler = vp;
  z.PureComponent = dl;
  z.StrictMode = hp;
  z.Suspense = xp;
  z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Rp;
  z.act = Xa;
  z.cloneElement = function (e, t, n) {
    if (e == null)
      throw Error(
        'React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.',
      );
    var r = Ka({}, e.props),
      o = e.key,
      l = e.ref,
      i = e._owner;
    if (t != null) {
      if (
        (t.ref !== void 0 && ((l = t.ref), (i = fl.current)),
        t.key !== void 0 && (o = '' + t.key),
        e.type && e.type.defaultProps)
      )
        var a = e.type.defaultProps;
      for (s in t)
        Ga.call(t, s) &&
          !Ya.hasOwnProperty(s) &&
          (r[s] = t[s] === void 0 && a !== void 0 ? a[s] : t[s]);
    }
    var s = arguments.length - 2;
    if (s === 1) r.children = n;
    else if (1 < s) {
      a = Array(s);
      for (var c = 0; c < s; c++) a[c] = arguments[c + 2];
      r.children = a;
    }
    return { $$typeof: Tn, type: e.type, key: o, ref: l, props: r, _owner: i };
  };
  z.createContext = function (e) {
    return (
      (e = {
        $$typeof: kp,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }),
      (e.Provider = { $$typeof: Sp, _context: e }),
      (e.Consumer = e)
    );
  };
  z.createElement = qa;
  z.createFactory = function (e) {
    var t = qa.bind(null, e);
    return ((t.type = e), t);
  };
  z.createRef = function () {
    return { current: null };
  };
  z.forwardRef = function (e) {
    return { $$typeof: wp, render: e };
  };
  z.isValidElement = ml;
  z.lazy = function (e) {
    return { $$typeof: bp, _payload: { _status: -1, _result: e }, _init: Tp };
  };
  z.memo = function (e, t) {
    return { $$typeof: Cp, type: e, compare: t === void 0 ? null : t };
  };
  z.startTransition = function (e) {
    var t = Tr.transition;
    Tr.transition = {};
    try {
      e();
    } finally {
      Tr.transition = t;
    }
  };
  z.unstable_act = Xa;
  z.useCallback = function (e, t) {
    return se.current.useCallback(e, t);
  };
  z.useContext = function (e) {
    return se.current.useContext(e);
  };
  z.useDebugValue = function () {};
  z.useDeferredValue = function (e) {
    return se.current.useDeferredValue(e);
  };
  z.useEffect = function (e, t) {
    return se.current.useEffect(e, t);
  };
  z.useId = function () {
    return se.current.useId();
  };
  z.useImperativeHandle = function (e, t, n) {
    return se.current.useImperativeHandle(e, t, n);
  };
  z.useInsertionEffect = function (e, t) {
    return se.current.useInsertionEffect(e, t);
  };
  z.useLayoutEffect = function (e, t) {
    return se.current.useLayoutEffect(e, t);
  };
  z.useMemo = function (e, t) {
    return se.current.useMemo(e, t);
  };
  z.useReducer = function (e, t, n) {
    return se.current.useReducer(e, t, n);
  };
  z.useRef = function (e) {
    return se.current.useRef(e);
  };
  z.useState = function (e) {
    return se.current.useState(e);
  };
  z.useSyncExternalStore = function (e, t, n) {
    return se.current.useSyncExternalStore(e, t, n);
  };
  z.useTransition = function () {
    return se.current.useTransition();
  };
  z.version = '18.3.1';
});
var W = qe((sg, Ja) => {
  'use strict';
  Ja.exports = Za();
});
var us = qe((_) => {
  'use strict';
  function vl(e, t) {
    var n = e.length;
    e.push(t);
    e: for (; 0 < n; ) {
      var r = (n - 1) >>> 1,
        o = e[r];
      if (0 < Rr(o, t)) ((e[r] = t), (e[n] = o), (n = r));
      else break e;
    }
  }
  function De(e) {
    return e.length === 0 ? null : e[0];
  }
  function Mr(e) {
    if (e.length === 0) return null;
    var t = e[0],
      n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, o = e.length, l = o >>> 1; r < l; ) {
        var i = 2 * (r + 1) - 1,
          a = e[i],
          s = i + 1,
          c = e[s];
        if (0 > Rr(a, n))
          s < o && 0 > Rr(c, a)
            ? ((e[r] = c), (e[s] = n), (r = s))
            : ((e[r] = a), (e[i] = n), (r = i));
        else if (s < o && 0 > Rr(c, n)) ((e[r] = c), (e[s] = n), (r = s));
        else break e;
      }
    }
    return t;
  }
  function Rr(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return n !== 0 ? n : e.id - t.id;
  }
  typeof performance == 'object' && typeof performance.now == 'function'
    ? ((es = performance),
      (_.unstable_now = function () {
        return es.now();
      }))
    : ((gl = Date),
      (ts = gl.now()),
      (_.unstable_now = function () {
        return gl.now() - ts;
      }));
  var es,
    gl,
    ts,
    He = [],
    ct = [],
    zp = 1,
    Le = null,
    te = 3,
    Fr = !1,
    Ft = !1,
    zn = !1,
    os = typeof setTimeout == 'function' ? setTimeout : null,
    ls = typeof clearTimeout == 'function' ? clearTimeout : null,
    ns = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function Sl(e) {
    for (var t = De(ct); t !== null; ) {
      if (t.callback === null) Mr(ct);
      else if (t.startTime <= e) (Mr(ct), (t.sortIndex = t.expirationTime), vl(He, t));
      else break;
      t = De(ct);
    }
  }
  function kl(e) {
    if (((zn = !1), Sl(e), !Ft))
      if (De(He) !== null) ((Ft = !0), xl(wl));
      else {
        var t = De(ct);
        t !== null && Cl(kl, t.startTime - e);
      }
  }
  function wl(e, t) {
    ((Ft = !1), zn && ((zn = !1), ls(Mn), (Mn = -1)), (Fr = !0));
    var n = te;
    try {
      for (Sl(t), Le = De(He); Le !== null && (!(Le.expirationTime > t) || (e && !ss())); ) {
        var r = Le.callback;
        if (typeof r == 'function') {
          ((Le.callback = null), (te = Le.priorityLevel));
          var o = r(Le.expirationTime <= t);
          ((t = _.unstable_now()),
            typeof o == 'function' ? (Le.callback = o) : Le === De(He) && Mr(He),
            Sl(t));
        } else Mr(He);
        Le = De(He);
      }
      if (Le !== null) var l = !0;
      else {
        var i = De(ct);
        (i !== null && Cl(kl, i.startTime - t), (l = !1));
      }
      return l;
    } finally {
      ((Le = null), (te = n), (Fr = !1));
    }
  }
  var Nr = !1,
    zr = null,
    Mn = -1,
    is = 5,
    as = -1;
  function ss() {
    return !(_.unstable_now() - as < is);
  }
  function yl() {
    if (zr !== null) {
      var e = _.unstable_now();
      as = e;
      var t = !0;
      try {
        t = zr(!0, e);
      } finally {
        t ? Rn() : ((Nr = !1), (zr = null));
      }
    } else Nr = !1;
  }
  var Rn;
  typeof ns == 'function'
    ? (Rn = function () {
        ns(yl);
      })
    : typeof MessageChannel < 'u'
      ? ((hl = new MessageChannel()),
        (rs = hl.port2),
        (hl.port1.onmessage = yl),
        (Rn = function () {
          rs.postMessage(null);
        }))
      : (Rn = function () {
          os(yl, 0);
        });
  var hl, rs;
  function xl(e) {
    ((zr = e), Nr || ((Nr = !0), Rn()));
  }
  function Cl(e, t) {
    Mn = os(function () {
      e(_.unstable_now());
    }, t);
  }
  _.unstable_IdlePriority = 5;
  _.unstable_ImmediatePriority = 1;
  _.unstable_LowPriority = 4;
  _.unstable_NormalPriority = 3;
  _.unstable_Profiling = null;
  _.unstable_UserBlockingPriority = 2;
  _.unstable_cancelCallback = function (e) {
    e.callback = null;
  };
  _.unstable_continueExecution = function () {
    Ft || Fr || ((Ft = !0), xl(wl));
  };
  _.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e
      ? console.error(
          'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
        )
      : (is = 0 < e ? Math.floor(1e3 / e) : 5);
  };
  _.unstable_getCurrentPriorityLevel = function () {
    return te;
  };
  _.unstable_getFirstCallbackNode = function () {
    return De(He);
  };
  _.unstable_next = function (e) {
    switch (te) {
      case 1:
      case 2:
      case 3:
        var t = 3;
        break;
      default:
        t = te;
    }
    var n = te;
    te = t;
    try {
      return e();
    } finally {
      te = n;
    }
  };
  _.unstable_pauseExecution = function () {};
  _.unstable_requestPaint = function () {};
  _.unstable_runWithPriority = function (e, t) {
    switch (e) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        e = 3;
    }
    var n = te;
    te = e;
    try {
      return t();
    } finally {
      te = n;
    }
  };
  _.unstable_scheduleCallback = function (e, t, n) {
    var r = _.unstable_now();
    switch (
      (typeof n == 'object' && n !== null
        ? ((n = n.delay), (n = typeof n == 'number' && 0 < n ? r + n : r))
        : (n = r),
      e)
    ) {
      case 1:
        var o = -1;
        break;
      case 2:
        o = 250;
        break;
      case 5:
        o = 1073741823;
        break;
      case 4:
        o = 1e4;
        break;
      default:
        o = 5e3;
    }
    return (
      (o = n + o),
      (e = {
        id: zp++,
        callback: t,
        priorityLevel: e,
        startTime: n,
        expirationTime: o,
        sortIndex: -1,
      }),
      n > r
        ? ((e.sortIndex = n),
          vl(ct, e),
          De(He) === null && e === De(ct) && (zn ? (ls(Mn), (Mn = -1)) : (zn = !0), Cl(kl, n - r)))
        : ((e.sortIndex = o), vl(He, e), Ft || Fr || ((Ft = !0), xl(wl))),
      e
    );
  };
  _.unstable_shouldYield = ss;
  _.unstable_wrapCallback = function (e) {
    var t = te;
    return function () {
      var n = te;
      te = t;
      try {
        return e.apply(this, arguments);
      } finally {
        te = n;
      }
    };
  };
});
var ds = qe((cg, cs) => {
  'use strict';
  cs.exports = us();
});
var gd = qe((Ce) => {
  'use strict';
  var Mp = W(),
    we = ds();
  function k(e) {
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
  var vu = new Set(),
    Jn = {};
  function Kt(e, t) {
    (gn(e, t), gn(e + 'Capture', t));
  }
  function gn(e, t) {
    for (Jn[e] = t, e = 0; e < t.length; e++) vu.add(t[e]);
  }
  var nt = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Wl = Object.prototype.hasOwnProperty,
    Fp =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ps = {},
    fs = {};
  function Np(e) {
    return Wl.call(fs, e)
      ? !0
      : Wl.call(ps, e)
        ? !1
        : Fp.test(e)
          ? (fs[e] = !0)
          : ((ps[e] = !0), !1);
  }
  function _p(e, t, n, r) {
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
  function Dp(e, t, n, r) {
    if (t === null || typeof t > 'u' || _p(e, t, n, r)) return !0;
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
  function de(e, t, n, r, o, l, i) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = l),
      (this.removeEmptyString = i));
  }
  var ee = {};
  'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
      ee[e] = new de(e, 0, !1, e, null, !1, !1);
    });
  [
    ['acceptCharset', 'accept-charset'],
    ['className', 'class'],
    ['htmlFor', 'for'],
    ['httpEquiv', 'http-equiv'],
  ].forEach(function (e) {
    var t = e[0];
    ee[t] = new de(t, 1, !1, e[1], null, !1, !1);
  });
  ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
    ee[e] = new de(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
    ee[e] = new de(e, 2, !1, e, null, !1, !1);
  });
  'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
    .split(' ')
    .forEach(function (e) {
      ee[e] = new de(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
  ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
    ee[e] = new de(e, 3, !0, e, null, !1, !1);
  });
  ['capture', 'download'].forEach(function (e) {
    ee[e] = new de(e, 4, !1, e, null, !1, !1);
  });
  ['cols', 'rows', 'size', 'span'].forEach(function (e) {
    ee[e] = new de(e, 6, !1, e, null, !1, !1);
  });
  ['rowSpan', 'start'].forEach(function (e) {
    ee[e] = new de(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Oi = /[\-:]([a-z])/g;
  function Vi(e) {
    return e[1].toUpperCase();
  }
  'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
      var t = e.replace(Oi, Vi);
      ee[t] = new de(t, 1, !1, e, null, !1, !1);
    });
  'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
    .split(' ')
    .forEach(function (e) {
      var t = e.replace(Oi, Vi);
      ee[t] = new de(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
    });
  ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
    var t = e.replace(Oi, Vi);
    ee[t] = new de(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
  });
  ['tabIndex', 'crossOrigin'].forEach(function (e) {
    ee[e] = new de(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  ee.xlinkHref = new de('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1);
  ['src', 'href', 'action', 'formAction'].forEach(function (e) {
    ee[e] = new de(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function $i(e, t, n, r) {
    var o = ee.hasOwnProperty(t) ? ee[t] : null;
    (o !== null
      ? o.type !== 0
      : r || !(2 < t.length) || (t[0] !== 'o' && t[0] !== 'O') || (t[1] !== 'n' && t[1] !== 'N')) &&
      (Dp(t, n, o, r) && (n = null),
      r || o === null
        ? Np(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
        : o.mustUseProperty
          ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : '') : n)
          : ((t = o.attributeName),
            (r = o.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((o = o.type),
                (n = o === 3 || (o === 4 && n === !0) ? '' : '' + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var it = Mp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    _r = Symbol.for('react.element'),
    qt = Symbol.for('react.portal'),
    Xt = Symbol.for('react.fragment'),
    Bi = Symbol.for('react.strict_mode'),
    Ql = Symbol.for('react.profiler'),
    Su = Symbol.for('react.provider'),
    ku = Symbol.for('react.context'),
    Ui = Symbol.for('react.forward_ref'),
    Gl = Symbol.for('react.suspense'),
    Yl = Symbol.for('react.suspense_list'),
    ji = Symbol.for('react.memo'),
    pt = Symbol.for('react.lazy');
  Symbol.for('react.scope');
  Symbol.for('react.debug_trace_mode');
  var wu = Symbol.for('react.offscreen');
  Symbol.for('react.legacy_hidden');
  Symbol.for('react.cache');
  Symbol.for('react.tracing_marker');
  var ms = Symbol.iterator;
  function Fn(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ms && e[ms]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var B = Object.assign,
    bl;
  function $n(e) {
    if (bl === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        bl = (t && t[1]) || '';
      }
    return (
      `
` +
      bl +
      e
    );
  }
  var El = !1;
  function Pl(e, t) {
    if (!e || El) return '';
    El = !0;
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
          } catch (c) {
            var r = c;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (c) {
            r = c;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (c) {
          r = c;
        }
        e();
      }
    } catch (c) {
      if (c && r && typeof c.stack == 'string') {
        for (
          var o = c.stack.split(`
`),
            l = r.stack.split(`
`),
            i = o.length - 1,
            a = l.length - 1;
          1 <= i && 0 <= a && o[i] !== l[a];
        )
          a--;
        for (; 1 <= i && 0 <= a; i--, a--)
          if (o[i] !== l[a]) {
            if (i !== 1 || a !== 1)
              do
                if ((i--, a--, 0 > a || o[i] !== l[a])) {
                  var s =
                    `
` + o[i].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      s.includes('<anonymous>') &&
                      (s = s.replace('<anonymous>', e.displayName)),
                    s
                  );
                }
              while (1 <= i && 0 <= a);
            break;
          }
      }
    } finally {
      ((El = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : '') ? $n(e) : '';
  }
  function Ap(e) {
    switch (e.tag) {
      case 5:
        return $n(e.type);
      case 16:
        return $n('Lazy');
      case 13:
        return $n('Suspense');
      case 19:
        return $n('SuspenseList');
      case 0:
      case 2:
      case 15:
        return ((e = Pl(e.type, !1)), e);
      case 11:
        return ((e = Pl(e.type.render, !1)), e);
      case 1:
        return ((e = Pl(e.type, !0)), e);
      default:
        return '';
    }
  }
  function ql(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case Xt:
        return 'Fragment';
      case qt:
        return 'Portal';
      case Ql:
        return 'Profiler';
      case Bi:
        return 'StrictMode';
      case Gl:
        return 'Suspense';
      case Yl:
        return 'SuspenseList';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case ku:
          return (e.displayName || 'Context') + '.Consumer';
        case Su:
          return (e._context.displayName || 'Context') + '.Provider';
        case Ui:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case ji:
          return ((t = e.displayName || null), t !== null ? t : ql(e.type) || 'Memo');
        case pt:
          ((t = e._payload), (e = e._init));
          try {
            return ql(e(t));
          } catch {}
      }
    return null;
  }
  function Ip(e) {
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
        return ql(t);
      case 8:
        return t === Bi ? 'StrictMode' : 'Mode';
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
  function Pt(e) {
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
  function xu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Op(e) {
    var t = xu(e) ? 'checked' : 'value',
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = '' + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var o = n.get,
        l = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return o.call(this);
          },
          set: function (i) {
            ((r = '' + i), l.call(this, i));
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
  function Dr(e) {
    e._valueTracker || (e._valueTracker = Op(e));
  }
  function Cu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = '';
    return (
      e && (r = xu(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function uo(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Xl(e, t) {
    var n = t.checked;
    return B({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function gs(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = Pt(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === 'checkbox' || t.type === 'radio' ? t.checked != null : t.value != null,
      }));
  }
  function bu(e, t) {
    ((t = t.checked), t != null && $i(e, 'checked', t, !1));
  }
  function Zl(e, t) {
    bu(e, t);
    var n = Pt(t.value),
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
      ? Jl(e, t.type, n)
      : t.hasOwnProperty('defaultValue') && Jl(e, t.type, Pt(t.defaultValue)),
      t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
  }
  function ys(e, t, n) {
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
  function Jl(e, t, n) {
    (t !== 'number' || uo(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = '' + e._wrapperState.initialValue)
        : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
  }
  var Bn = Array.isArray;
  function un(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        ((o = t.hasOwnProperty('$' + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && r && (e[n].defaultSelected = !0));
    } else {
      for (n = '' + Pt(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ei(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
    return B({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: '' + e._wrapperState.initialValue,
    });
  }
  function hs(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(k(92));
        if (Bn(n)) {
          if (1 < n.length) throw Error(k(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ''), (n = t));
    }
    e._wrapperState = { initialValue: Pt(n) };
  }
  function Eu(e, t) {
    var n = Pt(t.value),
      r = Pt(t.defaultValue);
    (n != null &&
      ((n = '' + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = '' + r));
  }
  function vs(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
  }
  function Pu(e) {
    switch (e) {
      case 'svg':
        return 'http://www.w3.org/2000/svg';
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML';
      default:
        return 'http://www.w3.org/1999/xhtml';
    }
  }
  function ti(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
      ? Pu(t)
      : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
  }
  var Ar,
    Lu = (function (e) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, o) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, o);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e) e.innerHTML = t;
      else {
        for (
          Ar = Ar || document.createElement('div'),
            Ar.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
            t = Ar.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function er(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Hn = {
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
    Vp = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(Hn).forEach(function (e) {
    Vp.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Hn[t] = Hn[e]));
    });
  });
  function Tu(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
      ? ''
      : n || typeof t != 'number' || t === 0 || (Hn.hasOwnProperty(e) && Hn[e])
        ? ('' + t).trim()
        : t + 'px';
  }
  function Ru(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf('--') === 0,
          o = Tu(n, t[n], r);
        (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, o) : (e[n] = o));
      }
  }
  var $p = B(
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
  function ni(e, t) {
    if (t) {
      if ($p[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(k(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(k(60));
        if (
          typeof t.dangerouslySetInnerHTML != 'object' ||
          !('__html' in t.dangerouslySetInnerHTML)
        )
          throw Error(k(61));
      }
      if (t.style != null && typeof t.style != 'object') throw Error(k(62));
    }
  }
  function ri(e, t) {
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
  var oi = null;
  function Hi(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var li = null,
    cn = null,
    dn = null;
  function Ss(e) {
    if ((e = vr(e))) {
      if (typeof li != 'function') throw Error(k(280));
      var t = e.stateNode;
      t && ((t = Oo(t)), li(e.stateNode, e.type, t));
    }
  }
  function zu(e) {
    cn ? (dn ? dn.push(e) : (dn = [e])) : (cn = e);
  }
  function Mu() {
    if (cn) {
      var e = cn,
        t = dn;
      if (((dn = cn = null), Ss(e), t)) for (e = 0; e < t.length; e++) Ss(t[e]);
    }
  }
  function Fu(e, t) {
    return e(t);
  }
  function Nu() {}
  var Ll = !1;
  function _u(e, t, n) {
    if (Ll) return e(t, n);
    Ll = !0;
    try {
      return Fu(e, t, n);
    } finally {
      ((Ll = !1), (cn !== null || dn !== null) && (Nu(), Mu()));
    }
  }
  function tr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Oo(n);
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
    if (n && typeof n != 'function') throw Error(k(231, t, typeof n));
    return n;
  }
  var ii = !1;
  if (nt)
    try {
      ((Gt = {}),
        Object.defineProperty(Gt, 'passive', {
          get: function () {
            ii = !0;
          },
        }),
        window.addEventListener('test', Gt, Gt),
        window.removeEventListener('test', Gt, Gt));
    } catch {
      ii = !1;
    }
  var Gt;
  function Bp(e, t, n, r, o, l, i, a, s) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, c);
    } catch (g) {
      this.onError(g);
    }
  }
  var Kn = !1,
    co = null,
    po = !1,
    ai = null,
    Up = {
      onError: function (e) {
        ((Kn = !0), (co = e));
      },
    };
  function jp(e, t, n, r, o, l, i, a, s) {
    ((Kn = !1), (co = null), Bp.apply(Up, arguments));
  }
  function Hp(e, t, n, r, o, l, i, a, s) {
    if ((jp.apply(this, arguments), Kn)) {
      if (Kn) {
        var c = co;
        ((Kn = !1), (co = null));
      } else throw Error(k(198));
      po || ((po = !0), (ai = c));
    }
  }
  function Wt(e) {
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
  function Du(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function ks(e) {
    if (Wt(e) !== e) throw Error(k(188));
  }
  function Kp(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = Wt(e)), t === null)) throw Error(k(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var o = n.return;
      if (o === null) break;
      var l = o.alternate;
      if (l === null) {
        if (((r = o.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (o.child === l.child) {
        for (l = o.child; l; ) {
          if (l === n) return (ks(o), e);
          if (l === r) return (ks(o), t);
          l = l.sibling;
        }
        throw Error(k(188));
      }
      if (n.return !== r.return) ((n = o), (r = l));
      else {
        for (var i = !1, a = o.child; a; ) {
          if (a === n) {
            ((i = !0), (n = o), (r = l));
            break;
          }
          if (a === r) {
            ((i = !0), (r = o), (n = l));
            break;
          }
          a = a.sibling;
        }
        if (!i) {
          for (a = l.child; a; ) {
            if (a === n) {
              ((i = !0), (n = l), (r = o));
              break;
            }
            if (a === r) {
              ((i = !0), (r = l), (n = o));
              break;
            }
            a = a.sibling;
          }
          if (!i) throw Error(k(189));
        }
      }
      if (n.alternate !== r) throw Error(k(190));
    }
    if (n.tag !== 3) throw Error(k(188));
    return n.stateNode.current === n ? e : t;
  }
  function Au(e) {
    return ((e = Kp(e)), e !== null ? Iu(e) : null);
  }
  function Iu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = Iu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Ou = we.unstable_scheduleCallback,
    ws = we.unstable_cancelCallback,
    Wp = we.unstable_shouldYield,
    Qp = we.unstable_requestPaint,
    H = we.unstable_now,
    Gp = we.unstable_getCurrentPriorityLevel,
    Ki = we.unstable_ImmediatePriority,
    Vu = we.unstable_UserBlockingPriority,
    fo = we.unstable_NormalPriority,
    Yp = we.unstable_LowPriority,
    $u = we.unstable_IdlePriority,
    _o = null,
    Ge = null;
  function qp(e) {
    if (Ge && typeof Ge.onCommitFiberRoot == 'function')
      try {
        Ge.onCommitFiberRoot(_o, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var $e = Math.clz32 ? Math.clz32 : Jp,
    Xp = Math.log,
    Zp = Math.LN2;
  function Jp(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Xp(e) / Zp) | 0)) | 0);
  }
  var Ir = 64,
    Or = 4194304;
  function Un(e) {
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
  function mo(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      o = e.suspendedLanes,
      l = e.pingedLanes,
      i = n & 268435455;
    if (i !== 0) {
      var a = i & ~o;
      a !== 0 ? (r = Un(a)) : ((l &= i), l !== 0 && (r = Un(l)));
    } else ((i = n & ~o), i !== 0 ? (r = Un(i)) : l !== 0 && (r = Un(l)));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      (t & o) === 0 &&
      ((o = r & -r), (l = t & -t), o >= l || (o === 16 && (l & 4194240) !== 0))
    )
      return t;
    if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        ((n = 31 - $e(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
    return r;
  }
  function ef(e, t) {
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
  function tf(e, t) {
    for (
      var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, l = e.pendingLanes;
      0 < l;
    ) {
      var i = 31 - $e(l),
        a = 1 << i,
        s = o[i];
      (s === -1
        ? ((a & n) === 0 || (a & r) !== 0) && (o[i] = ef(a, t))
        : s <= t && (e.expiredLanes |= a),
        (l &= ~a));
    }
  }
  function si(e) {
    return ((e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0);
  }
  function Bu() {
    var e = Ir;
    return ((Ir <<= 1), (Ir & 4194240) === 0 && (Ir = 64), e);
  }
  function Tl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function yr(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - $e(t)),
      (e[t] = n));
  }
  function nf(e, t) {
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
      var o = 31 - $e(n),
        l = 1 << o;
      ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~l));
    }
  }
  function Wi(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - $e(n),
        o = 1 << r;
      ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
    }
  }
  var N = 0;
  function Uu(e) {
    return ((e &= -e), 1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1);
  }
  var ju,
    Qi,
    Hu,
    Ku,
    Wu,
    ui = !1,
    Vr = [],
    vt = null,
    St = null,
    kt = null,
    nr = new Map(),
    rr = new Map(),
    mt = [],
    rf =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' ',
      );
  function xs(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        vt = null;
        break;
      case 'dragenter':
      case 'dragleave':
        St = null;
        break;
      case 'mouseover':
      case 'mouseout':
        kt = null;
        break;
      case 'pointerover':
      case 'pointerout':
        nr.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        rr.delete(t.pointerId);
    }
  }
  function Nn(e, t, n, r, o, l) {
    return e === null || e.nativeEvent !== l
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: l,
          targetContainers: [o],
        }),
        t !== null && ((t = vr(t)), t !== null && Qi(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        o !== null && t.indexOf(o) === -1 && t.push(o),
        e);
  }
  function of(e, t, n, r, o) {
    switch (t) {
      case 'focusin':
        return ((vt = Nn(vt, e, t, n, r, o)), !0);
      case 'dragenter':
        return ((St = Nn(St, e, t, n, r, o)), !0);
      case 'mouseover':
        return ((kt = Nn(kt, e, t, n, r, o)), !0);
      case 'pointerover':
        var l = o.pointerId;
        return (nr.set(l, Nn(nr.get(l) || null, e, t, n, r, o)), !0);
      case 'gotpointercapture':
        return ((l = o.pointerId), rr.set(l, Nn(rr.get(l) || null, e, t, n, r, o)), !0);
    }
    return !1;
  }
  function Qu(e) {
    var t = Dt(e.target);
    if (t !== null) {
      var n = Wt(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Du(n)), t !== null)) {
            ((e.blockedOn = t),
              Wu(e.priority, function () {
                Hu(n);
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
  function Jr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = ci(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((oi = r), n.target.dispatchEvent(r), (oi = null));
      } else return ((t = vr(n)), t !== null && Qi(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Cs(e, t, n) {
    Jr(e) && n.delete(t);
  }
  function lf() {
    ((ui = !1),
      vt !== null && Jr(vt) && (vt = null),
      St !== null && Jr(St) && (St = null),
      kt !== null && Jr(kt) && (kt = null),
      nr.forEach(Cs),
      rr.forEach(Cs));
  }
  function _n(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ui || ((ui = !0), we.unstable_scheduleCallback(we.unstable_NormalPriority, lf)));
  }
  function or(e) {
    function t(o) {
      return _n(o, e);
    }
    if (0 < Vr.length) {
      _n(Vr[0], e);
      for (var n = 1; n < Vr.length; n++) {
        var r = Vr[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      vt !== null && _n(vt, e),
        St !== null && _n(St, e),
        kt !== null && _n(kt, e),
        nr.forEach(t),
        rr.forEach(t),
        n = 0;
      n < mt.length;
      n++
    )
      ((r = mt[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < mt.length && ((n = mt[0]), n.blockedOn === null); )
      (Qu(n), n.blockedOn === null && mt.shift());
  }
  var pn = it.ReactCurrentBatchConfig,
    go = !0;
  function af(e, t, n, r) {
    var o = N,
      l = pn.transition;
    pn.transition = null;
    try {
      ((N = 1), Gi(e, t, n, r));
    } finally {
      ((N = o), (pn.transition = l));
    }
  }
  function sf(e, t, n, r) {
    var o = N,
      l = pn.transition;
    pn.transition = null;
    try {
      ((N = 4), Gi(e, t, n, r));
    } finally {
      ((N = o), (pn.transition = l));
    }
  }
  function Gi(e, t, n, r) {
    if (go) {
      var o = ci(e, t, n, r);
      if (o === null) (Dl(e, t, r, yo, n), xs(e, r));
      else if (of(o, e, t, n, r)) r.stopPropagation();
      else if ((xs(e, r), t & 4 && -1 < rf.indexOf(e))) {
        for (; o !== null; ) {
          var l = vr(o);
          if (
            (l !== null && ju(l), (l = ci(e, t, n, r)), l === null && Dl(e, t, r, yo, n), l === o)
          )
            break;
          o = l;
        }
        o !== null && r.stopPropagation();
      } else Dl(e, t, r, null, n);
    }
  }
  var yo = null;
  function ci(e, t, n, r) {
    if (((yo = null), (e = Hi(r)), (e = Dt(e)), e !== null))
      if (((t = Wt(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Du(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((yo = e), null);
  }
  function Gu(e) {
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
        switch (Gp()) {
          case Ki:
            return 1;
          case Vu:
            return 4;
          case fo:
          case Yp:
            return 16;
          case $u:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var yt = null,
    Yi = null,
    eo = null;
  function Yu() {
    if (eo) return eo;
    var e,
      t = Yi,
      n = t.length,
      r,
      o = 'value' in yt ? yt.value : yt.textContent,
      l = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === o[l - r]; r++);
    return (eo = o.slice(e, 1 < r ? 1 - r : void 0));
  }
  function to(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function $r() {
    return !0;
  }
  function bs() {
    return !1;
  }
  function xe(e) {
    function t(n, r, o, l, i) {
      ((this._reactName = n),
        (this._targetInst = o),
        (this.type = r),
        (this.nativeEvent = l),
        (this.target = i),
        (this.currentTarget = null));
      for (var a in e) e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(l) : l[a]));
      return (
        (this.isDefaultPrevented = (
          l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
        )
          ? $r
          : bs),
        (this.isPropagationStopped = bs),
        this
      );
    }
    return (
      B(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
            (this.isDefaultPrevented = $r));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
            (this.isPropagationStopped = $r));
        },
        persist: function () {},
        isPersistent: $r,
      }),
      t
    );
  }
  var xn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    qi = xe(xn),
    hr = B({}, xn, { view: 0, detail: 0 }),
    uf = xe(hr),
    Rl,
    zl,
    Dn,
    Do = B({}, hr, {
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
      getModifierState: Xi,
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
          : (e !== Dn &&
              (Dn && e.type === 'mousemove'
                ? ((Rl = e.screenX - Dn.screenX), (zl = e.screenY - Dn.screenY))
                : (zl = Rl = 0),
              (Dn = e)),
            Rl);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : zl;
      },
    }),
    Es = xe(Do),
    cf = B({}, Do, { dataTransfer: 0 }),
    df = xe(cf),
    pf = B({}, hr, { relatedTarget: 0 }),
    Ml = xe(pf),
    ff = B({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    mf = xe(ff),
    gf = B({}, xn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    yf = xe(gf),
    hf = B({}, xn, { data: 0 }),
    Ps = xe(hf),
    vf = {
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
    Sf = {
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
    kf = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function wf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = kf[e]) ? !!t[e] : !1;
  }
  function Xi() {
    return wf;
  }
  var xf = B({}, hr, {
      key: function (e) {
        if (e.key) {
          var t = vf[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = to(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Sf[e.keyCode] || 'Unidentified'
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
      getModifierState: Xi,
      charCode: function (e) {
        return e.type === 'keypress' ? to(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? to(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Cf = xe(xf),
    bf = B({}, Do, {
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
    Ls = xe(bf),
    Ef = B({}, hr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Xi,
    }),
    Pf = xe(Ef),
    Lf = B({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Tf = xe(Lf),
    Rf = B({}, Do, {
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
    zf = xe(Rf),
    Mf = [9, 13, 27, 32],
    Zi = nt && 'CompositionEvent' in window,
    Wn = null;
  nt && 'documentMode' in document && (Wn = document.documentMode);
  var Ff = nt && 'TextEvent' in window && !Wn,
    qu = nt && (!Zi || (Wn && 8 < Wn && 11 >= Wn)),
    Ts = ' ',
    Rs = !1;
  function Xu(e, t) {
    switch (e) {
      case 'keyup':
        return Mf.indexOf(t.keyCode) !== -1;
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
  function Zu(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Zt = !1;
  function Nf(e, t) {
    switch (e) {
      case 'compositionend':
        return Zu(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Rs = !0), Ts);
      case 'textInput':
        return ((e = t.data), e === Ts && Rs ? null : e);
      default:
        return null;
    }
  }
  function _f(e, t) {
    if (Zt)
      return e === 'compositionend' || (!Zi && Xu(e, t))
        ? ((e = Yu()), (eo = Yi = yt = null), (Zt = !1), e)
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
        return qu && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Df = {
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
  function zs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Df[e.type] : t === 'textarea';
  }
  function Ju(e, t, n, r) {
    (zu(r),
      (t = ho(t, 'onChange')),
      0 < t.length &&
        ((n = new qi('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t })));
  }
  var Qn = null,
    lr = null;
  function Af(e) {
    cc(e, 0);
  }
  function Ao(e) {
    var t = tn(e);
    if (Cu(t)) return e;
  }
  function If(e, t) {
    if (e === 'change') return t;
  }
  var ec = !1;
  nt &&
    (nt
      ? ((Ur = 'oninput' in document),
        Ur ||
          ((Fl = document.createElement('div')),
          Fl.setAttribute('oninput', 'return;'),
          (Ur = typeof Fl.oninput == 'function')),
        (Br = Ur))
      : (Br = !1),
    (ec = Br && (!document.documentMode || 9 < document.documentMode)));
  var Br, Ur, Fl;
  function Ms() {
    Qn && (Qn.detachEvent('onpropertychange', tc), (lr = Qn = null));
  }
  function tc(e) {
    if (e.propertyName === 'value' && Ao(lr)) {
      var t = [];
      (Ju(t, lr, e, Hi(e)), _u(Af, t));
    }
  }
  function Of(e, t, n) {
    e === 'focusin'
      ? (Ms(), (Qn = t), (lr = n), Qn.attachEvent('onpropertychange', tc))
      : e === 'focusout' && Ms();
  }
  function Vf(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ao(lr);
  }
  function $f(e, t) {
    if (e === 'click') return Ao(t);
  }
  function Bf(e, t) {
    if (e === 'input' || e === 'change') return Ao(t);
  }
  function Uf(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Ue = typeof Object.is == 'function' ? Object.is : Uf;
  function ir(e, t) {
    if (Ue(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var o = n[r];
      if (!Wl.call(t, o) || !Ue(e[o], t[o])) return !1;
    }
    return !0;
  }
  function Fs(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ns(e, t) {
    var n = Fs(e);
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
      n = Fs(n);
    }
  }
  function nc(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? nc(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function rc() {
    for (var e = window, t = uo(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == 'string';
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = uo(e.document);
    }
    return t;
  }
  function Ji(e) {
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
  function jf(e) {
    var t = rc(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && nc(n.ownerDocument.documentElement, n)) {
      if (r !== null && Ji(n)) {
        if (((t = r.start), (e = r.end), e === void 0 && (e = t), 'selectionStart' in n))
          ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
        ) {
          e = e.getSelection();
          var o = n.textContent.length,
            l = Math.min(r.start, o);
          ((r = r.end === void 0 ? l : Math.min(r.end, o)),
            !e.extend && l > r && ((o = r), (r = l), (l = o)),
            (o = Ns(n, l)));
          var i = Ns(n, r);
          o &&
            i &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== o.node ||
              e.anchorOffset !== o.offset ||
              e.focusNode !== i.node ||
              e.focusOffset !== i.offset) &&
            ((t = t.createRange()),
            t.setStart(o.node, o.offset),
            e.removeAllRanges(),
            l > r
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
  var Hf = nt && 'documentMode' in document && 11 >= document.documentMode,
    Jt = null,
    di = null,
    Gn = null,
    pi = !1;
  function _s(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    pi ||
      Jt == null ||
      Jt !== uo(r) ||
      ((r = Jt),
      'selectionStart' in r && Ji(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (Gn && ir(Gn, r)) ||
        ((Gn = r),
        (r = ho(di, 'onSelect')),
        0 < r.length &&
          ((t = new qi('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = Jt))));
  }
  function jr(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    );
  }
  var en = {
      animationend: jr('Animation', 'AnimationEnd'),
      animationiteration: jr('Animation', 'AnimationIteration'),
      animationstart: jr('Animation', 'AnimationStart'),
      transitionend: jr('Transition', 'TransitionEnd'),
    },
    Nl = {},
    oc = {};
  nt &&
    ((oc = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete en.animationend.animation,
      delete en.animationiteration.animation,
      delete en.animationstart.animation),
    'TransitionEvent' in window || delete en.transitionend.transition);
  function Io(e) {
    if (Nl[e]) return Nl[e];
    if (!en[e]) return e;
    var t = en[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in oc) return (Nl[e] = t[n]);
    return e;
  }
  var lc = Io('animationend'),
    ic = Io('animationiteration'),
    ac = Io('animationstart'),
    sc = Io('transitionend'),
    uc = new Map(),
    Ds =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
  function Tt(e, t) {
    (uc.set(e, t), Kt(t, [e]));
  }
  for (Hr = 0; Hr < Ds.length; Hr++)
    ((Kr = Ds[Hr]),
      (As = Kr.toLowerCase()),
      (Is = Kr[0].toUpperCase() + Kr.slice(1)),
      Tt(As, 'on' + Is));
  var Kr, As, Is, Hr;
  Tt(lc, 'onAnimationEnd');
  Tt(ic, 'onAnimationIteration');
  Tt(ac, 'onAnimationStart');
  Tt('dblclick', 'onDoubleClick');
  Tt('focusin', 'onFocus');
  Tt('focusout', 'onBlur');
  Tt(sc, 'onTransitionEnd');
  gn('onMouseEnter', ['mouseout', 'mouseover']);
  gn('onMouseLeave', ['mouseout', 'mouseover']);
  gn('onPointerEnter', ['pointerout', 'pointerover']);
  gn('onPointerLeave', ['pointerout', 'pointerover']);
  Kt('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' '));
  Kt(
    'onSelect',
    'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
      ' ',
    ),
  );
  Kt('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
  Kt('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' '));
  Kt('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' '));
  Kt(
    'onCompositionUpdate',
    'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
  );
  var jn =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' ',
      ),
    Kf = new Set('cancel close invalid load scroll toggle'.split(' ').concat(jn));
  function Os(e, t, n) {
    var r = e.type || 'unknown-event';
    ((e.currentTarget = n), Hp(r, t, void 0, e), (e.currentTarget = null));
  }
  function cc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        o = r.event;
      r = r.listeners;
      e: {
        var l = void 0;
        if (t)
          for (var i = r.length - 1; 0 <= i; i--) {
            var a = r[i],
              s = a.instance,
              c = a.currentTarget;
            if (((a = a.listener), s !== l && o.isPropagationStopped())) break e;
            (Os(o, a, c), (l = s));
          }
        else
          for (i = 0; i < r.length; i++) {
            if (
              ((a = r[i]),
              (s = a.instance),
              (c = a.currentTarget),
              (a = a.listener),
              s !== l && o.isPropagationStopped())
            )
              break e;
            (Os(o, a, c), (l = s));
          }
      }
    }
    if (po) throw ((e = ai), (po = !1), (ai = null), e);
  }
  function A(e, t) {
    var n = t[hi];
    n === void 0 && (n = t[hi] = new Set());
    var r = e + '__bubble';
    n.has(r) || (dc(t, e, 2, !1), n.add(r));
  }
  function _l(e, t, n) {
    var r = 0;
    (t && (r |= 4), dc(n, e, r, t));
  }
  var Wr = '_reactListening' + Math.random().toString(36).slice(2);
  function ar(e) {
    if (!e[Wr]) {
      ((e[Wr] = !0),
        vu.forEach(function (n) {
          n !== 'selectionchange' && (Kf.has(n) || _l(n, !1, e), _l(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Wr] || ((t[Wr] = !0), _l('selectionchange', !1, t));
    }
  }
  function dc(e, t, n, r) {
    switch (Gu(t)) {
      case 1:
        var o = af;
        break;
      case 4:
        o = sf;
        break;
      default:
        o = Gi;
    }
    ((n = o.bind(null, t, n, e)),
      (o = void 0),
      !ii || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (o = !0),
      r
        ? o !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: o })
          : e.addEventListener(t, n, !0)
        : o !== void 0
          ? e.addEventListener(t, n, { passive: o })
          : e.addEventListener(t, n, !1));
  }
  function Dl(e, t, n, r, o) {
    var l = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (;;) {
        if (r === null) return;
        var i = r.tag;
        if (i === 3 || i === 4) {
          var a = r.stateNode.containerInfo;
          if (a === o || (a.nodeType === 8 && a.parentNode === o)) break;
          if (i === 4)
            for (i = r.return; i !== null; ) {
              var s = i.tag;
              if (
                (s === 3 || s === 4) &&
                ((s = i.stateNode.containerInfo),
                s === o || (s.nodeType === 8 && s.parentNode === o))
              )
                return;
              i = i.return;
            }
          for (; a !== null; ) {
            if (((i = Dt(a)), i === null)) return;
            if (((s = i.tag), s === 5 || s === 6)) {
              r = l = i;
              continue e;
            }
            a = a.parentNode;
          }
        }
        r = r.return;
      }
    _u(function () {
      var c = l,
        g = Hi(n),
        m = [];
      e: {
        var y = uc.get(e);
        if (y !== void 0) {
          var w = qi,
            h = e;
          switch (e) {
            case 'keypress':
              if (to(n) === 0) break e;
            case 'keydown':
            case 'keyup':
              w = Cf;
              break;
            case 'focusin':
              ((h = 'focus'), (w = Ml));
              break;
            case 'focusout':
              ((h = 'blur'), (w = Ml));
              break;
            case 'beforeblur':
            case 'afterblur':
              w = Ml;
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
              w = Es;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              w = df;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              w = Pf;
              break;
            case lc:
            case ic:
            case ac:
              w = mf;
              break;
            case sc:
              w = Tf;
              break;
            case 'scroll':
              w = uf;
              break;
            case 'wheel':
              w = zf;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              w = yf;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              w = Ls;
          }
          var v = (t & 4) !== 0,
            L = !v && e === 'scroll',
            d = v ? (y !== null ? y + 'Capture' : null) : y;
          v = [];
          for (var u = c, p; u !== null; ) {
            p = u;
            var S = p.stateNode;
            if (
              (p.tag === 5 &&
                S !== null &&
                ((p = S), d !== null && ((S = tr(u, d)), S != null && v.push(sr(u, S, p)))),
              L)
            )
              break;
            u = u.return;
          }
          0 < v.length && ((y = new w(y, h, null, n, g)), m.push({ event: y, listeners: v }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((y = e === 'mouseover' || e === 'pointerover'),
            (w = e === 'mouseout' || e === 'pointerout'),
            y && n !== oi && (h = n.relatedTarget || n.fromElement) && (Dt(h) || h[rt]))
          )
            break e;
          if (
            (w || y) &&
            ((y =
              g.window === g
                ? g
                : (y = g.ownerDocument)
                  ? y.defaultView || y.parentWindow
                  : window),
            w
              ? ((h = n.relatedTarget || n.toElement),
                (w = c),
                (h = h ? Dt(h) : null),
                h !== null && ((L = Wt(h)), h !== L || (h.tag !== 5 && h.tag !== 6)) && (h = null))
              : ((w = null), (h = c)),
            w !== h)
          ) {
            if (
              ((v = Es),
              (S = 'onMouseLeave'),
              (d = 'onMouseEnter'),
              (u = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((v = Ls), (S = 'onPointerLeave'), (d = 'onPointerEnter'), (u = 'pointer')),
              (L = w == null ? y : tn(w)),
              (p = h == null ? y : tn(h)),
              (y = new v(S, u + 'leave', w, n, g)),
              (y.target = L),
              (y.relatedTarget = p),
              (S = null),
              Dt(g) === c &&
                ((v = new v(d, u + 'enter', h, n, g)),
                (v.target = p),
                (v.relatedTarget = L),
                (S = v)),
              (L = S),
              w && h)
            )
              t: {
                for (v = w, d = h, u = 0, p = v; p; p = Yt(p)) u++;
                for (p = 0, S = d; S; S = Yt(S)) p++;
                for (; 0 < u - p; ) ((v = Yt(v)), u--);
                for (; 0 < p - u; ) ((d = Yt(d)), p--);
                for (; u--; ) {
                  if (v === d || (d !== null && v === d.alternate)) break t;
                  ((v = Yt(v)), (d = Yt(d)));
                }
                v = null;
              }
            else v = null;
            (w !== null && Vs(m, y, w, v, !1), h !== null && L !== null && Vs(m, L, h, v, !0));
          }
        }
        e: {
          if (
            ((y = c ? tn(c) : window),
            (w = y.nodeName && y.nodeName.toLowerCase()),
            w === 'select' || (w === 'input' && y.type === 'file'))
          )
            var x = If;
          else if (zs(y))
            if (ec) x = Bf;
            else {
              x = Vf;
              var E = Of;
            }
          else
            (w = y.nodeName) &&
              w.toLowerCase() === 'input' &&
              (y.type === 'checkbox' || y.type === 'radio') &&
              (x = $f);
          if (x && (x = x(e, c))) {
            Ju(m, x, n, g);
            break e;
          }
          (E && E(e, y, c),
            e === 'focusout' &&
              (E = y._wrapperState) &&
              E.controlled &&
              y.type === 'number' &&
              Jl(y, 'number', y.value));
        }
        switch (((E = c ? tn(c) : window), e)) {
          case 'focusin':
            (zs(E) || E.contentEditable === 'true') && ((Jt = E), (di = c), (Gn = null));
            break;
          case 'focusout':
            Gn = di = Jt = null;
            break;
          case 'mousedown':
            pi = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((pi = !1), _s(m, n, g));
            break;
          case 'selectionchange':
            if (Hf) break;
          case 'keydown':
          case 'keyup':
            _s(m, n, g);
        }
        var P;
        if (Zi)
          e: {
            switch (e) {
              case 'compositionstart':
                var T = 'onCompositionStart';
                break e;
              case 'compositionend':
                T = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                T = 'onCompositionUpdate';
                break e;
            }
            T = void 0;
          }
        else
          Zt
            ? Xu(e, n) && (T = 'onCompositionEnd')
            : e === 'keydown' && n.keyCode === 229 && (T = 'onCompositionStart');
        (T &&
          (qu &&
            n.locale !== 'ko' &&
            (Zt || T !== 'onCompositionStart'
              ? T === 'onCompositionEnd' && Zt && (P = Yu())
              : ((yt = g), (Yi = 'value' in yt ? yt.value : yt.textContent), (Zt = !0))),
          (E = ho(c, T)),
          0 < E.length &&
            ((T = new Ps(T, e, null, n, g)),
            m.push({ event: T, listeners: E }),
            P ? (T.data = P) : ((P = Zu(n)), P !== null && (T.data = P)))),
          (P = Ff ? Nf(e, n) : _f(e, n)) &&
            ((c = ho(c, 'onBeforeInput')),
            0 < c.length &&
              ((g = new Ps('onBeforeInput', 'beforeinput', null, n, g)),
              m.push({ event: g, listeners: c }),
              (g.data = P))));
      }
      cc(m, t);
    });
  }
  function sr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function ho(e, t) {
    for (var n = t + 'Capture', r = []; e !== null; ) {
      var o = e,
        l = o.stateNode;
      (o.tag === 5 &&
        l !== null &&
        ((o = l),
        (l = tr(e, n)),
        l != null && r.unshift(sr(e, l, o)),
        (l = tr(e, t)),
        l != null && r.push(sr(e, l, o))),
        (e = e.return));
    }
    return r;
  }
  function Yt(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Vs(e, t, n, r, o) {
    for (var l = t._reactName, i = []; n !== null && n !== r; ) {
      var a = n,
        s = a.alternate,
        c = a.stateNode;
      if (s !== null && s === r) break;
      (a.tag === 5 &&
        c !== null &&
        ((a = c),
        o
          ? ((s = tr(n, l)), s != null && i.unshift(sr(n, s, a)))
          : o || ((s = tr(n, l)), s != null && i.push(sr(n, s, a)))),
        (n = n.return));
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var Wf = /\r\n?/g,
    Qf = /\u0000|\uFFFD/g;
  function $s(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Wf,
        `
`,
      )
      .replace(Qf, '');
  }
  function Qr(e, t, n) {
    if (((t = $s(t)), $s(e) !== t && n)) throw Error(k(425));
  }
  function vo() {}
  var fi = null,
    mi = null;
  function gi(e, t) {
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
  var yi = typeof setTimeout == 'function' ? setTimeout : void 0,
    Gf = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Bs = typeof Promise == 'function' ? Promise : void 0,
    Yf =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Bs < 'u'
          ? function (e) {
              return Bs.resolve(null).then(e).catch(qf);
            }
          : yi;
  function qf(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Al(e, t) {
    var n = t,
      r = 0;
    do {
      var o = n.nextSibling;
      if ((e.removeChild(n), o && o.nodeType === 8))
        if (((n = o.data), n === '/$')) {
          if (r === 0) {
            (e.removeChild(o), or(t));
            return;
          }
          r--;
        } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
      n = o;
    } while (n);
    or(t);
  }
  function wt(e) {
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
  function Us(e) {
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
  var Cn = Math.random().toString(36).slice(2),
    Qe = '__reactFiber$' + Cn,
    ur = '__reactProps$' + Cn,
    rt = '__reactContainer$' + Cn,
    hi = '__reactEvents$' + Cn,
    Xf = '__reactListeners$' + Cn,
    Zf = '__reactHandles$' + Cn;
  function Dt(e) {
    var t = e[Qe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[rt] || n[Qe])) {
        if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
          for (e = Us(e); e !== null; ) {
            if ((n = e[Qe])) return n;
            e = Us(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function vr(e) {
    return (
      (e = e[Qe] || e[rt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
    );
  }
  function tn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(k(33));
  }
  function Oo(e) {
    return e[ur] || null;
  }
  var vi = [],
    nn = -1;
  function Rt(e) {
    return { current: e };
  }
  function I(e) {
    0 > nn || ((e.current = vi[nn]), (vi[nn] = null), nn--);
  }
  function D(e, t) {
    (nn++, (vi[nn] = e.current), (e.current = t));
  }
  var Lt = {},
    le = Rt(Lt),
    me = Rt(!1),
    $t = Lt;
  function yn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Lt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var o = {},
      l;
    for (l in n) o[l] = t[l];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = o)),
      o
    );
  }
  function ge(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function So() {
    (I(me), I(le));
  }
  function js(e, t, n) {
    if (le.current !== Lt) throw Error(k(168));
    (D(le, t), D(me, n));
  }
  function pc(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != 'function')) return n;
    r = r.getChildContext();
    for (var o in r) if (!(o in t)) throw Error(k(108, Ip(e) || 'Unknown', o));
    return B({}, n, r);
  }
  function ko(e) {
    return (
      (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Lt),
      ($t = le.current),
      D(le, e),
      D(me, me.current),
      !0
    );
  }
  function Hs(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(k(169));
    (n
      ? ((e = pc(e, t, $t)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        I(me),
        I(le),
        D(le, e))
      : I(me),
      D(me, n));
  }
  var Ze = null,
    Vo = !1,
    Il = !1;
  function fc(e) {
    Ze === null ? (Ze = [e]) : Ze.push(e);
  }
  function Jf(e) {
    ((Vo = !0), fc(e));
  }
  function zt() {
    if (!Il && Ze !== null) {
      Il = !0;
      var e = 0,
        t = N;
      try {
        var n = Ze;
        for (N = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        ((Ze = null), (Vo = !1));
      } catch (o) {
        throw (Ze !== null && (Ze = Ze.slice(e + 1)), Ou(Ki, zt), o);
      } finally {
        ((N = t), (Il = !1));
      }
    }
    return null;
  }
  var rn = [],
    on = 0,
    wo = null,
    xo = 0,
    Te = [],
    Re = 0,
    Bt = null,
    Je = 1,
    et = '';
  function Nt(e, t) {
    ((rn[on++] = xo), (rn[on++] = wo), (wo = e), (xo = t));
  }
  function mc(e, t, n) {
    ((Te[Re++] = Je), (Te[Re++] = et), (Te[Re++] = Bt), (Bt = e));
    var r = Je;
    e = et;
    var o = 32 - $e(r) - 1;
    ((r &= ~(1 << o)), (n += 1));
    var l = 32 - $e(t) + o;
    if (30 < l) {
      var i = o - (o % 5);
      ((l = (r & ((1 << i) - 1)).toString(32)),
        (r >>= i),
        (o -= i),
        (Je = (1 << (32 - $e(t) + o)) | (n << o) | r),
        (et = l + e));
    } else ((Je = (1 << l) | (n << o) | r), (et = e));
  }
  function ea(e) {
    e.return !== null && (Nt(e, 1), mc(e, 1, 0));
  }
  function ta(e) {
    for (; e === wo; ) ((wo = rn[--on]), (rn[on] = null), (xo = rn[--on]), (rn[on] = null));
    for (; e === Bt; )
      ((Bt = Te[--Re]),
        (Te[Re] = null),
        (et = Te[--Re]),
        (Te[Re] = null),
        (Je = Te[--Re]),
        (Te[Re] = null));
  }
  var ke = null,
    Se = null,
    O = !1,
    Ve = null;
  function gc(e, t) {
    var n = ze(5, null, null, 0);
    ((n.elementType = 'DELETED'),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function Ks(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
          t !== null ? ((e.stateNode = t), (ke = e), (Se = wt(t.firstChild)), !0) : !1
        );
      case 6:
        return (
          (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (ke = e), (Se = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = Bt !== null ? { id: Je, overflow: et } : null),
              (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
              (n = ze(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (ke = e),
              (Se = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Si(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function ki(e) {
    if (O) {
      var t = Se;
      if (t) {
        var n = t;
        if (!Ks(e, t)) {
          if (Si(e)) throw Error(k(418));
          t = wt(n.nextSibling);
          var r = ke;
          t && Ks(e, t) ? gc(r, n) : ((e.flags = (e.flags & -4097) | 2), (O = !1), (ke = e));
        }
      } else {
        if (Si(e)) throw Error(k(418));
        ((e.flags = (e.flags & -4097) | 2), (O = !1), (ke = e));
      }
    }
  }
  function Ws(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    ke = e;
  }
  function Gr(e) {
    if (e !== ke) return !1;
    if (!O) return (Ws(e), (O = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type), (t = t !== 'head' && t !== 'body' && !gi(e.type, e.memoizedProps))),
      t && (t = Se))
    ) {
      if (Si(e)) throw (yc(), Error(k(418)));
      for (; t; ) (gc(e, t), (t = wt(t.nextSibling)));
    }
    if ((Ws(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(k(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === '/$') {
              if (t === 0) {
                Se = wt(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
          }
          e = e.nextSibling;
        }
        Se = null;
      }
    } else Se = ke ? wt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function yc() {
    for (var e = Se; e; ) e = wt(e.nextSibling);
  }
  function hn() {
    ((Se = ke = null), (O = !1));
  }
  function na(e) {
    Ve === null ? (Ve = [e]) : Ve.push(e);
  }
  var em = it.ReactCurrentBatchConfig;
  function An(e, t, n) {
    if (((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(k(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(k(147, e));
        var o = r,
          l = '' + e;
        return t !== null && t.ref !== null && typeof t.ref == 'function' && t.ref._stringRef === l
          ? t.ref
          : ((t = function (i) {
              var a = o.refs;
              i === null ? delete a[l] : (a[l] = i);
            }),
            (t._stringRef = l),
            t);
      }
      if (typeof e != 'string') throw Error(k(284));
      if (!n._owner) throw Error(k(290, e));
    }
    return e;
  }
  function Yr(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        k(31, e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e),
      )
    );
  }
  function Qs(e) {
    var t = e._init;
    return t(e._payload);
  }
  function hc(e) {
    function t(d, u) {
      if (e) {
        var p = d.deletions;
        p === null ? ((d.deletions = [u]), (d.flags |= 16)) : p.push(u);
      }
    }
    function n(d, u) {
      if (!e) return null;
      for (; u !== null; ) (t(d, u), (u = u.sibling));
      return null;
    }
    function r(d, u) {
      for (d = new Map(); u !== null; )
        (u.key !== null ? d.set(u.key, u) : d.set(u.index, u), (u = u.sibling));
      return d;
    }
    function o(d, u) {
      return ((d = Et(d, u)), (d.index = 0), (d.sibling = null), d);
    }
    function l(d, u, p) {
      return (
        (d.index = p),
        e
          ? ((p = d.alternate),
            p !== null ? ((p = p.index), p < u ? ((d.flags |= 2), u) : p) : ((d.flags |= 2), u))
          : ((d.flags |= 1048576), u)
      );
    }
    function i(d) {
      return (e && d.alternate === null && (d.flags |= 2), d);
    }
    function a(d, u, p, S) {
      return u === null || u.tag !== 6
        ? ((u = Hl(p, d.mode, S)), (u.return = d), u)
        : ((u = o(u, p)), (u.return = d), u);
    }
    function s(d, u, p, S) {
      var x = p.type;
      return x === Xt
        ? g(d, u, p.props.children, S, p.key)
        : u !== null &&
            (u.elementType === x ||
              (typeof x == 'object' && x !== null && x.$$typeof === pt && Qs(x) === u.type))
          ? ((S = o(u, p.props)), (S.ref = An(d, u, p)), (S.return = d), S)
          : ((S = so(p.type, p.key, p.props, null, d.mode, S)),
            (S.ref = An(d, u, p)),
            (S.return = d),
            S);
    }
    function c(d, u, p, S) {
      return u === null ||
        u.tag !== 4 ||
        u.stateNode.containerInfo !== p.containerInfo ||
        u.stateNode.implementation !== p.implementation
        ? ((u = Kl(p, d.mode, S)), (u.return = d), u)
        : ((u = o(u, p.children || [])), (u.return = d), u);
    }
    function g(d, u, p, S, x) {
      return u === null || u.tag !== 7
        ? ((u = Vt(p, d.mode, S, x)), (u.return = d), u)
        : ((u = o(u, p)), (u.return = d), u);
    }
    function m(d, u, p) {
      if ((typeof u == 'string' && u !== '') || typeof u == 'number')
        return ((u = Hl('' + u, d.mode, p)), (u.return = d), u);
      if (typeof u == 'object' && u !== null) {
        switch (u.$$typeof) {
          case _r:
            return (
              (p = so(u.type, u.key, u.props, null, d.mode, p)),
              (p.ref = An(d, null, u)),
              (p.return = d),
              p
            );
          case qt:
            return ((u = Kl(u, d.mode, p)), (u.return = d), u);
          case pt:
            var S = u._init;
            return m(d, S(u._payload), p);
        }
        if (Bn(u) || Fn(u)) return ((u = Vt(u, d.mode, p, null)), (u.return = d), u);
        Yr(d, u);
      }
      return null;
    }
    function y(d, u, p, S) {
      var x = u !== null ? u.key : null;
      if ((typeof p == 'string' && p !== '') || typeof p == 'number')
        return x !== null ? null : a(d, u, '' + p, S);
      if (typeof p == 'object' && p !== null) {
        switch (p.$$typeof) {
          case _r:
            return p.key === x ? s(d, u, p, S) : null;
          case qt:
            return p.key === x ? c(d, u, p, S) : null;
          case pt:
            return ((x = p._init), y(d, u, x(p._payload), S));
        }
        if (Bn(p) || Fn(p)) return x !== null ? null : g(d, u, p, S, null);
        Yr(d, p);
      }
      return null;
    }
    function w(d, u, p, S, x) {
      if ((typeof S == 'string' && S !== '') || typeof S == 'number')
        return ((d = d.get(p) || null), a(u, d, '' + S, x));
      if (typeof S == 'object' && S !== null) {
        switch (S.$$typeof) {
          case _r:
            return ((d = d.get(S.key === null ? p : S.key) || null), s(u, d, S, x));
          case qt:
            return ((d = d.get(S.key === null ? p : S.key) || null), c(u, d, S, x));
          case pt:
            var E = S._init;
            return w(d, u, p, E(S._payload), x);
        }
        if (Bn(S) || Fn(S)) return ((d = d.get(p) || null), g(u, d, S, x, null));
        Yr(u, S);
      }
      return null;
    }
    function h(d, u, p, S) {
      for (var x = null, E = null, P = u, T = (u = 0), Y = null; P !== null && T < p.length; T++) {
        P.index > T ? ((Y = P), (P = null)) : (Y = P.sibling);
        var F = y(d, P, p[T], S);
        if (F === null) {
          P === null && (P = Y);
          break;
        }
        (e && P && F.alternate === null && t(d, P),
          (u = l(F, u, T)),
          E === null ? (x = F) : (E.sibling = F),
          (E = F),
          (P = Y));
      }
      if (T === p.length) return (n(d, P), O && Nt(d, T), x);
      if (P === null) {
        for (; T < p.length; T++)
          ((P = m(d, p[T], S)),
            P !== null && ((u = l(P, u, T)), E === null ? (x = P) : (E.sibling = P), (E = P)));
        return (O && Nt(d, T), x);
      }
      for (P = r(d, P); T < p.length; T++)
        ((Y = w(P, d, T, p[T], S)),
          Y !== null &&
            (e && Y.alternate !== null && P.delete(Y.key === null ? T : Y.key),
            (u = l(Y, u, T)),
            E === null ? (x = Y) : (E.sibling = Y),
            (E = Y)));
      return (
        e &&
          P.forEach(function (ut) {
            return t(d, ut);
          }),
        O && Nt(d, T),
        x
      );
    }
    function v(d, u, p, S) {
      var x = Fn(p);
      if (typeof x != 'function') throw Error(k(150));
      if (((p = x.call(p)), p == null)) throw Error(k(151));
      for (
        var E = (x = null), P = u, T = (u = 0), Y = null, F = p.next();
        P !== null && !F.done;
        T++, F = p.next()
      ) {
        P.index > T ? ((Y = P), (P = null)) : (Y = P.sibling);
        var ut = y(d, P, F.value, S);
        if (ut === null) {
          P === null && (P = Y);
          break;
        }
        (e && P && ut.alternate === null && t(d, P),
          (u = l(ut, u, T)),
          E === null ? (x = ut) : (E.sibling = ut),
          (E = ut),
          (P = Y));
      }
      if (F.done) return (n(d, P), O && Nt(d, T), x);
      if (P === null) {
        for (; !F.done; T++, F = p.next())
          ((F = m(d, F.value, S)),
            F !== null && ((u = l(F, u, T)), E === null ? (x = F) : (E.sibling = F), (E = F)));
        return (O && Nt(d, T), x);
      }
      for (P = r(d, P); !F.done; T++, F = p.next())
        ((F = w(P, d, T, F.value, S)),
          F !== null &&
            (e && F.alternate !== null && P.delete(F.key === null ? T : F.key),
            (u = l(F, u, T)),
            E === null ? (x = F) : (E.sibling = F),
            (E = F)));
      return (
        e &&
          P.forEach(function (sp) {
            return t(d, sp);
          }),
        O && Nt(d, T),
        x
      );
    }
    function L(d, u, p, S) {
      if (
        (typeof p == 'object' &&
          p !== null &&
          p.type === Xt &&
          p.key === null &&
          (p = p.props.children),
        typeof p == 'object' && p !== null)
      ) {
        switch (p.$$typeof) {
          case _r:
            e: {
              for (var x = p.key, E = u; E !== null; ) {
                if (E.key === x) {
                  if (((x = p.type), x === Xt)) {
                    if (E.tag === 7) {
                      (n(d, E.sibling), (u = o(E, p.props.children)), (u.return = d), (d = u));
                      break e;
                    }
                  } else if (
                    E.elementType === x ||
                    (typeof x == 'object' && x !== null && x.$$typeof === pt && Qs(x) === E.type)
                  ) {
                    (n(d, E.sibling),
                      (u = o(E, p.props)),
                      (u.ref = An(d, E, p)),
                      (u.return = d),
                      (d = u));
                    break e;
                  }
                  n(d, E);
                  break;
                } else t(d, E);
                E = E.sibling;
              }
              p.type === Xt
                ? ((u = Vt(p.props.children, d.mode, S, p.key)), (u.return = d), (d = u))
                : ((S = so(p.type, p.key, p.props, null, d.mode, S)),
                  (S.ref = An(d, u, p)),
                  (S.return = d),
                  (d = S));
            }
            return i(d);
          case qt:
            e: {
              for (E = p.key; u !== null; ) {
                if (u.key === E)
                  if (
                    u.tag === 4 &&
                    u.stateNode.containerInfo === p.containerInfo &&
                    u.stateNode.implementation === p.implementation
                  ) {
                    (n(d, u.sibling), (u = o(u, p.children || [])), (u.return = d), (d = u));
                    break e;
                  } else {
                    n(d, u);
                    break;
                  }
                else t(d, u);
                u = u.sibling;
              }
              ((u = Kl(p, d.mode, S)), (u.return = d), (d = u));
            }
            return i(d);
          case pt:
            return ((E = p._init), L(d, u, E(p._payload), S));
        }
        if (Bn(p)) return h(d, u, p, S);
        if (Fn(p)) return v(d, u, p, S);
        Yr(d, p);
      }
      return (typeof p == 'string' && p !== '') || typeof p == 'number'
        ? ((p = '' + p),
          u !== null && u.tag === 6
            ? (n(d, u.sibling), (u = o(u, p)), (u.return = d), (d = u))
            : (n(d, u), (u = Hl(p, d.mode, S)), (u.return = d), (d = u)),
          i(d))
        : n(d, u);
    }
    return L;
  }
  var vn = hc(!0),
    vc = hc(!1),
    Co = Rt(null),
    bo = null,
    ln = null,
    ra = null;
  function oa() {
    ra = ln = bo = null;
  }
  function la(e) {
    var t = Co.current;
    (I(Co), (e._currentValue = t));
  }
  function wi(e, t, n) {
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
  function fn(e, t) {
    ((bo = e),
      (ra = ln = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (fe = !0), (e.firstContext = null)));
  }
  function Fe(e) {
    var t = e._currentValue;
    if (ra !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), ln === null)) {
        if (bo === null) throw Error(k(308));
        ((ln = e), (bo.dependencies = { lanes: 0, firstContext: e }));
      } else ln = ln.next = e;
    return t;
  }
  var At = null;
  function ia(e) {
    At === null ? (At = [e]) : At.push(e);
  }
  function Sc(e, t, n, r) {
    var o = t.interleaved;
    return (
      o === null ? ((n.next = n), ia(t)) : ((n.next = o.next), (o.next = n)),
      (t.interleaved = n),
      ot(e, r)
    );
  }
  function ot(e, t) {
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
  var ft = !1;
  function aa(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function kc(e, t) {
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
  function tt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function xt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), (M & 2) !== 0)) {
      var o = r.pending;
      return (
        o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
        (r.pending = t),
        ot(e, n)
      );
    }
    return (
      (o = r.interleaved),
      o === null ? ((t.next = t), ia(r)) : ((t.next = o.next), (o.next = t)),
      (r.interleaved = t),
      ot(e, n)
    );
  }
  function no(e, t, n) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Wi(e, n));
    }
  }
  function Gs(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var o = null,
        l = null;
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
          (l === null ? (o = l = i) : (l = l.next = i), (n = n.next));
        } while (n !== null);
        l === null ? (o = l = t) : (l = l.next = t);
      } else o = l = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: l,
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
  function Eo(e, t, n, r) {
    var o = e.updateQueue;
    ft = !1;
    var l = o.firstBaseUpdate,
      i = o.lastBaseUpdate,
      a = o.shared.pending;
    if (a !== null) {
      o.shared.pending = null;
      var s = a,
        c = s.next;
      ((s.next = null), i === null ? (l = c) : (i.next = c), (i = s));
      var g = e.alternate;
      g !== null &&
        ((g = g.updateQueue),
        (a = g.lastBaseUpdate),
        a !== i && (a === null ? (g.firstBaseUpdate = c) : (a.next = c), (g.lastBaseUpdate = s)));
    }
    if (l !== null) {
      var m = o.baseState;
      ((i = 0), (g = c = s = null), (a = l));
      do {
        var y = a.lane,
          w = a.eventTime;
        if ((r & y) === y) {
          g !== null &&
            (g = g.next =
              {
                eventTime: w,
                lane: 0,
                tag: a.tag,
                payload: a.payload,
                callback: a.callback,
                next: null,
              });
          e: {
            var h = e,
              v = a;
            switch (((y = t), (w = n), v.tag)) {
              case 1:
                if (((h = v.payload), typeof h == 'function')) {
                  m = h.call(w, m, y);
                  break e;
                }
                m = h;
                break e;
              case 3:
                h.flags = (h.flags & -65537) | 128;
              case 0:
                if (
                  ((h = v.payload), (y = typeof h == 'function' ? h.call(w, m, y) : h), y == null)
                )
                  break e;
                m = B({}, m, y);
                break e;
              case 2:
                ft = !0;
            }
          }
          a.callback !== null &&
            a.lane !== 0 &&
            ((e.flags |= 64), (y = o.effects), y === null ? (o.effects = [a]) : y.push(a));
        } else
          ((w = {
            eventTime: w,
            lane: y,
            tag: a.tag,
            payload: a.payload,
            callback: a.callback,
            next: null,
          }),
            g === null ? ((c = g = w), (s = m)) : (g = g.next = w),
            (i |= y));
        if (((a = a.next), a === null)) {
          if (((a = o.shared.pending), a === null)) break;
          ((y = a),
            (a = y.next),
            (y.next = null),
            (o.lastBaseUpdate = y),
            (o.shared.pending = null));
        }
      } while (!0);
      if (
        (g === null && (s = m),
        (o.baseState = s),
        (o.firstBaseUpdate = c),
        (o.lastBaseUpdate = g),
        (t = o.shared.interleaved),
        t !== null)
      ) {
        o = t;
        do ((i |= o.lane), (o = o.next));
        while (o !== t);
      } else l === null && (o.shared.lanes = 0);
      ((jt |= i), (e.lanes = i), (e.memoizedState = m));
    }
  }
  function Ys(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          o = r.callback;
        if (o !== null) {
          if (((r.callback = null), (r = n), typeof o != 'function')) throw Error(k(191, o));
          o.call(r);
        }
      }
  }
  var Sr = {},
    Ye = Rt(Sr),
    cr = Rt(Sr),
    dr = Rt(Sr);
  function It(e) {
    if (e === Sr) throw Error(k(174));
    return e;
  }
  function sa(e, t) {
    switch ((D(dr, t), D(cr, e), D(Ye, Sr), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : ti(null, '');
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = ti(t, e)));
    }
    (I(Ye), D(Ye, t));
  }
  function Sn() {
    (I(Ye), I(cr), I(dr));
  }
  function wc(e) {
    It(dr.current);
    var t = It(Ye.current),
      n = ti(t, e.type);
    t !== n && (D(cr, e), D(Ye, n));
  }
  function ua(e) {
    cr.current === e && (I(Ye), I(cr));
  }
  var V = Rt(0);
  function Po(e) {
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
  var Ol = [];
  function ca() {
    for (var e = 0; e < Ol.length; e++) Ol[e]._workInProgressVersionPrimary = null;
    Ol.length = 0;
  }
  var ro = it.ReactCurrentDispatcher,
    Vl = it.ReactCurrentBatchConfig,
    Ut = 0,
    $ = null,
    Q = null,
    q = null,
    Lo = !1,
    Yn = !1,
    pr = 0,
    tm = 0;
  function ne() {
    throw Error(k(321));
  }
  function da(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!Ue(e[n], t[n])) return !1;
    return !0;
  }
  function pa(e, t, n, r, o, l) {
    if (
      ((Ut = l),
      ($ = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (ro.current = e === null || e.memoizedState === null ? lm : im),
      (e = n(r, o)),
      Yn)
    ) {
      l = 0;
      do {
        if (((Yn = !1), (pr = 0), 25 <= l)) throw Error(k(301));
        ((l += 1), (q = Q = null), (t.updateQueue = null), (ro.current = am), (e = n(r, o)));
      } while (Yn);
    }
    if (
      ((ro.current = To),
      (t = Q !== null && Q.next !== null),
      (Ut = 0),
      (q = Q = $ = null),
      (Lo = !1),
      t)
    )
      throw Error(k(300));
    return e;
  }
  function fa() {
    var e = pr !== 0;
    return ((pr = 0), e);
  }
  function We() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (q === null ? ($.memoizedState = q = e) : (q = q.next = e), q);
  }
  function Ne() {
    if (Q === null) {
      var e = $.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Q.next;
    var t = q === null ? $.memoizedState : q.next;
    if (t !== null) ((q = t), (Q = e));
    else {
      if (e === null) throw Error(k(310));
      ((Q = e),
        (e = {
          memoizedState: Q.memoizedState,
          baseState: Q.baseState,
          baseQueue: Q.baseQueue,
          queue: Q.queue,
          next: null,
        }),
        q === null ? ($.memoizedState = q = e) : (q = q.next = e));
    }
    return q;
  }
  function fr(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function $l(e) {
    var t = Ne(),
      n = t.queue;
    if (n === null) throw Error(k(311));
    n.lastRenderedReducer = e;
    var r = Q,
      o = r.baseQueue,
      l = n.pending;
    if (l !== null) {
      if (o !== null) {
        var i = o.next;
        ((o.next = l.next), (l.next = i));
      }
      ((r.baseQueue = o = l), (n.pending = null));
    }
    if (o !== null) {
      ((l = o.next), (r = r.baseState));
      var a = (i = null),
        s = null,
        c = l;
      do {
        var g = c.lane;
        if ((Ut & g) === g)
          (s !== null &&
            (s = s.next =
              {
                lane: 0,
                action: c.action,
                hasEagerState: c.hasEagerState,
                eagerState: c.eagerState,
                next: null,
              }),
            (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
        else {
          var m = {
            lane: g,
            action: c.action,
            hasEagerState: c.hasEagerState,
            eagerState: c.eagerState,
            next: null,
          };
          (s === null ? ((a = s = m), (i = r)) : (s = s.next = m), ($.lanes |= g), (jt |= g));
        }
        c = c.next;
      } while (c !== null && c !== l);
      (s === null ? (i = r) : (s.next = a),
        Ue(r, t.memoizedState) || (fe = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
      o = e;
      do ((l = o.lane), ($.lanes |= l), (jt |= l), (o = o.next));
      while (o !== e);
    } else o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Bl(e) {
    var t = Ne(),
      n = t.queue;
    if (n === null) throw Error(k(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      o = n.pending,
      l = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var i = (o = o.next);
      do ((l = e(l, i.action)), (i = i.next));
      while (i !== o);
      (Ue(l, t.memoizedState) || (fe = !0),
        (t.memoizedState = l),
        t.baseQueue === null && (t.baseState = l),
        (n.lastRenderedState = l));
    }
    return [l, r];
  }
  function xc() {}
  function Cc(e, t) {
    var n = $,
      r = Ne(),
      o = t(),
      l = !Ue(r.memoizedState, o);
    if (
      (l && ((r.memoizedState = o), (fe = !0)),
      (r = r.queue),
      ma(Pc.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || l || (q !== null && q.memoizedState.tag & 1))
    ) {
      if (((n.flags |= 2048), mr(9, Ec.bind(null, n, r, o, t), void 0, null), X === null))
        throw Error(k(349));
      (Ut & 30) !== 0 || bc(n, t, o);
    }
    return o;
  }
  function bc(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = $.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }), ($.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Ec(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), Lc(t) && Tc(e));
  }
  function Pc(e, t, n) {
    return n(function () {
      Lc(t) && Tc(e);
    });
  }
  function Lc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Ue(e, n);
    } catch {
      return !0;
    }
  }
  function Tc(e) {
    var t = ot(e, 1);
    t !== null && Be(t, e, 1, -1);
  }
  function qs(e) {
    var t = We();
    return (
      typeof e == 'function' && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: fr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = om.bind(null, $, e)),
      [t.memoizedState, e]
    );
  }
  function mr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = $.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          ($.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function Rc() {
    return Ne().memoizedState;
  }
  function oo(e, t, n, r) {
    var o = We();
    (($.flags |= e), (o.memoizedState = mr(1 | t, n, void 0, r === void 0 ? null : r)));
  }
  function $o(e, t, n, r) {
    var o = Ne();
    r = r === void 0 ? null : r;
    var l = void 0;
    if (Q !== null) {
      var i = Q.memoizedState;
      if (((l = i.destroy), r !== null && da(r, i.deps))) {
        o.memoizedState = mr(t, n, l, r);
        return;
      }
    }
    (($.flags |= e), (o.memoizedState = mr(1 | t, n, l, r)));
  }
  function Xs(e, t) {
    return oo(8390656, 8, e, t);
  }
  function ma(e, t) {
    return $o(2048, 8, e, t);
  }
  function zc(e, t) {
    return $o(4, 2, e, t);
  }
  function Mc(e, t) {
    return $o(4, 4, e, t);
  }
  function Fc(e, t) {
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
  function Nc(e, t, n) {
    return ((n = n != null ? n.concat([e]) : null), $o(4, 4, Fc.bind(null, t, e), n));
  }
  function ga() {}
  function _c(e, t) {
    var n = Ne();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && da(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
  }
  function Dc(e, t) {
    var n = Ne();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && da(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Ac(e, t, n) {
    return (Ut & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (fe = !0)), (e.memoizedState = n))
      : (Ue(n, t) || ((n = Bu()), ($.lanes |= n), (jt |= n), (e.baseState = !0)), t);
  }
  function nm(e, t) {
    var n = N;
    ((N = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = Vl.transition;
    Vl.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((N = n), (Vl.transition = r));
    }
  }
  function Ic() {
    return Ne().memoizedState;
  }
  function rm(e, t, n) {
    var r = bt(e);
    if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Oc(e)))
      Vc(t, n);
    else if (((n = Sc(e, t, n, r)), n !== null)) {
      var o = ce();
      (Be(n, e, r, o), $c(n, t, r));
    }
  }
  function om(e, t, n) {
    var r = bt(e),
      o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (Oc(e)) Vc(t, o);
    else {
      var l = e.alternate;
      if (
        e.lanes === 0 &&
        (l === null || l.lanes === 0) &&
        ((l = t.lastRenderedReducer), l !== null)
      )
        try {
          var i = t.lastRenderedState,
            a = l(i, n);
          if (((o.hasEagerState = !0), (o.eagerState = a), Ue(a, i))) {
            var s = t.interleaved;
            (s === null ? ((o.next = o), ia(t)) : ((o.next = s.next), (s.next = o)),
              (t.interleaved = o));
            return;
          }
        } catch {
        } finally {
        }
      ((n = Sc(e, t, o, r)), n !== null && ((o = ce()), Be(n, e, r, o), $c(n, t, r)));
    }
  }
  function Oc(e) {
    var t = e.alternate;
    return e === $ || (t !== null && t === $);
  }
  function Vc(e, t) {
    Yn = Lo = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
  }
  function $c(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Wi(e, n));
    }
  }
  var To = {
      readContext: Fe,
      useCallback: ne,
      useContext: ne,
      useEffect: ne,
      useImperativeHandle: ne,
      useInsertionEffect: ne,
      useLayoutEffect: ne,
      useMemo: ne,
      useReducer: ne,
      useRef: ne,
      useState: ne,
      useDebugValue: ne,
      useDeferredValue: ne,
      useTransition: ne,
      useMutableSource: ne,
      useSyncExternalStore: ne,
      useId: ne,
      unstable_isNewReconciler: !1,
    },
    lm = {
      readContext: Fe,
      useCallback: function (e, t) {
        return ((We().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Fe,
      useEffect: Xs,
      useImperativeHandle: function (e, t, n) {
        return ((n = n != null ? n.concat([e]) : null), oo(4194308, 4, Fc.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return oo(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return oo(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = We();
        return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
      },
      useReducer: function (e, t, n) {
        var r = We();
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
          (e = e.dispatch = rm.bind(null, $, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = We();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: qs,
      useDebugValue: ga,
      useDeferredValue: function (e) {
        return (We().memoizedState = e);
      },
      useTransition: function () {
        var e = qs(!1),
          t = e[0];
        return ((e = nm.bind(null, e[1])), (We().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = $,
          o = We();
        if (O) {
          if (n === void 0) throw Error(k(407));
          n = n();
        } else {
          if (((n = t()), X === null)) throw Error(k(349));
          (Ut & 30) !== 0 || bc(r, t, n);
        }
        o.memoizedState = n;
        var l = { value: n, getSnapshot: t };
        return (
          (o.queue = l),
          Xs(Pc.bind(null, r, l, e), [e]),
          (r.flags |= 2048),
          mr(9, Ec.bind(null, r, l, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = We(),
          t = X.identifierPrefix;
        if (O) {
          var n = et,
            r = Je;
          ((n = (r & ~(1 << (32 - $e(r) - 1))).toString(32) + n),
            (t = ':' + t + 'R' + n),
            (n = pr++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += ':'));
        } else ((n = tm++), (t = ':' + t + 'r' + n.toString(32) + ':'));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    im = {
      readContext: Fe,
      useCallback: _c,
      useContext: Fe,
      useEffect: ma,
      useImperativeHandle: Nc,
      useInsertionEffect: zc,
      useLayoutEffect: Mc,
      useMemo: Dc,
      useReducer: $l,
      useRef: Rc,
      useState: function () {
        return $l(fr);
      },
      useDebugValue: ga,
      useDeferredValue: function (e) {
        var t = Ne();
        return Ac(t, Q.memoizedState, e);
      },
      useTransition: function () {
        var e = $l(fr)[0],
          t = Ne().memoizedState;
        return [e, t];
      },
      useMutableSource: xc,
      useSyncExternalStore: Cc,
      useId: Ic,
      unstable_isNewReconciler: !1,
    },
    am = {
      readContext: Fe,
      useCallback: _c,
      useContext: Fe,
      useEffect: ma,
      useImperativeHandle: Nc,
      useInsertionEffect: zc,
      useLayoutEffect: Mc,
      useMemo: Dc,
      useReducer: Bl,
      useRef: Rc,
      useState: function () {
        return Bl(fr);
      },
      useDebugValue: ga,
      useDeferredValue: function (e) {
        var t = Ne();
        return Q === null ? (t.memoizedState = e) : Ac(t, Q.memoizedState, e);
      },
      useTransition: function () {
        var e = Bl(fr)[0],
          t = Ne().memoizedState;
        return [e, t];
      },
      useMutableSource: xc,
      useSyncExternalStore: Cc,
      useId: Ic,
      unstable_isNewReconciler: !1,
    };
  function Ie(e, t) {
    if (e && e.defaultProps) {
      ((t = B({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function xi(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : B({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Bo = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Wt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = ce(),
        o = bt(e),
        l = tt(r, o);
      ((l.payload = t),
        n != null && (l.callback = n),
        (t = xt(e, l, o)),
        t !== null && (Be(t, e, o, r), no(t, e, o)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = ce(),
        o = bt(e),
        l = tt(r, o);
      ((l.tag = 1),
        (l.payload = t),
        n != null && (l.callback = n),
        (t = xt(e, l, o)),
        t !== null && (Be(t, e, o, r), no(t, e, o)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = ce(),
        r = bt(e),
        o = tt(n, r);
      ((o.tag = 2),
        t != null && (o.callback = t),
        (t = xt(e, o, r)),
        t !== null && (Be(t, e, r, n), no(t, e, r)));
    },
  };
  function Zs(e, t, n, r, o, l, i) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(r, l, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ir(n, r) || !ir(o, l)
          : !0
    );
  }
  function Bc(e, t, n) {
    var r = !1,
      o = Lt,
      l = t.contextType;
    return (
      typeof l == 'object' && l !== null
        ? (l = Fe(l))
        : ((o = ge(t) ? $t : le.current),
          (r = t.contextTypes),
          (l = (r = r != null) ? yn(e, o) : Lt)),
      (t = new t(n, l)),
      (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = Bo),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      t
    );
  }
  function Js(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Bo.enqueueReplaceState(t, t.state, null));
  }
  function Ci(e, t, n, r) {
    var o = e.stateNode;
    ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), aa(e));
    var l = t.contextType;
    (typeof l == 'object' && l !== null
      ? (o.context = Fe(l))
      : ((l = ge(t) ? $t : le.current), (o.context = yn(e, l))),
      (o.state = e.memoizedState),
      (l = t.getDerivedStateFromProps),
      typeof l == 'function' && (xi(e, t, l, n), (o.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == 'function' ||
        typeof o.getSnapshotBeforeUpdate == 'function' ||
        (typeof o.UNSAFE_componentWillMount != 'function' &&
          typeof o.componentWillMount != 'function') ||
        ((t = o.state),
        typeof o.componentWillMount == 'function' && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == 'function' && o.UNSAFE_componentWillMount(),
        t !== o.state && Bo.enqueueReplaceState(o, o.state, null),
        Eo(e, n, o, r),
        (o.state = e.memoizedState)),
      typeof o.componentDidMount == 'function' && (e.flags |= 4194308));
  }
  function kn(e, t) {
    try {
      var n = '',
        r = t;
      do ((n += Ap(r)), (r = r.return));
      while (r);
      var o = n;
    } catch (l) {
      o =
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack;
    }
    return { value: e, source: t, stack: o, digest: null };
  }
  function Ul(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function bi(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var sm = typeof WeakMap == 'function' ? WeakMap : Map;
  function Uc(e, t, n) {
    ((n = tt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
      (n.callback = function () {
        (zo || ((zo = !0), (_i = r)), bi(e, t));
      }),
      n
    );
  }
  function jc(e, t, n) {
    ((n = tt(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == 'function') {
      var o = t.value;
      ((n.payload = function () {
        return r(o);
      }),
        (n.callback = function () {
          bi(e, t);
        }));
    }
    var l = e.stateNode;
    return (
      l !== null &&
        typeof l.componentDidCatch == 'function' &&
        (n.callback = function () {
          (bi(e, t),
            typeof r != 'function' && (Ct === null ? (Ct = new Set([this])) : Ct.add(this)));
          var i = t.stack;
          this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' });
        }),
      n
    );
  }
  function eu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new sm();
      var o = new Set();
      r.set(t, o);
    } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
    o.has(n) || (o.add(n), (e = xm.bind(null, e, t, n)), t.then(e, e));
  }
  function tu(e) {
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
  function nu(e, t, n, r, o) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null ? (n.tag = 17) : ((t = tt(-1, 1)), (t.tag = 2), xt(n, t, 1))),
            (n.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = o), e);
  }
  var um = it.ReactCurrentOwner,
    fe = !1;
  function ue(e, t, n, r) {
    t.child = e === null ? vc(t, null, n, r) : vn(t, e.child, n, r);
  }
  function ru(e, t, n, r, o) {
    n = n.render;
    var l = t.ref;
    return (
      fn(t, o),
      (r = pa(e, t, n, r, l, o)),
      (n = fa()),
      e !== null && !fe
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), lt(e, t, o))
        : (O && n && ea(t), (t.flags |= 1), ue(e, t, r, o), t.child)
    );
  }
  function ou(e, t, n, r, o) {
    if (e === null) {
      var l = n.type;
      return typeof l == 'function' &&
        !Ca(l) &&
        l.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = l), Hc(e, t, l, r, o))
        : ((e = so(n.type, null, r, t, t.mode, o)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((l = e.child), (e.lanes & o) === 0)) {
      var i = l.memoizedProps;
      if (((n = n.compare), (n = n !== null ? n : ir), n(i, r) && e.ref === t.ref))
        return lt(e, t, o);
    }
    return ((t.flags |= 1), (e = Et(l, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Hc(e, t, n, r, o) {
    if (e !== null) {
      var l = e.memoizedProps;
      if (ir(l, r) && e.ref === t.ref)
        if (((fe = !1), (t.pendingProps = r = l), (e.lanes & o) !== 0))
          (e.flags & 131072) !== 0 && (fe = !0);
        else return ((t.lanes = e.lanes), lt(e, t, o));
    }
    return Ei(e, t, n, r, o);
  }
  function Kc(e, t, n) {
    var r = t.pendingProps,
      o = r.children,
      l = e !== null ? e.memoizedState : null;
    if (r.mode === 'hidden')
      if ((t.mode & 1) === 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          D(sn, ve),
          (ve |= n));
      else {
        if ((n & 1073741824) === 0)
          return (
            (e = l !== null ? l.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
            (t.updateQueue = null),
            D(sn, ve),
            (ve |= e),
            null
          );
        ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (r = l !== null ? l.baseLanes : n),
          D(sn, ve),
          (ve |= r));
      }
    else
      (l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
        D(sn, ve),
        (ve |= r));
    return (ue(e, t, o, n), t.child);
  }
  function Wc(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Ei(e, t, n, r, o) {
    var l = ge(n) ? $t : le.current;
    return (
      (l = yn(t, l)),
      fn(t, o),
      (n = pa(e, t, n, r, l, o)),
      (r = fa()),
      e !== null && !fe
        ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~o), lt(e, t, o))
        : (O && r && ea(t), (t.flags |= 1), ue(e, t, n, o), t.child)
    );
  }
  function lu(e, t, n, r, o) {
    if (ge(n)) {
      var l = !0;
      ko(t);
    } else l = !1;
    if ((fn(t, o), t.stateNode === null)) (lo(e, t), Bc(t, n, r), Ci(t, n, r, o), (r = !0));
    else if (e === null) {
      var i = t.stateNode,
        a = t.memoizedProps;
      i.props = a;
      var s = i.context,
        c = n.contextType;
      typeof c == 'object' && c !== null
        ? (c = Fe(c))
        : ((c = ge(n) ? $t : le.current), (c = yn(t, c)));
      var g = n.getDerivedStateFromProps,
        m = typeof g == 'function' || typeof i.getSnapshotBeforeUpdate == 'function';
      (m ||
        (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof i.componentWillReceiveProps != 'function') ||
        ((a !== r || s !== c) && Js(t, i, r, c)),
        (ft = !1));
      var y = t.memoizedState;
      ((i.state = y),
        Eo(t, r, i, o),
        (s = t.memoizedState),
        a !== r || y !== s || me.current || ft
          ? (typeof g == 'function' && (xi(t, n, g, r), (s = t.memoizedState)),
            (a = ft || Zs(t, n, a, r, y, s, c))
              ? (m ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = s)),
            (i.props = r),
            (i.state = s),
            (i.context = c),
            (r = a))
          : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308), (r = !1)));
    } else {
      ((i = t.stateNode),
        kc(e, t),
        (a = t.memoizedProps),
        (c = t.type === t.elementType ? a : Ie(t.type, a)),
        (i.props = c),
        (m = t.pendingProps),
        (y = i.context),
        (s = n.contextType),
        typeof s == 'object' && s !== null
          ? (s = Fe(s))
          : ((s = ge(n) ? $t : le.current), (s = yn(t, s))));
      var w = n.getDerivedStateFromProps;
      ((g = typeof w == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
        (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof i.componentWillReceiveProps != 'function') ||
        ((a !== m || y !== s) && Js(t, i, r, s)),
        (ft = !1),
        (y = t.memoizedState),
        (i.state = y),
        Eo(t, r, i, o));
      var h = t.memoizedState;
      a !== m || y !== h || me.current || ft
        ? (typeof w == 'function' && (xi(t, n, w, r), (h = t.memoizedState)),
          (c = ft || Zs(t, n, c, r, y, h, s) || !1)
            ? (g ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(r, h, s),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(r, h, s)),
              typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (a === e.memoizedProps && y === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (a === e.memoizedProps && y === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = h)),
          (i.props = r),
          (i.state = h),
          (i.context = s),
          (r = c))
        : (typeof i.componentDidUpdate != 'function' ||
            (a === e.memoizedProps && y === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (a === e.memoizedProps && y === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Pi(e, t, n, r, l, o);
  }
  function Pi(e, t, n, r, o, l) {
    Wc(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return (o && Hs(t, n, !1), lt(e, t, l));
    ((r = t.stateNode), (um.current = t));
    var a = i && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && i
        ? ((t.child = vn(t, e.child, null, l)), (t.child = vn(t, null, a, l)))
        : ue(e, t, a, l),
      (t.memoizedState = r.state),
      o && Hs(t, n, !0),
      t.child
    );
  }
  function Qc(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? js(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && js(e, t.context, !1),
      sa(e, t.containerInfo));
  }
  function iu(e, t, n, r, o) {
    return (hn(), na(o), (t.flags |= 256), ue(e, t, n, r), t.child);
  }
  var Li = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Ti(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Gc(e, t, n) {
    var r = t.pendingProps,
      o = V.current,
      l = !1,
      i = (t.flags & 128) !== 0,
      a;
    if (
      ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
      a ? ((l = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (o |= 1),
      D(V, o & 1),
      e === null)
    )
      return (
        ki(t),
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
            l
              ? ((r = t.mode),
                (l = t.child),
                (i = { mode: 'hidden', children: i }),
                (r & 1) === 0 && l !== null
                  ? ((l.childLanes = 0), (l.pendingProps = i))
                  : (l = Ho(i, r, 0, null)),
                (e = Vt(e, r, n, null)),
                (l.return = t),
                (e.return = t),
                (l.sibling = e),
                (t.child = l),
                (t.child.memoizedState = Ti(n)),
                (t.memoizedState = Li),
                e)
              : ya(t, i))
      );
    if (((o = e.memoizedState), o !== null && ((a = o.dehydrated), a !== null)))
      return cm(e, t, i, r, a, o, n);
    if (l) {
      ((l = r.fallback), (i = t.mode), (o = e.child), (a = o.sibling));
      var s = { mode: 'hidden', children: r.children };
      return (
        (i & 1) === 0 && t.child !== o
          ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
          : ((r = Et(o, s)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
        a !== null ? (l = Et(a, l)) : ((l = Vt(l, i, n, null)), (l.flags |= 2)),
        (l.return = t),
        (r.return = t),
        (r.sibling = l),
        (t.child = r),
        (r = l),
        (l = t.child),
        (i = e.child.memoizedState),
        (i =
          i === null
            ? Ti(n)
            : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }),
        (l.memoizedState = i),
        (l.childLanes = e.childLanes & ~n),
        (t.memoizedState = Li),
        r
      );
    }
    return (
      (l = e.child),
      (e = l.sibling),
      (r = Et(l, { mode: 'visible', children: r.children })),
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
  function ya(e, t) {
    return (
      (t = Ho({ mode: 'visible', children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function qr(e, t, n, r) {
    return (
      r !== null && na(r),
      vn(t, e.child, null, n),
      (e = ya(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function cm(e, t, n, r, o, l, i) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = Ul(Error(k(422)))), qr(e, t, i, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((l = r.fallback),
            (o = t.mode),
            (r = Ho({ mode: 'visible', children: r.children }, o, 0, null)),
            (l = Vt(l, o, i, null)),
            (l.flags |= 2),
            (r.return = t),
            (l.return = t),
            (r.sibling = l),
            (t.child = r),
            (t.mode & 1) !== 0 && vn(t, e.child, null, i),
            (t.child.memoizedState = Ti(i)),
            (t.memoizedState = Li),
            l);
    if ((t.mode & 1) === 0) return qr(e, t, i, null);
    if (o.data === '$!') {
      if (((r = o.nextSibling && o.nextSibling.dataset), r)) var a = r.dgst;
      return ((r = a), (l = Error(k(419))), (r = Ul(l, r, void 0)), qr(e, t, i, r));
    }
    if (((a = (i & e.childLanes) !== 0), fe || a)) {
      if (((r = X), r !== null)) {
        switch (i & -i) {
          case 4:
            o = 2;
            break;
          case 16:
            o = 8;
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
            o = 32;
            break;
          case 536870912:
            o = 268435456;
            break;
          default:
            o = 0;
        }
        ((o = (o & (r.suspendedLanes | i)) !== 0 ? 0 : o),
          o !== 0 && o !== l.retryLane && ((l.retryLane = o), ot(e, o), Be(r, e, o, -1)));
      }
      return (xa(), (r = Ul(Error(k(421)))), qr(e, t, i, r));
    }
    return o.data === '$?'
      ? ((t.flags |= 128), (t.child = e.child), (t = Cm.bind(null, e)), (o._reactRetry = t), null)
      : ((e = l.treeContext),
        (Se = wt(o.nextSibling)),
        (ke = t),
        (O = !0),
        (Ve = null),
        e !== null &&
          ((Te[Re++] = Je),
          (Te[Re++] = et),
          (Te[Re++] = Bt),
          (Je = e.id),
          (et = e.overflow),
          (Bt = t)),
        (t = ya(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function au(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), wi(e.return, t, n));
  }
  function jl(e, t, n, r, o) {
    var l = e.memoizedState;
    l === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: o,
        })
      : ((l.isBackwards = t),
        (l.rendering = null),
        (l.renderingStartTime = 0),
        (l.last = r),
        (l.tail = n),
        (l.tailMode = o));
  }
  function Yc(e, t, n) {
    var r = t.pendingProps,
      o = r.revealOrder,
      l = r.tail;
    if ((ue(e, t, r.children, n), (r = V.current), (r & 2) !== 0))
      ((r = (r & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && au(e, n, t);
          else if (e.tag === 19) au(e, n, t);
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
    if ((D(V, r), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (o) {
        case 'forwards':
          for (n = t.child, o = null; n !== null; )
            ((e = n.alternate), e !== null && Po(e) === null && (o = n), (n = n.sibling));
          ((n = o),
            n === null ? ((o = t.child), (t.child = null)) : ((o = n.sibling), (n.sibling = null)),
            jl(t, !1, o, n, l));
          break;
        case 'backwards':
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (((e = o.alternate), e !== null && Po(e) === null)) {
              t.child = o;
              break;
            }
            ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
          }
          jl(t, !0, n, null, l);
          break;
        case 'together':
          jl(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function lo(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function lt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (jt |= t.lanes), (n & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(k(153));
    if (t.child !== null) {
      for (e = t.child, n = Et(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        ((e = e.sibling), (n = n.sibling = Et(e, e.pendingProps)), (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function dm(e, t, n) {
    switch (t.tag) {
      case 3:
        (Qc(t), hn());
        break;
      case 5:
        wc(t);
        break;
      case 1:
        ge(t.type) && ko(t);
        break;
      case 4:
        sa(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          o = t.memoizedProps.value;
        (D(Co, r._currentValue), (r._currentValue = o));
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (D(V, V.current & 1), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Gc(e, t, n)
              : (D(V, V.current & 1), (e = lt(e, t, n)), e !== null ? e.sibling : null);
        D(V, V.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (r) return Yc(e, t, n);
          t.flags |= 128;
        }
        if (
          ((o = t.memoizedState),
          o !== null && ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
          D(V, V.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Kc(e, t, n));
    }
    return lt(e, t, n);
  }
  var qc, Ri, Xc, Zc;
  qc = function (e, t) {
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
  };
  Ri = function () {};
  Xc = function (e, t, n, r) {
    var o = e.memoizedProps;
    if (o !== r) {
      ((e = t.stateNode), It(Ye.current));
      var l = null;
      switch (n) {
        case 'input':
          ((o = Xl(e, o)), (r = Xl(e, r)), (l = []));
          break;
        case 'select':
          ((o = B({}, o, { value: void 0 })), (r = B({}, r, { value: void 0 })), (l = []));
          break;
        case 'textarea':
          ((o = ei(e, o)), (r = ei(e, r)), (l = []));
          break;
        default:
          typeof o.onClick != 'function' && typeof r.onClick == 'function' && (e.onclick = vo);
      }
      ni(n, r);
      var i;
      n = null;
      for (c in o)
        if (!r.hasOwnProperty(c) && o.hasOwnProperty(c) && o[c] != null)
          if (c === 'style') {
            var a = o[c];
            for (i in a) a.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''));
          } else
            c !== 'dangerouslySetInnerHTML' &&
              c !== 'children' &&
              c !== 'suppressContentEditableWarning' &&
              c !== 'suppressHydrationWarning' &&
              c !== 'autoFocus' &&
              (Jn.hasOwnProperty(c) ? l || (l = []) : (l = l || []).push(c, null));
      for (c in r) {
        var s = r[c];
        if (((a = o?.[c]), r.hasOwnProperty(c) && s !== a && (s != null || a != null)))
          if (c === 'style')
            if (a) {
              for (i in a)
                !a.hasOwnProperty(i) || (s && s.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ''));
              for (i in s) s.hasOwnProperty(i) && a[i] !== s[i] && (n || (n = {}), (n[i] = s[i]));
            } else (n || (l || (l = []), l.push(c, n)), (n = s));
          else
            c === 'dangerouslySetInnerHTML'
              ? ((s = s ? s.__html : void 0),
                (a = a ? a.__html : void 0),
                s != null && a !== s && (l = l || []).push(c, s))
              : c === 'children'
                ? (typeof s != 'string' && typeof s != 'number') || (l = l || []).push(c, '' + s)
                : c !== 'suppressContentEditableWarning' &&
                  c !== 'suppressHydrationWarning' &&
                  (Jn.hasOwnProperty(c)
                    ? (s != null && c === 'onScroll' && A('scroll', e), l || a === s || (l = []))
                    : (l = l || []).push(c, s));
      }
      n && (l = l || []).push('style', n);
      var c = l;
      (t.updateQueue = c) && (t.flags |= 4);
    }
  };
  Zc = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function In(e, t) {
    if (!O)
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
  function re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (r |= o.subtreeFlags & 14680064),
          (r |= o.flags & 14680064),
          (o.return = e),
          (o = o.sibling));
    else
      for (o = e.child; o !== null; )
        ((n |= o.lanes | o.childLanes),
          (r |= o.subtreeFlags),
          (r |= o.flags),
          (o.return = e),
          (o = o.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function pm(e, t, n) {
    var r = t.pendingProps;
    switch ((ta(t), t.tag)) {
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
        return (re(t), null);
      case 1:
        return (ge(t.type) && So(), re(t), null);
      case 3:
        return (
          (r = t.stateNode),
          Sn(),
          I(me),
          I(le),
          ca(),
          r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (Gr(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Ve !== null && (Ii(Ve), (Ve = null)))),
          Ri(e, t),
          re(t),
          null
        );
      case 5:
        ua(t);
        var o = It(dr.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (Xc(e, t, n, r, o), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(k(166));
            return (re(t), null);
          }
          if (((e = It(Ye.current)), Gr(t))) {
            ((r = t.stateNode), (n = t.type));
            var l = t.memoizedProps;
            switch (((r[Qe] = t), (r[ur] = l), (e = (t.mode & 1) !== 0), n)) {
              case 'dialog':
                (A('cancel', r), A('close', r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                A('load', r);
                break;
              case 'video':
              case 'audio':
                for (o = 0; o < jn.length; o++) A(jn[o], r);
                break;
              case 'source':
                A('error', r);
                break;
              case 'img':
              case 'image':
              case 'link':
                (A('error', r), A('load', r));
                break;
              case 'details':
                A('toggle', r);
                break;
              case 'input':
                (gs(r, l), A('invalid', r));
                break;
              case 'select':
                ((r._wrapperState = { wasMultiple: !!l.multiple }), A('invalid', r));
                break;
              case 'textarea':
                (hs(r, l), A('invalid', r));
            }
            (ni(n, l), (o = null));
            for (var i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === 'children'
                  ? typeof a == 'string'
                    ? r.textContent !== a &&
                      (l.suppressHydrationWarning !== !0 && Qr(r.textContent, a, e),
                      (o = ['children', a]))
                    : typeof a == 'number' &&
                      r.textContent !== '' + a &&
                      (l.suppressHydrationWarning !== !0 && Qr(r.textContent, a, e),
                      (o = ['children', '' + a]))
                  : Jn.hasOwnProperty(i) && a != null && i === 'onScroll' && A('scroll', r);
              }
            switch (n) {
              case 'input':
                (Dr(r), ys(r, l, !0));
                break;
              case 'textarea':
                (Dr(r), vs(r));
                break;
              case 'select':
              case 'option':
                break;
              default:
                typeof l.onClick == 'function' && (r.onclick = vo);
            }
            ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
          } else {
            ((i = o.nodeType === 9 ? o : o.ownerDocument),
              e === 'http://www.w3.org/1999/xhtml' && (e = Pu(n)),
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
              (e[Qe] = t),
              (e[ur] = r),
              qc(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((i = ri(n, r)), n)) {
                case 'dialog':
                  (A('cancel', e), A('close', e), (o = r));
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  (A('load', e), (o = r));
                  break;
                case 'video':
                case 'audio':
                  for (o = 0; o < jn.length; o++) A(jn[o], e);
                  o = r;
                  break;
                case 'source':
                  (A('error', e), (o = r));
                  break;
                case 'img':
                case 'image':
                case 'link':
                  (A('error', e), A('load', e), (o = r));
                  break;
                case 'details':
                  (A('toggle', e), (o = r));
                  break;
                case 'input':
                  (gs(e, r), (o = Xl(e, r)), A('invalid', e));
                  break;
                case 'option':
                  o = r;
                  break;
                case 'select':
                  ((e._wrapperState = { wasMultiple: !!r.multiple }),
                    (o = B({}, r, { value: void 0 })),
                    A('invalid', e));
                  break;
                case 'textarea':
                  (hs(e, r), (o = ei(e, r)), A('invalid', e));
                  break;
                default:
                  o = r;
              }
              (ni(n, o), (a = o));
              for (l in a)
                if (a.hasOwnProperty(l)) {
                  var s = a[l];
                  l === 'style'
                    ? Ru(e, s)
                    : l === 'dangerouslySetInnerHTML'
                      ? ((s = s ? s.__html : void 0), s != null && Lu(e, s))
                      : l === 'children'
                        ? typeof s == 'string'
                          ? (n !== 'textarea' || s !== '') && er(e, s)
                          : typeof s == 'number' && er(e, '' + s)
                        : l !== 'suppressContentEditableWarning' &&
                          l !== 'suppressHydrationWarning' &&
                          l !== 'autoFocus' &&
                          (Jn.hasOwnProperty(l)
                            ? s != null && l === 'onScroll' && A('scroll', e)
                            : s != null && $i(e, l, s, i));
                }
              switch (n) {
                case 'input':
                  (Dr(e), ys(e, r, !1));
                  break;
                case 'textarea':
                  (Dr(e), vs(e));
                  break;
                case 'option':
                  r.value != null && e.setAttribute('value', '' + Pt(r.value));
                  break;
                case 'select':
                  ((e.multiple = !!r.multiple),
                    (l = r.value),
                    l != null
                      ? un(e, !!r.multiple, l, !1)
                      : r.defaultValue != null && un(e, !!r.multiple, r.defaultValue, !0));
                  break;
                default:
                  typeof o.onClick == 'function' && (e.onclick = vo);
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
        return (re(t), null);
      case 6:
        if (e && t.stateNode != null) Zc(e, t, e.memoizedProps, r);
        else {
          if (typeof r != 'string' && t.stateNode === null) throw Error(k(166));
          if (((n = It(dr.current)), It(Ye.current), Gr(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[Qe] = t),
              (l = r.nodeValue !== n) && ((e = ke), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Qr(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Qr(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            l && (t.flags |= 4);
          } else
            ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[Qe] = t),
              (t.stateNode = r));
        }
        return (re(t), null);
      case 13:
        if (
          (I(V),
          (r = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (O && Se !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (yc(), hn(), (t.flags |= 98560), (l = !1));
          else if (((l = Gr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!l) throw Error(k(318));
              if (((l = t.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
                throw Error(k(317));
              l[Qe] = t;
            } else (hn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (re(t), (l = !1));
          } else (Ve !== null && (Ii(Ve), (Ve = null)), (l = !0));
          if (!l) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (V.current & 1) !== 0 ? G === 0 && (G = 3) : xa())),
            t.updateQueue !== null && (t.flags |= 4),
            re(t),
            null);
      case 4:
        return (Sn(), Ri(e, t), e === null && ar(t.stateNode.containerInfo), re(t), null);
      case 10:
        return (la(t.type._context), re(t), null);
      case 17:
        return (ge(t.type) && So(), re(t), null);
      case 19:
        if ((I(V), (l = t.memoizedState), l === null)) return (re(t), null);
        if (((r = (t.flags & 128) !== 0), (i = l.rendering), i === null))
          if (r) In(l, !1);
          else {
            if (G !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = Po(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      In(l, !1),
                      r = i.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;
                  )
                    ((l = n),
                      (e = r),
                      (l.flags &= 14680066),
                      (i = l.alternate),
                      i === null
                        ? ((l.childLanes = 0),
                          (l.lanes = e),
                          (l.child = null),
                          (l.subtreeFlags = 0),
                          (l.memoizedProps = null),
                          (l.memoizedState = null),
                          (l.updateQueue = null),
                          (l.dependencies = null),
                          (l.stateNode = null))
                        : ((l.childLanes = i.childLanes),
                          (l.lanes = i.lanes),
                          (l.child = i.child),
                          (l.subtreeFlags = 0),
                          (l.deletions = null),
                          (l.memoizedProps = i.memoizedProps),
                          (l.memoizedState = i.memoizedState),
                          (l.updateQueue = i.updateQueue),
                          (l.type = i.type),
                          (e = i.dependencies),
                          (l.dependencies =
                            e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                      (n = n.sibling));
                  return (D(V, (V.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            l.tail !== null &&
              H() > wn &&
              ((t.flags |= 128), (r = !0), In(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = Po(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                In(l, !0),
                l.tail === null && l.tailMode === 'hidden' && !i.alternate && !O)
              )
                return (re(t), null);
            } else
              2 * H() - l.renderingStartTime > wn &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), In(l, !1), (t.lanes = 4194304));
          l.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((n = l.last), n !== null ? (n.sibling = i) : (t.child = i), (l.last = i));
        }
        return l.tail !== null
          ? ((t = l.tail),
            (l.rendering = t),
            (l.tail = t.sibling),
            (l.renderingStartTime = H()),
            (t.sibling = null),
            (n = V.current),
            D(V, r ? (n & 1) | 2 : n & 1),
            t)
          : (re(t), null);
      case 22:
      case 23:
        return (
          wa(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && (t.mode & 1) !== 0
            ? (ve & 1073741824) !== 0 && (re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : re(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(k(156, t.tag));
  }
  function fm(e, t) {
    switch ((ta(t), t.tag)) {
      case 1:
        return (
          ge(t.type) && So(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Sn(),
          I(me),
          I(le),
          ca(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return (ua(t), null);
      case 13:
        if ((I(V), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(k(340));
          hn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (I(V), null);
      case 4:
        return (Sn(), null);
      case 10:
        return (la(t.type._context), null);
      case 22:
      case 23:
        return (wa(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Xr = !1,
    oe = !1,
    mm = typeof WeakSet == 'function' ? WeakSet : Set,
    C = null;
  function an(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == 'function')
        try {
          n(null);
        } catch (r) {
          U(e, t, r);
        }
      else n.current = null;
  }
  function zi(e, t, n) {
    try {
      n();
    } catch (r) {
      U(e, t, r);
    }
  }
  var su = !1;
  function gm(e, t) {
    if (((fi = go), (e = rc()), Ji(e))) {
      if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var o = r.anchorOffset,
              l = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, l.nodeType);
            } catch {
              n = null;
              break e;
            }
            var i = 0,
              a = -1,
              s = -1,
              c = 0,
              g = 0,
              m = e,
              y = null;
            t: for (;;) {
              for (
                var w;
                m !== n || (o !== 0 && m.nodeType !== 3) || (a = i + o),
                  m !== l || (r !== 0 && m.nodeType !== 3) || (s = i + r),
                  m.nodeType === 3 && (i += m.nodeValue.length),
                  (w = m.firstChild) !== null;
              )
                ((y = m), (m = w));
              for (;;) {
                if (m === e) break t;
                if (
                  (y === n && ++c === o && (a = i),
                  y === l && ++g === r && (s = i),
                  (w = m.nextSibling) !== null)
                )
                  break;
                ((m = y), (y = m.parentNode));
              }
              m = w;
            }
            n = a === -1 || s === -1 ? null : { start: a, end: s };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (mi = { focusedElem: e, selectionRange: n }, go = !1, C = t; C !== null; )
      if (((t = C), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (C = e));
      else
        for (; C !== null; ) {
          t = C;
          try {
            var h = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (h !== null) {
                    var v = h.memoizedProps,
                      L = h.memoizedState,
                      d = t.stateNode,
                      u = d.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? v : Ie(t.type, v),
                        L,
                      );
                    d.__reactInternalSnapshotBeforeUpdate = u;
                  }
                  break;
                case 3:
                  var p = t.stateNode.containerInfo;
                  p.nodeType === 1
                    ? (p.textContent = '')
                    : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(k(163));
              }
          } catch (S) {
            U(t, t.return, S);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (C = e));
            break;
          }
          C = t.return;
        }
    return ((h = su), (su = !1), h);
  }
  function qn(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var o = (r = r.next);
      do {
        if ((o.tag & e) === e) {
          var l = o.destroy;
          ((o.destroy = void 0), l !== void 0 && zi(t, n, l));
        }
        o = o.next;
      } while (o !== r);
    }
  }
  function Uo(e, t) {
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
  function Mi(e) {
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
  function Jc(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Jc(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null && (delete t[Qe], delete t[ur], delete t[hi], delete t[Xf], delete t[Zf])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function ed(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function uu(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ed(e.return)) return null;
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
  function Fi(e, t, n) {
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
            n != null || t.onclick !== null || (t.onclick = vo)));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (Fi(e, t, n), e = e.sibling; e !== null; ) (Fi(e, t, n), (e = e.sibling));
  }
  function Ni(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (Ni(e, t, n), e = e.sibling; e !== null; ) (Ni(e, t, n), (e = e.sibling));
  }
  var Z = null,
    Oe = !1;
  function dt(e, t, n) {
    for (n = n.child; n !== null; ) (td(e, t, n), (n = n.sibling));
  }
  function td(e, t, n) {
    if (Ge && typeof Ge.onCommitFiberUnmount == 'function')
      try {
        Ge.onCommitFiberUnmount(_o, n);
      } catch {}
    switch (n.tag) {
      case 5:
        oe || an(n, t);
      case 6:
        var r = Z,
          o = Oe;
        ((Z = null),
          dt(e, t, n),
          (Z = r),
          (Oe = o),
          Z !== null &&
            (Oe
              ? ((e = Z),
                (n = n.stateNode),
                e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
              : Z.removeChild(n.stateNode)));
        break;
      case 18:
        Z !== null &&
          (Oe
            ? ((e = Z),
              (n = n.stateNode),
              e.nodeType === 8 ? Al(e.parentNode, n) : e.nodeType === 1 && Al(e, n),
              or(e))
            : Al(Z, n.stateNode));
        break;
      case 4:
        ((r = Z),
          (o = Oe),
          (Z = n.stateNode.containerInfo),
          (Oe = !0),
          dt(e, t, n),
          (Z = r),
          (Oe = o));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!oe && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
          o = r = r.next;
          do {
            var l = o,
              i = l.destroy;
            ((l = l.tag),
              i !== void 0 && ((l & 2) !== 0 || (l & 4) !== 0) && zi(n, t, i),
              (o = o.next));
          } while (o !== r);
        }
        dt(e, t, n);
        break;
      case 1:
        if (!oe && (an(n, t), (r = n.stateNode), typeof r.componentWillUnmount == 'function'))
          try {
            ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
          } catch (a) {
            U(n, t, a);
          }
        dt(e, t, n);
        break;
      case 21:
        dt(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((oe = (r = oe) || n.memoizedState !== null), dt(e, t, n), (oe = r))
          : dt(e, t, n);
        break;
      default:
        dt(e, t, n);
    }
  }
  function cu(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new mm()),
        t.forEach(function (r) {
          var o = bm.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(o, o));
        }));
    }
  }
  function Ae(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var o = n[r];
        try {
          var l = e,
            i = t,
            a = i;
          e: for (; a !== null; ) {
            switch (a.tag) {
              case 5:
                ((Z = a.stateNode), (Oe = !1));
                break e;
              case 3:
                ((Z = a.stateNode.containerInfo), (Oe = !0));
                break e;
              case 4:
                ((Z = a.stateNode.containerInfo), (Oe = !0));
                break e;
            }
            a = a.return;
          }
          if (Z === null) throw Error(k(160));
          (td(l, i, o), (Z = null), (Oe = !1));
          var s = o.alternate;
          (s !== null && (s.return = null), (o.return = null));
        } catch (c) {
          U(o, t, c);
        }
      }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) (nd(t, e), (t = t.sibling));
  }
  function nd(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Ae(t, e), Ke(e), r & 4)) {
          try {
            (qn(3, e, e.return), Uo(3, e));
          } catch (v) {
            U(e, e.return, v);
          }
          try {
            qn(5, e, e.return);
          } catch (v) {
            U(e, e.return, v);
          }
        }
        break;
      case 1:
        (Ae(t, e), Ke(e), r & 512 && n !== null && an(n, n.return));
        break;
      case 5:
        if ((Ae(t, e), Ke(e), r & 512 && n !== null && an(n, n.return), e.flags & 32)) {
          var o = e.stateNode;
          try {
            er(o, '');
          } catch (v) {
            U(e, e.return, v);
          }
        }
        if (r & 4 && ((o = e.stateNode), o != null)) {
          var l = e.memoizedProps,
            i = n !== null ? n.memoizedProps : l,
            a = e.type,
            s = e.updateQueue;
          if (((e.updateQueue = null), s !== null))
            try {
              (a === 'input' && l.type === 'radio' && l.name != null && bu(o, l), ri(a, i));
              var c = ri(a, l);
              for (i = 0; i < s.length; i += 2) {
                var g = s[i],
                  m = s[i + 1];
                g === 'style'
                  ? Ru(o, m)
                  : g === 'dangerouslySetInnerHTML'
                    ? Lu(o, m)
                    : g === 'children'
                      ? er(o, m)
                      : $i(o, g, m, c);
              }
              switch (a) {
                case 'input':
                  Zl(o, l);
                  break;
                case 'textarea':
                  Eu(o, l);
                  break;
                case 'select':
                  var y = o._wrapperState.wasMultiple;
                  o._wrapperState.wasMultiple = !!l.multiple;
                  var w = l.value;
                  w != null
                    ? un(o, !!l.multiple, w, !1)
                    : y !== !!l.multiple &&
                      (l.defaultValue != null
                        ? un(o, !!l.multiple, l.defaultValue, !0)
                        : un(o, !!l.multiple, l.multiple ? [] : '', !1));
              }
              o[ur] = l;
            } catch (v) {
              U(e, e.return, v);
            }
        }
        break;
      case 6:
        if ((Ae(t, e), Ke(e), r & 4)) {
          if (e.stateNode === null) throw Error(k(162));
          ((o = e.stateNode), (l = e.memoizedProps));
          try {
            o.nodeValue = l;
          } catch (v) {
            U(e, e.return, v);
          }
        }
        break;
      case 3:
        if ((Ae(t, e), Ke(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
          try {
            or(t.containerInfo);
          } catch (v) {
            U(e, e.return, v);
          }
        break;
      case 4:
        (Ae(t, e), Ke(e));
        break;
      case 13:
        (Ae(t, e),
          Ke(e),
          (o = e.child),
          o.flags & 8192 &&
            ((l = o.memoizedState !== null),
            (o.stateNode.isHidden = l),
            !l || (o.alternate !== null && o.alternate.memoizedState !== null) || (Sa = H())),
          r & 4 && cu(e));
        break;
      case 22:
        if (
          ((g = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((oe = (c = oe) || g), Ae(t, e), (oe = c)) : Ae(t, e),
          Ke(e),
          r & 8192)
        ) {
          if (
            ((c = e.memoizedState !== null), (e.stateNode.isHidden = c) && !g && (e.mode & 1) !== 0)
          )
            for (C = e, g = e.child; g !== null; ) {
              for (m = C = g; C !== null; ) {
                switch (((y = C), (w = y.child), y.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    qn(4, y, y.return);
                    break;
                  case 1:
                    an(y, y.return);
                    var h = y.stateNode;
                    if (typeof h.componentWillUnmount == 'function') {
                      ((r = y), (n = y.return));
                      try {
                        ((t = r),
                          (h.props = t.memoizedProps),
                          (h.state = t.memoizedState),
                          h.componentWillUnmount());
                      } catch (v) {
                        U(r, n, v);
                      }
                    }
                    break;
                  case 5:
                    an(y, y.return);
                    break;
                  case 22:
                    if (y.memoizedState !== null) {
                      pu(m);
                      continue;
                    }
                }
                w !== null ? ((w.return = y), (C = w)) : pu(m);
              }
              g = g.sibling;
            }
          e: for (g = null, m = e; ; ) {
            if (m.tag === 5) {
              if (g === null) {
                g = m;
                try {
                  ((o = m.stateNode),
                    c
                      ? ((l = o.style),
                        typeof l.setProperty == 'function'
                          ? l.setProperty('display', 'none', 'important')
                          : (l.display = 'none'))
                      : ((a = m.stateNode),
                        (s = m.memoizedProps.style),
                        (i = s != null && s.hasOwnProperty('display') ? s.display : null),
                        (a.style.display = Tu('display', i))));
                } catch (v) {
                  U(e, e.return, v);
                }
              }
            } else if (m.tag === 6) {
              if (g === null)
                try {
                  m.stateNode.nodeValue = c ? '' : m.memoizedProps;
                } catch (v) {
                  U(e, e.return, v);
                }
            } else if (
              ((m.tag !== 22 && m.tag !== 23) || m.memoizedState === null || m === e) &&
              m.child !== null
            ) {
              ((m.child.return = m), (m = m.child));
              continue;
            }
            if (m === e) break e;
            for (; m.sibling === null; ) {
              if (m.return === null || m.return === e) break e;
              (g === m && (g = null), (m = m.return));
            }
            (g === m && (g = null), (m.sibling.return = m.return), (m = m.sibling));
          }
        }
        break;
      case 19:
        (Ae(t, e), Ke(e), r & 4 && cu(e));
        break;
      case 21:
        break;
      default:
        (Ae(t, e), Ke(e));
    }
  }
  function Ke(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (ed(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(k(160));
        }
        switch (r.tag) {
          case 5:
            var o = r.stateNode;
            r.flags & 32 && (er(o, ''), (r.flags &= -33));
            var l = uu(e);
            Ni(e, l, o);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo,
              a = uu(e);
            Fi(e, a, i);
            break;
          default:
            throw Error(k(161));
        }
      } catch (s) {
        U(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ym(e, t, n) {
    ((C = e), rd(e, t, n));
  }
  function rd(e, t, n) {
    for (var r = (e.mode & 1) !== 0; C !== null; ) {
      var o = C,
        l = o.child;
      if (o.tag === 22 && r) {
        var i = o.memoizedState !== null || Xr;
        if (!i) {
          var a = o.alternate,
            s = (a !== null && a.memoizedState !== null) || oe;
          a = Xr;
          var c = oe;
          if (((Xr = i), (oe = s) && !c))
            for (C = o; C !== null; )
              ((i = C),
                (s = i.child),
                i.tag === 22 && i.memoizedState !== null
                  ? fu(o)
                  : s !== null
                    ? ((s.return = i), (C = s))
                    : fu(o));
          for (; l !== null; ) ((C = l), rd(l, t, n), (l = l.sibling));
          ((C = o), (Xr = a), (oe = c));
        }
        du(e, t, n);
      } else (o.subtreeFlags & 8772) !== 0 && l !== null ? ((l.return = o), (C = l)) : du(e, t, n);
    }
  }
  function du(e) {
    for (; C !== null; ) {
      var t = C;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                oe || Uo(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !oe)
                  if (n === null) r.componentDidMount();
                  else {
                    var o =
                      t.elementType === t.type ? n.memoizedProps : Ie(t.type, n.memoizedProps);
                    r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                  }
                var l = t.updateQueue;
                l !== null && Ys(t, l, r);
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
                  Ys(t, i, n);
                }
                break;
              case 5:
                var a = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = a;
                  var s = t.memoizedProps;
                  switch (t.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      s.autoFocus && n.focus();
                      break;
                    case 'img':
                      s.src && (n.src = s.src);
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
                  var c = t.alternate;
                  if (c !== null) {
                    var g = c.memoizedState;
                    if (g !== null) {
                      var m = g.dehydrated;
                      m !== null && or(m);
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
                throw Error(k(163));
            }
          oe || (t.flags & 512 && Mi(t));
        } catch (y) {
          U(t, t.return, y);
        }
      }
      if (t === e) {
        C = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (C = n));
        break;
      }
      C = t.return;
    }
  }
  function pu(e) {
    for (; C !== null; ) {
      var t = C;
      if (t === e) {
        C = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (C = n));
        break;
      }
      C = t.return;
    }
  }
  function fu(e) {
    for (; C !== null; ) {
      var t = C;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Uo(4, t);
            } catch (s) {
              U(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == 'function') {
              var o = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                U(t, o, s);
              }
            }
            var l = t.return;
            try {
              Mi(t);
            } catch (s) {
              U(t, l, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              Mi(t);
            } catch (s) {
              U(t, i, s);
            }
        }
      } catch (s) {
        U(t, t.return, s);
      }
      if (t === e) {
        C = null;
        break;
      }
      var a = t.sibling;
      if (a !== null) {
        ((a.return = t.return), (C = a));
        break;
      }
      C = t.return;
    }
  }
  var hm = Math.ceil,
    Ro = it.ReactCurrentDispatcher,
    ha = it.ReactCurrentOwner,
    Me = it.ReactCurrentBatchConfig,
    M = 0,
    X = null,
    K = null,
    J = 0,
    ve = 0,
    sn = Rt(0),
    G = 0,
    gr = null,
    jt = 0,
    jo = 0,
    va = 0,
    Xn = null,
    pe = null,
    Sa = 0,
    wn = 1 / 0,
    Xe = null,
    zo = !1,
    _i = null,
    Ct = null,
    Zr = !1,
    ht = null,
    Mo = 0,
    Zn = 0,
    Di = null,
    io = -1,
    ao = 0;
  function ce() {
    return (M & 6) !== 0 ? H() : io !== -1 ? io : (io = H());
  }
  function bt(e) {
    return (e.mode & 1) === 0
      ? 1
      : (M & 2) !== 0 && J !== 0
        ? J & -J
        : em.transition !== null
          ? (ao === 0 && (ao = Bu()), ao)
          : ((e = N), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Gu(e.type))), e);
  }
  function Be(e, t, n, r) {
    if (50 < Zn) throw ((Zn = 0), (Di = null), Error(k(185)));
    (yr(e, n, r),
      ((M & 2) === 0 || e !== X) &&
        (e === X && ((M & 2) === 0 && (jo |= n), G === 4 && gt(e, J)),
        ye(e, r),
        n === 1 && M === 0 && (t.mode & 1) === 0 && ((wn = H() + 500), Vo && zt())));
  }
  function ye(e, t) {
    var n = e.callbackNode;
    tf(e, t);
    var r = mo(e, e === X ? J : 0);
    if (r === 0) (n !== null && ws(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && ws(n), t === 1))
        (e.tag === 0 ? Jf(mu.bind(null, e)) : fc(mu.bind(null, e)),
          Yf(function () {
            (M & 6) === 0 && zt();
          }),
          (n = null));
      else {
        switch (Uu(r)) {
          case 1:
            n = Ki;
            break;
          case 4:
            n = Vu;
            break;
          case 16:
            n = fo;
            break;
          case 536870912:
            n = $u;
            break;
          default:
            n = fo;
        }
        n = dd(n, od.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function od(e, t) {
    if (((io = -1), (ao = 0), (M & 6) !== 0)) throw Error(k(327));
    var n = e.callbackNode;
    if (mn() && e.callbackNode !== n) return null;
    var r = mo(e, e === X ? J : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Fo(e, r);
    else {
      t = r;
      var o = M;
      M |= 2;
      var l = id();
      (X !== e || J !== t) && ((Xe = null), (wn = H() + 500), Ot(e, t));
      do
        try {
          km();
          break;
        } catch (a) {
          ld(e, a);
        }
      while (!0);
      (oa(), (Ro.current = l), (M = o), K !== null ? (t = 0) : ((X = null), (J = 0), (t = G)));
    }
    if (t !== 0) {
      if ((t === 2 && ((o = si(e)), o !== 0 && ((r = o), (t = Ai(e, o)))), t === 1))
        throw ((n = gr), Ot(e, 0), gt(e, r), ye(e, H()), n);
      if (t === 6) gt(e, r);
      else {
        if (
          ((o = e.current.alternate),
          (r & 30) === 0 &&
            !vm(o) &&
            ((t = Fo(e, r)),
            t === 2 && ((l = si(e)), l !== 0 && ((r = l), (t = Ai(e, l)))),
            t === 1))
        )
          throw ((n = gr), Ot(e, 0), gt(e, r), ye(e, H()), n);
        switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(k(345));
          case 2:
            _t(e, pe, Xe);
            break;
          case 3:
            if ((gt(e, r), (r & 130023424) === r && ((t = Sa + 500 - H()), 10 < t))) {
              if (mo(e, 0) !== 0) break;
              if (((o = e.suspendedLanes), (o & r) !== r)) {
                (ce(), (e.pingedLanes |= e.suspendedLanes & o));
                break;
              }
              e.timeoutHandle = yi(_t.bind(null, e, pe, Xe), t);
              break;
            }
            _t(e, pe, Xe);
            break;
          case 4:
            if ((gt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, o = -1; 0 < r; ) {
              var i = 31 - $e(r);
              ((l = 1 << i), (i = t[i]), i > o && (o = i), (r &= ~l));
            }
            if (
              ((r = o),
              (r = H() - r),
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
                            : 1960 * hm(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = yi(_t.bind(null, e, pe, Xe), r);
              break;
            }
            _t(e, pe, Xe);
            break;
          case 5:
            _t(e, pe, Xe);
            break;
          default:
            throw Error(k(329));
        }
      }
    }
    return (ye(e, H()), e.callbackNode === n ? od.bind(null, e) : null);
  }
  function Ai(e, t) {
    var n = Xn;
    return (
      e.current.memoizedState.isDehydrated && (Ot(e, t).flags |= 256),
      (e = Fo(e, t)),
      e !== 2 && ((t = pe), (pe = n), t !== null && Ii(t)),
      e
    );
  }
  function Ii(e) {
    pe === null ? (pe = e) : pe.push.apply(pe, e);
  }
  function vm(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var o = n[r],
              l = o.getSnapshot;
            o = o.value;
            try {
              if (!Ue(l(), o)) return !1;
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
  function gt(e, t) {
    for (
      t &= ~va, t &= ~jo, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
      0 < t;
    ) {
      var n = 31 - $e(t),
        r = 1 << n;
      ((e[n] = -1), (t &= ~r));
    }
  }
  function mu(e) {
    if ((M & 6) !== 0) throw Error(k(327));
    mn();
    var t = mo(e, 0);
    if ((t & 1) === 0) return (ye(e, H()), null);
    var n = Fo(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = si(e);
      r !== 0 && ((t = r), (n = Ai(e, r)));
    }
    if (n === 1) throw ((n = gr), Ot(e, 0), gt(e, t), ye(e, H()), n);
    if (n === 6) throw Error(k(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      _t(e, pe, Xe),
      ye(e, H()),
      null
    );
  }
  function ka(e, t) {
    var n = M;
    M |= 1;
    try {
      return e(t);
    } finally {
      ((M = n), M === 0 && ((wn = H() + 500), Vo && zt()));
    }
  }
  function Ht(e) {
    ht !== null && ht.tag === 0 && (M & 6) === 0 && mn();
    var t = M;
    M |= 1;
    var n = Me.transition,
      r = N;
    try {
      if (((Me.transition = null), (N = 1), e)) return e();
    } finally {
      ((N = r), (Me.transition = n), (M = t), (M & 6) === 0 && zt());
    }
  }
  function wa() {
    ((ve = sn.current), I(sn));
  }
  function Ot(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), Gf(n)), K !== null))
      for (n = K.return; n !== null; ) {
        var r = n;
        switch ((ta(r), r.tag)) {
          case 1:
            ((r = r.type.childContextTypes), r != null && So());
            break;
          case 3:
            (Sn(), I(me), I(le), ca());
            break;
          case 5:
            ua(r);
            break;
          case 4:
            Sn();
            break;
          case 13:
            I(V);
            break;
          case 19:
            I(V);
            break;
          case 10:
            la(r.type._context);
            break;
          case 22:
          case 23:
            wa();
        }
        n = n.return;
      }
    if (
      ((X = e),
      (K = e = Et(e.current, null)),
      (J = ve = t),
      (G = 0),
      (gr = null),
      (va = jo = jt = 0),
      (pe = Xn = null),
      At !== null)
    ) {
      for (t = 0; t < At.length; t++)
        if (((n = At[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var o = r.next,
            l = n.pending;
          if (l !== null) {
            var i = l.next;
            ((l.next = o), (r.next = i));
          }
          n.pending = r;
        }
      At = null;
    }
    return e;
  }
  function ld(e, t) {
    do {
      var n = K;
      try {
        if ((oa(), (ro.current = To), Lo)) {
          for (var r = $.memoizedState; r !== null; ) {
            var o = r.queue;
            (o !== null && (o.pending = null), (r = r.next));
          }
          Lo = !1;
        }
        if (
          ((Ut = 0),
          (q = Q = $ = null),
          (Yn = !1),
          (pr = 0),
          (ha.current = null),
          n === null || n.return === null)
        ) {
          ((G = 1), (gr = t), (K = null));
          break;
        }
        e: {
          var l = e,
            i = n.return,
            a = n,
            s = t;
          if (
            ((t = J),
            (a.flags |= 32768),
            s !== null && typeof s == 'object' && typeof s.then == 'function')
          ) {
            var c = s,
              g = a,
              m = g.tag;
            if ((g.mode & 1) === 0 && (m === 0 || m === 11 || m === 15)) {
              var y = g.alternate;
              y
                ? ((g.updateQueue = y.updateQueue),
                  (g.memoizedState = y.memoizedState),
                  (g.lanes = y.lanes))
                : ((g.updateQueue = null), (g.memoizedState = null));
            }
            var w = tu(i);
            if (w !== null) {
              ((w.flags &= -257), nu(w, i, a, l, t), w.mode & 1 && eu(l, c, t), (t = w), (s = c));
              var h = t.updateQueue;
              if (h === null) {
                var v = new Set();
                (v.add(s), (t.updateQueue = v));
              } else h.add(s);
              break e;
            } else {
              if ((t & 1) === 0) {
                (eu(l, c, t), xa());
                break e;
              }
              s = Error(k(426));
            }
          } else if (O && a.mode & 1) {
            var L = tu(i);
            if (L !== null) {
              ((L.flags & 65536) === 0 && (L.flags |= 256), nu(L, i, a, l, t), na(kn(s, a)));
              break e;
            }
          }
          ((l = s = kn(s, a)), G !== 4 && (G = 2), Xn === null ? (Xn = [l]) : Xn.push(l), (l = i));
          do {
            switch (l.tag) {
              case 3:
                ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                var d = Uc(l, s, t);
                Gs(l, d);
                break e;
              case 1:
                a = s;
                var u = l.type,
                  p = l.stateNode;
                if (
                  (l.flags & 128) === 0 &&
                  (typeof u.getDerivedStateFromError == 'function' ||
                    (p !== null &&
                      typeof p.componentDidCatch == 'function' &&
                      (Ct === null || !Ct.has(p))))
                ) {
                  ((l.flags |= 65536), (t &= -t), (l.lanes |= t));
                  var S = jc(l, a, t);
                  Gs(l, S);
                  break e;
                }
            }
            l = l.return;
          } while (l !== null);
        }
        sd(n);
      } catch (x) {
        ((t = x), K === n && n !== null && (K = n = n.return));
        continue;
      }
      break;
    } while (!0);
  }
  function id() {
    var e = Ro.current;
    return ((Ro.current = To), e === null ? To : e);
  }
  function xa() {
    ((G === 0 || G === 3 || G === 2) && (G = 4),
      X === null || ((jt & 268435455) === 0 && (jo & 268435455) === 0) || gt(X, J));
  }
  function Fo(e, t) {
    var n = M;
    M |= 2;
    var r = id();
    (X !== e || J !== t) && ((Xe = null), Ot(e, t));
    do
      try {
        Sm();
        break;
      } catch (o) {
        ld(e, o);
      }
    while (!0);
    if ((oa(), (M = n), (Ro.current = r), K !== null)) throw Error(k(261));
    return ((X = null), (J = 0), G);
  }
  function Sm() {
    for (; K !== null; ) ad(K);
  }
  function km() {
    for (; K !== null && !Wp(); ) ad(K);
  }
  function ad(e) {
    var t = cd(e.alternate, e, ve);
    ((e.memoizedProps = e.pendingProps), t === null ? sd(e) : (K = t), (ha.current = null));
  }
  function sd(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((n = pm(n, t, ve)), n !== null)) {
          K = n;
          return;
        }
      } else {
        if (((n = fm(n, t)), n !== null)) {
          ((n.flags &= 32767), (K = n));
          return;
        }
        if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((G = 6), (K = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        K = t;
        return;
      }
      K = t = e;
    } while (t !== null);
    G === 0 && (G = 5);
  }
  function _t(e, t, n) {
    var r = N,
      o = Me.transition;
    try {
      ((Me.transition = null), (N = 1), wm(e, t, n, r));
    } finally {
      ((Me.transition = o), (N = r));
    }
    return null;
  }
  function wm(e, t, n, r) {
    do mn();
    while (ht !== null);
    if ((M & 6) !== 0) throw Error(k(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(k(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var l = n.lanes | n.childLanes;
    if (
      (nf(e, l),
      e === X && ((K = X = null), (J = 0)),
      ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
        Zr ||
        ((Zr = !0),
        dd(fo, function () {
          return (mn(), null);
        })),
      (l = (n.flags & 15990) !== 0),
      (n.subtreeFlags & 15990) !== 0 || l)
    ) {
      ((l = Me.transition), (Me.transition = null));
      var i = N;
      N = 1;
      var a = M;
      ((M |= 4),
        (ha.current = null),
        gm(e, n),
        nd(n, e),
        jf(mi),
        (go = !!fi),
        (mi = fi = null),
        (e.current = n),
        ym(n, e, o),
        Qp(),
        (M = a),
        (N = i),
        (Me.transition = l));
    } else e.current = n;
    if (
      (Zr && ((Zr = !1), (ht = e), (Mo = o)),
      (l = e.pendingLanes),
      l === 0 && (Ct = null),
      qp(n.stateNode, r),
      ye(e, H()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
    if (zo) throw ((zo = !1), (e = _i), (_i = null), e);
    return (
      (Mo & 1) !== 0 && e.tag !== 0 && mn(),
      (l = e.pendingLanes),
      (l & 1) !== 0 ? (e === Di ? Zn++ : ((Zn = 0), (Di = e))) : (Zn = 0),
      zt(),
      null
    );
  }
  function mn() {
    if (ht !== null) {
      var e = Uu(Mo),
        t = Me.transition,
        n = N;
      try {
        if (((Me.transition = null), (N = 16 > e ? 16 : e), ht === null)) var r = !1;
        else {
          if (((e = ht), (ht = null), (Mo = 0), (M & 6) !== 0)) throw Error(k(331));
          var o = M;
          for (M |= 4, C = e.current; C !== null; ) {
            var l = C,
              i = l.child;
            if ((C.flags & 16) !== 0) {
              var a = l.deletions;
              if (a !== null) {
                for (var s = 0; s < a.length; s++) {
                  var c = a[s];
                  for (C = c; C !== null; ) {
                    var g = C;
                    switch (g.tag) {
                      case 0:
                      case 11:
                      case 15:
                        qn(8, g, l);
                    }
                    var m = g.child;
                    if (m !== null) ((m.return = g), (C = m));
                    else
                      for (; C !== null; ) {
                        g = C;
                        var y = g.sibling,
                          w = g.return;
                        if ((Jc(g), g === c)) {
                          C = null;
                          break;
                        }
                        if (y !== null) {
                          ((y.return = w), (C = y));
                          break;
                        }
                        C = w;
                      }
                  }
                }
                var h = l.alternate;
                if (h !== null) {
                  var v = h.child;
                  if (v !== null) {
                    h.child = null;
                    do {
                      var L = v.sibling;
                      ((v.sibling = null), (v = L));
                    } while (v !== null);
                  }
                }
                C = l;
              }
            }
            if ((l.subtreeFlags & 2064) !== 0 && i !== null) ((i.return = l), (C = i));
            else
              e: for (; C !== null; ) {
                if (((l = C), (l.flags & 2048) !== 0))
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      qn(9, l, l.return);
                  }
                var d = l.sibling;
                if (d !== null) {
                  ((d.return = l.return), (C = d));
                  break e;
                }
                C = l.return;
              }
          }
          var u = e.current;
          for (C = u; C !== null; ) {
            i = C;
            var p = i.child;
            if ((i.subtreeFlags & 2064) !== 0 && p !== null) ((p.return = i), (C = p));
            else
              e: for (i = u; C !== null; ) {
                if (((a = C), (a.flags & 2048) !== 0))
                  try {
                    switch (a.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Uo(9, a);
                    }
                  } catch (x) {
                    U(a, a.return, x);
                  }
                if (a === i) {
                  C = null;
                  break e;
                }
                var S = a.sibling;
                if (S !== null) {
                  ((S.return = a.return), (C = S));
                  break e;
                }
                C = a.return;
              }
          }
          if (((M = o), zt(), Ge && typeof Ge.onPostCommitFiberRoot == 'function'))
            try {
              Ge.onPostCommitFiberRoot(_o, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        ((N = n), (Me.transition = t));
      }
    }
    return !1;
  }
  function gu(e, t, n) {
    ((t = kn(n, t)),
      (t = Uc(e, t, 1)),
      (e = xt(e, t, 1)),
      (t = ce()),
      e !== null && (yr(e, 1, t), ye(e, t)));
  }
  function U(e, t, n) {
    if (e.tag === 3) gu(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          gu(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof r.componentDidCatch == 'function' && (Ct === null || !Ct.has(r)))
          ) {
            ((e = kn(n, e)),
              (e = jc(t, e, 1)),
              (t = xt(t, e, 1)),
              (e = ce()),
              t !== null && (yr(t, 1, e), ye(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function xm(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (t = ce()),
      (e.pingedLanes |= e.suspendedLanes & n),
      X === e &&
        (J & n) === n &&
        (G === 4 || (G === 3 && (J & 130023424) === J && 500 > H() - Sa) ? Ot(e, 0) : (va |= n)),
      ye(e, t));
  }
  function ud(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = Or), (Or <<= 1), (Or & 130023424) === 0 && (Or = 4194304)));
    var n = ce();
    ((e = ot(e, t)), e !== null && (yr(e, t, n), ye(e, n)));
  }
  function Cm(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), ud(e, n));
  }
  function bm(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(k(314));
    }
    (r !== null && r.delete(t), ud(e, n));
  }
  var cd;
  cd = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || me.current) fe = !0;
      else {
        if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return ((fe = !1), dm(e, t, n));
        fe = (e.flags & 131072) !== 0;
      }
    else ((fe = !1), O && (t.flags & 1048576) !== 0 && mc(t, xo, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        (lo(e, t), (e = t.pendingProps));
        var o = yn(t, le.current);
        (fn(t, n), (o = pa(null, t, r, e, o, n)));
        var l = fa();
        return (
          (t.flags |= 1),
          typeof o == 'object' &&
          o !== null &&
          typeof o.render == 'function' &&
          o.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              ge(r) ? ((l = !0), ko(t)) : (l = !1),
              (t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null),
              aa(t),
              (o.updater = Bo),
              (t.stateNode = o),
              (o._reactInternals = t),
              Ci(t, r, e, n),
              (t = Pi(null, t, r, !0, l, n)))
            : ((t.tag = 0), O && l && ea(t), ue(null, t, o, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (lo(e, t),
            (e = t.pendingProps),
            (o = r._init),
            (r = o(r._payload)),
            (t.type = r),
            (o = t.tag = Pm(r)),
            (e = Ie(r, e)),
            o)
          ) {
            case 0:
              t = Ei(null, t, r, e, n);
              break e;
            case 1:
              t = lu(null, t, r, e, n);
              break e;
            case 11:
              t = ru(null, t, r, e, n);
              break e;
            case 14:
              t = ou(null, t, r, Ie(r.type, e), n);
              break e;
          }
          throw Error(k(306, r, ''));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : Ie(r, o)),
          Ei(e, t, r, o, n)
        );
      case 1:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : Ie(r, o)),
          lu(e, t, r, o, n)
        );
      case 3:
        e: {
          if ((Qc(t), e === null)) throw Error(k(387));
          ((r = t.pendingProps),
            (l = t.memoizedState),
            (o = l.element),
            kc(e, t),
            Eo(t, r, null, n));
          var i = t.memoizedState;
          if (((r = i.element), l.isDehydrated))
            if (
              ((l = {
                element: r,
                isDehydrated: !1,
                cache: i.cache,
                pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                transitions: i.transitions,
              }),
              (t.updateQueue.baseState = l),
              (t.memoizedState = l),
              t.flags & 256)
            ) {
              ((o = kn(Error(k(423)), t)), (t = iu(e, t, r, n, o)));
              break e;
            } else if (r !== o) {
              ((o = kn(Error(k(424)), t)), (t = iu(e, t, r, n, o)));
              break e;
            } else
              for (
                Se = wt(t.stateNode.containerInfo.firstChild),
                  ke = t,
                  O = !0,
                  Ve = null,
                  n = vc(t, null, r, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((hn(), r === o)) {
              t = lt(e, t, n);
              break e;
            }
            ue(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          wc(t),
          e === null && ki(t),
          (r = t.type),
          (o = t.pendingProps),
          (l = e !== null ? e.memoizedProps : null),
          (i = o.children),
          gi(r, o) ? (i = null) : l !== null && gi(r, l) && (t.flags |= 32),
          Wc(e, t),
          ue(e, t, i, n),
          t.child
        );
      case 6:
        return (e === null && ki(t), null);
      case 13:
        return Gc(e, t, n);
      case 4:
        return (
          sa(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = vn(t, null, r, n)) : ue(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : Ie(r, o)),
          ru(e, t, r, o, n)
        );
      case 7:
        return (ue(e, t, t.pendingProps, n), t.child);
      case 8:
        return (ue(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (ue(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (o = t.pendingProps),
            (l = t.memoizedProps),
            (i = o.value),
            D(Co, r._currentValue),
            (r._currentValue = i),
            l !== null)
          )
            if (Ue(l.value, i)) {
              if (l.children === o.children && !me.current) {
                t = lt(e, t, n);
                break e;
              }
            } else
              for (l = t.child, l !== null && (l.return = t); l !== null; ) {
                var a = l.dependencies;
                if (a !== null) {
                  i = l.child;
                  for (var s = a.firstContext; s !== null; ) {
                    if (s.context === r) {
                      if (l.tag === 1) {
                        ((s = tt(-1, n & -n)), (s.tag = 2));
                        var c = l.updateQueue;
                        if (c !== null) {
                          c = c.shared;
                          var g = c.pending;
                          (g === null ? (s.next = s) : ((s.next = g.next), (g.next = s)),
                            (c.pending = s));
                        }
                      }
                      ((l.lanes |= n),
                        (s = l.alternate),
                        s !== null && (s.lanes |= n),
                        wi(l.return, n, t),
                        (a.lanes |= n));
                      break;
                    }
                    s = s.next;
                  }
                } else if (l.tag === 10) i = l.type === t.type ? null : l.child;
                else if (l.tag === 18) {
                  if (((i = l.return), i === null)) throw Error(k(341));
                  ((i.lanes |= n),
                    (a = i.alternate),
                    a !== null && (a.lanes |= n),
                    wi(i, n, t),
                    (i = l.sibling));
                } else i = l.child;
                if (i !== null) i.return = l;
                else
                  for (i = l; i !== null; ) {
                    if (i === t) {
                      i = null;
                      break;
                    }
                    if (((l = i.sibling), l !== null)) {
                      ((l.return = i.return), (i = l));
                      break;
                    }
                    i = i.return;
                  }
                l = i;
              }
          (ue(e, t, o.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (o = t.type),
          (r = t.pendingProps.children),
          fn(t, n),
          (o = Fe(o)),
          (r = r(o)),
          (t.flags |= 1),
          ue(e, t, r, n),
          t.child
        );
      case 14:
        return ((r = t.type), (o = Ie(r, t.pendingProps)), (o = Ie(r.type, o)), ou(e, t, r, o, n));
      case 15:
        return Hc(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (o = t.pendingProps),
          (o = t.elementType === r ? o : Ie(r, o)),
          lo(e, t),
          (t.tag = 1),
          ge(r) ? ((e = !0), ko(t)) : (e = !1),
          fn(t, n),
          Bc(t, r, o),
          Ci(t, r, o, n),
          Pi(null, t, r, !0, e, n)
        );
      case 19:
        return Yc(e, t, n);
      case 22:
        return Kc(e, t, n);
    }
    throw Error(k(156, t.tag));
  };
  function dd(e, t) {
    return Ou(e, t);
  }
  function Em(e, t, n, r) {
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
  function ze(e, t, n, r) {
    return new Em(e, t, n, r);
  }
  function Ca(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Pm(e) {
    if (typeof e == 'function') return Ca(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === Ui)) return 11;
      if (e === ji) return 14;
    }
    return 2;
  }
  function Et(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = ze(e.tag, t, e.key, e.mode)),
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
  function so(e, t, n, r, o, l) {
    var i = 2;
    if (((r = e), typeof e == 'function')) Ca(e) && (i = 1);
    else if (typeof e == 'string') i = 5;
    else
      e: switch (e) {
        case Xt:
          return Vt(n.children, o, l, t);
        case Bi:
          ((i = 8), (o |= 8));
          break;
        case Ql:
          return ((e = ze(12, n, t, o | 2)), (e.elementType = Ql), (e.lanes = l), e);
        case Gl:
          return ((e = ze(13, n, t, o)), (e.elementType = Gl), (e.lanes = l), e);
        case Yl:
          return ((e = ze(19, n, t, o)), (e.elementType = Yl), (e.lanes = l), e);
        case wu:
          return Ho(n, o, l, t);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case Su:
                i = 10;
                break e;
              case ku:
                i = 9;
                break e;
              case Ui:
                i = 11;
                break e;
              case ji:
                i = 14;
                break e;
              case pt:
                ((i = 16), (r = null));
                break e;
            }
          throw Error(k(130, e == null ? e : typeof e, ''));
      }
    return ((t = ze(i, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = l), t);
  }
  function Vt(e, t, n, r) {
    return ((e = ze(7, e, r, t)), (e.lanes = n), e);
  }
  function Ho(e, t, n, r) {
    return (
      (e = ze(22, e, r, t)),
      (e.elementType = wu),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Hl(e, t, n) {
    return ((e = ze(6, e, null, t)), (e.lanes = n), e);
  }
  function Kl(e, t, n) {
    return (
      (t = ze(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Lm(e, t, n, r, o) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Tl(0)),
      (this.expirationTimes = Tl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Tl(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = o),
      (this.mutableSourceEagerHydrationData = null));
  }
  function ba(e, t, n, r, o, l, i, a, s) {
    return (
      (e = new Lm(e, t, n, a, s)),
      t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
      (l = ze(3, null, null, t)),
      (e.current = l),
      (l.stateNode = e),
      (l.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      aa(l),
      e
    );
  }
  function Tm(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: qt,
      key: r == null ? null : '' + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function pd(e) {
    if (!e) return Lt;
    e = e._reactInternals;
    e: {
      if (Wt(e) !== e || e.tag !== 1) throw Error(k(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (ge(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(k(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (ge(n)) return pc(e, n, t);
    }
    return t;
  }
  function fd(e, t, n, r, o, l, i, a, s) {
    return (
      (e = ba(n, r, !0, e, o, l, i, a, s)),
      (e.context = pd(null)),
      (n = e.current),
      (r = ce()),
      (o = bt(n)),
      (l = tt(r, o)),
      (l.callback = t ?? null),
      xt(n, l, o),
      (e.current.lanes = o),
      yr(e, o, r),
      ye(e, r),
      e
    );
  }
  function Ko(e, t, n, r) {
    var o = t.current,
      l = ce(),
      i = bt(o);
    return (
      (n = pd(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = tt(l, i)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = xt(o, t, i)),
      e !== null && (Be(e, o, i, l), no(e, o, i)),
      i
    );
  }
  function No(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function yu(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Ea(e, t) {
    (yu(e, t), (e = e.alternate) && yu(e, t));
  }
  function Rm() {
    return null;
  }
  var md =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Pa(e) {
    this._internalRoot = e;
  }
  Wo.prototype.render = Pa.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(k(409));
    Ko(e, t, null, null);
  };
  Wo.prototype.unmount = Pa.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      (Ht(function () {
        Ko(null, e, null, null);
      }),
        (t[rt] = null));
    }
  };
  function Wo(e) {
    this._internalRoot = e;
  }
  Wo.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Ku();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < mt.length && t !== 0 && t < mt[n].priority; n++);
      (mt.splice(n, 0, e), n === 0 && Qu(e));
    }
  };
  function La(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Qo(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    );
  }
  function hu() {}
  function zm(e, t, n, r, o) {
    if (o) {
      if (typeof r == 'function') {
        var l = r;
        r = function () {
          var c = No(i);
          l.call(c);
        };
      }
      var i = fd(t, r, e, 0, null, !1, !1, '', hu);
      return (
        (e._reactRootContainer = i),
        (e[rt] = i.current),
        ar(e.nodeType === 8 ? e.parentNode : e),
        Ht(),
        i
      );
    }
    for (; (o = e.lastChild); ) e.removeChild(o);
    if (typeof r == 'function') {
      var a = r;
      r = function () {
        var c = No(s);
        a.call(c);
      };
    }
    var s = ba(e, 0, !1, null, null, !1, !1, '', hu);
    return (
      (e._reactRootContainer = s),
      (e[rt] = s.current),
      ar(e.nodeType === 8 ? e.parentNode : e),
      Ht(function () {
        Ko(t, s, n, r);
      }),
      s
    );
  }
  function Go(e, t, n, r, o) {
    var l = n._reactRootContainer;
    if (l) {
      var i = l;
      if (typeof o == 'function') {
        var a = o;
        o = function () {
          var s = No(i);
          a.call(s);
        };
      }
      Ko(t, i, e, o);
    } else i = zm(n, t, e, o, r);
    return No(i);
  }
  ju = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Un(t.pendingLanes);
          n !== 0 && (Wi(t, n | 1), ye(t, H()), (M & 6) === 0 && ((wn = H() + 500), zt()));
        }
        break;
      case 13:
        (Ht(function () {
          var r = ot(e, 1);
          if (r !== null) {
            var o = ce();
            Be(r, e, 1, o);
          }
        }),
          Ea(e, 1));
    }
  };
  Qi = function (e) {
    if (e.tag === 13) {
      var t = ot(e, 134217728);
      if (t !== null) {
        var n = ce();
        Be(t, e, 134217728, n);
      }
      Ea(e, 134217728);
    }
  };
  Hu = function (e) {
    if (e.tag === 13) {
      var t = bt(e),
        n = ot(e, t);
      if (n !== null) {
        var r = ce();
        Be(n, e, t, r);
      }
      Ea(e, t);
    }
  };
  Ku = function () {
    return N;
  };
  Wu = function (e, t) {
    var n = N;
    try {
      return ((N = e), t());
    } finally {
      N = n;
    }
  };
  li = function (e, t, n) {
    switch (t) {
      case 'input':
        if ((Zl(e, n), (t = n.name), n.type === 'radio' && t != null)) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (
            n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'),
              t = 0;
            t < n.length;
            t++
          ) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var o = Oo(r);
              if (!o) throw Error(k(90));
              (Cu(r), Zl(r, o));
            }
          }
        }
        break;
      case 'textarea':
        Eu(e, n);
        break;
      case 'select':
        ((t = n.value), t != null && un(e, !!n.multiple, t, !1));
    }
  };
  Fu = ka;
  Nu = Ht;
  var Mm = { usingClientEntryPoint: !1, Events: [vr, tn, Oo, zu, Mu, ka] },
    On = {
      findFiberByHostInstance: Dt,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    Fm = {
      bundleType: On.bundleType,
      version: On.version,
      rendererPackageName: On.rendererPackageName,
      rendererConfig: On.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: it.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = Au(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: On.findFiberByHostInstance || Rm,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    };
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
    ((Vn = __REACT_DEVTOOLS_GLOBAL_HOOK__), !Vn.isDisabled && Vn.supportsFiber)
  )
    try {
      ((_o = Vn.inject(Fm)), (Ge = Vn));
    } catch {}
  var Vn;
  Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Mm;
  Ce.createPortal = function (e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!La(t)) throw Error(k(200));
    return Tm(e, t, null, n);
  };
  Ce.createRoot = function (e, t) {
    if (!La(e)) throw Error(k(299));
    var n = !1,
      r = '',
      o = md;
    return (
      t != null &&
        (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
        t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
      (t = ba(e, 1, !1, null, null, n, !1, r, o)),
      (e[rt] = t.current),
      ar(e.nodeType === 8 ? e.parentNode : e),
      new Pa(t)
    );
  };
  Ce.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(k(188))
        : ((e = Object.keys(e).join(',')), Error(k(268, e)));
    return ((e = Au(t)), (e = e === null ? null : e.stateNode), e);
  };
  Ce.flushSync = function (e) {
    return Ht(e);
  };
  Ce.hydrate = function (e, t, n) {
    if (!Qo(t)) throw Error(k(200));
    return Go(null, e, t, !0, n);
  };
  Ce.hydrateRoot = function (e, t, n) {
    if (!La(e)) throw Error(k(405));
    var r = (n != null && n.hydratedSources) || null,
      o = !1,
      l = '',
      i = md;
    if (
      (n != null &&
        (n.unstable_strictMode === !0 && (o = !0),
        n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
      (t = fd(t, null, e, 1, n ?? null, o, !1, l, i)),
      (e[rt] = t.current),
      ar(e),
      r)
    )
      for (e = 0; e < r.length; e++)
        ((n = r[e]),
          (o = n._getVersion),
          (o = o(n._source)),
          t.mutableSourceEagerHydrationData == null
            ? (t.mutableSourceEagerHydrationData = [n, o])
            : t.mutableSourceEagerHydrationData.push(n, o));
    return new Wo(t);
  };
  Ce.render = function (e, t, n) {
    if (!Qo(t)) throw Error(k(200));
    return Go(null, e, t, !1, n);
  };
  Ce.unmountComponentAtNode = function (e) {
    if (!Qo(e)) throw Error(k(40));
    return e._reactRootContainer
      ? (Ht(function () {
          Go(null, null, e, !1, function () {
            ((e._reactRootContainer = null), (e[rt] = null));
          });
        }),
        !0)
      : !1;
  };
  Ce.unstable_batchedUpdates = ka;
  Ce.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!Qo(n)) throw Error(k(200));
    if (e == null || e._reactInternals === void 0) throw Error(k(38));
    return Go(e, t, n, !1, r);
  };
  Ce.version = '18.3.1-next-f1338f8080-20240426';
});
var Ta = qe((pg, hd) => {
  'use strict';
  function yd() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yd);
      } catch (e) {
        console.error(e);
      }
  }
  (yd(), (hd.exports = gd()));
});
var Sd = qe((Ra) => {
  'use strict';
  var vd = Ta();
  ((Ra.createRoot = vd.createRoot), (Ra.hydrateRoot = vd.hydrateRoot));
  var fg;
});
var Cd = qe((Jo) => {
  'use strict';
  var $m = W(),
    Bm = Symbol.for('react.element'),
    Um = Symbol.for('react.fragment'),
    jm = Object.prototype.hasOwnProperty,
    Hm = $m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Km = { key: !0, ref: !0, __self: !0, __source: !0 };
  function xd(e, t, n) {
    var r,
      o = {},
      l = null,
      i = null;
    (n !== void 0 && (l = '' + n),
      t.key !== void 0 && (l = '' + t.key),
      t.ref !== void 0 && (i = t.ref));
    for (r in t) jm.call(t, r) && !Km.hasOwnProperty(r) && (o[r] = t[r]);
    if (e && e.defaultProps) for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
    return { $$typeof: Bm, type: e, key: l, ref: i, props: o, _owner: Hm.current };
  }
  Jo.Fragment = Um;
  Jo.jsx = xd;
  Jo.jsxs = xd;
});
var R = qe((bg, bd) => {
  'use strict';
  bd.exports = Cd();
});
var lp = b(W(), 1),
  Va = b(Sd(), 1);
var ry = b(W(), 1);
var be = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    semantic: {
      success: '#10b981',
      successLight: '#d1fae5',
      successDark: '#059669',
      warning: '#f59e0b',
      warningLight: '#fef3c7',
      warningDark: '#d97706',
      error: '#ef4444',
      errorLight: '#fecaca',
      errorDark: '#dc2626',
      info: '#3b82f6',
      infoLight: '#dbeafe',
      infoDark: '#2563eb',
    },
    text: {
      primary: '#374151',
      secondary: '#6b7280',
      muted: '#9ca3af',
      inverse: '#ffffff',
      disabled: '#d1d5db',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      inverse: '#1f2937',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    neutral: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    0: '0rem',
    px: '0.0625rem',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  boxShadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },
  animation: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1e3: '1000ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};
var Nm = be.colors,
  _m = be.spacing,
  Dm = be.typography,
  Am = be.breakpoints,
  f = be;
var ie = b(W(), 1);
var za = {
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
      shell: { loginTitle: 'Sign In', loginFailed: 'Login failed. Please check your credentials.' },
    },
  },
  visualReport: {
    title: 'Visual Report',
    generatedAt: 'Generated {date} \xB7 {count} components',
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
};
var Ma = {
  components: {
    button: {
      loading: 'L\xFC\xF8d\xED\xF1g zee b\xF6\xF8k: {content} - b\xF8rk b\xF8rk!',
      submit: 'S\xFC\xDFm\xEFt zee f\xF6rm, ja! B\xF8rk!',
      cancel: '\xC7\xE4\xF1\xE7\xE9l zee t\xED\xF1g n\xF8w, b\xF8rk b\xF8rk!',
      delete: 'D\xE9l\xE9t\xEA zee st\xFCff - b\xF8rk b\xF8rk b\xF8rk!',
      save: 'S\xE4v\xEA zee d\xE4t\xE4 f\xF6rev\xE9r, ja!',
      edit: '\xC9d\xEFt zee c\xF8nt\xE9nt - b\xF8rk b\xF8rk!',
      close: '\xC7l\xF8s\xE9 zee w\xEF\xF1d\xF8w, b\xF8rk b\xF8rk!',
      back: 'G\xF8 b\xE4\xE7k t\xEB zee pr\xEBv\xEF\xF8\xFCs, ja!',
      next: 'G\xF8 f\xFCrth\xE9r t\xF8 zee n\xEBxt \xF8\xF1\xEB!',
      previous: 'Zee pr\xEBv\xEF\xF8\xFCs \xF8\xF1\xEB, b\xF8rk b\xF8rk!',
      ariaLabel:
        'B\xFCtt\xF6n f\xF6r zee a\xE7t\xEF\xF8\xF1: {content} - b\xF8rk b\xF8rk zee \xE7l\xEF\xE7k\xE4\xDFl\xEB!',
      ariaLabelLoading:
        'L\xFC\xF8d\xED\xF1g zee b\xFCtt\xF6n: {content} - b\xF8rk b\xF8rk w\xE4\xEFt pl\xEB\xE4s\xEB!',
      ariaPressed:
        'B\xFCtt\xF6n pr\xEBss\xEBd d\xF8w\xF1: {content} - b\xF8rk b\xF8rk a\xE7t\xEFv\xE4t\xEBd!',
      ariaExpanded:
        'B\xFCtt\xF6n \xEBxp\xE4\xF1d\xEBd \xF8p\xEB\xF1: {content} - b\xF8rk b\xF8rk sh\xF8w\xED\xF1g m\xF8r\xE9!',
    },
    userCreateForm: {
      title: 'Cr\xEB\xE4t\xEB \xD1\xEBw \xDCs\xEBr-a',
      formLabel: '\xDCs\xEBr cr\xEB\xE4t\xEF\xF8\xF1 f\xF8rm-a',
      fields: {
        username: '\xDCs\xEBrn\xE4m\xEB-a',
        password: 'P\xE5ssw\xF8rd-a',
        email: '\xC9m\xE4\xEFl (\xF8pt\xEF\xF8\xF1\xE4l)-a',
        firstName: 'F\xEFrst N\xE4m\xEB (\xF8pt\xEF\xF8\xF1\xE4l)-a',
        lastName: 'L\xE4st N\xE4m\xEB (\xF8pt\xEF\xF8\xF1\xE4l)-a',
        phone: 'Ph\xF8\xF1\xEB (\xF8pt\xEF\xF8\xF1\xE4l)-a',
      },
      submit: 'Cr\xEB\xE4t\xEB \xDCs\xEBr-a',
      loading: 'Cr\xEB\xE4t\xEF\xF1g \xFCs\xEBr...-a',
      success: '\xDCs\xEBr cr\xEB\xE4t\xEBd s\xFC\xE7\xE7\xEBssf\xFBlly!-a',
      errors: {
        usernameRequired: '\xDCs\xEBrn\xE4m\xEB \xEFs r\xEBq\xFC\xEFr\xEBd-a',
        passwordRequired: 'P\xE5ssw\xF8rd \xEFs r\xEBq\xFC\xEFr\xEBd-a',
        emailInvalid: '\xCF\xF1v\xE4l\xEFd \xE9m\xE2\xEFl \xE4dr\xEBss-a',
        generic:
          'F\xE4\xEFl\xEBd t\xF8 cr\xEB\xE4t\xEB \xFCs\xEBr. Pl\xEB\xE4s\xEB try \xE4g\xE4\xEF\xF1.-a',
      },
      announceOnCreate: '\xDCs\xEBr cr\xEB\xE4t\xEBd-a',
    },
    input: {
      required:
        'R\xEBq\xFC\xEFr\xEBd f\xEF\xEBld - m\xFCst h\xE4v\xEB d\xE4t\xE4, b\xF8rk b\xF8rk!',
      invalid: '\xCF\xF1v\xE4l\xEFd \xEF\xF1p\xFCt - n\xF8 g\xFC\xFCd, b\xF8rk b\xF8rk!',
      placeholder: '\xC9\xF1t\xE9r zee t\xEBxt h\xEBr\xEB... b\xF8rk b\xF8rk!',
      ariaLabel:
        '\xCF\xF1p\xFCt f\xEF\xEBld f\xF6r zee: {label} - b\xF8rk b\xF8rk typ\xEB h\xEBr\xEB!',
      ariaRequired:
        'R\xEBq\xFC\xEFr\xEBd \xEF\xF1p\xFCt m\xE5 st h\xE4v\xEB: {label} - b\xF8rk b\xF8rk n\xEB\xEBd d\xE4t\xE4!',
      ariaInvalid:
        '\xCF\xF1v\xE4l\xEFd \xEF\xF1p\xFCt n\xF8 g\xFC\xFCd: {label} - b\xF8rk b\xF8rk f\xEFx pl\xEB\xE4s\xEB!',
      emailPlaceholder:
        '\xC9\xF1t\xE9r zee \xEBm\xE4\xEFl \xE4dr\xEBss h\xEBr\xEB... b\xF8rk b\xF8rk!',
      passwordPlaceholder: '\xC9\xF1t\xE9r zee s\xEB\xE7r\xEBt p\xE5ssw\xF8rd... b\xF8rk b\xF8rk!',
      searchPlaceholder: 'S\xEB\xE4r\xE7h f\xF6r zee st\xFCff... b\xF8rk b\xF8rk!',
    },
    card: {
      ariaLabel:
        '\xC7\xE4rd c\xF8\xF1t\xE4\xEF\xF1\xEBr f\xF6r: {title} - b\xF8rk b\xF8rk zee \xEF\xF1f\xF6rmat\xEF\xF8\xF1!',
      ariaLabelContent:
        '\xC7\xE4rd w\xEFth zee c\xF8\xF1t\xE9nt: {content} - b\xF8rk b\xF8rk zee d\xE4t\xE4!',
      defaultTitle: '\xC7\xE4rd \xC7\xF8\xF1t\xE4\xEF\xF1\xEBr - b\xF8rk b\xF8rk!',
      moreActions:
        'M\xF8r\xE9 \xE4\xE7t\xEF\xF8\xF1s \xE4v\xE4 \xEFl\xE4\xDFl\xEB - b\xF8rk b\xF8rk zee \xF8pt\xEF\xF8\xF1s!',
    },
    navigation: {
      menu: 'N\xE4v\xEFg\xE4t\xEF\xF8\xF1 m\xEB\xF1\xFC f\xF6r zee s\xEFt\xEB - b\xF8rk b\xF8rk!',
      mainMenu:
        'M\xE4\xEF\xF1 n\xE4v\xEFg\xE4t\xEF\xF8\xF1 f\xF6r zee p\xE4ges - b\xF8rk b\xF8rk m\xF6v\xEB \xE4r\xF6\xFC\xF1d!',
      skipToMain:
        'Sk\xEFp t\xF8 zee m\xE4\xEF\xF1 c\xF8\xF1t\xE9nt - b\xF8rk b\xF8rk g\xF8 d\xEFr\xEB\xE7t!',
      openMenu:
        '\xD8p\xEB\xF1 zee m\xEB\xF1\xFC n\xF8w - b\xF8rk b\xF8rk sh\xF8w \xF8pt\xEF\xF8\xF1s!',
      closeMenu:
        '\xC7l\xF8s\xEB zee m\xEB\xF1\xFC n\xF8w - b\xF8rk b\xF8rk h\xEFd\xEB \xF8pt\xEF\xF8\xF1s!',
    },
    form: {
      submitSuccess:
        'F\xF6rm s\xFC\xDFm\xEFtt\xEBd s\xFC\xE7\xE7\xEBssf\xFClly - b\xF8rk b\xF8rk s\xFC\xE7\xE7\xEBss!',
      submitError:
        '\xC9rr\xF8r s\xFC\xDFm\xEFtt\xEF\xF1g zee f\xF6rm - b\xF8rk b\xF8rk s\xF8m\xEBth\xEF\xF1g wr\xF8\xF1g!',
      validationError:
        'Pl\xEB\xE4s\xEB f\xEFx v\xE4l \xEFd\xE4t\xEF\xF8\xF1 \xEBrr\xF8rs - b\xF8rk b\xF8rk n\xEB\xEBd \xE7\xF8rr\xEB\xE7t d\xE4t\xE4!',
      fieldRequired:
        'Th\xEFs f\xEF\xEBld \xEFs r\xEBq\xFC\xEFr\xEBd - b\xF8rk b\xF8rk m\xFCst f\xEFll \xF8\xFCt!',
      fieldInvalid:
        'Th\xEFs f\xEF\xEBld \xEFs \xEF\xF1v\xE4l\xEFd - b\xF8rk b\xF8rk n\xF8t \xE7\xF8rr\xEB\xE7t f\xF6rmat!',
    },
    loading: {
      default: 'L\xFC\xF8d\xED\xF1g zee d\xE4t\xE4... b\xF8rk b\xF8rk w\xE4\xEFt pl\xEB\xE4s\xEB!',
      content:
        'L\xFC\xF8d\xED\xF1g zee c\xF8\xF1t\xE9nt n\xF8w... b\xF8rk b\xF8rk \xE4l m\xF8st r\xEB\xE4dy!',
      page: 'L\xFC\xF8d\xED\xF1g zee p\xE5ge f\xF8ry\xF6\xFC... b\xF8rk b\xF8rk \xE7\xF8m\xEF\xF1g s\xF8\xF8\xF1!',
      ariaLabel:
        'L\xFC\xF8d\xED\xF1g \xEF\xF1d\xEF\xE7\xE4t\xF8r \xE4\xE7t\xEFv\xEB - b\xF8rk b\xF8rk pr\xF8\xE7\xEBss\xEF\xF1g d\xE4t\xE4!',
    },
    error: {
      general:
        '\xC4\xF1 \xEBrr\xF8r \xF8\xE7\xE7\xFCrr\xEBd - b\xF8rk b\xF8rk s\xF8m\xEBth\xEF\xF1g n\xF8t r\xEFght!',
      notFound:
        '\xC7\xF8\xF1t\xE9nt n\xF8t f\xF6\xFC\xF1d - b\xF8rk b\xF8rk m\xEFss\xEF\xF1g st\xFCff!',
      network:
        'N\xEBtw\xF8rk \xEBrr\xF8r \xF8\xE7\xE7\xFCrr\xEBd - b\xF8rk b\xF8rk \xE7\xF8\xF1\xF1\xEB\xE7t\xEF\xF8\xF1 pr\xF8\xDFl\xEBm!',
      ariaLabel:
        '\xC9rr\xF8r m\xEBss\xE4g\xEB sh\xF8w\xEF\xF1g: {message} - b\xF8rk b\xF8rk pr\xF8\xDFl\xEBm \xE4l\xEBrt!',
    },
  },
  stories: {
    button: {
      title:
        'B\xFCtt\xF6n \xC7\xF8mp\xF8n\xEB\xF1t - b\xF8rk b\xF8rk zee \xE7l\xEF\xE7k\xE4\xDFl\xEB!',
      description:
        'B\xE4s\xEF\xE7 b\xFCtt\xF6n \xE7\xF8mp\xF8n\xEB\xF1t w\xEFth m\xFClt\xEFpl\xEB v\xE4r\xEF\xE4\xF1ts, s\xEFz\xEBs, \xE4\xF1d \xE4\xE7\xE7\xEBss\xEF\xDF\xEFl\xEFty f\xEB\xE4t\xFCr\xEBs. S\xFCpp\xF8rts pr\xEFm\xE4ry, s\xEB\xE7\xF8\xF1d\xE4ry, \xE4\xF1d d\xE4\xF1g\xEBr \xE7\xF8l\xF8r s\xE7h\xEBm\xEBs - b\xF8rk b\xF8rk \xE4ll zee \xF8pt\xEF\xF8\xF1s!',
      variants: {
        primary: 'Pr\xEFm\xE4ry B\xFCtt\xF6n - b\xF8rk b\xF8rk zee m\xE4\xEF\xF1 \xF8\xF1\xEB!',
        secondary:
          'S\xEB\xE7\xF8\xF1d\xE4ry B\xFCtt\xF6n - b\xF8rk b\xF8rk zee s\xEB\xE7\xF8\xF1d \xF8\xF1\xEB!',
        danger:
          'D\xE4\xF1g\xEBr B\xFCtt\xF6n - b\xF8rk b\xF8rk zee w\xE4r\xF1\xEF\xF1g \xF8\xF1\xEB!',
      },
      sizes: {
        small: 'Sm\xE4ll B\xFCtt\xF6n - b\xF8rk b\xF8rk zee t\xEF\xF1y \xF8\xF1\xEB!',
        medium: 'M\xEBd\xEF\xFCm B\xFCtt\xF6n - b\xF8rk b\xF8rk zee n\xF8rmal s\xEFz\xEB!',
        large: 'L\xE4rg\xEB B\xFCtt\xF6n - b\xF8rk b\xF8rk zee \xDF\xEFg \xF8\xF1\xEB!',
      },
      states: {
        default: 'D\xEBf\xE4\xFClt B\xFCtt\xF6n - b\xF8rk b\xF8rk zee n\xF8rmal st\xE4t\xEB!',
        disabled:
          'D\xEFs\xE4\xDFl\xEBd B\xFCtt\xF6n - b\xF8rk b\xF8rk \xE7\xE4\xF1\xF1\xF8t \xFCs\xEB n\xF8w!',
        loading:
          'L\xFC\xF8d\xED\xF1g B\xFCtt\xF6n - b\xF8rk b\xF8rk w\xE4\xEFt\xEF\xF1g f\xF8r \xE4\xE7t\xEF\xF8\xF1!',
        fullWidth:
          'F\xFCll W\xEFdth B\xFCtt\xF6n - b\xF8rk b\xF8rk \xE4ll zee w\xE4y \xE4\xE7r\xF8ss!',
      },
      examples: {
        clickMe: '\xC7l\xEF\xE7k m\xE9 n\xF8w - b\xF8rk b\xF8rk!',
        submitForm: 'S\xFC\xDFm\xEFt zee F\xF6rm - b\xF8rk b\xF8rk s\xEB\xF1d d\xE4t\xE4!',
        deleteAccount:
          'D\xE9l\xE9t\xEA zee \xC4\xE7\xE7\xF8\xFC\xF1t - b\xF8rk b\xF8rk r\xEBm\xF8v\xEB f\xF6r\xEBv\xEBr!',
        saveChanges:
          'S\xE4v\xEA zee \xC7h\xE4\xF1g\xEBs - b\xF8rk b\xF8rk k\xEB\xEBp \xFCpd\xE4t\xEBs!',
        cancelOrder:
          '\xC7\xE4\xF1\xE7\xE9l zee \xD8rd\xEBr - b\xF8rk b\xF8rk st\xF8p tr\xE6\xF1s\xE4\xE7t\xEF\xF8\xF1!',
      },
      accessibility: {
        title:
          '\xC4\xE7\xE7\xEBss\xEF\xDF\xEFl\xEFty F\xEB\xE4t\xFCr\xEBs - b\xF8rk b\xF8rk \xE4ll \xE7\xE4\xF1 \xFCs\xEB!',
        description:
          'D\xEBm\xF8\xF1str\xE4t\xEBs b\xFCtt\xF6n \xE4\xE7\xE7\xEBss\xEF\xDF\xEFl\xEFty f\xEB\xE4t\xFCr\xEBs \xEF\xF1\xE7l\xFCd\xEF\xF1g \xC4R\xCF\xC4 l\xE4\xDF\xEBls, f\xF8\xE7\xFCs m\xE4\xF1\xE4g\xEBm\xEB\xF1t, \xE4\xF1d k\xEB y\xDF\xF8\xE4rd n\xE4v\xEFg\xE4t\xEF\xF8\xF1 - b\xF8rk b\xF8rk \xE4ll \xFCs\xEBrs w\xEBl\xE7\xF8m\xEB!',
      },
      allVariants: {
        title:
          '\xC4ll V\xE4r\xEF\xE4\xF1ts Sh\xF8w\xF1 - b\xF8rk b\xF8rk \xE7\xF8mp\xE4r\xEB \xE4ll!',
        description:
          'Sh\xF8ws \xE4ll b\xFCtt\xF6n v\xE4r\xEF\xE4\xF1ts \xEF\xF1 \xE4 s\xEF\xF1gl\xEB v\xEF\xEBw f\xF8r \xE7\xF8mp\xE4r\xEFs\xF8\xF1 - b\xF8rk b\xF8rk s\xEB\xEB \xE4ll \xF8pt\xEF\xF8\xF1s t\xF8g\xEBth\xEBr!',
      },
    },
    input: {
      title:
        '\xCF\xF1p\xFCt \xC7\xF8mp\xF8n\xEB\xF1t - b\xF8rk b\xF8rk zee typ\xEF\xF1g f\xEF\xEBld!',
      description:
        'F\xF6rm \xEF\xF1p\xFCt \xE7\xF8mp\xF8n\xEB\xF1t w\xEFth v\xE4l \xEFd\xE4t\xEF\xF8\xF1, \xE4\xE7\xE7\xEBss\xEF\xDF\xEFl\xEFty f\xEB\xE4t\xFCr\xEBs, \xE4\xF1d m\xFClt\xEFpl\xEB typ\xEBs - b\xF8rk b\xF8rk \xE4ll data \xEF\xF1p\xFCts!',
      variants: {
        text: 'T\xEAxt \xCF\xF1p\xFCt - b\xF8rk b\xF8rk zee w\xF8rds!',
        email: '\xC9m\xE4\xEFl \xCF\xF1p\xFCt - b\xF8rk b\xF8rk zee \xE4dr\xEBss!',
        password: 'P\xE5ssw\xF8rd \xCF\xF1p\xFCt - b\xF8rk b\xF8rk zee s\xEB\xE7r\xEBt!',
        search: 'S\xEB\xE4r\xE7h \xCF\xF1p\xFCt - b\xF8rk b\xF8rk zee f\xEF\xF1d\xEF\xF1g!',
      },
      states: {
        default: 'D\xEBf\xE4\xFClt \xCF\xF1p\xFCt - b\xF8rk b\xF8rk zee n\xF8rmal st\xE4t\xEB!',
        required:
          'R\xEBq\xFC\xEFr\xEBd \xCF\xF1p\xFCt - b\xF8rk b\xF8rk m\xFCst f\xEFll \xF8\xFCt!',
        invalid:
          '\xCF\xF1v\xE4l\xEFd \xCF\xF1p\xFCt - b\xF8rk b\xF8rk \xE7h\xEB\xE7k zee d\xE4t\xE4!',
        disabled:
          'D\xEFs\xE4\xDFl\xEBd \xCF\xF1p\xFCt - b\xF8rk b\xF8rk \xE7\xE4\xF1\xF1\xF8t typ\xEB n\xF8w!',
      },
      examples: {
        firstName: 'F\xEFrst N\xE4m\xEB - b\xF8rk b\xF8rk zee g\xEFv\xEB\xF1 n\xE4m\xEB!',
        lastName: 'L\xE4st N\xE4m\xEB - b\xF8rk b\xF8rk zee f\xE4m\xEFly n\xE4m\xEB!',
        email:
          '\xC9m\xE4\xEFl \xC4dr\xEBss - b\xF8rk b\xF8rk zee m\xE4\xEFl l\xF8\xE7\xE4t\xEF\xF8\xF1!',
        password: 'P\xE5ssw\xF8rd - b\xF8rk b\xF8rk zee s\xEB\xE7r\xEBt \xE7\xF8d\xEB!',
      },
    },
    card: {
      title:
        '\xC7\xE4rd \xC7\xF8mp\xF8n\xEB\xF1t - b\xF8rk b\xF8rk zee \xEF\xF1f\xF6rmat\xEF\xF8\xF1 b\xF6x!',
      description:
        'Fl\xEBx\xEF\xDFl\xEB \xE7\xE4rd \xE7\xF8mp\xF8n\xEB\xF1t f\xF6r d\xEFsplay\xEF\xF1g c\xF8\xF1t\xE9nt w\xEFth \xF8pt\xEF\xF8\xF1al h\xEB\xE4d\xEBrs, f\xF8\xF8t\xEBrs, \xE4\xF1d \xE4\xE7t\xEF\xF8\xF1s - b\xF8rk b\xF8rk \xE4ll zee \xEF\xF1f\xF8!',
      variants: {
        basic: 'B\xE4s\xEF\xE7 \xC7\xE4rd - b\xF8rk b\xF8rk zee s\xEF mpl\xEB \xF8\xF1\xEB!',
        withHeader: '\xC7\xE4rd w\xEFth H\xEB\xE4d\xEBr - b\xF8rk b\xF8rk h\xE4 s t\xF8p p\xE4rt!',
        withFooter:
          '\xC7\xE4rd w\xEFth F\xF8\xF8t\xEBr - b\xF8rk b\xF8rk h\xE4s \xDF\xF8tt\xF8m p\xE4rt!',
        interactive:
          '\xCF\xF1t\xEBr\xE4\xE7t\xEFv\xEB \xC7\xE4rd - b\xF8rk b\xF8rk \xE7\xE4\xF1 \xE7l\xEF\xE7k \xE4\xF1d \xFCs\xEB!',
      },
      examples: {
        title: '\xC9x\xE4mpl\xEB \xC7\xE4rd T\xEFtl\xEB - b\xF8rk b\xF8rk!',
        content:
          'Th\xEFs \xEFs \xE4\xF1 \xE9x\xE4mpl\xEB \xE7\xE4rd w\xEFth s\xF8m\xEB c\xF8\xF1t\xE9nt t\xF8 d\xEBm\xF8\xF1str\xE4t\xEB thee \xE7\xF8mp\xF8n\xEB\xF1t f\xFC\xF1\xE7t\xEF\xF8\xF1\xE4l\xEFty - b\xF8rk b\xF8rk \xE4ll zee \xEF\xF1f\xF6rmat\xEF\xF8\xF1 sh\xF8w\xF1 h\xEBr\xEB!',
        headerTitle: '\xC7\xE4rd H\xEB\xE4d\xEBr T\xEF tl\xEB - b\xF8rk b\xF8rk zee t\xF8p!',
        footerText:
          '\xC7\xE4rd F\xF8\xF8t\xEBr T\xEAxt - b\xF8rk b\xF8rk zee \xDF\xF8tt\xF8m p\xE4rt!',
      },
    },
    general: {
      examples: '\xC9x\xE4mpl\xEBs Sh\xF8w\xF1 - b\xF8rk b\xF8rk zee d\xEB m\xF8s!',
      variants:
        'V\xE4r\xEF\xE4\xF1ts \xC4v\xE4 \xEFl\xE4\xDFl\xEB - b\xF8rk b\xF8rk \xE4ll zee typ\xEBs!',
      states:
        'St\xE4t\xEBs D\xEFsplayd - b\xF8rk b\xF8rk \xE4ll zee \xE7\xF8\xF1d\xEFt\xEF\xF8\xF1s!',
      accessibility:
        '\xC4\xE7\xE7\xEBss\xEF\xDF\xEFl\xEFty - b\xF8rk b\xF8rk \xE4ll \xFCs\xEBrs w\xEBl\xE7\xF8m\xEB!',
      documentation:
        'D\xF8\xE7\xFCm\xEB\xF1t\xE4t\xEF\xF8\xF1 - b\xF8rk b\xF8rk zee \xEF\xF1str\xFC\xE7t\xEF\xF8\xF1s!',
      playground:
        'Playg r\xF8\xFC\xF1d - b\xF8rk b\xF8rk zee \xEBxp\xEBr\xEFm\xEB\xF1t \xE4re\xE4!',
    },
  },
  accessibility: {
    announcements: {
      localeChanged:
        'L\xE4\xF1g\xFC\xE4g\xEB \xE7h\xE4\xF1g\xEBd t\xF8 zee {locale} - b\xF8rk b\xF8rk \xF1\xEBw w\xF8rds!',
      pageLoaded:
        'P\xE5ge l\xF8\xE4d\xEBd \xE7\xF8mplet\xEBly - b\xF8rk b\xF8rk r\xEB\xE4dy t\xF8 \xFCs\xEB!',
      contentUpdated:
        '\xC7\xF8\xF1t\xE9nt \xFCpd\xE4t\xEBd s\xFC\xE7\xE7\xEBssf\xFClly - b\xF8rk b\xF8rk \xF1\xEBw \xEF\xF1f\xF6rmat\xEF\xF8\xF1!',
      formSubmitted:
        'F\xF6rm s\xFC\xDFm\xEFtt\xEBd s\xFC\xE7\xE7\xEBss f\xFClly - b\xF8rk b\xF8rk d\xE4t\xE4 s\xEB\xF1t!',
      errorOccurred:
        '\xC9rr\xF8r \xF8\xE7\xE7\xFCrr\xEBd w\xEFth pr\xF8\xDFl\xEBm: {error} - b\xF8rk b\xF8rk s\xF8m\xEBth\xEF\xF1g wr\xF8\xF1g!',
    },
    instructions: {
      keyboard:
        '\xDCs\xEB Ta\xDF k\xE9y t\xF8 n\xE4v\xEFg\xE4 t\xEB \xDF\xEBtw\xEB\xEB\xF1 \xE4ll zee \xEBl\xEBm\xEB\xF1ts - b\xF8rk b\xF8rk m\xF6v\xEB \xE4r\xF6\xFC\xF1d!',
      buttonActivation:
        'Pr\xEBss \xC9\xF1t\xEBr \xF8r Sp\xE4 \xE7\xEB k\xE9y t\xF8 \xE4\xE7t\xEFv\xE4 t\xEB zee b\xFCtt\xF6n - b\xF8rk b\xF8rk m\xE4k\xEB \xEFt w\xF8rk!',
      menuNavigation:
        '\xDCs\xEB \xE4rr\xF8w k\xE9ys t\xF8 n\xE4v\xEFg\xE4 t\xEB zee m\xEB\xF1\xFC \xEFt\xEBms - b\xF8rk b\xF8rk m\xF8 v\xEB \xFCp \xE4\xF1d d\xF8w\xF1!',
      formNavigation:
        '\xDCs\xEB Ta\xDF k\xE9y t\xF8 m\xF8v\xEB \xDF\xEBtw\xEB\xEB\xF1 zee f\xF6rm f\xEF\xEBlds - b\xF8rk b\xF8rk g\xF8 t\xF8 \xF1\xEBxt \xEF\xF1p\xFCt!',
    },
    labels: {
      required: 'R\xEBq\xFC\xEFr\xEBd - b\xF8rk b\xF8rk m\xFCst h\xE4v\xEB!',
      optional: '\xD8pt\xEF\xF8\xF1al - b\xF8rk b\xF8rk \xE7\xE4\xF1 sk\xEFp!',
      invalid: '\xCF\xF1v\xE4l\xEFd - b\xF8rk b\xF8rk n\xF8t \xE7\xF8rr\xEB\xE7t!',
      loading: 'L\xFC\xF8d\xED\xF1g - b\xF8rk b\xF8rk w\xE4\xEFt pl\xEB\xE4s\xEB!',
      expanded: '\xC9xp\xE4\xF1d\xEBd - b\xF8rk b\xF8rk \xF8p\xEB\xF1 \xF1\xF8w!',
      collapsed: '\xC7\xF8l l\xE4ps\xEBd - b\xF8rk b\xF8rk \xE7l\xF8s\xEBd \xF1\xF8w!',
    },
  },
  petstore: {
    common: {
      close: '\xC7l\xF8\xF8s\xEB-a',
      selectLabel: 'S\xEBl\xEBct-a \xF8pt\xEF\xF8\xF1',
      status: {
        available: 'Av\xE4\xEFl\xE4bl\xEB-a',
        pending: 'P\xEB\xF1d\xEF\xF1g-a',
        sold: 'S\xF8ld-a',
        placed: 'Pl\xE4c\xEBd-a',
        approved: '\xC4ppr\xF8ved-a',
        delivered: 'D\xEBl\xEFv\xEBr\xEBd-a',
        info: '\xCF\xF1f\xF8-a',
        default: 'St\xE4t\xFCs-a',
      },
      confirm: {
        defaultTitle: '\xC4r\xEB y\xF8\xFC s\xFCr\xEB?-a',
        confirm: 'C\xF8\xF1f\xEFrm-a',
        cancel: 'C\xE4\xF1c\xEBl-a',
        announceConfirmed: '\xC4ct\xEF\xF8\xF1 c\xF8\xF1f\xEFrm\xEBd-a',
        announceCancelled: '\xC4ct\xEF\xF8\xF1 c\xE4\xF1c\xEBll\xEBd-a',
      },
    },
    navigation: {
      tabsAriaLabel: 'P\xEBtst\xF8r\xEB-a s\xEBct\xEF\xF8\xF1s',
      pets: 'P\xEBts-a',
      orders: '\xD8rd\xEBrs-a',
      users: '\xDCs\xEBrs-a',
    },
    tabs: { activeLabel: '\xC4ct\xEFv\xEB t\xE4b-a' },
    select: {
      statusLabel: 'St\xE4t\xFCs-a',
      petTypeLabel: 'P\xEBt typ\xEB-a',
      petTypes: { dog: 'D\xF8g-a', cat: 'C\xE4t-a', bird: 'B\xEFrd-a', fish: 'F\xEFsh-a' },
    },
    modal: {
      defaultTitle: 'M\xF8d\xE4l-a',
      openButton: '\xD8p\xEBn m\xF8d\xE4l-a',
      content: 'M\xF8d\xE4l c\xF8\xF1t\xEBnt g\xF6\xEBs h\xEBr\xEB-a.',
      editPetTitle: '\xC9d\xEFt P\xEBt-a',
      smallTitle: 'Sm\xE4ll m\xF8d\xE4l-a',
      mediumTitle: 'M\xEBd\xEF\xFCm m\xF8d\xE4l-a',
      largeTitle: 'L\xE4rg\xEB m\xF8d\xE4l-a',
      reopenButton: 'R\xEB-\xF8p\xEBn m\xF8d\xE4l-a',
      focusTrapTitle: 'F\xF8\xE7\xFCs tr\xE4p d\xEBm\xF8-a',
      firstInputPlaceholder: 'F\xEFrst \xEF\xF1p\xFCt-a',
      secondInputPlaceholder: 'S\xEBc\xF8\xF1d \xEF\xF1p\xFCt-a',
      doneButton: 'D\xF8\xF1\xEB-a',
    },
    table: {
      ariaLabel: 'D\xE4t\xE4 t\xE4bl\xEB-a',
      emptyState: 'N\xF8 d\xE4t\xE4 \xE4v\xE4\xEFl\xE4bl\xEB-a',
      emptyInventory: 'N\xF8 \xEF\xF1v\xEBnt\xF8ry f\xF8\xFC\xF1d-a',
      headers: {
        status: 'St\xE4t\xFCs-a',
        count: 'C\xF8\xFC\xF1t-a',
        id: '\xCFD-a',
        petId: 'P\xEBt \xCFD-a',
      },
    },
    users: {
      title: '\xDCs\xEBr M\xE4n\xE4g\xEBm\xEB\xF1t-a',
      lookup: {
        label: 'L\xF8\xF8k\xFCp \xDCs\xEBr-a',
        placeholder: '\xCB\xF1t\xEBr \xFCs\xEBrn\xE4m\xEB-a...',
        button: 'S\xEB\xE4r\xE7h-a',
        notFound: '\xDCs\xEBr n\xF8t f\xF8\xFC\xF1d-a',
        ariaLabel: '\xDCs\xEBr l\xF8\xF8k\xFCp f\xF8rm-a',
      },
      form: {
        createTitle: 'Cr\xEB\xE4t\xEB \xDCs\xEBr-a',
        editTitle: '\xC9d\xEFt \xDCs\xEBr-a',
        username: '\xDCs\xEBrn\xE4m\xEB-a',
        firstName: 'F\xEFrst N\xE4m\xEB-a',
        lastName: 'L\xE4st N\xE4m\xEB-a',
        email: '\xC9m\xE4\xEFl-a',
        password: 'P\xE5ssw\xF8rd-a',
        phone: 'Ph\xF8\xF1\xEB-a',
        save: 'S\xE4v\xEB-a',
        cancel: 'C\xE4\xF1c\xEBl-a',
        ariaLabel: '\xDCs\xEBr f\xF8rm-a',
        announceSubmit: '\xDCs\xEBr f\xF8rm s\xFC\xDFm\xEFtt\xEBd-a',
      },
      card: {
        ariaLabel: '\xDCs\xEBr c\xE4rd: {username}-a',
        emailLabel: '\xC9m\xE4\xEFl-a',
        phoneLabel: 'Ph\xF8\xF1\xEB-a',
        edit: '\xC9d\xEFt-a',
        delete: 'D\xEBl\xEBt\xEB-a',
        announceEdit: '\xC9d\xEFt\xEFng \xFCs\xEBr {username}-a',
        announceDelete: 'D\xEBl\xEBt\xEFng \xFCs\xEBr {username}-a',
      },
    },
    auth: {
      form: {
        ariaLabel: 'S\xEFg\xF1 \xEF\xF1 f\xF8rm-a',
        username: '\xDCs\xEBrn\xE4m\xEB-a',
        usernamePlaceholder: '\xC9nt\xEBr \xFCs\xEBrn\xE4m\xEB...-a',
        password: 'P\xE5ssw\xF8rd-a',
        passwordPlaceholder: '\xC9nt\xEBr p\xE5ssw\xF8rd...-a',
        submit: 'S\xEFg\xF1 \xCF\xF1-a',
        announceSubmit: 'S\xEFgn\xEFng \xEF\xF1...-a',
      },
    },
    pets: {
      card: {
        ariaLabel: 'P\xEBt c\xE4rd: {name}-a',
        categoryLabel: 'C\xE4t\xEBg\xF8ry-a',
        tagsLabel: 'T\xE4gs-a',
        edit: '\xC9d\xEFt-a',
        delete: 'D\xEBl\xEBt\xEB-a',
        announceEdit: '\xC9d\xEFt\xEFng p\xEBt {name}-a',
        announceDelete: 'D\xEBl\xEBt\xEFng p\xEBt {name}-a',
      },
      form: {
        createTitle: '\xC4dd P\xEBt-a',
        editTitle: '\xC9d\xEFt P\xEBt-a',
        name: 'N\xE4m\xEB-a',
        category: 'C\xE4t\xEBg\xF8ry-a',
        photoUrl: 'Ph\xF8t\xF8 URL-a',
        status: 'St\xE4t\xFCs-a',
        save: 'S\xE4v\xEB-a',
        cancel: 'C\xE4\xF1c\xEBl-a',
        ariaLabel: 'P\xEBt f\xF8rm-a',
        announceSubmit: 'P\xEBt f\xF8rm s\xFC\xDFm\xEFtt\xEBd-a',
      },
      filter: {
        label: 'F\xEFlt\xEBr by st\xE4t\xFCs-a',
        refresh: 'R\xEBfr\xEBsh-a',
        ariaLabel: 'P\xEBt st\xE4t\xFCs f\xEFlt\xEBr-a',
        announceRefresh: 'R\xEBfr\xEBsh\xEFng p\xEBt l\xEFst-a',
      },
    },
    orders: {
      card: {
        ariaLabel: '\xD8rd\xEBr c\xE4rd: #{id}-a',
        orderId: '\xD8rd\xEBr-a',
        petId: 'P\xEBt \xCFD-a',
        quantity: 'Q\xFC\xE4nt\xEFty-a',
        shipDate: 'Sh\xEFp D\xE4t\xEB-a',
        delete: 'D\xEBl\xEBt\xEB-a',
        announceDelete: 'D\xEBl\xEBt\xEFng \xF8rd\xEBr #{id}-a',
      },
      form: {
        ariaLabel: 'Pl\xE5c\xEB \xF8rd\xEBr f\xF8rm-a',
        petId: 'P\xEBt \xCFD-a',
        quantity: 'Q\xFC\xE4nt\xEFty-a',
        submit: 'Pl\xE5c\xEB \xD8rd\xEBr-a',
        cancel: 'C\xE4\xF1c\xEBl-a',
        announceSubmit: '\xD8rd\xEBr s\xFC\xDFm\xEFtt\xEBd-a',
      },
    },
    app: {
      navigation: {
        ariaLabel: 'P\xEBtst\xF8r\xEB \xE4ppl\xEFc\xE4t\xEF\xF8\xF1 n\xE4v\xEFg\xE4t\xEF\xF8\xF1-a',
        signIn: 'S\xEFg\xF1 \xCF\xF1-a',
        signOut: 'S\xEFg\xF1 \xD8\xFCt-a',
        loggedInAs: 'L\xF8gg\xEBd \xEF\xF1 \xE4s {username}-a',
        announceSignIn: '\xD8p\xEB\xF1\xEF\xF1g s\xEFg\xF1 \xEF\xF1 f\xF8rm-a',
        announceSignOut: 'S\xEFg\xF1\xEF\xF1g \xF8\xFCt-a',
      },
      pets: {
        ariaLabel: 'P\xEBt m\xE4n\xE4g\xEBm\xEB\xF1t-a',
        addButton: '\xC4dd P\xEBt-a',
        announceAdd: '\xD8p\xEB\xF1\xEF\xF1g \xE4dd p\xEBt f\xF8rm-a',
        emptyState: 'N\xF8 p\xEBts f\xF8\xFC\xF1d f\xF8r th\xEFs st\xE4t\xFCs-a.',
        deleteTitle: 'D\xEBl\xEBt\xEB P\xEBt-a',
        deleteMessage:
          '\xC4r\xEB y\xF8\xFC s\xFCr\xEB y\xF8\xFC w\xE4\xF1t t\xF8 d\xEBl\xEBt\xEB {name}?-a',
      },
      orders: {
        ariaLabel: 'St\xF8r\xEB \xF8rd\xEBrs-a',
        inventoryTitle: '\xCF\xF1v\xEB\xF1t\xF8ry-a',
        loading: 'L\xF8\xE4d\xEF\xF1g...-a',
        lookupTitle: '\xD8rd\xEBr L\xF8\xF8k\xFCp-a',
        lookupLabel: '\xD8rd\xEBr \xCFD-a',
        lookupPlaceholder: '\xCB\xF1t\xEBr \xF8rd\xEBr \xCFD...-a',
        lookupButton: 'S\xEB\xE4r\xE7h-a',
        notFound: '\xD8rd\xEBr n\xF8t f\xF8\xFC\xF1d-a.',
        placeOrderButton: 'Pl\xE4c\xEB \xD8rd\xEBr-a',
        announcePlaceOrder: '\xD8p\xEB\xF1\xEF\xF1g pl\xE4c\xEB \xF8rd\xEBr f\xF8rm-a',
        deleteTitle: 'D\xEBl\xEBt\xEB \xD8rd\xEBr-a',
        deleteMessage:
          '\xC4r\xEB y\xF8\xFC s\xFCr\xEB y\xF8\xFC w\xE4\xF1t t\xF8 d\xEBl\xEBt\xEB \xF8rd\xEBr #{id}?-a',
      },
      users: {
        ariaLabel: '\xDCs\xEBr m\xE4n\xE4g\xEBm\xEB\xF1t-a',
        createButton: 'Cr\xEB\xE4t\xEB \xDCs\xEBr-a',
        announceCreate: '\xD8p\xEB\xF1\xEF\xF1g cr\xEB\xE4t\xEB \xFCs\xEBr f\xF8rm-a',
        deleteTitle: 'D\xEBl\xEBt\xEB \xDCs\xEBr-a',
        deleteMessage:
          '\xC4r\xEB y\xF8\xFC s\xFCr\xEB y\xF8\xFC w\xE4\xF1t t\xF8 d\xEBl\xEBt\xEB \xFCs\xEBr {username}?-a',
      },
      shell: {
        loginTitle: 'S\xEFg\xF1 \xCF\xF1-a',
        loginFailed:
          'L\xF8g\xEF\xF1 f\xE4\xEFl\xEBd. Pl\xEB\xE4s\xEB ch\xEBck y\xF8\xFCr cr\xEBd\xEB\xF1t\xEF\xE4ls.-a',
      },
    },
  },
  visualReport: {
    title: 'V\xEFs\xFC\xE4l R\xEBp\xF8rt-a',
    generatedAt: 'G\xEBn\xEBr\xE4t\xEBd {date} \xB7 {count} c\xF8mp\xF8n\xEB\xF1ts-a',
    filters: {
      ariaLabel: 'St\xE4t\xFCs f\xEFlt\xEBrs-a',
      all: '\xC4ll-a',
      passed: 'P\xE4ss\xEBd-a',
      failed: 'F\xE4\xEFl\xEBd-a',
      flaky: 'Fl\xE4ky-a',
      skipped: 'Sk\xEFpp\xEBd-a',
      unknown: '\xDC\xF1k\xF1\xF8w\xF1-a',
    },
    selection: {
      noMatchingComponents: 'N\xF8 m\xE4tch\xEF\xF1g c\xF8mp\xF8n\xEB\xF1ts-a',
      tryDifferentFilter: 'Try \xE4 d\xEFff\xEBr\xEB\xF1t st\xE4t\xFCs f\xEFlt\xEBr-a.',
      shownOf: '{shown} sh\xF8w\xF1 \xF8f {total} v\xE4r\xEF\xE4\xF1t(s)-a',
    },
    modes: {
      ariaLabel: 'C\xF8mp\xE4r\xEFs\xF8\xF1 m\xF8d\xEB-a',
      diff: 'D\xEFff-a',
      actual: '\xC4ct\xFC\xE4l-a',
      expected: '\xC9xp\xEBct\xEBd-a',
      sideBySide: 'S\xEFd\xEB by S\xEFd\xEB-a',
      slider: 'Sl\xEFd\xEBr-a',
      slideLeftRight: 'Sl\xEFd\xEB: L\xEBft/R\xEFght-a',
      slideUpDown: 'Sl\xEFd\xEB: \xDCp/D\xF8w\xF1-a',
      sliderAria: 'C\xF8mp\xE4r\xEB \xEBxp\xEBct\xEBd \xE4\xF1d \xE4ct\xFC\xE4l \xEFm\xE4g\xEB-a',
    },
    messages: {
      missingExpectedActual:
        'M\xEFss\xEF\xF1g \xEBxp\xEBct\xEBd/\xE4ct\xFC\xE4l \xEFm\xE4g\xEB f\xF8r th\xEFs v\xE4r\xEF\xE4\xF1t-a.',
      missingDiff:
        'D\xEFff \xEFm\xE4g\xEB \xEFs n\xF8t \xE4v\xE4\xEFl\xE4bl\xEB f\xF8r th\xEFs v\xE4r\xEF\xE4\xF1t-a.',
      missingActual:
        '\xC4ct\xFC\xE4l \xEFm\xE4g\xEB \xEFs n\xF8t \xE4v\xE4\xEFl\xE4bl\xEB f\xF8r th\xEFs v\xE4r\xEF\xE4\xF1t-a.',
      missingExpected:
        '\xC9xp\xEBct\xEBd \xEFm\xE4g\xEB \xEFs n\xF8t \xE4v\xE4\xEFl\xE4bl\xEB f\xF8r th\xEFs v\xE4r\xEF\xE4\xF1t-a.',
    },
  },
};
var Im = new Proxy(
    {},
    {
      get: (e, t) => {
        if (typeof t == 'string') {
          let n = t,
            r = (o) => (o && Object.keys(o).length > 0 ? `${n} ${JSON.stringify(o)}` : n);
          return ((r.toString = () => n), r);
        }
      },
    },
  ),
  kd = Im;
var Yo = { en: za, chef: Ma, debug: kd };
var qo = 'en',
  Om = [];
function Vm(e, t) {
  if (!t || Object.keys(t).length === 0) return e;
  let n = Object.entries(t)
    .map(([r, o]) => `${r}=${String(o)}`)
    .join(', ');
  return `${e} [${n}]`;
}
function Xo(e, t, n) {
  if (e === Yo.debug) return Vm(t, n);
  try {
    let r = t.split('.'),
      o = e;
    for (let l of r)
      if (o && typeof o == 'object' && o !== null && Object.prototype.hasOwnProperty.call(o, l))
        o = o[l];
      else return (console.warn(`Translation key "${t}" not found in locale`), t);
    return typeof o == 'string'
      ? n
        ? wd(o, n)
        : o
      : (console.warn(`Translation key "${t}" does not point to a string value`), t);
  } catch (r) {
    return (console.error(`Error retrieving translation for key "${t}":`, r), t);
  }
}
function wd(e, t) {
  return e.replace(/\{(\w+)\}/g, (n, r) => {
    let o = t[r];
    return o !== void 0
      ? String(o)
      : (console.warn(`Parameter "${r}" not found for interpolation in: ${e}`), n);
  });
}
function Fa(e) {
  return e in Yo;
}
function Zo(e) {
  return Yo[e];
}
function Na(e) {
  return Om.includes(e);
}
var Td = b(R(), 1),
  Ed = (0, ie.createContext)(null),
  Pd = 'petstore-ui-locale';
function Ld() {
  let e = (0, ie.useContext)(Ed);
  if (!e) throw new Error('useLocaleContext must be used within a LocaleProvider');
  return e;
}
function j() {
  let { t: e, locale: t, setLocale: n, isRTL: r } = Ld();
  return { t: (0, ie.useCallback)((l, i) => e(l, i), [e]), locale: t, setLocale: n, isRTL: r };
}
function Wm() {
  if (typeof window > 'u') return qo;
  try {
    let e = localStorage.getItem(Pd);
    if (e && Fa(e)) return e;
  } catch (e) {
    console.warn('Failed to read locale from localStorage:', e);
  }
  return qo;
}
function Qm(e) {
  if (!(typeof window > 'u'))
    try {
      localStorage.setItem(Pd, e);
    } catch (t) {
      console.warn('Failed to store locale in localStorage:', t);
    }
}
function Gm(e) {
  if (!(typeof window > 'u' || !('speechSynthesis' in window)))
    try {
      let t = document.createElement('div');
      (t.setAttribute('aria-live', 'polite'),
        t.setAttribute('aria-atomic', 'true'),
        (t.style.position = 'absolute'),
        (t.style.left = '-10000px'),
        (t.style.width = '1px'),
        (t.style.height = '1px'),
        (t.style.overflow = 'hidden'));
      let n = Zo(e),
        r = Xo(n, 'accessibility.announcements.localeChanged', { locale: e });
      ((t.textContent = r),
        document.body.appendChild(t),
        setTimeout(() => {
          t.parentNode && t.parentNode.removeChild(t);
        }, 1e3));
    } catch (t) {
      console.warn('Failed to announce locale change:', t);
    }
}
var _a = ({ locale: e, children: t }) => {
  let [n, r] = (0, ie.useState)(() => e || Wm());
  (0, ie.useEffect)(() => {
    e && e !== n && r(e);
  }, [e, n]);
  let o = (0, ie.useCallback)(
      (s) => {
        s !== n && (r(s), Qm(s), Gm(s));
      },
      [n],
    ),
    l = (0, ie.useCallback)(
      (s, c) => {
        let g = Zo(n);
        return Xo(g, s, c);
      },
      [n],
    ),
    i = (0, ie.useMemo)(() => Na(n), [n]),
    a = (0, ie.useMemo)(() => ({ locale: n, setLocale: o, t: l, isRTL: i }), [n, o, l, i]);
  return (
    (0, ie.useEffect)(() => {
      typeof document < 'u' &&
        ((document.documentElement.dir = i ? 'rtl' : 'ltr'),
        (document.documentElement.lang = n === 'chef' ? 'en' : n));
    }, [i, n]),
    (0, Td.jsx)(Ed.Provider, { value: a, children: t })
  );
};
var el = b(W(), 1);
var zd = b(R(), 1);
var uy = b(W(), 1);
var Md = b(R(), 1);
var gy = b(W(), 1);
var Fd = b(R(), 1);
var wy = b(W(), 1);
var Xm = b(R(), 1);
var Ly = b(W(), 1);
var Nd = b(R(), 1);
var Zm = b(W(), 1),
  Jm = b(Ta(), 1);
var _d = b(R(), 1);
var Oy = b(W(), 1);
var Dd = b(R(), 1);
var eg = b(W(), 1);
var Ad = b(R(), 1);
var Pe = b(W(), 1);
var tl = ['failed', 'flaky', 'unknown', 'skipped', 'passed'],
  nl = ['all', 'passed', 'failed', 'flaky', 'skipped', 'unknown'],
  Id = {
    all: '\u{1F4CB}',
    passed: '\u2705',
    failed: '\u274C',
    flaky: '\u26A0\uFE0F',
    skipped: '\u23ED\uFE0F',
    unknown: '\u2754',
  },
  rl = {
    passed: '\u2705',
    failed: '\u274C',
    flaky: '\u26A0\uFE0F',
    skipped: '\u23ED\uFE0F',
    unknown: '\u2754',
  },
  Da = [
    { value: 'diff', labelKey: 'visualReport.modes.diff' },
    { value: 'actual', labelKey: 'visualReport.modes.actual' },
    { value: 'expected', labelKey: 'visualReport.modes.expected' },
    { value: 'side-by-side', labelKey: 'visualReport.modes.sideBySide' },
    { value: 'slider', labelKey: 'visualReport.modes.slider' },
  ],
  je = 'slider';
var tg = (e) => `${e.namespace}::${e.atomicLevel}::${e.component}`,
  ng = (e) => {
    let t = new Map();
    for (let n of e) {
      let r = tg(n),
        o = t.get(r);
      if (o) {
        o.stories.push(n);
        continue;
      }
      t.set(r, {
        key: r,
        namespace: n.namespace,
        atomicLevel: n.atomicLevel,
        component: n.component,
        stories: [n],
      });
    }
    return [...t.values()].sort((n, r) => n.component.localeCompare(r.component));
  },
  Od = (e) => ({ ...e, componentGroups: ng(e.components ?? []) }),
  kr = (e) => e ?? 'unknown',
  rg = () => ({ passed: 0, failed: 0, flaky: 0, skipped: 0, unknown: 0 }),
  bn = (e) => {
    let t = rg();
    for (let n of e) {
      let r = kr(n.status);
      t[r] += 1;
    }
    return t;
  },
  Aa = (e, t) => ({
    passed: e.passed + t.passed,
    failed: e.failed + t.failed,
    flaky: e.flaky + t.flaky,
    skipped: e.skipped + t.skipped,
    unknown: e.unknown + t.unknown,
  }),
  ol = (e) =>
    tl
      .filter((t) => e[t] > 0)
      .map((t) => `${t} ${e[t]}`)
      .join(', '),
  wr = (e, t) => (t.size === 0 ? !0 : t.has(kr(e.status))),
  Vd = (e, t) => {
    if (e === 'all') return new Set();
    let n = new Set(t);
    return n.has(e) ? (n.delete(e), n) : (n.add(e), n);
  },
  ll = (e, t) => e.stories.flatMap((n) => n.variants.filter((r) => wr(r, t))),
  og = (e) => e.flatMap((t) => t.stories.flatMap((n) => n.variants)),
  $d = (e) => {
    let t = og(e),
      n = new Map(nl.map((r) => [r, 0]));
    n.set('all', t.length);
    for (let r of t) {
      let o = kr(r.status);
      n.set(o, (n.get(o) ?? 0) + 1);
    }
    return n;
  },
  Bd = (e, t) => e.filter((n) => n.stories.some((r) => r.variants.some((o) => wr(o, t)))),
  Ud = (e, t) => (t.length ? (e && t.some((n) => n.key === e) ? e : (t[0]?.key ?? null)) : null),
  jd = (e) => {
    let t = new Map();
    for (let n of e) {
      let r = t.get(n.namespace) ?? new Map(),
        o = r.get(n.atomicLevel) ?? [];
      (o.push(n), r.set(n.atomicLevel, o), t.set(n.namespace, r));
    }
    return [...t.entries()]
      .sort((n, r) => n[0].localeCompare(r[0]))
      .map(([n, r]) => ({
        namespace: n,
        levels: [...r.entries()]
          .sort((o, l) => o[0].localeCompare(l[0]))
          .map(([o, l]) => ({
            level: o,
            groups: [...l].sort((i, a) => i.component.localeCompare(a.component)),
          })),
      }));
  },
  Hd = (e, t) => e.get(t) ?? je,
  il = (e, t) => (t.includes(e) ? e : t.includes(je) ? je : (t[0] ?? je));
var al = {
    failed: {
      border: f.colors.semantic.errorDark,
      text: f.colors.semantic.errorLight,
      bg: f.colors.secondary[900],
    },
    flaky: {
      border: f.colors.semantic.warning,
      text: f.colors.semantic.warningLight,
      bg: f.colors.secondary[900],
    },
    passed: {
      border: f.colors.semantic.successDark,
      text: f.colors.semantic.successLight,
      bg: f.colors.secondary[900],
    },
    skipped: {
      border: f.colors.secondary[600],
      text: f.colors.neutral.gray[300],
      bg: f.colors.secondary[900],
    },
    unknown: {
      border: f.colors.secondary[600],
      text: f.colors.neutral.gray[300],
      bg: f.colors.secondary[900],
    },
  },
  xr = {
    root: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      minHeight: '100vh',
      background: f.colors.secondary[950],
      color: f.colors.neutral.gray[100],
      fontFamily: f.typography.fontFamily.sans.join(', '),
    },
    sidebar: {
      borderRight: `1px solid ${f.colors.secondary[800]}`,
      padding: f.spacing[4],
      background: f.colors.secondary[900],
      overflowY: 'auto',
      minHeight: 0,
    },
    content: {
      padding: f.spacing[4],
      overflowY: 'auto',
      minHeight: 0,
      background: f.colors.secondary[950],
    },
    toolbar: {
      position: 'sticky',
      top: 0,
      zIndex: Number(f.zIndex[20]),
      background: f.colors.secondary[950],
      paddingBottom: f.spacing[3],
      borderBottom: `1px solid ${f.colors.secondary[800]}`,
      boxShadow: `0 6px 10px ${f.colors.secondary[950]}`,
    },
  };
var En = b(R(), 1),
  Kd = ({ filter: e, label: t, count: n, active: r, onClick: o }) => {
    let l = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: f.spacing[2],
        border: 'none',
        borderRight: `1px solid ${f.colors.secondary[600]}`,
        background: r ? f.colors.primary[700] : f.colors.secondary[900],
        color: f.colors.neutral.gray[100],
        padding: `${f.spacing[2.5]} ${f.spacing[3.5]}`,
        cursor: 'pointer',
        fontSize: f.typography.fontSize.sm,
      },
      i = {
        minWidth: '22px',
        textAlign: 'center',
        fontSize: f.typography.fontSize.xs,
        borderRadius: '999px',
        padding: '2px 8px',
        background: r ? f.colors.primary[800] : f.colors.secondary[600],
        color: r ? f.colors.primary[100] : f.colors.neutral.gray[200],
      };
    return (0, En.jsxs)('button', {
      type: 'button',
      style: l,
      'aria-pressed': r,
      onClick: () => o(e),
      children: [
        (0, En.jsx)('span', { 'aria-hidden': !0, children: Id[e] }),
        (0, En.jsx)('span', { children: t }),
        (0, En.jsx)('span', { style: i, children: n }),
      ],
    });
  };
var Ia = b(R(), 1),
  Wd = ({ counts: e, selectedStatusFilters: t, onToggle: n }) => {
    let { t: r } = j(),
      o = {
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${f.colors.secondary[600]}`,
        borderRadius: f.borderRadius.xl,
        overflow: 'hidden',
      },
      l = (i) => (i === 'all' ? t.size === 0 : t.has(i));
    return (0, Ia.jsx)('div', {
      style: o,
      'aria-label': r('visualReport.filters.ariaLabel'),
      children: nl.map((i) =>
        (0, Ia.jsx)(
          Kd,
          {
            filter: i,
            label: r(`visualReport.filters.${i}`),
            count: e.get(i) ?? 0,
            active: l(i),
            onClick: n,
          },
          i,
        ),
      ),
    });
  };
var Yd = b(W(), 1);
var Gd = b(R(), 1),
  Qd = ({ status: e, count: t }) => {
    if (!t) return null;
    let n = al[e],
      r = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        borderRadius: '999px',
        border: `1px solid ${n.border}`,
        background: n.bg,
        color: n.text,
        fontSize: '0.68rem',
        lineHeight: 1,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
      };
    return (0, Gd.jsxs)('span', { style: r, 'aria-label': `${e} ${t}`, children: [rl[e], ' ', t] });
  };
var Pn = b(R(), 1),
  sl = ({ text: e, counts: t }) =>
    (0, Pn.jsxs)('span', {
      style: { display: 'inline-flex', alignItems: 'center', gap: '8px', minWidth: 0 },
      children: [
        (0, Pn.jsx)('span', { style: { minWidth: 0 }, children: e }),
        (0, Pn.jsx)('span', {
          style: { display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' },
          children: tl.map((o) => (0, Pn.jsx)(Qd, { status: o, count: t[o] }, o)),
        }),
      ],
    });
var _e = b(R(), 1),
  qd = ({ groups: e, selectedKey: t, selectedStatusFilters: n, onSelect: r }) => {
    let o = (0, Yd.useMemo)(() => jd(e), [e]),
      l = { marginTop: f.spacing[3.5], display: 'grid', gap: f.spacing[2.5] },
      i = {
        border: `1px solid ${f.colors.secondary[800]}`,
        borderRadius: f.borderRadius.lg,
        padding: f.spacing[2],
        background: f.colors.secondary[900],
      },
      a = { marginTop: f.spacing[2], display: 'grid', gap: f.spacing[1.5] },
      s = {
        textAlign: 'left',
        width: '100%',
        border: `1px solid ${f.colors.secondary[700]}`,
        background: f.colors.secondary[900],
        color: f.colors.neutral.gray[200],
        borderRadius: f.borderRadius.md,
        padding: '6px 8px',
        cursor: 'pointer',
      };
    return (0, _e.jsx)('div', {
      style: l,
      'aria-label': 'Component hierarchy',
      children: o.map((c) => {
        let g = bn([]);
        for (let y of c.levels) for (let w of y.groups) g = Aa(g, bn(ll(w, n)));
        let m = ol(g);
        return (0, _e.jsxs)(
          'details',
          {
            open: !0,
            style: i,
            children: [
              (0, _e.jsx)('summary', {
                'aria-label': m ? `${c.namespace}. ${m}` : c.namespace,
                children: (0, _e.jsx)(sl, { text: c.namespace, counts: g }),
              }),
              c.levels.map((y) => {
                let w = bn([]);
                for (let L of y.groups) w = Aa(w, bn(ll(L, n)));
                let h = `${y.level} (${y.groups.length})`,
                  v = ol(w);
                return (0, _e.jsxs)(
                  'details',
                  {
                    open: !0,
                    style: i,
                    children: [
                      (0, _e.jsx)('summary', {
                        'aria-label': v ? `${h}. ${v}` : h,
                        children: (0, _e.jsx)(sl, { text: h, counts: w }),
                      }),
                      (0, _e.jsx)('div', {
                        style: a,
                        children: y.groups.map((L) => {
                          let d = ll(L, n),
                            u = d.length,
                            p = bn(d),
                            S = `${L.component} (${u})`,
                            x = ol(p);
                          return (0, _e.jsx)(
                            'button',
                            {
                              type: 'button',
                              style: {
                                ...s,
                                borderColor:
                                  t === L.key ? f.colors.primary[400] : f.colors.secondary[700],
                                background:
                                  t === L.key ? f.colors.primary[950] : f.colors.secondary[900],
                              },
                              'aria-label': x ? `${S}. ${x}` : S,
                              onClick: () => r(L.key),
                              children: (0, _e.jsx)(sl, { text: S, counts: p }),
                            },
                            L.key,
                          );
                        }),
                      }),
                    ],
                  },
                  `${c.namespace}-${y.level}`,
                );
              }),
            ],
          },
          c.namespace,
        );
      }),
    });
  };
var np = b(W(), 1);
var Zd = b(R(), 1),
  Xd = ({ status: e }) => {
    let t = kr(e),
      n = al[t],
      r = {
        borderRadius: '999px',
        fontSize: '0.75rem',
        padding: '2px 8px',
        border: `1px solid ${n.border}`,
        color: n.text,
        background: n.bg,
        whiteSpace: 'nowrap',
      };
    return (0, Zd.jsxs)('span', {
      style: r,
      'aria-label': `Status: ${t}`,
      children: [rl[t], ' ', t],
    });
  };
var ul = (e, t) => {
  if (!e) return null;
  if (!t) return e;
  let n = e.includes('?') ? '&' : '?';
  return `${e}${n}v=${encodeURIComponent(t)}`;
};
var Cr = b(R(), 1),
  Ln = ({ imageUrl: e, altText: t, missingKey: n }) => {
    let { t: r } = j(),
      o = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${f.colors.secondary[800]}`,
        borderRadius: f.borderRadius.lg,
        overflow: 'hidden',
        background: f.colors.secondary[950],
        padding: f.spacing[3],
        minHeight: '120px',
      },
      l = {
        color: f.colors.neutral.gray[400],
        border: `1px dashed ${f.colors.secondary[600]}`,
        borderRadius: f.borderRadius.lg,
        padding: f.spacing[3],
      };
    return e
      ? (0, Cr.jsx)('div', {
          style: o,
          children: (0, Cr.jsx)('img', {
            src: e,
            alt: t,
            draggable: !1,
            style: { maxWidth: '100%', height: 'auto' },
          }),
        })
      : (0, Cr.jsx)('div', {
          style: o,
          children: (0, Cr.jsx)('div', { style: l, children: r(n) }),
        });
  };
var at = b(W(), 1);
var he = b(R(), 1),
  Jd = ({ expectedUrl: e, actualUrl: t, altBase: n }) => {
    let { t: r } = j(),
      o = (0, at.useRef)(null),
      l = (0, at.useId)(),
      [i, a] = (0, at.useState)(50),
      [s, c] = (0, at.useState)('horizontal');
    (0, at.useEffect)(() => {
      a(50);
    }, [s, e, t]);
    let g = {
      color: f.colors.neutral.gray[400],
      border: `1px dashed ${f.colors.secondary[600]}`,
      borderRadius: f.borderRadius.lg,
      padding: f.spacing[3],
    };
    if (!e || !t)
      return (0, he.jsx)('div', {
        style: {
          border: `1px solid ${f.colors.secondary[800]}`,
          borderRadius: f.borderRadius.lg,
          padding: f.spacing[3],
        },
        children: (0, he.jsx)('div', {
          style: g,
          children: r('visualReport.messages.missingExpectedActual'),
        }),
      });
    let m = `${i}%`,
      y = s === 'vertical' ? `inset(0 0 ${100 - i}% 0)` : `inset(0 ${100 - i}% 0 0)`,
      w = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: `1px solid ${f.colors.secondary[800]}`,
        borderRadius: f.borderRadius.lg,
        overflow: 'hidden',
        background: f.colors.secondary[950],
        padding: f.spacing[3],
        width: '100%',
      },
      h = {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minHeight: '200px',
        overflow: 'hidden',
      },
      v = {
        display: 'block',
        width: '100%',
        height: 'auto',
        userSelect: 'none',
        pointerEvents: 'none',
      },
      L = { position: 'absolute', inset: 0, clipPath: y },
      d =
        s === 'vertical'
          ? {
              position: 'absolute',
              left: 0,
              right: 0,
              top: m,
              height: '2px',
              background: f.colors.primary[400],
            }
          : {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: m,
              width: '2px',
              background: f.colors.primary[400],
            },
      u = (p, S) => {
        let x = o.current;
        if (!x) return;
        let E = x.getBoundingClientRect();
        if (!E.width || !E.height) return;
        let P = Math.round(
          s === 'vertical'
            ? (Math.min(Math.max(S - E.top, 0), E.height) / E.height) * 100
            : (Math.min(Math.max(p - E.left, 0), E.width) / E.width) * 100,
        );
        a(P);
      };
    return (0, he.jsxs)('div', {
      style: w,
      children: [
        (0, he.jsxs)('div', {
          ref: o,
          style: h,
          onPointerDown: (p) => u(p.clientX, p.clientY),
          onPointerMove: (p) => {
            p.buttons === 1 && u(p.clientX, p.clientY);
          },
          children: [
            (0, he.jsx)('img', { src: e, alt: `${n} expected`, draggable: !1, style: v }),
            (0, he.jsx)('div', {
              style: L,
              children: (0, he.jsx)('img', { src: t, alt: `${n} actual`, draggable: !1, style: v }),
            }),
            (0, he.jsx)('div', { style: d }),
          ],
        }),
        (0, he.jsxs)('div', {
          style: {
            marginTop: f.spacing[2],
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: f.spacing[2],
          },
          children: [
            (0, he.jsx)('label', {
              htmlFor: l,
              style: { color: f.colors.neutral.gray[400], fontSize: f.typography.fontSize.xs },
              children: r('visualReport.modes.slider'),
            }),
            (0, he.jsx)('button', {
              type: 'button',
              style: {
                border: `1px solid ${f.colors.secondary[600]}`,
                background: f.colors.secondary[900],
                color: f.colors.neutral.gray[200],
                borderRadius: f.borderRadius.md,
                padding: '4px 8px',
                cursor: 'pointer',
              },
              onClick: () => c((p) => (p === 'horizontal' ? 'vertical' : 'horizontal')),
              children: r(
                s === 'vertical'
                  ? 'visualReport.modes.slideUpDown'
                  : 'visualReport.modes.slideLeftRight',
              ),
            }),
          ],
        }),
        (0, he.jsx)('input', {
          id: l,
          type: 'range',
          min: 0,
          max: 100,
          value: i,
          onChange: (p) => a(Number(p.target.value)),
          'aria-label': r('visualReport.modes.sliderAria'),
          style: { width: '100%', marginTop: f.spacing[2] },
        }),
      ],
    });
  };
var Ee = b(R(), 1),
  ep = ({ mode: e, generatedAt: t, expected: n, actual: r, diff: o, altBase: l }) => {
    let { t: i } = j(),
      a = ul(n, t),
      s = ul(r, t),
      c = ul(o ?? null, t);
    if (e === 'diff')
      return (0, Ee.jsx)(Ln, {
        imageUrl: c,
        altText: `${l} diff`,
        missingKey: 'visualReport.messages.missingDiff',
      });
    if (e === 'actual')
      return (0, Ee.jsx)(Ln, {
        imageUrl: s,
        altText: `${l} actual`,
        missingKey: 'visualReport.messages.missingActual',
      });
    if (e === 'expected')
      return (0, Ee.jsx)(Ln, {
        imageUrl: a,
        altText: `${l} expected`,
        missingKey: 'visualReport.messages.missingExpected',
      });
    if (e === 'side-by-side') {
      let g = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' },
        m = { margin: '0 0 6px', fontSize: '0.8rem', fontWeight: 600 };
      return (0, Ee.jsxs)('div', {
        style: g,
        children: [
          (0, Ee.jsxs)('section', {
            children: [
              (0, Ee.jsx)('h4', { style: m, children: i('visualReport.modes.expected') }),
              (0, Ee.jsx)(Ln, {
                imageUrl: a,
                altText: `${l} expected`,
                missingKey: 'visualReport.messages.missingExpected',
              }),
            ],
          }),
          (0, Ee.jsxs)('section', {
            children: [
              (0, Ee.jsx)('h4', { style: m, children: i('visualReport.modes.actual') }),
              (0, Ee.jsx)(Ln, {
                imageUrl: s,
                altText: `${l} actual`,
                missingKey: 'visualReport.messages.missingActual',
              }),
            ],
          }),
        ],
      });
    }
    return (0, Ee.jsx)(Jd, { expectedUrl: a, actualUrl: s, altBase: l });
  };
var br = b(W(), 1);
var Oa = b(R(), 1),
  tp = ({ variant: e, variantKey: t, activeMode: n, onModeChange: r }) => {
    let { t: o } = j(),
      l = (0, br.useRef)({}),
      i = (0, br.useMemo)(() => {
        let h = new Set();
        return (e.status === 'passed' && h.add('diff'), h);
      }, [e.status]),
      a = (0, br.useMemo)(() => Da.filter((h) => !i.has(h.value)).map((h) => h.value), [i]),
      s = `variant-${t.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
      c = (h) => {
        let v = () => l.current[h]?.focus();
        if ((v(), typeof globalThis.requestAnimationFrame == 'function')) {
          globalThis.requestAnimationFrame(v);
          return;
        }
        setTimeout(v, 0);
      },
      g = (h, v = !1) => {
        (r(h, v), v && c(h));
      },
      m = (h) => {
        let v = il(n, a),
          d = (a.indexOf(v) + h + a.length) % a.length;
        g(a[d] ?? je, !0);
      },
      y = (h) => {
        if (h.key === 'ArrowRight' || h.key === 'ArrowDown') {
          (h.preventDefault(), m(1));
          return;
        }
        if (h.key === 'ArrowLeft' || h.key === 'ArrowUp') {
          (h.preventDefault(), m(-1));
          return;
        }
        if (h.key === 'Home') {
          (h.preventDefault(), g(a[0] ?? je, !0));
          return;
        }
        h.key === 'End' && (h.preventDefault(), g(a[a.length - 1] ?? je, !0));
      },
      w = {
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: f.spacing[2.5],
      };
    return (0, Oa.jsx)('div', {
      role: 'tablist',
      'aria-label': o('visualReport.modes.ariaLabel'),
      style: w,
      children: Da.map((h) => {
        let v = i.has(h.value),
          L = n === h.value,
          d = {
            border: `1px solid ${L ? f.colors.primary[400] : f.colors.secondary[600]}`,
            background: L ? f.colors.primary[950] : f.colors.secondary[900],
            color: f.colors.neutral.gray[100],
            borderRadius: f.borderRadius.md,
            padding: '6px 10px',
            fontSize: f.typography.fontSize.xs,
            lineHeight: f.typography.lineHeight.tight,
            cursor: v ? 'not-allowed' : 'pointer',
            opacity: v ? 0.45 : 1,
          };
        return (0, Oa.jsx)(
          'button',
          {
            id: `${s}-tab-${h.value}`,
            type: 'button',
            role: 'tab',
            'aria-controls': `${s}-panel`,
            'aria-selected': L,
            'aria-disabled': v,
            disabled: v,
            tabIndex: L ? 0 : -1,
            style: d,
            onKeyDown: y,
            onClick: () => !v && g(h.value),
            ref: (u) => {
              l.current[h.value] = u;
            },
            children: o(h.labelKey),
          },
          h.value,
        );
      }),
    });
  };
var st = b(R(), 1),
  rp = ({ story: e, variant: t, generatedAt: n, activeMode: r, onModeChange: o }) => {
    let l = `${e.id}::${t.viewport}`,
      i = `variant-${l.replace(/[^a-zA-Z0-9_-]/g, '-')}-panel`,
      a = `${e.name} ${t.viewport}`,
      s = (0, np.useMemo)(
        () =>
          t.status === 'passed'
            ? ['actual', 'expected', 'side-by-side', 'slider']
            : ['diff', 'actual', 'expected', 'side-by-side', 'slider'],
        [t.status],
      ),
      c = il(r, s) ?? je,
      g = {
        border: `1px solid ${f.colors.secondary[800]}`,
        borderRadius: f.borderRadius.xl,
        background: f.colors.secondary[900],
        padding: f.spacing[3],
      },
      m = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: f.spacing[2.5],
        marginBottom: f.spacing[2.5],
      };
    return (0, st.jsxs)('article', {
      style: g,
      children: [
        (0, st.jsxs)('header', {
          style: m,
          children: [
            (0, st.jsxs)('h3', {
              style: { margin: 0, fontSize: f.typography.fontSize.sm },
              children: [e.name, ' \xB7 ', t.viewport],
            }),
            (0, st.jsx)(Xd, { status: t.status }),
          ],
        }),
        (0, st.jsx)(tp, { variant: t, variantKey: l, activeMode: c, onModeChange: (y) => o(l, y) }),
        (0, st.jsx)('div', {
          id: i,
          role: 'tabpanel',
          'aria-label': `Comparison preview for ${e.name} ${t.viewport}`,
          style: { minWidth: 0 },
          children: (0, st.jsx)(ep, {
            mode: c,
            generatedAt: n,
            expected: t.expected,
            actual: t.actual,
            diff: t.diff ?? null,
            altBase: a,
          }),
        }),
      ],
    });
  };
var ae = b(R(), 1),
  op = ({ data: e }) => {
    let { t } = j(),
      n = (0, Pe.useMemo)(() => Od(e), [e]),
      [r, o] = (0, Pe.useState)(new Set()),
      [l, i] = (0, Pe.useState)(n.componentGroups[0]?.key ?? null),
      [a, s] = (0, Pe.useState)(new Map()),
      c = (0, Pe.useMemo)(() => Bd(n.componentGroups, r), [n.componentGroups, r]);
    (0, Pe.useEffect)(() => {
      i((v) => Ud(v, c));
    }, [c]);
    let g = (0, Pe.useMemo)(() => $d(n.componentGroups), [n.componentGroups]),
      m = (0, Pe.useMemo)(() => c.find((v) => v.key === l) ?? null, [c, l]),
      y = (0, Pe.useMemo)(
        () =>
          m ? m.stories.reduce((v, L) => v + L.variants.filter((d) => wr(d, r)).length, 0) : 0,
        [m, r],
      ),
      w = (0, Pe.useMemo)(
        () => (m ? m.stories.reduce((v, L) => v + L.variants.length, 0) : 0),
        [m],
      ),
      h = m
        ? t('visualReport.selection.shownOf', { shown: y, total: w })
        : t('visualReport.selection.tryDifferentFilter');
    return (0, ae.jsxs)('main', {
      style: xr.root,
      children: [
        (0, ae.jsxs)('aside', {
          style: xr.sidebar,
          children: [
            (0, ae.jsxs)('header', {
              children: [
                (0, ae.jsx)('h1', {
                  style: { margin: 0, fontSize: '1.1rem' },
                  children: t('visualReport.title'),
                }),
                (0, ae.jsx)('p', {
                  style: {
                    margin: '6px 0 0',
                    color: f.colors.neutral.gray[400],
                    fontSize: '0.85rem',
                  },
                  children: t('visualReport.generatedAt', {
                    date: new Date(e.generatedAt).toLocaleString(),
                    count: n.componentGroups.length,
                  }),
                }),
              ],
            }),
            (0, ae.jsx)(qd, { groups: c, selectedKey: l, selectedStatusFilters: r, onSelect: i }),
          ],
        }),
        (0, ae.jsxs)('section', {
          style: xr.content,
          children: [
            (0, ae.jsx)('div', {
              style: xr.toolbar,
              children: (0, ae.jsx)(Wd, {
                counts: g,
                selectedStatusFilters: r,
                onToggle: (v) => {
                  o((L) => Vd(v, L));
                },
              }),
            }),
            (0, ae.jsxs)('header', {
              children: [
                (0, ae.jsx)('h2', {
                  style: { margin: 0, fontSize: '1.2rem' },
                  children: m
                    ? `${m.namespace} / ${m.atomicLevel} / ${m.component}`
                    : t('visualReport.selection.noMatchingComponents'),
                }),
                (0, ae.jsx)('p', {
                  style: { margin: '6px 0 0', color: f.colors.neutral.gray[400] },
                  children: h,
                }),
              ],
            }),
            (0, ae.jsx)('div', {
              style: { marginTop: f.spacing[4], display: 'grid', gap: f.spacing[3.5] },
              children: m?.stories
                .slice()
                .sort((v, L) => v.name.localeCompare(L.name))
                .flatMap((v) =>
                  v.variants
                    .filter((L) => wr(L, r))
                    .map((L) => {
                      let d = `${v.id}::${L.viewport}`;
                      return (0, ae.jsx)(
                        rp,
                        {
                          story: v,
                          variant: L,
                          generatedAt: e.generatedAt,
                          activeMode: Hd(a, d),
                          onModeChange: (u, p) => {
                            s((S) => {
                              let x = new Map(S);
                              return (x.set(u, p), x);
                            });
                          },
                        },
                        d,
                      );
                    }),
                ),
            }),
          ],
        }),
      ],
    });
  };
var Er = b(R(), 1),
  ip = 'visual-report-root',
  ap = (e) => {
    let t = document.getElementById(ip);
    if (!t) return;
    (0, Va.createRoot)(t).render(
      (0, Er.jsx)('div', {
        style: {
          padding: '16px',
          color: f.colors.semantic.errorLight,
          background: f.colors.secondary[900],
          border: `1px solid ${f.colors.semantic.errorDark}`,
          borderRadius: f.borderRadius.lg,
          fontFamily: f.typography.fontFamily.sans.join(','),
        },
        role: 'alert',
        'aria-live': 'assertive',
        children: e,
      }),
    );
  },
  lg = async () => {
    let e = document.getElementById(ip);
    if (!e) return;
    let t = await fetch('/visual-report/data.json', { cache: 'no-store' });
    if (!t.ok) {
      ap('data.json not found. Run: pnpm run report:visual:build');
      return;
    }
    let n = await t.json();
    (0, Va.createRoot)(e).render(
      (0, Er.jsx)(lp.default.StrictMode, {
        children: (0, Er.jsx)(_a, { locale: 'en', children: (0, Er.jsx)(op, { data: n }) }),
      }),
    );
  };
lg().catch((e) => {
  let t = e instanceof Error ? e.message : String(e);
  ap(`Failed to load report data: ${t}`);
});
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
