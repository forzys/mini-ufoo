//index.js
//获取应用实例
import storage from "../../utils/storage";
import { getGlobalInfo } from "../../utils/util";
const iconURL = "../../static/ufo.png";
const { useFetchRequest } = require("../../utils/request.js");

Page({
  data: {
    motto: "ufoo",
    userInfo: {},
    avatarUrl: iconURL,
    nickName: "ufoo",
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: "../hotspot/index",
    });
  },
  onLoad: function () {
    const userInfo = storage.getSessionStorage("userInfo");
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
      });
    } else if (this.data.canIUse) {
      getGlobalInfo((res) => {
        const userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          hasUserInfo: true,
        });
      });
    } else {
      // 在没有 open-type= getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          const userInfo = res.userInfo;
          storage.setSessionStorage("userInfo", res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            hasUserInfo: true,
          });
        },
      });
    }
  },
  getUserInfo: function (e) {
    storage.setSessionStorage("userInfo", e.detail.userInfo);
    const userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      hasUserInfo: true,
    });
  },
});
