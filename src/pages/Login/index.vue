<template>
  <div class="login">
    <!-- 登录 -->
    <transition name="login-slide">
      <article class="form-container" v-if="switchFlag === 1">
        <h2 class="title">登录</h2>
        <!-- 手机号码 -->
        <section
          class="input-wrapper"
          :class="[focusIndex === 1 ? 'focus-a' : '']"
        >
          <input
            type="text"
            class="mobile-phone"
            @focus="handleFocus(1)"
            @blur="handleBlur"
            v-model="mobilePhone"
            maxlength="11"
            placeholder="账号"
            autocomplete="off"
          />
        </section>
        <!-- 密码 -->
        <section
          class="input-wrapper"
          :class="[focusIndex === 2 ? 'focus-a' : '']"
        >
          <input
            type="password"
            class="u-password"
            @focus="handleFocus(2)"
            @blur="handleBlur"
            v-model="password"
            maxlength="10"
            placeholder="密码"
            autocomplete="off"
          />
        </section>
        <!-- 图形验证码 -->

        <!-- 登录按钮 -->
        <van-button
          v-if="!isLoading"
          size="large"
          color="#f79709"
          @click="login"
          text="登录"
        />
        <van-button
          v-else
          size="large"
          loading
          loading-type="spinner"
          loading-text="正在登录 ..."
          color="#f79709"
        />
        <!-- 前往注册 -->
        <section class="register-entry">
          <span @click="switchForm(2)">注册账号</span>
        </section>
      </article>
    </transition>

    <!-- 注册 -->
    <transition name="reg-slide">
      <article class="form-container" v-if="switchFlag === 2">
        <h2 class="title">注册</h2>
        <!-- 用户名 -->
        <section
          class="input-wrapper"
          :class="[focusIndex === 1 ? 'focus-a' : '']"
        >
          <input
            type="text"
            class="u-name"
            @focus="handleFocus(1)"
            @blur="handleBlur"
            v-model="userName"
            maxlength="10"
            placeholder="账号"
            autocomplete="off"
          />
        </section>
        <!-- 密码 -->
        <section
          class="input-wrapper"
          :class="[focusIndex === 2 ? 'focus-a' : '']"
        >
          <input
            type="password"
            class="u-password"
            @focus="handleFocus(2)"
            @blur="handleBlur"
            v-model="password"
            maxlength="10"
            placeholder="密码"
            autocomplete="off"
          />
        </section>
        <!-- 手机号 -->
        <!-- 短信验证码 -->
        <!-- 注册按钮 -->
        <van-button
          v-if="!isLoading"
          size="large"
          color="#f79709"
          @click="register"
          text="注册"
        />
        <van-button
          v-else
          size="large"
          loading
          loading-type="spinner"
          loading-text="正在注册 ..."
          color="#f79709"
        />
        <!-- 前往登录 -->
        <section class="login-entry">
          <span @click="switchForm(1)">登录账号</span>
        </section>
      </article>
    </transition>

    <!-- 后退 -->
    <back @backEvt="back" />
  </div>
</template>

