import Vue from "vue";
import Router from "vue-router";

const Home = () => import("@/pages/Home"); // 首页
const Login = () => import("@/pages/Login"); // 登录、注册
const City = () => import("@/pages/City");
const Cart = () => import("@/pages/Cart");
const Category = () => import("@/pages/Category");
const User = () => import("@/pages/User");
const Rank = () => import("@/pages/Rank");
const GoodsDetails = () => import("@/pages/GoodsDetails");
const Order = () => import("@/pages/Order");
const CommentGoods = () => import("@/pages/CommentGoods");
const CommentCenter = () => import("@/pages/CommentCenter");
const AddressManage = () => import("@/pages/AddressManage");
const AddressEdit = () => import("@/pages/AddressEdit");
const AddressAdd = () => import("@/pages/AddressAdd");
const OrdersDetails = () => import("@/pages/OrderDetails");
const OrderManage = () => import("@/pages/OrderManage");

Vue.use(Router);
/**
 * keepAlive 需要缓存的页面
 */
const router = new Router({
  mode: "hash",
  routes: [
    { path: "/", redirect: { name: "Home" } },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { keepAlive: true, index: 1 }
    }, // 首页
    {
      path: "/city",
      name: "City",
      component: City,
      meta: { keepAlive: true, index: 2 }
    }, // 城市选择
    { path: "/login", name: "Login", component: Login, meta: { index: 3 } }, // 登录、注册
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
      meta: { keepAlive: true, index: 4 }
    },
    {
      path: "/category",
      name: "Category",
      component: Category,
      meta: { keepAlive: true, index: 5 }
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: { keepAlive: true, index: 6 }
    },
    {
      path: "/rank",
      name: "Rank",
      component: Rank,
      meta: { keepAlive: true, index: 7 }
    },
    {
      path: "/goodsDetails",
      name: "GoodsDetails",
      component: GoodsDetails,
      meta: { keepAlive: true, index: 8 }
    },
    {
      path: "/order",
      name: "Order",
      component: Order,
      mate: { keepAlive: true, index: 9 }
    },
    {
      path: "/commentGoods",
      name: "CommentGoods",
      component: CommentGoods,
      mate: { keepAlive: true, index: 10 }
    },
    {
      path: "/commentCenter",
      name: "CommentCenter",
      component: CommentCenter,
      mate: { keepAlive: true, index: 10 }
    },
    {
      path: "/addressManage",
      name: "AddressManage",
      component: AddressManage,
      mate: { keepAlive: true, index: 11}
    },
    {
      path: "/addressAdd",
      name: "AddressAdd",
      component: AddressAdd,
      mate: { keepAlive: true, index: 12}
    },
    {
      path: "/addressEdit",
      name: "AddressEdit",
      component: AddressEdit,
      mate: { keepAlive: true, index: 13}
    },
    {
      path: "/OrderManage",
      name: "OrderManage",
      component: OrderManage,
      meta: { keepAlive: true, index: 14 }
    },
    {
      path: "/OrdersDetails",
      name: "OrdersDetails",
      component: OrdersDetails,
      meta: { keepAlive: true, index: 15 }
    },

    { path: "*", redirect: { name: "Home" } }
  ]
});

const title = {
  Home: "网上书城",
  City: "城市选择",
  Login: "登录 / 注册",
  Cart: "购物车",
  Category: "分类",
  User: "我的",
  Rank: "排行榜",
  GoodsDetails: "商品详情",
  Order: "下单",
  CommentGoods: "商品评价",
  CommentCenter: "评价中心",
  OrdersDetails: "订单详情",
  OrderManage: "订单管理"
};

// 注册全局导航前置钩子用来拦截导航
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = title[to.name];
  next();
});

export default router;
