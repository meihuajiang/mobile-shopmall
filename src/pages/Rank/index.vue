<template>
  <div class="rank">
    <top-bar title="排行榜" hasBack></top-bar>
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
  </div>
</template>

<script>
//import cityData from "@/assets/js/city";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
//import BScroll from "@/components/BScroll";
//import { GoodsMixin } from "@/mixins/goodsMixin";
//import { throttle } from "@/utils/tools"; // 导入节流函数

export default {
  name: "Rank",
  //mixins: [GoodsMixin],
  // eslint-disable-next-line vue/no-unused-components
  components: { TopBar, Loading },
  data() {
    return {
      loadingStatus: true,
      active: 1,
      list: [],
      loading: false,
      finished: false
    };
  },
  computed: {},
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
    }
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
