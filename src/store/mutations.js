import * as types from "./mutations-type";

const mutations = {
  // 设置 state 中 locationCity
  [types.LOCATION_CITY](state, locCityData) {
    state.locationCity = locCityData;
  },
  // 设置 state 中 searchHistoryList
  [types.SEARCH_HISTORY_LIST](state, searchHistoryList) {
    state.searchHistoryList = searchHistoryList;
  },
  // 设置 state 中 browseHistoryList
  [types.BROWSE_HISTORY_LIST](state, browseHistoryList) {
    state.browseHistoryList = browseHistoryList;
  },
  // 设置 state 中 token
  [types.USER_TOKEN](state, token) {
    state.userToken = token;
  }
};

export default mutations;
