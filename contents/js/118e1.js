jQuery(document).ready(function() {
  jQuery("a.confirm").click(function() {
    return !!confirm(BP_Confirm.are_you_sure);
  });
});
function member_widget_click_handler() {
  jQuery(".widget div#members-list-options a").on("click", function() {
    var a = this;
    return jQuery(a).addClass(
      "loading"
    ), jQuery(".widget div#members-list-options a").removeClass("selected"), jQuery(this).addClass("selected"), jQuery.post(
      ajaxurl,
      {
        action: "widget_members",
        cookie: encodeURIComponent(document.cookie),
        _wpnonce: jQuery("input#_wpnonce-members").val(),
        "max-members": jQuery("input#members_widget_max").val(),
        filter: jQuery(this).attr("id")
      },
      function(b) {
        jQuery(a).removeClass("loading"), member_widget_response(b);
      }
    ), !1;
  });
}
function member_widget_response(a) {
  (a = a.substr(0, a.length - 1)), (a = a.split("[[SPLIT]]")), "-1" !== a[0]
    ? jQuery(".widget ul#members-list").fadeOut(200, function() {
        jQuery(".widget ul#members-list").html(
          a[1]
        ), jQuery(".widget ul#members-list").fadeIn(200);
      })
    : jQuery(".widget ul#members-list").fadeOut(200, function() {
        var b = "<p>" + a[1] + "</p>";
        jQuery(".widget ul#members-list").html(
          b
        ), jQuery(".widget ul#members-list").fadeIn(200);
      });
}
jQuery(document).ready(function() {
  member_widget_click_handler(), "undefined" != typeof wp &&
    wp.customize &&
    wp.customize.selectiveRefresh &&
    wp.customize.selectiveRefresh.bind("partial-content-rendered", function() {
      member_widget_click_handler();
    });
});
function bp_get_querystring(a) {
  var b = location.search.split(a + "=")[1];
  return b ? decodeURIComponent(b.split("&")[0]) : null;
}
!(function(a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a("object" == typeof exports ? require("jquery") : jQuery);
})(function(a) {
  function b(a) {
    return h.raw ? a : encodeURIComponent(a);
  }
  function c(a) {
    return h.raw ? a : decodeURIComponent(a);
  }
  function d(a) {
    return b(h.json ? JSON.stringify(a) : String(a));
  }
  function e(a) {
    0 === a.indexOf('"') &&
      (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
    try {
      return (a = decodeURIComponent(
        a.replace(g, " ")
      )), h.json ? JSON.parse(a) : a;
    } catch (a) {}
  }
  function f(b, c) {
    var d = h.raw ? b : e(b);
    return a.isFunction(c) ? c(d) : d;
  }
  var g = /\+/g,
    h = (a.cookie = function(e, g, i) {
      if (void 0 !== g && !a.isFunction(g)) {
        if (((i = a.extend({}, h.defaults, i)), "number" == typeof i.expires)) {
          var j = i.expires,
            k = (i.expires = new Date());
          k.setTime(+k + 864e5 * j);
        }
        return (document.cookie = [
          b(e),
          "=",
          d(g),
          i.expires ? "; expires=" + i.expires.toUTCString() : "",
          i.path ? "; path=" + i.path : "",
          i.domain ? "; domain=" + i.domain : "",
          i.secure ? "; secure" : ""
        ].join(""));
      }
      for (
        var l = e ? void 0 : {},
          m = document.cookie ? document.cookie.split("; ") : [],
          n = 0,
          o = m.length;
        n < o;
        n++
      ) {
        var p = m[n].split("="),
          q = c(p.shift()),
          r = p.join("=");
        if (e && e === q) {
          l = f(r, g);
          break;
        }
        e || void 0 === (r = f(r)) || (l[q] = r);
      }
      return l;
    });
  (h.defaults = {}), (a.removeCookie = function(b, c) {
    return (
      void 0 !== a.cookie(b) &&
      (a.cookie(b, "", a.extend({}, c, { expires: -1 })), !a.cookie(b))
    );
  });
});
!(function(a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a("object" == typeof exports ? require("jquery") : jQuery);
})(function(a) {
  function b(b) {
    return a.isFunction(b) || "object" == typeof b ? b : { top: b, left: b };
  }
  var c = (a.scrollTo = function(b, c, d) {
    return a(window).scrollTo(b, c, d);
  });
  return (c.defaults = {
    axis: "xy",
    duration: parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1,
    limit: !0
  }), (c.window = function() {
    return a(window)._scrollable();
  }), (a.fn._scrollable = function() {
    return this.map(function() {
      var b = this,
        c =
          !b.nodeName ||
          a.inArray(b.nodeName.toLowerCase(), [
            "iframe",
            "#document",
            "html",
            "body"
          ]) !== -1;
      if (!c) return b;
      var d = (b.contentWindow || b).document || b.ownerDocument || b;
      return /webkit/i.test(navigator.userAgent) ||
      "BackCompat" === d.compatMode
        ? d.body
        : d.documentElement;
    });
  }), (a.fn.scrollTo = function(d, e, f) {
    return "object" == typeof e && ((f = e), (e = 0)), "function" == typeof f &&
      (f = { onAfter: f }), "max" === d && (d = 9e9), (f = a.extend(
      {},
      c.defaults,
      f
    )), (e = e || f.duration), (f.queue =
      f.queue && f.axis.length > 1), f.queue && (e /= 2), (f.offset = b(
      f.offset
    )), (f.over = b(f.over)), this._scrollable()
      .each(function() {
        function g(a) {
          j.animate(
            l,
            e,
            f.easing,
            a &&
              function() {
                a.call(this, k, f);
              }
          );
        }
        if (null !== d) {
          var h,
            i = this,
            j = a(i),
            k = d,
            l = {},
            m = j.is("html,body");
          switch (typeof k) {
            case "number":
            case "string":
              if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                k = b(k);
                break;
              }
              if (((k = m ? a(k) : a(k, this)), !k.length)) return;
            case "object":
              (k.is || k.style) && (h = (k = a(k)).offset());
          }
          var n = (a.isFunction(f.offset) && f.offset(i, k)) || f.offset;
          a.each(f.axis.split(""), function(a, b) {
            var d = "x" === b ? "Left" : "Top",
              e = d.toLowerCase(),
              o = "scroll" + d,
              p = i[o],
              q = c.max(i, b);
            if (h)
              (l[o] = h[e] + (m ? 0 : p - j.offset()[e])), f.margin &&
                (
                  (l[o] -= parseInt(k.css("margin" + d)) || 0),
                  (l[o] -= parseInt(k.css("border" + d + "Width")) || 0)
                ), (l[o] += n[e] || 0), f.over[e] &&
                (l[o] += k["x" === b ? "width" : "height"]() * f.over[e]);
            else {
              var r = k[e];
              l[o] =
                r.slice && "%" === r.slice(-1) ? parseFloat(r) / 100 * q : r;
            }
            f.limit &&
              /^\d+$/.test(l[o]) &&
              (l[o] =
                l[o] <= 0
                  ? 0
                  : Math.min(
                      l[o],
                      q
                    )), !a && f.queue && (p !== l[o] && g(f.onAfterFirst), delete l[o]);
          }), g(f.onAfter);
        }
      })
      .end();
  }), (c.max = function(b, c) {
    var d = "x" === c ? "Width" : "Height",
      e = "scroll" + d;
    if (!a(b).is("html,body")) return b[e] - a(b)[d.toLowerCase()]();
    var f = "client" + d,
      g = b.ownerDocument.documentElement,
      h = b.ownerDocument.body;
    return Math.max(g[e], h[e]) - Math.min(g[f], h[f]);
  }), c;
});
