WPGroHo = jQuery.extend(
  {
    my_hash: "",
    data: {},
    renderers: {},
    syncProfileData: function(hash, id) {
      if (!WPGroHo.data[hash]) {
        WPGroHo.data[hash] = {};
        jQuery("div.grofile-hash-map-" + hash + " span").each(function() {
          WPGroHo.data[hash][this.className] = jQuery(this).text();
        });
      }
      WPGroHo.appendProfileData(WPGroHo.data[hash], hash, id);
    },
    appendProfileData: function(data, hash, id) {
      for (var key in data) {
        if (jQuery.isFunction(WPGroHo.renderers[key])) {
          return WPGroHo.renderers[key](data[key], hash, id, key);
        }
        jQuery("#" + id)
          .find("h4")
          .after(
            jQuery('<p class="grav-extra ' + key + '" />').html(data[key])
          );
      }
    }
  },
  WPGroHo
);
jQuery(document).ready(function() {
  if ("undefined" === typeof Gravatar) {
    return;
  }
  Gravatar.profile_cb = function(h, d) {
    WPGroHo.syncProfileData(h, d);
  };
  Gravatar.my_hash = WPGroHo.my_hash;
  Gravatar.init("body", "#wpadminbar");
});
!(function(t, e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
      ? (module.exports = e(require, exports, module))
      : (t.Tether = e());
})(this, function(t, e, o) {
  "use strict";
  function n(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(t) {
    var e = t.getBoundingClientRect(),
      o = {};
    for (var n in e) o[n] = e[n];
    if (t.ownerDocument !== document) {
      var r = t.ownerDocument.defaultView.frameElement;
      if (r) {
        var s = i(r);
        (o.top += s.top), (o.bottom += s.top), (o.left += s.left), (o.right +=
          s.left);
      }
    }
    return o;
  }
  function r(t) {
    var e = getComputedStyle(t) || {},
      o = e.position,
      n = [];
    if ("fixed" === o) return [t];
    for (var i = t; (i = i.parentNode) && i && 1 === i.nodeType; ) {
      var r = void 0;
      try {
        r = getComputedStyle(i);
      } catch (s) {}
      if ("undefined" == typeof r || null === r) return n.push(i), n;
      var a = r,
        f = a.overflow,
        l = a.overflowX,
        h = a.overflowY;
      /(auto|scroll)/.test(f + h + l) &&
        ("absolute" !== o ||
          ["relative", "absolute", "fixed"].indexOf(r.position) >= 0) &&
        n.push(i);
    }
    return n.push(
      t.ownerDocument.body
    ), t.ownerDocument !== document && n.push(t.ownerDocument.defaultView), n;
  }
  function s() {
    A && document.body.removeChild(A), (A = null);
  }
  function a(t) {
    var e = void 0;
    t === document
      ? ((e = document), (t = document.documentElement))
      : (e = t.ownerDocument);
    var o = e.documentElement,
      n = i(t),
      r = P();
    return (n.top -=
      r.top), (n.left -= r.left), "undefined" == typeof n.width && (n.width = document.body.scrollWidth - n.left - n.right), "undefined" == typeof n.height && (n.height = document.body.scrollHeight - n.top - n.bottom), (n.top = n.top - o.clientTop), (n.left = n.left - o.clientLeft), (n.right = e.body.clientWidth - n.width - n.left), (n.bottom = e.body.clientHeight - n.height - n.top), n;
  }
  function f(t) {
    return t.offsetParent || document.documentElement;
  }
  function l() {
    var t = document.createElement("div");
    (t.style.width = "100%"), (t.style.height = "200px");
    var e = document.createElement("div");
    h(e.style, {
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      visibility: "hidden",
      width: "200px",
      height: "150px",
      overflow: "hidden"
    }), e.appendChild(t), document.body.appendChild(e);
    var o = t.offsetWidth;
    e.style.overflow = "scroll";
    var n = t.offsetWidth;
    o === n && (n = e.clientWidth), document.body.removeChild(e);
    var i = o - n;
    return { width: i, height: i };
  }
  function h() {
    var t =
        arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
      e = [];
    return Array.prototype.push.apply(
      e,
      arguments
    ), e.slice(1).forEach(function(e) {
      if (e) for (var o in e) ({}.hasOwnProperty.call(e, o) && (t[o] = e[o]));
    }), t;
  }
  function u(t, e) {
    if ("undefined" != typeof t.classList)
      e.split(" ").forEach(function(e) {
        e.trim() && t.classList.remove(e);
      });
    else {
      var o = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
        n = c(t).replace(o, " ");
      g(t, n);
    }
  }
  function d(t, e) {
    if ("undefined" != typeof t.classList)
      e.split(" ").forEach(function(e) {
        e.trim() && t.classList.add(e);
      });
    else {
      u(t, e);
      var o = c(t) + (" " + e);
      g(t, o);
    }
  }
  function p(t, e) {
    if ("undefined" != typeof t.classList) return t.classList.contains(e);
    var o = c(t);
    return new RegExp("(^| )" + e + "( |$)", "gi").test(o);
  }
  function c(t) {
    return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString
      ? t.className.baseVal
      : t.className;
  }
  function g(t, e) {
    t.setAttribute("class", e);
  }
  function m(t, e, o) {
    o.forEach(function(o) {
      -1 === e.indexOf(o) && p(t, o) && u(t, o);
    }), e.forEach(function(e) {
      p(t, e) || d(t, e);
    });
  }
  function n(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function v(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e
      );
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 }
    })), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
  }
  function y(t, e) {
    var o = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
    return t + o >= e && e >= t - o;
  }
  function b() {
    return "undefined" != typeof performance &&
    "undefined" != typeof performance.now
      ? performance.now()
      : +new Date();
  }
  function w() {
    for (
      var t = { top: 0, left: 0 }, e = arguments.length, o = Array(e), n = 0;
      e > n;
      n++
    )
      o[n] = arguments[n];
    return o.forEach(function(e) {
      var o = e.top,
        n = e.left;
      "string" == typeof o &&
        (o = parseFloat(
          o,
          10
        )), "string" == typeof n && (n = parseFloat(n, 10)), (t.top += o), (t.left += n);
    }), t;
  }
  function C(t, e) {
    return "string" == typeof t.left &&
      -1 !== t.left.indexOf("%") &&
      (t.left =
        parseFloat(t.left, 10) /
        100 *
        e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = parseFloat(t.top, 10) / 100 * e.height), t;
  }
  function O(t, e) {
    return "scrollParent" === e
      ? (e = t.scrollParents[0])
      : "window" === e &&
        (e = [
          pageXOffset,
          pageYOffset,
          innerWidth + pageXOffset,
          innerHeight + pageYOffset
        ]), e === document && (e = e.documentElement), "undefined" !=
      typeof e.nodeType &&
      !(function() {
        var t = e,
          o = a(e),
          n = o,
          i = getComputedStyle(e);
        if (
          (
            (e = [n.left, n.top, o.width + n.left, o.height + n.top]),
            t.ownerDocument !== document
          )
        ) {
          var r = t.ownerDocument.defaultView;
          (e[0] += r.pageXOffset), (e[1] += r.pageYOffset), (e[2] +=
            r.pageXOffset), (e[3] += r.pageYOffset);
        }
        $.forEach(function(t, o) {
          (t =
            t[0].toUpperCase() +
            t.substr(
              1
            )), "Top" === t || "Left" === t ? (e[o] += parseFloat(i["border" + t + "Width"])) : (e[o] -= parseFloat(i["border" + t + "Width"]));
        });
      })(), e;
  }
  var E = (function() {
      function t(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in
            n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
      }
      return function(e, o, n) {
        return o && t(e.prototype, o), n && t(e, n), e;
      };
    })(),
    x = void 0;
  "undefined" == typeof x && (x = { modules: [] });
  var A = null,
    T = (function() {
      var t = 0;
      return function() {
        return ++t;
      };
    })(),
    S = {},
    P = function() {
      var t = A;
      t ||
        (
          (t = document.createElement("div")),
          t.setAttribute("data-tether-id", T()),
          h(t.style, { top: 0, left: 0, position: "absolute" }),
          document.body.appendChild(t),
          (A = t)
        );
      var e = t.getAttribute("data-tether-id");
      return "undefined" == typeof S[e] &&
        (
          (S[e] = i(t)),
          M(function() {
            delete S[e];
          })
        ), S[e];
    },
    W = [],
    M = function(t) {
      W.push(t);
    },
    _ = function() {
      for (var t = void 0; (t = W.pop()); ) t();
    },
    k = (function() {
      function t() {
        n(this, t);
      }
      return E(t, [
        {
          key: "on",
          value: function(t, e, o) {
            var n =
              arguments.length <= 3 || void 0 === arguments[3]
                ? !1
                : arguments[3];
            "undefined" == typeof this.bindings &&
              (this.bindings = {}), "undefined" == typeof this.bindings[t] &&
              (this.bindings[t] = []), this.bindings[t].push({
              handler: e,
              ctx: o,
              once: n
            });
          }
        },
        {
          key: "once",
          value: function(t, e, o) {
            this.on(t, e, o, !0);
          }
        },
        {
          key: "off",
          value: function(t, e) {
            if (
              "undefined" != typeof this.bindings &&
              "undefined" != typeof this.bindings[t]
            )
              if ("undefined" == typeof e) delete this.bindings[t];
              else
                for (var o = 0; o < this.bindings[t].length; )
                  this.bindings[t][o].handler === e
                    ? this.bindings[t].splice(o, 1)
                    : ++o;
          }
        },
        {
          key: "trigger",
          value: function(t) {
            if ("undefined" != typeof this.bindings && this.bindings[t]) {
              for (
                var e = 0,
                  o = arguments.length,
                  n = Array(o > 1 ? o - 1 : 0),
                  i = 1;
                o > i;
                i++
              )
                n[i - 1] = arguments[i];
              for (; e < this.bindings[t].length; ) {
                var r = this.bindings[t][e],
                  s = r.handler,
                  a = r.ctx,
                  f = r.once,
                  l = a;
                "undefined" == typeof l && (l = this), s.apply(l, n), f
                  ? this.bindings[t].splice(e, 1)
                  : ++e;
              }
            }
          }
        }
      ]), t;
    })();
  x.Utils = {
    getActualBoundingClientRect: i,
    getScrollParents: r,
    getBounds: a,
    getOffsetParent: f,
    extend: h,
    addClass: d,
    removeClass: u,
    hasClass: p,
    updateClasses: m,
    defer: M,
    flush: _,
    uniqueId: T,
    Evented: k,
    getScrollBarSize: l,
    removeUtilElements: s
  };
  var B = (function() {
      function t(t, e) {
        var o = [],
          n = !0,
          i = !1,
          r = void 0;
        try {
          for (
            var s, a = t[Symbol.iterator]();
            !(n = (s = a.next()).done) &&
            (o.push(s.value), !e || o.length !== e);
            n = !0
          );
        } catch (f) {
          (i = !0), (r = f);
        } finally {
          try {
            !n && a["return"] && a["return"]();
          } finally {
            if (i) throw r;
          }
        }
        return o;
      }
      return function(e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })(),
    E = (function() {
      function t(t, e) {
        for (var o = 0; o < e.length; o++) {
          var n = e[o];
          (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in
            n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
      }
      return function(e, o, n) {
        return o && t(e.prototype, o), n && t(e, n), e;
      };
    })(),
    z = function(t, e, o) {
      for (var n = !0; n; ) {
        var i = t,
          r = e,
          s = o;
        (n = !1), null === i && (i = Function.prototype);
        var a = Object.getOwnPropertyDescriptor(i, r);
        if (void 0 !== a) {
          if ("value" in a) return a.value;
          var f = a.get;
          if (void 0 === f) return;
          return f.call(s);
        }
        var l = Object.getPrototypeOf(i);
        if (null === l) return;
        (t = l), (e = r), (o = s), (n = !0), (a = l = void 0);
      }
    };
  if ("undefined" == typeof x)
    throw new Error("You must include the utils.js file before tether.js");
  var j = x.Utils,
    r = j.getScrollParents,
    a = j.getBounds,
    f = j.getOffsetParent,
    h = j.extend,
    d = j.addClass,
    u = j.removeClass,
    m = j.updateClasses,
    M = j.defer,
    _ = j.flush,
    l = j.getScrollBarSize,
    s = j.removeUtilElements,
    Y = (function() {
      if ("undefined" == typeof document) return "";
      for (
        var t = document.createElement("div"),
          e = [
            "transform",
            "WebkitTransform",
            "OTransform",
            "MozTransform",
            "msTransform"
          ],
          o = 0;
        o < e.length;
        ++o
      ) {
        var n = e[o];
        if (void 0 !== t.style[n]) return n;
      }
    })(),
    L = [],
    D = function() {
      L.forEach(function(t) {
        t.position(!1);
      }), _();
    };
  !(function() {
    var t = null,
      e = null,
      o = null,
      n = function i() {
        return "undefined" != typeof e && e > 16
          ? ((e = Math.min(e - 16, 250)), void (o = setTimeout(i, 250)))
          : void (
              ("undefined" != typeof t && b() - t < 10) ||
              (
                null != o && (clearTimeout(o), (o = null)),
                (t = b()),
                D(),
                (e = b() - t)
              )
            );
      };
    "undefined" != typeof window &&
      "undefined" != typeof window.addEventListener &&
      ["resize", "scroll", "touchmove"].forEach(function(t) {
        window.addEventListener(t, n);
      });
  })();
  var X = { center: "center", left: "right", right: "left" },
    F = { middle: "middle", top: "bottom", bottom: "top" },
    H = {
      top: 0,
      left: 0,
      middle: "50%",
      center: "50%",
      bottom: "100%",
      right: "100%"
    },
    N = function(t, e) {
      var o = t.left,
        n = t.top;
      return "auto" === o && (o = X[e.left]), "auto" === n && (n = F[e.top]), {
        left: o,
        top: n
      };
    },
    U = function(t) {
      var e = t.left,
        o = t.top;
      return "undefined" != typeof H[t.left] && (e = H[t.left]), "undefined" !=
        typeof H[t.top] && (o = H[t.top]), { left: e, top: o };
    },
    V = function(t) {
      var e = t.split(" "),
        o = B(e, 2),
        n = o[0],
        i = o[1];
      return { top: n, left: i };
    },
    R = V,
    q = (function(t) {
      function e(t) {
        var o = this;
        n(this, e), z(
          Object.getPrototypeOf(e.prototype),
          "constructor",
          this
        ).call(this), (this.position = this.position.bind(this)), L.push(
          this
        ), (this.history = []), this.setOptions(
          t,
          !1
        ), x.modules.forEach(function(t) {
          "undefined" != typeof t.initialize && t.initialize.call(o);
        }), this.position();
      }
      return v(e, t), E(e, [
        {
          key: "getClass",
          value: function() {
            var t =
                arguments.length <= 0 || void 0 === arguments[0]
                  ? ""
                  : arguments[0],
              e = this.options.classes;
            return "undefined" != typeof e && e[t]
              ? this.options.classes[t]
              : this.options.classPrefix
                ? this.options.classPrefix + "-" + t
                : t;
          }
        },
        {
          key: "setOptions",
          value: function(t) {
            var e = this,
              o =
                arguments.length <= 1 || void 0 === arguments[1]
                  ? !0
                  : arguments[1],
              n = {
                offset: "0 0",
                targetOffset: "0 0",
                targetAttachment: "auto auto",
                classPrefix: "tether"
              };
            this.options = h(n, t);
            var i = this.options,
              s = i.element,
              a = i.target,
              f = i.targetModifier;
            if (
              (
                (this.element = s),
                (this.target = a),
                (this.targetModifier = f),
                "viewport" === this.target
                  ? (
                      (this.target = document.body),
                      (this.targetModifier = "visible")
                    )
                  : "scroll-handle" === this.target &&
                    (
                      (this.target = document.body),
                      (this.targetModifier = "scroll-handle")
                    ),
                ["element", "target"].forEach(function(t) {
                  if ("undefined" == typeof e[t])
                    throw new Error(
                      "Tether Error: Both element and target must be defined"
                    );
                  "undefined" != typeof e[t].jquery
                    ? (e[t] = e[t][0])
                    : "string" == typeof e[t] &&
                      (e[t] = document.querySelector(e[t]));
                }),
                d(this.element, this.getClass("element")),
                this.options.addTargetClasses !== !1 &&
                  d(this.target, this.getClass("target")),
                !this.options.attachment
              )
            )
              throw new Error("Tether Error: You must provide an attachment");
            (this.targetAttachment = R(
              this.options.targetAttachment
            )), (this.attachment = R(
              this.options.attachment
            )), (this.offset = V(this.options.offset)), (this.targetOffset = V(
              this.options.targetOffset
            )), "undefined" != typeof this.scrollParents &&
              this.disable(), "scroll-handle" === this.targetModifier
              ? (this.scrollParents = [this.target])
              : (this.scrollParents = r(this.target)), this.options.enabled !==
              !1 && this.enable(o);
          }
        },
        {
          key: "getTargetBounds",
          value: function() {
            if ("undefined" == typeof this.targetModifier)
              return a(this.target);
            if ("visible" === this.targetModifier) {
              if (this.target === document.body)
                return {
                  top: pageYOffset,
                  left: pageXOffset,
                  height: innerHeight,
                  width: innerWidth
                };
              var t = a(this.target),
                e = {
                  height: t.height,
                  width: t.width,
                  top: t.top,
                  left: t.left
                };
              return (e.height = Math.min(
                e.height,
                t.height - (pageYOffset - t.top)
              )), (e.height = Math.min(
                e.height,
                t.height - (t.top + t.height - (pageYOffset + innerHeight))
              )), (e.height = Math.min(
                innerHeight,
                e.height
              )), (e.height -= 2), (e.width = Math.min(
                e.width,
                t.width - (pageXOffset - t.left)
              )), (e.width = Math.min(
                e.width,
                t.width - (t.left + t.width - (pageXOffset + innerWidth))
              )), (e.width = Math.min(
                innerWidth,
                e.width
              )), (e.width -= 2), e.top < pageYOffset &&
                (e.top = pageYOffset), e.left < pageXOffset &&
                (e.left = pageXOffset), e;
            }
            if ("scroll-handle" === this.targetModifier) {
              var t = void 0,
                o = this.target;
              o === document.body
                ? (
                    (o = document.documentElement),
                    (t = {
                      left: pageXOffset,
                      top: pageYOffset,
                      height: innerHeight,
                      width: innerWidth
                    })
                  )
                : (t = a(o));
              var n = getComputedStyle(o),
                i =
                  o.scrollWidth > o.clientWidth ||
                  [n.overflow, n.overflowX].indexOf("scroll") >= 0 ||
                  this.target !== document.body,
                r = 0;
              i && (r = 15);
              var s =
                  t.height -
                  parseFloat(n.borderTopWidth) -
                  parseFloat(n.borderBottomWidth) -
                  r,
                e = {
                  width: 15,
                  height: 0.975 * s * (s / o.scrollHeight),
                  left: t.left + t.width - parseFloat(n.borderLeftWidth) - 15
                },
                f = 0;
              408 > s &&
                this.target === document.body &&
                (f = -11e-5 * Math.pow(s, 2) - 0.00727 * s + 22.58), this
                .target !== document.body &&
                (e.height = Math.max(e.height, 24));
              var l = this.target.scrollTop / (o.scrollHeight - s);
              return (e.top =
                l * (s - e.height - f) +
                t.top +
                parseFloat(n.borderTopWidth)), this.target === document.body &&
                (e.height = Math.max(e.height, 24)), e;
            }
          }
        },
        {
          key: "clearCache",
          value: function() {
            this._cache = {};
          }
        },
        {
          key: "cache",
          value: function(t, e) {
            return "undefined" == typeof this._cache &&
              (this._cache = {}), "undefined" == typeof this._cache[t] &&
              (this._cache[t] = e.call(this)), this._cache[t];
          }
        },
        {
          key: "enable",
          value: function() {
            var t = this,
              e =
                arguments.length <= 0 || void 0 === arguments[0]
                  ? !0
                  : arguments[0];
            this.options.addTargetClasses !== !1 &&
              d(this.target, this.getClass("enabled")), d(
              this.element,
              this.getClass("enabled")
            ), (this.enabled = !0), this.scrollParents.forEach(function(e) {
              e !== t.target.ownerDocument &&
                e.addEventListener("scroll", t.position);
            }), e && this.position();
          }
        },
        {
          key: "disable",
          value: function() {
            var t = this;
            u(this.target, this.getClass("enabled")), u(
              this.element,
              this.getClass("enabled")
            ), (this.enabled = !1), "undefined" != typeof this.scrollParents &&
              this.scrollParents.forEach(function(e) {
                e.removeEventListener("scroll", t.position);
              });
          }
        },
        {
          key: "destroy",
          value: function() {
            var t = this;
            this.disable(), L.forEach(function(e, o) {
              e === t && L.splice(o, 1);
            }), 0 === L.length && s();
          }
        },
        {
          key: "updateAttachClasses",
          value: function(t, e) {
            var o = this;
            (t = t || this.attachment), (e = e || this.targetAttachment);
            var n = ["left", "top", "bottom", "right", "middle", "center"];
            "undefined" != typeof this._addAttachClasses &&
              this._addAttachClasses.length &&
              this._addAttachClasses.splice(
                0,
                this._addAttachClasses.length
              ), "undefined" == typeof this._addAttachClasses &&
              (this._addAttachClasses = []);
            var i = this._addAttachClasses;
            t.top &&
              i.push(this.getClass("element-attached") + "-" + t.top), t.left &&
              i.push(this.getClass("element-attached") + "-" + t.left), e.top &&
              i.push(this.getClass("target-attached") + "-" + e.top), e.left &&
              i.push(this.getClass("target-attached") + "-" + e.left);
            var r = [];
            n.forEach(function(t) {
              r.push(
                o.getClass("element-attached") + "-" + t
              ), r.push(o.getClass("target-attached") + "-" + t);
            }), M(function() {
              "undefined" != typeof o._addAttachClasses &&
                (
                  m(o.element, o._addAttachClasses, r),
                  o.options.addTargetClasses !== !1 &&
                    m(o.target, o._addAttachClasses, r),
                  delete o._addAttachClasses
                );
            });
          }
        },
        {
          key: "position",
          value: function() {
            var t = this,
              e =
                arguments.length <= 0 || void 0 === arguments[0]
                  ? !0
                  : arguments[0];
            if (this.enabled) {
              this.clearCache();
              var o = N(this.targetAttachment, this.attachment);
              this.updateAttachClasses(this.attachment, o);
              var n = this.cache("element-bounds", function() {
                  return a(t.element);
                }),
                i = n.width,
                r = n.height;
              if (0 === i && 0 === r && "undefined" != typeof this.lastSize) {
                var s = this.lastSize;
                (i = s.width), (r = s.height);
              } else this.lastSize = { width: i, height: r };
              var h = this.cache("target-bounds", function() {
                  return t.getTargetBounds();
                }),
                u = h,
                d = C(U(this.attachment), { width: i, height: r }),
                p = C(U(o), u),
                c = C(this.offset, { width: i, height: r }),
                g = C(this.targetOffset, u);
              (d = w(d, c)), (p = w(p, g));
              for (
                var m = h.left + p.left - d.left,
                  v = h.top + p.top - d.top,
                  y = 0;
                y < x.modules.length;
                ++y
              ) {
                var b = x.modules[y],
                  O = b.position.call(this, {
                    left: m,
                    top: v,
                    targetAttachment: o,
                    targetPos: h,
                    elementPos: n,
                    offset: d,
                    targetOffset: p,
                    manualOffset: c,
                    manualTargetOffset: g,
                    scrollbarSize: S,
                    attachment: this.attachment
                  });
                if (O === !1) return !1;
                "undefined" != typeof O &&
                  "object" == typeof O &&
                  ((v = O.top), (m = O.left));
              }
              var E = {
                  page: { top: v, left: m },
                  viewport: {
                    top: v - pageYOffset,
                    bottom: pageYOffset - v - r + innerHeight,
                    left: m - pageXOffset,
                    right: pageXOffset - m - i + innerWidth
                  }
                },
                A = this.target.ownerDocument,
                T = A.defaultView,
                S = void 0;
              return A.body.scrollWidth > T.innerWidth &&
                (
                  (S = this.cache("scrollbar-size", l)),
                  (E.viewport.bottom -= S.height)
                ), A.body.scrollHeight > T.innerHeight &&
                (
                  (S = this.cache("scrollbar-size", l)),
                  (E.viewport.right -= S.width)
                ), (-1 === ["", "static"].indexOf(A.body.style.position) ||
                -1 ===
                  ["", "static"].indexOf(
                    A.body.parentElement.style.position
                  )) &&
                (
                  (E.page.bottom = A.body.scrollHeight - v - r),
                  (E.page.right = A.body.scrollWidth - m - i)
                ), "undefined" != typeof this.options.optimizations &&
                this.options.optimizations.moveElement !== !1 &&
                "undefined" == typeof this.targetModifier &&
                !(function() {
                  var e = t.cache("target-offsetparent", function() {
                      return f(t.target);
                    }),
                    o = t.cache("target-offsetparent-bounds", function() {
                      return a(e);
                    }),
                    n = getComputedStyle(e),
                    i = o,
                    r = {};
                  if (
                    (
                      ["Top", "Left", "Bottom", "Right"].forEach(function(t) {
                        r[t.toLowerCase()] = parseFloat(
                          n["border" + t + "Width"]
                        );
                      }),
                      (o.right =
                        A.body.scrollWidth - o.left - i.width + r.right),
                      (o.bottom =
                        A.body.scrollHeight - o.top - i.height + r.bottom),
                      E.page.top >= o.top + r.top &&
                        E.page.bottom >= o.bottom &&
                        E.page.left >= o.left + r.left &&
                        E.page.right >= o.right
                    )
                  ) {
                    var s = e.scrollTop,
                      l = e.scrollLeft;
                    E.offset = {
                      top: E.page.top - o.top + s - r.top,
                      left: E.page.left - o.left + l - r.left
                    };
                  }
                })(), this.move(E), this.history.unshift(E), this.history
                .length > 3 && this.history.pop(), e && _(), !0;
            }
          }
        },
        {
          key: "move",
          value: function(t) {
            var e = this;
            if ("undefined" != typeof this.element.parentNode) {
              var o = {};
              for (var n in t) {
                o[n] = {};
                for (var i in t[n]) {
                  for (var r = !1, s = 0; s < this.history.length; ++s) {
                    var a = this.history[s];
                    if ("undefined" != typeof a[n] && !y(a[n][i], t[n][i])) {
                      r = !0;
                      break;
                    }
                  }
                  r || (o[n][i] = !0);
                }
              }
              var l = { top: "", left: "", right: "", bottom: "" },
                u = function(t, o) {
                  var n = "undefined" != typeof e.options.optimizations,
                    i = n ? e.options.optimizations.gpu : null;
                  if (i !== !1) {
                    var r = void 0,
                      s = void 0;
                    t.top
                      ? ((l.top = 0), (r = o.top))
                      : ((l.bottom = 0), (r = -o.bottom)), t.left
                      ? ((l.left = 0), (s = o.left))
                      : ((l.right = 0), (s = -o.right)), (l[Y] =
                      "translateX(" +
                      Math.round(s) +
                      "px) translateY(" +
                      Math.round(r) +
                      "px)"), "msTransform" !== Y && (l[Y] += " translateZ(0)");
                  } else
                    t.top
                      ? (l.top = o.top + "px")
                      : (l.bottom = o.bottom + "px"), t.left
                      ? (l.left = o.left + "px")
                      : (l.right = o.right + "px");
                },
                d = !1;
              if (
                (
                  (o.page.top || o.page.bottom) && (o.page.left || o.page.right)
                    ? ((l.position = "absolute"), u(o.page, t.page))
                    : (o.viewport.top || o.viewport.bottom) &&
                      (o.viewport.left || o.viewport.right)
                      ? ((l.position = "fixed"), u(o.viewport, t.viewport))
                      : "undefined" != typeof o.offset &&
                        o.offset.top &&
                        o.offset.left
                        ? !(function() {
                            l.position = "absolute";
                            var n = e.cache("target-offsetparent", function() {
                              return f(e.target);
                            });
                            f(e.element) !== n &&
                              M(function() {
                                e.element.parentNode.removeChild(
                                  e.element
                                ), n.appendChild(e.element);
                              }), u(o.offset, t.offset), (d = !0);
                          })()
                        : (
                            (l.position = "absolute"),
                            u({ top: !0, left: !0 }, t.page)
                          ),
                  !d
                )
              ) {
                for (
                  var p = !0, c = this.element.parentNode;
                  c && 1 === c.nodeType && "BODY" !== c.tagName;

                ) {
                  if ("static" !== getComputedStyle(c).position) {
                    p = !1;
                    break;
                  }
                  c = c.parentNode;
                }
                p ||
                  (
                    this.element.parentNode.removeChild(this.element),
                    this.element.ownerDocument.body.appendChild(this.element)
                  );
              }
              var g = {},
                m = !1;
              for (var i in l) {
                var v = l[i],
                  b = this.element.style[i];
                b !== v && ((m = !0), (g[i] = v));
              }
              m &&
                M(function() {
                  h(e.element.style, g);
                });
            }
          }
        }
      ]), e;
    })(k);
  (q.modules = []), (x.position = D);
  var I = h(q, x),
    B = (function() {
      function t(t, e) {
        var o = [],
          n = !0,
          i = !1,
          r = void 0;
        try {
          for (
            var s, a = t[Symbol.iterator]();
            !(n = (s = a.next()).done) &&
            (o.push(s.value), !e || o.length !== e);
            n = !0
          );
        } catch (f) {
          (i = !0), (r = f);
        } finally {
          try {
            !n && a["return"] && a["return"]();
          } finally {
            if (i) throw r;
          }
        }
        return o;
      }
      return function(e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      };
    })(),
    j = x.Utils,
    a = j.getBounds,
    h = j.extend,
    m = j.updateClasses,
    M = j.defer,
    $ = ["left", "top", "right", "bottom"];
  x.modules.push({
    position: function(t) {
      var e = this,
        o = t.top,
        n = t.left,
        i = t.targetAttachment;
      if (!this.options.constraints) return !0;
      var r = this.cache("element-bounds", function() {
          return a(e.element);
        }),
        s = r.height,
        f = r.width;
      if (0 === f && 0 === s && "undefined" != typeof this.lastSize) {
        var l = this.lastSize;
        (f = l.width), (s = l.height);
      }
      var u = this.cache("target-bounds", function() {
          return e.getTargetBounds();
        }),
        d = u.height,
        p = u.width,
        c = [this.getClass("pinned"), this.getClass("out-of-bounds")];
      this.options.constraints.forEach(function(t) {
        var e = t.outOfBoundsClass,
          o = t.pinnedClass;
        e && c.push(e), o && c.push(o);
      }), c.forEach(function(t) {
        ["left", "top", "right", "bottom"].forEach(function(e) {
          c.push(t + "-" + e);
        });
      });
      var g = [],
        v = h({}, i),
        y = h({}, this.attachment);
      return this.options.constraints.forEach(function(t) {
        var r = t.to,
          a = t.attachment,
          l = t.pin;
        "undefined" == typeof a && (a = "");
        var h = void 0,
          u = void 0;
        if (a.indexOf(" ") >= 0) {
          var c = a.split(" "),
            m = B(c, 2);
          (u = m[0]), (h = m[1]);
        } else h = u = a;
        var b = O(e, r);
        ("target" === u || "both" === u) &&
          (
            o < b[1] && "top" === v.top && ((o += d), (v.top = "bottom")),
            o + s > b[3] && "bottom" === v.top && ((o -= d), (v.top = "top"))
          ), "together" === u && ("top" === v.top && ("bottom" === y.top && o < b[1] ? ((o += d), (v.top = "bottom"), (o += s), (y.top = "top")) : "top" === y.top && o + s > b[3] && o - (s - d) >= b[1] && ((o -= s - d), (v.top = "bottom"), (y.top = "bottom"))), "bottom" === v.top && ("top" === y.top && o + s > b[3] ? ((o -= d), (v.top = "top"), (o -= s), (y.top = "bottom")) : "bottom" === y.top && o < b[1] && o + (2 * s - d) <= b[3] && ((o += s - d), (v.top = "top"), (y.top = "top"))), "middle" === v.top && (o + s > b[3] && "top" === y.top ? ((o -= s), (y.top = "bottom")) : o < b[1] && "bottom" === y.top && ((o += s), (y.top = "top")))), ("target" === h || "both" === h) && (n < b[0] && "left" === v.left && ((n += p), (v.left = "right")), n + f > b[2] && "right" === v.left && ((n -= p), (v.left = "left"))), "together" === h && (n < b[0] && "left" === v.left ? ("right" === y.left ? ((n += p), (v.left = "right"), (n += f), (y.left = "left")) : "left" === y.left && ((n += p), (v.left = "right"), (n -= f), (y.left = "right"))) : n + f > b[2] && "right" === v.left ? ("left" === y.left ? ((n -= p), (v.left = "left"), (n -= f), (y.left = "right")) : "right" === y.left && ((n -= p), (v.left = "left"), (n += f), (y.left = "left"))) : "center" === v.left && (n + f > b[2] && "left" === y.left ? ((n -= f), (y.left = "right")) : n < b[0] && "right" === y.left && ((n += f), (y.left = "left")))), ("element" === u || "both" === u) && (o < b[1] && "bottom" === y.top && ((o += s), (y.top = "top")), o + s > b[3] && "top" === y.top && ((o -= s), (y.top = "bottom"))), ("element" === h || "both" === h) && (n < b[0] && ("right" === y.left ? ((n += f), (y.left = "left")) : "center" === y.left && ((n += f / 2), (y.left = "left"))), n + f > b[2] && ("left" === y.left ? ((n -= f), (y.left = "right")) : "center" === y.left && ((n -= f / 2), (y.left = "right")))), "string" ==
        typeof l
          ? (l = l.split(",").map(function(t) {
              return t.trim();
            }))
          : l === !0 && (l = ["top", "left", "right", "bottom"]), (l = l || []);
        var w = [],
          C = [];
        o < b[1] &&
          (l.indexOf("top") >= 0
            ? ((o = b[1]), w.push("top"))
            : C.push(
                "top"
              )), o + s > b[3] && (l.indexOf("bottom") >= 0 ? ((o = b[3] - s), w.push("bottom")) : C.push("bottom")), n < b[0] && (l.indexOf("left") >= 0 ? ((n = b[0]), w.push("left")) : C.push("left")), n + f > b[2] && (l.indexOf("right") >= 0 ? ((n = b[2] - f), w.push("right")) : C.push("right")), w.length &&
          !(function() {
            var t = void 0;
            (t =
              "undefined" != typeof e.options.pinnedClass
                ? e.options.pinnedClass
                : e.getClass("pinned")), g.push(t), w.forEach(function(e) {
              g.push(t + "-" + e);
            });
          })(), C.length &&
          !(function() {
            var t = void 0;
            (t =
              "undefined" != typeof e.options.outOfBoundsClass
                ? e.options.outOfBoundsClass
                : e.getClass("out-of-bounds")), g.push(t), C.forEach(function(
              e
            ) {
              g.push(t + "-" + e);
            });
          })(), (w.indexOf("left") >= 0 || w.indexOf("right") >= 0) && (y.left = v.left = !1), (w.indexOf("top") >= 0 || w.indexOf("bottom") >= 0) && (y.top = v.top = !1), (v.top !== i.top || v.left !== i.left || y.top !== e.attachment.top || y.left !== e.attachment.left) && (e.updateAttachClasses(y, v), e.trigger("update", { attachment: y, targetAttachment: v }));
      }), M(function() {
        e.options.addTargetClasses !== !1 &&
          m(e.target, g, c), m(e.element, g, c);
      }), { top: o, left: n };
    }
  });
  var j = x.Utils,
    a = j.getBounds,
    m = j.updateClasses,
    M = j.defer;
  x.modules.push({
    position: function(t) {
      var e = this,
        o = t.top,
        n = t.left,
        i = this.cache("element-bounds", function() {
          return a(e.element);
        }),
        r = i.height,
        s = i.width,
        f = this.getTargetBounds(),
        l = o + r,
        h = n + s,
        u = [];
      o <= f.bottom &&
        l >= f.top &&
        ["left", "right"].forEach(function(t) {
          var e = f[t];
          (e === n || e === h) && u.push(t);
        }), n <= f.right &&
        h >= f.left &&
        ["top", "bottom"].forEach(function(t) {
          var e = f[t];
          (e === o || e === l) && u.push(t);
        });
      var d = [],
        p = [],
        c = ["left", "top", "right", "bottom"];
      return d.push(this.getClass("abutted")), c.forEach(function(t) {
        d.push(e.getClass("abutted") + "-" + t);
      }), u.length && p.push(this.getClass("abutted")), u.forEach(function(t) {
        p.push(e.getClass("abutted") + "-" + t);
      }), M(function() {
        e.options.addTargetClasses !== !1 &&
          m(e.target, p, d), m(e.element, p, d);
      }), !0;
    }
  });
  var B = (function() {
    function t(t, e) {
      var o = [],
        n = !0,
        i = !1,
        r = void 0;
      try {
        for (
          var s, a = t[Symbol.iterator]();
          !(n = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e);
          n = !0
        );
      } catch (f) {
        (i = !0), (r = f);
      } finally {
        try {
          !n && a["return"] && a["return"]();
        } finally {
          if (i) throw r;
        }
      }
      return o;
    }
    return function(e, o) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e)) return t(e, o);
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    };
  })();
  return x.modules.push({
    position: function(t) {
      var e = t.top,
        o = t.left;
      if (this.options.shift) {
        var n = this.options.shift;
        "function" == typeof this.options.shift &&
          (n = this.options.shift.call(this, { top: e, left: o }));
        var i = void 0,
          r = void 0;
        if ("string" == typeof n) {
          (n = n.split(" ")), (n[1] = n[1] || n[0]);
          var s = n,
            a = B(s, 2);
          (i = a[0]), (r = a[1]), (i = parseFloat(i, 10)), (r = parseFloat(
            r,
            10
          ));
        } else (i = n.top), (r = n.left);
        return (e += i), (o += r), { top: e, left: o };
      }
    }
  }), I;
}); /*! vex.js, vex.dialog.js 2.3.3 */
(function() {
  var a;
  (a = function(a) {
    var b, c;
    return (b = !1), a(function() {
      var d;
      return (d = (document.body || document.documentElement)
        .style), (b = void 0 !== d.animation || void 0 !== d.WebkitAnimation || void 0 !== d.MozAnimation || void 0 !== d.MsAnimation || void 0 !== d.OAnimation), a(
        window
      ).bind("keyup.vex", function(a) {
        return 27 === a.keyCode ? c.closeByEscape() : void 0;
      });
    }), (c = {
      globalID: 1,
      animationEndEvent:
        "animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend",
      baseClassNames: {
        vex: "vex",
        content: "vex-content",
        overlay: "vex-overlay",
        close: "vex-close",
        closing: "vex-closing",
        open: "vex-open"
      },
      defaultOptions: {
        content: "",
        showCloseButton: !0,
        escapeButtonCloses: !0,
        overlayClosesOnClick: !0,
        appendLocation: "body",
        className: "",
        css: {},
        overlayClassName: "",
        overlayCSS: {},
        contentClassName: "",
        contentCSS: {},
        closeClassName: "",
        closeCSS: {}
      },
      open: function(b) {
        return (b = a.extend({}, c.defaultOptions, b)), (b.id =
          c.globalID), (c.globalID += 1), (b.$vex = a("<div>")
          .addClass(c.baseClassNames.vex)
          .addClass(b.className)
          .css(b.css)
          .data({ vex: b })), (b.$vexOverlay = a("<div>")
          .addClass(c.baseClassNames.overlay)
          .addClass(b.overlayClassName)
          .css(b.overlayCSS)
          .data({ vex: b })), b.overlayClosesOnClick &&
          b.$vexOverlay.bind("click.vex", function(b) {
            return b.target === this ? c.close(a(this).data().vex.id) : void 0;
          }), b.$vex.append(b.$vexOverlay), (b.$vexContent = a("<div>")
          .addClass(c.baseClassNames.content)
          .addClass(b.contentClassName)
          .css(b.contentCSS)
          .append(b.content)
          .data({ vex: b })), b.$vex.append(b.$vexContent), b.showCloseButton &&
          (
            (b.$closeButton = a("<div>")
              .addClass(c.baseClassNames.close)
              .addClass(b.closeClassName)
              .css(b.closeCSS)
              .data({ vex: b })
              .bind("click.vex", function() {
                return c.close(a(this).data().vex.id);
              })),
            b.$vexContent.append(b.$closeButton)
          ), a(b.appendLocation).append(b.$vex), c.setupBodyClassName(
          b.$vex
        ), b.afterOpen && b.afterOpen(b.$vexContent, b), setTimeout(function() {
          return b.$vexContent.trigger("vexOpen", b);
        }, 0), b.$vexContent;
      },
      getSelectorFromBaseClass: function(a) {
        return "." + a.split(" ").join(".");
      },
      getAllVexes: function() {
        return a(
          "." +
            c.baseClassNames.vex +
            ':not(".' +
            c.baseClassNames.closing +
            '") ' +
            c.getSelectorFromBaseClass(c.baseClassNames.content)
        );
      },
      getVexByID: function(b) {
        return c.getAllVexes().filter(function() {
          return a(this).data().vex.id === b;
        });
      },
      close: function(a) {
        var b;
        if (!a) {
          if (((b = c.getAllVexes().last()), !b.length)) return !1;
          a = b.data().vex.id;
        }
        return c.closeByID(a);
      },
      closeAll: function() {
        var b;
        return (b = c
          .getAllVexes()
          .map(function() {
            return a(this).data().vex.id;
          })
          .toArray()), (null != b ? b.length : void 0)
          ? (
              a.each(b.reverse(), function(a, b) {
                return c.closeByID(b);
              }),
              !0
            )
          : !1;
      },
      closeByID: function(d) {
        var e, f, g, h, i, j;
        return (f = c.getVexByID(d)), f.length
          ? (
              (e = f.data().vex.$vex),
              (j = a.extend({}, f.data().vex)),
              (g = function() {
                return j.beforeClose ? j.beforeClose(f, j) : void 0;
              }),
              (h = function() {
                return f.trigger("vexClose", j), e.remove(), a("body").trigger(
                  "vexAfterClose",
                  j
                ), j.afterClose ? j.afterClose(f, j) : void 0;
              }),
              (i =
                "none" !== e.css("animationName") &&
                "0s" !== e.css("animationDuration")),
              b && i
                ? g() !== !1 &&
                  e
                    .unbind(c.animationEndEvent)
                    .bind(c.animationEndEvent, function() {
                      return h();
                    })
                    .addClass(c.baseClassNames.closing)
                : g() !== !1 && h(),
              !0
            )
          : void 0;
      },
      closeByEscape: function() {
        var b, d, e;
        return (e = c
          .getAllVexes()
          .map(function() {
            return a(this).data().vex.id;
          })
          .toArray()), (null != e ? e.length : void 0)
          ? (
              (d = Math.max.apply(Math, e)),
              (b = c.getVexByID(d)),
              b.data().vex.escapeButtonCloses !== !0 ? !1 : c.closeByID(d)
            )
          : !1;
      },
      setupBodyClassName: function(b) {
        return a("body")
          .bind("vexOpen.vex", function() {
            return a("body").addClass(c.baseClassNames.open);
          })
          .bind("vexAfterClose.vex", function() {
            return c.getAllVexes().length
              ? void 0
              : a("body").removeClass(c.baseClassNames.open);
          });
      },
      hideLoading: function() {
        return a(".vex-loading-spinner").remove();
      },
      showLoading: function() {
        return c.hideLoading(), a("body").append(
          '<div class="vex-loading-spinner ' +
            c.defaultOptions.className +
            '"></div>'
        );
      }
    });
  }), "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
      ? (module.exports = a(require("jquery")))
      : (window.vex = a(jQuery));
}.call(this), function() {
  var a;
  (a = function(a, b) {
    var c, d;
    return null == b
      ? a.error("Vex is required to use vex.dialog")
      : (
          (c = function(b) {
            var c;
            return (c = {}), a.each(b.serializeArray(), function() {
              return c[this.name]
                ? (
                    c[this.name].push || (c[this.name] = [c[this.name]]),
                    c[this.name].push(this.value || "")
                  )
                : (c[this.name] = this.value || "");
            }), c;
          }),
          (d = {}),
          (d.buttons = {
            YES: {
              text: "OK",
              type: "submit",
              className: "vex-dialog-button-primary"
            },
            NO: {
              text: "Cancel",
              type: "button",
              className: "vex-dialog-button-secondary",
              click: function(a, c) {
                return (a.data().vex.value = !1), b.close(a.data().vex.id);
              }
            }
          }),
          (d.defaultOptions = {
            callback: function(a) {},
            afterOpen: function() {},
            message: "Message",
            input:
              '<input name="vex" type="hidden" value="_vex-empty-value" />',
            value: !1,
            buttons: [d.buttons.YES, d.buttons.NO],
            showCloseButton: !1,
            onSubmit: function(e) {
              var f, g;
              return (f = a(
                this
              )), (g = f.parent()), e.preventDefault(), e.stopPropagation(), (g.data().vex.value = d.getFormValueOnSubmit(
                c(f)
              )), b.close(g.data().vex.id);
            },
            focusFirstInput: !0
          }),
          (d.defaultAlertOptions = {
            message: "Alert",
            buttons: [d.buttons.YES]
          }),
          (d.defaultConfirmOptions = { message: "Confirm" }),
          (d.open = function(c) {
            var e, f;
            return (c = a.extend(
              {},
              b.defaultOptions,
              d.defaultOptions,
              c
            )), (c.content = d.buildDialogForm(c)), (f =
              c.beforeClose), (c.beforeClose = function(a, b) {
              return c.callback(b.value), "function" == typeof f
                ? f(a, b)
                : void 0;
            }), (e = b.open(c)), c.focusFirstInput &&
              e
                .find(
                  'button[type="submit"], button[type="button"], input[type="submit"], input[type="button"], textarea, input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"]'
                )
                .first()
                .focus(), e;
          }),
          (d.alert = function(b) {
            return "string" == typeof b && (b = { message: b }), (b = a.extend(
              {},
              d.defaultAlertOptions,
              b
            )), d.open(b);
          }),
          (d.confirm = function(b) {
            return "string" == typeof b
              ? a.error("dialog.confirm(options) requires options.callback.")
              : ((b = a.extend({}, d.defaultConfirmOptions, b)), d.open(b));
          }),
          (d.prompt = function(b) {
            var c;
            return "string" == typeof b
              ? a.error("dialog.prompt(options) requires options.callback.")
              : (
                  (c = {
                    message:
                      '<label for="vex">' + (b.label || "Prompt:") + "</label>",
                    input:
                      '<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="' +
                      (b.placeholder || "") +
                      '"  value="' +
                      (b.value || "") +
                      '" />'
                  }),
                  (b = a.extend({}, c, b)),
                  d.open(b)
                );
          }),
          (d.buildDialogForm = function(b) {
            var c, e, f;
            return (c = a('<form class="vex-dialog-form" />')), (f = a(
              '<div class="vex-dialog-message" />'
            )), (e = a('<div class="vex-dialog-input" />')), c
              .append(f.append(b.message))
              .append(e.append(b.input))
              .append(d.buttonsToDOM(b.buttons))
              .bind("submit.vex", b.onSubmit), c;
          }),
          (d.getFormValueOnSubmit = function(a) {
            return a.vex || "" === a.vex
              ? "_vex-empty-value" === a.vex ? !0 : a.vex
              : a;
          }),
          (d.buttonsToDOM = function(c) {
            var d;
            return (d = a(
              '<div class="vex-dialog-buttons" />'
            )), a.each(c, function(e, f) {
              var g;
              return (g = a('<button type="' + f.type + '"></button>')
                .text(f.text)
                .addClass(
                  f.className +
                    " vex-dialog-button " +
                    (0 === e ? "vex-first " : "") +
                    (e === c.length - 1 ? "vex-last " : "")
                )
                .bind("click.vex", function(c) {
                  return f.click
                    ? f.click(
                        a(this).parents(
                          b.getSelectorFromBaseClass(b.baseClassNames.content)
                        ),
                        c
                      )
                    : void 0;
                })), g.appendTo(d);
            }), d;
          }),
          d
        );
  }), "function" == typeof define && define.amd
    ? define(["jquery", "vex"], a)
    : "object" == typeof exports
      ? (module.exports = a(require("jquery"), require("./vex.js")))
      : (window.vex.dialog = a(window.jQuery, window.vex));
}.call(
  this
)); /*!
 * Bootstrap v4.0.0-alpha.5 (https://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function(a) {
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (
    (b[0] < 2 && b[1] < 9) ||
    (1 == b[0] && 9 == b[1] && b[2] < 1) ||
    b[0] >= 4
  )
    throw new Error(
      "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
    );
})(jQuery), +(function() {
  function a(a, b) {
    if (!a)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !b || ("object" != typeof b && "function" != typeof b) ? a : b;
  }
  function b(a, b) {
    if ("function" != typeof b && null !== b)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof b
      );
    (a.prototype = Object.create(b && b.prototype, {
      constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 }
    })), b &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : (a.__proto__ = b));
  }
  function c(a, b) {
    if (!(a instanceof b))
      throw new TypeError("Cannot call a class as a function");
  }
  var d =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(a) {
            return typeof a;
          }
        : function(a) {
            return a &&
            "function" == typeof Symbol &&
            a.constructor === Symbol &&
            a !== Symbol.prototype
              ? "symbol"
              : typeof a;
          },
    e = (function() {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          (d.enumerable = d.enumerable || !1), (d.configurable = !0), "value" in
            d && (d.writable = !0), Object.defineProperty(a, d.key, d);
        }
      }
      return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
      };
    })(),
    f = (function(a) {
      function b(a) {
        return {}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      }
      function c(a) {
        return (a[0] || a).nodeType;
      }
      function d() {
        return {
          bindType: h.end,
          delegateType: h.end,
          handle: function(b) {
            if (a(b.target).is(this))
              return b.handleObj.handler.apply(this, arguments);
          }
        };
      }
      function e() {
        if (window.QUnit) return !1;
        var a = document.createElement("bootstrap");
        for (var b in j) if (void 0 !== a.style[b]) return { end: j[b] };
        return !1;
      }
      function f(b) {
        var c = this,
          d = !1;
        return a(this).one(k.TRANSITION_END, function() {
          d = !0;
        }), setTimeout(function() {
          d || k.triggerTransitionEnd(c);
        }, b), this;
      }
      function g() {
        (h = e()), (a.fn.emulateTransitionEnd = f), k.supportsTransitionEnd() &&
          (a.event.special[k.TRANSITION_END] = d());
      }
      var h = !1,
        i = 1e6,
        j = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend"
        },
        k = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function(a) {
            do a += ~~(Math.random() * i);
            while (document.getElementById(a));
            return a;
          },
          getSelectorFromElement: function(a) {
            var b = a.getAttribute("data-target");
            return b ||
              (
                (b = a.getAttribute("href") || ""),
                (b = /^#[a-z]/i.test(b) ? b : null)
              ), b;
          },
          reflow: function(a) {
            new Function("bs", "return bs")(a.offsetHeight);
          },
          triggerTransitionEnd: function(b) {
            a(b).trigger(h.end);
          },
          supportsTransitionEnd: function() {
            return Boolean(h);
          },
          typeCheckConfig: function(a, d, e) {
            for (var f in e)
              if (e.hasOwnProperty(f)) {
                var g = e[f],
                  h = d[f],
                  i = void 0;
                if (
                  ((i = h && c(h) ? "element" : b(h)), !new RegExp(g).test(i))
                )
                  throw new Error(
                    a.toUpperCase() +
                      ": " +
                      ('Option "' + f + '" provided type "' + i + '" ') +
                      ('but expected type "' + g + '".')
                  );
              }
          }
        };
      return g(), k;
    })(jQuery),
    g = (
      (function(a) {
        var b = "alert",
          d = "4.0.0-alpha.5",
          g = "bs.alert",
          h = "." + g,
          i = ".data-api",
          j = a.fn[b],
          k = 150,
          l = { DISMISS: '[data-dismiss="alert"]' },
          m = {
            CLOSE: "close" + h,
            CLOSED: "closed" + h,
            CLICK_DATA_API: "click" + h + i
          },
          n = { ALERT: "alert", FADE: "fade", IN: "in" },
          o = (function() {
            function b(a) {
              c(this, b), (this._element = a);
            }
            return (b.prototype.close = function(a) {
              a = a || this._element;
              var b = this._getRootElement(a),
                c = this._triggerCloseEvent(b);
              c.isDefaultPrevented() || this._removeElement(b);
            }), (b.prototype.dispose = function() {
              a.removeData(this._element, g), (this._element = null);
            }), (b.prototype._getRootElement = function(b) {
              var c = f.getSelectorFromElement(b),
                d = !1;
              return c && (d = a(c)[0]), d ||
                (d = a(b).closest("." + n.ALERT)[0]), d;
            }), (b.prototype._triggerCloseEvent = function(b) {
              var c = a.Event(m.CLOSE);
              return a(b).trigger(c), c;
            }), (b.prototype._removeElement = function(b) {
              return a(b).removeClass(n.IN), f.supportsTransitionEnd() &&
              a(b).hasClass(n.FADE)
                ? void a(b)
                    .one(
                      f.TRANSITION_END,
                      a.proxy(this._destroyElement, this, b)
                    )
                    .emulateTransitionEnd(k)
                : void this._destroyElement(b);
            }), (b.prototype._destroyElement = function(b) {
              a(b).detach().trigger(m.CLOSED).remove();
            }), (b._jQueryInterface = function(c) {
              return this.each(function() {
                var d = a(this),
                  e = d.data(g);
                e ||
                  (
                    (e = new b(this)),
                    d.data(g, e)
                  ), "close" === c && e[c](this);
              });
            }), (b._handleDismiss = function(a) {
              return function(b) {
                b && b.preventDefault(), a.close(this);
              };
            }), e(b, null, [
              {
                key: "VERSION",
                get: function() {
                  return d;
                }
              }
            ]), b;
          })();
        return a(document).on(
          m.CLICK_DATA_API,
          l.DISMISS,
          o._handleDismiss(new o())
        ), (a.fn[b] = o._jQueryInterface), (a.fn[b].Constructor = o), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = j), o._jQueryInterface;
        }), o;
      })(jQuery),
      (function(a) {
        var b = "button",
          d = "4.0.0-alpha.5",
          f = "bs.button",
          g = "." + f,
          h = ".data-api",
          i = a.fn[b],
          j = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
          k = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
          },
          l = {
            CLICK_DATA_API: "click" + g + h,
            FOCUS_BLUR_DATA_API: "focus" + g + h + " " + ("blur" + g + h)
          },
          m = (function() {
            function b(a) {
              c(this, b), (this._element = a);
            }
            return (b.prototype.toggle = function() {
              var b = !0,
                c = a(this._element).closest(k.DATA_TOGGLE)[0];
              if (c) {
                var d = a(this._element).find(k.INPUT)[0];
                if (d) {
                  if ("radio" === d.type)
                    if (d.checked && a(this._element).hasClass(j.ACTIVE))
                      b = !1;
                    else {
                      var e = a(c).find(k.ACTIVE)[0];
                      e && a(e).removeClass(j.ACTIVE);
                    }
                  b &&
                    (
                      (d.checked = !a(this._element).hasClass(j.ACTIVE)),
                      a(this._element).trigger("change")
                    ), d.focus();
                }
              } else
                this._element.setAttribute(
                  "aria-pressed",
                  !a(this._element).hasClass(j.ACTIVE)
                );
              b && a(this._element).toggleClass(j.ACTIVE);
            }), (b.prototype.dispose = function() {
              a.removeData(this._element, f), (this._element = null);
            }), (b._jQueryInterface = function(c) {
              return this.each(function() {
                var d = a(this).data(f);
                d ||
                  (
                    (d = new b(this)),
                    a(this).data(f, d)
                  ), "toggle" === c && d[c]();
              });
            }), e(b, null, [
              {
                key: "VERSION",
                get: function() {
                  return d;
                }
              }
            ]), b;
          })();
        return a(document)
          .on(l.CLICK_DATA_API, k.DATA_TOGGLE_CARROT, function(b) {
            b.preventDefault();
            var c = b.target;
            a(c).hasClass(j.BUTTON) ||
              (c = a(c).closest(
                k.BUTTON
              )), m._jQueryInterface.call(a(c), "toggle");
          })
          .on(l.FOCUS_BLUR_DATA_API, k.DATA_TOGGLE_CARROT, function(b) {
            var c = a(b.target).closest(k.BUTTON)[0];
            a(c).toggleClass(j.FOCUS, /^focus(in)?$/.test(b.type));
          }), (a.fn[b] = m._jQueryInterface), (a.fn[b].Constructor = m), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = i), m._jQueryInterface;
        }), m;
      })(jQuery),
      (function(a) {
        var b = "carousel",
          g = "4.0.0-alpha.5",
          h = "bs.carousel",
          i = "." + h,
          j = ".data-api",
          k = a.fn[b],
          l = 600,
          m = 37,
          n = 39,
          o = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
          },
          p = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
          },
          q = { NEXT: "next", PREVIOUS: "prev" },
          r = {
            SLIDE: "slide" + i,
            SLID: "slid" + i,
            KEYDOWN: "keydown" + i,
            MOUSEENTER: "mouseenter" + i,
            MOUSELEAVE: "mouseleave" + i,
            LOAD_DATA_API: "load" + i + j,
            CLICK_DATA_API: "click" + i + j
          },
          s = {
            CAROUSEL: "carousel",
            ACTIVE: "active",
            SLIDE: "slide",
            RIGHT: "right",
            LEFT: "left",
            ITEM: "carousel-item"
          },
          t = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".next, .prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
          },
          u = (function() {
            function j(b, d) {
              c(
                this,
                j
              ), (this._items = null), (this._interval = null), (this._activeElement = null), (this._isPaused = !1), (this._isSliding = !1), (this._config = this._getConfig(
                d
              )), (this._element = a(b)[0]), (this._indicatorsElement = a(
                this._element
              ).find(t.INDICATORS)[0]), this._addEventListeners();
            }
            return (j.prototype.next = function() {
              this._isSliding || this._slide(q.NEXT);
            }), (j.prototype.nextWhenVisible = function() {
              document.hidden || this.next();
            }), (j.prototype.prev = function() {
              this._isSliding || this._slide(q.PREVIOUS);
            }), (j.prototype.pause = function(b) {
              b || (this._isPaused = !0), a(this._element).find(
                t.NEXT_PREV
              )[0] &&
                f.supportsTransitionEnd() &&
                (
                  f.triggerTransitionEnd(this._element),
                  this.cycle(!0)
                ), clearInterval(this._interval), (this._interval = null);
            }), (j.prototype.cycle = function(b) {
              b || (this._isPaused = !1), this._interval &&
                (clearInterval(this._interval), (this._interval = null)), this
                ._config.interval &&
                !this._isPaused &&
                (this._interval = setInterval(
                  a.proxy(
                    document.visibilityState ? this.nextWhenVisible : this.next,
                    this
                  ),
                  this._config.interval
                ));
            }), (j.prototype.to = function(b) {
              var c = this;
              this._activeElement = a(this._element).find(t.ACTIVE_ITEM)[0];
              var d = this._getItemIndex(this._activeElement);
              if (!(b > this._items.length - 1 || b < 0)) {
                if (this._isSliding)
                  return void a(this._element).one(r.SLID, function() {
                    return c.to(b);
                  });
                if (d === b) return this.pause(), void this.cycle();
                var e = b > d ? q.NEXT : q.PREVIOUS;
                this._slide(e, this._items[b]);
              }
            }), (j.prototype.dispose = function() {
              a(this._element).off(i), a.removeData(
                this._element,
                h
              ), (this._items = null), (this._config = null), (this._element = null), (this._interval = null), (this._isPaused = null), (this._isSliding = null), (this._activeElement = null), (this._indicatorsElement = null);
            }), (j.prototype._getConfig = function(c) {
              return (c = a.extend({}, o, c)), f.typeCheckConfig(b, c, p), c;
            }), (j.prototype._addEventListeners = function() {
              this._config.keyboard &&
                a(this._element).on(
                  r.KEYDOWN,
                  a.proxy(this._keydown, this)
                ), "hover" !== this._config.pause ||
                "ontouchstart" in document.documentElement ||
                a(this._element)
                  .on(r.MOUSEENTER, a.proxy(this.pause, this))
                  .on(r.MOUSELEAVE, a.proxy(this.cycle, this));
            }), (j.prototype._keydown = function(a) {
              if (
                (a.preventDefault(), !/input|textarea/i.test(a.target.tagName))
              )
                switch (a.which) {
                  case m:
                    this.prev();
                    break;
                  case n:
                    this.next();
                    break;
                  default:
                    return;
                }
            }), (j.prototype._getItemIndex = function(b) {
              return (this._items = a.makeArray(
                a(b).parent().find(t.ITEM)
              )), this._items.indexOf(b);
            }), (j.prototype._getItemByDirection = function(a, b) {
              var c = a === q.NEXT,
                d = a === q.PREVIOUS,
                e = this._getItemIndex(b),
                f = this._items.length - 1,
                g = (d && 0 === e) || (c && e === f);
              if (g && !this._config.wrap) return b;
              var h = a === q.PREVIOUS ? -1 : 1,
                i = (e + h) % this._items.length;
              return i === -1
                ? this._items[this._items.length - 1]
                : this._items[i];
            }), (j.prototype._triggerSlideEvent = function(b, c) {
              var d = a.Event(r.SLIDE, { relatedTarget: b, direction: c });
              return a(this._element).trigger(d), d;
            }), (j.prototype._setActiveIndicatorElement = function(b) {
              if (this._indicatorsElement) {
                a(this._indicatorsElement).find(t.ACTIVE).removeClass(s.ACTIVE);
                var c = this._indicatorsElement.children[this._getItemIndex(b)];
                c && a(c).addClass(s.ACTIVE);
              }
            }), (j.prototype._slide = function(b, c) {
              var d = this,
                e = a(this._element).find(t.ACTIVE_ITEM)[0],
                g = c || (e && this._getItemByDirection(b, e)),
                h = Boolean(this._interval),
                i = b === q.NEXT ? s.LEFT : s.RIGHT;
              if (g && a(g).hasClass(s.ACTIVE))
                return void (this._isSliding = !1);
              var j = this._triggerSlideEvent(g, i);
              if (!j.isDefaultPrevented() && e && g) {
                (this._isSliding = !0), h &&
                  this.pause(), this._setActiveIndicatorElement(g);
                var k = a.Event(r.SLID, { relatedTarget: g, direction: i });
                f.supportsTransitionEnd() && a(this._element).hasClass(s.SLIDE)
                  ? (
                      a(g).addClass(b),
                      f.reflow(g),
                      a(e).addClass(i),
                      a(g).addClass(i),
                      a(e)
                        .one(f.TRANSITION_END, function() {
                          a(g)
                            .removeClass(i)
                            .removeClass(
                              b
                            ), a(g).addClass(s.ACTIVE), a(e).removeClass(s.ACTIVE).removeClass(b).removeClass(i), (d._isSliding = !1), setTimeout(function() {
                            return a(d._element).trigger(k);
                          }, 0);
                        })
                        .emulateTransitionEnd(l)
                    )
                  : (
                      a(e).removeClass(s.ACTIVE),
                      a(g).addClass(s.ACTIVE),
                      (this._isSliding = !1),
                      a(this._element).trigger(k)
                    ), h && this.cycle();
              }
            }), (j._jQueryInterface = function(b) {
              return this.each(function() {
                var c = a(this).data(h),
                  e = a.extend({}, o, a(this).data());
                "object" === ("undefined" == typeof b ? "undefined" : d(b)) &&
                  a.extend(e, b);
                var f = "string" == typeof b ? b : e.slide;
                if (
                  (
                    c || ((c = new j(this, e)), a(this).data(h, c)),
                    "number" == typeof b
                  )
                )
                  c.to(b);
                else if ("string" == typeof f) {
                  if (void 0 === c[f])
                    throw new Error('No method named "' + f + '"');
                  c[f]();
                } else e.interval && (c.pause(), c.cycle());
              });
            }), (j._dataApiClickHandler = function(b) {
              var c = f.getSelectorFromElement(this);
              if (c) {
                var d = a(c)[0];
                if (d && a(d).hasClass(s.CAROUSEL)) {
                  var e = a.extend({}, a(d).data(), a(this).data()),
                    g = this.getAttribute("data-slide-to");
                  g && (e.interval = !1), j._jQueryInterface.call(a(d), e), g &&
                    a(d).data(h).to(g), b.preventDefault();
                }
              }
            }), e(j, null, [
              {
                key: "VERSION",
                get: function() {
                  return g;
                }
              },
              {
                key: "Default",
                get: function() {
                  return o;
                }
              }
            ]), j;
          })();
        return a(document).on(
          r.CLICK_DATA_API,
          t.DATA_SLIDE,
          u._dataApiClickHandler
        ), a(window).on(r.LOAD_DATA_API, function() {
          a(t.DATA_RIDE).each(function() {
            var b = a(this);
            u._jQueryInterface.call(b, b.data());
          });
        }), (a.fn[b] = u._jQueryInterface), (a.fn[b].Constructor = u), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = k), u._jQueryInterface;
        }), u;
      })(jQuery),
      (function(a) {
        var b = "collapse",
          g = "4.0.0-alpha.5",
          h = "bs.collapse",
          i = "." + h,
          j = ".data-api",
          k = a.fn[b],
          l = 600,
          m = { toggle: !0, parent: "" },
          n = { toggle: "boolean", parent: "string" },
          o = {
            SHOW: "show" + i,
            SHOWN: "shown" + i,
            HIDE: "hide" + i,
            HIDDEN: "hidden" + i,
            CLICK_DATA_API: "click" + i + j
          },
          p = {
            IN: "in",
            COLLAPSE: "collapse",
            COLLAPSING: "collapsing",
            COLLAPSED: "collapsed"
          },
          q = { WIDTH: "width", HEIGHT: "height" },
          r = {
            ACTIVES: ".card > .in, .card > .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
          },
          s = (function() {
            function i(b, d) {
              c(
                this,
                i
              ), (this._isTransitioning = !1), (this._element = b), (this._config = this._getConfig(
                d
              )), (this._triggerArray = a.makeArray(
                a(
                  '[data-toggle="collapse"][href="#' +
                    b.id +
                    '"],' +
                    ('[data-toggle="collapse"][data-target="#' + b.id + '"]')
                )
              )), (this._parent = this._config.parent
                ? this._getParent()
                : null), this._config.parent ||
                this._addAriaAndCollapsedClass(
                  this._element,
                  this._triggerArray
                ), this._config.toggle && this.toggle();
            }
            return (i.prototype.toggle = function() {
              a(this._element).hasClass(p.IN) ? this.hide() : this.show();
            }), (i.prototype.show = function() {
              var b = this;
              if (!this._isTransitioning && !a(this._element).hasClass(p.IN)) {
                var c = void 0,
                  d = void 0;
                if (
                  (
                    this._parent &&
                      ((c = a.makeArray(a(r.ACTIVES))), c.length || (c = null)),
                    !(c && ((d = a(c).data(h)), d && d._isTransitioning))
                  )
                ) {
                  var e = a.Event(o.SHOW);
                  if ((a(this._element).trigger(e), !e.isDefaultPrevented())) {
                    c &&
                      (
                        i._jQueryInterface.call(a(c), "hide"),
                        d || a(c).data(h, null)
                      );
                    var g = this._getDimension();
                    a(this._element)
                      .removeClass(p.COLLAPSE)
                      .addClass(p.COLLAPSING), (this._element.style[
                      g
                    ] = 0), this._element.setAttribute(
                      "aria-expanded",
                      !0
                    ), this._triggerArray.length &&
                      a(this._triggerArray)
                        .removeClass(p.COLLAPSED)
                        .attr("aria-expanded", !0), this.setTransitioning(!0);
                    var j = function() {
                      a(b._element)
                        .removeClass(p.COLLAPSING)
                        .addClass(p.COLLAPSE)
                        .addClass(p.IN), (b._element.style[g] =
                        ""), b.setTransitioning(!1), a(b._element).trigger(
                        o.SHOWN
                      );
                    };
                    if (!f.supportsTransitionEnd()) return void j();
                    var k = g[0].toUpperCase() + g.slice(1),
                      m = "scroll" + k;
                    a(this._element)
                      .one(f.TRANSITION_END, j)
                      .emulateTransitionEnd(l), (this._element.style[g] =
                      this._element[m] + "px");
                  }
                }
              }
            }), (i.prototype.hide = function() {
              var b = this;
              if (!this._isTransitioning && a(this._element).hasClass(p.IN)) {
                var c = a.Event(o.HIDE);
                if ((a(this._element).trigger(c), !c.isDefaultPrevented())) {
                  var d = this._getDimension(),
                    e = d === q.WIDTH ? "offsetWidth" : "offsetHeight";
                  (this._element.style[d] = this._element[e] + "px"), f.reflow(
                    this._element
                  ), a(this._element)
                    .addClass(p.COLLAPSING)
                    .removeClass(p.COLLAPSE)
                    .removeClass(p.IN), this._element.setAttribute(
                    "aria-expanded",
                    !1
                  ), this._triggerArray.length &&
                    a(this._triggerArray)
                      .addClass(p.COLLAPSED)
                      .attr("aria-expanded", !1), this.setTransitioning(!0);
                  var g = function() {
                    b.setTransitioning(!1), a(b._element)
                      .removeClass(p.COLLAPSING)
                      .addClass(p.COLLAPSE)
                      .trigger(o.HIDDEN);
                  };
                  return (this._element.style[d] =
                    ""), f.supportsTransitionEnd()
                    ? void a(this._element)
                        .one(f.TRANSITION_END, g)
                        .emulateTransitionEnd(l)
                    : void g();
                }
              }
            }), (i.prototype.setTransitioning = function(a) {
              this._isTransitioning = a;
            }), (i.prototype.dispose = function() {
              a.removeData(
                this._element,
                h
              ), (this._config = null), (this._parent = null), (this._element = null), (this._triggerArray = null), (this._isTransitioning = null);
            }), (i.prototype._getConfig = function(c) {
              return (c = a.extend({}, m, c)), (c.toggle = Boolean(
                c.toggle
              )), f.typeCheckConfig(b, c, n), c;
            }), (i.prototype._getDimension = function() {
              var b = a(this._element).hasClass(q.WIDTH);
              return b ? q.WIDTH : q.HEIGHT;
            }), (i.prototype._getParent = function() {
              var b = this,
                c = a(this._config.parent)[0],
                d =
                  '[data-toggle="collapse"][data-parent="' +
                  this._config.parent +
                  '"]';
              return a(c).find(d).each(function(a, c) {
                b._addAriaAndCollapsedClass(i._getTargetFromElement(c), [c]);
              }), c;
            }), (i.prototype._addAriaAndCollapsedClass = function(b, c) {
              if (b) {
                var d = a(b).hasClass(p.IN);
                b.setAttribute("aria-expanded", d), c.length &&
                  a(c).toggleClass(p.COLLAPSED, !d).attr("aria-expanded", d);
              }
            }), (i._getTargetFromElement = function(b) {
              var c = f.getSelectorFromElement(b);
              return c ? a(c)[0] : null;
            }), (i._jQueryInterface = function(b) {
              return this.each(function() {
                var c = a(this),
                  e = c.data(h),
                  f = a.extend(
                    {},
                    m,
                    c.data(),
                    "object" ===
                      ("undefined" == typeof b ? "undefined" : d(b)) && b
                  );
                if (
                  (
                    !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1),
                    e || ((e = new i(this, f)), c.data(h, e)),
                    "string" == typeof b
                  )
                ) {
                  if (void 0 === e[b])
                    throw new Error('No method named "' + b + '"');
                  e[b]();
                }
              });
            }), e(i, null, [
              {
                key: "VERSION",
                get: function() {
                  return g;
                }
              },
              {
                key: "Default",
                get: function() {
                  return m;
                }
              }
            ]), i;
          })();
        return a(document).on(o.CLICK_DATA_API, r.DATA_TOGGLE, function(b) {
          b.preventDefault();
          var c = s._getTargetFromElement(this),
            d = a(c).data(h),
            e = d ? "toggle" : a(this).data();
          s._jQueryInterface.call(a(c), e);
        }), (a.fn[b] = s._jQueryInterface), (a.fn[b].Constructor = s), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = k), s._jQueryInterface;
        }), s;
      })(jQuery),
      (function(a) {
        var b = "dropdown",
          d = "4.0.0-alpha.5",
          g = "bs.dropdown",
          h = "." + g,
          i = ".data-api",
          j = a.fn[b],
          k = 27,
          l = 38,
          m = 40,
          n = 3,
          o = {
            HIDE: "hide" + h,
            HIDDEN: "hidden" + h,
            SHOW: "show" + h,
            SHOWN: "shown" + h,
            CLICK: "click" + h,
            CLICK_DATA_API: "click" + h + i,
            KEYDOWN_DATA_API: "keydown" + h + i
          },
          p = {
            BACKDROP: "dropdown-backdrop",
            DISABLED: "disabled",
            OPEN: "open"
          },
          q = {
            BACKDROP: ".dropdown-backdrop",
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            ROLE_MENU: '[role="menu"]',
            ROLE_LISTBOX: '[role="listbox"]',
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS:
              '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'
          },
          r = (function() {
            function b(a) {
              c(this, b), (this._element = a), this._addEventListeners();
            }
            return (b.prototype.toggle = function() {
              if (this.disabled || a(this).hasClass(p.DISABLED)) return !1;
              var c = b._getParentFromElement(this),
                d = a(c).hasClass(p.OPEN);
              if ((b._clearMenus(), d)) return !1;
              if (
                "ontouchstart" in document.documentElement &&
                !a(c).closest(q.NAVBAR_NAV).length
              ) {
                var e = document.createElement("div");
                (e.className = p.BACKDROP), a(e).insertBefore(this), a(e).on(
                  "click",
                  b._clearMenus
                );
              }
              var f = { relatedTarget: this },
                g = a.Event(o.SHOW, f);
              return a(c).trigger(g), !g.isDefaultPrevented() &&
                (
                  this.focus(),
                  this.setAttribute("aria-expanded", "true"),
                  a(c).toggleClass(p.OPEN),
                  a(c).trigger(a.Event(o.SHOWN, f)),
                  !1
                );
            }), (b.prototype.dispose = function() {
              a.removeData(this._element, g), a(this._element).off(
                h
              ), (this._element = null);
            }), (b.prototype._addEventListeners = function() {
              a(this._element).on(o.CLICK, this.toggle);
            }), (b._jQueryInterface = function(c) {
              return this.each(function() {
                var d = a(this).data(g);
                if (
                  (
                    d || a(this).data(g, (d = new b(this))),
                    "string" == typeof c
                  )
                ) {
                  if (void 0 === d[c])
                    throw new Error('No method named "' + c + '"');
                  d[c].call(this);
                }
              });
            }), (b._clearMenus = function(c) {
              if (!c || c.which !== n) {
                var d = a(q.BACKDROP)[0];
                d && d.parentNode.removeChild(d);
                for (
                  var e = a.makeArray(a(q.DATA_TOGGLE)), f = 0;
                  f < e.length;
                  f++
                ) {
                  var g = b._getParentFromElement(e[f]),
                    h = { relatedTarget: e[f] };
                  if (
                    a(g).hasClass(p.OPEN) &&
                    !(
                      c &&
                      "click" === c.type &&
                      /input|textarea/i.test(c.target.tagName) &&
                      a.contains(g, c.target)
                    )
                  ) {
                    var i = a.Event(o.HIDE, h);
                    a(g).trigger(i), i.isDefaultPrevented() ||
                      (
                        e[f].setAttribute("aria-expanded", "false"),
                        a(g).removeClass(p.OPEN).trigger(a.Event(o.HIDDEN, h))
                      );
                  }
                }
              }
            }), (b._getParentFromElement = function(b) {
              var c = void 0,
                d = f.getSelectorFromElement(b);
              return d && (c = a(d)[0]), c || b.parentNode;
            }), (b._dataApiKeydownHandler = function(c) {
              if (
                /(38|40|27|32)/.test(c.which) &&
                !/input|textarea/i.test(c.target.tagName) &&
                (
                  c.preventDefault(),
                  c.stopPropagation(),
                  !this.disabled && !a(this).hasClass(p.DISABLED)
                )
              ) {
                var d = b._getParentFromElement(this),
                  e = a(d).hasClass(p.OPEN);
                if ((!e && c.which !== k) || (e && c.which === k)) {
                  if (c.which === k) {
                    var f = a(d).find(q.DATA_TOGGLE)[0];
                    a(f).trigger("focus");
                  }
                  return void a(this).trigger("click");
                }
                var g = a.makeArray(a(q.VISIBLE_ITEMS));
                if (
                  (
                    (g = g.filter(function(a) {
                      return a.offsetWidth || a.offsetHeight;
                    })),
                    g.length
                  )
                ) {
                  var h = g.indexOf(c.target);
                  c.which === l && h > 0 && h--, c.which === m &&
                    h < g.length - 1 &&
                    h++, h < 0 && (h = 0), g[h].focus();
                }
              }
            }), e(b, null, [
              {
                key: "VERSION",
                get: function() {
                  return d;
                }
              }
            ]), b;
          })();
        return a(document)
          .on(o.KEYDOWN_DATA_API, q.DATA_TOGGLE, r._dataApiKeydownHandler)
          .on(o.KEYDOWN_DATA_API, q.ROLE_MENU, r._dataApiKeydownHandler)
          .on(o.KEYDOWN_DATA_API, q.ROLE_LISTBOX, r._dataApiKeydownHandler)
          .on(o.CLICK_DATA_API, r._clearMenus)
          .on(o.CLICK_DATA_API, q.DATA_TOGGLE, r.prototype.toggle)
          .on(o.CLICK_DATA_API, q.FORM_CHILD, function(a) {
            a.stopPropagation();
          }), (a.fn[b] = r._jQueryInterface), (a.fn[b].Constructor = r), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = j), r._jQueryInterface;
        }), r;
      })(jQuery),
      (function(a) {
        var b = "modal",
          g = "4.0.0-alpha.5",
          h = "bs.modal",
          i = "." + h,
          j = ".data-api",
          k = a.fn[b],
          l = 300,
          m = 150,
          n = 27,
          o = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
          p = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
          },
          q = {
            HIDE: "hide" + i,
            HIDDEN: "hidden" + i,
            SHOW: "show" + i,
            SHOWN: "shown" + i,
            FOCUSIN: "focusin" + i,
            RESIZE: "resize" + i,
            CLICK_DISMISS: "click.dismiss" + i,
            KEYDOWN_DISMISS: "keydown.dismiss" + i,
            MOUSEUP_DISMISS: "mouseup.dismiss" + i,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
            CLICK_DATA_API: "click" + i + j
          },
          r = {
            SCROLLBAR_MEASURER: "modal-scrollbar-measure",
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            IN: "in"
          },
          s = {
            DIALOG: ".modal-dialog",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".navbar-fixed-top, .navbar-fixed-bottom, .is-fixed"
          },
          t = (function() {
            function j(b, d) {
              c(this, j), (this._config = this._getConfig(
                d
              )), (this._element = b), (this._dialog = a(b).find(
                s.DIALOG
              )[0]), (this._backdrop = null), (this._isShown = !1), (this._isBodyOverflowing = !1), (this._ignoreBackdropClick = !1), (this._originalBodyPadding = 0), (this._scrollbarWidth = 0);
            }
            return (j.prototype.toggle = function(a) {
              return this._isShown ? this.hide() : this.show(a);
            }), (j.prototype.show = function(b) {
              var c = this,
                d = a.Event(q.SHOW, { relatedTarget: b });
              a(this._element).trigger(d), this._isShown ||
                d.isDefaultPrevented() ||
                (
                  (this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  a(document.body).addClass(r.OPEN),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  a(this._element).on(
                    q.CLICK_DISMISS,
                    s.DATA_DISMISS,
                    a.proxy(this.hide, this)
                  ),
                  a(this._dialog).on(q.MOUSEDOWN_DISMISS, function() {
                    a(c._element).one(q.MOUSEUP_DISMISS, function(b) {
                      a(b.target).is(c._element) &&
                        (c._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(a.proxy(this._showElement, this, b))
                );
            }), (j.prototype.hide = function(b) {
              b && b.preventDefault();
              var c = a.Event(q.HIDE);
              a(this._element).trigger(c), this._isShown &&
                !c.isDefaultPrevented() &&
                (
                  (this._isShown = !1),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  a(document).off(q.FOCUSIN),
                  a(this._element).removeClass(r.IN),
                  a(this._element).off(q.CLICK_DISMISS),
                  a(this._dialog).off(q.MOUSEDOWN_DISMISS),
                  f.supportsTransitionEnd() && a(this._element).hasClass(r.FADE)
                    ? a(this._element)
                        .one(f.TRANSITION_END, a.proxy(this._hideModal, this))
                        .emulateTransitionEnd(l)
                    : this._hideModal()
                );
            }), (j.prototype.dispose = function() {
              a.removeData(this._element, h), a(window).off(i), a(document).off(
                i
              ), a(this._element).off(i), a(this._backdrop).off(
                i
              ), (this._config = null), (this._element = null), (this._dialog = null), (this._backdrop = null), (this._isShown = null), (this._isBodyOverflowing = null), (this._ignoreBackdropClick = null), (this._originalBodyPadding = null), (this._scrollbarWidth = null);
            }), (j.prototype._getConfig = function(c) {
              return (c = a.extend({}, o, c)), f.typeCheckConfig(b, c, p), c;
            }), (j.prototype._showElement = function(b) {
              var c = this,
                d =
                  f.supportsTransitionEnd() &&
                  a(this._element).hasClass(r.FADE);
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                document.body.appendChild(
                  this._element
                ), (this._element.style.display =
                "block"), this._element.removeAttribute(
                "aria-hidden"
              ), (this._element.scrollTop = 0), d && f.reflow(this._element), a(
                this._element
              ).addClass(r.IN), this._config.focus && this._enforceFocus();
              var e = a.Event(q.SHOWN, { relatedTarget: b }),
                g = function() {
                  c._config.focus && c._element.focus(), a(c._element).trigger(
                    e
                  );
                };
              d
                ? a(this._dialog)
                    .one(f.TRANSITION_END, g)
                    .emulateTransitionEnd(l)
                : g();
            }), (j.prototype._enforceFocus = function() {
              var b = this;
              a(document).off(q.FOCUSIN).on(q.FOCUSIN, function(c) {
                document === c.target ||
                  b._element === c.target ||
                  a(b._element).has(c.target).length ||
                  b._element.focus();
              });
            }), (j.prototype._setEscapeEvent = function() {
              var b = this;
              this._isShown && this._config.keyboard
                ? a(this._element).on(q.KEYDOWN_DISMISS, function(a) {
                    a.which === n && b.hide();
                  })
                : this._isShown || a(this._element).off(q.KEYDOWN_DISMISS);
            }), (j.prototype._setResizeEvent = function() {
              this._isShown
                ? a(window).on(q.RESIZE, a.proxy(this._handleUpdate, this))
                : a(window).off(q.RESIZE);
            }), (j.prototype._hideModal = function() {
              var b = this;
              (this._element.style.display =
                "none"), this._element.setAttribute(
                "aria-hidden",
                "true"
              ), this._showBackdrop(function() {
                a(document.body).removeClass(
                  r.OPEN
                ), b._resetAdjustments(), b._resetScrollbar(), a(b._element).trigger(q.HIDDEN);
              });
            }), (j.prototype._removeBackdrop = function() {
              this._backdrop &&
                (a(this._backdrop).remove(), (this._backdrop = null));
            }), (j.prototype._showBackdrop = function(b) {
              var c = this,
                d = a(this._element).hasClass(r.FADE) ? r.FADE : "";
              if (this._isShown && this._config.backdrop) {
                var e = f.supportsTransitionEnd() && d;
                if (
                  (
                    (this._backdrop = document.createElement("div")),
                    (this._backdrop.className = r.BACKDROP),
                    d && a(this._backdrop).addClass(d),
                    a(this._backdrop).appendTo(document.body),
                    a(this._element).on(q.CLICK_DISMISS, function(a) {
                      return c._ignoreBackdropClick
                        ? void (c._ignoreBackdropClick = !1)
                        : void (
                            a.target === a.currentTarget &&
                            ("static" === c._config.backdrop
                              ? c._element.focus()
                              : c.hide())
                          );
                    }),
                    e && f.reflow(this._backdrop),
                    a(this._backdrop).addClass(r.IN),
                    !b
                  )
                )
                  return;
                if (!e) return void b();
                a(this._backdrop)
                  .one(f.TRANSITION_END, b)
                  .emulateTransitionEnd(m);
              } else if (!this._isShown && this._backdrop) {
                a(this._backdrop).removeClass(r.IN);
                var g = function() {
                  c._removeBackdrop(), b && b();
                };
                f.supportsTransitionEnd() && a(this._element).hasClass(r.FADE)
                  ? a(this._backdrop)
                      .one(f.TRANSITION_END, g)
                      .emulateTransitionEnd(m)
                  : g();
              } else b && b();
            }), (j.prototype._handleUpdate = function() {
              this._adjustDialog();
            }), (j.prototype._adjustDialog = function() {
              var a =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              !this._isBodyOverflowing &&
                a &&
                (this._element.style.paddingLeft =
                  this._scrollbarWidth + "px"), this._isBodyOverflowing &&
                !a &&
                (this._element.style.paddingRight =
                  this._scrollbarWidth + "px");
            }), (j.prototype._resetAdjustments = function() {
              (this._element.style.paddingLeft =
                ""), (this._element.style.paddingRight = "");
            }), (j.prototype._checkScrollbar = function() {
              (this._isBodyOverflowing =
                document.body.clientWidth <
                window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth());
            }), (j.prototype._setScrollbar = function() {
              var b = parseInt(
                a(s.FIXED_CONTENT).css("padding-right") || 0,
                10
              );
              (this._originalBodyPadding =
                document.body.style.paddingRight || ""), this
                ._isBodyOverflowing &&
                (document.body.style.paddingRight =
                  b + this._scrollbarWidth + "px");
            }), (j.prototype._resetScrollbar = function() {
              document.body.style.paddingRight = this._originalBodyPadding;
            }), (j.prototype._getScrollbarWidth = function() {
              var a = document.createElement("div");
              (a.className = r.SCROLLBAR_MEASURER), document.body.appendChild(
                a
              );
              var b = a.offsetWidth - a.clientWidth;
              return document.body.removeChild(a), b;
            }), (j._jQueryInterface = function(b, c) {
              return this.each(function() {
                var e = a(this).data(h),
                  f = a.extend(
                    {},
                    j.Default,
                    a(this).data(),
                    "object" ===
                      ("undefined" == typeof b ? "undefined" : d(b)) && b
                  );
                if (
                  (
                    e || ((e = new j(this, f)), a(this).data(h, e)),
                    "string" == typeof b
                  )
                ) {
                  if (void 0 === e[b])
                    throw new Error('No method named "' + b + '"');
                  e[b](c);
                } else f.show && e.show(c);
              });
            }), e(j, null, [
              {
                key: "VERSION",
                get: function() {
                  return g;
                }
              },
              {
                key: "Default",
                get: function() {
                  return o;
                }
              }
            ]), j;
          })();
        return a(document).on(q.CLICK_DATA_API, s.DATA_TOGGLE, function(b) {
          var c = this,
            d = void 0,
            e = f.getSelectorFromElement(this);
          e && (d = a(e)[0]);
          var g = a(d).data(h)
            ? "toggle"
            : a.extend({}, a(d).data(), a(this).data());
          "A" === this.tagName && b.preventDefault();
          var i = a(d).one(q.SHOW, function(b) {
            b.isDefaultPrevented() ||
              i.one(q.HIDDEN, function() {
                a(c).is(":visible") && c.focus();
              });
          });
          t._jQueryInterface.call(a(d), g, this);
        }), (a.fn[b] = t._jQueryInterface), (a.fn[b].Constructor = t), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = k), t._jQueryInterface;
        }), t;
      })(jQuery),
      (function(a) {
        var b = "scrollspy",
          g = "4.0.0-alpha.5",
          h = "bs.scrollspy",
          i = "." + h,
          j = ".data-api",
          k = a.fn[b],
          l = { offset: 10, method: "auto", target: "" },
          m = {
            offset: "number",
            method: "string",
            target: "(string|element)"
          },
          n = {
            ACTIVATE: "activate" + i,
            SCROLL: "scroll" + i,
            LOAD_DATA_API: "load" + i + j
          },
          o = {
            DROPDOWN_ITEM: "dropdown-item",
            DROPDOWN_MENU: "dropdown-menu",
            NAV_LINK: "nav-link",
            NAV: "nav",
            ACTIVE: "active"
          },
          p = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            LIST_ITEM: ".list-item",
            LI: "li",
            LI_DROPDOWN: "li.dropdown",
            NAV_LINKS: ".nav-link",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
          },
          q = { OFFSET: "offset", POSITION: "position" },
          r = (function() {
            function j(b, d) {
              c(this, j), (this._element = b), (this._scrollElement =
                "BODY" === b.tagName
                  ? window
                  : b), (this._config = this._getConfig(d)), (this._selector =
                this._config.target +
                " " +
                p.NAV_LINKS +
                "," +
                (this._config.target +
                  " " +
                  p.DROPDOWN_ITEMS)), (this._offsets = []), (this._targets = []), (this._activeTarget = null), (this._scrollHeight = 0), a(
                this._scrollElement
              ).on(
                n.SCROLL,
                a.proxy(this._process, this)
              ), this.refresh(), this._process();
            }
            return (j.prototype.refresh = function() {
              var b = this,
                c =
                  this._scrollElement !== this._scrollElement.window
                    ? q.POSITION
                    : q.OFFSET,
                d = "auto" === this._config.method ? c : this._config.method,
                e = d === q.POSITION ? this._getScrollTop() : 0;
              (this._offsets = []), (this._targets = []), (this._scrollHeight = this._getScrollHeight());
              var g = a.makeArray(a(this._selector));
              g
                .map(function(b) {
                  var c = void 0,
                    g = f.getSelectorFromElement(b);
                  return g &&
                    (c = a(
                      g
                    )[0]), c && (c.offsetWidth || c.offsetHeight) ? [a(c)[d]().top + e, g] : null;
                })
                .filter(function(a) {
                  return a;
                })
                .sort(function(a, b) {
                  return a[0] - b[0];
                })
                .forEach(function(a) {
                  b._offsets.push(a[0]), b._targets.push(a[1]);
                });
            }), (j.prototype.dispose = function() {
              a.removeData(this._element, h), a(this._scrollElement).off(
                i
              ), (this._element = null), (this._scrollElement = null), (this._config = null), (this._selector = null), (this._offsets = null), (this._targets = null), (this._activeTarget = null), (this._scrollHeight = null);
            }), (j.prototype._getConfig = function(c) {
              if (((c = a.extend({}, l, c)), "string" != typeof c.target)) {
                var d = a(c.target).attr("id");
                d || ((d = f.getUID(b)), a(c.target).attr("id", d)), (c.target =
                  "#" + d);
              }
              return f.typeCheckConfig(b, c, m), c;
            }), (j.prototype._getScrollTop = function() {
              return this._scrollElement === window
                ? this._scrollElement.scrollY
                : this._scrollElement.scrollTop;
            }), (j.prototype._getScrollHeight = function() {
              return (
                this._scrollElement.scrollHeight ||
                Math.max(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight
                )
              );
            }), (j.prototype._process = function() {
              var a = this._getScrollTop() + this._config.offset,
                b = this._getScrollHeight(),
                c = this._config.offset + b - this._scrollElement.offsetHeight;
              if ((this._scrollHeight !== b && this.refresh(), a >= c)) {
                var d = this._targets[this._targets.length - 1];
                this._activeTarget !== d && this._activate(d);
              }
              if (this._activeTarget && a < this._offsets[0])
                return (this._activeTarget = null), void this._clear();
              for (var e = this._offsets.length; e--; ) {
                var f =
                  this._activeTarget !== this._targets[e] &&
                  a >= this._offsets[e] &&
                  (void 0 === this._offsets[e + 1] || a < this._offsets[e + 1]);
                f && this._activate(this._targets[e]);
              }
            }), (j.prototype._activate = function(b) {
              (this._activeTarget = b), this._clear();
              var c = this._selector.split(",");
              c = c.map(function(a) {
                return (
                  a + '[data-target="' + b + '"],' + (a + '[href="' + b + '"]')
                );
              });
              var d = a(c.join(","));
              d.hasClass(o.DROPDOWN_ITEM)
                ? (
                    d
                      .closest(p.DROPDOWN)
                      .find(p.DROPDOWN_TOGGLE)
                      .addClass(o.ACTIVE),
                    d.addClass(o.ACTIVE)
                  )
                : d.parents(p.LI).find(p.NAV_LINKS).addClass(o.ACTIVE), a(
                this._scrollElement
              ).trigger(n.ACTIVATE, { relatedTarget: b });
            }), (j.prototype._clear = function() {
              a(this._selector).filter(p.ACTIVE).removeClass(o.ACTIVE);
            }), (j._jQueryInterface = function(b) {
              return this.each(function() {
                var c = a(this).data(h),
                  e =
                    ("object" ===
                      ("undefined" == typeof b ? "undefined" : d(b)) &&
                      b) ||
                    null;
                if (
                  (
                    c || ((c = new j(this, e)), a(this).data(h, c)),
                    "string" == typeof b
                  )
                ) {
                  if (void 0 === c[b])
                    throw new Error('No method named "' + b + '"');
                  c[b]();
                }
              });
            }), e(j, null, [
              {
                key: "VERSION",
                get: function() {
                  return g;
                }
              },
              {
                key: "Default",
                get: function() {
                  return l;
                }
              }
            ]), j;
          })();
        return a(window).on(n.LOAD_DATA_API, function() {
          for (var b = a.makeArray(a(p.DATA_SPY)), c = b.length; c--; ) {
            var d = a(b[c]);
            r._jQueryInterface.call(d, d.data());
          }
        }), (a.fn[b] = r._jQueryInterface), (a.fn[b].Constructor = r), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = k), r._jQueryInterface;
        }), r;
      })(jQuery),
      (function(a) {
        var b = "tab",
          d = "4.0.0-alpha.5",
          g = "bs.tab",
          h = "." + g,
          i = ".data-api",
          j = a.fn[b],
          k = 150,
          l = {
            HIDE: "hide" + h,
            HIDDEN: "hidden" + h,
            SHOW: "show" + h,
            SHOWN: "shown" + h,
            CLICK_DATA_API: "click" + h + i
          },
          m = {
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active",
            FADE: "fade",
            IN: "in"
          },
          n = {
            A: "a",
            LI: "li",
            DROPDOWN: ".dropdown",
            UL: "ul:not(.dropdown-menu)",
            FADE_CHILD: "> .nav-item .fade, > .fade",
            ACTIVE: ".active",
            ACTIVE_CHILD: "> .nav-item > .active, > .active",
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
            DROPDOWN_TOGGLE: ".dropdown-toggle",
            DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
          },
          o = (function() {
            function b(a) {
              c(this, b), (this._element = a);
            }
            return (b.prototype.show = function() {
              var b = this;
              if (
                !this._element.parentNode ||
                this._element.parentNode.nodeType !== Node.ELEMENT_NODE ||
                !a(this._element).hasClass(m.ACTIVE)
              ) {
                var c = void 0,
                  d = void 0,
                  e = a(this._element).closest(n.UL)[0],
                  g = f.getSelectorFromElement(this._element);
                e &&
                  (
                    (d = a.makeArray(a(e).find(n.ACTIVE))),
                    (d = d[d.length - 1])
                  );
                var h = a.Event(l.HIDE, { relatedTarget: this._element }),
                  i = a.Event(l.SHOW, { relatedTarget: d });
                if (
                  (
                    d && a(d).trigger(h),
                    a(this._element).trigger(i),
                    !i.isDefaultPrevented() && !h.isDefaultPrevented()
                  )
                ) {
                  g && (c = a(g)[0]), this._activate(this._element, e);
                  var j = function() {
                    var c = a.Event(l.HIDDEN, { relatedTarget: b._element }),
                      e = a.Event(l.SHOWN, { relatedTarget: d });
                    a(d).trigger(c), a(b._element).trigger(e);
                  };
                  c ? this._activate(c, c.parentNode, j) : j();
                }
              }
            }), (b.prototype.dispose = function() {
              a.removeClass(this._element, g), (this._element = null);
            }), (b.prototype._activate = function(b, c, d) {
              var e = a(c).find(n.ACTIVE_CHILD)[0],
                g =
                  d &&
                  f.supportsTransitionEnd() &&
                  ((e && a(e).hasClass(m.FADE)) ||
                    Boolean(a(c).find(n.FADE_CHILD)[0])),
                h = a.proxy(this._transitionComplete, this, b, e, g, d);
              e && g
                ? a(e).one(f.TRANSITION_END, h).emulateTransitionEnd(k)
                : h(), e && a(e).removeClass(m.IN);
            }), (b.prototype._transitionComplete = function(b, c, d, e) {
              if (c) {
                a(c).removeClass(m.ACTIVE);
                var g = a(c).find(n.DROPDOWN_ACTIVE_CHILD)[0];
                g && a(g).removeClass(m.ACTIVE), c.setAttribute(
                  "aria-expanded",
                  !1
                );
              }
              if (
                (
                  a(b).addClass(m.ACTIVE),
                  b.setAttribute("aria-expanded", !0),
                  d
                    ? (f.reflow(b), a(b).addClass(m.IN))
                    : a(b).removeClass(m.FADE),
                  b.parentNode && a(b.parentNode).hasClass(m.DROPDOWN_MENU)
                )
              ) {
                var h = a(b).closest(n.DROPDOWN)[0];
                h &&
                  a(h)
                    .find(n.DROPDOWN_TOGGLE)
                    .addClass(m.ACTIVE), b.setAttribute("aria-expanded", !0);
              }
              e && e();
            }), (b._jQueryInterface = function(c) {
              return this.each(function() {
                var d = a(this),
                  e = d.data(g);
                if (
                  (
                    e || ((e = e = new b(this)), d.data(g, e)),
                    "string" == typeof c
                  )
                ) {
                  if (void 0 === e[c])
                    throw new Error('No method named "' + c + '"');
                  e[c]();
                }
              });
            }), e(b, null, [
              {
                key: "VERSION",
                get: function() {
                  return d;
                }
              }
            ]), b;
          })();
        return a(document).on(l.CLICK_DATA_API, n.DATA_TOGGLE, function(b) {
          b.preventDefault(), o._jQueryInterface.call(a(this), "show");
        }), (a.fn[b] = o._jQueryInterface), (a.fn[b].Constructor = o), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = j), o._jQueryInterface;
        }), o;
      })(jQuery),
      (function(a) {
        if (void 0 === window.Tether)
          throw new Error(
            "Bootstrap tooltips require Tether (http://tether.io/)"
          );
        var b = "tooltip",
          g = "4.0.0-alpha.5",
          h = "bs.tooltip",
          i = "." + h,
          j = a.fn[b],
          k = 150,
          l = "bs-tether",
          m = {
            animation: !0,
            template:
              '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: "0 0",
            constraints: []
          },
          n = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "string",
            constraints: "array"
          },
          o = {
            TOP: "bottom center",
            RIGHT: "middle left",
            BOTTOM: "top center",
            LEFT: "middle right"
          },
          p = { IN: "in", OUT: "out" },
          q = {
            HIDE: "hide" + i,
            HIDDEN: "hidden" + i,
            SHOW: "show" + i,
            SHOWN: "shown" + i,
            INSERTED: "inserted" + i,
            CLICK: "click" + i,
            FOCUSIN: "focusin" + i,
            FOCUSOUT: "focusout" + i,
            MOUSEENTER: "mouseenter" + i,
            MOUSELEAVE: "mouseleave" + i
          },
          r = { FADE: "fade", IN: "in" },
          s = { TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner" },
          t = { element: !1, enabled: !1 },
          u = {
            HOVER: "hover",
            FOCUS: "focus",
            CLICK: "click",
            MANUAL: "manual"
          },
          v = (function() {
            function j(a, b) {
              c(
                this,
                j
              ), (this._isEnabled = !0), (this._timeout = 0), (this._hoverState =
                ""), (this._activeTrigger = {}), (this._tether = null), (this.element = a), (this.config = this._getConfig(
                b
              )), (this.tip = null), this._setListeners();
            }
            return (j.prototype.enable = function() {
              this._isEnabled = !0;
            }), (j.prototype.disable = function() {
              this._isEnabled = !1;
            }), (j.prototype.toggleEnabled = function() {
              this._isEnabled = !this._isEnabled;
            }), (j.prototype.toggle = function(b) {
              if (b) {
                var c = this.constructor.DATA_KEY,
                  d = a(b.currentTarget).data(c);
                d ||
                  (
                    (d = new this.constructor(
                      b.currentTarget,
                      this._getDelegateConfig()
                    )),
                    a(b.currentTarget).data(c, d)
                  ), (d._activeTrigger.click = !d._activeTrigger
                  .click), d._isWithActiveTrigger()
                  ? d._enter(null, d)
                  : d._leave(null, d);
              } else {
                if (a(this.getTipElement()).hasClass(r.IN))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
            }), (j.prototype.dispose = function() {
              clearTimeout(this._timeout), this.cleanupTether(), a.removeData(
                this.element,
                this.constructor.DATA_KEY
              ), a(this.element).off(this.constructor.EVENT_KEY), this.tip &&
                a(
                  this.tip
                ).remove(), (this._isEnabled = null), (this._timeout = null), (this._hoverState = null), (this._activeTrigger = null), (this._tether = null), (this.element = null), (this.config = null), (this.tip = null);
            }), (j.prototype.show = function() {
              var b = this,
                c = a.Event(this.constructor.Event.SHOW);
              if (this.isWithContent() && this._isEnabled) {
                a(this.element).trigger(c);
                var d = a.contains(
                  this.element.ownerDocument.documentElement,
                  this.element
                );
                if (c.isDefaultPrevented() || !d) return;
                var e = this.getTipElement(),
                  g = f.getUID(this.constructor.NAME);
                e.setAttribute("id", g), this.element.setAttribute(
                  "aria-describedby",
                  g
                ), this.setContent(), this.config.animation &&
                  a(e).addClass(r.FADE);
                var h =
                    "function" == typeof this.config.placement
                      ? this.config.placement.call(this, e, this.element)
                      : this.config.placement,
                  i = this._getAttachment(h);
                a(e)
                  .data(this.constructor.DATA_KEY, this)
                  .appendTo(document.body), a(this.element).trigger(
                  this.constructor.Event.INSERTED
                ), (this._tether = new Tether({
                  attachment: i,
                  element: e,
                  target: this.element,
                  classes: t,
                  classPrefix: l,
                  offset: this.config.offset,
                  constraints: this.config.constraints,
                  addTargetClasses: !1
                })), f.reflow(e), this._tether.position(), a(e).addClass(r.IN);
                var k = function() {
                  var c = b._hoverState;
                  (b._hoverState = null), a(b.element).trigger(
                    b.constructor.Event.SHOWN
                  ), c === p.OUT && b._leave(null, b);
                };
                if (f.supportsTransitionEnd() && a(this.tip).hasClass(r.FADE))
                  return void a(this.tip)
                    .one(f.TRANSITION_END, k)
                    .emulateTransitionEnd(j._TRANSITION_DURATION);
                k();
              }
            }), (j.prototype.hide = function(b) {
              var c = this,
                d = this.getTipElement(),
                e = a.Event(this.constructor.Event.HIDE),
                g = function() {
                  c._hoverState !== p.IN &&
                    d.parentNode &&
                    d.parentNode.removeChild(d), c.element.removeAttribute(
                    "aria-describedby"
                  ), a(c.element).trigger(
                    c.constructor.Event.HIDDEN
                  ), c.cleanupTether(), b && b();
                };
              a(this.element).trigger(e), e.isDefaultPrevented() ||
                (
                  a(d).removeClass(r.IN),
                  f.supportsTransitionEnd() && a(this.tip).hasClass(r.FADE)
                    ? a(d).one(f.TRANSITION_END, g).emulateTransitionEnd(k)
                    : g(),
                  (this._hoverState = "")
                );
            }), (j.prototype.isWithContent = function() {
              return Boolean(this.getTitle());
            }), (j.prototype.getTipElement = function() {
              return (this.tip = this.tip || a(this.config.template)[0]);
            }), (j.prototype.setContent = function() {
              var b = a(this.getTipElement());
              this.setElementContent(
                b.find(s.TOOLTIP_INNER),
                this.getTitle()
              ), b.removeClass(r.FADE).removeClass(r.IN), this.cleanupTether();
            }), (j.prototype.setElementContent = function(b, c) {
              var e = this.config.html;
              "object" === ("undefined" == typeof c ? "undefined" : d(c)) &&
              (c.nodeType || c.jquery)
                ? e
                  ? a(c).parent().is(b) || b.empty().append(c)
                  : b.text(a(c).text())
                : b[e ? "html" : "text"](c);
            }), (j.prototype.getTitle = function() {
              var a = this.element.getAttribute("data-original-title");
              return a ||
                (a =
                  "function" == typeof this.config.title
                    ? this.config.title.call(this.element)
                    : this.config.title), a;
            }), (j.prototype.cleanupTether = function() {
              this._tether && this._tether.destroy();
            }), (j.prototype._getAttachment = function(a) {
              return o[a.toUpperCase()];
            }), (j.prototype._setListeners = function() {
              var b = this,
                c = this.config.trigger.split(" ");
              c.forEach(function(c) {
                if ("click" === c)
                  a(b.element).on(
                    b.constructor.Event.CLICK,
                    b.config.selector,
                    a.proxy(b.toggle, b)
                  );
                else if (c !== u.MANUAL) {
                  var d =
                      c === u.HOVER
                        ? b.constructor.Event.MOUSEENTER
                        : b.constructor.Event.FOCUSIN,
                    e =
                      c === u.HOVER
                        ? b.constructor.Event.MOUSELEAVE
                        : b.constructor.Event.FOCUSOUT;
                  a(b.element)
                    .on(d, b.config.selector, a.proxy(b._enter, b))
                    .on(e, b.config.selector, a.proxy(b._leave, b));
                }
              }), this.config.selector
                ? (this.config = a.extend({}, this.config, {
                    trigger: "manual",
                    selector: ""
                  }))
                : this._fixTitle();
            }), (j.prototype._fixTitle = function() {
              var a = d(this.element.getAttribute("data-original-title"));
              (this.element.getAttribute("title") || "string" !== a) &&
                (
                  this.element.setAttribute(
                    "data-original-title",
                    this.element.getAttribute("title") || ""
                  ),
                  this.element.setAttribute("title", "")
                );
            }), (j.prototype._enter = function(b, c) {
              var d = this.constructor.DATA_KEY;
              return (c = c || a(b.currentTarget).data(d)), c ||
                (
                  (c = new this.constructor(
                    b.currentTarget,
                    this._getDelegateConfig()
                  )),
                  a(b.currentTarget).data(d, c)
                ), b &&
                (c._activeTrigger[
                  "focusin" === b.type ? u.FOCUS : u.HOVER
                ] = !0), a(c.getTipElement()).hasClass(r.IN) ||
              c._hoverState === p.IN
                ? void (c._hoverState = p.IN)
                : (
                    clearTimeout(c._timeout),
                    (c._hoverState = p.IN),
                    c.config.delay && c.config.delay.show
                      ? void (c._timeout = setTimeout(function() {
                          c._hoverState === p.IN && c.show();
                        }, c.config.delay.show))
                      : void c.show()
                  );
            }), (j.prototype._leave = function(b, c) {
              var d = this.constructor.DATA_KEY;
              if (
                (
                  (c = c || a(b.currentTarget).data(d)),
                  c ||
                    (
                      (c = new this.constructor(
                        b.currentTarget,
                        this._getDelegateConfig()
                      )),
                      a(b.currentTarget).data(d, c)
                    ),
                  b &&
                    (c._activeTrigger[
                      "focusout" === b.type ? u.FOCUS : u.HOVER
                    ] = !1),
                  !c._isWithActiveTrigger()
                )
              )
                return clearTimeout(c._timeout), (c._hoverState = p.OUT), c
                  .config.delay && c.config.delay.hide
                  ? void (c._timeout = setTimeout(function() {
                      c._hoverState === p.OUT && c.hide();
                    }, c.config.delay.hide))
                  : void c.hide();
            }), (j.prototype._isWithActiveTrigger = function() {
              for (var a in this._activeTrigger)
                if (this._activeTrigger[a]) return !0;
              return !1;
            }), (j.prototype._getConfig = function(c) {
              return (c = a.extend(
                {},
                this.constructor.Default,
                a(this.element).data(),
                c
              )), c.delay &&
                "number" == typeof c.delay &&
                (c.delay = { show: c.delay, hide: c.delay }), f.typeCheckConfig(
                b,
                c,
                this.constructor.DefaultType
              ), c;
            }), (j.prototype._getDelegateConfig = function() {
              var a = {};
              if (this.config)
                for (var b in this.config)
                  this.constructor.Default[b] !== this.config[b] &&
                    (a[b] = this.config[b]);
              return a;
            }), (j._jQueryInterface = function(b) {
              return this.each(function() {
                var c = a(this).data(h),
                  e =
                    "object" === ("undefined" == typeof b ? "undefined" : d(b))
                      ? b
                      : null;
                if (
                  (c || !/dispose|hide/.test(b)) &&
                  (
                    c || ((c = new j(this, e)), a(this).data(h, c)),
                    "string" == typeof b
                  )
                ) {
                  if (void 0 === c[b])
                    throw new Error('No method named "' + b + '"');
                  c[b]();
                }
              });
            }), e(j, null, [
              {
                key: "VERSION",
                get: function() {
                  return g;
                }
              },
              {
                key: "Default",
                get: function() {
                  return m;
                }
              },
              {
                key: "NAME",
                get: function() {
                  return b;
                }
              },
              {
                key: "DATA_KEY",
                get: function() {
                  return h;
                }
              },
              {
                key: "Event",
                get: function() {
                  return q;
                }
              },
              {
                key: "EVENT_KEY",
                get: function() {
                  return i;
                }
              },
              {
                key: "DefaultType",
                get: function() {
                  return n;
                }
              }
            ]), j;
          })();
        return (a.fn[b] = v._jQueryInterface), (a.fn[b].Constructor = v), (a.fn[
          b
        ].noConflict = function() {
          return (a.fn[b] = j), v._jQueryInterface;
        }), v;
      })(jQuery)
    );
  (function(f) {
    var h = "popover",
      i = "4.0.0-alpha.5",
      j = "bs.popover",
      k = "." + j,
      l = f.fn[h],
      m = f.extend({}, g.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      }),
      n = f.extend({}, g.DefaultType, { content: "(string|element|function)" }),
      o = { FADE: "fade", IN: "in" },
      p = { TITLE: ".popover-title", CONTENT: ".popover-content" },
      q = {
        HIDE: "hide" + k,
        HIDDEN: "hidden" + k,
        SHOW: "show" + k,
        SHOWN: "shown" + k,
        INSERTED: "inserted" + k,
        CLICK: "click" + k,
        FOCUSIN: "focusin" + k,
        FOCUSOUT: "focusout" + k,
        MOUSEENTER: "mouseenter" + k,
        MOUSELEAVE: "mouseleave" + k
      },
      r = (function(g) {
        function l() {
          return c(this, l), a(this, g.apply(this, arguments));
        }
        return b(l, g), (l.prototype.isWithContent = function() {
          return this.getTitle() || this._getContent();
        }), (l.prototype.getTipElement = function() {
          return (this.tip = this.tip || f(this.config.template)[0]);
        }), (l.prototype.setContent = function() {
          var a = f(this.getTipElement());
          this.setElementContent(
            a.find(p.TITLE),
            this.getTitle()
          ), this.setElementContent(
            a.find(p.CONTENT),
            this._getContent()
          ), a.removeClass(o.FADE).removeClass(o.IN), this.cleanupTether();
        }), (l.prototype._getContent = function() {
          return (
            this.element.getAttribute("data-content") ||
            ("function" == typeof this.config.content
              ? this.config.content.call(this.element)
              : this.config.content)
          );
        }), (l._jQueryInterface = function(a) {
          return this.each(function() {
            var b = f(this).data(j),
              c =
                "object" === ("undefined" == typeof a ? "undefined" : d(a))
                  ? a
                  : null;
            if (
              (b || !/destroy|hide/.test(a)) &&
              (
                b || ((b = new l(this, c)), f(this).data(j, b)),
                "string" == typeof a
              )
            ) {
              if (void 0 === b[a])
                throw new Error('No method named "' + a + '"');
              b[a]();
            }
          });
        }), e(l, null, [
          {
            key: "VERSION",
            get: function() {
              return i;
            }
          },
          {
            key: "Default",
            get: function() {
              return m;
            }
          },
          {
            key: "NAME",
            get: function() {
              return h;
            }
          },
          {
            key: "DATA_KEY",
            get: function() {
              return j;
            }
          },
          {
            key: "Event",
            get: function() {
              return q;
            }
          },
          {
            key: "EVENT_KEY",
            get: function() {
              return k;
            }
          },
          {
            key: "DefaultType",
            get: function() {
              return n;
            }
          }
        ]), l;
      })(g);
    return (f.fn[h] = r._jQueryInterface), (f.fn[h].Constructor = r), (f.fn[
      h
    ].noConflict = function() {
      return (f.fn[h] = l), r._jQueryInterface;
    }), r;
  })(jQuery);
})(); /**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!(function(a, b, c, d) {
  function e(b, c) {
    (this.settings = null), (this.options = a.extend(
      {},
      e.Defaults,
      c
    )), (this.$element = a(
      b
    )), (this._handlers = {}), (this._plugins = {}), (this._supress = {}), (this._current = null), (this._speed = null), (this._coordinates = []), (this._breakpoint = null), (this._width = null), (this._items = []), (this._clones = []), (this._mergers = []), (this._widths = []), (this._invalidated = {}), (this._pipe = []), (this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: { start: null, current: null },
      direction: null
    }), (this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }), a.each(
      ["onResize", "onThrottledResize"],
      a.proxy(function(b, c) {
        this._handlers[c] = a.proxy(this[c], this);
      }, this)
    ), a.each(
      e.Plugins,
      a.proxy(function(a, b) {
        this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
      }, this)
    ), a.each(
      e.Workers,
      a.proxy(function(b, c) {
        this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
      }, this)
    ), this.setup(), this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }), (e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }), (e.Type = {
    Event: "event",
    State: "state"
  }), (e.Plugins = {}), (e.Workers = [
    {
      filter: ["width", "settings"],
      run: function() {
        this._width = this.$element.width();
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function(a) {
        a.current = this._items && this._items[this.relative(this._current)];
      }
    },
    {
      filter: ["items", "settings"],
      run: function() {
        this.$stage.children(".cloned").remove();
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function(a) {
        var b = this.settings.margin || "",
          c = !this.settings.autoWidth,
          d = this.settings.rtl,
          e = {
            width: "auto",
            "margin-left": d ? b : "",
            "margin-right": d ? "" : b
          };
        !c && this.$stage.children().css(e), (a.css = e);
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function(a) {
        var b =
            (this.width() / this.settings.items).toFixed(3) -
            this.settings.margin,
          c = null,
          d = this._items.length,
          e = !this.settings.autoWidth,
          f = [];
        for (a.items = { merge: !1, width: b }; d--; )
          (c = this._mergers[d]), (c =
            (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
            c), (a.items.merge = c > 1 || a.items.merge), (f[d] = e
            ? b * c
            : this._items[d].width());
        this._widths = f;
      }
    },
    {
      filter: ["items", "settings"],
      run: function() {
        var b = [],
          c = this._items,
          d = this.settings,
          e = Math.max(2 * d.items, 4),
          f = 2 * Math.ceil(c.length / 2),
          g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
          h = "",
          i = "";
        for (g /= 2; g--; )
          b.push(this.normalize(b.length / 2, !0)), (h +=
            c[b[b.length - 1]][0].outerHTML), b.push(
            this.normalize(c.length - 1 - (b.length - 1) / 2, !0)
          ), (i = c[b[b.length - 1]][0].outerHTML + i);
        (this._clones = b), a(h).addClass("cloned").appendTo(this.$stage), a(i)
          .addClass("cloned")
          .prependTo(this.$stage);
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function() {
        for (
          var a = this.settings.rtl ? 1 : -1,
            b = this._clones.length + this._items.length,
            c = -1,
            d = 0,
            e = 0,
            f = [];
          ++c < b;

        )
          (d = f[c - 1] || 0), (e =
            this._widths[this.relative(c)] + this.settings.margin), f.push(
            d + e * a
          );
        this._coordinates = f;
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function() {
        var a = this.settings.stagePadding,
          b = this._coordinates,
          c = {
            width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
            "padding-left": a || "",
            "padding-right": a || ""
          };
        this.$stage.css(c);
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function(a) {
        var b = this._coordinates.length,
          c = !this.settings.autoWidth,
          d = this.$stage.children();
        if (c && a.items.merge)
          for (; b--; )
            (a.css.width = this._widths[this.relative(b)]), d.eq(b).css(a.css);
        else c && ((a.css.width = a.items.width), d.css(a.css));
      }
    },
    {
      filter: ["items"],
      run: function() {
        this._coordinates.length < 1 && this.$stage.removeAttr("style");
      }
    },
    {
      filter: ["width", "items", "settings"],
      run: function(a) {
        (a.current = a.current
          ? this.$stage.children().index(a.current)
          : 0), (a.current = Math.max(
          this.minimum(),
          Math.min(this.maximum(), a.current)
        )), this.reset(a.current);
      }
    },
    {
      filter: ["position"],
      run: function() {
        this.animate(this.coordinates(this._current));
      }
    },
    {
      filter: ["width", "position", "items", "settings"],
      run: function() {
        var a,
          b,
          c,
          d,
          e = this.settings.rtl ? 1 : -1,
          f = 2 * this.settings.stagePadding,
          g = this.coordinates(this.current()) + f,
          h = g + this.width() * e,
          i = [];
        for (c = 0, d = this._coordinates.length; c < d; c++)
          (a = this._coordinates[c - 1] || 0), (b =
            Math.abs(this._coordinates[c]) + f * e), ((this.op(a, "<=", g) &&
            this.op(a, ">", h)) ||
            (this.op(b, "<", g) && this.op(b, ">", h))) &&
            i.push(c);
        this.$stage
          .children(".active")
          .removeClass("active"), this.$stage
          .children(":eq(" + i.join("), :eq(") + ")")
          .addClass("active"), this.settings.center &&
          (
            this.$stage.children(".center").removeClass("center"),
            this.$stage.children().eq(this.current()).addClass("center")
          );
      }
    }
  ]), (e.prototype.initialize = function() {
    if (
      (
        this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading")
      )
    ) {
      var b, c, e;
      (b = this.$element.find("img")), (c = this.settings.nestedItemSelector
        ? "." + this.settings.nestedItemSelector
        : d), (e = this.$element.children(c).width()), b.length &&
        e <= 0 &&
        this.preloadAutoWidthImages(b);
    }
    this.$element.addClass(this.options.loadingClass), (this.$stage = a(
      "<" +
        this.settings.stageElement +
        ' class="' +
        this.settings.stageClass +
        '"/>'
    ).wrap(
      '<div class="' + this.settings.stageOuterClass + '"/>'
    )), this.$element.append(this.$stage.parent()), this.replace(
      this.$element.children().not(this.$stage.parent())
    ), this.$element.is(":visible")
      ? this.refresh()
      : this.invalidate("width"), this.$element
      .removeClass(this.options.loadingClass)
      .addClass(
        this.options.loadedClass
      ), this.registerEventHandlers(), this.leave("initializing"), this.trigger(
      "initialized"
    );
  }), (e.prototype.setup = function() {
    var b = this.viewport(),
      c = this.options.responsive,
      d = -1,
      e = null;
    c
      ? (
          a.each(c, function(a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            )
        )
      : (e = a.extend({}, this.options)), this.trigger("change", {
      property: { name: "settings", value: e }
    }), (this._breakpoint = d), (this.settings = e), this.invalidate(
      "settings"
    ), this.trigger("changed", {
      property: { name: "settings", value: this.settings }
    });
  }), (e.prototype.optionsLogic = function() {
    this.settings.autoWidth &&
      ((this.settings.stagePadding = !1), (this.settings.merge = !1));
  }), (e.prototype.prepare = function(b) {
    var c = this.trigger("prepare", { content: b });
    return c.data ||
      (c.data = a("<" + this.settings.itemElement + "/>")
        .addClass(this.options.itemClass)
        .append(b)), this.trigger("prepared", { content: c.data }), c.data;
  }), (e.prototype.update = function() {
    for (
      var b = 0,
        c = this._pipe.length,
        d = a.proxy(function(a) {
          return this[a];
        }, this._invalidated),
        e = {};
      b < c;

    )
      (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
        this._pipe[b].run(e), b++;
    (this._invalidated = {}), !this.is("valid") && this.enter("valid");
  }), (e.prototype.width = function(a) {
    switch ((a = a || e.Width.Default)) {
      case e.Width.Inner:
      case e.Width.Outer:
        return this._width;
      default:
        return (
          this._width - 2 * this.settings.stagePadding + this.settings.margin
        );
    }
  }), (e.prototype.refresh = function() {
    this.enter("refreshing"), this.trigger(
      "refresh"
    ), this.setup(), this.optionsLogic(), this.$element.addClass(
      this.options.refreshClass
    ), this.update(), this.$element.removeClass(
      this.options.refreshClass
    ), this.leave("refreshing"), this.trigger("refreshed");
  }), (e.prototype.onThrottledResize = function() {
    b.clearTimeout(this.resizeTimer), (this.resizeTimer = b.setTimeout(
      this._handlers.onResize,
      this.settings.responsiveRefreshRate
    ));
  }), (e.prototype.onResize = function() {
    return (
      !!this._items.length &&
      (this._width !== this.$element.width() &&
        (!!this.$element.is(":visible") &&
          (
            this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented()
              ? (this.leave("resizing"), !1)
              : (
                  this.invalidate("width"),
                  this.refresh(),
                  this.leave("resizing"),
                  void this.trigger("resized")
                )
          )))
    );
  }), (e.prototype.registerEventHandlers = function() {
    a.support.transition &&
      this.$stage.on(
        a.support.transition.end + ".owl.core",
        a.proxy(this.onTransitionEnd, this)
      ), this.settings.responsive !== !1 &&
      this.on(b, "resize", this._handlers.onThrottledResize), this.settings
      .mouseDrag &&
      (
        this.$element.addClass(this.options.dragClass),
        this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
        this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
          return !1;
        })
      ), this.settings.touchDrag &&
      (
        this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)),
        this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this))
      );
  }), (e.prototype.onDragStart = function(b) {
    var d = null;
    3 !== b.which &&
      (
        a.support.transform
          ? (
              (d = this.$stage
                .css("transform")
                .replace(/.*\(|\)| /g, "")
                .split(",")),
              (d = {
                x: d[16 === d.length ? 12 : 4],
                y: d[16 === d.length ? 13 : 5]
              })
            )
          : (
              (d = this.$stage.position()),
              (d = {
                x: this.settings.rtl
                  ? d.left +
                    this.$stage.width() -
                    this.width() +
                    this.settings.margin
                  : d.left,
                y: d.top
              })
            ),
        this.is("animating") &&
          (
            a.support.transform ? this.animate(d.x) : this.$stage.stop(),
            this.invalidate("position")
          ),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ), (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"));
          }, this)
        )
      );
  }), (e.prototype.onDragMove = function(a) {
    var b = null,
      c = null,
      d = null,
      e = this.difference(this._drag.pointer, this.pointer(a)),
      f = this.difference(this._drag.stage.start, e);
    this.is("dragging") &&
      (
        a.preventDefault(),
        this.settings.loop
          ? (
              (b = this.coordinates(this.minimum())),
              (c = this.coordinates(this.maximum() + 1) - b),
              (f.x = ((f.x - b) % c + c) % c + b)
            )
          : (
              (b = this.settings.rtl
                ? this.coordinates(this.maximum())
                : this.coordinates(this.minimum())),
              (c = this.settings.rtl
                ? this.coordinates(this.minimum())
                : this.coordinates(this.maximum())),
              (d = this.settings.pullDrag ? -1 * e.x / 5 : 0),
              (f.x = Math.max(Math.min(f.x, b + d), c + d))
            ),
        (this._drag.stage.current = f),
        this.animate(f.x)
      );
  }), (e.prototype.onDragEnd = function(b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
      e = this._drag.stage.current,
      f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(
      this.options.grabClass
    ), ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
      (
        this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
        this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
        this.invalidate("position"),
        this.update(),
        (this._drag.direction = f),
        (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
          this._drag.target.one("click.owl.core", function() {
            return !1;
          })
      ), this.is("dragging") &&
      (this.leave("dragging"), this.trigger("dragged"));
  }), (e.prototype.closest = function(b, c) {
    var d = -1,
      e = 30,
      f = this.width(),
      g = this.coordinates();
    return this.settings.freeDrag ||
      a.each(
        g,
        a.proxy(function(a, h) {
          return "left" === c && b > h - e && b < h + e
            ? (d = a)
            : "right" === c && b > h - f - e && b < h - f + e
              ? (d = a + 1)
              : this.op(b, "<", h) &&
                this.op(b, ">", g[a + 1] || h - f) &&
                (d = "left" === c ? a + 1 : a), d === -1;
        }, this)
      ), this.settings.loop ||
      (this.op(b, ">", g[this.minimum()])
        ? (d = b = this.minimum())
        : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d;
  }), (e.prototype.animate = function(b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c &&
      (this.enter("animating"), this.trigger("translate")), a.support
      .transform3d && a.support.transition
      ? this.$stage.css({
          transform: "translate3d(" + b + "px,0px,0px)",
          transition: this.speed() / 1e3 + "s"
        })
      : c
        ? this.$stage.animate(
            { left: b + "px" },
            this.speed(),
            this.settings.fallbackEasing,
            a.proxy(this.onTransitionEnd, this)
          )
        : this.$stage.css({ left: b + "px" });
  }), (e.prototype.is = function(a) {
    return this._states.current[a] && this._states.current[a] > 0;
  }), (e.prototype.current = function(a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;
    if (((a = this.normalize(a)), this._current !== a)) {
      var b = this.trigger("change", {
        property: { name: "position", value: a }
      });
      b.data !== d &&
        (a = this.normalize(b.data)), (this._current = a), this.invalidate(
        "position"
      ), this.trigger("changed", {
        property: { name: "position", value: this._current }
      });
    }
    return this._current;
  }), (e.prototype.invalidate = function(b) {
    return "string" === a.type(b) &&
      (
        (this._invalidated[b] = !0),
        this.is("valid") && this.leave("valid")
      ), a.map(this._invalidated, function(a, b) {
      return b;
    });
  }), (e.prototype.reset = function(a) {
    (a = this.normalize(a)), a !== d &&
      (
        (this._speed = 0),
        (this._current = a),
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"])
      );
  }), (e.prototype.normalize = function(a, b) {
    var c = this._items.length,
      e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1
      ? (a = d)
      : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a;
  }), (e.prototype.relative = function(a) {
    return (a -= this._clones.length / 2), this.normalize(a, !0);
  }), (e.prototype.maximum = function(a) {
    var b,
      c,
      d,
      e = this.settings,
      f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
    else if (e.autoWidth || e.merge) {
      for (
        b = this._items.length, c = this._items[
          --b
        ].width(), d = this.$element.width();
        b-- && ((c += this._items[b].width() + this.settings.margin), !(c > d));

      );
      f = b + 1;
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0);
  }), (e.prototype.minimum = function(a) {
    return a ? 0 : this._clones.length / 2;
  }), (e.prototype.items = function(a) {
    return a === d
      ? this._items.slice()
      : ((a = this.normalize(a, !0)), this._items[a]);
  }), (e.prototype.mergers = function(a) {
    return a === d
      ? this._mergers.slice()
      : ((a = this.normalize(a, !0)), this._mergers[a]);
  }), (e.prototype.clones = function(b) {
    var c = this._clones.length / 2,
      e = c + this._items.length,
      f = function(a) {
        return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
      };
    return b === d
      ? a.map(this._clones, function(a, b) {
          return f(b);
        })
      : a.map(this._clones, function(a, c) {
          return a === b ? f(c) : null;
        });
  }), (e.prototype.speed = function(a) {
    return a !== d && (this._speed = a), this._speed;
  }), (e.prototype.coordinates = function(b) {
    var c,
      e = 1,
      f = b - 1;
    return b === d
      ? a.map(
          this._coordinates,
          a.proxy(function(a, b) {
            return this.coordinates(b);
          }, this)
        )
      : (
          this.settings.center
            ? (
                this.settings.rtl && ((e = -1), (f = b + 1)),
                (c = this._coordinates[b]),
                (c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e)
              )
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c))
        );
  }), (e.prototype.duration = function(a, b, c) {
    return 0 === c
      ? 0
      : Math.min(Math.max(Math.abs(b - a), 1), 6) *
        Math.abs(c || this.settings.smartSpeed);
  }), (e.prototype.to = function(a, b) {
    var c = this.current(),
      d = null,
      e = a - this.relative(c),
      f = (e > 0) - (e < 0),
      g = this._items.length,
      h = this.minimum(),
      i = this.maximum();
    this.settings.loop
      ? (
          !this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
          (a = c + e),
          (d = ((a - h) % g + g) % g + h),
          d !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c))
        )
      : this.settings.rewind
        ? ((i += 1), (a = (a % i + i) % i))
        : (a = Math.max(h, Math.min(i, a))), this.speed(
      this.duration(c, a, b)
    ), this.current(a), this.$element.is(":visible") && this.update();
  }), (e.prototype.next = function(a) {
    (a = a || !1), this.to(this.relative(this.current()) + 1, a);
  }), (e.prototype.prev = function(a) {
    (a = a || !1), this.to(this.relative(this.current()) - 1, a);
  }), (e.prototype.onTransitionEnd = function(a) {
    if (
      a !== d &&
      (
        a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)
      )
    )
      return !1;
    this.leave("animating"), this.trigger("translated");
  }), (e.prototype.viewport = function() {
    var d;
    return this.options.responsiveBaseElement !== b
      ? (d = a(this.options.responsiveBaseElement).width())
      : b.innerWidth
        ? (d = b.innerWidth)
        : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."), d;
  }), (e.prototype.replace = function(b) {
    this.$stage.empty(), (this._items = []), b &&
      (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector &&
      (b = b.find("." + this.settings.nestedItemSelector)), b
      .filter(function() {
        return 1 === this.nodeType;
      })
      .each(
        a.proxy(function(a, b) {
          (b = this.prepare(
            b
          )), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
        }, this)
      ), this.reset(
      this.isNumeric(this.settings.startPosition)
        ? this.settings.startPosition
        : 0
    ), this.invalidate("items");
  }), (e.prototype.add = function(b, c) {
    var e = this.relative(this._current);
    (c = c === d ? this._items.length : this.normalize(c, !0)), (b =
      b instanceof jQuery ? b : a(b)), this.trigger("add", {
      content: b,
      position: c
    }), (b = this.prepare(b)), 0 === this._items.length ||
    c === this._items.length
      ? (
          0 === this._items.length && this.$stage.append(b),
          0 !== this._items.length && this._items[c - 1].after(b),
          this._items.push(b),
          this._mergers.push(
            1 *
              b
                .find("[data-merge]")
                .addBack("[data-merge]")
                .attr("data-merge") || 1
          )
        )
      : (
          this._items[c].before(b),
          this._items.splice(c, 0, b),
          this._mergers.splice(
            c,
            0,
            1 *
              b
                .find("[data-merge]")
                .addBack("[data-merge]")
                .attr("data-merge") || 1
          )
        ), this._items[e] &&
      this.reset(this._items[e].index()), this.invalidate(
      "items"
    ), this.trigger("added", { content: b, position: c });
  }), (e.prototype.remove = function(a) {
    (a = this.normalize(a, !0)), a !== d &&
      (
        this.trigger("remove", { content: this._items[a], position: a }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", { content: null, position: a })
      );
  }), (e.prototype.preloadAutoWidthImages = function(b) {
    b.each(
      a.proxy(function(b, c) {
        this.enter("pre-loading"), (c = a(c)), a(new Image())
          .one(
            "load",
            a.proxy(function(a) {
              c.attr(
                "src",
                a.target.src
              ), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
            }, this)
          )
          .attr(
            "src",
            c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
          );
      }, this)
    );
  }), (e.prototype.destroy = function() {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(
      ".owl.core"
    ), this.settings.responsive !== !1 &&
      (
        b.clearTimeout(this.resizeTimer),
        this.off(b, "resize", this._handlers.onThrottledResize)
      );
    for (var d in this._plugins) this._plugins[d].destroy();
    this.$stage
      .children(".cloned")
      .remove(), this.$stage.unwrap(), this.$stage
      .children()
      .contents()
      .unwrap(), this.$stage.children().unwrap(), this.$element
      .removeClass(this.options.refreshClass)
      .removeClass(this.options.loadingClass)
      .removeClass(this.options.loadedClass)
      .removeClass(this.options.rtlClass)
      .removeClass(this.options.dragClass)
      .removeClass(this.options.grabClass)
      .attr(
        "class",
        this.$element
          .attr("class")
          .replace(
            new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
            ""
          )
      )
      .removeData("owl.carousel");
  }), (e.prototype.op = function(a, b, c) {
    var d = this.settings.rtl;
    switch (b) {
      case "<":
        return d ? a > c : a < c;
      case ">":
        return d ? a < c : a > c;
      case ">=":
        return d ? a <= c : a >= c;
      case "<=":
        return d ? a >= c : a <= c;
    }
  }), (e.prototype.on = function(a, b, c, d) {
    a.addEventListener
      ? a.addEventListener(b, c, d)
      : a.attachEvent && a.attachEvent("on" + b, c);
  }), (e.prototype.off = function(a, b, c, d) {
    a.removeEventListener
      ? a.removeEventListener(b, c, d)
      : a.detachEvent && a.detachEvent("on" + b, c);
  }), (e.prototype.trigger = function(b, c, d, f, g) {
    var h = { item: { count: this._items.length, index: this.current() } },
      i = a.camelCase(
        a
          .grep(["on", b, d], function(a) {
            return a;
          })
          .join("-")
          .toLowerCase()
      ),
      j = a.Event(
        [b, "owl", d || "carousel"].join(".").toLowerCase(),
        a.extend({ relatedTarget: this }, h, c)
      );
    return this._supress[b] ||
      (
        a.each(this._plugins, function(a, b) {
          b.onTrigger && b.onTrigger(j);
        }),
        this.register({ type: e.Type.Event, name: b }),
        this.$element.trigger(j),
        this.settings &&
          "function" == typeof this.settings[i] &&
          this.settings[i].call(this, j)
      ), j;
  }), (e.prototype.enter = function(b) {
    a.each(
      [b].concat(this._states.tags[b] || []),
      a.proxy(function(a, b) {
        this._states.current[b] === d &&
          (this._states.current[b] = 0), this._states.current[b]++;
      }, this)
    );
  }), (e.prototype.leave = function(b) {
    a.each(
      [b].concat(this._states.tags[b] || []),
      a.proxy(function(a, b) {
        this._states.current[b]--;
      }, this)
    );
  }), (e.prototype.register = function(b) {
    if (b.type === e.Type.Event) {
      if (
        (
          a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl
        )
      ) {
        var c = a.event.special[b.name]._default;
        (a.event.special[b.name]._default = function(a) {
          return !c ||
          !c.apply ||
          (a.namespace && a.namespace.indexOf("owl") !== -1)
            ? a.namespace && a.namespace.indexOf("owl") > -1
            : c.apply(this, arguments);
        }), (a.event.special[b.name].owl = !0);
      }
    } else
      b.type === e.Type.State &&
        (
          this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function(c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          ))
        );
  }), (e.prototype.suppress = function(b) {
    a.each(
      b,
      a.proxy(function(a, b) {
        this._supress[b] = !0;
      }, this)
    );
  }), (e.prototype.release = function(b) {
    a.each(
      b,
      a.proxy(function(a, b) {
        delete this._supress[b];
      }, this)
    );
  }), (e.prototype.pointer = function(a) {
    var c = { x: null, y: null };
    return (a = a.originalEvent || a || b.event), (a =
      a.touches && a.touches.length
        ? a.touches[0]
        : a.changedTouches && a.changedTouches.length
          ? a.changedTouches[0]
          : a), a.pageX
      ? ((c.x = a.pageX), (c.y = a.pageY))
      : ((c.x = a.clientX), (c.y = a.clientY)), c;
  }), (e.prototype.isNumeric = function(a) {
    return !isNaN(parseFloat(a));
  }), (e.prototype.difference = function(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }), (a.fn.owlCarousel = function(b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var d = a(this),
        f = d.data("owl.carousel");
      f ||
        (
          (f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove"
            ],
            function(b, c) {
              f.register({ type: e.Type.Event, name: c }), f.$element.on(
                c + ".owl.carousel.core",
                a.proxy(function(a) {
                  a.namespace &&
                    a.relatedTarget !== this &&
                    (
                      this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c])
                    );
                }, f)
              );
            }
          )
        ), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
    });
  }), (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  var e = function(b) {
    (this._core = b), (this._interval = null), (this._visible = null), (this._handlers = {
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoRefresh && this.watch();
      }, this)
    }), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    )), this._core.$element.on(this._handlers);
  };
  (e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }), (e.prototype.watch = function() {
    this._interval ||
      (
        (this._visible = this._core.$element.is(":visible")),
        (this._interval = b.setInterval(
          a.proxy(this.refresh, this),
          this._core.settings.autoRefreshInterval
        ))
      );
  }), (e.prototype.refresh = function() {
    this._core.$element.is(":visible") !== this._visible &&
      (
        (this._visible = !this._visible),
        this._core.$element.toggleClass("owl-hidden", !this._visible),
        this._visible && this._core.invalidate("width") && this._core.refresh()
      );
  }), (e.prototype.destroy = function() {
    var a, c;
    b.clearInterval(this._interval);
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (c in Object.getOwnPropertyNames(this))
      "function" != typeof this[c] && (this[c] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  var e = function(b) {
    (this._core = b), (this._loaded = []), (this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(
        function(b) {
          if (
            b.namespace &&
            this._core.settings &&
            this._core.settings.lazyLoad &&
            ((b.property && "position" == b.property.name) ||
              "initialized" == b.type)
          )
            for (
              var c = this._core.settings,
                e = (c.center && Math.ceil(c.items / 2)) || c.items,
                f = (c.center && e * -1) || 0,
                g =
                  (b.property && b.property.value !== d
                    ? b.property.value
                    : this._core.current()) + f,
                h = this._core.clones().length,
                i = a.proxy(function(a, b) {
                  this.load(b);
                }, this);
              f++ < e;

            )
              this.load(h / 2 + this._core.relative(g)), h &&
                a.each(this._core.clones(this._core.relative(g)), i), g++;
        },
        this
      )
    }), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    )), this._core.$element.on(this._handlers);
  };
  (e.Defaults = { lazyLoad: !1 }), (e.prototype.load = function(c) {
    var d = this._core.$stage.children().eq(c),
      e = d && d.find(".owl-lazy");
    !e ||
      a.inArray(d.get(0), this._loaded) > -1 ||
      (
        e.each(
          a.proxy(function(c, d) {
            var e,
              f = a(d),
              g =
                (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                f.attr("data-src");
            this._core.trigger("load", { element: f, url: g }, "lazy"), f.is(
              "img"
            )
              ? f
                  .one(
                    "load.owl.lazy",
                    a.proxy(function() {
                      f.css(
                        "opacity",
                        1
                      ), this._core.trigger("loaded", { element: f, url: g }, "lazy");
                    }, this)
                  )
                  .attr("src", g)
              : (
                  (e = new Image()),
                  (e.onload = a.proxy(function() {
                    f.css({
                      "background-image": 'url("' + g + '")',
                      opacity: "1"
                    }), this._core.trigger("loaded", { element: f, url: g }, "lazy");
                  }, this)),
                  (e.src = g)
                );
          }, this)
        ),
        this._loaded.push(d.get(0))
      );
  }), (e.prototype.destroy = function() {
    var a, b;
    for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
    for (b in Object.getOwnPropertyNames(this))
      "function" != typeof this[b] && (this[b] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  var e = function(b) {
    (this._core = b), (this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoHeight && this.update();
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._core.settings.autoHeight &&
          "position" == a.property.name &&
          this.update();
      }, this),
      "loaded.owl.lazy": a.proxy(function(a) {
        a.namespace &&
          this._core.settings.autoHeight &&
          a.element.closest("." + this._core.settings.itemClass).index() ===
            this._core.current() &&
          this.update();
      }, this)
    }), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    )), this._core.$element.on(this._handlers);
  };
  (e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }), (e.prototype.update = function() {
    var b = this._core._current,
      c = b + this._core.settings.items,
      d = this._core.$stage.children().toArray().slice(b, c),
      e = [],
      f = 0;
    a.each(d, function(b, c) {
      e.push(a(c).height());
    }), (f = Math.max.apply(null, e)), this._core.$stage
      .parent()
      .height(f)
      .addClass(this._core.settings.autoHeightClass);
  }), (e.prototype.destroy = function() {
    var a, b;
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this))
      "function" != typeof this[b] && (this[b] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  var e = function(b) {
    (this._core = b), (this._videos = {}), (this._playing = null), (this._handlers = {
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._core.register({
            type: "state",
            name: "playing",
            tags: ["interacting"]
          });
      }, this),
      "resize.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._core.settings.video &&
          this.isInFullScreen() &&
          a.preventDefault();
      }, this),
      "refreshed.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._core.is("resizing") &&
          this._core.$stage.find(".cloned .owl-video-frame").remove();
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          "position" === a.property.name &&
          this._playing &&
          this.stop();
      }, this),
      "prepared.owl.carousel": a.proxy(function(b) {
        if (b.namespace) {
          var c = a(b.content).find(".owl-video");
          c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
        }
      }, this)
    }), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    )), this._core.$element.on(this._handlers), this._core.$element.on(
      "click.owl.video",
      ".owl-video-play-icon",
      a.proxy(function(a) {
        this.play(a);
      }, this)
    );
  };
  (e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }), (e.prototype.fetch = function(a, b) {
    var c = (function() {
        return a.attr("data-vimeo-id")
          ? "vimeo"
          : a.attr("data-vzaar-id") ? "vzaar" : "youtube";
      })(),
      d =
        a.attr("data-vimeo-id") ||
        a.attr("data-youtube-id") ||
        a.attr("data-vzaar-id"),
      e = a.attr("data-width") || this._core.settings.videoWidth,
      f = a.attr("data-height") || this._core.settings.videoHeight,
      g = a.attr("href");
    if (!g) throw new Error("Missing video URL.");
    if (
      (
        (d = g.match(
          /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
        )),
        d[3].indexOf("youtu") > -1
      )
    )
      c = "youtube";
    else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
    else {
      if (!(d[3].indexOf("vzaar") > -1))
        throw new Error("Video URL not supported.");
      c = "vzaar";
    }
    (d = d[6]), (this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
    }), b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
  }), (e.prototype.thumbnail = function(b, c) {
    var d,
      e,
      f,
      g =
        c.width && c.height
          ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
          : "",
      h = b.find("img"),
      i = "src",
      j = "",
      k = this._core.settings,
      l = function(a) {
        (e = '<div class="owl-video-play-icon"></div>'), (d = k.lazyLoad
          ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>'
          : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
            a +
            ')"></div>'), b.after(d), b.after(e);
      };
    if (
      (
        b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
        this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
        h.length
      )
    )
      return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type
      ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
      : "vimeo" === c.type
        ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
              (f = a[0].thumbnail_large), l(f);
            }
          })
        : "vzaar" === c.type &&
          a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
              (f = a.framegrab_url), l(f);
            }
          });
  }), (e.prototype.stop = function() {
    this._core.trigger("stop", null, "video"), this._playing
      .find(".owl-video-frame")
      .remove(), this._playing.removeClass(
      "owl-video-playing"
    ), (this._playing = null), this._core.leave("playing"), this._core.trigger(
      "stopped",
      null,
      "video"
    );
  }), (e.prototype.play = function(b) {
    var c,
      d = a(b.target),
      e = d.closest("." + this._core.settings.itemClass),
      f = this._videos[e.attr("data-video")],
      g = f.width || "100%",
      h = f.height || this._core.$stage.height();
    this._playing ||
      (
        this._core.enter("playing"),
        this._core.trigger("play", null, "video"),
        (e = this._core.items(this._core.relative(e.index()))),
        this._core.reset(e.index()),
        "youtube" === f.type
          ? (c =
              '<iframe width="' +
              g +
              '" height="' +
              h +
              '" src="//www.youtube.com/embed/' +
              f.id +
              "?autoplay=1&rel=0&v=" +
              f.id +
              '" frameborder="0" allowfullscreen></iframe>')
          : "vimeo" === f.type
            ? (c =
                '<iframe src="//player.vimeo.com/video/' +
                f.id +
                '?autoplay=1" width="' +
                g +
                '" height="' +
                h +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : "vzaar" === f.type &&
              (c =
                '<iframe frameborder="0"height="' +
                h +
                '"width="' +
                g +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                f.id +
                '/player?autoplay=true"></iframe>'),
        a('<div class="owl-video-frame">' + c + "</div>").insertAfter(
          e.find(".owl-video")
        ),
        (this._playing = e.addClass("owl-video-playing"))
      );
  }), (e.prototype.isInFullScreen = function() {
    var b =
      c.fullscreenElement ||
      c.mozFullScreenElement ||
      c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame");
  }), (e.prototype.destroy = function() {
    var a, b;
    this._core.$element.off("click.owl.video");
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this))
      "function" != typeof this[b] && (this[b] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.Video = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  var e = function(b) {
    (this.core = b), (this.core.options = a.extend(
      {},
      e.Defaults,
      this.core.options
    )), (this.swapping = !0), (this.previous = d), (this.next = d), (this.handlers = {
      "change.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          "position" == a.property.name &&
          (
            (this.previous = this.core.current()),
            (this.next = a.property.value)
          );
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(
        function(a) {
          a.namespace && (this.swapping = "translated" == a.type);
        },
        this
      ),
      "translate.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this.swapping &&
          (this.core.options.animateOut || this.core.options.animateIn) &&
          this.swap();
      }, this)
    }), this.core.$element.on(this.handlers);
  };
  (e.Defaults = {
    animateOut: !1,
    animateIn: !1
  }), (e.prototype.swap = function() {
    if (
      1 === this.core.settings.items &&
      a.support.animation &&
      a.support.transition
    ) {
      this.core.speed(0);
      var b,
        c = a.proxy(this.clear, this),
        d = this.core.$stage.children().eq(this.previous),
        e = this.core.$stage.children().eq(this.next),
        f = this.core.settings.animateIn,
        g = this.core.settings.animateOut;
      this.core.current() !== this.previous &&
        (
          g &&
            (
              (b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)
            ),
          f &&
            e
              .one(a.support.animation.end, c)
              .addClass("animated owl-animated-in")
              .addClass(f)
        );
    }
  }), (e.prototype.clear = function(b) {
    a(b.target)
      .css({ left: "" })
      .removeClass("animated owl-animated-out owl-animated-in")
      .removeClass(this.core.settings.animateIn)
      .removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
  }), (e.prototype.destroy = function() {
    var a, b;
    for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
    for (b in Object.getOwnPropertyNames(this))
      "function" != typeof this[b] && (this[b] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  var e = function(b) {
    (this._core = b), (this._timeout = null), (this._paused = !1), (this._handlers = {
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace && "settings" === a.property.name
          ? this._core.settings.autoplay ? this.play() : this.stop()
          : a.namespace &&
            "position" === a.property.name &&
            this._core.settings.autoplay &&
            this._setAutoPlayInterval();
      }, this),
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoplay && this.play();
      }, this),
      "play.owl.autoplay": a.proxy(function(a, b, c) {
        a.namespace && this.play(b, c);
      }, this),
      "stop.owl.autoplay": a.proxy(function(a) {
        a.namespace && this.stop();
      }, this),
      "mouseover.owl.autoplay": a.proxy(function() {
        this._core.settings.autoplayHoverPause &&
          this._core.is("rotating") &&
          this.pause();
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function() {
        this._core.settings.autoplayHoverPause &&
          this._core.is("rotating") &&
          this.play();
      }, this),
      "touchstart.owl.core": a.proxy(function() {
        this._core.settings.autoplayHoverPause &&
          this._core.is("rotating") &&
          this.pause();
      }, this),
      "touchend.owl.core": a.proxy(function() {
        this._core.settings.autoplayHoverPause && this.play();
      }, this)
    }), this._core.$element.on(this._handlers), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    ));
  };
  (e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }), (e.prototype.play = function(a, b) {
    (this._paused = !1), this._core.is("rotating") ||
      (this._core.enter("rotating"), this._setAutoPlayInterval());
  }), (e.prototype._getNextTimeout = function(d, e) {
    return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(
      a.proxy(function() {
        this._paused ||
          this._core.is("busy") ||
          this._core.is("interacting") ||
          c.hidden ||
          this._core.next(e || this._core.settings.autoplaySpeed);
      }, this),
      d || this._core.settings.autoplayTimeout
    );
  }), (e.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout();
  }), (e.prototype.stop = function() {
    this._core.is("rotating") &&
      (b.clearTimeout(this._timeout), this._core.leave("rotating"));
  }), (e.prototype.pause = function() {
    this._core.is("rotating") && (this._paused = !0);
  }), (e.prototype.destroy = function() {
    var a, b;
    this.stop();
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this))
      "function" != typeof this[b] && (this[b] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  "use strict";
  var e = function(b) {
    (this._core = b), (this._initialized = !1), (this._pages = []), (this._controls = {}), (this._templates = []), (this.$element = this._core.$element), (this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }), (this._handlers = {
      "prepared.owl.carousel": a.proxy(function(b) {
        b.namespace &&
          this._core.settings.dotsData &&
          this._templates.push(
            '<div class="' +
              this._core.settings.dotClass +
              '">' +
              a(b.content)
                .find("[data-dot]")
                .addBack("[data-dot]")
                .attr("data-dot") +
              "</div>"
          );
      }, this),
      "added.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._core.settings.dotsData &&
          this._templates.splice(a.position, 0, this._templates.pop());
      }, this),
      "remove.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._core.settings.dotsData &&
          this._templates.splice(a.position, 1);
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace && "position" == a.property.name && this.draw();
      }, this),
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          !this._initialized &&
          (
            this._core.trigger("initialize", null, "navigation"),
            this.initialize(),
            this.update(),
            this.draw(),
            (this._initialized = !0),
            this._core.trigger("initialized", null, "navigation")
          );
      }, this),
      "refreshed.owl.carousel": a.proxy(function(a) {
        a.namespace &&
          this._initialized &&
          (
            this._core.trigger("refresh", null, "navigation"),
            this.update(),
            this.draw(),
            this._core.trigger("refreshed", null, "navigation")
          );
      }, this)
    }), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    )), this.$element.on(this._handlers);
  };
  (e.Defaults = {
    nav: !1,
    navText: ["prev", "next"],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }), (e.prototype.initialize = function() {
    var b,
      c = this._core.settings;
    (this._controls.$relative = (c.navContainer
      ? a(c.navContainer)
      : a("<div>")
          .addClass(c.navContainerClass)
          .appendTo(this.$element)).addClass(
      "disabled"
    )), (this._controls.$previous = a("<" + c.navElement + ">")
      .addClass(c.navClass[0])
      .html(c.navText[0])
      .prependTo(this._controls.$relative)
      .on(
        "click",
        a.proxy(function(a) {
          this.prev(c.navSpeed);
        }, this)
      )), (this._controls.$next = a("<" + c.navElement + ">")
      .addClass(c.navClass[1])
      .html(c.navText[1])
      .appendTo(this._controls.$relative)
      .on(
        "click",
        a.proxy(function(a) {
          this.next(c.navSpeed);
        }, this)
      )), c.dotsData ||
      (this._templates = [
        a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")
      ]), (this._controls.$absolute = (c.dotsContainer
      ? a(c.dotsContainer)
      : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass(
      "disabled"
    )), this._controls.$absolute.on(
      "click",
      "div",
      a.proxy(function(b) {
        var d = a(b.target).parent().is(this._controls.$absolute)
          ? a(b.target).index()
          : a(b.target).parent().index();
        b.preventDefault(), this.to(d, c.dotsSpeed);
      }, this)
    );
    for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
  }), (e.prototype.destroy = function() {
    var a, b, c, d;
    for (a in this._handlers) this.$element.off(a, this._handlers[a]);
    for (b in this._controls) this._controls[b].remove();
    for (d in this.overides) this._core[d] = this._overrides[d];
    for (c in Object.getOwnPropertyNames(this))
      "function" != typeof this[c] && (this[c] = null);
  }), (e.prototype.update = function() {
    var a,
      b,
      c,
      d = this._core.clones().length / 2,
      e = d + this._core.items().length,
      f = this._core.maximum(!0),
      g = this._core.settings,
      h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
    if (
      (
        "page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
        g.dots || "page" == g.slideBy
      )
    )
      for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
        if (b >= h || 0 === b) {
          if (
            (
              this._pages.push({
                start: Math.min(f, a - d),
                end: a - d + h - 1
              }),
              Math.min(f, a - d) === f
            )
          )
            break;
          (b = 0), ++c;
        }
        b += this._core.mergers(this._core.relative(a));
      }
  }), (e.prototype.draw = function() {
    var b,
      c = this._core.settings,
      d = this._core.items().length <= c.items,
      e = this._core.relative(this._core.current()),
      f = c.loop || c.rewind;
    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav &&
      (
        this._controls.$previous.toggleClass(
          "disabled",
          !f && e <= this._core.minimum(!0)
        ),
        this._controls.$next.toggleClass(
          "disabled",
          !f && e >= this._core.maximum(!0)
        )
      ), this._controls.$absolute.toggleClass(
      "disabled",
      !c.dots || d
    ), c.dots &&
      (
        (b = this._pages.length - this._controls.$absolute.children().length),
        c.dotsData && 0 !== b
          ? this._controls.$absolute.html(this._templates.join(""))
          : b > 0
            ? this._controls.$absolute.append(
                new Array(b + 1).join(this._templates[0])
              )
            : b < 0 && this._controls.$absolute.children().slice(b).remove(),
        this._controls.$absolute.find(".active").removeClass("active"),
        this._controls.$absolute
          .children()
          .eq(a.inArray(this.current(), this._pages))
          .addClass("active")
      );
  }), (e.prototype.onTrigger = function(b) {
    var c = this._core.settings;
    b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size:
        c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    };
  }), (e.prototype.current = function() {
    var b = this._core.relative(this._core.current());
    return a
      .grep(
        this._pages,
        a.proxy(function(a, c) {
          return a.start <= b && a.end >= b;
        }, this)
      )
      .pop();
  }), (e.prototype.getPosition = function(b) {
    var c,
      d,
      e = this._core.settings;
    return "page" == e.slideBy
      ? (
          (c = a.inArray(this.current(), this._pages)),
          (d = this._pages.length),
          b ? ++c : --c,
          (c = this._pages[(c % d + d) % d].start)
        )
      : (
          (c = this._core.relative(this._core.current())),
          (d = this._core.items().length),
          b ? (c += e.slideBy) : (c -= e.slideBy)
        ), c;
  }), (e.prototype.next = function(b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
  }), (e.prototype.prev = function(b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
  }), (e.prototype.to = function(b, c, d) {
    var e;
    !d && this._pages.length
      ? (
          (e = this._pages.length),
          a.proxy(this._overrides.to, this._core)(
            this._pages[(b % e + e) % e].start,
            c
          )
        )
      : a.proxy(this._overrides.to, this._core)(b, c);
  }), (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  "use strict";
  var e = function(c) {
    (this._core = c), (this._hashes = {}), (this.$element = this._core.$element), (this._handlers = {
      "initialized.owl.carousel": a.proxy(function(c) {
        c.namespace &&
          "URLHash" === this._core.settings.startPosition &&
          a(b).trigger("hashchange.owl.navigation");
      }, this),
      "prepared.owl.carousel": a.proxy(function(b) {
        if (b.namespace) {
          var c = a(b.content)
            .find("[data-hash]")
            .addBack("[data-hash]")
            .attr("data-hash");
          if (!c) return;
          this._hashes[c] = b.content;
        }
      }, this),
      "changed.owl.carousel": a.proxy(function(c) {
        if (c.namespace && "position" === c.property.name) {
          var d = this._core.items(this._core.relative(this._core.current())),
            e = a
              .map(this._hashes, function(a, b) {
                return a === d ? b : null;
              })
              .join();
          if (!e || b.location.hash.slice(1) === e) return;
          b.location.hash = e;
        }
      }, this)
    }), (this._core.options = a.extend(
      {},
      e.Defaults,
      this._core.options
    )), this.$element.on(this._handlers), a(b).on(
      "hashchange.owl.navigation",
      a.proxy(function(a) {
        var c = b.location.hash.substring(1),
          e = this._core.$stage.children(),
          f = this._hashes[c] && e.index(this._hashes[c]);
        f !== d &&
          f !== this._core.current() &&
          this._core.to(this._core.relative(f), !1, !0);
      }, this)
    );
  };
  (e.Defaults = { URLhashListener: !1 }), (e.prototype.destroy = function() {
    var c, d;
    a(b).off("hashchange.owl.navigation");
    for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
    for (d in Object.getOwnPropertyNames(this))
      "function" != typeof this[d] && (this[d] = null);
  }), (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
})(window.Zepto || window.jQuery, window, document), (function(a, b, c, d) {
  function e(b, c) {
    var e = !1,
      f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
      if (g[b] !== d) return (e = !c || b), !1;
    }), e;
  }
  function f(a) {
    return e(a, !0);
  }
  var g = a("<support>").get(0).style,
    h = "Webkit Moz O ms".split(" "),
    i = {
      transition: {
        end: {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
        }
      },
      animation: {
        end: {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
        }
      }
    },
    j = {
      csstransforms: function() {
        return !!e("transform");
      },
      csstransforms3d: function() {
        return !!e("perspective");
      },
      csstransitions: function() {
        return !!e("transition");
      },
      cssanimations: function() {
        return !!e("animation");
      }
    };
  j.csstransitions() &&
    (
      (a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])
    ), j.cssanimations() &&
    (
      (a.support.animation = new String(f("animation"))),
      (a.support.animation.end = i.animation.end[a.support.animation])
    ), j.csstransforms() &&
    (
      (a.support.transform = new String(f("transform"))),
      (a.support.transform3d = j.csstransforms3d())
    );
})(window.Zepto || window.jQuery, window, document);
