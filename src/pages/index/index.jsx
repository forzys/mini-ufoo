import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";
import "./index.less";
import APIS from "../../common/api";
import Base64 from "../../common/base64";

const Index = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(true);
    Taro.request({ url: APIS.iptv }).then(function (res) {
      var str = Base64.decode(res.data.content);
      const d = JSON.parse(str);
      console.log(typeof d);
      setState(d.data);
      // const _l = d.data.splice(0, 10);
      setList(d.data);
      setLoading(false);
    });
  }, []);

  const Row = Nerv.memo(({ index, style, data }) => {
    console.log(data[index]);
    return <View style={style}>{data[index].name}</View>;
  });

  const listReachBottom = () => {
    Taro.showLoading();
    setLoading(true);
    setTimeout(() => {
      const _state = state.splice(list.length, 100);
      _list = list.concat(_state);

      setList(_list);
      setLoading(false);
      Taro.hideLoading();
    }, 1000);
  };

  console.log(list);

  const itemSize = 100;

  return (
    <View className="index">
      <Text style={{ width: 100, height: 100, color: "red" }}>
        Hello world!
      </Text>

      {list.length && (
        <View style={{ background: "#ccc" }}>
          <VirtualList
            height={400} /* 列表的高度 */
            width="100%" /* 列表的宽度 */
            itemData={list} /* 渲染列表的数据 */
            itemCount={list.length} /*  渲染列表的长度 */
            itemSize={itemSize} /* 列表单项的高度  */
            // onScroll={({ scrollDirection, scrollOffset }) => {
            //   if (
            //     // 避免重复加载数据
            //     !loading &&
            //     // 只有往前滚动我们才触发
            //     scrollDirection === "forward" &&
            //     // 5 = (列表高度 / 单项列表高度)
            //     // 100 = 滚动提前加载量，可根据样式情况调整
            //     scrollOffset > (list.length - 5) * itemSize + 100
            //   ) {
            //     listReachBottom();
            //   }
            // }}
          >
            {Row}
          </VirtualList>
        </View>
      )}
      <View>
        <Video />
      </View>
    </View>
  );
};

export default Index;
