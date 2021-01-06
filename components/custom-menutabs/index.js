const app = getApp();
//是否显示 默认不显示 
const state = app.globalData
const init = app.globalData.state  
const height = init.windowH

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    bg: String,
    url: String,
    menu: Boolean, 
    hitokoto:Boolean,
    back: Boolean,
    title: String,
  },

  data: {
    tokoto:"",
    state: {
      windowH: init.windowH,
      navBarH: init.customBarH,
      statusBarH: init.statusBarH,
      contentH: init.customBarH - init.statusBarH,
      capsuleW: init.windowW - init.capsule.left,
    }, 
    menus: [
      {name:'热点',forbid:false,img:'../../assets/hotspot.png',path:'/pages/hotspot/index'},
      {name:'壁纸',forbid:false,img:'../../assets/hotspot.png',path:'/pages/wallpaper/index'},
      {name:'天气',forbid:true,img:'../../assets/hotspot.png',path:'/pages/hotspot/index' },
      {name:'电视',forbid:true,img:'../../assets/hotspot.png',path:'/pages/hotspot/index' },
      {name:'漫画',forbid:true,img:'../../assets/hotspot.png',path:'/pages/hotspot/index' },
      {name:'影视',forbid:true,img:'../../assets/hotspot.png',path:'/pages/hotspot/index' },
      {name:'音乐',forbid:true,img:'../../assets/hotspot.png',path:'/pages/hotspot/index' },
      {name:'好物',forbid:true,img:'../../assets/hotspot.png',path:'/pages/hotspot/index' },
    ],
    hidden: true, //默认为隐藏
    show:false,    
    animation:null, 
  },

  lifetimes: {
    attached: function() {
      console.log('-----组件初始化:',this.data.hitokoto ) 
      this.setData({
        animation: wx.createAnimation({
          duration: 300,
          timingFunction: 'linear',
        })
      })
      if(this.data.hitokoto){
        this.getHitokoto()
      } 
    }
  },
  pageLifetimes:{
    hide: function() { // 页面被隐藏
      this.setData({ show:false })
    },
  },

  methods: { 
    onTitleTap:function(){ 
      if(this.data.menu){
        this.onMenuTap()
      }  this.triggerEvent("onTitleTap"); 
    }, 
    onMenuTap: function () {
      let { show , animation,hitokoto } = this.data
      var menuStyle = ''  
      //判断是否显示
      if (!show) { 
        animation.scale(height / 15).step() 
        menuStyle = 'menuOpen'
      } else { 
        animation.scale(0).step() 
        menuStyle = 'menuClose'
      }
      show = !show //存储显示状态
      this.setData({
        hidden: false,
        animationData: animation.export(), //动画赋值
        menuStyle: menuStyle, //加号按钮style赋值
      })
      //如果显示状态为true 延时200毫秒后执行内容显示 否则立即隐藏
  
      if(show){
        setTimeout(()=>{
          this.setData({ show })
        }, 200) 
      }else{
        this.setData({ show })
        hitokoto && this.getHitokoto()
      } 
    }, 
    onJumpTo:function(e){ 
      var menu = e.currentTarget.dataset.menu 
      if(menu.forbid){  
        wx.showToast({
          title:'暂不支持',
          icon:'none',
        }) 

        return 
      }
      if(menu.path){  
        wx.switchTab({
          url:menu.path,
        }) 
        this.setData({ show:false })
      }
    },
    getHitokoto:function(){ 
      const fetch = state.fetch
      const storage = state.storage 
      const hitokotos =  storage.getLocalStorage('hitokotos') || []
       
      if(hitokotos.length < 10){ // 一言 - 列表
         fetch({
          url:'hitokoto',
          callback:(res)=>{
            hitokotos.push(res.data) 
            storage.setLocalStorage('hitokotos', hitokotos, 1000*60*3600*24)

            this.setData({
              tokoto: res.data,
            })
          }
        })
      }else{
        this.setData({
          tokoto:hitokotos[state.getRandom()],
        }) 
      } 
    }
  }
})
