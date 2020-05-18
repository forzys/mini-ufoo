import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { connect } from "@tarojs/redux-h5";
import { View, Text } from '@tarojs/components';

class About extends Taro.Component {

  render() {
    console.log('aaaa', this.props);
    return <View>
        <Text>
          hello home
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

const stateProps = ({ home }) => {
  return { home };
};
export default connect(stateProps)(About);