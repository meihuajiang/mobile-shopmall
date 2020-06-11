<template>
  <div class="address2">
    <div class="addrEdit">
      <van-nav-bar
        title="地址信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-delete
        :address-info="AddressInfo"
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
//import Axios from "axios";
import { post } from "../../utils/http";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      default: [],
      AddressInfo: {
        id: "",
        name: "",
        tel: "",
        address: "",
        isDefault: false
      }
    };
  },
  created() {
    console.log(this.$route.params.addr);
    var addr = this.$route.params.addr;
    this.AddressInfo.id = addr.id;
    this.AddressInfo.name = addr.name;
    this.AddressInfo.tel = addr.tel;
    this.AddressInfo.address = addr.address;
    this.AddressInfo.isDefault = addr.isDefault;
    //this.AddressInfo.postalCode = "241100";
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "AddressManage" });
    },
    onSave(content) {
      post("https://af2pds.toutiao15.com/delete_address", {
        id: "123456",
        name: this.AddressInfo.name,
        telephone_num: this.AddressInfo.tel
      }).then(response => {
        if (!response.result) {
          Toast("error!");
        }
      });
      var addrdetail = content.province + content.city + content.addressDetail;
      post("https://af2pds.toutiao15.com/add_address", {
        id: "123456",
        name: content.name,
        telephone_num: content.tel,
        ad: addrdetail,
        d: content.isDefault
      }).then(response => {
        if (response.result) {
          Toast("error!");
        }
        this.$router.push({ name: "AddressManage" });
      });
    },
    onDelete() {
      post("https://af2pds.toutiao15.com/delete_address", {
        id: "123456",
        name: this.AddressInfo.name,
        telephone_num: this.AddressInfo.tel
      }).then(response => {
        if (response.result) {
          Toast("删除成功!");
          this.$router.push({ name: "AddressManage" });
        } else {
          Toast("删除失败!");
        }
      });
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
