//index.js
//获取应用实例
import storage from "../../utils/storage";
import { getGlobalInfo } from "../../utils/util";
const iconURL = "../../static/ufo.png";
const useFetchRequest = require("../../utils/request");
const { apis, useFetchRef, state, fetch: FetchImg } = useFetchRequest();

Page({
  data: {
    backgroundUrl: "",
    sentenceEnTxt: "",
    sentenceEnCon: "",
    sentenceZhTxt: "",
  },
  //事件处理函数
  bindViewTap: function (e) {
    const dataset = e.currentTarget.dataset;
    const url = dataset.url;
    wx.navigateTo({
      url: `../${url}/index`,
    });
  },
  onLoad: function () {
    FetchImg({
      url: "http://192.168.2.251:8080/wallBing",
      data: { format: "js", n: 1 },
      alive: true,
      callback: (res) => {
        const data = res.data;
        const item = data && data.images[0];
        const url = apis.baseBing + item.url;
        this.setData({ backgroundUrl: url });
      },
    });
    FetchImg({
      url: "http://192.168.2.251:8080/dsapiIciba",
      alive: true,
      callback: (res) => {
        const data = res.data;
        const note = data && data.note;
        const content = data && data.content;
        this.setData({ sentenceEnTxt: content, sentenceEnCon: note });
      },
    });
    FetchImg({
      url: "http://192.168.2.251:8080/imjadHitokoto",
      alive: true,
      callback: (res) => {
        const data = res.data;
        this.setData({ sentenceZhTxt: data });
      },
    });
  },
});
