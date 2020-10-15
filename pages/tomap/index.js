//index.js
//获取应用实例

const polygon = [
  {
    points: [],
    zIndex: 50,
    strokeWidth: 3,
    strokeColor: "#00ae66",
    fillColor: "rgba(0, 174, 102, 0.4)",
  },
];

Page({
  data: {
    touche: {},
    canvas: null,
    pointer: [],
    polygons: [...polygon],
    hidden: 0,
    enable: true,
    scale: 15,
    xypoin: {},
  },

  onLoad: function () {
    wx.createSelectorQuery()
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const node = res[0].node;
        const ctx = node.getContext("2d");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        node.width = res[0].width * dpr;
        node.height = res[0].height * dpr;
        ctx.lineWidth = 3; //设置线宽
        ctx.strokeStyle = "#00ae66"; //设置线条
        ctx.scale(dpr, dpr);

        this.setData({
          canvas: ctx,
          hidden: 1,
          width: res[0].width,
          height: res[0].height,
        });
      });
  },

  onShowCanvas: function (e) {
    this.setData(
      {
        hidden: 0,
        enable: false,
      },
      () => this.setMapScale
    );
  },

  setMapScale: function (e) {
    const { scale } = this.data;
    wx.createMapContext("map").getScale({
      success: (res) => {
        res.scale < 9 && this.setData({ scale: scale === 9 ? 9.1 : 9 });
      },
    });
  },

  // 初始化点坐标
  touchstart: function (e) {
    const { canvas, pointer } = this.data;
    const start = e.touches[0];

    // canvas 开始作画
    canvas.beginPath();
    canvas.lineJoin = "round";
    canvas.moveTo(start.x, start.y);

    // 获取坐标经纬度
    wx.createMapContext("map").getRegion({
      success: (res) => {
        this.setData({
          xypoin: {
            northeast: res.northeast,
            southwest: res.southwest,
          },
        });
      },
    });
  },

  // 开始画图
  touchmove: function (e) {
    const { canvas, pointer } = this.data;
    const move = e.touches[0];
    canvas.lineTo(move.x, move.y);
    pointer.push(move);
    canvas.stroke();
    this.setData({ pointer });
  },

  // 画图结束
  touchend: function (e) {
    const { canvas, pointer, xypoin, width, height } = this.data;
    canvas.closePath();
    canvas.clearRect(0, 0, width, height);

    // 经纬度相对差值
    const xLen = xypoin.northeast.longitude - xypoin.southwest.longitude;
    const yLen = xypoin.northeast.latitude - xypoin.southwest.latitude;

    // 画图经纬度对应坐标
    let list = pointer.map((i) => ({
      latitude: xypoin.northeast.latitude - (i.y / height) * yLen,
      longitude: xypoin.southwest.longitude + (i.x / width) * xLen,
    }));

    list.length <= 4 && (list = []);

    this.setData({
      hidden: 1,
      pointer: [],
      enable: true,
      "polygons[0].points": list,
    });
  },
});
