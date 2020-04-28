<template>
  <!-- 轮播图 -->
  <div id="banner">
    <van-swipe :autoplay="3000" :duration="1500" indicator-color="#F79709">
      <van-swipe-item v-for="item of slides" :key="item.goodsId">
        <img v-lazy="item.image" class="banner-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    //原版
    slides: { type: Array, default: () => [] }
    //slides: { default: () => [] }
  }
  /*data() {
    return {
      slides: [
        {
          image: "http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg",
          goodsId: "b1195296679f482aa7d54d95ac2b4a94"
        },
        {
          image: "@/assets/imgs/slides2.jpeg",
          goodsId: "da34d6f381464a219b37a9ac0ad579e8"
        },
        {
          image: "@/assets/imgs/slides3.jpeg",
          goodsId: "ad176e397858448a854dc50371334faf"
        }
      ],
    };
  }*/
};
</script>

<style lang="scss" scoped>
#banner {
  height: 0;
  padding-bottom: 53%;
  overflow: hidden;
  .banner-img {
    width: 100%;
    height: 200px;
  }
}
</style>
