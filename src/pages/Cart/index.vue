<template>
  <div class="cart">
    <topbar title="购物车" hasBack></topbar>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
    <div class="scroll-wrapper">
      <b-scroll class="content-scroll" :data="List">
        <div class="container">
          <section class="cartMain">
            <ul v-if="list.length > 0">
              <div class="cartBox" v-for="(item, index) in list" :key="index">
                <van-row>
                  <van-col type="flex" justify="space-between">
                    <van-checkbox
                      v-model="result"
                      name="item"
                      ref="checkboxes"
                      checked-color="#F79709"
                      @click="choose(item)"
                    ></van-checkbox>
                  </van-col>
                  <van-card
                    style="margin-left:35px;"
                    :num="item.num"
                    :price="item.price"
                    :desc="item.text"
                    :thumb="item.image"
                    :title="item.title"
                    origin-price="16.80"
                  >
                    <div slot="tags">
                      <van-button
                        plain
                        size="mini"
                        type="danger"
                        @click="deleteCommodity(item)"
                        >移除</van-button
                      >
                    </div>
                    <div slot="footer">
                      <van-button size="mini" @click="reduce(item)"
                        >-</van-button
                      >
                      <van-tag type="primary" plain="true" size="large">{{
                        item.num
                      }}</van-tag>
                      <van-button size="mini" @click="add(item)">+</van-button>
                    </div>
                  </van-card>
                </van-row>
              </div>
            </ul>
            <div class="nohaveshop" v-else>
              <van-icon name="shopping-cart-o" />
              <p class="p1">你的购物车空空如也~~</p>
              <p class="p2">快去采购吧!</p>
            </div>

          </section>
        </div>
      </b-scroll>
    </div>
    <!--底部-->
    <van-submit-bar
      :price="allsum * 100"
      button-text="去结算"
      @submit="onSubmit"
    >
      <!-- 全选按钮 -->
      <van-checkbox
        v-model="checkedAll"
        @click="cartChoose"
        checked-color="#F79709"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <van-goods-action>
      <van-goods-action-icon
              icon="chat-o"
              text="评价"
              @click="goCommentGoods(item.id,item,id,item.count)"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button
              type="warning"
              text="加入购物车"
              @click="cart()"
      />
      <van-goods-action-button
              type="danger"
              text="立即购买"
              @click="jump(item.id)"
      />
    </van-goods-action>
  </div>
</template>

