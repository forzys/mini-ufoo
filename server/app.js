var fs = require("fs");
var url = require("url");
var http = require("http");
var apis = require("./apis");
var request = require("./request")();

/**
 * 创建服务
 */
var headerText = { "Content-Type": "text/html;charset=utf-8" };
var headerJson = { "Content-Type": "application/json;charset=utf-8" };

var server = http.createServer(async function (req, res) {
  var urls = url.parse(req.url, true);
  var paths = urls.pathname;
  var name = paths.substr(1);
  var path = apis[name];
  if (path) {
    var search = urls.search || "";
    var href = path + search;
    let data = await request.get(href);
    res.writeHead(200, headerJson);
    res.end(data);
  } else {
    res.writeHead(200, headerText);
    fs.readFile("./index.html", "utf-8", function (err, data) {
      if (err) {
        res.end("未找到文件");
      }
      res.end(data);
    });
  }
});
server.listen(8080, () => {
  console.log(`服务成功启动，请访问 http://127.0.0.1:8080`);
});
