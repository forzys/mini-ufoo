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

const webfiction = [
  {
    name: '分类',
    key: 'statistics',
    url: 'webfiction',
    data: '/cats/lv2/statistics'
  },
  {
    name: '排行',
    key: 'gender',
    url: 'webfiction',
    data: '/ranking/gender'
  },
  {
    name: '书架',
    key: 'bookshelf',
  }
]

module.exports = { wallpaper, webfiction };
