<template>
  <div class="user">
    <top-bar title="个人中心"></top-bar>
    <!-- 头像 用户名 -->
    <section class="user-info" v-if="!userToken || !userInfo">
      <!--<section class="user-info">-->
      <img class="avatar" src="../../assets/imgs/avatar.jpg" />
      <p @click="$router.push({ name: 'Login' })">登录 / 注册</p>
    </section>
    <section class="user-info" v-else>
      <!--<section class="user-info">-->
      <img class="avatar" :src="userInfo.avatar" />
      <p class="use-name">欢迎您：{{ userInfo.userName }}</p>
      <p @click="logout">退出登录</p>
      <van-icon name="setting" class="setting" @click="isShowSetting = true" />
    </section>
    <!-- 订单索引 -->
    <section class="order-index-wrapper">
      <div class="order-index-list">
        <section
          class="order-all"
          @click="$router.push({ name: 'OrderManage', params: { status: 0 } })"
        >
          <span>订单管理</span>
          <van-icon class="icon" name="arrow" />
        </section>
        <ul>
          <li
            class="order-index-item"
            v-for="(item, index) in orderIndex"
            :key="item.status"
            @click="goOrderManage(item.status)"
          >
            <van-icon class="icon" :name="item.icon" />
            <p class="title">{{ item.title }}</p>
            <span
              class="order-num"
              v-if="orderNum.length && orderNum[index] !== 0"
              >{{ orderNum[index] }}</span
            >
          </li>
        </ul>
      </div>
    </section>
    <!-- 其他：收藏商品、地址管理、最近浏览 -->
    <section class="other-entry">
      <!-- 收藏商品 -->
      <div class="collection" @click="$router.push({ name: 'CommentCenter' })">
        <van-icon class="small-icon" name="star-o" />
        <span>评价中心</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <!-- 地址管理 -->
      <div class="address" @click="$router.push({ name: 'AddressManage' })">
        <van-icon class="small-icon" name="location-o" />
        <span>地址管理</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
      <!-- 最近浏览 -->
      <div
        class="browse-history"
        @click="$router.push({ name: 'BrowseHistory' })"
      >
        <van-icon class="small-icon" name="eye-o" />
        <span>最近浏览</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>

      <div
        class="browse-history"
        @click="$router.push({ name: 'BrowseHistory' })"
      >
        <van-icon class="small-icon" name="gem-o" />
        <span>我的礼券</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>

      <div
        class="browse-history"
        @click="$router.push({ name: 'BrowseHistory' })"
      >
        <van-icon class="small-icon" name="friends-o" />
        <span>关于我们</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>

      <div
        class="browse-history"
        @click="$router.push({ name: 'BrowseHistory' })"
      >
        <van-icon class="small-icon" name="service-o" />
        <span>客服反馈</span>
        <van-icon class="arrow-icon" name="arrow" />
      </div>
    </section>

    <!-- 个人资料 -->
    <user-info
      :isShowSetting="isShowSetting"
      @closeSetting="isShowSetting = $event"
    />
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import UserInfo from "./UserInfo";
import { GoodsMixin } from "@/mixins/goodsMixin";
//import ajax from "@/api";

export default {
  name: "User",
  mixins: [GoodsMixin],
  inject: ["reload"],
  components: { TopBar, UserInfo },
  data() {
    return {
      // 待付款 1，待发货 2，待收货 3，已完成 4，评价 5，
      orderIndex: [
        { icon: "balance-pay", status: 1, title: "待付款" },
        { icon: "logistics", status: 2, title: "待发货" },
        { icon: "points", status: 3, title: "待收货" },
        { icon: "like-o", status: 4, title: "已完成" },
        { icon: "good-job-o", status: 5, title: "评价" }
      ],
      userInfo: null, // 用户信息
      orderNum: [], // 订单对应处理数量
      isShowSetting: false // 是否显示用户设置
    };
  },
  watch: {},
  created() {},
  methods: {
    /*
    goOrderManage(status) {
      if (status === 5) {
        this.$router.push({ name: "CommentCenter" });
        return;
      }
      this.$router.push({ name: "OrderManage", query: { status } });
    },*/
    /**
     * 退出登录状态
     */
    logout() {},
    goOrderManage(sta) {
      if (sta !== 5) {
        this.$router.push({ name: "OrderManage", params: { status: sta } });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
