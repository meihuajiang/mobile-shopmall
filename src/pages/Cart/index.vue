<template>
  <div id="cart">
    <topbar title="购物车" hasBack></topbar>
    <section class="cartMain">
      <div class="cartMain_hd">
        <ul class="order_lists cartTop">
          <li class="list_chk">
            <!--所有商品全选-->
            <input
              type="checkbox"
              id="all"
              class="whole_check"
              @click="cartChoose()"
            />
            <label for="all" :class="status ? 'mark' : ''">全选</label>
          </li>
          <!--<li class="list_con">商品信息</li>
          <li class="list_info">商品参数</li>
          <li class="list_price">单价</li>
          <li class="list_amount">数量</li>
          <li class="list_sum">金额</li>
          <li class="list_op">操作</li>-->
        </ul>
      </div>
      <br /><br />
      <div class="cartBox" v-for="(item, index) in list" :key="index">
        <!--        <div class="order_content">-->
        <!--          <ul class="order_lists" v-for="pro in item.products">-->
        <li class="list_chk">
          <input
            type="checkbox"
            id="checkbox_2"
            class="son_check"
            @click="choose(item)"
          />
          <a for="checkbox_2" :class="item.checked ? 'mark' : ''"></a>
        </li>
        <li class="list_con">
          <div class="list_img">
            <a href="javascript:;"><img :src="item.imgUl" alt=""/></a>
          </div>
          <div class="list_text">
            <a href="javascript:;">{{ item.title }}</a>
            <span class="list_custom"></span>
          </div>
        </li>
        <li class="list_price">
          <p class="price">单价：￥{{ item.price }}</p>
          <div class="charge">
            <p>更多促销</p>
          </div>
        </li>
        <li class="list_amount">
          <div class="amount_box">
            <a href="javascript:;" class="reduce reSty" @click="reduce(item)"
              >数量：-</a
            >
            <input type="text" v-model="item.num" class="sum" />
            <a href="javascript:;" class="plus" @click="add(item)">+</a>
          </div>
        </li>
        <li class="list_sum">
          <p class="sum_price">商品金额：￥{{ item.sum }}</p>
        </li>
        <li class="list_op">
          <p class="collect">
            <a href="javascript:;" class="colBtn">加入收藏夹</a>
          </p>
          <p class="del">
            <a href="javascript:;" class="delBtn">移除该商品</a>
          </p>
        </li>
        <br /><br /><br />
        <!--          </ul>-->
        <!--        </div>-->
      </div>

      <br /><br />
      <!--底部-->
      <div class="bar-wrapper">
        <div class="bar-right">
          <div class="piece">
            已选商品<strong class="piece_num">{{ this.allnum }}</strong
            >件
          </div>
          <div class="totalMoney">
            共计: <strong class="total_text">￥{{ this.allsum }}</strong>
          </div>
          <div class="calBtn"><a href="javascript:;">去结算</a></div>
        </div>
      </div>
    </section>
    <section class="model_bg"></section>
    <section class="my_model">
      <p class="title">删除宝贝<span class="closeModel"></span></p>
      <p>您确认要删除该宝贝吗？</p>
      <div class="opBtn">
        <a href="javascript:;" class="dialog-sure">确定</a>
        <br />
        <a href="javascript:;" class="dialog-close">关闭</a>
      </div>
    </section>
  </div>
</template>

<script>
import Topbar from "@/components/TopBar";
export default {
  components: {
    Topbar
  },
  data() {
    return {
      status: false, //全选选中状态
      allsum: 0, //总计价格
      allnum: 0, //总计数量
      list: [
        {
          title: "李清照传",
          text: "4377人评价",
          price: 99,
          imgUrl: "./static/img/coll-r-2.jpg",
          link: "http://product.dangdang.com/24166592.html#ddclick_reco_book",
          num: 1,
          sum: 99,
          checked: false //商品选中状态
        },
        {
          title: "哈利·波特与被诅咒的孩子",
          text: "“哈利·波特”第八个故事中文版震撼来袭！特别彩排版剧本！",
          price: 29.37,
          imgUrl: "./static/img/m-c-1.png",
          link: "http://product.dangdang.com/25583206.html",
          num: 1,
          sum: 29.37,
          checked: false
        },
        {
          title: "云边有个小卖部",
          text: "2381人评价",
          price: 49,
          imgUrl: "./static/img/parts-r-1.jpg",
          link: "http://product.dangdang.com/25295369.html",
          num: 1,
          sum: 49,
          checked: false
        },
        {
          title: "空间简史",
          text: "434人好评",
          price: 29,
          imgUrl: "./static/img/rec-1.jpg",
          link: "http://product.dangdang.com/25546541.html",
          num: 1,
          sum: 29,
          checked: false
        },
        {
          title: "夏目友人帐",
          text: "只要有想见的人，就不再会是孤身一人了",
          price: 29,
          imgUrl: "./static/img/xiamu.png",
          link: "http://product.dangdang.com/24017532.html",
          num: 1,
          sum: 29,
          checked: false
        },
        {
          title: " 龙族3黑月之潮·下",
          text: "我们都是小怪兽，都将被正义的奥特曼，杀死！",
          price: 149,
          imgUrl: "./static/img/intel-r-1.jpg",
          link:
            "http://product.dangdang.com/23414990.html#ddclick_http://book.dangdang.com/01.01.htm",
          num: 1,
          img: "./static/img/intel-r-1.jpg",
          sum: 149,
          checked: false
        },
        {
          title: "你当像鸟飞往你的山",
          text: "我们要背叛多少曾经，才能找到真正的自我！",
          price: 39,
          imgUrl: "./static/img/nidangxiangniao.png",
          link: "http://product.dangdang.com/28473192.html",
          num: 1,
          img: "./images/7.png",
          sum: 39,
          checked: false
        }
      ]
    };
  },
  methods: {
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
      item = 5;
    },
    //全选购物车
    cartChoose() {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>