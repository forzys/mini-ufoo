
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Text } from '@tarojs/components'


class Article extends Component{

  render(){
    console.log('aaaa', this.props)
    return (
      <View>
        <Text>
          hello article
        </Text>
      </View>
    )
  }
}


const stateProps = ({ article })=>{
  return { article }
}
export default connect(stateProps)(Article)
