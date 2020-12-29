
const app = getApp()  
const init = app.globalData.state

Component({
  options: {
    multipleSlots: true,
  },
  properties: {},
  data: {
    // 这里是一些组件内部数据 
    state:{
      ...init,
      navBarH: init.customBarH,
      statusBarH: init.statusBarH,
      contentH: init.customBarH - init.statusBarH,
      capsuleW: init.windowW - init.capsule.left,
    },
  }, 
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached:()=>{console.log(2)}
  }, 
  attached: function(){
      console.log(3)
  },
  methods: {
    // 这里是一个自定义方法
    onBack: function () {
      wx.navigateBack()
    },
  },
});
