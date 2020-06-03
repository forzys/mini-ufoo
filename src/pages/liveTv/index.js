
import Taro, {useCallback, useState} from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { View,Text, Video } from '@tarojs/components'
import ScrollList from '../../components/scrollList'
import './index.less'


function LiveTv(){
  const [hidden,setHidden] = useState(0)
  const [tvFull,setTvFull] = useState(false)
	const [tvMuted,setTvMuted] = useState(false)

  const livetv = useSelector(state => state.livetv);
  const {tvList, tvUrl, tvTitle} = livetv
  const dispatch = useDispatch();

  const tvOnChange = useCallback((params)=>{
    const query = {...params}
    dispatch({
      type:'livetv/updateState',
      payload:{
        tvTitle:query.name,
        tvUrl:query.url,
      }
    })
	},[dispatch])

	const tvOnToggle = useCallback((params)=>{
		console.log(params)
		const isNumber = typeof hidden === 'number'
		if(isNumber && Number.isFinite(hidden)){
			setHidden(1^hidden)
    }
  },[hidden])

  const tvOnMuted = useCallback(()=>{ setTvMuted(!tvMuted) },[tvMuted])

  const tvOnFullScreen = useCallback(()=>{
    if(!tvFull){
      const video =  Taro.createVideoContext('video_tv')
      video.requestFullScreen()
    }
  },[tvFull])

  const tvOnFullChange = useCallback((event)=>{
    const detail = event.detail
    setTvFull(detail.fullScreen)
  },[])


  return (
    <View className='tv_live'>
      <View className='tv_control'>
        <View className={['tv_list', hidden&&'hidden']}>
          <ScrollList
            name='name'
            title='节目表'
            list={tvList}
            onChange={tvOnChange}
          >
          </ScrollList>
          <View className={['tv_extra', hidden&&'hidden']}>
            <Text className={['icon', tvMuted?'icon-mute':'icon-volume']} onClick={tvOnMuted}></Text>
            <Text className='icon icon-full-screen' onClick={tvOnFullScreen}></Text>
          </View>
        </View>
        <View className='tv_video'>
          <Video
            id='video_tv'
            title={tvTitle} // 全屏时展示标题
            muted={tvMuted} // 是否静音播放
            src={tvUrl} // 路径
            controls={tvFull} // 显示video控制控件
            autoplay  // 自动播放
            pageGesture // 非全屏允许亮度音量调节
            showMuteBtn // 显示静音按钮
            showPlayBtn={false} // 下方播放按钮vslideGesture
            autoPauseIfOpenNative
            show-center-play-btn={false} // 中间播放按钮
            // playBtnPosition='center' // 暂停播放按钮位置
            // enablePlayGesture // 双击暂停播放
            onClick={tvOnToggle} // 点击控件
            onFullscreenChange={tvOnFullChange} // 全屏变化
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
  addGlobalClass: true,
  navigationBarTitleText:'电视'
}

export default LiveTv
