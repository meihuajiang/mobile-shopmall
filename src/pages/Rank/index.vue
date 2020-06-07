<template>
  <div class="rank">
    <top-bar title="排行榜" hasBack></top-bar>
    <section
      class="content"
      @touchstart.prevent="touchstart"
      @touchmove.prevent="touchmove"
      @touchend.prevent="touchend"
    >
      <b-scroll
        class="content-scroll"
        ref="rankScrollRef"
        :listenScroll="listenScroll"
        :probeType="probeType"
        :pullup="true"
        :bounce="bounce"
        v-on:scroll="rankScroll"
        v-on:scrollEnd="rankScrollEnd"
      >
        <van-tabs v-model="active" type="card" color="#F79709">
          <van-tab v-for="index in 4" :key="index" :title="'榜 ' + index">
            这里的内容为 {{ index }}
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-tab>
        </van-tabs>
      </b-scroll>
    </section>
  </div>
</template>

<script>
//import cityData from "@/assets/js/city";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
import BScroll from "@/components/BScroll";
//import { GoodsMixin } from "@/mixins/goodsMixin";
//import { throttle } from "@/utils/tools"; // 导入节流函数

export default {
  name: "Rank",
  //mixins: [GoodsMixin],
  // eslint-disable-next-line vue/no-unused-components
  components: { TopBar, Loading, BScroll },
  data() {
    return {
      loadingStatus: true,
      active: 1,
      list: [],
      loading: false,
      finished: false,
      listenScroll: true, // 监听滚动位置
      probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      scrollY: 0, // 实时滚动的 Y 坐标
      bounce: { top: true }, // 当滚动超过边缘的时候顶部会有一小段回弹动画
      touch: {},
      isRotate: false,
      isTrans: false,
      translateY: 0,
      rotate: 0,
      opac: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 退回到上一页
    back() {
      this.$router.go(-1);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },

    // eslint-disable-next-line no-unused-vars
    rankScroll(pos) {},
    rankScrollEnd() {
      this.$refs.rankScrollRef.refresh();
    },
    // eslint-disable-next-line no-unused-vars
    //contentScroll(pos) {},
    /**
     * 触摸开始 | 当用户在触摸平面上放置了一个触点时触发
     */
    touchstart(event) {
      this.touch.init = true;
      this.touch.startY = event.touches[0].pageY;
    },
    /**
     * 触摸移动 | 当用户在触摸平面上移动触点时触发
     */
    touchmove(event) {
      let moveY = event.touches[0].pageY;
      let distanceY = moveY - this.touch.startY;
      this.translateY = Math.max(0, distanceY / 3.5);
      this.rotate = Math.max(0, Math.min(360, distanceY));
      this.translateY > 80 && (this.isRotate = true);
      this.opac = distanceY / 320;
    },
    /**
     * 触摸结束 | 当一个触点被用户从触摸平面上移除
     */
    touchend() {}
  }
};
</script>

<style lang="scss" scoped>
.van-tab__pane {
  padding: 25px 20px;
}
.van-tabs {
  position: relative;
}
</style>
