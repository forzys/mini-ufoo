const storage = require("../../utils/storage");
Component({
  options: {
    multipleSlots: false, // 在组件定义时的选项中启用多slot支持
    styleIsolation: "apply-shared",
  },
  properties: {
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
  },
  data: {
    // 这里是一些组件内部数据
    pageH: storage.getSessionStorage("pageH"),
  },
  methods: {
    // 这里是一个自定义方法
    onScrollLower: function (e) {
      this.triggerEvent("scrollLower", {});
    },
    onChangeCurrent: function (e) {
      const dataset = e.currentTarget.dataset;
      this.setData({ current: dataset.current });
    },
  },
});
