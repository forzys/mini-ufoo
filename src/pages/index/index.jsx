import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Block, Text, Video, Image, Swiper } from "@tarojs/components";
import SwiperTip from "../../components/SwiperTip";
import Door from "../../components/CustomDoor";
import { useFetchRequest } from "../../common/request";
import "./index.less";

// 热点 壁纸 小说 电视 我的
const Index = (props) => {
  const [base] = useState("https://cn.bing.com");
  const [img, setImg] = useState("");
  const { loading, fetch } = useFetchRequest();

  const navigateTo = useCallback(() => {
    Taro.navigateTo({
      url: "/pages/iptv/index",
    });
  }, []);

  useEffect(() => {
    // fetch({
    //   url: "bing",
    //   callback: (res) => {
    //     const list = res.data.images;
    //     if (Array.isArray(list)) {
    //       const url = list[1].url;
    //       setImg(base + url);
    //     }
    //   },
    // });
  }, []);

  return (
    <View className="index">
      {/* <SwiperTip swiperList={[]} duration={100} /> */}
      <Door
        isBack
        bgColor="bg-gradual-blue"
        renderContent={<Block>今日热点</Block>}
      />

      <View onClick={navigateTo} style={{ color: "red" }}>
        直播测试
      </View>
    </View>
  );
};

export default Index;
