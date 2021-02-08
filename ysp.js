/*
[Script]
央视频 = type=http-response,pattern=https://liveinfo\.ysp\.cctv\.cn/\?cmd=2&cnlid=,script-path=https://raw.githubusercontent.com/VitalYoung/surge-scripts/master/ysp.js,script-update-interval=0
[MITM]
hostname = liveinfo.ysp.cctv.cn
*/
let map_idx = {
  '600002264': 'CCTV4K',
  '600001859': 'CCTV1',
  '600001800': 'CCTV2',
  '600001801': 'CCTV3',
  '600001814': 'CCTV4',
  '600001818': 'CCTV5',
  '600001817': 'CCTV5+',
  '600001802': 'CCTV6',
  '600004092': 'CCTV7',
  '600001803': 'CCTV8',
  '600004078': 'CCTV9',
  '600001805': 'CCTV10',
  '600001806': 'CCTV11',
  '600001807': 'CCTV12',
  '600001811': 'CCTV13',
  '600001809': 'CCTV14',
  '600001815': 'CCTV15',
  '600001810': 'CCTV17',
  '600014550': 'CGTN',
  '600002309': '北京卫视',
  '600002521': '江苏卫视',
  '600002483': '东方卫视',
  '600002520': '浙江卫视',
  '600002475': '湖南卫视',
  '600002508': '湖北卫视',
  '600002485': '广东卫视',
  '600002509': '广西卫视',
  '600002498': '黑龙江卫视',
  '600002506': '海南卫视',
  '600002531': '重庆卫视',
  '600002481': '深圳卫视',
  '600002516': '四川卫视',
  '600002525': '河南卫视',
  '600002484': '东南卫视',
  '600002490': '贵州卫视',
  '600002503': '江西卫视',
  '600002505': '辽宁卫视',
  '600002532': '安徽卫视',
  '600002493': '河北卫视',
  '600002513': '山东卫视'
}
let upload_url = 'https://web.shengyan.tk/upload.json'
if ($response !== "undefined") {
  let body = JSON.parse($response.body)
  let playurl = body['playurl']
  let livepid = body['livepid']
  let vkey = body['vkey']
  
  var request = {
    url: upload_url,
    method: 'POST',
    headers: {},
    body: JSON.stringify({'Vkey':vkey, 'Livepid':livepid+"", 'Playurl':playurl})
  };
  $httpClient.post(request, (err, res, body) => {
    if (res.status == 200) {
      $notification.post('央视频', '', '成功获取 ' + map_idx[livepid+""])
    } else {
      $notification.post('央视频', '', '获取失败')
    }
  })
}
$done({});
