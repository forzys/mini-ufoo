//index.js
//获取应用实例 
const useFetchRequest = require("../../utils/request"); 
import iptvs from '../../utils/iptv.js' 
/**
 *  television play
 */
Page({
  data: { 
  },
  onLoad: function () { 
    this.videoContext = wx.createVideoContext('iptv-video-player')
  },
  onShow: function () {
    if (this.videoContext) {
      this.videoContext.pause() 
    }
  }, 
});
