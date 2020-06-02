
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

function Card(props){

  console.log(props)



  
  return (
    <View key={props.path} onClick={props.goToPath}>
      <Text>{props.name} </Text>
    </View>
  )
}


export default Card