const storage = require("../../utils/storage");

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    tabs: Array,
    menuExtra: Boolean,
    paneExtra: Boolean,
    position: {
      type: String,
      value: 'left',
    },
    distanceMax:{
      type: Number,
      value: 100,
    },
    distanceMin:{
      type: Number,
      value: 10,
    }, 
  },
  data: { // 这里是一些组件内部数据  
    state: {},
    curr: 0,
    move:0,
    moving:'',
    
  },
  ready: function () {
    const { position } = this.data
    const sx = ['top', 'bottom'].includes(position)
    const sy = ['left', 'right'].includes(position) 
    this.setData({ sx, sy }) 
  }, 
  methods: { // 这里是一个自定义方法  
    onChange: function (e) {
      console.log(e)
    },
    onTap: function (e) { 
      const dataset = e.currentTarget.dataset  
      this.setData({ curr:dataset.curr }) 
    }, 
    onTouchStart:function(e){ 
      const { position } = this.data
      const start = e.touches[0] 
      const sx = ['top', 'bottom'].includes(position)
      const sy = ['left', 'right'].includes(position) 
      this.data.sx = sx 
      this.data.sy = sy
      this.data.state.startX = start.pageX
      this.data.state.startY = start.pageY 
     
    },
    onTouchMove:function(e){  
      const {  sy, state, tabs, curr,distanceMin} = this.data
      const len = tabs.length - 1 
      const move = e.touches[0]  
      const moveX = Math.floor((state.startX - move.pageX) * 100)/100
      const moveY = Math.floor((state.startY - move.pageY) * 100)/100
      // const absX = Math.abs(moveX) 
      // const absY = Math.abs(moveY)  
      // console.log(absX, absY) 
      // if(sx && absY > absX) return 
      // if(sy && absX > absY) return  
      const min = curr === 0 && (sy ? moveY < distanceMin: moveX < distanceMin) 
      const max = curr === len && (sy ? moveY > distanceMin: moveX> distanceMin) 
     
      if(min || max){
        return
      } 
      this.setData({ move: sy ? moveY : moveX, moving:'moving' }) 
    },
    onTouchEnd:function(e){
      const { sy, curr, state,tabs, distanceMax } = this.data
      var index = curr
      const end = e.changedTouches[0] 
      const len = tabs.length - 1 
      const distanX = state.startX - end.pageX
      const distanY = state.startY - end.pageY 
      const distance = sy ? distanY: distanX  
      if(distance > distanceMax && curr < len){
        index += 1 
      } 
      if(distance < -distanceMax && curr > 0){
        index -= 1
      } 

      this.setData({
        move:0,
        moving:'',
        curr:index,  
      })
          
    },  
  },
});
