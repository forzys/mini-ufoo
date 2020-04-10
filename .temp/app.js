import Taro, { Component } from "@tarojs/taro-h5";
import { Provider } from "@tarojs/redux-h5";

import dva from './utils/dva';
import models from "./models/index";
import Nerv from 'nervjs';
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


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount() {
    console.log(this.props, store);
    this.componentDidShow();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: ["/pages/home/index", "/pages/music/index"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
  };render() {
    return <Provider store={store}>
          
                <Router mode={"hash"} history={_taroHistory} routes={[{
        path: '/pages/home/index',
        componentLoader: () => import( /* webpackChunkName: "home_index" */'./pages/home/index'),
        isIndex: true
      }, {
        path: '/pages/music/index',
        componentLoader: () => import( /* webpackChunkName: "music_index" */'./pages/music/index'),
        isIndex: false
      }]} customRoutes={{}} />
                
        </Provider>;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

}

Nerv.render(<App />, document.getElementById('app'));