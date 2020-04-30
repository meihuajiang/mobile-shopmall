<template>
  <div class="goodsDetails">
    <top-bar title="商品详情页" hasBack></top-bar>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
export default {
  name: "index",
  // eslint-disable-next-line vue/no-unused-components
  components: { TopBar, Loading },
  data() {
    return {
      loadingStatus: true,
      active: 1
    };
  }
};
</script>

<style scoped></style>
