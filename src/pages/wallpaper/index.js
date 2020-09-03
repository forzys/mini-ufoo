import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Video, Image } from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";
import Base64 from "../../common/base64";
import { useFetchRequest } from "../../common/request";

// 热门 https://service.picasso.adesk.com/v1/vertical/vertical?limit=30&skip=180&adult=false&first=0&order=hot
// 最新 https://service.picasso.adesk.com/v1/vertical/vertical?limit=30&skip=180&adult=false&first=0&order=new
// 搜索 https://so.picasso.adesk.com/v1/search/wallpaper/resource/hello?limit=30&skip=0&adult=false&first=0&order=`

import "./index.less";
export default function IPTV(props) {
  const [play, setPlay] = useState({});
  const [list, setList] = useState([]);
  const [show, setShow] = useState({});
  const { loading, fetch } = useFetchRequest();

  useEffect(() => {
    fetch({
      url: "iptv",
      callback: (res) => {
        console.log(res);
        const content = res.data.data;
        // const strParse = JSON.parse(content);
        setList(content);
      },
    });
  }, []);

  const playOnline = useCallback((params) => {
    setPlay({
      url: params.playUrl,
      poster: params.playLogo,
    });
  }, []);

  const showOnChange = useCallback(() => {
    show === "hidden" ? setShow("visible") : setShow("hidden");
  }, [show]);

  return (
    <View className="iptv">
      <View className="page" style={{ height: "40vh" }}>
        <Video
          poster={play.poster}
          src={play.url}
          autoplay
          controls={false}
          onClick={showOnChange}
        />

        <View className="channel" style={{ visibility: show }}>
          <VirtualList
            height={250} /* 列表的高度 */
            width="100%" /* 列表的宽度 */
            itemData={list} /* 渲染列表的数据 */
            itemCount={list.length} /*  渲染列表的长度 */
            itemSize={40} /* 列表单项的高度  */
            overscanCount={5}
          >
            {({ index, style, data }) => (
              <View style={style} onClick={playOnline.bind(null, data[index])}>
                <View className="tv-item">
                  <View className="tv-name">
                    <Text>{data[index].name}</Text>
                  </View>
                </View>
              </View>
            )}
          </VirtualList>
        </View>
      </View>
    </View>
  );
}
