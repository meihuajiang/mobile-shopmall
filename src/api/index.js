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
  search1(name){
    return get(Url.searchApi, { name });
  }
  getCategoryList(category_id) {
    return get(Url.categorysListApi, { category_id });
  }
}
export default new Ajax();
