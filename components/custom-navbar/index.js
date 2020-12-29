
const app = getApp()
const init = app.globalData.state
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    url: String,
    back: Boolean,
    title: String,
  },
  data: {
    state: {
      navBarH: init.customBarH,
      statusBarH: init.statusBarH,
      contentH: init.customBarH - init.statusBarH,
      capsuleW: init.windowW - init.capsule.left,
    },
  },
  lifetimes: {
    attached: () => {
      console.log('-----组件初始化:', this)
    }
  },

  methods: { // 这里是一个自定义方法
    onBack: function () {
      wx.navigateBack()
    },
  },
});
