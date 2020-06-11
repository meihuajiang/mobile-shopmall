<template>
  <div id>
    <van-nav-bar title="Please Log In" />
    <form id="login">
      <van-cell-group>
        <van-field
          v-model="id"
          label="账号"
          placeholder="Please input your id"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="password"
          label="密码"
          placeholder="Please input password"
        />
      </van-cell-group>
      <van-button type="primary" size="large" v-on:click="try_to_log()"
        >提交</van-button
      >
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { get, post } from "@/utils/http";
// eslint-disable-next-line no-unused-vars
import ajax from "@/api";
import Vue from "vue";
import { Toast } from "vant";
import { Field } from "vant";
import { Button } from "vant";
import { NavBar } from "vant";
Vue.use(Toast);
Vue.use(Field);
Vue.use(Button);
Vue.use(NavBar);
export default {
  name: "index",
  data() {
    return {
      id: "",
      password: ""
    };
  },
  methods: {
    try_to_log: function() {
      var xmlhttprequest = new XMLHttpRequest();
      xmlhttprequest.open(
        "POST",
        "https://af2pds.toutiao15.com/get_user",
        false
      );
      xmlhttprequest.setRequestHeader("CORS", "Access-Control-Allow-Origin");
      xmlhttprequest.setRequestHeader("content-type", "application/json");
      xmlhttprequest.send(
        JSON.stringify({ id: this.id, password: this.password })
      );
      var result = JSON.parse(xmlhttprequest.response);
      if (result.result === false) {
        Toast("账号或密码错误");
        this.id = "";
        this.password = "";
      } else {
        this.change_log_state(true);
        this.change_log_id(result.user_id);
        //跳转到其他页面
      }
    }
  }
};
</script>

<style scoped>
#login {
  top: 20%;
}
</style>
