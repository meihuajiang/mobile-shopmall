<template>
  <div>
    <!-- 顶部搜素 -->
    <header class="header">
      <section class="city" @click="changeCity">
        {{ locationCity ? locationCity.data : "北京" }}
      </section>
      <section class="search-box">
        <van-icon name="search" class="search-icon" />
        <!--改成@click效果更好-->
        <input class="box" type="text" @click="showSearch" placeholder="请输入搜索关键词" v-model="searchKeyword"/>
        <van-icon name="clear" class="clear" @click="clearSearchInput" v-show="searchKeyword"/>
      </section>
      <!-- 取消 -->
      <transition name="cancel-bounce">
        <section class="cancel" v-show="isShowSearch" @click="cancelSearch">
          取消
        </section>
      </transition>
    </header>
    <!-- 内容区 -->
    <!--<section class="content" v-if="homeData" @touchstart.prevent="touchstart" @touchmove.prevent="touchmove" @touchend.prevent="touchend">-->
    <section
      class="content"
      @touchstart.prevent="touchstart"
      @touchmove.prevent="touchmove"
      @touchend.prevent="touchend"
    >
      <b-scroll
        class="content-scroll"
        ref="homeScrollRef"
        v-if="homeData"
        :data="homeData.hotGoods"
        :probeType="probeType"
        :pullup="true"
        :bounce="bounce"
        :listenScroll="true"
        v-on:scroll="contentScroll"
        v-on:scrollEnd="homeScrollEnd"
      >
        <div class="container">
          <!-- 轮播图 -->
          <!--<banner :slides="homeData.slides"></banner>-->
          <banner :slides="staticHomeDataSlides"></banner>
          <!-- 分类 -->
          <!--<category v-if="homeData.advertesPicture" :category="homeData.category" :advertesPicture="homeData.advertesPicture.PICTURE_ADDRESS"></category>-->
          <category :category="staticHomeDataCategory"></category>
          <!-- 推荐商品 -->
          <recommend :recommend="homeData.recommend"></recommend>
          <!-- 楼层商品 -->
          <div v-if="homeData.floorName">
            <floor
              v-for="(item, index) in Object.keys(homeData.floorName)"
              :key="index"
              :floorName="homeData.floorName[item]"
              :floor="homeData[item]"
              :num="index + 1"
            >
            </floor>
          </div>
          <!-- 热卖商品 -->
          <hot-goods :hotGoods="homeData.hotGoods"></hot-goods>
        </div>
      </b-scroll>

      <!-- 下拉刷新 -->
      <!-- <refresh></refresh> -->

      <!-- 加载状态 -->
      <loading :loadingStatus="loadingStatus" />
    </section>
    <!-- 搜索结果 -->
    <search
      v-show="isShowSearch"
      :searchResult="dataList"
      :searchKeyword="searchKeyword"
      :searchStatus="searchStatus"
      :isEmptySearchResult="isEmptySearchResult"
      :isloadMore="isloadMore"
      v-on:click-search="clickSearch"
      v-on:scrollEnd="searchScrollEnd"
    >
    </search>
  </div>
</template>

<script>
import Banner from "./Banner";
import Category from "./Category";
import Recommend from "./Recommend";
import Floor from "./Floor";
import HotGoods from "./HotGoods";
import Search from "./Search";
import Refresh from "./Refresh";
import BScroll from "@/components/BScroll";
import { GoodsMixin } from "@/mixins/goodsMixin";
import { loadMixin } from "@/mixins/loadMixin";
import { throttle } from "@/utils/tools"; // 导入节流函数
import ajax from "@/api";

