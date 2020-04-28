import {
  categoryCache,
  locationCityCache,
  searchHistoryCache,
  browseHistoryCache,
  tokenCache,
  // eslint-disable-next-line no-unused-vars
  addressInfoCache
} from "@/assets/js/cache";

const state = {
  categoryList: categoryCache.getCache(), // 大分类列表
  locationCity: locationCityCache.getCache(), // 定位城市
  searchHistoryList: searchHistoryCache.getCache(), // 搜索历史
  browseHistoryList: browseHistoryCache.getCache(), // 浏览历史
  userToken: tokenCache.getCache() // 用户 token
};

export default state;
