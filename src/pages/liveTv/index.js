
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text,Video } from '@tarojs/components'


class LiveTv extends Component{


  render(){
    console.log('aaaa', this.props)

    const path = '//cctvalih5ca.v.myalicdn.com/live/cctv2_2/index.m3u8'
    return (
      <View>
        <Text>
          hello LiveTv
          <Video
            src={path}
            controls={true}
            autoplay={false}
            poster='https://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
            initialTime='0'
            id='video'
            loop={false}
            muted={false}
          />
        </Text>
      </View>
    )
  }
}


const stateProps = ({ liveTv })=>{
  return { liveTv }
}
export default connect(stateProps)(LiveTv)
