<template>
  <div class="category">
    <top-bar title="商品分类"></top-bar>
    <!-- 内容区 -->
    <div class="content">
      <!-- 左侧导航栏 -->
      <section class="left">
        <ul>
          <li
            v-for="(item, index) in categoryList"
            :key="item.CategoryId"
            :class="{ active: sidebarIndex === index }"
            @click="switchSideNav(item, index)"
          >
            {{ item.CategoryName }}
          </li>
          <!-- 侧边栏导航标记 -->
          <article class="sidebar-tag" ref="sideTagRef"></article>
        </ul>
      </section>
      <!-- 右侧内容 -->
      <section class="right">
        <van-tabs
          v-model="curTabIndex"
          color="#F79709"
          @click="onCategorySubClick"
        >
          <van-tab
            v-for="(item, index) in categorySubList"
            :key="index"
            :title="item.SubName"
          ></van-tab>
        </van-tabs>
        <div class="scroll-wrapper">
          <b-scroll
            class="content-scroll"
            :data="goodsList"
            v-if="!isEmptyGoodsList && goodsList.length"
          >
            <div class="container">
              <goods-list :goodsList="goodsList"></goods-list>
            </div>
          </b-scroll>
          <article class="no-data" v-show="isEmptyGoodsList">
            暂无数据~~
          </article>

          <!-- 加载状态 -->
          <loading :loadingStatus="loadingStatus" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import BScroll from "@/components/BScroll";
import GoodsList from "@/components/GoodsList";
import { GoodsMixin } from "@/mixins/goodsMixin";
import ajax from "@/api";

