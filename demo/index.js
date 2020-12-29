//index.js
//获取应用实例 
var appInstance = getApp()
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
    // const all = storage.getSessionStorage()
     console.log(appInstance)

    //  appInstance.globalData.getSysInfo()
  },
});
