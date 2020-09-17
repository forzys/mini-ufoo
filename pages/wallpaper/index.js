//index.js
//获取应用实例
const { wallpaper } = require("../../utils/state");
const { useFetchRequest } = require("../../utils/request");
const { apis, useFetchRef, state, fetch: FetchImg } = useFetchRequest();

Page({
  data: {
    initList: [...wallpaper],
    initState: {},
    radio: 0.9,
    current: 0,
  },
  onLoad: function () {
    const { initList } = this.data;
    initList.forEach((item) => {
      this.getFetchImg(item);
    });
  },
  // 滚动到底部 限流获取数据
  onScollLower: function (e) {
    if (state.isLoading) return;
    useFetchRef({ isLoading: true });
    const { current, initList } = this.data;
    const item = initList[current];
    this.getFetchImg(item);
  },
  // 获取数据 更改
  getFetchImg(item) {
    FetchImg({
      url: item.url,
      alive: !item.index,
      data: item.data && { ...item.data, skip: item.index * item.data.limit },
      callback: (res) => {
        let list = [];
        const data = res.data;
        item.url === "bing" && (list = data.images);
        item.url === "picasso" && (list = data.res.vertical);
        item.data && (item.index += 1);
        list && list.length && this.setWallImgList(list, item.key);
        useFetchRef({ isLoading: false });
      },
    });
  },
  // 处理 逻辑
  setWallImgList(imglist, key) {
    const { initState } = this.data;
    const papers = { ...initState };
    key === "bing" &&
      (papers[key] = imglist.map((x) => ({
        ...x,
        tag: x.enddate,
        info: x.copyright,
        img: apis.baseBing + x.url,
      })));

    if (key !== "bing") {
      const picasso = [];
      const keylist = papers[key] || [];
      for (let i = 1; i < imglist.length; i += 2) {
        picasso.push([imglist[i - 1], imglist[i]]);
      }
      papers[key] = [...keylist, ...picasso];
    }

    this.setData({ initState: { ...papers } });
  },
});
