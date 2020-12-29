const storage = require("../../utils/storage");

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    tabs: Array,
    external: Boolean,
    position: {
      type: String,
      value: 'left',
    },
  },
  data: {
    // 这里是一些组件内部数据
    pageH: storage.getSessionStorage("pageH") || 0,
    current: 0,
    state: {},
  },
  ready: function () {
    const { position } = this.data
    const sx = ['top', 'bottom'].includes(position)
    const sy = ['left', 'right'].includes(position)

    this.setData({ sx, sy })

    console.log(this.data, position)
  },

  methods: {
    // 这里是一个自定义方法 

    ready: function () { console.log(this.date) },
    onBack: function () { },
    onChange: function (e) {
      console.log(e)
    },
    onTap: function () {
      console.log(this.menus, this.data)
    }
  },
});
