import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'


class Home extends Component{


  goToPath=(path)=>{
    const base = '/pages/'
    const index = '/index'
    const url = base + path + index
    Taro.navigateTo({url})
  }

  render(){

    return (
      <View className='home-content'>
        hello
      </View>
    )
  }
}

const stateProps = ({ home })=>{
  return { home }
}
export default connect(stateProps)(Home)
