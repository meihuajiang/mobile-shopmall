<template>
  <div>
    <top-bar title="订单详情" hasBack></top-bar>
    <van-steps :active="detail.active1" active-color="#F79709"
      ><!-- 状态从0开始计数 eg.待付款时active=0 -->
      <van-step>待付款</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>已完成</van-step>
      <van-step>已评价</van-step>
    </van-steps>
    <van-cell
      :title="detail.name"
      :value="detail.tel"
      :label="detail.address"
    />
    <van-card
      :num="detail.count"
      :price="detail.prices"
      :title="detail.bookname"
      :thumb="detail.pic"
      @click="goGoodsDetails(1)"
    >
      <template #tags>
        <br />
        <van-tag plain type="danger">{{ detail.status }}</van-tag>
      </template>
    </van-card>
    <van-cell title="商品总价:" :value="detail.totalPrice" />
    <van-cell title="订单编号:" :value="detail.order_id" size="small" />
    <van-cell title="创建时间:" :value="detail.createtime" size="small" />
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
//import BScroll from "@/components/BScroll";
//import UserInfo from "./UserInfo";
import ajax from "@/api";

export default {
  name: "OrdersDetails",
  inject: ["reload"],
  components: { TopBar },
  data() {
    return {
      top: ["待付款", "待发货", "待收货", "已完成", "已评价"],
      detail: { active1: 1 }
    };
  },
  watch: {},
  async created() {
    console.log(this.$route.params.orderId);
    let res = await ajax.getOrder(this.$route.params.orderId);
    this.detail.active1 = 0;
    this.detail.active1 = res.content.orders_state - 1;
    this.detail.status = "";
    this.detail.status = this.top[this.detail.active1];
    this.detail.bookname = this.$route.params.bookname;
    this.detail.name = res.content.user_name;
    this.detail.tel = res.content.user_phone;
    this.detail.address = res.content.address_id;
    this.detail.count = res.content.count;
    this.detail.totalPrice = res.content.orders_money;
    this.detail.prices = this.detail.totalPrice / this.detail.count;
    this.detail.prices = this.detail.prices.toFixed(2);
    this.detail.totalPrice = this.detail.totalPrice.toFixed(2);
    this.detail.order_id = res.content._id;
    this.detail.createtime = res.content.createdAt;
    this.detail.pic = this.$route.params.picture;
    console.log(res);
    console.log(this.detail.active1);
    console.log(this.detail.createtime);
    console.log(this.detail.status);
    console.log(this.detail.bookname);
    console.log(this.detail.tel);
    console.log(this.detail.address);
    console.log(this.detail.count);
    console.log(this.detail.totalPrice);
    console.log(this.detail.prices);
    console.log(this.detail.order_id);
    this.$route.params.orderId = null;
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
