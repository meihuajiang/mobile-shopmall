// eslint-disable-next-line no-unused-vars
import { get, post } from "@/utils/http";
import { Url } from "./url";
class Ajax {
  // 获取首页数据 | GET
  getHomeData() {
    return get(Url.homeDataApi);
  }
  TestFor() {
    return get(Url.TestApi);
  }
  // 搜索 | POST
  search(keyword, page = 1) {
    return get(Url.searchApi, { keyword, page });
  }
  search1(name) {
    return get(Url.searchApi1, { name });
  }
  getCategoryList(category_id) {
    return get(Url.categorysListApi, { category_id });
  }
  getOrderList(userid) {
    return get(Url.getOrderListApi, { userid });
  }
  getOrder(id) {
    return get(Url.getOrderApi, { id });
  }
  getCommodity(id) {
    return get(Url.getCommodityApi, { id });
  }
  getUseridById(id) {
    return get(Url.getUseridByIdApi, { id });
  }
  getUser(id, password) {
    return get(Url.getUser,{id,password})
  }
  login(id, password) {
    return get(Url.getUser,{id,password})
  }
}
export default new Ajax();
