const storage = require("../../utils/storage");
const config = {
  custom: storage.getSessionStorage("custom") || 0,
  customBarH: storage.getSessionStorage("customBarH") || 0,
  statusBarH: storage.getSessionStorage("statusBarH") || 0,
};
Component({
  options: {
    multipleSlots: true,
  },
  properties: {},
  data: {
    // 这里是一些组件内部数据
    config: config,
  },
  methods: {
    // 这里是一个自定义方法
    onBack: function () {},
  },
});