<script>
import Topbar from "@/components/TopBar";
import BScroll from "@/components/BScroll";
import { post } from "../../utils/http";
import { Toast } from "vant";
// import { SubmitBar } from 'vant';
export default {
  components: {
    Topbar,
    BScroll
  },
  data() {
    return {
      status: false, //全选选中状态
      allsum: 0, //总计价格
      allnum: 0, //总计数量
      listenScroll: true, // 监听滚动位置
      probeType: 3, // 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      scrollY: 0, // 实时滚动的 Y 坐标
      bounce: { top: true }, // 当滚动超过边缘的时候顶部会有一小段回弹动画
      touch: {},
      isRotate: false,
      isTrans: false,
      translateY: 0,
      rotate: 0,
      opac: 0,
      user: {
        id: "123456",
        name: "张三",
        phone: "123456789",
        address: "广东省广州市番禺区华南理工大学"
      },
      commodity_list: [],
      list: [],
      result: [],
      safeAreaInsetBottom: true,
      checkedAll: true
    };
  },
  created() {
    try {
      post("https://af2pds.toutiao15.com/get_cart", {
        user_id: "123456"
      }).then(response => {
        var result = response.cart;
        console.log(result);
        result.forEach(item => {
          post("https://af2pds.toutiao15.com/get_commodity_byid", {
            id: item.commodity_id
          }).then(response => {
            console.log(response);
            var commodity = {
              commodityId: response.content._id,
              price: response.content.commodity_price,
              title: response.content.commodity_name,
              num: 1,
              sum: response.content.commodity_price,
              checked: false,
              text: response.content.commodity_detail,
              image: response.content.commodity_photo
            };
            console.log(commodity);
            this.list.push(commodity);
          });
        });
      });
    } catch (error) {
      return {
        error: error.massage
      };
    }
  },

  methods: {
    onSubmit() {
      var listCopy = this.list.concat();
      for (var a = 0; a < listCopy.length; a++) {
        console.log("out" + String(a) + listCopy[a].checked);
      }
      for (var i = 0; i < listCopy.length; i++) {
        console.log(String(i) + listCopy[i].checked);
        if (listCopy[i].checked) {
          try {
            post("https://af2pds.toutiao15.com/delete_cart", {
              user_id: this.user.id,
              commodity_id: listCopy[i]._id
            }).then(response => {
              if (!response.result) {
                //alert
                Toast("下单失败！");
              }
            });
          } catch (error) {
            return {
              error: error.massage
            };
          }
          try {
            post("https://af2pds.toutiao15.com/update_commodity_num", {
              id: listCopy[i].commodityId,
              count: listCopy[i].num
            });
            post("https://af2pds.toutiao15.com/add_order", {
              uid: this.user.id,
              user_name: this.user.name,
              user_phone: this.user.phone,
              aid: this.user.address,
              cid: listCopy[i].commodityId,
              count: listCopy[i].num,
              money: listCopy[i].sum,
              state: 2
            }).then(response => {
              console.log(response);
              if (!response.result) alert("下单失败！");
            });
          } catch (e) {
            //alert
            Toast("下单失败！");
            return;
          }
          for (var j = 0; j < this.list.length; j++) {
            if (this.list[j].title == listCopy[i].title) {
              this.list.splice(j, 1);
            }
          }
        }
      }
      //alert
      Toast("下单成功！");
      this.allsum = 0;
      this.allnum = 0;
    },
    deleteCommodity(item) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].title == item.title) {
          this.list.splice(i, 1);
        }
      }
      try {
        post("https://af2pds.toutiao15.com/delete_cart", {
          user_id: "123456",
          commodity_id: item._id
        }).then(response => {
          if (response.result) {
            Toast("删除成功!");
          }
        });
      } catch (error) {
        return {
          error: error.massage
        };
      }
      if (item.checked) {
        this.allsum -= item.sum;
        this.allnum -= item.sum;
      }
    },
    //选中某件商品
    chooseTrue(item) {
      item.checked = true; //将该商品标记为已选
      this.allsum += item.sum;
      this.allnum += item.num;
    },
    //取消选中商品
    chooseFalse(item) {
      item.checked = false; //将商品选中状态改为false
      this.status = false; //无论之前全选的状态，将其改为false就行
      this.allsum -= item.sum; //商品总计价格变动
      this.allnum -= item.num;
    },
    choose(item) {
      !item.checked ? this.chooseTrue(item) : this.chooseFalse(item);
      //item = 5;
    },
    //全选购物车
    cartChoose() {
      // this.$refs.checkboxGroup.toggleAll(true);
      //this.$refs.checkboxGroup.toggleAll(true);
      this.status = !this.status; //取反改变状态
      this.status
        ? this.list.forEach(item => this.choose(item))
        : this.list.forEach(item => this.chooseFalse(item));
    },
    //增加商品数量
    add(item) {
      item.num++;
      item.sum += item.price;
      if (item.checked) {
        this.allsum += item.price;
        this.allnum++;
      }
    },
    //减少商品数量（不考虑减少为0）
    reduce(item) {
      if (item.num === 1) return;
      item.num--;
      item.sum -= item.price;
      if (item.checked) {
        this.allsum -= item.price;
        this.allnum--;
      }
    },
    updateOrder() {},
    calculate(item) {
      let oldsum = item.sum; //之前的总价
      let oldnum = oldsum / item.price; //之前的数量
      item.num = parseInt(item.num);
      item.num > 0 ? (item.sum = item.num * item.price) : (item.num = oldnum); //如果输入数量大于0，计算价格，否则返回之前的数量
      let diffsum = item.sum - oldsum; //差价
      let diffnum = item.num - oldnum; //差量
      if (item.checked) {
        //如果商品被选中
        this.allsum += diffsum; //计算总价
        this.allnum += diffnum; //计算总量
      }
    },
    // eslint-disable-next-line no-unused-vars
    cartScroll(pos) {},
    cartScrollEnd() {
      this.$refs.cartScrollRef.refresh();
    },
    // eslint-disable-next-line no-unused-vars
    //contentScroll(pos) {},
    /**
     * 触摸开始 | 当用户在触摸平面上放置了一个触点时触发
     */
    touchstart(event) {
      this.touch.init = true;
      this.touch.startY = event.touches[0].pageY;
    },
    /**
     * 触摸移动 | 当用户在触摸平面上移动触点时触发
     */
    touchmove(event) {
      let moveY = event.touches[0].pageY;
      let distanceY = moveY - this.touch.startY;
      this.translateY = Math.max(0, distanceY / 3.5);
      this.rotate = Math.max(0, Math.min(360, distanceY));
      this.translateY > 80 && (this.isRotate = true);
      this.opac = distanceY / 320;
    },
    /**
     * 触摸结束 | 当一个触点被用户从触摸平面上移除
     */
    touchend() {}
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
