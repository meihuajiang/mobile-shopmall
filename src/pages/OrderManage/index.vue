<template>
  <div>
    <top-bar title="我的订单" hasBack></top-bar>
    <div id="orderform">
      <van-tabs sticky v-model="activeTab" color="#F79709">
        <van-tab title="全部">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-card
                v-for="item1 in orderList"
                :key="item1._id"
                :num="item1.count"
                :price="item1.price"
                :title="item1.title"
                :thumb="item1.pic"
                @click="goOrdersDetails(item1._id, item1.pic, item1.title)"
              >
                <template #tags>
                  <br />
                  <van-tag plain type="danger">{{
                    top[item1.status ]
                  }}</van-tag>
                </template>
                <template #footer>
                  <van-button size="mini" :disabled="item1.buttonStatus"
                    >删除订单</van-button
                  >
                  <!-- <van-button size="mini">评价</van-button> -->
                </template>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="待付款">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-card
                v-for="item1 in orderList1"
                :key="item1._id"
                :num="item1.count"
                :price="item1.price"
                :title="item1.title"
                :thumb="item1.pic"
                @click="goOrdersDetails(item1._id, item1.pic, item1.title)"
              >
                <template #tags>
                  <br />
                  <van-tag plain type="danger">{{
                    top[item1.status ]
                  }}</van-tag>
                </template>
                <template #footer>
                  <van-button size="mini" :disabled="item1.buttonStatus"
                    >删除订单</van-button
                  >
                  <!-- <van-button size="mini">评价</van-button> -->
                </template>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="待发货">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-card
                v-for="item1 in orderList2"
                :key="item1._id"
                :num="item1.count"
                :price="item1.price"
                :title="item1.title"
                :thumb="item1.pic"
                @click="goOrdersDetails(item1._id, item1.pic, item1.title)"
              >
                <template #tags>
                  <br />
                  <van-tag plain type="danger">{{
                    top[item1.status ]
                  }}</van-tag>
                </template>
                <template #footer>
                  <van-button size="mini" :disabled="item1.buttonStatus"
                    >删除订单</van-button
                  >
                  <!-- <van-button size="mini">评价</van-button> -->
                </template>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="待收货">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-card
                v-for="item1 in orderList3"
                :key="item1._id"
                :num="item1.count"
                :price="item1.price"
                :title="item1.title"
                :thumb="item1.pic"
                @click="goOrdersDetails(item1._id, item1.pic, item1.title)"
              >
                <template #tags>
                  <br />
                  <van-tag plain type="danger">{{
                    top[item1.status ]
                  }}</van-tag>
                </template>
                <template #footer>
                  <van-button size="mini" :disabled="item1.buttonStatus"
                    >删除订单</van-button
                  >
                  <!-- <van-button size="mini">评价</van-button> -->
                </template>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>

        <van-tab title="已完成">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-card
                v-for="item1 in orderList4"
                :key="item1._id"
                :num="item1.count"
                :price="item1.price"
                :title="item1.title"
                :thumb="item1.pic"
                @click="goOrdersDetails(item1._id, item1.pic, item1.title)"
              >
                <template #tags>
                  <br />
                  <van-tag plain type="danger">{{
                    top[item1.status ]
                  }}</van-tag>
                </template>
                <template #footer>
                  <van-button size="mini" :disabled="item1.buttonStatus"
                    >删除订单</van-button
                  >
                  <!-- <van-button size="mini">评价</van-button> -->
                </template>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
//import BScroll from "@/components/BScroll";
//import UserInfo from "./UserInfo";
import ajax from "@/api";

export default {
  name: "OrderManage",
  inject: ["reload"],
  components: { TopBar },

  data() {
    return {
      list: [],
      top: ["全部", "待付款", "待发货", "待收货", "已完成"],
      loading: false,
      finished: false,
      refreshing: false,
      orderList: [], // 总订单列表
      orderList1: [], // 待付款订单列表
      orderList2: [], // 待发货订单列表
      orderList3: [], // 待收货订单列表
      orderList4: [] // 已完成订单列表
    };
  },
  watch: {},
  async created() {
    //原本没有！
    if (!this.global.log_state) {
      this.activeTab = this.$route.params.status;
      //let getuserid = await ajax.getUseridById(this.change_log_id);
      let getuserid = await ajax.getUseridById("5ee1197219833e022bac4510");
      let userid = getuserid.userid;
      console.log(userid);
      let res = await ajax.getOrderList(userid);
      if (res.result === true) {
        console.log(res.result);
        //console.log(res.content[0]);
        this.orderList = res.content;
        if (this.orderList.length !== 0) {
          var i;
          this.orderList.reverse();
          for (i in this.orderList) {
            console.log(this.orderList[i]);
            this.orderList[i].price = 0.0;
            this.orderList[i].price =
              this.orderList[i].orders_money / this.orderList[i].count;
            this.orderList[i].price = this.orderList[i].price.toFixed(2);
            this.orderList[i].status = this.orderList[i].orders_state;
            let temp = await ajax.getCommodity(
              this.orderList[i].commodity_name
            );
            this.orderList[i].title = temp.content.commodity_name;
            this.orderList[i].pic = temp.content.commodity_photo;
            if (this.orderList[i].status < 4) {
              this.orderList[i].buttonStatus = true;
            } else {
              this.orderList[i].buttonStatus = false;
            }
            if (this.orderList[i].orders_state === 1) {
              this.orderList1.push(this.orderList[i]);
            } else if (this.orderList[i].orders_state === 2) {
              this.orderList2.push(this.orderList[i]);
            } else if (this.orderList[i].orders_state === 3) {
              this.orderList3.push(this.orderList[i]);
            } else if (this.orderList[i].orders_state === 4) {
              this.orderList4.push(this.orderList[i]);
            }
          }
          console.log(i);
          console.log(this.orderList2);
          console.log(this.orderList3);
        }
      }
    }
  },
  methods: {
    goOrdersDetails(id, pic, title) {
      this.$router.push({
        name: "OrdersDetails",
        params: { orderId: id, picture: pic, bookname: title }
      });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
