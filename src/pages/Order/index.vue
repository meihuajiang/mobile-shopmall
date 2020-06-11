<template>
  <div>
    <top-bar
      title="确认订单"
      hasBack
      outOrder
      v-on:outOrderEvt="outOrderEvt(item.id)"
    ></top-bar>
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
      <van-submit-bar
        :price="item.price * num * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { GoodsMixin } from "@/mixins/goodsMixin";
import { post } from "../../utils/http";
import { Toast } from "vant";
export default {
  name: "Order",
  mixins: [GoodsMixin],
  components: {
    TopBar
  },
  data() {
    return {
      num: 1,
      user: {
        id: this.user_id,
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
    this.item.id = this.$route.query.id;
    this.user.id = this.global.log_id;
    try {
      post("https://af2pds.toutiao15.com/get_default_address", {
        user_id: this.user.id
      }).then(response => {
        if (response.result) {
          this.user.address = response.address;
          this.user.phone = response.phone;
          this.user.name = response.user_name;
        } else {
          Toast("请添加地址！");
        }
      });
    } catch (e) {
      Toast("请登录！");
      return;
    }
    try {
      post("https://af2pds.toutiao15.com/get_commodity_byid", {
        id: this.item.id
      }).then(response => {
        let result = response.content;
        this.item.title = result.commodity_name;
        this.item.count = result.commodity_count;
        this.item.price = result.commodity_price;
        this.item.imgUrl = result.commodity_photo;
      });
    } catch (e) {
      Toast("该图书不存在！");
    }
  },
  methods: {
    decrease() {
      if (this.num > 1) this.num--;
      else Toast("购买数量不得为0！");
    },
    increase() {
      this.num++;
    },
    onSubmit() {
      if (this.num > this.item.count) Toast("库存不足！");
      try {
        post("https://af2pds.toutiao15.com/update_commodity_num", {
          id: this.item.id,
          count: this.num
        });
        post("https://af2pds.toutiao15.com/add_order", {
          uid: this.user.id,
          user_name: this.user.name,
          user_phone: this.user.phone,
          aid: this.user.address,
          cid: this.item.id,
          count: this.num,
          money: this.num * this.item.price,
          state: 2
        }).then(response => {
          console.log(response);
          if (response.result) Toast("下单成功！");
          else Toast("下单失败！");
        });
      } catch (e) {
        Toast("下单失败！");
      }
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
