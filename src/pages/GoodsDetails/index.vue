<template>
  <div class="goods">
    <!--<top-bar title="商品详情页" hasBack></top-bar>-->
    <b-scroll class="content-scroll" ref="scrollRef">
      <div class="container">
        <div>
          <div id="picture">
            <img :src="item.imgUrl" alt="" />
          </div>
          <h1 class="name">{{ item.title }}</h1>
          <p class="detail">
            <span class="code">￥</span>
            <span class="price">{{ item.price }}</span>
            <span class="count">库存：{{ item.count }}</span>
          </p>
          <p class="text">分类：{{ item.category }}</p>
          <p class="text">详情：{{ item.text }}</p>
        </div>
        <p class="title">用户书评</p>
        <div
          class="comment_area"
          v-for="(comment, index) in item.comments"
          :key="index"
        >
          <p class="user">{{ comment.user }}</p>
          <img class="stars" :src="comment.star" />
          <p class="comment_detail">{{ comment.comment_detail }}</p>
        </div>
        <div id="blank"></div>
      </div>
    </b-scroll>

    <!-- 后退 -->
    <back @backEvt="back" />
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="评价"
        @click="goCommentGoods(item.id,item,id,item.count)"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="cart()"
      />
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
import { post } from "../../utils/http";
import { Toast } from "vant";
export default {
  name: "GoodsDetails",
  mixins: [GoodsMixin],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TopBar,
    BScroll,
    Back
  },
  props: ["goodsId"],
  data() {
    return {
      title: " ",
      user_id: this.global.log_id,
      item: {
        id: "",
        title: "夏目友人帐",
        text: "只要有想见的人，就不再会是孤身一人了",
        price: 29,
        count: 12,
        category_id: "",
        category: "",
        imgUrl: require("@/assets/imgs/xiamu.png"),
        comments: []
      },
      stars: require("@/assets/imgs/stars.png"),
      listenScroll: true, // 监听滚动位置
      scrollY: 0, // 实时滚动的 Y 坐标
      probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      bounce: { top: true }, // 当滚动超过边缘的时候顶部会有一小段回弹动画
      page: 1, // 数据页数
      searchKeyword: "", // 搜素关键字
      isShowSearch: false, // 是否显示搜索区
      isEmptySearchResult: false, // 是否无搜索结果
      isloadMore: false, // 是否加载更多
      searchStatus: false, // 搜索状态
      touch: {},
      isRotate: false,
      isTrans: false,
      translateY: 0,
      rotate: 0,
      opac: 0
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      to.name === "GoodsDetails" &&
        this._goodsDetails(this.$route.query.goodsId || this.$route.query.id);
    }
  },
  created() {
    this._goodsDetails(this.goodsId);
  },
  methods: {
    cart() {
      try {
        post("https://af2pds.toutiao15.com/add_cart", {
          user_id: this.user_id,
          commodity_id: this.item.id
        }).then(response => {
          if (response.result) Toast("已加入购物车！");
          else Toast("请登录！");
        });
      } catch (e) {
        Toast("添加失败！");
      }
    },
    jump(value1) {
      this.$router.push({
        name: "Order",
        query: { id: value1 }
      });
    },
    back() {
      this.$router.push({
        name: "Home"
      });
    },
    // eslint-disable-next-line no-unused-vars
    async _goodsDetails(goodsId) {
      this.item.id = this.$route.query.goodsId || this.$route.query.id;
      //this.item.id = goodsId;
      try {
        post("https://af2pds.toutiao15.com/get_commodity_byid", {
          id: this.item.id
        }).then(response => {
          let result = response.content;
          console.log(this.result);
          this.item.title = result.commodity_name;
          this.item.category_id = result.category_id;
          this.item.count = result.commodity_count;
          this.item.price = result.commodity_price;
          this.item.text = result.commodity_detail;
          this.item.imgUrl = result.commodity_photo;
          post("https://af2pds.toutiao15.com/get_category", {
            id: this.item.category_id
          }).then(response => {
            this.item.category = response.category_name;
          });
        });
        post("https://af2pds.toutiao15.com/get_review_bybookid", {
          id: this.item.id
        }).then(response => {
          if (response.result) {
            let result = response.views;
            for (let i = 0; i < result.length; i++) {
              let comment = {
                user: "用户1",
                star: require("@/assets/imgs/stars.png"),
                comment_detail: result[i].review_content
              };
              switch (result[i].review_star) {
                case 1:
                  comment.star = require("@/assets/imgs/star1.png");
                  break;
                case 2:
                  comment.star = require("@/assets/imgs/star2.png");
                  break;
                case 3:
                  comment.star = require("@/assets/imgs/star3.png");
                  break;
                case 4:
                  comment.star = require("@/assets/imgs/star4.png");
                  break;
                case 5:
                  comment.star = require("@/assets/imgs/star5.png");
              }

              post("https://af2pds.toutiao15.com/get_user_byid", {
                id: result[i].user_id
              }).then(response => {
                comment.user = response.user_name;
                this.item.comments.push(comment);
              });
            }
          }
        });

        if (this.item) {
          document.title = this.item.title;
          // 添加该商品到浏览历史 | 方法在 GoodsMixin 中
          setTimeout(() => {
            this.setBrowseHistory(this.item);
          }, 300);
        }
      } catch (error) {
        this.loadingStatus = false;
        error.code === 404 && this.$toast(error.message);
        console.log(error);
      }
    },
    /**
     * 首页滚动到底部 | 处理子组件派发的事件 | 重新计算 better-scroll
     */
    homeScrollEnd() {
      this.$refs.homeScrollRef.refresh();
    },
    /**
     * 监听子组件派发事件 | 获取实时滚动位置坐标
     *  @param {Object} pos 滚动的实时坐标
     */
    // eslint-disable-next-line no-unused-vars
    contentScroll(pos) {},
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
    touchend() {},
    goCommentGoods(goods_id0, order_id0, orderNum0) {
      this.$router.push({
        name: "CommentGoods",
        params: { goodsId: goods_id0, order_id: order_id0, orderNum: orderNum0 }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
