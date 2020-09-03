// https://gitee.com/mforz/iptv/raw/master/cn.json

const staticAPIs = {
  // iptv2: "https://gitee.com/api/v5/repos/mforz/iptv/contents/china.json",
  // cn: "https://gitee.com/api/v5/repos/mforz/iptv/contents/cn.json",
  // genre: "https://gitee.com/api/v5/repos/mforz/iptv/contents/genre.json",
  // test: "https://gitee.com/api/v5/repos/mforz/iptv/contents/test.json",
  // di: "https://gitee.com/api/v5/repos/mforz/iptv/contents/di.json",
  iptv: "https://cdn.jsdelivr.net/gh/mforz/dataset/iptv/index.json",
  bing: "https://cn.bing.com/HPImageArchive.aspx?format=js&n=5",

  iptv: {
    m3u8: "https://cdn.jsdelivr.net/gh/mforz/dataset/iptv/index.json",
  },
  wallpaper: {
    search: "https://so.picasso.adesk.com/v1/",
    wall: "https://service.picasso.adesk.com/v1/",
  },
};

export default staticAPIs;
