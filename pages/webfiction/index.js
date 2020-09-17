//index.js
//获取应用实例
const { webfiction } = require("../../utils/state");
const { useFetchRequest } = require("../../utils/request");
const { apis, useFetchRef, state, fetch } = useFetchRequest();

Page({
  data: {
    initList: [...webfiction],
    initState: {},
    radio: 0.9,
    current: 0,
  },
  onLoad: function () {
    const { initList } = this.data;
    initList.forEach((item) => {
      item.url && this.getFetchNovel(item);
    });
  },
  // 滚动到底部 限流获取数据
  // onScollLower: function (e) {
  //     if (state.isLoading) return;
  //     useFetchRef({ isLoading: true });
  //     const { current, initList } = this.data;
  //     const item = initList[current];
  //     this.getFetchNovel(item);
  // },
  // 获取数据 更改
  getFetchNovel(item) {
    fetch({
      url: item.url,
      join: item.join,
      // alive: item.index ? false : true,
      data: item.data,
      callback: (res) => {
        console.log(res);
        // let list = [];
        // const data = res.data;
        // item.url === "bing" && (list = data.images);
        // item.url === "picasso" && (list = data.res.vertical);
        // item.data && (item.index += 1);
        // this.setPaperList(list, item.key);
        // useFetchRef({ isLoading: false });
      },
    });
  },
});