<script>
import Back from "@/components/Back";
import { GoodsMixin } from "@/mixins/goodsMixin";
import ajax from "@/api";
import {Toast} from"vant"
export default {
  name: "Login",
  mixins: [GoodsMixin],
  components: { Back },
  data() {
    return {
      switchFlag: 1, // 登录: 1, 注册: 2
      focusIndex: 0, // 输入框聚焦索引
      userName: "", // 用户名
      password: "", // 密码
      mobilePhone: "", // 手机号
      verifyCode: "", // 图形验证码
      smsCode: "", // 短信验证码
      isLoading: false, // 登录 或 注册按钮状态
      countdownText: "", // 倒计时文本
      cDTime: 60 // 60 秒倒计时
    };
  },
  created() {
    this.$nextTick(() => this._updatePicCode());
  },
  methods: {
    /**
     * 处理输入框聚焦
     */
    handleFocus(index) {
      this.focusIndex = index;
    },
    /**
     * 处理输入框失焦
     */
    handleBlur() {
      this.focusIndex = 0;
    },
    /**
     * 切换表单 & 做一些重置操作
     * @param {Number} flag 表单标识 1：登录 2：注册
     */
    switchForm(flag) {
      this.switchFlag = flag;
      this.switchFlag === 1 && this.$nextTick(() => this._updatePicCode());
      this.focusIndex = 0; // 重置表单索引
      this.isLoading = false; // 重置登录 或 注册按钮状态
      let resetData = [
        "userName",
        "password",
        "verifyCode",
        "mobilePhone",
        "smsCode"
      ];
      for (let item of resetData) {
        this[item] = "";
      }
    },
    /**
     * 表单验证
     * @param {Number} flag 表单标识 1：登录 2：注册
     * @return {Boolean} 验证失败或成功
     */
    _checkForm(flag) {
      let toast = text => {
        this.$toast(text);
        return false;
      };

      switch (flag) {
        case 1:
          if (this.mobilePhone.length === 0) return toast("请输入账号");
          if (!this.password) return toast("请输入密码");
          //if (!this.verifyCode) return toast("请输入验证码");
          break;
        case 2:
          if (!this.userName) return toast("请输入账号");
          if (!this.password) return toast("请输入密码");
          if (this.mobilePhone.length === 0) return toast("请输入正确的账号");
          //if (!this.smsCode) return toast("请输入短信验证码");
          break;
      }

      return true;
    },
    /**
     * 注册
     */
    async register() {
      if (!this._checkForm(2)) return;

      this.isLoading = true; // 按钮加载状态
      let { userName, password, mobilePhone, smsCode } = this.$data;
      try {
        let res = await ajax.register(userName, password, mobilePhone, smsCode);
        console.log(res);
        if (res.result) {
          Toast("注册成功");
        } else {
          Toast("注册失败");
        }
        // 反馈消息
        if (res.code !== 200) {
          this.isLoading = false; // 重置按钮状态
        }
        // 设置 token | 方法在 GoodsMixin
        res.token &&
          this.setUserToken(res.token) &&
          setTimeout(() => this.$router.back(), 1000);
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    /**
     * 登录
     */
    async login() {
      if (!this._checkForm(1)) return;

      this.isLoading = true; // 按钮加载状态
      // eslint-disable-next-line no-unused-vars
      let { mobilePhone, password, verifyCode } = this.$data;
      try {
        console.log("hahha");
        let res = await ajax.login(mobilePhone, password);
        console.log(res);
        if (res.result) {
          Toast("登录成功");
          res.token && this.setUserToken(res.token) && setTimeout(() => this.$router.back(), 1000);
          this.goUser();
        } else {
          Toast("账号或密码错误");
        }
        if (res.code !== 200) {
          this.isLoading = false; // 重置按钮状态
        }
        // 设置 token | 方法在 GoodsMixin
        res.token &&
          this.setUserToken(res.token) &&
          setTimeout(() => this.$router.back(), 1000);
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    goUser() {
      this.$router.push({
        name: "Home"
      });
    },
    /**
     * 发送短信验证码
     */
    async sendSMSCode() {
      // 手机号码错误
      if (
        this.mobilePhone.length != 11 ||
        !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobilePhone)
      )
        return this.$toast("请输入正确的手机号码");

      try {
        let res = await ajax.sendSMSCode(this.mobilePhone);
        console.log(res);

        if (res.code === 200) {
          // 免费短信服务次数用完，就以弹框方式发送
          window.alert(`短信验证码: ${res.smsCode}`);

          this.cDTime = 60; // 首先恢复为 60 s
          let timer = setInterval(() => {
            if (this.cDTime <= 0) {
              this.countdownText = "";
              clearInterval(timer); // 清除定时器
              return;
            }
            this.countdownText = this.cDTime--;
          }, 1000);
        } else if (res.code === 4010) {
          let timer = setInterval(() => {
            if (res.time <= 0) {
              this.countdownText = "";
              clearInterval(timer); // 清除定时器
              this.cDTime = 60;
              return;
            }
            this.countdownText = res.time--;
          }, 1000);
        }
        // 反馈消息
        this.$toast(res.msg);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * 更新图形验证码
     */
    _updatePicCode() {
      this.$refs.picCode["src"] = ajax.sendPicCode();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
