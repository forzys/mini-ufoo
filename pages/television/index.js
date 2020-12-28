//index.js
//获取应用实例
// const { hotspot } = require("../../utils/state");
const useFetchRequest = require("../../utils/request");
// const iptvs = require("../../utils/iptv.json");
import iptvs from '../../utils/iptv.js'
const { apis, useFetchRef, state, fetch: FetchIptv } = useFetchRequest();

/**
 *  television
 *  play
 */
Page({
  data: {
    play: "",
    radio: 0.6,
    current: 0,
    initList: [],
    extra:{  
      status:0,
      videoText:``
    },
    
  }, 
  onLoad: function () {
    this.getFetchIptv();
    this.videoContext = wx.createVideoContext('iptv-video-player')
    console.log(this.videoContext)
  },

  onScrollTap: function (e) {
    const params = e.detail.params;
    this.setData({ play: params.playUrl, extra:{ play:params.playUrl, status:1, videoText:'正在缓冲...',} });
  },

  getFetchIptv() {
    this.setData({ initList: iptvs.data });
    // FetchIptv({
    //   url: "iptv",
    //   callback: (res) => {
    //     res.data.data && this.setData({ initList: iptvs });
    //   },
    // });
  },

  setIptvList(tvlist, key) {
    const { initList } = this.data;
    const tvs = { ...initList };
    this.setData({ initList: { ...tvs } });
  },

  onIptvTap(e){
    // var curTime = e.timeStamp 
    // var lastTime = this.data.timex 
    // if (curTime - lastTime > 0) {
    //   if (curTime - lastTime < 300) {//是双击事件 
    //     if(this.data.extra.status !== 2){
    //       this.videoContext.requestFullScreen()
    //       this.setData({ extra:{...this.data.extra, status:2}})
    //     }
    //     if(this.data.extra.status !== 1){
    //       this.videoContext.exitFullScreen()
    //       this.setData({ extra:{...this.data.extra, status:1}})
    //     } 
    //   }else{
    //     if(this.data.extra.status !== 3){
    //       this.videoContext.pause()
    //       this.setData({ extra:{...this.data.extra, status:3, videoText:'已暂停'}})
    //     }
    //     if(this.data.extra.status !== 1){
    //       this.videoContext.requestFullScreen()
    //       this.setData({ extra:{...this.data.extra, status:1 }})
    //     } 
    //   }
    // }
    // this.setData({
    //   timex: curTime
    // }) 
  },
  onPlayError(e){ 
    if(e.type==='error'){
      this.setData({ extra:{...this.data.extra,status:'tip',videoText:'播放失败'} });
    }  
  }, 
  onIptvLoad(){
    this.setData({ extra:{...this.data.extra,videoText:'',status:''} });
  } 
});
