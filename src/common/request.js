import API from "./api";
import storage from "./storage";
import { useRef, useState } from "nervjs";

const useFetchRequest = () => {
  const [froce, setFroce] = useState(false);
  const [loading, setLoading] = useState(false);
  const requestRef = useRef();
  const fetch = (params) => {
    setLoading(true);
    let keepAlive = null;
    const { url, header, data, callback, alive = true, keep } = params;
    const path = API[url] || url;

    // 缓存判断
    if (alive) {
      if (keep) {
        keepAlive = storage.getLocalStorage(path);
      } else {
        keepAlive = storage.getSessionStorage(path);
      }
    }

    if (keepAlive) {
      callback && callback(keepAlive, requestRef);
      setLoading(false);
    }

    if (!keepAlive) {
      wx.request({
        url: path,
        header: header && { ...header },
        data: data && { ...data },
        success: (result) => {
          if (alive) {
            if (keep) {
              storage.setLocalStorage(path, result, keep);
            } else {
              storage.setSessionStorage(path, result);
            }
          }
          callback && callback(result, requestRef);
        },
        complete: setLoading.bind(null, false),
      });
    }
  };

  const updateRef = (params) => {
    for (let k in params) {
      requestRef.current[k] = params[k];
    }
    setFroce(!froce);
  };
  return { froce, loading, fetch, updateRef, ...requestRef.current };
};

export { useFetchRequest };
