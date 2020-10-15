const URL = require("url");
const zlib = require("zlib");
const http = require("http");
const https = require("https");
const qs = require("querystring");

function Request() {}

Request.prototype.getHeaders = function (host, postData) {
  let headers = {
    Host: host,
    Pragma: "no-cache",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,es;q=0.2",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
  };
  if (postData != "") {
    headers["Content-Length"] = Buffer.byteLength(postData);
  }
  return headers;
};

Request.prototype.request = function (method, url, params) {
  let postData = qs.stringify(params || {});
  let urlObj = URL.parse(url);
  let protocol = urlObj.protocol;
  let options = {
    hostname: urlObj.host,
    port: urlObj.port,
    path: urlObj.path,
    method: method,
    headers: this.getHeaders(urlObj.host, postData),
  };
  return new Promise((resolve, reject) => {
    let req = (protocol == "http:" ? http : https).request(options, (res) => {
      let chunks = [];
      res.on("data", (data) => {
        chunks.push(data);
      });
      res.on("end", () => {
        let buffer = Buffer.concat(chunks);
        let encoding = res.headers["content-encoding"];
        if (encoding == "gzip") {
          zlib.gunzip(buffer, function (err, decoded) {
            resolve(decoded.toString());
          });
        } else if (encoding == "deflate") {
          zlib.inflate(buffer, function (err, decoded) {
            resolve(decoded.toString());
          });
        } else {
          resolve(buffer.toString());
        }
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    if (postData != "") {
      req.write(postData);
    }
    req.end();
  });
};
Request.prototype.get = function (url) {
  return this.request("GET", url, null);
};
Request.prototype.post = function (url, params) {
  return this.request("POST", url, params);
};
module.exports = function () {
  return new Request();
};
