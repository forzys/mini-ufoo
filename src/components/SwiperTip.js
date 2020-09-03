import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import {
  View,
  Text,
  Video,
  Image,
  Swiper,
  SwiperItem,
} from "@tarojs/components";

export default function SwiperTip(props) {
  const { swiperList, duration, interval } = props;

  useEffect(() => {
    console.log(swiperList, props);
  }, []);

  return (
    <View className="swiper-tip">
      <View className="swiper-content">
        <Swiper
          className="swiper-list"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular
          autoplay
          duration={duration || 500}
          interval={interval || 5000}
        >
          <SwiperItem>
            <Text className="demo-text-1">1</Text>
          </SwiperItem>
          <SwiperItem>
            <Text className="demo-text-2">2</Text>
          </SwiperItem>
          <SwiperItem>
            <Text className="demo-text-3">3</Text>
          </SwiperItem>
        </Swiper>
      </View>
    </View>
  );
}
