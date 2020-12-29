const { globalInfo } = require("./utils/util");
//app.js
App({
  onLaunch: function () { 
    globalInfo.getSystemInfo()
  },
  globalData:globalInfo,
});
