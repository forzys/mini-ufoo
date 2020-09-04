// import Nerv, { useEffect, useCallback, useState } from "nervjs";
// import Taro from "@tarojs/taro";
// import { View, Text, Block, Image } from "@tarojs/components";
// import storage from "../common/storage";

// export default function Door(props) {
//   const [hidden, setHidden] = useState(true);
//   const [animation, setAnimation] = useState(null);
//   const [isShow, setIsShow] = useState(false);
//   const [menuStyle, setMenuStyle] = useState(null);
//   const [animationData, setAnimationData] = useState(null);

//   let StatusBar = storage.getSessionStorage("statusBarH"); //状态栏高度
//   let CustomBar = storage.getSessionStorage("customBarH"); //titleBar高度
//   let height = wx.getSystemInfoSync().windowHeight;
//   let myStyle = {
//     borderRadius: height + "px",
//     height: height / 15 + "px",
//     width: height / 15 + "px",
//   };
//   let nav = [
//     {
//       navigation: [
//         {
//           name: "动态",
//           src: "../../img/1.png",
//         },
//         {
//           name: "酷图",
//           src: "../../img/2.png",
//         },
//         {
//           name: "应用集",
//           src: "../../img/3.png",
//         },
//         {
//           name: "扫一扫",
//           src: "../../img/4.png",
//         },
//       ],
//     },
//     {
//       navigation: [
//         {
//           name: "分享",
//           src: "../../img/5.png",
//         },
//         {
//           name: "图文",
//           src: "../../img/6.png",
//         },
//         {
//           name: "提问",
//           src: "../../img/7.png",
//         },
//         {
//           name: "话题",
//           src: "../../img/8.png",
//         },
//       ],
//     },
//   ];

//   useEffect(() => {
//     const _animation = wx.createAnimation({
//       duration: 300,
//       timingFunction: "linear",
//     });
//     setAnimation(_animation);
//   }, []);

//   const onClickAdd = function (e) {
//     let _menuStyle = "";
//     let _isShow = isShow;
//     setHidden(false);
//     setMenuStyle(_menuStyle);

//     //判断是否显示
//     if (!_isShow) {
//       console.log("xxxx");
//       //未显示 则执行动画 缩放设备高度÷15高度
//       animation.scale(height / 15).step();
//       //加号按钮执行打开动画
//       _menuStyle = "menuOpen";
//     } else {
//       console.log("yyyyx");
//       //已显示 则执行动画 缩放回0
//       animation.scale(0).step();
//       //加号按钮执行关闭动画
//       _menuStyle = "menuClose";
//     }
//     _isShow = !_isShow; //存储显示状态
//     let _animationData = animation.export();
//     setMenuStyle(_menuStyle);
//     setAnimationData(_animationData);
//     // that.setData({
//     // 	animationData: animation.export(), //动画赋值
//     // 	menuStyle: menuStyle, //加号按钮style赋值
//     // })
//     //如果显示状态为true 延时200毫秒后执行内容显示 否则立即隐藏
//     _isShow
//       ? setTimeout(function () {
//           setIsShow(_isShow);
//         }, 200)
//       : setIsShow(_isShow);
//   };

//   return (
//     <>
//       <View className={["ripple-main", isShow ? "filter" : ""]}>
//         <View className="v-content">
//           <View
//             className="tx"
//             style={{
//               height: CustomBar - StatusBar + "px",
//               paddingTop: StatusBar + "px",
//               lineHeight: CustomBar - StatusBar + "px",
//             }}
//           >
//             仿酷安menu
//           </View>
//           <View
//             className="ripple"
//             animation={animationData}
//             hidden={hidden}
//             style={{ ...myStyle, display: hidden ? "none" : "auto" }}
//           ></View>
//         </View>
//       </View>

//       <View className="bar">
//         <View className="tabicon">
//           <View
//             hidden={!isShow}
//             style={{ ...myStyle, display: hidden ? "none" : "auto" }}
//             className="menu"
//             style={{
//               height: CustomBar + "px",
//               paddingTop: CustomBar + "px",
//             }}
//           >
//             分享生活的点滴，见证美好的明天
//           </View>

