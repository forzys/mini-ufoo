import Nerv, { useEffect, useCallback } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Video, Image } from "@tarojs/components";

const Index = (props) => {
  const navigateTo = useCallback(() => {
    Taro.navigateTo({
      url: "/pages/iptv/index",
    });
  }, []);

  return (
    <View className="index">
      <View onClick={navigateTo} style={{ margin: 100 }}>
        直播测试
      </View>
    </View>
  );
};

export default Index;
