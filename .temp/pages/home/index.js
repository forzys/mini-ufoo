import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { connect } from "@tarojs/redux-h5";
import { View, Text } from '@tarojs/components';
import './index.less';

class Home extends Taro.Component {

  render() {
    console.log('aaaa', this.props);
    const arr = [{
      id: 1,
      title: 'xxxx1111'
    }, {
      id: 2,
      title: 'xxxx1111'
    }, {
      id: 3,
      title: 'xxxx1111'
    }];
    return <View className="home-content">
       {arr.map(item => {
        return <View key={item.id} className="home-card">
              <Text>
                {item.title}
              </Text>
            </View>;
      })}
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
export default connect(stateProps)(Home);