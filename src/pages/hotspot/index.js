import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'
import './index.less'


class Hotspot extends Component{

  render(){
    console.log('aaaa', this.props)
    const arr = [
      {
        id: 1,
        title: 'xxxx1111',
      },
      {
        id: 2,
        title: 'xxxx1111',
      },
      {
        id: 3,
        title: 'xxxx1111',
      },
    ]
    return (
      <View className='home-content'>
       {
         arr.map(item=>{
           return (
            <View key={item.id} className='home-card'>
              <Text>
                {item.title}
              </Text>
            </View>
           )
         })
       }
      </View>
    )
  }
}


const stateProps = ({ hotspot })=>{
  return { hotspot }
}
export default connect(stateProps)(Hotspot)
