//index.js
//获取应用实例
const storage = require("../../utils/storage");
const { webfiction } = require("../../utils/state");
const { useFetchRequest } = require("../../utils/request");
const { apis, useFetchRef, state, fetch: FetchNovel } = useFetchRequest();

Page({
  data: {
    initState: {},
    initList: [...webfiction],
    radio: 0.9,
    current: 0,
    category: "全部",
    pageH: storage.getSessionStorage("pageH"),
  },
  onLoad: function () {
    const { initList, initState } = this.data;
    const item = initList[0];
    initState[item.key + "Loading"] = true;
    this.setData({ initState: { ...initState } });
    this.getFetchNovel(item);
  },
  // 点击排行 根据name查询资源
  onScrollTap: function (e) {
    const { initList } = this.data;
    const item = initList[1];
    const params = e.detail.params;
    const word = params.keyword;
    this.setFetchLoading(item.key)
    this.getFetchNovel({ ...item, data: { xsname: word } });
    this.setData({ current: 1 });
  },
  // 点击分类 根据 id 查询排行
  onCategoryChange: function (e) {
    const { initList } = this.data;
    const item = initList[0];
    const dataset = e.currentTarget.dataset;
    const params = dataset.params;
    this.setFetchLoading(item.key)
    this.setData({ category: params.name });
    this.getFetchNovel({ ...item, data: params.data });
  },
  setFetchLoading(key) {
    const { initState } = this.data;
    initState[key + "Loading"] = true;
    this.setData({ initState: { ...initState } });
  },
  // 获取数据 更改
  getFetchNovel(item) {
    FetchNovel({
      url: item.url,
      join: item.join,
      data: item.data,
      callback: (res) => {
        let data = null;
        item.key === "search" && (data = res.data.list);
        item.key === "ranking" && (data = res.data.result);
        this.setNovelList(item.key, data);
      },
    });
  },
  setNovelList(key, list) {
    const { initState } = this.data;
    const novel = { ...initState };
    key === "ranking" && (novel[key] = list.topwords);
    key === "ranking" &&
      (novel.category = list.boards.map((i) => ({
        name: i.boardname,
        data: { b: i.boardid, c: i.categoryid },
      })));
    key === "search" && (novel[key] = list);
    this.setData({ initState: { ...novel, [key + "Loading"]: false } });
  },
});
