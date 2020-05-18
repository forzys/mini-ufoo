import Nerv from "nervjs";

import Taro from "@tarojs/taro-h5";
import { connect } from "@tarojs/redux-h5";
import { View, Text, Video } from '@tarojs/components';

class LiveTv extends Taro.Component {

  render() {
    console.log('aaaa', this.props);

    const path = '//cctvalih5ca.v.myalicdn.com/live/cctv2_2/index.m3u8';
    return <View>
        <Text>
          hello LiveTv
          <Video src={path} controls={true} autoplay={false} poster="https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg" initialTime="0" id="video" loop={false} muted={false} ref={ref => {
          this['__taroref_video'] = ref;
        }} />
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

const stateProps = ({ liveTv }) => {
  return { liveTv };
};
export default connect(stateProps)(LiveTv);