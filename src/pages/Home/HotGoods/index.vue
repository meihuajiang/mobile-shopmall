<template>
  <div id="hot-goods">
    <section class="title">
      <span class="name">猜你喜欢</span>
    </section>
    <ul>
      <li
        class="hot-goods-item"
        v-for="item of hotGoods"
        :key="item.goodsId"
        @click="goGoodsDetails(item)"
      >
        <img v-lazy="item.image" height="180" width="300" class="hot-goods-img" />
        <p class="name">{{ item.name }}</p>
        <p class="price">
          <span class="code">￥</span>
          <span class="mall-price">{{ item.mallPrice }}</span>
          <span class="min-price">{{ item.price }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { GoodsMixin } from "@/mixins/goodsMixin";

export default {
  name: "HotGoods",
  mixins: [GoodsMixin],
  props: {
    //hotGoods: { type: Array, default: () => [] }
  },
  data() {
    return {
      hotGoods: [
        {
          mallPrice: 13.90,
          image: require("@/assets/imgs/hotGoods1.jpeg"),
          goodsId: "1",
          price: 13.90,
          name: "书"
        },
        {
          mallPrice: 23.90,
          image: require("@/assets/imgs/xiamu.png"),
          goodsId: "2",
          price: 23.90,
          name: "夏目友人帐"
        },
        {
          mallPrice: 33.90,
          image: require("@/assets/imgs/hotGoods3.png"),
          goodsId: "3",
          price: 33.90,
          name: "偷影子的人"
        },
        {
          mallPrice: 43.90,
          image: require("@/assets/imgs/hotGoods4.png"),
          goodsId: "4",
          price: 43.90,
          name: "解忧杂货店"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
