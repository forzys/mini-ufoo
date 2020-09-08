import Nerv, { useEffect, useCallback, useState, useRef } from "nervjs";
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
import VirtualList from "@tarojs/components/virtual-list";
import Base64 from "../../common/base64";
import storage from "../../common/storage";
import Door from "../../components/CustomDoor";
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
    api: 'wallpaper',
    data: {
      first: 0,
      order: 'hot',
      limit: 30,
      skip: 0,
      adult: false,
    },
  },
  {
    name: "最新",
    key: "new",
    index: 1,
    api: 'wallpaper',
    data: {
      first: 0,
      order: 'new',
      limit: 30,
      skip: 0,
      adult: false,
    },
  },
  {
    name: "每日一图",
    key: "day",
    list: [],
    api: 'bing',
    data: {},
    base: "https://cn.bing.com/",
  },
];

export default function WallPaper(props) {
  const imgWall = useRef({})
  const [focus, setFocus] = useState("hot");
  const [pageH, setPageH] = useState(0);
  const { loading, fetch } = useFetchRequest();

  useEffect(() => {
    const _windowH = storage.getSessionStorage("windowH");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _pageH = _windowH - _customBarH
    setPageH(_pageH)
  }, [])


  useEffect(() => {
    for (let i = 0; i < wall.length; i += 1) {
      if (i === 0) {
        setFocus(wall[i].key)
      }
      fetch({
        url: wall[i].api,
        data: wall[i].data,
        callback: (res) => {
          if (wall[i].api === 'wallpaper') {
            const data = res.data.res;
            const vertical = data.vertical;
            if (Array.isArray(vertical)) {
              const list = []
              for (let j = 1; j < vertical.length; j += 2) {
                const item = [vertical[j - 1], vertical[j]]
                list.push(item)
              }
              imgWall.current[wall[i].key] = list
            }
          }

          if (wall[i].api === 'bing') {
            const images = res.data.images
            if (Array.isArray(images)) {
              const base = wall[i].base
              const list = images.map(i => ({
                ...i,
                img: base + i.url,
                tag: i.enddate,
                text: i.copyright,
              }));
              imgWall.current[wall[i].key] = list
            }
          }
        }
      })
    }
  }, []);


  const swiperOnChange = useCallback((e) => {
    const current = e.detail.current
    const _key = wall[current].key
    if (focus !== _key) {
      setFocus(_key)
    }
  }, [focus])

  const scrollOnLower = useCallback(e => {
    if (imgWall.current.isLoading) return
    imgWall.current.isLoading = true
    const wallItem = wall.find(item => item.key === focus)
    fetch({
      url: wallItem.api,
      alive: false,
      data: { ...wallItem.data, skip: wallItem.index * wallItem.data.limit },
      callback: (res) => {
        wallItem.index = wallItem.index + 1
        const _list = imgWall.current[wallItem.key]
        const data = res.data.res;
        const vertical = data.vertical;
        if (Array.isArray(vertical)) {
          const list = []
          for (let j = 1; j < vertical.length; j += 2) {
            const item = [vertical[j - 1], vertical[j]]
            list.push(item)
          }
          imgWall.current[wallItem.key] = [..._list, ...list]
          imgWall.current.isLoading = false
        }
      }
    })
  }, [focus])


  console.log(imgWall.current, imgWall)

  return (
    <View className="wallpaper">
      <Door
        isBack
        bgColor="bg-gradual-blue"
        renderBack={<Text style={{ fontSize: 33 }} className="iconfont icon-my"></Text>}
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
          current={['hot', 'new', 'day'].indexOf(focus)}
          style={{ height: 0.9 * pageH }}
          onChange={swiperOnChange}
        >
          {
            wall.map(names => {
              if (names.api === 'wallpaper') {
                return (
                  <SwiperItem key={names.key} itemId={names.key} style={{ height: 0.9 * pageH }}>
                    <ScrollView
                      scrollY
                      scrollWithAnimation
                      style={{ height: 0.9 * pageH }}
                      lowerThreshold={0.9 * pageH}
                      onScrollToLower={scrollOnLower}
                    >
                      {
                        imgWall.current[names.key] && imgWall.current[names.key].map((item) => {
                          return (<View className="row-item" style={{ height: 0.45 * pageH }}>
                            {
                              item.map(img => {
                                return (
                                  <Image className="item" lazyLoad src={img.img} />
                                )
                              })
                            }
                          </View>)
                        })
                      }
                      <View className="row-item" style={{ height: 0.2 * pageH }}>
                        <Text className="iconfont icon-loading" />
                        <Text > 加载中... </Text>
                      </View>
                    </ScrollView>
                  </SwiperItem>
                )
              }

              return (
                <SwiperItem itemId="day">
                  <ScrollView
                    scrollY
                    scrollWithAnimation
                    style={{ height: 0.9 * pageH }}
                    lowerThreshold={0.9 * pageH}
                  >
                    {
                      imgWall.current[names.key] && imgWall.current[names.key].map((item) => {
                        return (
                          <View className="row-item" style={{ height: 0.35 * pageH }}>
                            <Image className="item" lazyLoad src={item.img} />
                          </View>)
                      })
                    }
                    <View className="row-item" style={{ height: 0.2 * pageH }}>
                      <Text>数据来源必应每日壁纸 bing.com</Text>
                    </View>
                  </ScrollView>

                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    </View >
  );
}
