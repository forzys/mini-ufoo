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
  },
  methods: {
    // 这里是一个自定义方法
    // onScrollLower: function (e) {
    //   this.triggerEvent("scrollLower", {});
    // },
    onScrollTap: function (e) {
      const dataset = e.currentTarget.dataset;
      this.triggerEvent("scrollTap", { ...dataset });
    },
    onChangeCurrent: function (e) {
      const dataset = e.currentTarget.dataset;
      this.setData({ current: dataset.current });
    },
  },
});
