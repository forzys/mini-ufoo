const host = 'https://api.zoooz.xyz:2233'
// const host = 'http://127.0.0.1:8080'


module.exports = { 
  baseBing: "https://cn.bing.com/",
  douyin:host+'/douyin',
  // host:'https://api.zoooz.xyz:2233',
  // hotspotBaidu: '/hotspotBaidu',
  // hotspotZhihu: '/hotspotZhihu',
  // hotspotWeibo: '/hotspotWeibo',
  // hotspotSogou: '/hotspotSogou',
  // hotspotSina: '/hotspotSina',
  // hotspotTiktok:'/hotspotIesword',
  // _FundMnfInfo:'/fundMNFInfo',
  // _FundSeciInfo:'/fundSeciInfo',
  // _FundSearch:'/fundSearch',
  // imjadHitokoto:'/imjadHitokoto',
  // awemeTiktok:'/hotspotIesaweme',
  // wallPicasso:'/wallPicasso',
  // wallBing:'/wallBing',
  // baseBing:'https://cn.bing.com/',
 
  // bing
  bing: host+"/wallBing?format=js&n=5" ,
  // font
  font:
    "https://cdn.jsdelivr.net/gh/mforz/dataset@latest/font/fontquan0001.ttf",

  // iptv github 手动更新
  iptv: host+"/iptv"||"https://cdn.jsdelivr.net/gh/mforz/dataset/iptv/iptv.json",
  // wallpaper
  picasso:host+"/wallPicasso" || "https://service.picasso.adesk.com/v1/vertical/vertical",

  // wall 搜索
  wallsearch: "https://so.picasso.adesk.com/v1/",

  // github 加速 静态
  menu: "https://cdn.jsdelivr.net/gh/mforz/dataset@latest/config/menu.json",
  // gitee 静态
  menu2:
    "https://gitee.com/api/v5/repos/mforz/dataset/contents/config/menu.json",
  // 追书神器
  webfiction: "https://api.zhuishushenqi.com",

  // 获取 搜索资源
  pingcc: "https://api.pingcc.cn",

  // 排行-推荐
  // * 电影 全部 #buzz/1596/528 惊悚 1599/528 剧情 1597/528 爱情 1598/528 喜剧 1600/528 科幻 1601/528
  // * 动漫 全部 #buzz/1619/530 益智 1621/530 搞笑 1620/530 冒险 1622/530 国产 1623/530 日本 1624/530 欧美 1625/530
  // * 小说 全部 #buzz/533/42 玄幻奇幻 582/42 都市言情 584/42 武侠仙侠 583/42 青春校园 1514/42 穿越架空 1516/42 惊悚悬疑 585/42 历史军事 586/42 游戏竞技 1519/42 耽美同人 1517/42 文学经典 1520/42 完结 1694/42 免费 587/42
  baidu: "https://top.baidu.com/mobile_v2/buzz", 
  // hotspot
  hitokoto:host+'/imjadHitokoto',
  hotspotBaidu:host+"/hotspotBaidu"|| "https://top.baidu.com/mobile_v2/buzz/hotspot",
  hotspotWeibo:
  host+"/hotspotWeibo?pageSize=50"||"https://m.client.10010.com/service_toutiao/weibo/getWeiBoReSouList?pageSize=50",
  hotspotZhihu:
  host+"/hotspotZhihu?limit=50&desktop=true"||"https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true",
};

// plan
/**
 * 天气
 * iptv
 *
 */
