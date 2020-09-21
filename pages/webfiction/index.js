//index.js
//获取应用实例
const storage = require("../../utils/storage");
const { webfiction } = require("../../utils/state");
const { useFetchRequest } = require("../../utils/request");
const { apis, useFetchRef, state, fetch } = useFetchRequest();

Page({
  data: {
    initList: [...webfiction],
    initState: {},
    radio: 0.9,
    current: 0,
    category: '全部',
    pageH: storage.getSessionStorage("pageH"),
  },
  onLoad: function () {
    const { initList } = this.data;
    const item = initList[0];
    this.getFetchNovel(item);
  },
  onScrollTap: function (e) {
    const { initList } = this.data;
    const params = e.detail.params
    const word = params.keyword
    const item = initList[1];
    this.getFetchNovel({ ...item, data: { xsname: word } });
  },
  onCategoryChange: function (e) {
    const { initList } = this.data;
    const dataset = e.currentTarget.dataset
    const params = dataset.params
    const item = initList[0];
    this.setData({ category: params.name })
    this.getFetchNovel({ ...item, data: params.data });
  },
  // 获取数据 更改
  getFetchNovel(item) {
    fetch({
      url: item.url,
      join: item.join,
      data: item.data,
      callback: (res) => {
        console.log(res)
        const data = res.data.result;
        this.setNovelList(item.key, data);
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
