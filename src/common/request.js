import API from "./api";
import storage from "./storage";
import { useRef, useState } from "nervjs";

const useFetchRequest = () => {
  const requestRef = useRef();
  const [froce, setFroce] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = (params) => {
    setLoading(true);
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
      setLoading(false);
      callback && callback(keepAlive, requestRef);
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
          callback && callback(result, requestRef);
          setLoading(false);
        },
        fail: (e) => {
          console.log(e);
        },
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
