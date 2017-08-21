function bp_init_activity() {
  jq.cookie("bp-activity-oldestpage", 1, {
    path: "/",
    secure: "https:" === window.location.protocol
  }), void 0 !== jq.cookie("bp-activity-filter") &&
    jq("#activity-filter-select").length &&
    jq(
      '#activity-filter-select select option[value="' +
        jq.cookie("bp-activity-filter") +
        '"]'
    ).prop("selected", !0), void 0 !== jq.cookie("bp-activity-scope") &&
    jq(".activity-type-tabs").length &&
    (
      jq(".activity-type-tabs li").each(function() {
        jq(this).removeClass("selected");
      }),
      jq(
        "#activity-" +
          jq.cookie("bp-activity-scope") +
          ", .item-list-tabs li.current"
      ).addClass("selected")
    );
}
function bp_init_objects(a) {
  jq(a).each(function(b) {
    void 0 !== jq.cookie("bp-" + a[b] + "-filter") &&
      jq("#" + a[b] + "-order-select select").length &&
      jq(
        "#" +
          a[b] +
          '-order-select select option[value="' +
          jq.cookie("bp-" + a[b] + "-filter") +
          '"]'
      ).prop("selected", !0), void 0 !== jq.cookie("bp-" + a[b] + "-scope") &&
      jq("div." + a[b]).length &&
      (
        jq(".item-list-tabs li").each(function() {
          jq(this).removeClass("selected");
        }),
        jq(
          "#" +
            a[b] +
            "-" +
            jq.cookie("bp-" + a[b] + "-scope") +
            ", #object-nav li.current"
        ).addClass("selected")
      );
  });
}
function bp_filter_request(a, b, c, d, e, f, g, h, i) {
  return (
    "activity" !== a &&
    (
      null === c && (c = "all"),
      jq.cookie("bp-" + a + "-scope", c, {
        path: "/",
        secure: "https:" === window.location.protocol
      }),
      jq.cookie("bp-" + a + "-filter", b, {
        path: "/",
        secure: "https:" === window.location.protocol
      }),
      jq.cookie("bp-" + a + "-extras", g, {
        path: "/",
        secure: "https:" === window.location.protocol
      }),
      jq(".item-list-tabs li").each(function() {
        jq(this).removeClass("selected");
      }),
      jq("#" + a + "-" + c + ", #object-nav li.current").addClass("selected"),
      jq(".item-list-tabs li.selected").addClass("loading"),
      jq('.item-list-tabs select option[value="' + b + '"]').prop(
        "selected",
        !0
      ),
      ("friends" !== a && "group_members" !== a) || (a = "members"),
      bp_ajax_request && bp_ajax_request.abort(),
      void (bp_ajax_request = jq.post(
        ajaxurl,
        {
          action: a + "_filter",
          cookie: bp_get_cookies(),
          object: a,
          filter: b,
          search_terms: e,
          scope: c,
          page: f,
          extras: g,
          template: i
        },
        function(a) {
          if ("pag-bottom" === h && jq("#subnav").length) {
            var b = jq("#subnav").parent();
            jq("html,body").animate(
              { scrollTop: b.offset().top },
              "slow",
              function() {
                jq(d).fadeOut(100, function() {
                  jq(this).html(a), jq(this).fadeIn(100);
                });
              }
            );
          } else
            jq(d).fadeOut(100, function() {
              jq(this).html(a), jq(this).fadeIn(100);
            });
          jq(".item-list-tabs li.selected").removeClass("loading");
        }
      ))
    )
  );
}
function bp_activity_request(a, b) {
  null !== a &&
    jq.cookie("bp-activity-scope", a, {
      path: "/",
      secure: "https:" === window.location.protocol
    }), null !== b &&
    jq.cookie("bp-activity-filter", b, {
      path: "/",
      secure: "https:" === window.location.protocol
    }), jq.cookie("bp-activity-oldestpage", 1, {
    path: "/",
    secure: "https:" === window.location.protocol
  }), jq(".item-list-tabs li").each(function() {
    jq(this).removeClass("selected loading");
  }), jq("#activity-" + a + ", .item-list-tabs li.current").addClass(
    "selected"
  ), jq(
    "#object-nav.item-list-tabs li.selected, div.activity-type-tabs li.selected"
  ).addClass("loading"), jq(
    '#activity-filter-select select option[value="' + b + '"]'
  ).prop("selected", !0), jq(
    ".widget_bp_activity_widget h2 span.ajax-loader"
  ).show(), bp_ajax_request &&
    bp_ajax_request.abort(), (bp_ajax_request = jq.post(
    ajaxurl,
    {
      action: "activity_widget_filter",
      cookie: bp_get_cookies(),
      _wpnonce_activity_filter: jq("#_wpnonce_activity_filter").val(),
      scope: a,
      filter: b
    },
    function(a) {
      jq(".widget_bp_activity_widget h2 span.ajax-loader").hide(), jq(
        "div.activity"
      ).fadeOut(100, function() {
        jq(this).html(
          a.contents
        ), jq(this).fadeIn(100), bp_legacy_theme_hide_comments();
      }), void 0 !== a.feed_url &&
        jq(".directory #subnav li.feed a, .home-page #subnav li.feed a").attr(
          "href",
          a.feed_url
        ), jq(".item-list-tabs li.selected").removeClass("loading");
    },
    "json"
  ));
}
function bp_legacy_theme_hide_comments() {
  var a,
    b,
    c,
    d = jq("div.activity-comments");
  return (
    !!d.length &&
    void d.each(function() {
      jq(this).children("ul").children("li").length < 5 ||
        (
          (comments_div = jq(this)),
          (a = comments_div.parents("#activity-stream > li")),
          (b = jq(this).children("ul").children("li")),
          (c = " "),
          jq("#" + a.attr("id") + " a.acomment-reply span").length &&
            (c = jq("#" + a.attr("id") + " a.acomment-reply span").html()),
          b.each(function(d) {
            d < b.length - 5 &&
              (
                jq(this).addClass("hidden"),
                jq(this).toggle(),
                d ||
                  jq(this).before(
                    '<li class="show-all"><a href="#' +
                      a.attr("id") +
                      '/show-all/" title="' +
                      BP_DTheme.show_all_comments +
                      '">' +
                      BP_DTheme.show_x_comments.replace("%d", c) +
                      "</a></li>"
                  )
              );
          })
        );
    })
  );
}
function checkAll() {
  var a,
    b = document.getElementsByTagName("input");
  for (a = 0; a < b.length; a++)
    "checkbox" === b[a].type &&
      ("" === $("check_all").checked
        ? (b[a].checked = "")
        : (b[a].checked = "checked"));
}
function clear(a) {
  if ((a = document.getElementById(a))) {
    var b = a.getElementsByTagName("INPUT"),
      c = a.getElementsByTagName("OPTION"),
      d = 0;
    if (b) for (d = 0; d < b.length; d++) b[d].checked = "";
    if (c) for (d = 0; d < c.length; d++) c[d].selected = !1;
  }
}
function bp_get_cookies() {
  var a,
    b,
    c,
    d,
    e,
    f = document.cookie.split(";"),
    g = {},
    h = "bp-";
  for (a = 0; a < f.length; a++)
    (b = f[a]), (c = b.indexOf("=")), (d = jq.trim(
      unescape(b.slice(0, c))
    )), (e = unescape(b.slice(c + 1))), 0 === d.indexOf(h) && (g[d] = e);
  return encodeURIComponent(jq.param(g));
}
function bp_get_query_var(a, b) {
  var c = {};
  return (b =
    "undefined" == typeof b
      ? location.search.substr(1).split("&")
      : b.split("?")[1].split("&")), b.forEach(function(a) {
    c[a.split("=")[0]] = a.split("=")[1] && decodeURIComponent(a.split("=")[1]);
  }), !(!c.hasOwnProperty(a) || null == c[a]) && c[a];
}
var jq = jQuery,
  bp_ajax_request = null,
  newest_activities = "",
  activity_last_recorded = 0;
