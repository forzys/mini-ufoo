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
    const item = initList[0];
    this.getFetchNovel(item);
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
      data: item.data,
      callback: (res) => {
        const data = res.data.result;
        this.setNovelList(item.key, data);

        // console.log(data.topwords);
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
  setNovelList(key, list) {
    const { initState } = this.data;
    const novel = { ...initState };

    if (key === "ranking") {
      novel.category = list.boards.map((i) => ({
        name: i.boardname,
        data: { b: i.boardid, c: i.categoryid },
      }));
      novel[key] = list.topwords;
    }

    this.setData({ initState: { ...novel } });
  },
});
