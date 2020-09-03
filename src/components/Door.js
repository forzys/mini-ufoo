import Nerv, { useEffect, useCallback, useState } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Video, Image } from "@tarojs/components";

import storage from "../common/storage";

export default function Door(props) {

  const [hidden,setHidden] = useState(true)
  const [animation,setAnimation] = useState(null)
  const [isShow,setIsShow] = useState(null)
  const [menuStyle,setMenuStyle] = useState(null)

  let StatusBar = storage.getSessionStorage(statusBarH); //状态栏高度
  let CustomBar = storage.getSessionStorage(customBarH); //titleBar高度
  let height = wx.getSystemInfoSync().windowHeight;
  useEffect(() => {
    let hidden = true; //默认为隐藏
    let isShow = null;
    let _nimation = null;
    //默认为圆形    宽高为设备高度÷15
    let myStyle = {
      borderRadius: height + "px",
      height: height / 15 + "px",
      width: height / 15 + "px",
    };

    let nav = [
      {
        navigation: [
          {
            name: "动态",
            src: "../../img/1.png",
          },
          {
            name: "酷图",
            src: "../../img/2.png",
          },
          {
            name: "应用集",
            src: "../../img/3.png",
          },
          {
            name: "扫一扫",
            src: "../../img/4.png",
          },
        ],
      },
      {
        navigation: [
          {
            name: "分享",
            src: "../../img/5.png",
          },
          {
            name: "图文",
            src: "../../img/6.png",
          },
          {
            name: "提问",
            src: "../../img/7.png",
          },
          {
            name: "话题",
            src: "../../img/8.png",
          },
        ],
      },
    ];


    _nimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'linear',
    })

    setAnimation(_nimation)
    //动画对象实例

    //获取当前设备的高度
  }, []);

  const onClickAdd = function(e) {
		let _menuStyle = ''


    setHidden(false)
    setMenuStyle(_menuStyle)

		//判断是否显示
		if (!isShow) {
			//未显示 则执行动画 缩放设备高度÷15高度
			animation.scale(height / 15).step()
			//加号按钮执行打开动画
			_menuStyle = 'menuOpen'
		} else {
			//已显示 则执行动画 缩放回0
			animation.scale(0).step()
			//加号按钮执行关闭动画
			_menuStyle = 'menuClose'
		}
    isShow = !isShow //存储显示状态

    setMenuStyle(_menuStyle)
		// that.setData({
		// 	animationData: animation.export(), //动画赋值
		// 	menuStyle: menuStyle, //加号按钮style赋值
		// })
		//如果显示状态为true 延时200毫秒后执行内容显示 否则立即隐藏
		isShow ?
			setTimeout(function() {
				setIsShow(isShow)
			}, 200) :  setIsShow(isShow)
	},

  return (<View>11</View>)
//   <view className={ [ "ripple-main", isShow?'filter':''] } >
// 	<view class="v-content">
// 		<view class="tx" style="height: {{CustomBar-StatusBar}}px;padding-top: {{StatusBar}}px;line-height: {{CustomBar-StatusBar}}px;">仿酷安menu</view>
// 		<view class="ripple" animation="{{animationData}}" hidden='{{hidden}}' style='{{myStyle}}'></view>
// 	</view>
// </view>

// <view class='bar'>
// 	<view class='tabicon'>
// 		<view hidden='{{!isShow}}' class='menu' style='height:{{CustomBar}}px;padding-top:{{CustomBar}}px;'>分享生活的点滴，见证美好的明天</view>
// 		<view class='bottom' hidden='{{!isShow}}'>
// 			{/* <view class='navlist' wx:for='{{nav}}' wx:for-item="i" wx:for-index="d">
// 				<view class='item  {{isShow?"animation-nav":""}}' style='animation-delay: {{(index+1)*0.1}}s;' wx:for='{{i.navigation}}'>
// 					<image mode='widthFix' src='{{item.src}}'></image>
// 					<text class='string'>{{item.name}}</text>
// 				</view>
// 			</view> */}
// 		</view>
// 	</view>
// </view>
// <view class="add1" hidden='{{isShow}}'>
// 	<view class='send'></view>
// </view>
// <view class="add">
// 	<view bindtap="onClickAdd">
// 		<text class="iconfont icon-jia {{menuStyle}}"></text>
// 	</view>
// </view>)

}
// https://loveempathy.coding.net/public/kuan_menu/kuan_menu/git/files/master/pages/index/index.wxml
