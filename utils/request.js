const API = require("./api");
const storage = require("./storage");

class FetchRequest {
  constructor() {
    this.apis = API;
    this.state = {};
    this.loading = false;
  }

  useFetchRef(params) {
    for (let k in params) {
      this.state[k] = params[k];
    }
  }

  getParams(data, path) {
    let str = "";
    if (typeof data === "object") {
      const keys = Object.keys(data);
      if (keys.length) {
        const paramsList = keys.map((key) => `${key}=${data[key]}`);
        const dots = path.includes("?") ? "&" : "?";
        str = dots + paramsList.join("&");
      }
    }
    if (typeof data === "string") {
      const dots = path.includes("?") ? "&" : "?";
      str = dots + data;
    }
    return str;
  }

  fetch(params) {
    this.loading = true;
    let keepAlive = null;
    const { url } = params;
    const path = API[url] || url;
    const { header, data, join, callback, alive = true, keep } = params;

    // 判断逻辑
    let str = this.getParams(data, path);
    // 缓存判断
    if (alive) {
      keepAlive = keep
        ? storage.getLocalStorage(path + str)
        : storage.getSessionStorage(path + str);

      if (keepAlive) {
        this.loading = false;
        callback && callback(keepAlive);
      }
    }

    //
    if (!keepAlive) {
      wx.request({
        url: path + (join ? data : ''),
        header: header,
        data: data,
        success: (result) => {
          if (alive) {
            keep
              ? storage.setLocalStorage(path + str, result, keep)
              : storage.setSessionStorage(path + str, result);
          }
          callback && callback(result);
          this.loading = false;
        },
        fail: (e) => {
          console.log(e);
        },
      });
    }
  }
}

const useFetchRequest = () => {
  const request = new FetchRequest();
  return {
    ...request,
    fetch: (params) => request.fetch(params),
    useFetchRef: (params) => request.useFetchRef(params),
  };
};

module.exports = { useFetchRequest };
