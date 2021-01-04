const app = getApp();
//是否显示 默认不显示
var isShow = false,
  //动画对象实例
  animation,
  //获取当前设备的高度
  height = wx.getSystemInfoSync().windowHeight;

const init = app.globalData.state

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    url: String,
    menu: Boolean,
    back: Boolean,
    title: String,
  },

  data: {
    state: {
      navBarH: init.customBarH,
      statusBarH: init.statusBarH,
      contentH: init.customBarH - init.statusBarH,
      capsuleW: init.windowW - init.capsule.left,
    },

    // StatusBar: app.globalData.StatusBar, //状态栏高度
    // CustomBar: app.globalData.CustomBar, //titleBar高度
    CustomBar: init.customBarH,
    StatusBar: init.statusBarH,
    // navBarH: init.customBarH,
    // statusBarH: init.statusBarH,
    // contentH: init.customBarH - init.statusBarH,
    // capsuleW: init.windowW - init.capsule.left,

    hidden: true, //默认为隐藏
    isShow,
    //默认为圆形    宽高为设备高度÷15      
    myStyle: "border-radius: " +
      height + "px;height: " +
      height / 15 + "px;width: " +
      height / 15 + "px;",
    nav: [{
      navigation: [{
        name: '动态',
        src: '../../assets/hotspot.png'
      },
      {
        name: '酷图',
        src: '../../assets/weather.png'
      },
      {
        name: '应用集',
        src: '../../assets/wallpaper.png'
      },
      {
        name: '扫一扫',
        src: '../../assets/hotspot.png'
      },

      ],
    }, {
      navigation: [{
        name: '分享',
        src: '../../assets/wallpaper.png'
      },
      {
        name: '图文',
        src: '../../assets/hotspot.png'
      },
      {
        name: '提问',
        src: '../../assets/weather.png'
      },
      {
        name: '话题',
        src: '../../assets/hotspot.png'
      },

      ],
    }]
  },

  lifetimes: {
    attached: () => {
      console.log('-----组件初始化:', this)
      animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear',
      })
    }
  },

  methods: {
    onClickAdd: function (e) {
      var menuStyle = ''
      var that = this
      that.animation = animation
      that.setData({
        hidden: false, //隐藏白色面板(ripple)
        menuStyle: menuStyle, //设置底部加号按钮style
      })
      //判断是否显示
      if (!isShow) {
        //未显示 则执行动画 缩放设备高度÷15高度
        that.animation.scale(height / 15).step()
        //加号按钮执行打开动画
        menuStyle = 'menuOpen'
      } else {
        //已显示 则执行动画 缩放回0
        that.animation.scale(0).step()
        //加号按钮执行关闭动画
        menuStyle = 'menuClose'
      }
      isShow = !isShow //存储显示状态
      that.setData({
        animationData: that.animation.export(), //动画赋值
        menuStyle: menuStyle, //加号按钮style赋值
      })
      //如果显示状态为true 延时200毫秒后执行内容显示 否则立即隐藏
      isShow ?
        setTimeout(function () {
          that.setData({
            isShow
          })
        }, 200) : that.setData({
          isShow
        })
    },
  }
})
