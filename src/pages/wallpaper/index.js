import Nerv, { useEffect, useCallback, useMemo, useState } from "nervjs";
import Taro from "@tarojs/taro";
import {
  View,
  Text,
  Block,
  Swiper,
  SwiperItem,
  Image,
  ScrollView,
} from "@tarojs/components";
import storage from "../../common/storage";
import CustomTabBar from "../../components/CustomTabBar";
import { useFetchRequest } from "../../common/request";
import "./index.less";

// 热门 https://service.picasso.adesk.com/v1/vertical/vertical?limit=30&skip=180&adult=false&first=0&order=hot
// 最新 https://service.picasso.adesk.com/v1/vertical/vertical?limit=30&skip=180&adult=false&first=0&order=new
// 搜索 https://so.picasso.adesk.com/v1/search/wallpaper/resource/hello?limit=30&skip=0&adult=false&first=0&order=`

const wall = [
  {
    name: "热门",
    key: "hot",
    index: 1,
    api: "wallpaper",
    data: {
      first: 0,
      order: "hot",
      limit: 30,
      skip: 0,
      adult: false,
    },
  },
  {
    name: "最新",
    key: "new",
    index: 1,
    api: "wallpaper",
    data: {
      first: 0,
      order: "new",
      limit: 30,
      skip: 0,
      adult: false,
    },
  },
  {
    name: "每日一图",
    key: "day",
    list: [],
    api: "bing",
    data: {},
    base: "https://cn.bing.com/",
  },
];

export default function WallPaper(props) {
  const [focus, setFocus] = useState("hot");
  const [pageH, setPageH] = useState(0);
  const imgWall = useFetchRequest();
  const { fetch: imgFetch, updateRef, requestRef } = imgWall;

  useEffect(() => {
    const _windowH = storage.getSessionStorage("windowH");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _pageH = _windowH - _customBarH;
    setPageH(_pageH);
  }, []);

  useEffect(() => {
    for (let i = 0; i < wall.length; i += 1) {
      const { api: _URLAPI, key, base, data: _URLDATA } = wall[i];

      if (i === 0) {
        setFocus(key);
      }
      imgFetch({
        url: _URLAPI,
        data: _URLDATA,
        callback: (res) => {
          if (_URLAPI === "wallpaper") {
            setWallImgList(res, key);
          }
          if (_URLAPI === "bing") {
            setBingImgList(res, key, base);
          }
        },
      });
    }
  }, []);

  const setBingImgList = useCallback((_data, _name, base) => {
    const images = _data.data.images;
    if (Array.isArray(images)) {
      const list = images.map((x) => ({
        ...x,
        img: base + x.url,
        tag: x.enddate,
        info: x.copyright,
      }));
      updateRef({ [_name]: list });
    }
  }, []);

  const setWallImgList = useCallback((_data, _name) => {
    const dataRes = _data.data.res;
    const vertical = dataRes.vertical;
    if (Array.isArray(vertical)) {
      const verticalList = [];
      for (let i = 1; i < vertical.length; i += 2) {
        const item = [vertical[i - 1], vertical[i]];
        verticalList.push(item);
      }
      let _list = [];
      if (Array.isArray(requestRef.current[_name])) {
        _list = requestRef.current[_name];
      }
      updateRef({
        isLoading: false,
        [_name]: [..._list, ...verticalList],
      });
    }
  }, []);

  const swiperOnChange = useCallback(
    (e) => {
      const current = e.detail.current;
      const _key = wall[current].key;
      if (focus !== _key) {
        setFocus(_key);
      }
    },
    [focus]
  );

  const scrollOnLower = useCallback(() => {
    if (requestRef.current.isLoading) return;
    requestRef.current.isLoading = true;
    const _wallItem = wall.find((item) => item.key === focus);
    if (_wallItem) {
      const { key, index, api: _URLAPI, data: _URLDATA } = _wallItem;
      imgFetch({
        url: _URLAPI,
        alive: false,
        data: {
          ..._URLDATA,
          skip: index * _URLDATA.limit,
        },
        callback: (res) => {
          _wallItem.index = index + 1;
          setWallImgList(res, key);
        },
      });
    }
  }, [focus]);

  const wallKeys = useMemo(() => wall.map((i) => i.key), []);

  return (
    <View className="wallpaper">
      <CustomTabBar
        isBack
        bgColor="bg-gradual-blue"
        renderBack={
          <Text style={{ fontSize: 33 }} className="iconfont icon-my"></Text>
        }
        renderContent={<Block>壁纸</Block>}
      />

      <View className="wall-type" style={{ height: 0.1 * pageH }}>
        <View className="type-name flex">
          {wall.map((item) => (
            <View
              key={item.key}
              onClick={setFocus.bind(null, item.key)}
              className={["name-item flex", item.key === focus ? "focus" : ""]}
            >
              <Text> {item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="wall-list">
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular
          current={wallKeys.indexOf(focus)}
          style={{ height: 0.9 * pageH }}
          onChange={swiperOnChange}
        >
          {wall.map((names) => {
            if (names.api === "wallpaper") {
              return (
                <SwiperItem
                  key={names.key}
                  itemId={names.key}
                  style={{ height: 0.9 * pageH }}
                >
                  <ScrollView
                    scrollY
                    scrollWithAnimation
                    style={{ height: 0.9 * pageH }}
                    lowerThreshold={0.9 * pageH}
                    onScrollToLower={scrollOnLower}
                  >
                    {imgWall[names.key] &&
                      imgWall[names.key].map((item) => {
                        return (
                          <View
                            className="row-item"
                            style={{ height: 0.45 * pageH }}
                          >
                            {item.map((img) => {
                              return (
                                <Image
                                  mode="widthFix"
                                  className="item"
                                  lazyLoad
                                  src={img.img}
                                />
                              );
                            })}
                          </View>
                        );
                      })}
                    <View className="row-item" style={{ height: 0.2 * pageH }}>
                      <Text className="iconfont icon-loading" />
                      <Text> 加载中... </Text>
                    </View>
                  </ScrollView>
                </SwiperItem>
              );
            }

            return (
              <SwiperItem itemId="day">
                <ScrollView
                  scrollY
                  scrollWithAnimation
                  style={{ height: 0.9 * pageH }}
                  lowerThreshold={0.9 * pageH}
                >
                  {imgWall[names.key] &&
                    imgWall[names.key].map((item) => {
                      var cut = imgWall["tag"] !== item.tag;
                      return (
                        <View className="bing" style={{ height: 0.35 * pageH }}>
                          <Image className="img" lazyLoad src={item.img} />
                          <Text className="tag bg-blue flex">{item.tag}</Text>
                          <View
                            className="info"
                            onClick={updateRef.bind(null, { tag: item.tag })}
                          >
                            <Text className={cut ? "text-cut" : ""}>
                              {item.info}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  <View className="row-item">
                    <Text style="color:var(--gray)">必应每日壁纸 bing.com</Text>
                  </View>
                </ScrollView>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
}
