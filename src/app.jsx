import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux';
import dva from './utils/dva';
import models from './models/index';
import Home from './pages/home/index'
import './asset/styles/iconfont.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();
class App extends Component {

  componentDidMount () {
    // console.log( this.props, store)
  }

  componentDidShow () {}
  componentDidHide () {}
  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/index',
      'pages/music/index',
      'pages/article/index',
      'pages/about/index',
      'pages/livetv/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#7A7E83',
      selectedColor: '#c73420',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: 'pages/home/index',
        text: '首页',
      }, {
        pagePath: 'pages/livetv/index',
        text: '直播',
        // iconPath: 'assets/about.png'
        // selectedIconPath: 'assets/about-active.png'
      }],
      // color: '#333',
      // selectedColor: '#333',
      // backgroundColor: 'rgba(255,255,255,0.9)',
      // borderStyle: 'white'
      requiredBackgroundModes: ["audio"]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>

    )
  }
}

Taro.render(<App />, document.getElementById('app'))