jq(document).ready(function() {
  "-1" === window.location.search.indexOf("new") && jq("div.forums").length
    ? jq("#new-topic-post").hide()
    : jq("#new-topic-post").show(), bp_init_activity();
  var a = ["members", "groups", "blogs", "forums", "group_members"],
    b = jq("#whats-new");
  if ((bp_init_objects(a), b.length && bp_get_querystring("r"))) {
    var c = b.val();
    jq("#whats-new-options").slideDown(), b.animate({
      height: "3.8em"
    }), jq.scrollTo(b, 500, { offset: -125, easing: "swing" }), b
      .val("")
      .focus()
      .val(c);
  } else jq("#whats-new-options").hide();
  if (
    (
      b.focus(function() {
        jq(
          "#whats-new-options"
        ).slideDown(), jq(this).animate({ height: "3.8em" }), jq("#aw-whats-new-submit").prop("disabled", !1), jq(this).parent().addClass("active"), jq("#whats-new-content").addClass("active");
        var a = jq("form#whats-new-form"),
          b = jq("#activity-all");
        a.hasClass("submitted") &&
          a.removeClass(
            "submitted"
          ), b.length && (b.hasClass("selected") ? "-1" !== jq("#activity-filter-select select").val() && (jq("#activity-filter-select select").val("-1"), jq("#activity-filter-select select").trigger("change")) : (jq("#activity-filter-select select").val("-1"), b.children("a").trigger("click")));
      }),
      jq("#whats-new-form").on("focusout", function(a) {
        var c = jq(this);
        setTimeout(function() {
          if (!c.find(":hover").length) {
            if ("" !== b.val()) return;
            b.animate({ height: "2.2em" }), jq(
              "#whats-new-options"
            ).slideUp(), jq("#aw-whats-new-submit").prop("disabled", !0), jq(
              "#whats-new-content"
            ).removeClass("active"), b.parent().removeClass("active");
          }
        }, 0);
      }),
      jq("#aw-whats-new-submit").on("click", function() {
        var a,
          b = 0,
          c = jq(this),
          d = c.closest("form#whats-new-form"),
          e = {};
        return jq.each(d.serializeArray(), function(a, b) {
          "_" !== b.name.substr(0, 1) &&
            "whats-new" !== b.name.substr(0, 9) &&
            (e[b.name]
              ? jq.isArray(e[b.name])
                ? e[b.name].push(b.value)
                : (e[b.name] = new Array(e[b.name], b.value))
              : (e[b.name] = b.value));
        }), d.find("*").each(function() {
          (jq.nodeName(this, "textarea") || jq.nodeName(this, "input")) &&
            jq(this).prop("disabled", !0);
        }), jq(
          "div.error"
        ).remove(), c.addClass("loading"), c.prop("disabled", !0), d.addClass("submitted"), (object = ""), (item_id = jq("#whats-new-post-in").val()), (content = jq("#whats-new").val()), (firstrow = jq("#buddypress ul.activity-list li").first()), (activity_row = firstrow), (timestamp = null), firstrow.length && (activity_row.hasClass("load-newest") && (activity_row = firstrow.next()), (timestamp = activity_row.prop("class").match(/date-recorded-([0-9]+)/))), timestamp && (b = timestamp[1]), item_id > 0 && (object = jq("#whats-new-post-object").val()), (a = jq.extend({ action: "post_update", cookie: bp_get_cookies(), _wpnonce_post_update: jq("#_wpnonce_post_update").val(), content: content, object: object, item_id: item_id, since: b, _bp_as_nonce: jq("#_bp_as_nonce").val() || "" }, e)), jq.post(
          ajaxurl,
          a,
          function(a) {
            if (
              (
                d.find("*").each(function() {
                  (jq.nodeName(this, "textarea") ||
                    jq.nodeName(this, "input")) &&
                    jq(this).prop("disabled", !1);
                }),
                a[0] + a[1] === "-1"
              )
            )
              d.prepend(a.substr(2, a.length)), jq(
                "#" + d.attr("id") + " div.error"
              )
                .hide()
                .fadeIn(200);
            else {
              if (
                (
                  0 === jq("ul.activity-list").length &&
                    (
                      jq("div.error").slideUp(100).remove(),
                      jq("#message").slideUp(100).remove(),
                      jq("div.activity").append(
                        '<ul id="activity-stream" class="activity-list item-list">'
                      )
                    ),
                  firstrow.hasClass("load-newest") && firstrow.remove(),
                  jq("#activity-stream").prepend(a),
                  b ||
                    jq("#activity-stream li:first").addClass(
                      "new-update just-posted"
                    ),
                  0 !== jq("#latest-update").length
                )
              ) {
                var c = jq(
                    "#activity-stream li.new-update .activity-content .activity-inner p"
                  ).html(),
                  e = jq(
                    "#activity-stream li.new-update .activity-content .activity-header p a.view"
                  ).attr("href"),
                  f = jq(
                    "#activity-stream li.new-update .activity-content .activity-inner p"
                  ).text(),
                  g = "";
                "" !== f && (g = c + " "), (g +=
                  '<a href="' +
                  e +
                  '" rel="nofollow">' +
                  BP_DTheme.view +
                  "</a>"), jq("#latest-update").slideUp(300, function() {
                  jq("#latest-update").html(
                    g
                  ), jq("#latest-update").slideDown(300);
                });
              }
              jq("li.new-update").hide().slideDown(300), jq(
                "li.new-update"
              ).removeClass("new-update"), jq("#whats-new").val(""), d
                .get(0)
                .reset(), (newest_activities =
                ""), (activity_last_recorded = 0);
            }
            jq("#whats-new-options").slideUp(), jq(
              "#whats-new-form textarea"
            ).animate({ height: "2.2em" }), jq("#aw-whats-new-submit")
              .prop("disabled", !0)
              .removeClass("loading"), jq("#whats-new-content").removeClass(
              "active"
            );
          }
        ), !1;
      }),
      jq("div.activity-type-tabs").on("click", function(a) {
        var b,
          c,
          d = jq(a.target).parent();
        if ("STRONG" === a.target.nodeName || "SPAN" === a.target.nodeName)
          d = d.parent();
        else if ("A" !== a.target.nodeName) return !1;
        return jq.cookie("bp-activity-oldestpage", 1, {
          path: "/",
          secure: "https:" === window.location.protocol
        }), (b = d.attr("id").substr(9, d.attr("id").length)), (c = jq("#activity-filter-select select").val()), "mentions" === b && jq("#" + d.attr("id") + " a strong").remove(), bp_activity_request(b, c), !1;
      }),
      jq("#activity-filter-select select").change(function() {
        var a,
          b = jq("div.activity-type-tabs li.selected"),
          c = jq(this).val();
        return (a = b.length
          ? b.attr("id").substr(9, b.attr("id").length)
          : null), bp_activity_request(a, c), !1;
      }),
      jq("div.activity").on("click", function(a) {
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l = jq(a.target);
        return l.hasClass("fav") || l.hasClass("unfav")
          ? !l.hasClass("loading") &&
            (
              (b = l.hasClass("fav") ? "fav" : "unfav"),
              (c = l.closest(".activity-item")),
              (d = c.attr("id").substr(9, c.attr("id").length)),
              (h = bp_get_query_var("_wpnonce", l.attr("href"))),
              l.addClass("loading"),
              jq.post(
                ajaxurl,
                {
                  action: "activity_mark_" + b,
                  cookie: bp_get_cookies(),
                  id: d,
                  nonce: h
                },
                function(a) {
                  l.removeClass("loading"), l.fadeOut(200, function() {
                    jq(this).html(
                      a
                    ), jq(this).attr("title", "fav" === b ? BP_DTheme.remove_fav : BP_DTheme.mark_as_fav), jq(this).fadeIn(200);
                  }), "fav" === b
                    ? (
                        jq(".item-list-tabs #activity-favs-personal-li")
                          .length ||
                          (
                            jq(".item-list-tabs #activity-favorites").length ||
                              jq(
                                ".item-list-tabs ul #activity-mentions"
                              ).before(
                                '<li id="activity-favorites"><a href="#">' +
                                  BP_DTheme.my_favs +
                                  " <span>0</span></a></li>"
                              ),
                            jq(
                              ".item-list-tabs ul #activity-favorites span"
                            ).html(
                              Number(
                                jq(
                                  ".item-list-tabs ul #activity-favorites span"
                                ).html()
                              ) + 1
                            )
                          ),
                        l.removeClass("fav"),
                        l.addClass("unfav")
                      )
                    : (
                        l.removeClass("unfav"),
                        l.addClass("fav"),
                        jq(".item-list-tabs ul #activity-favorites span").html(
                          Number(
                            jq(
                              ".item-list-tabs ul #activity-favorites span"
                            ).html()
                          ) - 1
                        ),
                        Number(
                          jq(
                            ".item-list-tabs ul #activity-favorites span"
                          ).html()
                        ) ||
                          (
                            jq(
                              ".item-list-tabs ul #activity-favorites"
                            ).hasClass("selected") &&
                              bp_activity_request(null, null),
                            jq(
                              ".item-list-tabs ul #activity-favorites"
                            ).remove()
                          )
                      ), "activity-favorites" ===
                    jq(".item-list-tabs li.selected").attr("id") &&
                    l.closest(".activity-item").slideUp(100);
                }
              ),
              !1
            )
          : l.hasClass("delete-activity")
            ? (
                (e = l.parents("div.activity ul li")),
                (f = e.attr("id").substr(9, e.attr("id").length)),
                (g = l.attr("href")),
                (h = g.split("_wpnonce=")),
                (i = e.prop("class").match(/date-recorded-([0-9]+)/)),
                (h = h[1]),
                l.addClass("loading"),
                jq.post(
                  ajaxurl,
                  {
                    action: "delete_activity",
                    cookie: bp_get_cookies(),
                    id: f,
                    _wpnonce: h
                  },
                  function(a) {
                    a[0] + a[1] === "-1"
                      ? (
                          e.prepend(a.substr(2, a.length)),
                          e.children("#message").hide().fadeIn(300)
                        )
                      : (
                          e.slideUp(300),
                          i &&
                            activity_last_recorded === i[1] &&
                            (
                              (newest_activities = ""),
                              (activity_last_recorded = 0)
                            )
                        );
                  }
                ),
                !1
              )
            : l.hasClass("spam-activity")
              ? (
                  (e = l.parents("div.activity ul li")),
                  (i = e.prop("class").match(/date-recorded-([0-9]+)/)),
                  l.addClass("loading"),
                  jq.post(
                    ajaxurl,
                    {
                      action: "bp_spam_activity",
                      cookie: encodeURIComponent(document.cookie),
                      id: e.attr("id").substr(9, e.attr("id").length),
                      _wpnonce: l.attr("href").split("_wpnonce=")[1]
                    },
                    function(a) {
                      a[0] + a[1] === "-1"
                        ? (
                            e.prepend(a.substr(2, a.length)),
                            e.children("#message").hide().fadeIn(300)
                          )
                        : (
                            e.slideUp(300),
                            i &&
                              activity_last_recorded === i[1] &&
                              (
                                (newest_activities = ""),
                                (activity_last_recorded = 0)
                              )
                          );
                    }
                  ),
                  !1
                )
              : l.parent().hasClass("load-more")
                ? (
                    bp_ajax_request && bp_ajax_request.abort(),
                    jq("#buddypress li.load-more").addClass("loading"),
                    null === jq.cookie("bp-activity-oldestpage") &&
                      jq.cookie("bp-activity-oldestpage", 1, {
                        path: "/",
                        secure: "https:" === window.location.protocol
                      }),
                    (j = 1 * jq.cookie("bp-activity-oldestpage") + 1),
                    (k = []),
                    jq(".activity-list li.just-posted").each(function() {
                      k.push(jq(this).attr("id").replace("activity-", ""));
                    }),
                    (load_more_args = {
                      action: "activity_get_older_updates",
                      cookie: bp_get_cookies(),
                      page: j,
                      exclude_just_posted: k.join(",")
                    }),
                    (load_more_search = bp_get_querystring("s")),
                    load_more_search &&
                      (load_more_args.search_terms = load_more_search),
                    (bp_ajax_request = jq.post(
                      ajaxurl,
                      load_more_args,
                      function(a) {
                        jq("#buddypress li.load-more").removeClass(
                          "loading"
                        ), jq.cookie("bp-activity-oldestpage", j, {
                          path: "/",
                          secure: "https:" === window.location.protocol
                        }), jq("#buddypress ul.activity-list").append(
                          a.contents
                        ), l.parent().hide();
                      },
                      "json"
                    )),
                    !1
                  )
                : void (
                    l.parent().hasClass("load-newest") &&
                    (
                      a.preventDefault(),
                      l.parent().hide(),
                      (activity_html = jq.parseHTML(newest_activities)),
                      jq.each(activity_html, function(a, b) {
                        "LI" === b.nodeName &&
                          jq(b).hasClass("just-posted") &&
                          jq("#" + jq(b).attr("id")).length &&
                          jq("#" + jq(b).attr("id")).remove();
                      }),
                      jq("#buddypress ul.activity-list").prepend(
                        newest_activities
                      ),
                      (newest_activities = "")
                    )
                  );
      }),
      jq("div.activity").on("click", ".activity-read-more a", function(a) {
        var b,
          c,
          d = jq(a.target),
          e = d.parent().attr("id").split("-"),
          f = e[3],
          g = e[0];
        return (b =
          "acomment" === g
            ? "acomment-content"
            : "activity-inner"), (c = jq("#" + g + "-" + f + " ." + b + ":first")), jq(d).addClass("loading"), jq.post(
          ajaxurl,
          { action: "get_single_activity_content", activity_id: f },
          function(a) {
            jq(c).slideUp(300).html(a).slideDown(300);
          }
        ), !1;
      }),
      jq("form.ac-form").hide(),
      jq(".activity-comments").length && bp_legacy_theme_hide_comments(),
      jq("div.activity").on("click", function(a) {
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r = jq(a.target);
        return r.hasClass("acomment-reply") ||
        r.parent().hasClass("acomment-reply")
          ? (
              r.parent().hasClass("acomment-reply") && (r = r.parent()),
              (b = r.attr("id")),
              (c = b.split("-")),
              (d = c[2]),
              (e = r.attr("href").substr(10, r.attr("href").length)),
              (f = jq("#ac-form-" + d)),
              f.css("display", "none"),
              f.removeClass("root"),
              jq(".ac-form").hide(),
              f.children("div").each(function() {
                jq(this).hasClass("error") && jq(this).hide();
              }),
              "comment" !== c[1]
                ? jq("#acomment-" + e).append(f)
                : jq("#activity-" + d + " .activity-comments").append(f),
              f.parent().hasClass("activity-comments") && f.addClass("root"),
              f.slideDown(200),
              jq.scrollTo(f, 500, { offset: -100, easing: "swing" }),
              jq("#ac-form-" + c[2] + " textarea").focus(),
              !1
            )
          : "ac_form_submit" === r.attr("name")
            ? (
                (f = r.parents("form")),
                (g = f.parent()),
                (h = f.attr("id").split("-")),
                g.hasClass("activity-comments")
                  ? (j = h[2])
                  : ((i = g.attr("id").split("-")), (j = i[1])),
                (content = jq("#" + f.attr("id") + " textarea")),
                jq("#" + f.attr("id") + " div.error").hide(),
                r.addClass("loading").prop("disabled", !0),
                content.addClass("loading").prop("disabled", !0),
                (k = {
                  action: "new_activity_comment",
                  cookie: bp_get_cookies(),
                  _wpnonce_new_activity_comment: jq(
                    "#_wpnonce_new_activity_comment"
                  ).val(),
                  comment_id: j,
                  form_id: h[2],
                  content: content.val()
                }),
                (l = jq("#_bp_as_nonce_" + j).val()),
                l && (k["_bp_as_nonce_" + j] = l),
                jq.post(ajaxurl, k, function(a) {
                  if (
                    (
                      r.removeClass("loading"),
                      content.removeClass("loading"),
                      a[0] + a[1] === "-1"
                    )
                  )
                    f.append(jq(a.substr(2, a.length)).hide().fadeIn(200));
                  else {
                    var b = f.parent();
                    f.fadeOut(200, function() {
                      0 === b.children("ul").length &&
                        (b.hasClass("activity-comments")
                          ? b.prepend("<ul></ul>")
                          : b.append("<ul></ul>"));
                      var c = jq.trim(a);
                      b
                        .children("ul")
                        .append(
                          jq(c).hide().fadeIn(200)
                        ), f.children("textarea").val(""), b.parent().addClass("has-comments");
                    }), jq("#" + f.attr("id") + " textarea").val(""), jq(
                      "#activity-" + h[2] + " a.acomment-reply span"
                    ).html(
                      Number(
                        jq(
                          "#activity-" + h[2] + " a.acomment-reply span"
                        ).html()
                      ) + 1
                    ), (m = b.find(".show-all").find("a")), m &&
                      (
                        (n = jq(
                          "li#activity-" + h[2] + " a.acomment-reply span"
                        ).html()),
                        m.html(BP_DTheme.show_x_comments.replace("%d", n))
                      );
                  }
                  jq(r).prop("disabled", !1), jq(content).prop("disabled", !1);
                }),
                !1
              )
            : r.hasClass("acomment-delete")
              ? (
                  (o = r.attr("href")),
                  (p = r.parent().parent()),
                  (f = p.parents("div.activity-comments").children("form")),
                  (q = o.split("_wpnonce=")),
                  (q = q[1]),
                  (j = o.split("cid=")),
                  (j = j[1].split("&")),
                  (j = j[0]),
                  r.addClass("loading"),
                  jq(".activity-comments ul .error").remove(),
                  p.parents(".activity-comments").append(f),
                  jq.post(
                    ajaxurl,
                    {
                      action: "delete_activity_comment",
                      cookie: bp_get_cookies(),
                      _wpnonce: q,
                      id: j
                    },
                    function(a) {
                      if (a[0] + a[1] === "-1")
                        p.prepend(jq(a.substr(2, a.length)).hide().fadeIn(200));
                      else {
                        var b,
                          c,
                          d,
                          e = jq("#" + p.attr("id") + " ul").children("li"),
                          f = 0;
                        jq(e).each(function() {
                          jq(this).is(":hidden") || f++;
                        }), p.fadeOut(200, function() {
                          p.remove();
                        }), (b = jq(
                          "#" +
                            p.parents("#activity-stream > li").attr("id") +
                            " a.acomment-reply span"
                        )), (c = b.html() - (1 + f)), b.html(
                          c
                        ), (d = p.siblings(".show-all").find("a")), d &&
                          d.html(
                            BP_DTheme.show_x_comments.replace("%d", c)
                          ), 0 === c &&
                          jq(p.parents("#activity-stream > li")).removeClass(
                            "has-comments"
                          );
                      }
                    }
                  ),
                  !1
                )
              : r.hasClass("spam-activity-comment")
                ? (
                    (o = r.attr("href")),
                    (p = r.parent().parent()),
                    r.addClass("loading"),
                    jq(".activity-comments ul div.error").remove(),
                    p
                      .parents(".activity-comments")
                      .append(p.parents(".activity-comments").children("form")),
                    jq.post(
                      ajaxurl,
                      {
                        action: "bp_spam_activity_comment",
                        cookie: encodeURIComponent(document.cookie),
                        _wpnonce: o.split("_wpnonce=")[1],
                        id: o.split("cid=")[1].split("&")[0]
                      },
                      function(a) {
                        if (a[0] + a[1] === "-1")
                          p.prepend(
                            jq(a.substr(2, a.length)).hide().fadeIn(200)
                          );
                        else {
                          var b,
                            c = jq("#" + p.attr("id") + " ul").children("li"),
                            d = 0;
                          jq(c).each(function() {
                            jq(this).is(":hidden") || d++;
                          }), p.fadeOut(200), (b = p.parents(
                            "#activity-stream > li"
                          )), jq(
                            "#" + b.attr("id") + " a.acomment-reply span"
                          ).html(
                            jq(
                              "#" + b.attr("id") + " a.acomment-reply span"
                            ).html() -
                              (1 + d)
                          );
                        }
                      }
                    ),
                    !1
                  )
                : r.parent().hasClass("show-all")
                  ? (
                      r.parent().addClass("loading"),
                      setTimeout(function() {
                        r
                          .parent()
                          .parent()
                          .children("li")
                          .fadeIn(200, function() {
                            r.parent().remove();
                          });
                      }, 600),
                      !1
                    )
                  : r.hasClass("ac-reply-cancel")
                    ? (jq(r).closest(".ac-form").slideUp(200), !1)
                    : void 0;
      }),
      jq(document).keydown(function(a) {
        if (
          (
            (a = a || window.event),
            a.target
              ? (element = a.target)
              : a.srcElement && (element = a.srcElement),
            3 === element.nodeType && (element = element.parentNode),
            a.ctrlKey !== !0 && a.altKey !== !0 && a.metaKey !== !0
          )
        ) {
          var b = a.keyCode ? a.keyCode : a.which;
          27 === b &&
            "TEXTAREA" === element.tagName &&
            jq(element).hasClass("ac-input") &&
            jq(element).parent().parent().parent().slideUp(200);
        }
      }),
      jq(".dir-search, .groups-members-search").on("click", function(a) {
        if (!jq(this).hasClass("no-ajax")) {
          var b,
            c,
            d,
            e,
            f = jq(a.target);
          return "submit" === f.attr("type")
            ? (
                (b = jq(".item-list-tabs li.selected").attr("id").split("-")),
                (c = b[0]),
                (d = null),
                (e = f.parent().find("#" + c + "_search").val()),
                "groups-members-search" === a.currentTarget.className &&
                  ((c = "group_members"), (d = "groups/single/members")),
                bp_filter_request(
                  c,
                  jq.cookie("bp-" + c + "-filter"),
                  jq.cookie("bp-" + c + "-scope"),
                  "div." + c,
                  e,
                  1,
                  jq.cookie("bp-" + c + "-extras"),
                  null,
                  d
                ),
                !1
              )
            : void 0;
        }
      }),
      jq("div.item-list-tabs").on("click", function(a) {
        if (
          (
            jq("body").hasClass("type") &&
              jq("body").hasClass("directory") &&
              jq(this).addClass("no-ajax"),
            !jq(this).hasClass("no-ajax") && !jq(a.target).hasClass("no-ajax")
          )
        ) {
          var b,
            c,
            d,
            e,
            f,
            g = "SPAN" === a.target.nodeName ? a.target.parentNode : a.target,
            h = jq(g).parent();
          return "LI" !== h[0].nodeName || h.hasClass("last")
            ? void 0
            : (
                (b = h.attr("id").split("-")),
                (c = b[0]),
                "activity" !== c &&
                  (
                    (d = b[1]),
                    (e = jq("#" + c + "-order-select select").val()),
                    (f = jq("#" + c + "_search").val()),
                    bp_filter_request(
                      c,
                      e,
                      d,
                      "div." + c,
                      f,
                      1,
                      jq.cookie("bp-" + c + "-extras")
                    ),
                    !1
                  )
              );
        }
      }),
      jq("li.filter select").change(function() {
        var a, b, c, d, e, f, g, h;
        return (a = jq(
          jq(".item-list-tabs li.selected").length
            ? ".item-list-tabs li.selected"
            : this
        )), (b = a.attr("id").split("-")), (c = b[0]), (d = b[1]), (e = jq(this).val()), (f = !1), (g = null), jq(".dir-search input").length && (f = jq(".dir-search input").val()), (h = jq(".groups-members-search input")), h.length && ((f = h.val()), (c = "members"), (d = "groups")), "members" === c && "groups" === d && ((c = "group_members"), (g = "groups/single/members")), "friends" === c && (c = "members"), bp_filter_request(c, e, d, "div." + c, f, 1, jq.cookie("bp-" + c + "-extras"), null, g), !1;
      }),
      jq("#buddypress").on("click", function(a) {
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = jq(a.target);
        return (
          !!k.hasClass("button") ||
          (k.parent().parent().hasClass("pagination") &&
          !k.parent().parent().hasClass("no-ajax")
            ? !k.hasClass("dots") &&
              !k.hasClass("current") &&
              (
                (b = jq(
                  jq(".item-list-tabs li.selected").length
                    ? ".item-list-tabs li.selected"
                    : "li.filter select"
                )),
                (c = b.attr("id").split("-")),
                (d = c[0]),
                (e = !1),
                (f = jq(k).closest(".pagination-links").attr("id")),
                (g = null),
                jq("div.dir-search input").length &&
                  (
                    (e = jq(".dir-search input")),
                    (e =
                      !e.val() && bp_get_querystring(e.attr("name"))
                        ? jq(".dir-search input").prop("placeholder")
                        : e.val())
                  ),
                (h =
                  jq(k).hasClass("next") || jq(k).hasClass("prev")
                    ? jq(".pagination span.current").html()
                    : jq(k).html()),
                (h = Number(h.replace(/\D/g, ""))),
                jq(k).hasClass("next") ? h++ : jq(k).hasClass("prev") && h--,
                (i = jq(".groups-members-search input")),
                i.length && ((e = i.val()), (d = "members")),
                "members" === d &&
                  "groups" === c[1] &&
                  ((d = "group_members"), (g = "groups/single/members")),
                "admin" === d &&
                  jq("body").hasClass("membership-requests") &&
                  (d = "requests"),
                (j = f.indexOf("pag-bottom") !== -1 ? "pag-bottom" : null),
                bp_filter_request(
                  d,
                  jq.cookie("bp-" + d + "-filter"),
                  jq.cookie("bp-" + d + "-scope"),
                  "div." + d,
                  e,
                  h,
                  jq.cookie("bp-" + d + "-extras"),
                  j,
                  g
                ),
                !1
              )
            : void 0)
        );
      }),
      jq("a.show-hide-new").on("click", function() {
        return (
          !!jq("#new-topic-post").length &&
          (
            jq("#new-topic-post").is(":visible")
              ? jq("#new-topic-post").slideUp(200)
              : jq("#new-topic-post").slideDown(200, function() {
                  jq("#topic_title").focus();
                }),
            !1
          )
        );
      }),
      jq("#submit_topic_cancel").on("click", function() {
        return (
          !!jq("#new-topic-post").length &&
          (jq("#new-topic-post").slideUp(200), !1)
        );
      }),
      jq("#forum-directory-tags a").on("click", function() {
        return bp_filter_request(
          "forums",
          "tags",
          jq.cookie("bp-forums-scope"),
          "div.forums",
          jq(this).html().replace(/&nbsp;/g, "-"),
          1,
          jq.cookie("bp-forums-extras")
        ), !1;
      }),
      jq("#send-invite-form").on("click", "#invite-list input", function() {
        var a,
          b,
          c = jq("#send-invite-form > .invite").length;
        jq(
          ".ajax-loader"
        ).toggle(), c && jq(this).parents("ul").find("input").prop("disabled", !0), (a = jq(this).val()), (b = jq(this).prop("checked") === !0 ? "invite" : "uninvite"), c || jq(".item-list-tabs li.selected").addClass("loading"), jq.post(
          ajaxurl,
          {
            action: "groups_invite_user",
            friend_action: b,
            cookie: bp_get_cookies(),
            _wpnonce: jq("#_wpnonce_invite_uninvite_user").val(),
            friend_id: a,
            group_id: jq("#group_id").val()
          },
          function(d) {
            jq("#message") && jq("#message").hide(), c
              ? bp_filter_request(
                  "invite",
                  "bp-invite-filter",
                  "bp-invite-scope",
                  "div.invite",
                  !1,
                  1,
                  "",
                  "",
                  ""
                )
              : (
                  jq(".ajax-loader").toggle(),
                  "invite" === b
                    ? jq("#friend-list").append(d)
                    : "uninvite" === b &&
                      jq("#friend-list li#uid-" + a).remove(),
                  jq(".item-list-tabs li.selected").removeClass("loading")
                );
          }
        );
      }),
      jq("#send-invite-form").on("click", "a.remove", function() {
        var a = jq("#send-invite-form > .invite").length,
          b = jq(this).attr("id");
        return jq(
          ".ajax-loader"
        ).toggle(), (b = b.split("-")), (b = b[1]), jq.post(
          ajaxurl,
          {
            action: "groups_invite_user",
            friend_action: "uninvite",
            cookie: bp_get_cookies(),
            _wpnonce: jq("#_wpnonce_invite_uninvite_user").val(),
            friend_id: b,
            group_id: jq("#group_id").val()
          },
          function(c) {
            a
              ? bp_filter_request(
                  "invite",
                  "bp-invite-filter",
                  "bp-invite-scope",
                  "div.invite",
                  !1,
                  1,
                  "",
                  "",
                  ""
                )
              : (
                  jq(".ajax-loader").toggle(),
                  jq("#friend-list #uid-" + b).remove(),
                  jq("#invite-list #f-" + b).prop("checked", !1)
                );
          }
        ), !1;
      }),
      jq(".visibility-toggle-link").on("click", function(a) {
        a.preventDefault(), jq(this).parent().hide().addClass("field-visibility-settings-hide").siblings(".field-visibility-settings").show().addClass("field-visibility-settings-open");
      }),
      jq(".field-visibility-settings-close").on("click", function(a) {
        a.preventDefault();
        var b = jq(this).parent(),
          c = b.find("input:checked").parent().text();
        b
          .hide()
          .removeClass("field-visibility-settings-open")
          .siblings(".field-visibility-settings-toggle")
          .children(".current-visibility-level")
          .text(c)
          .end()
          .show()
          .removeClass("field-visibility-settings-hide");
      }),
      jq(
        "#profile-edit-form input:not(:submit), #profile-edit-form textarea, #profile-edit-form select, #signup_form input:not(:submit), #signup_form textarea, #signup_form select"
      ).change(function() {
        var a = !0;
        jq(
          "#profile-edit-form input:submit, #signup_form input:submit"
        ).on("click", function() {
          a = !1;
        }), (window.onbeforeunload = function(b) {
          if (a) return BP_DTheme.unsaved_changes;
        });
      }),
      jq(
        "#friend-list a.accept, #friend-list a.reject"
      ).on("click", function() {
        var a,
          b = jq(this),
          c = jq(this).parents("#friend-list li"),
          d = jq(this).parents("li div.action"),
          e = c.attr("id").substr(11, c.attr("id").length),
          f = b.attr("href"),
          g = f.split("_wpnonce=")[1];
        return (
          !jq(this).hasClass("accepted") &&
          !jq(this).hasClass("rejected") &&
          (
            jq(this).hasClass("accept")
              ? (
                  (a = "accept_friendship"),
                  d.children("a.reject").css("visibility", "hidden")
                )
              : (
                  (a = "reject_friendship"),
                  d.children("a.accept").css("visibility", "hidden")
                ),
            b.addClass("loading"),
            jq.post(
              ajaxurl,
              { action: a, cookie: bp_get_cookies(), id: e, _wpnonce: g },
              function(a) {
                b.removeClass("loading"), a[0] + a[1] === "-1"
                  ? (
                      c.prepend(a.substr(2, a.length)),
                      c.children("#message").hide().fadeIn(200)
                    )
                  : b.fadeOut(100, function() {
                      jq(this).hasClass("accept")
                        ? (
                            d.children("a.reject").hide(),
                            jq(this)
                              .html(BP_DTheme.accepted)
                              .contents()
                              .unwrap()
                          )
                        : (
                            d.children("a.accept").hide(),
                            jq(this)
                              .html(BP_DTheme.rejected)
                              .contents()
                              .unwrap()
                          );
                    });
              }
            ),
            !1
          )
        );
      }),
      jq(
        "#members-dir-list, #members-group-list, #item-header"
      ).on("click", ".friendship-button a", function() {
        jq(this).parent().addClass("loading");
        var a = jq(this).attr("id"),
          b = jq(this).attr("href"),
          c = jq(this);
        return (a = a.split(
          "-"
        )), (a = a[1]), (b = b.split("?_wpnonce=")), (b = b[1].split("&")), (b = b[0]), jq.post(
          ajaxurl,
          {
            action: "addremove_friend",
            cookie: bp_get_cookies(),
            fid: a,
            _wpnonce: b
          },
          function(a) {
            var b = c.attr("rel");
            (parentdiv = c.parent()), "add" === b
              ? jq(parentdiv).fadeOut(200, function() {
                  parentdiv.removeClass(
                    "add_friend"
                  ), parentdiv.removeClass("loading"), parentdiv.addClass("pending_friend"), parentdiv.fadeIn(200).html(a);
                })
              : "remove" === b &&
                jq(parentdiv).fadeOut(200, function() {
                  parentdiv.removeClass(
                    "remove_friend"
                  ), parentdiv.removeClass("loading"), parentdiv.addClass("add"), parentdiv.fadeIn(200).html(a);
                });
          }
        ), !1;
      }),
      jq("#buddypress").on("click", ".group-button .leave-group", function() {
        if (!1 === confirm(BP_DTheme.leave_group_confirm)) return !1;
      }),
      jq("#groups-dir-list").on("click", ".group-button a", function() {
        var a = jq(this).parent().attr("id"),
          b = jq(this).attr("href"),
          c = jq(this);
        return (a = a.split(
          "-"
        )), (a = a[1]), (b = b.split("?_wpnonce=")), (b = b[1].split("&")), (b = b[0]), (!c.hasClass(
          "leave-group"
        ) ||
          !1 !== confirm(BP_DTheme.leave_group_confirm)) &&
          (
            jq.post(
              ajaxurl,
              {
                action: "joinleave_group",
                cookie: bp_get_cookies(),
                gid: a,
                _wpnonce: b
              },
              function(a) {
                var b = c.parent();
                jq("body.directory").length
                  ? jq(b).fadeOut(200, function() {
                      b.fadeIn(200).html(a);
                      var d = jq("#groups-personal span"),
                        e = 1;
                      c.hasClass("leave-group")
                        ? (
                            b.hasClass("hidden") &&
                              b.closest("li").slideUp(200),
                            (e = 0)
                          )
                        : c.hasClass("request-membership") &&
                          (e = !1), d.length && e !== !1 && (e ? d.text((d.text() >> 0) + 1) : d.text((d.text() >> 0) - 1));
                    })
                  : window.location.reload();
              }
            ),
            !1
          );
      }),
      jq("#buddypress").on("click", ".pending", function() {
        return !1;
      }),
      jq("body").hasClass("register")
    )
  ) {
    var d = jq("#signup_with_blog");
    d.prop("checked") || jq("#blog-details").toggle(), d.change(function() {
      jq("#blog-details").toggle();
    });
  }
  jq(".message-search").on("click", function(a) {
    if (!jq(this).hasClass("no-ajax")) {
      var b,
        c = jq(a.target);
      return "submit" === c.attr("type") || "button" === c.attr("type")
        ? (
            (b = "messages"),
            bp_filter_request(
              b,
              jq.cookie("bp-" + b + "-filter"),
              jq.cookie("bp-" + b + "-scope"),
              "div." + b,
              jq("#messages_search").val(),
              1,
              jq.cookie("bp-" + b + "-extras")
            ),
            !1
          )
        : void 0;
    }
  }), jq("#send_reply_button").click(function() {
    var a = jq("#messages_order").val() || "ASC",
      b = jq("#message-recipients").offset(),
      c = jq("#send_reply_button");
    return jq(c).addClass("loading"), jq.post(
      ajaxurl,
      {
        action: "messages_send_reply",
        cookie: bp_get_cookies(),
        _wpnonce: jq("#send_message_nonce").val(),
        content: jq("#message_content").val(),
        send_to: jq("#send_to").val(),
        subject: jq("#subject").val(),
        thread_id: jq("#thread_id").val()
      },
      function(d) {
        d[0] + d[1] === "-1"
          ? jq("#send-reply").prepend(d.substr(2, d.length))
          : (
              jq("#send-reply #message").remove(),
              jq("#message_content").val(""),
              "ASC" === a
                ? jq("#send-reply").before(d)
                : (
                    jq("#message-recipients").after(d),
                    jq(window).scrollTop(b.top)
                  ),
              jq(".new-message").hide().slideDown(200, function() {
                jq(".new-message").removeClass("new-message");
              })
            ), jq(c).removeClass("loading");
      }
    ), !1;
  }), jq(
    "body.messages #item-body div.messages"
  ).on("change", "#message-type-select", function() {
    var a = this.value,
      b = jq('td input[type="checkbox"]'),
      c = "checked";
    switch ((
      b.each(function(a) {
        b[a].checked = "";
      }),
      a
    )) {
      case "unread":
        b = jq('tr.unread td input[type="checkbox"]');
        break;
      case "read":
        b = jq('tr.read td input[type="checkbox"]');
        break;
      case "":
        c = "";
    }
    b.each(function(a) {
      b[a].checked = c;
    });
  }), jq("#select-all-messages").click(function(a) {
    this.checked
      ? jq(".message-check").each(function() {
          this.checked = !0;
        })
      : jq(".message-check").each(function() {
          this.checked = !1;
        });
  }), jq("#messages-bulk-manage").attr("disabled", "disabled"), jq(
    "#messages-select"
  ).on("change", function() {
    jq("#messages-bulk-manage").attr("disabled", jq(this).val().length <= 0);
  }), (starAction = function() {
    var a = jq(this);
    return jq.post(
      ajaxurl,
      {
        action: "messages_star",
        message_id: a.data("message-id"),
        star_status: a.data("star-status"),
        nonce: a.data("star-nonce"),
        bulk: a.data("star-bulk")
      },
      function(b) {
        1 === parseInt(b, 10) &&
          ("unstar" === a.data("star-status")
            ? (
                a.data("star-status", "star"),
                a
                  .removeClass("message-action-unstar")
                  .addClass("message-action-star"),
                a
                  .find(".bp-screen-reader-text")
                  .text(BP_PM_Star.strings.text_star),
                1 === BP_PM_Star.is_single_thread
                  ? a.prop("title", BP_PM_Star.strings.title_star)
                  : a.prop("title", BP_PM_Star.strings.title_star_thread)
              )
            : (
                a.data("star-status", "unstar"),
                a
                  .removeClass("message-action-star")
                  .addClass("message-action-unstar"),
                a
                  .find(".bp-screen-reader-text")
                  .text(BP_PM_Star.strings.text_unstar),
                1 === BP_PM_Star.is_single_thread
                  ? a.prop("title", BP_PM_Star.strings.title_unstar)
                  : a.prop("title", BP_PM_Star.strings.title_unstar_thread)
              ));
      }
    ), !1;
  }), jq("#message-threads").on("click", "td.thread-star a", starAction), jq("#message-thread").on("click", ".message-star-actions a", starAction), jq(
    "#message-threads td.bulk-select-check :checkbox"
  ).on("change", function() {
    var a = jq(this),
      b = a.closest("tr").find(".thread-star a");
    a.prop("checked")
      ? "unstar" === b.data("star-status")
        ? BP_PM_Star.star_counter++
        : BP_PM_Star.unstar_counter++
      : "unstar" === b.data("star-status")
        ? BP_PM_Star.star_counter--
        : BP_PM_Star.unstar_counter--, BP_PM_Star.star_counter > 0 && 0 === parseInt(BP_PM_Star.unstar_counter, 10) ? jq('option[value="star"]').hide() : jq('option[value="star"]').show(), BP_PM_Star.unstar_counter > 0 && 0 === parseInt(BP_PM_Star.star_counter, 10) ? jq('option[value="unstar"]').hide() : jq('option[value="unstar"]').show();
  }), jq("#select-all-notifications").click(function(a) {
    this.checked
      ? jq(".notification-check").each(function() {
          this.checked = !0;
        })
      : jq(".notification-check").each(function() {
          this.checked = !1;
        });
  }), jq("#notification-bulk-manage").attr("disabled", "disabled"), jq(
    "#notification-select"
  ).on("change", function() {
    jq("#notification-bulk-manage").attr(
      "disabled",
      jq(this).val().length <= 0
    );
  }), jq("#close-notice").on("click", function() {
    return jq(this).addClass(
      "loading"
    ), jq("#sidebar div.error").remove(), jq.post(
      ajaxurl,
      {
        action: "messages_close_notice",
        notice_id: jq(".notice")
          .attr("rel")
          .substr(2, jq(".notice").attr("rel").length),
        nonce: jq("#close-notice-nonce").val()
      },
      function(a) {
        jq("#close-notice").removeClass("loading"), a[0] + a[1] === "-1"
          ? (
              jq(".notice").prepend(a.substr(2, a.length)),
              jq("#sidebar div.error").hide().fadeIn(200)
            )
          : jq(".notice").slideUp(100);
      }
    ), !1;
  }), jq("#wp-admin-bar ul.main-nav li, #nav li").mouseover(function() {
    jq(this).addClass("sfhover");
  }), jq("#wp-admin-bar ul.main-nav li, #nav li").mouseout(function() {
    jq(this).removeClass("sfhover");
  }), jq("#wp-admin-bar-logout, a.logout").on("click", function() {
    jq.removeCookie("bp-activity-scope", {
      path: "/",
      secure: "https:" === window.location.protocol
    }), jq.removeCookie("bp-activity-filter", { path: "/", secure: "https:" === window.location.protocol }), jq.removeCookie("bp-activity-oldestpage", { path: "/", secure: "https:" === window.location.protocol });
    var a = ["members", "groups", "blogs", "forums"];
    jq(a).each(function(b) {
      jq.removeCookie("bp-" + a[b] + "-scope", {
        path: "/",
        secure: "https:" === window.location.protocol
      }), jq.removeCookie("bp-" + a[b] + "-filter", { path: "/", secure: "https:" === window.location.protocol }), jq.removeCookie("bp-" + a[b] + "-extras", { path: "/", secure: "https:" === window.location.protocol });
    });
  }), jq("body").hasClass("no-js") &&
    jq("body").attr(
      "class",
      jq("body").attr("class").replace(/no-js/, "js")
    ), "undefined" != typeof wp &&
    "undefined" != typeof wp.heartbeat &&
    "undefined" != typeof BP_DTheme.pulse &&
    (
      wp.heartbeat.interval(Number(BP_DTheme.pulse)),
      jq.fn.extend({
        "heartbeat-send": function() {
          return this.bind("heartbeat-send.buddypress");
        }
      })
    );
  var e = 0;
  jq(document).on("heartbeat-send.buddypress", function(a, b) {
    (e = 0), jq("#buddypress ul.activity-list li").first().prop("id") && ((timestamp = jq("#buddypress ul.activity-list li").first().prop("class").match(/date-recorded-([0-9]+)/)), timestamp && (e = timestamp[1])), (0 === activity_last_recorded || Number(e) > activity_last_recorded) && (activity_last_recorded = Number(e)), (b.bp_activity_last_recorded = activity_last_recorded), (last_recorded_search = bp_get_querystring("s")), last_recorded_search && (b.bp_activity_last_recorded_search_terms = last_recorded_search);
  }), jq(document).on("heartbeat-tick", function(a, b) {
    b.bp_activity_newest_activities &&
      (
        (newest_activities =
          b.bp_activity_newest_activities.activities + newest_activities),
        (activity_last_recorded = Number(
          b.bp_activity_newest_activities.last_recorded
        )),
        jq("#buddypress ul.activity-list li").first().hasClass("load-newest") ||
          jq("#buddypress ul.activity-list").prepend(
            '<li class="load-newest"><a href="#newest">' +
              BP_DTheme.newest +
              "</a></li>"
          )
      );
  });
});
jQuery(document).ready(function($) {
  var _b = $("body");
  _b.on("click", "#nldemo-live-customizer .lc-toggle-btn", function() {
    var t = $(this),
      p = t.parents("#nldemo-live-customizer");
    p.toggleClass("open");
  });
  _b.on("click", "#nldemo-live-customizer .lc-opt", function() {
    var t = $(this),
      p = t.parents(".lc-section"),
      v = t.data("value"),
      o = p.data("option"),
      el_navbar = $(".navbar"),
      el_footer = $(".footer");
    t.parents("li").addClass("active").siblings("li").removeClass("active");
    if (o == "top_bar_color_scheme") {
      $(".nlg-top-bar")
        .removeClass("nlg-top-bar-" + (v == "dark" ? "light" : "dark"))
        .addClass("nlg-top-bar-" + v);
    } else if (o == "header_alt_color_scheme") {
      $(".nlg-header-alt")
        .removeClass("nlg-header-alt-" + (v == "dark" ? "light" : "dark"))
        .addClass("nlg-header-alt-" + v);
    } else if (o == "menu_bar_color_scheme") {
      $(".nlg-menu-bar")
        .removeClass("nlg-menu-bar-" + (v == "dark" ? "light" : "dark"))
        .addClass("nlg-menu-bar-" + v);
    } else if (o == "sub_menu_color_scheme") {
      $(".nlg-menu-bar")
        .removeClass("nlg-sub-menu-" + (v == "dark" ? "light" : "dark"))
        .addClass("nlg-sub-menu-" + v);
    } else if (o == "mega_menu_color_scheme") {
      $(".nlg-menu-bar")
        .removeClass("nlg-mega-menu-" + (v == "dark" ? "light" : "dark"))
        .addClass("nlg-mega-menu-" + v);
    } else if (o == "header_search_color_scheme") {
      $(".nlg-search-form-wrap")
        .removeClass("nlg-search-form-" + (v == "dark" ? "light" : "dark"))
        .addClass("nlg-search-form-" + v);
    }
  });
});
