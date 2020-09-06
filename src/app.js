import { Component } from "nervjs";
import "./app.less";
import storage from "./common/storage";


class App extends Component {
  componentDidMount() {
    wx.getSystemInfo({
      success: (e) => {
        const capsule = wx.getMenuButtonBoundingClientRect();
        storage.setSessionStorage("custom", capsule);
        storage.setSessionStorage("statusBarH", e.statusBarHeight);
        storage.setSessionStorage("windowH", e.windowHeight);
        storage.setSessionStorage(
          "customBarH",
          capsule.bottom + capsule.top - e.statusBarHeight
        );
        if (!capsule) {
          storage.setSessionStorage("customBarH", e.statusBarHeight + 50);
        }
      },
    });
    // 初始化动画 等待调用
    const _animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
    });
    storage.setSessionStorage("animation", _animation);

  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
