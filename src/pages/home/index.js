import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'


class Home extends Component{

  render(){
    return (
      <View>
       hello
      </View>
    )
  }
}


const stateProps = ({ home })=>{
  return { home }
}
export default connect(stateProps)(Home)
