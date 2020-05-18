import Nerv from "nervjs";

import Taro from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';

class Card extends Taro.Component {
  render() {
    const props = this.props;


    console.log(props);

    return <View key={props.path} onClick={props.goToPath}>
      <Text>{props.name} </Text>
    </View>;
  }

}

export default Card;