const storage = require("../../utils/storage");
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: "apply-shared",
  },
  properties: {
    headerClass: String,
    config: {
      type: Object,
      value: {
        circular: true,
        vertical: false,
        interval: 5000,
        autoplay: false,
        dots: false,
        duration: 500,
      },
    },
    swiperKey: {
      type: String,
      value: "key",
    },
    swiperName: {
      type: String,
      value: "name",
    },
    radio: Number,
    current: Number,
    template: String,
    swiperList: Array,
    swiperData: Object,
    headerClass: String,
  },
  data: {
    // 这里是一些组件内部数据
    pageH: storage.getSessionStorage("pageH"),
    timex: 0,
    top:0,
  },
  methods: {
    // 这里是一个自定义方法
    // onScrollLower: function (e) {
    //   this.triggerEvent("scrollLower", {});
    // }, 
    onChangeCurrent: function (e) {
      const dataset = e.currentTarget.dataset;
      this.setData({ current: dataset.current });
 
      var curTime = e.timeStamp 
      var lastTime = this.data.timex 
      if (curTime - lastTime > 0) {
        if (curTime - lastTime < 300) {//是双击事件 
          this.setData({
            top: this.data.top?0:1
          }) 
        } 
      }
      this.setData({
        timex: curTime
      }) 
    },
  },
});
