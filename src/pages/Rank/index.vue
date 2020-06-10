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
        <van-tabs v-model="active" color="#F79709">
          <van-tab title="历史文化">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="显微镜下的大明" name="1" icon="bar-chart-o">
                <van-card
                  price="36.90"
                  desc="于细微除读懂真正的古代中国"
                  title="显微镜下的大明"
                  thumb="http://img3m7.ddimg.cn/41/7/1502215547-1_b_1.jpg"
                  thumb-link="https://book.douban.com/subject/30414743/"
                  @click="goGoodsDetails(1)"
                />
              </van-collapse-item>
              <van-collapse-item title="鸟瞰古文明" name="2" icon="bar-chart-o">
                <van-card
                  price="68.99"
                  desc="古地中海文明三千纪的繁华与梦幻"
                  title="鸟瞰古文明"
                  thumb="http://img3m9.ddimg.cn/61/7/1574715049-1_b_1.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="汴京之围" name="3" icon="bar-chart-o">
                <van-card
                  price="61.00"
                  desc="北宋末年的外交、战争和人"
                  title="汴京之围"
                  thumb="http://img3m1.ddimg.cn/18/12/1901150181-1_b_1.jpg"
                />
              </van-collapse-item>
            </van-collapse>
          </van-tab>

          <van-tab title="传记人物">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="你当像鸟飞往你的山" name="4" icon="bar-chart-o">
                <van-card
                  price="59.00"
                  desc="找到真正的自我！"
                  title="你当像鸟飞往你的山"
                  thumb="http://img3m2.ddimg.cn/0/27/28473192-1_b_3.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="我心归处是敦煌" name="5" icon="bar-chart-o">
                <van-card
                  price="61.20"
                  desc="“敦煌的女儿”的唯一自转"
                  title="我心归处是敦煌"
                  thumb="http://img3m6.ddimg.cn/36/4/27931896-1_b_9.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="成为" name="6" icon="bar-chart-o">
                <van-card
                  price="83.50"
                  desc="追溯历史，冲破阶层，向前向上"
                  title="成为"
                  thumb="http://img3m7.ddimg.cn/26/36/26438867-1_b_5.jpg"
                />
              </van-collapse-item>
            </van-collapse>
          </van-tab>
          <van-tab title="推理悬疑">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="网内人" name="7" icon="bar-chart-o">
                <van-card
                  price="46.50"
                  desc=" 每个人都是网络暴力潜在的施暴者与受害人"
                  title="网内人"
                  thumb="http://img3m1.ddimg.cn/59/11/27919841-1_b_3.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="克莱因壶" name="8" icon="bar-chart-o">
                <van-card
                  price="81.80"
                  desc="第67回日本推理作家协会奖桂冠之作 "
                  title="克莱因壶"
                  thumb="http://img3m1.ddimg.cn/96/2/28473981-1_b_3.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="喜鹊谋杀案" name="9" icon="bar-chart-o">
                <van-card
                  price="66.10"
                  desc="一场阿加莎·克里斯蒂式的谋杀盛宴"
                  title="喜鹊谋杀案"
                  thumb="http://img3m0.ddimg.cn/6/8/27876030-1_b_3.jpg"
                />
              </van-collapse-item>
            </van-collapse>
          </van-tab>
          <van-tab title="科幻奇幻">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="醉步男" name="10" icon="bar-chart-o">
                <van-card
                  price="43.80"
                  desc="时间旅行小说的不朽经典，诡异硬核"
                  title="醉步男"
                  thumb="http://img3m1.ddimg.cn/78/33/27920751-1_b_5.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="呼吸" name="11" icon="bar-chart-o">
                <van-card
                  price="37.80"
                  desc="融科幻的诗意和哲学的浪漫为一体"
                  title="呼吸"
                  thumb="http://img3m4.ddimg.cn/37/34/28482634-1_b_6.jpg"
                />
              </van-collapse-item>
              <van-collapse-item title="群星" name="12" icon="bar-chart-o">
                <van-card
                  price="45.00"
                  desc="文明之间，没有对抗，只有碾压"
                  title="群星"
                  thumb="http://img3m1.ddimg.cn/93/29/28486551-1_b_3.jpg"
                />
              </van-collapse-item>
            </van-collapse>
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
      activeNames: ["1"],
      imageURL: "/assets/imgs/rank-1-1.png",
      item: {
        mallPrice: 13.9,
        image: require("@/assets/imgs/hotGoods1.jpeg"),
        goodsId: "1",
        price: 13.9,
        name: "书"
      },
      list: [
        {
          mallPrice: 13.9,
          image: require("@/assets/imgs/hotGoods1.jpeg"),
          goodsId: "1",
          price: 13.9,
          name: "书"
        }
      ],
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
  created() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {});
        console.log(this.scroll);
      }
    });
  },
  computed: {},
  watch: {},
  methods: {
    // 退回到上一页
    back() {
      this.$router.go(-1);
    },
    goGoodsDetails(item) {
      this.$router.push({
        name: "GoodsDetails",
        query: { goodsId: item }
      });
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