//           <View
//             className="bottom"
//             hidden={!isShow}
//             style={{ display: !isShow ? "none" : "auto" }}
//           >
//             {nav.map((item, index) => {
//               return (
//                 <View
//                   className={["item", isShow ? "animation-nav" : ""]}
//                   style={{ animationDelay: (index + 1) * 0.1 + "s" }}
//                 >
//                   {item.navigation.map((i) => {
//                     return (
//                       <>
//                         {/* <Image mode="widthFix" src={i.src} /> */}
//                         <Text className="string">{i.name}</Text>
//                       </>
//                     );
//                   })}
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//       </View>

//       <View
//         className="add1"
//         hidden={isShow}
//         style={{ display: isShow ? "none" : "auto" }}
//       >
//         <View className="send"></View>
//       </View>

//       <View className="add">
//         <View onClick={onClickAdd}>
//           <View className={["iconfont icon-jia", menuStyle]}>OPEN</View>
//         </View>
//       </View>
//     </>
//   );
// }

import Nerv, { useState, useEffect, useCallback } from "nervjs";
import Taro from "@tarojs/taro";
import { View, Text, Block, Image } from "@tarojs/components";
import storage from "../common/storage";
import "./global.less";

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
export default function CustomDoor(props) {
  const [custom, setCustom] = useState({});
  const [animation, setAnimation] = useState(null);
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [windowH, setWindowH] = useState(0);
  const [customBarH, setCustomBarH] = useState(0);
  const [statusBarH, setStatusBarH] = useState(0);
  const { isBack, backStyle, contentStyle } = props;
  const { customBarClass, customBarBackClass } = props;

  useEffect(() => {
    const _custom = storage.getSessionStorage("custom");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _statusBarH = storage.getSessionStorage("statusBarH");
    const _windowH = storage.getSessionStorage("windowH");

    setCustom(_custom);
    setCustomBarH(_customBarH);
    setStatusBarH(_statusBarH);
    setWindowH(_windowH);
  }, []);

  const onBackPage = useCallback(() => {
    Taro.navigateBack();
  }, []);

  const onBackHome = useCallback(() => {
    Taro.reLaunch({ url: "/pages/index/index" });
  }, []);

  const onLockChange = useCallback(() => {
    let _isLockOpen = isLockOpen;
    const _animation = storage.getSessionStorage("animation");
    _isLockOpen
      ? _animation.scale(0).step()
      : _animation.scale(windowH / 15).step();

    _isLockOpen = !_isLockOpen;
    _isLockOpen
      ? setTimeout(() => {
          setIsLockOpen(_isLockOpen);
        }, 200)
      : setIsLockOpen(_isLockOpen);
    setAnimation(_animation.export());
  }, [isLockOpen, windowH]);

  return (
    <View className="door-custom" style={{ height: `${customBarH}px` }}>
      {/* door bar */}

      <View className="door-bar fixed" style={{ height: `${customBarH}px` }}>
        <View
          className={["bar-custom", customBarClass]}
          style={{
            width: `${custom.left}px`,
            paddingTop: `${statusBarH}px`,
          }}
        >
          {isBack && (
            <View
              className="back"
              onClick={onBackPage}
              style={{ ...backStyle }}
            >
              <Text className={[customBarBackClass]}></Text>
              {this.props.renderBack}
            </View>
          )}

          <View className="content" style={{ ...contentStyle }}>
            {this.props.renderContent}
          </View>
        </View>
      </View>

      {/* door lock */}
      <View className="door-lock fixed" onClick={onLockChange}>
        <View>
          <Text className={["iconfont icon-my"]} />
        </View>
      </View>

      <View
        className="door-facade fixed"
        style={{
          display: isLockOpen ? "auto" : "none",
        }}
      >
        {nav.map((item, index) => {
          return (
            <View
              className={["item-list", isLockOpen ? "animation" : ""]}
              style={{ animationDelay: (index + 1) * 0.1 + "s" }}
            >
              {item.navigation.map((i) => {
                return (
                  <View className="item">
                    <Image mode="widthFix" className="icon" src={i.icon} />
                    <Text className="name">{i.name}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>

      <View className={["ripple-main", isLockOpen ? "filter" : ""]}>
        <View className="v-content">
          <View
            className="ripple"
            animation={animation}
            style={{
              borderRadius: windowH + "px",
              height: windowH / 15 + "px",
              width: windowH / 15 + "px",
              display: isLockOpen ? "none" : "auto",
            }}
          ></View>
        </View>
      </View>

      {/* door ripple */}
    </View>
  );
}
