const storage = require("../../utils/storage");
const pageH = storage.getSessionStorage("pageH");
Component({
  // options: {
  //   multipleSlots: false, // 在组件定义时的选项中启用多slot支持
  // },
  properties: {
    radio: {
      type: Number,
      value: 0.9,
    },
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
    templateId: {
      type: String,
    },
    swiperList: {
      type: Array,
      value: [],
    },
    swiperData: {
      type: Object,
    },
    current: {
      type: Number,
      value: 0,
    },
  },
  data: {
    // 这里是一些组件内部数据
    pageH: pageH,
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {},

    onChangeCurrent: function (e) {
      const dataset = e.currentTarget.dataset;
      this.setData({ current: dataset.current });
    },
    onScrollLower: function (e) {
      this.triggerEvent("scrollLower", {});
    },
  },
});
