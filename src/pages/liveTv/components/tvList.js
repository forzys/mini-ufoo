
import Taro, { useEffect, useCallback, useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import '../index.less'


function TvList(props){
  const {list, name, onTvChange} = props
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
      const _list = allList.slice(showIndex,showIndex+showNumber)
      setShowList([..._list])
    }
  },[showIndex,showNumber,allList])

  const _onClick = useCallback((params)=>{
    if(onTvChange){
      onTvChange(params)
    }
    setActive(params[name])
  },[onTvChange,name])

  const _onTouchMove = useCallback((params)=>{
    console.log(params)
  },[])




  return (
    <View className='list_bar'>
      <slot name='header'></slot>
      {this.props.children}
      {
        showList.map((item,k)=>{
          let _class = 'list_item'
          showNumber*0.2===k ?_class+=' pre_scroll':
          showNumber*0.7===k ?_class+=' next_scroll':
          item[name]===active?_class+=' active': null
          let onTouchMove = null
          if(k === showList.length-1){
            console.log( k, item)
            onTouchMove = _onTouchMove.bind(this)
          }
          return (
            <View key={`${item[name]}-${k}`} className={_class} onClick={_onClick.bind(this,item)} onTouchMove={onTouchMove} >
              <Text>{item[name]||item.name}</Text>
            </View>
          )
        })
      }
      <slot name='footer'></slot>
    </View>
  )
}

TvList.config={
  multipleSlots:true,
  addGlobalClass: true,
}

export default Taro.memo(TvList)
