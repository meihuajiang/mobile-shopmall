import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Lazyload } from "vant";
import "vant/lib/index.css";
import FastClick from "fastclick";
FastClick.attach(document.body);
import "@/assets/css/reset.css";
import "@/assets/css/border.css";
import "@/assets/css/index.css";


require("./utils/adapter")(document, window);

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false;
// 定义全局过滤器
Vue.filter("toFixed", function(value) {
  return Number(value).toFixed(2);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
