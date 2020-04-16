import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'


class About extends Component{

  render(){
    console.log('aaaa', this.props)
    return (
      <View>
        <Text>
          hello home
        </Text>
      </View>
    )
  }
}


const stateProps = ({ home })=>{
  return { home }
}
export default connect(stateProps)(About)
