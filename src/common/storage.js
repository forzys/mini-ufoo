const globalData = {};
const storage = {
  // 获取会话内存储的值
  getSessionStorage(key) {
    try {
      return globalData[key];
    } catch (err) {
      return null;
    }
  },
  // 写入会话内缓存
  setSessionStorage(key, value) {
    try {
      globalData[key] = value;
      return true;
    } catch (err) {
      return false;
    }
  },
  // 移除会话内的单个存储
  removeSessionStorage(key) {
    try {
      return delete globalData[key];
    } catch (err) {
      return null;
    }
  },
  //本地永久存储写入有效期，有效期内会取出来，失效后会清空。exp 是有效时间的毫秒数
  setLocalStorage(key, value, exp) {
    let tmpData = { data: value, exp, startTime: new Date().getTime() };
    wx.setStorageSync(key, tmpData);
  },
  // 处理数据本地数据缓存返回
  handleLocalDataBack(tmpData, key) {
    let returnData = null;
    let date = new Date().getTime();
    // 如果有设置过期时间
    if (tmpData && tmpData.exp) {
      if (date - tmpData.startTime > tmpData.exp) {
        //缓存过期，清除缓存，返回false
        wx.removeStorageSync(key);
        returnData = null;
      } else {
        //缓存未过期，返回值
        returnData = tmpData.data;
      }
    } else {
      returnData = tmpData;
    }
    return returnData;
  },

  // 移除所有的wx-mini过期的本地缓存
  removeAllWxMiniExp() {
    let that = this;
    wx.getStorageInfo({
      success: function (res) {
        let keys = res.keys;
        keys.forEach((key) => {
          that.handleLocalDataBack(wx.getStorageSync(key), key);
        });
      },
    });
  },
  // 移除所有的本地存储
  removeAllLocal() {
    wx.clearStorageSync();
  },
  // 移除本地所有的过期的缓存
  removeAllLocalExp() {
    this.removeAllWxMiniExp();
  },
  //本地取出存储的值
  getLocalStorage(key) {
    let tmpData = null;
    //小程序需要写入全局变量
    tmpData = wx.getStorageSync(key) ? wx.getStorageSync(key) : null;
    return this.handleLocalDataBack(tmpData, key);
  },
  //本地删除存储
  removeLocalStorage(key) {
    wx.removeStorageSync(key);
  },
};

export default storage;
