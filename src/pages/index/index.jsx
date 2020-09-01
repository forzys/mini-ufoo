import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text,Video } from "@tarojs/components";
import VirtualList from "@tarojs/components/virtual-list";
import "./index.less";
import APIS from "../../common/api";
import Base64 from "../../common/base64";

const Index = (props) => {
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(null);
  const [state, setState] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(true);
    Taro.request({ url: APIS.di }).then(function (res) {
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
    return <View style={style} onClick={setOnline.bind(null,data[index].playUrl)}>{data[index].name}</View>;
  }); 
 

  const itemSize = 100;

  return (
    <View className="index"> 
      {list.length && (
        <View style={{ background: "#ccc" }}>
          <VirtualList
            height={400} /* 列表的高度 */
            width="100%" /* 列表的宽度 */
            itemData={list} /* 渲染列表的数据 */
            itemCount={list.length} /*  渲染列表的长度 */
            itemSize={itemSize} /* 列表单项的高度  */
          >
            {Row}
          </VirtualList>
        </View>
      )}
      {
        online && (
          <View>
            <Video src={online} autoplay showMuteBtn />
          </View>
        )
      }
     
    </View>
  );
};

export default Index;
