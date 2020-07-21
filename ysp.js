/*
[Script]
央视频 = type=http-response,pattern=https://liveinfo\.ysp\.cctv\.cn/\?cmd=2&cnlid=,script-path=https://raw.githubusercontent.com/VitalYoung/surge-scripts/master/ysp.js,script-update-interval=0
[MITM]
hostname = liveinfo.ysp.cctv.cn
*/
let upload_url = 'https://dev.shengyan.tk/upload.json'
if ($response !== "undefined") {
  let body = JSON.parse($response.body)
  let playurl = body['playurl']
  let livepid = body['livepid']
  let vkey = body['vkey']
  
  var request = {
    url: upload_url,
    method: 'POST',
    headers: {},
    body: JSON.stringify({'Vkey':vkey, 'Livepid':livepid, 'Playurl':playurl})
  };
  $httpClient.post(request, (err, res, body) => {
    if (res.status == 200) {
      $notification.post('央视频', '', '成功获取 ' + livepid)
    } else {
      $notification.post('央视频', '', '获取失败')
    }
  })
}
$done({});
