const storage = require("../../utils/storage");

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    tabs: Array,
    external:Boolean,
  },
  data: {
    // 这里是一些组件内部数据
    pageH: storage.getSessionStorage("pageH") || 0,
    current: 0,
  },
  ready: function() {console.log(this.data)},
  
  methods: {
    // 这里是一个自定义方法 

    ready: function() {console.log(this.date)},
    onBack: function () {}, 
    onChange:function(e){
      console.log(e)
    }, 
    onTap:function(){ 
      console.log(  this.menus, this.data) 
    }
  },
});
