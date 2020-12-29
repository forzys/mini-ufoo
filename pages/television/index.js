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
    extra: {
      status: 0,
      videoText: ``
    },

  },
  onLoad: function () {
    this.getFetchIptv();
    this.videoContext = wx.createVideoContext('iptv-video-player')
  },
  onShow: function () {
    if (this.videoContext) {
      this.videoContext.pause() 
    }
  },

  onScrollTap: function (e) {
    const params = e.detail.params;
    this.setData({ play: params.playUrl, extra: { play: params.playUrl, status: 1, videoText: '正在缓冲...', } });
  },

  getFetchIptv() { 
    FetchIptv({
      url: "iptv",
      callback: (res) => {  
        if(res && Array.isArray( res.data) ){
          this.setData({ initList: res.data });
        }else{
          this.setData({ initList: iptvs }); 
        } 
      },
    });
  },

  setIptvList(tvlist, key) {
    const { initList } = this.data;
    const tvs = { ...initList };
    this.setData({ initList: { ...tvs } });
  },
 
  onPlayStatus(e) {
    if (e.type === 'error') {
      this.setData({ extra: { ...this.data.extra, status: 'tip', videoText: '播放失败' } });
    }
    if (e.type === 'play') {
      this.setData({ extra: { ...this.data.extra, status: '', videoText: '' } });
    }
    if (e.type === 'pause') {
      this.setData({ extra: { ...this.data.extra, status: '', videoText: '' } });
    }
  },

  onIptvLoad() {
    this.setData({ extra: { ...this.data.extra, videoText: '', status: '' } });
  }
});
