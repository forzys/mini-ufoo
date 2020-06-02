
import Taro, { useEffect, useMemo, useCallback, useState} from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { View, Text, Video } from '@tarojs/components'
import ScrollList from '../../components/scrollList'

import './index.less'


function LiveTv(){
	const [hidden,setHidden] = useState(0)
  const dispatch = useDispatch();
  const livetv = useSelector(state => state.livetv);
  const {tvList,playingURL,playingName='电视'} = livetv

  console.log(dispatch)
  console.log(livetv)

  const playOnChange = useCallback((params)=>{
    const query = {...params}
    dispatch({
      type:'livetv/updateState',
      payload:{
        playingName:query.name,
        playingURL:query.url,
      }
    })
	},[dispatch])
	
	const tvlistOnToggle = useCallback((params)=>{
		console.log(params)
		const isNumber = typeof hidden === 'number'
		if(isNumber && Number.isFinite(hidden)){
			setHidden(1^hidden)
		}
	},[hidden])


  return (
    <View className='tv_live'>
      <View className='tv_control'>
        <View className={['tv_list',hidden&&'hidden']}>
          <ScrollList title='节目表' name='name' list={tvList} onChange={playOnChange} />
        </View>
        <View className='tv_video'>
          <Video
            title={playingName}
            src={playingURL} // 路径
            controls={false} // 显示video控制控件
            autoplay  // 自动播放
						showMuteBtn // 显示静音按钮
						showPlayBtn={false} // 下方播放按钮
						vslideGesture
						autoPauseIfNavigate
						autoPauseIfOpenNative
						show-center-play-btn={false} // 中间播放按钮
            // playBtnPosition='center' // 暂停播放按钮位置
						// enablePlayGesture // 双击暂停播放
						onClick={tvlistOnToggle}
            initialTime='0'
						loop={false}
          />
        </View>
        </View>
    </View>
  )
}

LiveTv.config = {
  disableScroll:true,
}

export default LiveTv