export default {
  name: "Home",
  mixins: [GoodsMixin, loadMixin],
  // eslint-disable-next-line vue/no-unused-components
  components: {
    Banner,
    Category,
    Recommend,
    Floor,
    HotGoods,
    Search,
    // eslint-disable-next-line vue/no-unused-components
    Refresh,
    BScroll
  },
  data() {
    return {
      homeData: {}, // 首页数据，正常写法
      staticHomeDataSlides: [
        {
          image:
            "http://img63.ddimg.cn/upload_img/00785/ts0428_0510/1242x366-1587972958.jpg",
          goodsId: "b1195296679f482aa7d54d95ac2b4a94"
        },
        {
          image: require("@/assets/imgs/slides1.jpeg"),
          goodsId: "b11sf4d1f510vd6a7d51vd5s1v165a14"
        },
        {
          image:
            "http://img63.ddimg.cn/upload_img/00803/1/1242x366-1588053862.jpg",
          goodsId: "da34d6f381464a219b37a9ac0ad579e8"
        },
        {
          image:
            "http://img60.ddimg.cn/upload_img/00817/ershoushu/100-1564985916.jpg",
          goodsId: "ad176e397858448a854dc50371334faf"
        },
        {
          image:
            "http://img60.ddimg.cn/upload_img/00478/0609/czs-750x315-1587892307.jpg",
          goodsId: "ada1s639df58448a854dc5156165461d"
        },
        {
          image: "http://img63.ddimg.cn/topic_img/gys_04584/750x315zyhrj.jpg",
          goodsId: "ada1s6csa1548a8541984062cdf8v1d5"
        }
      ],
      staticHomeDataCategory: [
        {
          mCategoryId: "1",
          image: require("@/assets/imgs/category1.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "2",
          image: require("@/assets/imgs/category2.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "3",
          image: require("@/assets/imgs/category3.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "4",
          image: require("@/assets/imgs/category4.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "5",
          image: require("@/assets/imgs/category5.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "6",
          image: require("@/assets/imgs/category6.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "7",
          image: require("@/assets/imgs/category7.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "8",
          image: require("@/assets/imgs/category8.jpg"),
          CategoryName: "1"
        },
        {
          CategoryId: "9",
          image: require("@/assets/imgs/category9.png"),
          CategoryName: "1"
        },
        {
          CategoryId: "10",
          image: require("@/assets/imgs/category10.jpg"),
          CategoryName: "1"
        }
      ],
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
    // 监听定位城市变化 | 值在 GoodsMixin 中
    // eslint-disable-next-line no-unused-vars
    locationCity(newCity, old) {
      this._getHome();
    }
  },
  created() {
    this._getHome();
    // 如果缓存中不存在定位城市,则执行定位函数
    !this.locationCity && this._getLocCity();

    // 监听输入框变化做函数节流 实现 搜索联想
    this.unWatch = this.$watch(
      "searchKeyword",
      throttle(
        () => {
          this.dataList = []; // 发送搜索请求前先清空上一次搜索结果数组
          this.isEmptySearchResult = false; // 发送搜索请求之前设为 false
          this.isloadMore = false;
          if (this.searchKeyword) {
            this.page = 1;
            this._search(this.searchKeyword, false);
          }
        },
        1000,
        1000
      )
    );
  },
  destroyed() {
    // 注销 watch
    this.unWatch();
  },
  methods: {
    /**
     * ip 定位城市
     */
    async _getLocCity() {
      try {
        const res = await ajax.ipLocationCity();
        // 方法在 goodsMixin 中
        if (res.code !== 200) return this.$toast(res.msg);

        this.$dialog
          .confirm({
            title: "Tip",
            message: `定位到您所在城市：${res.locationCity}`,
            confirmButtonText: "确认",
            confirmButtonColor: "#F79709"
          })
          .then(() => {
            this.setLocationCity(res.locationCity);
          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => this.$router.push({ name: "City" }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    /**
     * 获取首页数据
     */
    async _getHome() {
      try {
        let res = await ajax.getHomeData();
        if (res.code === 200) {
          this.homeData = res.result;
          this.loadingStatus = false;
        }
      } catch (error) {
        this.loadingStatus = false;
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    /**
     * @param {String} keyWord 搜索关键字
     * @param {Boolean} isLoadMore 是否加载更多
     */
    async _search(keyWord, isLoadMore) {
      // 判断上一次请求是否完成 | 必须等待上一次请求完成才继续向下执行，方法在 loadMixin 中
      if (this.isLocked()) return;
      // 上锁，方法在 loadMixin 中
      this.locked();
      // 设置搜索状态
      keyWord && !this.dataList.length && (this.searchStatus = true);

      try {
        //let res = await ajax.search(keyWord, this.page);
        let res = await ajax.search1(keyWord);
        console.log(res.result);
        //if (res.code === 200) {
        //console.log("hah");
        this.setDataTotal(res.result.total); // 设置数据总数，方法在 loadMixin 中
        // 判断是加载更多还是一次新的请求，方法在 loadMixin 中
        isLoadMore
          ? //? this.addMoreData(res.result.goodsList)
            this.addMoreData(res.result)
          : //: (this.dataList = res.result.goodsList);
            (this.dataList = res.result);
        this.searchStatus = false;
        // 解锁，方法在 loadMixin 中
        this.unLocked();
        // 判断是否无搜索结果 | 无结果则赋于 true
        !this.dataList.length && (this.isEmptySearchResult = true);
        //}
      } catch (error) {
        this.searchStatus = false;
        // 解锁，方法在 loadMixin 中
        this.unLocked();
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    /**
     * 输入框聚焦展示搜索区
     */
    showSearch() {
      this.isShowSearch = true;
    },
    /**
     * 清空搜索框关键字
     */
    clearSearchInput() {
      this.searchKeyword = "";
    },
    /**
     * 取消搜索
     */
    cancelSearch() {
      // 关闭搜索区
      this.isShowSearch = false;
      // 300 ms后搜索关键字设为空字符串
      setTimeout(() => {
        this.searchKeyword = "";
      }, 300);
    },
    /**
     * 监听子组件派发的事件
     */
    clickSearch(searchKeyword) {
      this.searchKeyword = searchKeyword;
    },
    /**
     * 首页滚动到底部 | 处理子组件派发的事件 | 重新计算 better-scroll
     */
    homeScrollEnd() {
      this.$refs.homeScrollRef.refresh();
    },
    /**
     * 搜索滚动到底部 | 处理子组件派发的事件 | 加载更多
     */
    searchScrollEnd() {
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
    },
    /**
     * 切换城市
     */
    changeCity() {
      this.$router.push({ name: "City" });
      //this.$router.push({ name: "Rank" });
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
    touchend() {}
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
