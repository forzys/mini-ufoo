Component({
  options: {
    multipleSlots: false, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    info: {
      type: Object,
    },
    templateId: {
      type: String,
    },
  },
  data: {
    // 这里是一些组件内部数据
    current: 0,
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {},
    onChangeCurrent: function (e) {
      const dataset = e.currentTarget.dataset;
      this.setData({
        current: dataset.current,
      });
    },
  },
});
