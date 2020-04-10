import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';

class Layout extends Taro.Component {

  render() {
    return <View>
        <Text>
          hello `1`
        </Text>
      </View>;
  }
}

export default Layout;