<template>
  <div>
    <top-bar title="确认订单" hasBack outOrder v-on:outOrderEvt="outOrderEvt(item.id)"></top-bar>
    <div id="swiper-wrapper">
      <div id="user_message">
        <!--<button>">"</button>-->
        <div id="user">
          <p id="name">{{ user.name }}</p>
          <p id="phone">{{ user.phone }}</p>
          <p id="address">{{ user.address }}</p>
          <p id="tip">收货不便时，可暂选寄存服务</p>
        </div>
      </div>
      <div id="good_message">
        <img :src="item.imgUrl" alt="" />
        <p id="bookname">{{ item.title }}</p>
        <div id="num">
          <p>单价:</p>
          <p id="price">￥{{ item.price }}</p>
          <p>购买数量:</p>
          <button @click="increase">+</button>
          <input v-model="num" />
          <button @click="decrease">-</button>
        </div>
      </div>
      <!--<p id="total">合计:￥{{ item.price * num }}</p>
      <button id="order">立即购买</button>-->
      <van-submit-bar :price="item.price * num*100" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { GoodsMixin } from "@/mixins/goodsMixin";
export default {
  name: "Order",
  mixins: [GoodsMixin],
  components: {
    TopBar
  },
  data() {
    return {
      title: "",
      num: 1,
      user: {
        name: "张三",
        phone: "123456789",
        address: "广东省广州市番禺区华南理工大学"
      },
      item: {
        id: 1,
        title: "夏目友人帐",
        text: "只要有想见的人，就不再会是孤身一人了",
        price: 29,
        imgUrl: require("@/assets/imgs/xiamu.png")
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    decrease() {
      if (this.num > 1) this.num--;
      else alert("购买数量不得为0！");
    },
    increase() {
      this.num++;
    },
    jump(value) {
      this.$router.push({
        name: "GoodsDetails",
        query: { id: value }
      });
    },
    outOrderEvt(value) {
      this.$router.push({
        name: "GoodsDetails",
        query: { id: value }
      });
      setTimeout(() => {
        // 方法在 goodsMixin 中
        this.setOrderPaymentList([]); // 清空订单列表
        this.setTempAddress({}); // 清除临时地址
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
