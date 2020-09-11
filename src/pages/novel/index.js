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

const multiple = [
  {
    name: "分类",
    key: "type",
  },
  {
    name: "排行",
    key: "hot",
  },
  {
    name: "书架",
    key: "book",
  },
];

export default function Novel() {
  const [focus, setFocus] = useState("type");
  const [pageH, setPageH] = useState(0);
  const [typeList, setTypeList] = useState([]);
  const bookMultiple = useFetchRequest();
  const { fetch: novelFetch, updateRef, requestRef } = bookMultiple;
  useEffect(() => {
    const _windowH = storage.getSessionStorage("windowH");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _pageH = _windowH - _customBarH;
    setPageH(_pageH);
  }, []);

  useEffect(() => {
    novelFetch({
      url: "novel_cats",
      keep: 3600,
      callback: (res) => {
        const _list = [];
        const _item = {};
        const mut = res.data;
        const mutList = Object.keys(mut);

        mutList.forEach((i) => {
          if (Array.isArray(mut[i])) {
            _list.push({
              name: i,
              list: mut[i],
            });
          }
        });
        setTypeList([..._list]);
      },
    });
  }, []);

  const swiperOnChange = useCallback(
    (e) => {
      const current = e.detail.current;
      const _key = multiple[current].key;
      if (focus !== _key) {
        setFocus(_key);
      }
    },
    [focus]
  );

  console.log(typeList);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    return;
  }, []);

  const changeTouch = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    return;
  }, []);

  return (
    <View className="book">
      <CustomTabBar
        isBack
        bgColor="bg-gradual-blue"
        renderBack={
          <Text style={{ fontSize: 33 }} className="iconfont icon-my"></Text>
        }
        renderContent={<Block>小说</Block>}
      />

      <View className="multiple flex">
        {multiple.map((item) => {
          return (
            <View
              key={item.key}
              onClick={setFocus.bind(null, item.key)}
              className={["item flex", item.key === focus ? "focus" : ""]}
            >
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>

      <View className="book-list" onTouchMove={changeTouch}>
        <Swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular
          current={multiple.map((i) => i.key).indexOf(focus)}
          style={{ height: 0.9 * pageH }}
          onChange={swiperOnChange}
        >
          {multiple.map((item) => {
            if (item.key === "type") {
              return (
                <SwiperItem
                  key={item.key}
                  itemId={item.key}
                  style={{ height: 0.9 * pageH }}
                >
                  {typeList.map((it) => {
                    return (
                      <ScrollView
                        scrollX
                        onScroll={onTouchMove}
                        scrollWithAnimation
                        style={{
                          height: 40,
                          lineHeight: "40px",
                          width: "100vw",
                          whiteSpace: "nowrap",
                          borderTop: "1px solid red",
                          borderBottom: "1px solid red",
                        }}
                      >
                        {it.list.map((t) => {
                          return (
                            <View style="width:20vw; height:40px; display:inline-block">
                              <Text>{t.name} </Text>
                            </View>
                          );
                        })}
                      </ScrollView>
                    );
                  })}
                  <View>{item.key}</View>
                </SwiperItem>
              );
            }
            return (
              <SwiperItem
                key={item.key}
                itemId={item.key}
                style={{ height: 0.9 * pageH }}
              >
                <View>{item.key}</View>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    </View>
  );
}
