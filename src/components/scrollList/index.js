
import Taro, { useEffect, useMemo, useCallback, useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import './index.less'


function ScrollList(props){
  const { list,name,title,onChange} = props
  const [allList,setAllList] = useState([])
  const [showList,setShowList] = useState([])
  const [showIndex,setShowIndex] = useState(0)
  const [showNumber,setShowNumber] = useState(15)
  const [active, setActive] = useState(null)

  useEffect(()=>{
    if(Array.isArray(list)){
      setAllList([...list])
    }
  },[list])

  useEffect(()=>{
    const isNumber = typeof showIndex==='number'
    if(isNumber && Number.isFinite(showIndex)){
      const _list = allList.slice(showIndex,showNumber)
      setShowList([..._list])
    }
  },[showIndex,showNumber,allList])

  const _onClick = useCallback((params)=>{
    if(onChange){
      onChange(params)
    }
    setActive(params[name])
  },[onChange,name])


  return (
    <View className='scroll_bar'>
      <View className='scroll_title'>
      	<Text> { title } </Text>
      </View>
      {
        showList.map((item,k)=>{
          let _class = 'item_scroll'
          showNumber*0.2===k?_class+=' pre_scroll':
          showNumber*0.7===k?_class+=' next_scroll':
          item[name]===active?_class+=' active': null
          return (
            <View key={`${item[name]}-${k}`} className={_class} onClick={_onClick.bind(this,item)}>
              <Text>{item[name]||item.name}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default Taro.memo(ScrollList)
