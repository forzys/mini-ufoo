//index.js
//获取应用实例
const { wallpaper } = require("../../utils/state");
const { useFetchRequest } = require("../../utils/request");
const { apis, useFetchRef, state, fetch } = useFetchRequest();

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
    fetch({
      url: item.url,
      alive: item.index ? false : true,
      data: item.data && { ...item.data, skip: item.index * item.data.limit },
      callback: (res) => {
        let list = [];
        const data = res.data;
        item.url === "bing" && (list = data.images);
        item.url === "picasso" && (list = data.res.vertical);
        item.data && (item.index += 1);
        this.setPaperList(list, item.key);
        useFetchRef({ isLoading: false });
      },
    });
  },
  // 处理 逻辑
  setPaperList(list, key) {
    const data = this.data;
    const init = data.initState;
    if (!Array.isArray(list)) {
      return;
    }
    if (key !== "bing") {
      const picasso = [];
      let temp_list = [];
      // 两个一组 分类成新数组
      for (let i = 1; i < list.length; i += 2) {
        const item = [list[i - 1], list[i]];
        picasso.push(item);
      }
      //  数组合并
      if (Array.isArray(init[key])) {
        temp_list = init[key];
      }
      init[key] = [...temp_list, ...picasso];
      this.setData({ initState: init });
    }
    if (key === "bing") {
      const bing = list.map((x) => ({
        ...x,
        img: apis.baseBing + x.url,
        tag: x.enddate,
        info: x.copyright,
      }));
      init[key] = bing;
      this.setData({ initState: init });
    }
  },
});
