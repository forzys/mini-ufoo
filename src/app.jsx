import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux';

import dva from './utils/dva';
import models from './models';
import Layout from './pages/layout'

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
    console.log( this.props, store)
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/index',
      'pages/music/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    console.log('jjjj', this.props, store)
    return (
      <Provider store={store}>
        <Layout />
      </Provider>

    )
  }
}

Taro.render(<App />, document.getElementById('app'))
