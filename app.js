const { getGlobalInfo } = require('./utils/util')
//app.js
App({
  onLaunch: function () {
    getGlobalInfo()
  }
})