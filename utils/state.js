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

module.exports = { wallpaper };
