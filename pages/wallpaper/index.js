//index.js
//获取应用实例
import storage from "../../utils/storage";
import { getGlobalInfo } from "../../utils/util";
const iconURL = "../../static/ufo.png";
const { useFetchRequest } = require("../../utils/request.js");

Page({
  data: {
    initList: [
      {
        name: "热门",
        key: "hot",
      },
      {
        name: "最新",
        key: "new",
      },
      {
        name: "每日一图",
        key: "bing",
      },
    ],
  },
  onLoad: function () {},
});
