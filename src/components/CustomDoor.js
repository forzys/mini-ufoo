
import Nerv, { useState, useEffect, useCallback } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Block, Image, Swiper, SwiperItem } from "@tarojs/components";
import storage from "../common/storage";
import { useFetchRequest } from "../common/request";
import "./global.less";


export default function CustomDoor(props) {
  const [custom, setCustom] = useState({});
  const [animation, setAnimation] = useState(null);
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [windowH, setWindowH] = useState(0);
  const [customBarH, setCustomBarH] = useState(0);
  const [statusBarH, setStatusBarH] = useState(0);
  const [touchStart, setTouchStart] = useState({});
  const [menuList, setMenuList] = useState([]);
  const { loading, fetch } = useFetchRequest()
  const { isBack, backStyle, contentStyle } = props;
  const { customBarClass, customBarBackClass } = props;

  useEffect(() => {
    const _custom = storage.getSessionStorage("custom");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _statusBarH = storage.getSessionStorage("statusBarH");
    const _windowH = storage.getSessionStorage("windowH");

    setCustom(_custom);
    setCustomBarH(_customBarH);
    setStatusBarH(_statusBarH);
    setWindowH(_windowH);
    // 获取配置数据
    fetch({
      url: 'menu',
      duration: 3600,
      callback: (res) => {
        const menu = res.data.data
        setMenuList(menu)
      }
    })

    Taro.loadFontFace({
      global: true,
      family: 'font-quan',
      source: 'url(https://cdn.jsdelivr.net/gh/mforz/dataset@latest/font/fontquan0001.ttf)',
    })
  }, []);

  const onBackPage = useCallback(() => {
    Taro.navigateBack();
  }, []);

  const onBackHome = useCallback(() => {
    Taro.reLaunch({ url: "/pages/index/index" });
  }, []);

  const onLockChange = useCallback(() => {
    let _isLockOpen = isLockOpen;
    const _animation = storage.getSessionStorage("animation");
    _isLockOpen
      ? _animation.scale(0).step()
      : _animation.scale(windowH / 15).step();

    _isLockOpen = !_isLockOpen;
    _isLockOpen
      ? setTimeout(() => {
        setIsLockOpen(_isLockOpen);
      }, 200)
      : setIsLockOpen(_isLockOpen);
    setAnimation(_animation.export());
  }, [isLockOpen, windowH]);

  const onDoorOpen = useCallback((i) => {
    const { path } = i
    Taro.navigateTo({
      url: path,
      complete: () => {
        // setIsLockOpen(false)
        // Taro.nextTick(() => {
        //   onLockChange()
        // })
      }
    })
  }, [isLockOpen, windowH]);



  const layoutMoveStart = useCallback(e => {
    setTouchStart(e.changedTouches[0]);

    console.log('------', e.changedTouches[0])
  }, []);

  const onFacadeMove = useCallback((e) git => {
    const _animation = storage.getSessionStorage("animation");
    const touchEnd = e.changedTouches[0];
    const moveX = touchEnd.pageX - touchStart.pageX;
    const moveY = touchEnd.pageY - touchStart.pageY;
    if (moveY > 5 && moveY < 300) {
      let _scale = (1 - (1 / 600 * moveX)) * 20
      console.log(_scale)
      _animation.scale(_scale).step()
    }
    // 移动距离大于 100 动效关闭 状态关闭
    if (moveY > 300) {
      _animation.scale(0).step()
    }

    setAnimation(_animation.export());
  }, [touchStart])

  const layoutMoveEnd = useCallback(
    e => {
      const _animation = storage.getSessionStorage("animation");
      const touchEnd = e.changedTouches[0];
      const moveX = touchEnd.pageX - touchStart.pageX;
      const moveY = touchEnd.pageY - touchStart.pageY;
      // 移动距离小于 100  返回状态
      if (moveY < 300) {
        _animation.scale(windowH / 15).step();
        setAnimation(_animation.export());
      }
      // 移动距离大于 100 
      if (moveY > 300) {
        setIsLockOpen(false)
      }
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
              onClick={onBackPage}
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
          <Text className={["iconfont", loading ? 'icon-loading' : 'icon-my']} />
        </View>
      </View>

      {/* door facade */}
      <View
        className={["door-facade fixed", isLockOpen ? 'open' : 'close']}
        onTouchEnd={layoutMoveEnd}
        onTouchStart={layoutMoveStart}
        onTouchMove={onFacadeMove}
      >
        {menuList.map((item, index) => {
          return (
            <View
              className={["menu-list", isLockOpen ? "animation" : ""]}
              style={{ animationDelay: (index + 1) * 0.1 + "s" }}
            >
              {item.type === 1 && item.menu.map((i) => {
                return (
                  <View className="menu" style={i.style} onClick={onDoorOpen.bind(null, i)}>
                    <Image mode="widthFix" className="icon" style={i.iconStyle} src={i.icon} />
                    <Text className="name" style={i.nameStyle}>{i.name}</Text>
                  </View>
                );
              })}
              {item.type === 2 && (
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
                  {
                    item.banner.map((i) => {
                      return (
                        <SwiperItem className="banner" style={i.style}>
                          <Image className="img" style={i.bannerStyle} src={i.url} />
                          <Text className="info" style={i.infoStyle}>{i.info}</Text>
                        </SwiperItem>
                      );
                    })
                  }
                </Swiper>
              )}
            </View>
          );
        })}
      </View>

      {/* door curtain */}
      <View className="ripple" tap>
        <View
          className="ripple-main"

          animation={animation}
          style={{
            borderRadius: windowH + "px",
            height: windowH / 15 + "px",
            width: windowH / 15 + "px",
            transform: 'scale(0)'
          }}
        />
      </View>

    </View>
  );
}
