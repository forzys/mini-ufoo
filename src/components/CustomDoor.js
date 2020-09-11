import Taro from "@tarojs/taro";
import Nerv, { useState, useEffect, useCallback } from "nervjs";
import {
  View,
  Text,
  Block,
  Image,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import { useFetchRequest } from "../common/request";
import storage from "../common/storage";
import base64 from "../common/base64";
import "./global.less";

export default function CustomDoor(props) {
  const [windowH, setWindowH] = useState(0);
  const [custom, setCustom] = useState({});
  const [customBarH, setCustomBarH] = useState(0);
  const [statusBarH, setStatusBarH] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [touchStart, setTouchStart] = useState({});
  const { loading, fetch } = useFetchRequest();
  const { isBack, backStyle, contentStyle } = props;
  const { customBarClass, customBarBackClass } = props;

  useEffect(() => {
    const _custom = storage.getSessionStorage("custom");
    const _windowH = storage.getSessionStorage("windowH");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _statusBarH = storage.getSessionStorage("statusBarH");

    setCustom(_custom);
    setWindowH(_windowH);
    setCustomBarH(_customBarH);
    setStatusBarH(_statusBarH);

    // 获取配置数据
    fetch({
      url: "menu2",
      keep: 3600,
      callback: (res) => {
        console.log(res);
        const str = res.data.content;
        const decode = base64.decode(str);
        const json = JSON.parse(decode);
        const menu = json.data;
        setMenuList(menu);
      },
    });

    Taro.loadFontFace({
      global: true,
      family: "font-network",
      source:
        "url(https://cdn.jsdelivr.net/gh/mforz/dataset@latest/font/fontquan0001.ttf)",
    });
  }, []);

  const onBackPage = useCallback(() => {
    Taro.navigateBack();
  }, []);

  const onBackHome = useCallback(() => {
    Taro.reLaunch({ url: "/pages/index/index" });
  }, []);

  const onLockChange = useCallback(() => {
    let _isLockOpen = isLockOpen;
    // const _animation = storage.getSessionStorage("animation");
    // let _animation = 0;
    // _isLockOpen ? (_animation = 0) : (_animation = windowH * 2);

    _isLockOpen = !_isLockOpen;
    _isLockOpen
      ? setTimeout(() => {
          setIsLockOpen(_isLockOpen);
        }, 200)
      : setIsLockOpen(_isLockOpen);
    // setAnimation(_animation);
  }, [isLockOpen, windowH]);

  const onDoorOpen = useCallback(
    (i) => {
      const { path } = i;
      console.log("path", path);
      Taro.navigateTo({
        url: path,
      });
    },
    [isLockOpen, windowH]
  );

  const onFacadeStart = useCallback((e) => {
    setTouchStart(e.changedTouches[0]);
  }, []);

  const onFacadeMove = useCallback(
    (e) => {
      // const _animation = storage.getSessionStorage("animation");
      let _animation = null;
      const touchEnd = e.changedTouches[0];
      const moveX = touchEnd.pageX - touchStart.pageX;
      const moveY = touchEnd.pageY - touchStart.pageY;
      if (moveY > 20 && moveY < 100) {
        let _scale = (1 - (1 / 200) * moveX) * 2 * windowH;
        // _animation.scale(_scale).translateZ(0).step();
        _animation = _scale;
      }
      // 移动距离大于 100 动效关闭 状态关闭
      if (moveY > 100) {
        // _animation.scale(0).step();
        _animation = 0;
        setIsLockOpen(false);
      }
      setAnimation(_animation);
    },
    [touchStart, windowH]
  );

  const onFacadeEnd = useCallback(
    (e) => {
      let _animation = null;
      // const _animation = storage.getSessionStorage("animation");
      const touchEnd = e.changedTouches[0];
      const moveY = touchEnd.pageY - touchStart.pageY;
      // 移动距离小于 100  返回状态
      if (moveY < 100) {
        setIsLockOpen(true);
        _animation = windowH * 2;
        // _animation.scale(windowH / 15).step();
      }
      // 移动距离大于 100
      if (moveY > 100) {
        setIsLockOpen(false);
        _animation = 0;
        // _animation.scale(0).step();
      }
      setAnimation(_animation);
    },
    [touchStart]
  );

  return (
    <View className="door-custom" style={{ height: `${customBarH}px` }}>
      {/* door bar */}
      <View className="door-bar fixed" style={{ height: `${customBarH}px` }}>
        <View
          className={["bar-custom", customBarClass]}
          style={{
            width: `${custom.left}px`,
            paddingTop: `${statusBarH}px`,
          }}
        >
          {isBack && (
            <View
              className="back"
              onClick={customBarBackClass && onBackPage}
              style={{ ...backStyle }}
            >
              <Text className={[customBarBackClass]}></Text>
              {this.props.renderBack}
            </View>
          )}

          <View className="content" style={{ ...contentStyle }}>
            {this.props.renderContent}
          </View>
        </View>
      </View>

      {/* door lock */}
      <View className="door-lock fixed" onClick={onLockChange}>
        <View>
          <Text
            className={["iconfont", loading ? "icon-loading" : "icon-my"]}
          />
        </View>
      </View>

      {/* door facade */}
      <View
        className={["door-facade fixed", isLockOpen ? "open" : "close"]}
        onTouchStart={onFacadeStart}
        onTouchMove={onFacadeMove}
        onTouchEnd={onFacadeEnd}
        catchtouchmove
      >
        {menuList.map((item, index) => {
          return (
            <View
              className={["menu-list", isLockOpen ? "animation" : ""]}
              style={{ animationDelay: (index + 1) * 0.1 + "s" }}
            >
              {item.type === 1 &&
                item.menu.map((i) => {
                  return (
                    <View
                      className="menu"
                      style={i.style}
                      onClick={onDoorOpen.bind(null, i)}
                    >
                      <Image
                        className="icon"
                        style={i.iconStyle}
                        src={i.icon}
                      />
                      <Text className="name" style={i.nameStyle}>
                        {i.name}
                      </Text>
                    </View>
                  );
                })}
              {item.type === 3 && (
                <Swiper
                  className="banner-list"
                  style={item.style}
                  indicatorColor="#999"
                  indicatorActiveColor="#333"
                  vertical={false}
                  circular
                  autoplay={isLockOpen}
                  duration={item.duration || 500}
                  interval={item.interval || 5000}
                >
                  {item.banner.map((i) => {
                    return (
                      <SwiperItem className="banner" style={i.style}>
                        <Image
                          className="img"
                          style={i.bannerStyle}
                          src={i.url}
                        />
                        <Text className="info" style={i.infoStyle}>
                          {i.info}
                        </Text>
                      </SwiperItem>
                    );
                  })}
                </Swiper>
              )}
            </View>
          );
        })}
      </View>

      {/* door curtain */}
      <View className="ripple">
        <View
          className="ripple-main"
          // animation={animation}
          style={{
            borderRadius: windowH + "px",
            // height: windowH / 15 + "px",
            // width: windowH / 15 + "px",
            // transform: animation ? "scale(2)" : "scale(0)",
            // width: animation + "px",
            // height: animation + "px",
            transition: "all 1s ease",
          }}
        />
      </View>
    </View>
  );
}
