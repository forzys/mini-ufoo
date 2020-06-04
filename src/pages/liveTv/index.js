
import Taro, {useCallback, useState} from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { View,Text, Video } from '@tarojs/components'
import TvList from './components/tvList'
import './index.less'





function LiveTv(){
  const [videoId] = useState('video-tv')
  const [hidden,setHidden] = useState(0)
  const [loading,setLoading] = useState('')
  const [tvFull,setTvFull] = useState(false)
	const [tvMuted,setTvMuted] = useState(0)
	// const [tvFloating,setTvFloating] = useState([])

  const livetv = useSelector(state => state.livetv);
  const {tvList, tvUrl, tvTitle} = livetv
  const dispatch = useDispatch();

  // tv change
  const onTvChange = useCallback((params)=>{
    const query = {...params}
    setLoading('loading') // loading
    dispatch({
      type:'livetv/updateState',
      payload:{
        tvTitle:query.name,
        tvUrl:query.url,
      }
    })
  },[dispatch])

  // title change
  const onTitleChange = useCallback(()=>{
    console.log(tvList)
  },[tvList])

  // video Toggle
	const onVideoToggle = useCallback(()=>{
		// console.log(params)
		const isNumber = typeof hidden === 'number'
		if(isNumber && Number.isFinite(hidden)){
      setHidden(1^hidden)
    }
  },[hidden])

  // muted Toggle
  const onMutedToggle = useCallback(()=>{
    const muted = 1^tvMuted
    setTvMuted(muted)
    const title = ['关闭静音','开启静音'][muted]

    Taro.showToast({
      title: title,
      icon: 'none',
      duration: 1000,
    })
  },[tvMuted])

  // video full
  const onVideoFull = useCallback(()=>{
    if(!tvFull){
      const video =  Taro.createVideoContext(videoId)
      video.requestFullScreen() // 请求全屏
    }
  },[tvFull,videoId])

  // full change
  const onFullChange = useCallback((event)=>{
    const detail = event.detail
    setTvFull(detail.fullScreen)
	},[])

  // loading status
	const onVideoWaiting = useCallback((params)=>{
    console.log('wating',params)
    if(params.type==='loadedmetadata'){
      setLoading('') // 视频元数据加载完成
    }
    if(params.type==='error'){
      setLoading('fail') // 视频元数据加载完成
    }
  },[])

  // tv close
  const onTvClose = useCallback(()=>{
    const video =  Taro.createVideoContext(videoId)
    video.stop() // 停止视频
    dispatch({
      type:'livetv/updateState',
      payload:{
        tvTitle:'',
        tvUrl:'',
      }
    })
  },[videoId,dispatch])


  // tv floating
  const onTvFloating = useCallback(()=>{
    Taro.showToast({
      title: '暂不支持画中画',
      icon: 'none',
      duration: 1500,
    })
  },[])


  return (
    <View className='tv_live'>
      <View className={['tv_list', hidden&&'hidden']}>
        <TvList
          name='name'
          list={tvList}
          onTvChange={onTvChange}
        >
          <View className='list_title'>
            <Text className='title_item'>节目表</Text>
            <Text className='title_item'>收藏单</Text>
          </View>
        </TvList>
        <view slot='header'></view>
        <View className={['tv_extra', hidden&&'hidden']}>
          <Text className='icon icon-close' onClick={onTvClose}></Text>
          <Text className='icon icon-floating' onClick={onTvFloating}></Text>
          <Text className={['icon', tvMuted?'icon-mute':'icon-volume']} onClick={onMutedToggle}></Text>
          <Text className='icon icon-full' onClick={onVideoFull}></Text>
          <Text className={['icon',`icon-${loading}`]} />
        </View>
      </View>

      <View className='tv_video'>
        <Video
          src={tvUrl} // 路径
          id={videoId}
          autoplay  // 自动播放
          loop={false}
          showMuteBtn // 显示静音按钮
          pageGesture  // 非全屏允许亮度音量调节
          initialTime='0'
          title={tvTitle} // 全屏时展示标题
          muted={tvMuted} // 是否静音播放
          controls={tvFull} // 显示video控制控件
          showPlayBtn={false} // 下方播放按钮
          onClick={onVideoToggle} // 点击控件
          onError={onVideoWaiting} // 视频加载出错
          onLoadedMetaData={onVideoWaiting} // 视频元数据加载完成
          autoPauseIfNavigate // 自动暂停视频
          autoPauseIfOpenNative // 自动暂停视频
          show-center-play-btn={false} // 中间播放按钮
          onFullscreenChange={onFullChange} // 全屏变化
          // enablePlayGesture // 双击暂停播放
          // picture-in-picture-mode={['push','pop']}
          // playBtnPosition='center' // 暂停播放按钮位置
        />
      </View>

    </View>
  )
}

LiveTv.config = {
  disableScroll:true,
  multipleSlots:true,
  addGlobalClass: true,
  navigationBarTitleText:'电视'
}

export default LiveTv
