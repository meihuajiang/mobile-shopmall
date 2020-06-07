<template>
  <div id="floor">
    <floor-title
      v-if="floorName"
      :num="num"
      :floorName="floorName"
    ></floor-title>
    <!-- 楼层 -->
    <div class="floor-wrapper">
      <!-- 顶部 -->
      <section class="floor-top">
        <div class="floor-top-left" @click="goGoodsDetails(floor[0])">
          <img v-lazy="floor[0].image" />
        </div>
        <div class="floor-top-right">
          <section class="border-btm" @click="goGoodsDetails(floor[1])">
            <img v-lazy="floor[1].image" />
          </section>
          <section @click="goGoodsDetails(floor[2])">
            <img v-lazy="floor[2].image" />
          </section>
        </div>
      </section>
      <!-- 底部 -->
      <section class="floor-bottom">
        <div
          v-for="item of floor.slice(3)"
          :key="item.goodsId"
          @click="goGoodsDetails(item)"
        >
          <img v-lazy="item.image" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FloorTitle from "./FloorTitle";
import { GoodsMixin } from "@/mixins/goodsMixin";

export default {
  name: "Floor",
  mixins: [GoodsMixin],
  components: { FloorTitle },
  props: ["floorName", "floor", "num"]
  /*
  data() {
    return {
      floorName: [["动漫"],["电子书"],["小说"]],
      num: 3,
      floor: [
        [
          {
            goodsId: "e53c046465204d4fb8f22431cc2807e7",
            image: "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180109_6316.jpg"
          }, {
            goodsId: "f36f6dd8f62247d5846eaa9b3f269cbc",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg"
          },
          {
            goodsId: "72a3ec63956347a2a9f113589fe79c03",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180217_3970.jpg"
          },
          {
            goodsId: "a632bfb3818541da8e6843d6d0dbd917",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180257_2378.jpg"
          },
          {
            goodsId: "6694401a30a940f6ae437d541b7fd26d",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180427_8557.jpg"
          }
        ],

        [
          {
            goodsId: "e53c046465204d4fb8f22431cc2807e7",
            image: "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180109_6316.jpg"
          }, {
            goodsId: "f36f6dd8f62247d5846eaa9b3f269cbc",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg"
          },
          {
            goodsId: "72a3ec63956347a2a9f113589fe79c03",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180217_3970.jpg"
          },
          {
            goodsId: "a632bfb3818541da8e6843d6d0dbd917",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180257_2378.jpg"
          },
          {
            goodsId: "6694401a30a940f6ae437d541b7fd26d",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180427_8557.jpg"
          }
        ],

        [
          {
            goodsId: "e53c046465204d4fb8f22431cc2807e7",
            image: "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180109_6316.jpg"
          }, {
            goodsId: "f36f6dd8f62247d5846eaa9b3f269cbc",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180151_6180.jpg"
          },
          {
            goodsId: "72a3ec63956347a2a9f113589fe79c03",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180217_3970.jpg"
          },
          {
            goodsId: "a632bfb3818541da8e6843d6d0dbd917",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180257_2378.jpg"
          },
          {
            goodsId: "6694401a30a940f6ae437d541b7fd26d",
            image:
              "http://images.baixingliangfan.cn/homeFloor/20180407/20180407180427_8557.jpg"
          }
        ]
      ]
    };
  }*/
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
