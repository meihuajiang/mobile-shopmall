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
}
export default new Ajax();