export default {
  name: "Category",
  mixins: [GoodsMixin],
  components: { TopBar, BScroll, GoodsList },
  data() {
    return {
      sidebarIndex: 0, // 侧边栏导航下标
      categorySubList: [], // 子分类列表
      curTabIndex: 0, // 当前子分类激活下标
      curTabIndexCopy: 0, // 当前子分类激活下标副本 | 对重复点击相同子分类做节流
      goodsList: [], // 商品列表
      isEmptyGoodsList: false, // 是否为空商品列表
      categoryList: [
        {
          CategoryId: "1",
          CategoryName: "小说",
          SubList: [
            {
              SubId: "1",
              SubCategoryId: "1",
              SubName: "悬疑推理",
              comments: null
            },
            {
              SubId: "2",
              SubCategoryId: "2",
              SubName: "科幻奇幻",
              comments: null
            },
            {
              SubId: "3",
              SubCategoryId: "3",
              SubName: "爱情校园",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "2",
          CategoryName: "文学",
          SubList: [
            {
              SubId: "1",
              SubCategoryId: "1",
              SubName: "名家作品",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "3",
          CategoryName: "动漫",
          SubList: [
            {
              SubId: "1",
              SubCategoryId: "1",
              SubName: "热血漫画",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "4",
          CategoryName: "人文社科",
          SubList: [
            {
              SubId: "1",
              SubCategoryId: "1",
              SubName: "时间管理",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "6",
          CategoryName: "成功励志",
          SubList: [
            {
              SubId: "1",
              SubCategoryId: "1",
              SubName: "人生哲学",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "6",
          CategoryName: "文艺",
          SubList: [
            {
              SubId: "1",
              SubCategoryId: "1",
              SubName: "文学艺术",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "7",
          CategoryName: "童书",
          SubList: [
            {
              SubId: "1",
              subCategoryId: "1",
              SubName: "科普益智",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "8",
          CategoryName: "经管",
          SubList: [
            {
              SubId: "1",
              subCategoryId: "1",
              SubName: "经济管理",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "9",
          CategoryName: "教育",
          SubList: [
            {
              SubId: "1",
              subCategoryId: "1",
              SubName: "教材考试",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        },
        {
          CategoryId: "10",
          CategoryName: "电子书",
          SubList: [
            {
              SubId: "1",
              subCategoryId: "1",
              SubName: "网络文学",
              comments: null
            }
          ],
          comments: null,
          image:
            "http://images.baixingliangfan.cn/firstCategoryPicture/20180408/20180408111959_2837.png"
        }
      ]
    };
  },
  async created() {
    // 点击首页分类传递过来
    let { categorySubId, index, item } = this.$route.params;
    if (categorySubId && index && item) {
      console.log("123");
      try {
        console.log("1234");
        // 获取大分类列表
        //let res = await ajax.getHomeData();
        this.loadingStatus = true;
        let res = await ajax.getCategoryList(categorySubId);
        //res.code === 200 && this.setCategoryList(res.result.category);
        this.goodsList = res.result;
      } catch (error) {
        console.log(error);
      }
      // 切换左侧导航下标
      this.sidebarIndex = index;
      //this.sidebarIndex = categorySubId;
      this.$nextTick(() => {
        // 计算侧边导航标签距离顶部距离
        let top = (100 / this.categoryList.length) * index;
        this.$refs.sideTagRef.style.top = `${top}%`;
      });
      // 切换子分类列表
      this.categorySubList = item.SubList;
      this._getGoodsList(categorySubId);

      return;
    } else {
      this.loadingStatus = true;
      let res = await ajax.getCategoryList(categorySubId);
      console.log("123456");
      //res.code === 200 && this.setCategoryList(res.result.category);
      this.goodsList = res.result;
    }
    this._getCategoryList();
  },
  methods: {
    /**
     * 获取大分类列表 & 存到 Vuex 中
     */
    async _getCategoryList() {
      // 判断是否已存在大分类列表 | 调用 Vuex 中的 Getters，值在 GoodsMixin 中
      if (!this.categoryList.length) {
        try {
          let res = await ajax.getHomeData();
          if (res.code === 200) {
            // 设置大分类列表 | 调用 Vuex 中的 Actions，方法在 GoodsMixin 中
            this.setCategoryList(res.result.category);
            // 默认取第一个大分类的子分类列表
            this.categorySubList = res.result.category[0].SubList;
            // 默认取第一个子分类商品数据
            this._getGoodsList(this.categorySubList[0].SubId);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // 默认取第一个大分类的子分类列表
        this.categorySubList = this.categoryList[0].SubList;
        // 默认取第一个子分类商品数据
        this._getGoodsList(this.categorySubList[0].SubId);
      }
    },
    /**
     * 根据子分类 Id 获取对应分类商品数据
     */
    async _getGoodsList(categorySubId) {
      this.loadingStatus = true;
      try {
        let res = await ajax.getCategoryList(categorySubId);
        //if (res.code === 200) {
        this.goodsList = res.result;
        this.loadingStatus = false;
        // 判断是否为空商品列表
        this.isEmptyGoodsList = !this.goodsList.length ? true : false;
        //}
      } catch (error) {
        this.loadingStatus = false;
        console.log(error);
      }
    },
    /**
     * 切换侧边导航
     */
    switchSideNav(item, index) {
      // 节流
      if (this.sidebarIndex === index) return;

      // 切换左侧导航下标
      this.sidebarIndex = index;
      // 计算侧边导航标签距离顶部距离
      let top = (100 / this.categoryList.length) * index;
      this.$refs.sideTagRef.style.top = `${top}%`;
      // 切换子分类列表t
      this.categorySubList = item.SubList;
      // 切换为第一个子分类下标
      this.curTabIndex = 0;
      // 恢复初始化子分类下标副本
      this.curTabIndexCopy = 0;
      // 清空商品列表
      this.goodsList = [];
      // 默认获取大分类下的第一个子分类商品数据
      this._getGoodsList(item.SubList[0].SubId);
    },
    /**
     * 点击子分类
     */
    onCategorySubClick(index) {
      // 节流
      if (this.curTabIndexCopy === index) return;
      this.curTabIndexCopy = index;
      // 清空商品列表
      this.goodsList = [];
      this._getGoodsList(this.categorySubList[index].SubId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
