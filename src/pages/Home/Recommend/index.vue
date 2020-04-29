<template>
  <div id="swiper-wrapper">
    <p class="title">为你推荐</p>
    <swiper :options="swiperOption">
      <swiper-slide
        class="recommend-item"
        v-for="item of recommend"
        :key="item.goodsId"
      >
        <img
          v-lazy="item.image"
          class="recommend-img"
          width="300"
          height="180"
          @click="goGoodsDetails(item)"
        />
        <p class="name">{{ item.goodsName }}</p>
        <p class="price">
          <span class="code">￥</span>
          <span class="mall-price">{{ item.mallPrice }}</span>
          <span class="min-price">￥{{ item.price }}</span>
        </p>
        <div class="bottom-btn">
          <section class="left" @click="addToShopCart(item.goodsId)">
            <van-icon name="shopping-cart" />
          </section>
          <section class="right" @click="goGoodsDetails(item)">
            查看详情
          </section>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { GoodsMixin } from "@/mixins/goodsMixin";
import ajax from "@/api";

export default {
  name: "Recommend",
  mixins: [GoodsMixin],
  components: { swiper, swiperSlide },
  props: {
    //recommend: { type: Array, default: () => [] }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      recommend: [
        {
          image: require("@/assets/imgs/recommend1.jpeg"),
          mallPrice: 26.8,
          goodsId: "1",
          price: 16.8,
          goodsName: "光"
        },
        {
          image: require("@/assets/imgs/recommend2.png"),
          mallPrice: 36.8,
          goodsId: "2",
          price: 16.8,
          goodsName: "想念少年的你"
        },
        {
          image: require("@/assets/imgs/recommend3.png"),
          mallPrice: 46.8,
          goodsId: "3",
          price: 16.8,
          goodsName: "查令十字街84号"
        },
        {
          image: require("@/assets/imgs/recommend4.png"),
          mallPrice: 56.8,
          goodsId: "3",
          price: 16.8,
          goodsName: "杨绛传"
        },
        {
          image: require("@/assets/imgs/recommend5.png"),
          mallPrice: 66.8,
          goodsId: "3",
          price: 16.8,
          goodsName: "孤独是生命的礼物"
        },
        {
          image: require("@/assets/imgs/recommend6.png"),
          mallPrice: 76.8,
          goodsId: "3",
          price: 16.8,
          goodsName: "万事有心，人间有味"
        },
        {
          image: require("@/assets/imgs/recommend7.png"),
          mallPrice: 16.8,
          goodsId: "3",
          price: 16.8,
          goodsName: "苏东坡传"
        }
      ]
    };
  },
  methods: {
    /**
     * 加入购物车
     */
    async addToShopCart(goodsId) {
      if (!this.userToken) {
        this.$router.push({ name: "Login" });
        return;
      }
      if (!goodsId) return;

      try {
        let res = await ajax.addToShopCart(goodsId);
        this.$toast(res.msg);
      } catch (error) {
        // eslint-disable-next-line no-constant-condition
        if ((error.response && error.response.status === 401) || 400)
          this.$router.push({ name: "Login" });
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
