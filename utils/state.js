/**
 * 存放 List 数组
 * 用于 页面 分类
 * 统一 请求数据
 */

// hotspot 页面
const hotspot = [
  {
    name: "百度热点",
    url: "hotspotBaidu",
    key: "baidu",
  },
  {
    name: "微博热搜",
    url: "hotspotWeibo",
    key: "weibo",
  },
  {
    name: "知乎热榜",
    url: "hotspotZhihu",
    key: "zhihu",
  },
];
// wallpaper 页面
const wallpaper = [
  {
    name: "热门",
    key: "hot",
    url: "picasso",
    index: 0,
    data: {
      skip: 0,
      first: 0,
      limit: 30,
      adult: false,
      order: "hot",
    },
  },
  {
    name: "最新",
    key: "new",
    url: "picasso",
    index: 0,
    data: {
      skip: 0,
      first: 0,
      limit: 30,
      adult: false,
      order: "new",
    },
  },
  {
    name: "每日一图",
    key: "bing",
    url: "bing",
  },
];
// webfiction 页面
const webfiction = [
  {
    name: "排行",
    key: "ranking",
    url: "baidu",
    data: { b: 533, c: 42 },
  },
  {
    name: "更多",
    key: "search",
    url: "pingcc",
    data: { xsname: '' },
  },
  {
    name: "书架",
    key: "bookshelf",
  },
];

module.exports = { wallpaper, webfiction, hotspot };
