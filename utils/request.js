import API from "./api";
import storage from "./storage";

class FetchRequest {
  constructor() {
    this.loading = false;
    this.state = {};
  }
  useFetchRef(params) {
    for (let k in params) {
      this.state[k] = params[k];
    }
  }
  fetch() {
    this.loading = true;
    let keepAlive = null;
    const { url } = params;
    const path = API[url] || url;
    const { header, data, callback, alive = true, keep } = params;
    // 缓存判断
    if (alive) {
      if (keep) {
        keepAlive = storage.getLocalStorage(path);
      } else {
        keepAlive = storage.getSessionStorage(path);
      }
    }
    if (keepAlive) {
      this.loading = false;
      callback && callback(keepAlive);
    }
    if (!keepAlive) {
      wx.request({
        url: path,
        header: header && { ...header },
        data: data && { ...data },
        success: (result) => {
          if (alive) {
            keep
              ? storage.setLocalStorage(path, result, keep)
              : storage.setSessionStorage(path, result);
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
  return { request, ...request, ...request.state };
};

export { useFetchRequest };
