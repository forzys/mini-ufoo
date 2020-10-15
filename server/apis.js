var apis = {
  /**
   * 获取全部列表  /?name=1
   * 漫画API接口
   *   ?mhname=海贼王
   *   ?mhurl1=url(通过‘mhname’获取到的url)
   *   ?mhurl2=url(通过‘mhurl1'获取到的url)
   *   如果有图片无法显示，禁用referer属性即可
   *   影视API接口
   *   ?ysname=复仇者联盟
   *   ?ysurl=url(通过‘ysname’获取到的url)
   *   通过ysurl获取到的是播放地址与下载地址
   *  小说API接口
   *   ?xsname=斗破苍穹
   *   ?xsurl1=url(通过‘xsname’获取到的url)
   *   ?xsurl2=url(通过‘xsurl1'获取到的url)
   */
  pingcc: "https://api.pingcc.cn",
  /**
   * https://api.imjad.cn
   * https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=50&encode=json&fun=sync&source=
   */
  imjadQqfm: "https://api.imjad.cn/qqfm/v1/",
  imjadPixiv: "https://api.imjad.cn/pixiv/v2/",
  imjadHitokoto: "https://api.imjad.cn/hitokoto/",
  imjadBilibili: "https://api.imjad.cn/bilibili/v2/",
  imjadCloudmusic: "https://api.imjad.cn/cloudmusic/",
  /**
   * 壁纸系列
   * bing: https://cn.bing.com/
   * wallBing: https://cn.bing.com/HPImageArchive.aspx?format=js&n=5
   * wallPicasso: https://service.picasso.adesk.com/v1/vertical/vertical
   * wallPicassoSearch:
   */
  wallBing: "https://cn.bing.com/HPImageArchive.aspx",
  wallPicasso: "https://service.picasso.adesk.com/v1/vertical/vertical",
  wallPicassoSearch: "https://so.picasso.adesk.com/v1/",
  /**
   * 实时搜索 热点 系列
   * hot-bd 默认热门小说[533,42],
   * 电影 全部 #buzz/1596/528 惊悚 1599/528 剧情 1597/528 爱情 1598/528 喜剧 1600/528 科幻 1601/528
   * 动漫 全部 #buzz/1619/530 益智 1621/530 搞笑 1620/530 冒险 1622/530 国产 1623/530 日本 1624/530 欧美 1625/530
   * 小说 全部 #buzz/533/42 玄幻奇幻 582/42 都市言情 584/42 武侠仙侠 583/42 青春校园 1514/42 穿越架空 1516/42 惊悚悬疑 585/42 历史军事 586/42  游戏竞技 1519/42 耽美同人 1517/42 文学经典 1520/42 完结 1694/42 免费 587/42
   * hotspotWeibo:https://m.client.10010.com/service_toutiao/weibo/getWeiBoReSouList?pageSize=50
   * hotspotZhihu: https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true,
   * hotspotDouyin: https://aweme-hl.snssdk.com/aweme/v1/hot/search/list/?detail_list=1,
   */
  topbuzzBaidu: "https://top.baidu.com/mobile_v2/buzz/",
  hotspotSina: "https://www.sina.com.cn/api/hotword.json",
  hotspotSogou: "https://m.sogou.com/web/search/hot_news.jsp",
  hotspotBaidu: "https://top.baidu.com/mobile_v2/buzz/hotspot",
  hotspotZhihu: "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total",
  hotspotDouyin: "https://aweme-hl.snssdk.com/aweme/v1/hot/search/list/", // 抖音热搜榜
  hotspotIesword:
    "https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/", // 抖音热搜榜
  hotspotIesaweme:
    "https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/aweme/",
  hotspotIesmusic:
    "https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/music/",
  hotspotWeibo:
    "https://m.client.10010.com/service_toutiao/weibo/getWeiBoReSouList",

  /**
   * 翻译 每日一句
   *fanyiYoudao: http://fanyi.youdao.com/translate?doctype=json&i=word
   *fanyiIciba: https://fy.iciba.com/ajax.php?a=fy&w=word
   *sentenceIciba: https://sentence.iciba.com/index.php?c=dailysentence&m=getTodaySentence
   */
  dsapiIciba: "https://open.iciba.com/dsapi/",
  fanyiIciba: "https://fy.iciba.com/ajax.php",
  fanyiYoudao: "https://fanyi.youdao.com/translate",
  sentenceIciba: "https://sentence.iciba.com/index.php",
  /**
   *
   */
  newszhihu: "https://news-at.zhihu.com/api/4/news/latest",
  /**
   * 语音翻译朗读
   * https://fanyi.baidu.com/gettts?spd=5&source=web&lan=zh&text=你好
   */
  ttsBaidu: "https://fanyi.baidu.com/gettts",
  /**
   * https://www.baidu.com/home/other/data/weatherInfo?city=上海
   */
  weatherBaidu: "https://www.baidu.com/home/other/data/weatherInfo",
};

