import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'


class Home extends Component{

  render(){
    console.log('aaaa', this.props)
    return (
      <View>
        <Text>
          hello 1
        </Text>
      </View>
    )
  }
}


const stateProps = ({ home })=>{
  return { home }
}
export default connect(stateProps)(Home)
