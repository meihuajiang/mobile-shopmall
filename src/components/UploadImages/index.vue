<template>
  <div class="avatar">
    <div
      class="hasPic"
      v-if="imgUrls.length > 0"
      v-for="(item, index) in imgUrls"
    >
      <img
        class="seledPic"
        ref="picture"
        :src="item ? item : require('@/assets/imgs/imagebj.jpg')"
        name="avatar"
        @click="bigImg(index)"
      />
      <img
        class="delect"
        src="../../../static/Images/del.png"
        @click="delect(index)"
      />
    </div>
    <div
      class="imgMask"
      v-if="showBigImg"
      @click.stop="showBigImg = !showBigImg"
    >
      <div class="showImg">
        <mt-swipe
          :auto="0"
          :show-indicators="false"
          @change="handleChange"
          :continuous="false"
          :defaultIndex="num"
        >
          <mt-swipe-item v-for="(item, index) in imgUrls" :key="item.id">
            <div class="num">{{ index + 1 + "/" + imgUrls.length }}</div>
            <img :src="imgUrls[index]" class="img" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="selPic" v-if="imgUrls.length < 6">
      <img src="../../../static/Images/imagebj.jpg" name="avatar" />
      <span>{{ pictureNums }}</span>
      <input
        type="file"
        maxlength=""
        class="input-file"
        multiple="multiple"
        name="avatar"
        ref="avatarInput"
        @change="changeImage($event)"
        accept="image/gif,image/jpeg,image/jpg,image/png"
      />
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { MessageBox, Toast } from "vant";
// eslint-disable-next-line no-unused-vars
import { Swipe, SwipeItem } from "vant";
//import "mint-ui/lib/style.css";
export default {
  name: "upload",
  data() {
    return {
      showBigImg: false,
      maxImages: 6,
      leftImages: 0,
      pictureNums: "上传图片",
      imgUrls: [],
      num: 0,
      avatar: "",
      file: "",
      showBg: false,
      imgData: {
        avatar: require("@/assets/imgs/imagebj.jpg")
      }
    };
  },
  props: ["uploadType", "imgUrl"],
  created() {
    this.avatar = this.imgUrl;
  },
  methods: {
    changeImage: function(e) {
      if (e.target.files.length <= this.maxImages - this.imgUrls.length) {
        for (var i = 0; i < e.target.files.length; i++) {
          let file = e.target.files[i];
          this.file = file;
          console.log(this.file);

          let reader = new FileReader();
          let that = this;
          reader.readAsDataURL(file);
          // eslint-disable-next-line no-unused-vars
          reader.onload = function(e) {
            console.log(this.result);
            that.imgUrls.push(this.result);
          };
        }
        // 剩余张数
        this.leftImages =
          this.maxImages - (this.imgUrls.length + e.target.files.length);
        this.pictureNums =
          String(
            this.maxImages - (this.imgUrls.length + e.target.files.length)
          ) +
          "/" +
          String(this.maxImages);
      } else {
        Toast("只能选择" + (this.maxImages - this.imgUrls.length) + "张了");
      }
    },
    delect(index) {
      this.imgUrls.splice(index, 1);
      this.leftImages++;
      if (this.leftImages === this.maxImages) {
        this.pictureNums = "上传图片";
      } else {
        this.pictureNums =
          String(this.leftImages) + "/" + String(this.maxImages);
      }
    },
    handleChange(index) {
      this.num = index;
    },
    bigImg(index) {
      this.showBigImg = true;
      this.num = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
