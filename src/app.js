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
        storage.setSessionStorage(
          "customBarH",
          capsule.bottom + capsule.top - e.statusBarHeight
        );
        if (!capsule) {
          storage.setSessionStorage("customBarH", e.statusBarHeight + 50);
        }
      },
    });
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
