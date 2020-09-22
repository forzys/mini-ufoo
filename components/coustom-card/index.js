const storage = require("../../utils/storage");

Component({
  options: {
    multipleSlots: true,
  },
  properties: {},
  data: {
    // 这里是一些组件内部数据
    pageH: storage.getSessionStorage("pageH") || 0,
  },
  methods: {
    // 这里是一个自定义方法
    onBack: function () {},
  },
});
