import Taro, { Component } from "@tarojs/taro-h5";
import { Provider } from "@tarojs/redux-h5";

import dva from './utils/dva';
import models from "./models/index";

import './asset/css/iconfont.css';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
import Nerv from 'nervjs';
import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/home/index"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {
  state = {
    __tabs: {
      color: '#7A7E83',
      selectedColor: '#c73420',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: "/pages/home/index",
        text: '首页'
      }, {
        pagePath: "/pages/about/index",
        text: '关于'
        // iconPath: 'assets/about.png'
        // selectedIconPath: 'assets/about-active.png'
      }],
      // color: '#333',
      // selectedColor: '#333',
      // backgroundColor: 'rgba(255,255,255,0.9)',
      // borderStyle: 'white'
      requiredBackgroundModes: ["audio"],
      mode: "hash",
      basename: "/",
      customRoutes: {}
    }
  };


  componentDidMount() {
    console.log(this.props, store);
    this.componentDidShow();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: ["/pages/home/index", "/pages/music/index", "/pages/article/index", "/pages/about/index", "/pages/liveTv/index"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: { color: '#7A7E83', selectedColor: '#c73420', borderStyle: 'black', backgroundColor: '#ffffff', list: [{ pagePath: "/pages/home/index", text: '首页' }, { pagePath: "/pages/about/index", text: '关于' }], requiredBackgroundModes: ["audio"], mode: "hash",
      basename: "/",
      customRoutes: {}
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
  };render() {
    return <Provider store={store}>
          
        <TabbarContainer>
          
        <TabbarPanel>
          
                <Router mode={"hash"} history={_taroHistory} routes={[{
            path: '/pages/home/index',
            componentLoader: () => import( /* webpackChunkName: "home_index" */'./pages/home/index'),
            isIndex: true
          }, {
            path: '/pages/music/index',
            componentLoader: () => import( /* webpackChunkName: "music_index" */'./pages/music/index'),
            isIndex: false
          }, {
            path: '/pages/article/index',
            componentLoader: () => import( /* webpackChunkName: "article_index" */'./pages/article/index'),
            isIndex: false
          }, {
            path: '/pages/about/index',
            componentLoader: () => import( /* webpackChunkName: "about_index" */'./pages/about/index'),
            isIndex: false
          }, {
            path: '/pages/liveTv/index',
            componentLoader: () => import( /* webpackChunkName: "liveTv_index" */'./pages/liveTv/index'),
            isIndex: false
          }]} tabBar={this.state.__tabs} customRoutes={{}} />
                
        </TabbarPanel>
        <Tabbar conf={this.state.__tabs} homePage="pages/home/index" />
        </TabbarContainer>
        </Provider>;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }

}

Nerv.render(<App />, document.getElementById('app'));