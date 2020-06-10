<template>
  <div>
    <header>
      <!-- <i class="iconfont icon-fanhui fz" @click="$router.go(-1)" v-show="isBack"></i> -->
      <i class="back-icon" @click="$router.go(-1)" v-show="isBack"></i>
      <span class="title">
        {{ title }}
      </span>
      <span class="set" v-show="isSet" @click="toSet(newSet)">
        {{ newSet }}
      </span>
    </header>
    <!-- 此处是占位符 -->
    <div class="zanweifu"></div>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  data: function() {
    return {
      name: ""
    };
  },
  props: ["title", "set", "isBack", "isSet"],
  computed: {
    newTitle() {
      return this.title;
    },
    newSet() {
      return this.set;
    }
  },
  methods: {
    toSet: function(val) {
      let _this = this;
      console.log(val);
      let data = {
        newSet: val
      };
      _this.$emit("newSet", data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
