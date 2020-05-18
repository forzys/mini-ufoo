import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { connect } from "@tarojs/redux-h5";
import { View } from '@tarojs/components';
import Card from './component/card';
import './index.less';

class Home extends Taro.Component {

  goToPath = path => {
    const base = '/pages/';
    const index = '/index';
    const url = base + path + index;
    Taro.navigateTo({ url });
  };

  render() {
    const arr = [{ name: '天气预报', info: '实时了解天气动态', path: 'weather' }, { name: '知乎热榜', info: '知乎热门问答精选', path: 'article' }, { name: '精美壁纸', info: '尽情欣赏精美壁纸', path: 'picture' }, { name: '精选音乐', info: '尽情享受精选音乐', path: 'music' }, { name: '优惠线报', info: '优惠线报实惠到家', path: 'discount' }, { name: '实时热点', info: '实时热点一网打尽', path: 'hotspot' }, { name: '电视直播', info: '电视直播直播电视', path: 'liveTv' }, { name: '影视分享', info: '影视分享多人共享', path: 'movies' }];

    return <View className="home-content">
        {arr.map(item => {
        return <Card key={item.path} name={item.name} goToPath={this.goToPath.bind(this, item.path)} />;
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