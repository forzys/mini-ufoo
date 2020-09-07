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

const list = [
  {
    name: "热门",
    key: "hot",
  },
  {
    name: "最新",
    key: "new",
  },
  {
    name: "每日一图",
    key: "day",
  },
];

export default function WallPaper(props) {
  const imgWall = useRef({})
  const [focus, setFocus] = useState("hot");
  const [pageH, setPageH] = useState(0);
  const [customBarH, setCustomBarH] = useState(0);
  const [wallpaper, setWallpaper] = useState([]);
  const { loading, fetch } = useFetchRequest();

  useEffect(() => {
    const _windowH = storage.getSessionStorage("windowH");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _pageH = _windowH - _customBarH
    setPageH(_pageH)
    console.log(_pageH)
  }, [])


  useEffect(() => {
    ['hot', 'new'].forEach(item => {
      fetch({
        url: "wallpaper",
        data: {
          first: 0,
          order: item,
          limit: 30,
          skip: 180,
          adult: false,
        },
        callback: (res) => {
          const data = res.data.res;
          const vertical = data.vertical;
          if (Array.isArray(vertical)) {
            const list = []
            for (let i = 1; i < vertical.length; i += 2) {
              const item = [vertical[i - 1], vertical[i]]
              list.push(item)
            }
            imgWall[item] = list
            setFocus('hot')
          }
        },
      });
    })

  }, []);


  const swiperOnChange = useCallback((e) => {
    const current = e.detail.current
    const _key = list[current].key
    setFocus(_key)
  }, [])

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
          {list.map((item) => (
            <View
              key={item.name}
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
          autoplay={false}
          style={{ height: 0.9 * pageH }}
          onChange={swiperOnChange}
        >
          {
            list.map(names => {
              if (['hot', 'new'].includes(names.key)) {
                return (
                  <SwiperItem style={{ height: 0.9 * pageH }}>
                    <ScrollView
                      scrollY
                      scrollWithAnimation
                      style={{ height: 0.9 * pageH }}
                    >
                      {
                        imgWall[names.key] && imgWall[names.key].map((item) => {
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
                    </ScrollView>
                  </SwiperItem>
                )
              }

              return (
                <SwiperItem>
                  <View>每日一图</View>
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    </View >
  );
}
