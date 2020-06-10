<template>
  <div class="comment-goods">
    <top-bar title="评价商品" hasBack></top-bar>
    <!-- 商品评分 -->
    <section class="top-goods">
      <div class="goods-img">
        <van-image src="goodsInfo.image_path" width="90" height="90">
          <template v-slot:error>加载失败</template>
        </van-image>
        <!--<img :src="goodsInfo.image_path" :onerror="defImg" />-->
      </div>
      <div class="goods-rate">
        <p class="rate-txt">商品评价</p>
        <van-rate
          v-model="rate"
          allow-half
          color="#F79709"
          @change="onChange"
        />
        <p class="rate-txt-down">{{ rateText }}</p>
      </div>
    </section>
    <!-- 评论框 -->
    <section class="comment-area">
      <div class="comment-text">
        <van-field
          class="def-sty"
          v-model="content"
          type="textarea"
          rows="6"
          maxlength="120"
          placeholder="描述一下你的购买感受吧~~~"
        />
        <van-uploader
          v-model="imgList"
          :max-count="5"
          :after-read="afterRead"
        />
      </div>
    </section>
    <section class="submit-area">
      <!-- 匿名评价 -->
      <section class="check-box">
        <van-checkbox v-model="checked" checked-color="#F79709"
          >匿名评价</van-checkbox
        >
      </section>
      <!-- 提交评论 -->
      <section class="submit-btn1" @click="submit">提交评论</section>
    </section>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import ajax from "@/api";
// eslint-disable-next-line no-unused-vars
import { Toast } from "vant";
export default {
  name: "CommentGoods",
  components: { TopBar },
  props: ["goodsId", "order_id", "orderNum"],
  data() {
    return {
      goodsInfo: {}, // 商品信息
      rate: 5, // 商品评分
      content: "", // 评论内容
      imgList: [], // 图片
      checked: false, // 是否匿名
      defImg: 'this.src="' + require("../../assets/imgs/error-img.png") + '"',
      rateText: "非常满意"
    };
  },
  created() {
    this._getGoodsDetails();
  },
  methods: {
    /**
     * 商品详情
     */
    async _getGoodsDetails() {
      const goodsId = this.goodsId;
      try {
        const res = await ajax.getGoodsDetails(goodsId);
        if (res.code === 200) this.goodsInfo = res.result;
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line no-unused-vars
    afterRead(file, detail) {
      // TO DO
    },
    /**
     * 提交评论
     */
    async submit() {
      if (!this.content) return this.$toast("请输入评论的内容~~");

      const args = {
        goodsId: this.goodsId,
        rate: this.rate,
        content: this.content,
        anonymous: this.checked,
        images: this.imgList,
        order_id: this.order_id,
        orderNum: this.orderNum
      };
      try {
        const res = await ajax.commentGoods(args);
        if (res.code === 200) {
          this.$toast(res.msg);

          setTimeout(() => {
            this.$router.back();
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onChange(rate) {
      //Toast("当前值：" + rate);
      if (rate > 4 && rate <= 5) {
        this.rateText = "非常满意";
      } else if (rate > 3 && rate <= 4) {
        this.rateText = "满意";
      } else if (rate > 2 && rate <= 3) {
        this.rateText = "一般";
      } else if (rate > 1 && rate <= 2) {
        this.rateText = "比较不满意";
      } else {
        this.rateText = "非常不满意";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
