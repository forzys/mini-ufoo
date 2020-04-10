import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'


class Music extends Component{

  render(){
    console.log('bbbb',this.props)
    return (
      <View>
        <Text>
          hello music
        </Text>
      </View>
    )
  }
}


const stateProps = ({ music })=>{
  return { music }
}
export default connect(stateProps)(Music)
