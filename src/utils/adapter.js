module.exports = function(doc, win) {
  let docEl = win.document.documentElement;
  let resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  /**
   * ================================================
   *  设置根元素 font-size
   * 当设备宽度为 375 (iPhone6) 时，根元素 font-size = 16px;
   * ================================================
   */
  let refreshRem = function() {
    let clientWidth =
      win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

    if (!clientWidth) return;
    let fontSize;
    fontSize = (16 * clientWidth) / 375;
    docEl.style.fontSize = fontSize + "px";
    docEl.style.maxWidth = 768 + "px";
    docEl.style.margin = "0 auto";
  };

  if (!doc.addEventListener) return;
  //屏幕旋转大小改变
  win.addEventListener(resizeEvt, refreshRem, false);
  //页面初适应
  doc.addEventListener("DOMContentLoaded", refreshRem, false);
  refreshRem();
};