if (typeof module === "object" && module && module.exports) {
  module.exports = apis;
}

// 【Akamai 节点，没有使用限制】https://imageproxy.pimg.tw/resize?url=
// https://search.pstatic.net/common/?src=https://search.pstatic.net/common/?src=https://i.imgur.com/Usdr0IT.jpg

/**
 *
 *皮皮虾无水印解析
 * By、ッ小眼睛っ
 * 聚光网络博客 https://www.rncen.com/
 *
 * https://h5.pipix.com/s/J8KFRqW/
 * https://h5.pipix.com/item/6823536835323500811?app_id=1319&app=super&timestamp=1593348598&carrier_region=cn&region=cn&language=zh&utm_source=weixin
 * https://h5.pipix.com/bds/webapi/item/detail/?item_id=6823536835323500811&source=share
 *
 * name data.item.content
 * img data.item.cover.url_list[0].url
 * video data.item.video.video_fallback.url_list[0].url
 *
 */
// header('Access-Control-Allow-Origin:*');
// header('Content-type:application/json; charset=utf-8');
// error_reporting(0);
// if(!array_key_exists('url',$_REQUEST))exit(error("缺少参数"));
// $url =@$_REQUEST;
// preg_match("/https:\/\/h5.pipix.com\/s\/\S+/",$url['url'],$res);
// if (!$res)exit(error("请检查你输入的链接"));
// function error($str){
//     return json_encode([
//         "code"=>-1,
//         "msg"=>$str
//     ],JSON_UNESCAPED_UNICODE);
// }
// function curl($url, $getinfo=false)
// {
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_URL, $url);
//     curl_setopt($ch, CURLOPT_NOBODY, false);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, false);
//     curl_setopt($ch, CURLOPT_TIMEOUT, 3600);
//     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
//     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//     curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
//     curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
//     curl_setopt($ch, CURLOPT_AUTOREFERER, true);
//     curl_setopt($ch, CURLOPT_ENCODING, '');
//     curl_setopt($ch, CURLOPT_HTTPHEADER, array('User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'));
//     if($getinfo){
//         curl_exec($ch);
//         $data = curl_getinfo($ch,CURLINFO_EFFECTIVE_URL);
//     }else{
//         $data = curl_exec($ch);
//     }
//     curl_close($ch);
//     return $data;
// }
// preg_match("/item\/(.*?)\?/",get_headers($res[0], TRUE)['location'],$ids);//获取皮皮虾item_id
// if(!$ids[1])exit(error("数据异常,请稍后再试"));
// $datas = json_decode(curl('https://h5.pipix.com/bds/webapi/item/detail/?item_id='.$ids[1].'&source=share'));
// exit(json_encode([
//     "code"=>1,
//     "msg"=>"获取成功",
//     "data"=>[
//         'title'    => $datas->data->item->content,
//         'img'      => $datas->data->item->cover->url_list[0]->url,
//         'videourl' => $datas->data->item->video->video_fallback->url_list[0]->url
//     ]
// ],JSON_UNESCAPED_UNICODE))
