<template>
  <div>
    <h1 class="login">这里是登录页面</h1>
    <ul>
      <li
        class="hot-goods-item"
        v-for="item of info"
        :key="item._id"
      >
        <img
          v-lazy="item.image"
          height="180"
          width="300"
          class="hot-goods-img"
        />
        <p class="name">{{ item.name }}</p>
        <p class="price">
          <span class="code">￥</span>
          <span class="min-price">{{ item.price }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { get, post } from "@/utils/http";
// eslint-disable-next-line no-unused-vars
import ajax from "@/api";
export default {
  name: "index",
  data() {
    return {
      info: null
    };
  },
  created() {
    this._getData();
  },
  /*mounted() {
    try {
      // 发出一个 POST 请求，并设置请求体
      // 请注意将示例中的 URL 地址和参数更换为你的真实请求地址和参数
      const result = post(
        "https://afgwgu.toutiao15.com/searchTest",{name:"p"}
      ).then(response => (this.info = response));
      console.log(result.result);
      return result.result;
    } catch (error) {
      return {
        error: error.message
      };
    }
  },*/
  methods: {
    async _getData() {
      try {
        //let res = await ajax.TestFor();
        let res = await ajax.search1("p");
        //if (res.code === 200){
        console.log(res.code);
        this.info = res.result;
        console.log(res.result);
        //}
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }
};
</script>

<style scoped></style>
