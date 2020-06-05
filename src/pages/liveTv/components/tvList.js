
import Taro, { useEffect, useCallback, useState } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components'
import '../index.less'


function TvList(props){
  const {list, name, onTvChange} = props
  const [allList,setAllList] = useState([])
  const [active, setActive] = useState(null)

  useEffect(()=>{
    if(Array.isArray(list)){
      setAllList([...list])
    }
  },[list])

  const _onClick = useCallback((params)=>{
    if(onTvChange){
      onTvChange(params)
    }
    setActive(params[name] || params['name'])
  },[onTvChange,name])



  return (
    <View className='list_bar'>
      <slot name='header'></slot>
      {this.props.children}
      <ScrollView
        scrollY
        // refresherEnabled
        scrollAnchoring
        className='list_scroll'
      >
        {
          allList.map((item,k)=>{
            let _class = 'list_item'
            item[name]===active?_class+=' active': null
            return (
              <View key={`${item[name]}-${k}`} className={_class} onClick={_onClick.bind(this,item)}>
                <Text>{item[name]||item['name']}</Text>
              </View>
            )
          })
        }
        <View className='list_item'></View>
      </ScrollView>

      <slot name='footer'></slot>
    </View>
  )
}

TvList.config={
  multipleSlots:true,
  enablePullDownRefresh:true,
  addGlobalClass: true,
}

export default Taro.memo(TvList)
