//index.js
//获取应用实例 
var appInstance = getApp()
Page({
  data: {
    backgroundUrl: "",
    sentenceEnTxt: "",
    sentenceEnCon: "",
    sentenceZhTxt: "",

    tabs: [
      {
        menu: { title: 'menu1' },
        pane: { title: 'pane1' },
      },
      {
        menu: { title: 'menu2' },
        pane: { title: 'pane2' },
      },
      {
        menu: { title: 'menu3' },
        pane: { title: 'pane3' },
      },
      {
        menu: { title: 'menu4' },
        pane: { title: 'pane4' },
      },
    ],
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
