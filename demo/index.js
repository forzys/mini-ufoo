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
      { menu: { title: 'menssssu1sssssss' } },
      { menu: { title: 'menu2' } },
      { menu: { title: 'menu3' } },
      { menu: { title: 'menu4' } },
      { menu: { title: 'menu5' } },
      { menu: { title: 'menu6' } },
      { menu: { title: 'menu7' } },
      { menu: { title: 'menu8' } },
      { menu: { title: 'menu9' } },
      { menu: { title: 'menu0' } },
    ],

    menus: [
      {name:'小说',url:'pages/webfiction/index'},
      {name:'壁纸',url:'pages/wallpaper/index' },
      {name:'天气',url:'pages/wallpaper/index' },
      {name:'热点',url:'pages/wallpaper/index' },
      {name:'新闻',url:'pages/wallpaper/index' },
    ],

    position:'left',
  },

  change:function(){ 
    const tabs = ['left','right','top','bottom'] 
    this.i  = this.i || 0  
    this.i += 1
    this.i = this.i%4
 
    this.setData({position:tabs[this.i]}) 
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
