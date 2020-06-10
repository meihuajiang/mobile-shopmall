<template>
  <div class="goods">
    <!--<top-bar title="商品详情页" hasBack></top-bar>-->

    <div id="wiper-wrapper">
      <img :src="item.imgUrl" alt="" />
      <h1 class="name">{{ item.title }}</h1>
      <p class="price">
        <span class="code">￥</span>
        <span class="mall-price">{{ item.mallPrice }}</span>
        <span class="min-price">￥{{ item.price }}</span>
      </p>
      <p class="text">{{ item.text }}</p>
    </div>
    <p class="title">用户书评</p>
    <div
      class="comment_area"
      v-for="(comment, index) in item.comments"
      :key="index"
    >
      <p class="user">{{ comment.user }}</p>
      <p class="comment_detail">{{ comment.comment_detail }}</p>
    </div>
    <!--<div id="button">
      <button id="add">加入购物车</button>
      <button @click="jump(item.id)" id="buy">立即购买</button>
    </div>-->

    <!-- 后退 -->
    <back @backEvt="back" />
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="jump(item.id)"
      />
    </van-goods-action>
  </div>
</template>

<script>
import Back from "@/components/Back";
import TopBar from "@/components/TopBar";
import BScroll from "@/components/BScroll";
import { GoodsMixin } from "@/mixins/goodsMixin";
export default {
  name: "GoodsDetails",
  mixins: [GoodsMixin],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TopBar, BScroll, Back
  },
  data() {
    return {
      title: " ",
      item: {
        id: 1,
        title: "夏目友人帐",
        text: "只要有想见的人，就不再会是孤身一人了",
        mallPrice: 16,
        price: 29,
        imgUrl: require("@/assets/imgs/xiamu.png"),
        comments: [
          { user: "用户1", comment_detail: "评论1" },
          { user: "用户2", comment_detail: "评论2" },
          { user: "用户1", comment_detail: "评论1" },
          { user: "用户2", comment_detail: "评论2" },
          { user: "用户1", comment_detail: "评论1" },
          { user: "用户2", comment_detail: "评论2" },
          { user: "用户1", comment_detail: "评论1" },
          { user: "用户2", comment_detail: "评论2" },
          { user: "用户1", comment_detail: "评论1" },
          { user: "用户2", comment_detail: "评论2" }
        ]
      }
    };
  },
  created() {
    // 接收GoodsInfo.vue传过来的goodsId
    this.id = this.$route.query.id;
  },
  methods: {
    jump(value) {
      this.$router.push({
        name: "Order",
        query: { id: value }
      });
    },
    back() {
      this.$router.push({
        name: "Home"
      });
    }
    /**
     * 首页滚动到底部 | 处理子组件派发的事件 | 重新计算 better-scroll
     */
    /*homeScrollEnd() {
      this.$refs.homeScrollRef.refresh();
    },*/
    /**
     * 搜索滚动到底部 | 处理子组件派发的事件 | 加载更多
     */
    /*searchScrollEnd() {
      if (this.dataList.length >= 10) {
        // 判断是否还有更多数据，方法在 loadMixin 中
        if (this.hasMoreData()) {
          this.isloadMore = true;
          this.page++;
          this._search(this.searchKeyword, true);
        } else {
          this.isloadMore = false;
          this.$toast("没有更多数据了~~");
        }
      }
    },*/
    // eslint-disable-next-line no-unused-vars
    /*contentScroll(pos) {},
    touchstart(event) {
      this.touch.init = true;
      this.touch.startY = event.touches[0].pageY;
    },*/
    /**
     * 触摸移动 | 当用户在触摸平面上移动触点时触发
     */
    /*touchmove(event) {
      let moveY = event.touches[0].pageY;
      let distanceY = moveY - this.touch.startY;
      this.translateY = Math.max(0, distanceY / 3.5);
      this.rotate = Math.max(0, Math.min(360, distanceY));
      this.translateY > 80 && (this.isRotate = true);
      this.opac = distanceY / 320;
    },*/
    /**
     * 触摸结束 | 当一个触点被用户从触摸平面上移除
     */
    /*touchend() {}*/
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
