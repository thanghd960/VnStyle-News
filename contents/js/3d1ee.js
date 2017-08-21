jQuery(function(a) {
  a(".woocommerce-ordering").on("change", "select.orderby", function() {
    a(this).closest("form").submit();
  }), a("input.qty:not(.product-quantity input.qty)").each(function() {
    var b = parseFloat(a(this).attr("min"));
    b >= 0 && parseFloat(a(this).val()) < b && a(this).val(b);
  }), jQuery(".woocommerce-store-notice__dismiss-link").click(function() {
    Cookies.set("store_notice", "hidden", {
      path: "/"
    }), jQuery(".woocommerce-store-notice").hide();
  }), "hidden" === Cookies.get("store_notice")
    ? jQuery(".woocommerce-store-notice").hide()
    : jQuery(".woocommerce-store-notice").show();
});
