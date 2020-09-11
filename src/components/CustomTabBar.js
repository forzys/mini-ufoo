import Taro from "@tarojs/taro";
import Nerv, { useState, useEffect, useCallback } from "nervjs";
import { View, Text } from "@tarojs/components";
import storage from "../common/storage";
import base64 from "../common/base64";
import "./global.less";

export default function CustomDoor(props) {
  const [custom, setCustom] = useState({});
  const [customBarH, setCustomBarH] = useState(0);
  const [statusBarH, setStatusBarH] = useState(0);
  const { isBack, backStyle, contentStyle } = props;
  const { customBarClass, customBarBackClass } = props;

  useEffect(() => {
    const _custom = storage.getSessionStorage("custom");
    // const _windowH = storage.getSessionStorage("windowH");
    const _customBarH = storage.getSessionStorage("customBarH");
    const _statusBarH = storage.getSessionStorage("statusBarH");

    setCustom(_custom);
    setCustomBarH(_customBarH);
    setStatusBarH(_statusBarH);

    Taro.loadFontFace({
      global: true,
      family: "font-network",
      source:
        "url(https://cdn.jsdelivr.net/gh/mforz/dataset@latest/font/fontquan0001.ttf)",
    });
  }, []);

  const onBackPage = useCallback(() => {
    Taro.navigateBack();
  }, []);

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
              onClick={customBarBackClass && onBackPage}
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
    </View>
  );
}
