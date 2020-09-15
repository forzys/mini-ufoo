//index.js
//获取应用实例
import storage from "../../utils/storage";
import { getGlobalInfo } from "../../utils/util";
const iconURL = "../../static/ufo.png";
const { useFetchRequest } = require("../../utils/request.js");
const { request, apis, fetch, useFetchRef, state } = useFetchRequest()
Page({
  data: {
    initList: [
      {
        name: "热门",
        key: "hot",
        url: 'picasso',
        data: {
          first: 0,
          order: "hot",
          limit: 30,
          skip: 0,
          adult: false,
        },
      },
      {
        name: "最新",
        key: "new",
        url: 'picasso',
        data: {
          first: 0,
          order: "new",
          limit: 30,
          skip: 0,
          adult: false,
        },
      },
      {
        name: "每日一图",
        key: "bing",
        url: 'bing',
      },
    ],
    initState: {},
  },
  onLoad: function () {
    const { initList } = this.data
    initList.forEach(item => {
      console.log(state)
      fetch({
        url: item.url,
        data: item.data,
        callback: (res) => {
          const data = res.data
          let list = []
          item.url === 'bing' && (list = data.images)
          item.url === 'picasso' && (list = data.res.vertical)
          this.setPaperList(list, item.key)
        }
      })
    });
  },
  setPaperList(list, key) {
    const data = this.data
    const init = data.initState
    if (!Array.isArray(list)) {
      return
    }
    if (key !== 'bing') {
      const picasso = [];
      let _list = [];
      for (let i = 1; i < list.length; i += 2) {
        const item = [list[i - 1], list[i]];
        picasso.push(item);
      }
      if (Array.isArray(init[key])) {
        _list = init[key]
      }
      this.setData({
        initState: {
          ...init,
          [key]: [..._list, ...picasso]
        }
      })
    }
    if (key === 'bing') {
      const bing = list.map((x) => ({
        ...x,
        img: apis.baseBing + x.url,
        tag: x.enddate,
        info: x.copyright,
      }));
      this.setData({
        initState: {
          ...init,
          [key]: bing
        }
      })
    }
  }

});
