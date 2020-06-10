<template>
  <!-- 分类列表 -->
  <div id="category">
    <ul v-show="category && category.length">
      <li v-for="(item, index) in category" :key="item.CategoryId">
        <img v-lazy="item.image" alt="" @click="clickCategory(item, index)" />
        <!--<p>{{ item.CategoryName }}</p>-->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    category: { type: Array, default: () => [] }
  },
  methods: {
    clickCategory(item, index) {
      // 默认取大分类的第一个子分类 id
      //let categorySubId = item.SubList[0].SubId;
      let categorySubId = item.CategoryId;
      console.log(categorySubId, index);
      this.$router.push({
        name: "Category",
        params: { categorySubId, index, item }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
