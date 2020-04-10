import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { connect } from "@tarojs/redux-h5";
import { View, Text } from '@tarojs/components';

class Music extends Taro.Component {

  render() {
    console.log('bbbb', this.props);
    return <View>
        <Text>
          hello music
        </Text>
      </View>;
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

  componentDidShow() {
    super.componentDidShow && super.componentDidShow();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}

const stateProps = ({ music }) => {
  return { music };
};
export default connect(stateProps)(Music);