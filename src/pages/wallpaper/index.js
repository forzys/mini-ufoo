import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import {
  View,
  Text,
  Block,
  Swiper,
  SwiperItem,
  Image,
} from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";
import Base64 from "../../common/base64";
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
  const [focus, setFocus] = useState("hot");
  const [wallpaper, setWallpaper] = useState([]);
  const { loading, fetch } = useFetchRequest();

  useEffect(() => {
    console.log("xxxx");
    fetch({
      url: "wallpaper",
      data: {
        first: 0,
        order: "hot",
        limit: 30,
        skip: 180,
        adult: false,
      },
      callback: (res) => {
        const data = res.data.res;
        const vertical = data.vertical;

        if (Array.isArray(vertical)) {
          setWallpaper(vertical);
        }
      },
    });
  }, []);

  return (
    <View className="wallpaper">
      <Door
        isBack
        bgColor="bg-gradual-blue"
        renderContent={<Block>壁纸</Block>}
      />

      <View className="wall-type">
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
          className="paper-list"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular
          autoplay={false}
          current={0}
        >
          {list.map((item) => {
            return (
              <SwiperItem>
                <View className="channel">
                  <VirtualList
                    height={550} /* 列表的高度 */
                    width="100%" /* 列表的宽度 */
                    itemData={wallpaper} /* 渲染列表的数据 */
                    itemCount={wallpaper.length} /*  渲染列表的长度 */
                    itemSize={40} /* 列表单项的高度  */
                    overscanCount={5}
                  >
                    {({ index, style, data }) => (
                      <View style={style}>
                        <View className="tv-item">
                          <Image
                            src={data[index].img}
                            style="width: 300px;height:400px"
                          />
                        </View>
                      </View>
                    )}
                  </VirtualList>
                </View>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
}
