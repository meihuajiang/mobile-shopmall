<template>
  <div class="address">
    <div class="addrAdd">
      <van-nav-bar
        title="地址信息"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        address-info
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import areaList from "@/assets/js/area";
import { post } from "../../utils/http";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      default: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "AddressManage" });
    },
    onSave(content) {
      var addrdetail = content.province + content.city + content.addressDetail;
      post("https://af2pds.toutiao15.com/add_address", {
        id: "123456",
        name: content.name,
        telephone_num: content.tel,
        ad: addrdetail,
        d: content.isDefault
      }).then(response => {
        //console.log(content);
        console.log(response);
        if (response.result) {
          Toast("保存成功!");
          this.$router.push({ name: "AddressManage" });
        } else {
          Toast("保存失败!");
        }
      });
    },
    onDelete() {
      Toast("删除成功!");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "华南理工大学",
            address: "广州市番禺区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
