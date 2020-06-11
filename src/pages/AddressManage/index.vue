<template>
  <div class="address">
    <div class="addrlist">
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-address-list
        v-model="chosenAddressId"
        default-tag-text="默认"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { post } from "../../utils/http";
import Vue from "vue";
Vue.use(Toast);

export default {
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  created() {
    try {
      post("https://af2pds.toutiao15.com/get_address", {
        id: "123456"
      }).then(response => {
        var result = response.content;
        console.log(response);
        result.forEach(item => {
          var addr = {
            id: item._id,
            name: item.name,
            tel: item.telephone_num,
            address: item.address_description,
            isDefault: item.default_wenhao
          };
          this.list.push(addr);
        });
      });
    } catch (error) {
      Toast("error");
      return {
        error: error.massage
      };
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "User" });
    },
    onAdd() {
      this.$router.push({ name: "AddressAdd" });
    },
    onEdit(item) {
      //Toast("编辑地址:" + index);
      this.$router.push({ name: "AddressEdit", params: { addr: item } });
    }
    // onSelect(item, index) {
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
