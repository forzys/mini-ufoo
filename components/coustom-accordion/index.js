const storage = require("../../utils/storage");

Component({
  options: {
    multipleSlots: false, // 在组件定义时的选项中启用多slot支持
    styleIsolation: "apply-shared",
  },
  properties: {
    radio: Number,
    current: Number,
    template: String,
    accordionList: Array,
    accordionData: Object,
  },
  data: {
    // 这里是一些组件内部数据
    pageH: storage.getSessionStorage("pageH"),
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {},
    onChangeCurrent: function (e) {
      const dataset = e.currentTarget.dataset;
      const current = this.properties.current;
      const index = current === dataset.current ? -1 : dataset.current;
      this.setData({ current: index });
    },

    onRefreshing: function (e) {
      console.log("onRefreshing", e);
    },
  },
});
