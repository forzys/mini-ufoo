const storage = require("./storage");
const {fetch} = require("./request")();

const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

const replaceNumber = (n, str, word) => {
  n && (n = n.toString());
  if (!str && !word) {
    n.length > 4 && (n = n.substr(0, n.length - 4) + "w");
  }
  if (str && !word) {
    n = n.replace(str, "w");
  }
  if (str && word) {
    n = n.replace(str, word);
  }
  return n;
};

const getGlobalInfo = (callback) => {
  // 获取用户信息
  wx.getSetting({
    success: (res) => {
      if (res.authSetting["scope.userInfo"]) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: (res) => {
            // , 7 * 24 * 3600 * 1000
            storage.setSessionStorage("userInfo", res.userInfo);
            callback && callback(res);
          },
        });
      }
    },
  });
  wx.getSystemInfo({
    success: (e) => {
      const capsule = wx.getMenuButtonBoundingClientRect();
      const customBarH = capsule.bottom + capsule.top - e.statusBarHeight;
      const pageH = e.windowHeight - customBarH;

      storage.setSessionStorage("pageH", pageH);
      storage.setSessionStorage("capsule", capsule);
      storage.setSessionStorage("windowW", e.windowWidth);
      storage.setSessionStorage("windowH", e.windowHeight);
      storage.setSessionStorage("customBarH", customBarH);
      storage.setSessionStorage("statusBarH", e.statusBarHeight);

      if (!capsule) {
        storage.setSessionStorage("customBarH", e.statusBarHeight + 50);
      }
    },
  });
};

const debounce = (fn, time) => {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};

const globalInfo = {
  state: {},
  fetch,
  storage,
  getRandom:function(range){
    range = range || [0,9]
    const [min, max] = range
    min > max && (range = [max, min])
    return Math.floor( Math.random()* (max-min + 1) ) + min
  },
  getSystemInfo: function () {
    wx.getSystemInfo({
      success: (e) => {
        const capsule = wx.getMenuButtonBoundingClientRect();
        const customBarH = capsule.bottom + capsule.top - e.statusBarHeight + 3;
        const pageH = e.windowHeight - customBarH;
        storage.setSessionStorage("pageH", pageH);
        storage.setSessionStorage("capsule", capsule);
        storage.setSessionStorage("windowW", e.windowWidth);
        storage.setSessionStorage("windowH", e.windowHeight);
        storage.setSessionStorage("customBarH", customBarH);
        storage.setSessionStorage("statusBarH", e.statusBarHeight);
        if (!capsule) {
          storage.setSessionStorage("customBarH", e.statusBarHeight + 50);
        }
        this.setState({
          pageH: pageH,
          capsule: capsule,
          windowW: e.windowWidth,
          windowH: e.windowHeight,
          customBarH: capsule ? customBarH : e.statusBarHeight + 50,
          statusBarH: e.statusBarHeight,
        })
      },
    });
  },
  setState: function (info) {
    if (typeof info !== 'object') {
      return
    }
    for (let i in info) {
      this.state[i] = info[i]
    }
  }
}

module.exports = {
  formatTime: formatTime,
  replaceNumber: replaceNumber,
  getGlobalInfo: getGlobalInfo,
  globalInfo: globalInfo,
};
