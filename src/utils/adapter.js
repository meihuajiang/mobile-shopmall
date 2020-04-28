module.exports = function(doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  /**
   * ================================================
   *  设置根元素 font-size
   * 当设备宽度为 375 (iPhone6) 时，根元素 font-size = 16px;
   * ================================================
   */
  var refreshRem = function() {
    var clientWidth =
      win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

    if (!clientWidth) return;
    var fontSize;
    var width = clientWidth;
    fontSize = (16 * width) / 375;
    docEl.style.fontSize = fontSize + "px";
    docEl.style.maxWidth = 768 + "px";
    docEl.style.margin = "0 auto";
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener("DOMContentLoaded", refreshRem, false);
  refreshRem();
};
