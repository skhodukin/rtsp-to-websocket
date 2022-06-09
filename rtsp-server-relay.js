const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:2000');

/** * */
const rtsp = require('rtsp-server');
const sdpTransform = require('sdp-transform');

const sdpStr = "v=0\r\n\
o=- 0 0 IN IP4 127.0.0.1\r\n\
s=Stream\r\n\
t=0 0\r\n\
m=video 2001 RTP/AVP 96\r\n\
b=AS:301\r\n\
a=rtpmap:96 H264/90000\r\n\
a=fmtp:96 packetization-mode=1; sprop-parameter-sets=Z0LAHtkB4I/rARAAAAMAEAAAAwPA8WLkgA==,aMuMsg==; profile-level-id=42C01E\r\n\
a=control:trackID=0\r\n\
m=audio 0 RTP/AVP 97\r\n\
b=AS:112\r\n\
a=rtpmap:97 MPEG4-GENERIC/48000/2\r\n\
a=fmtp:97 profile-level-id=1;mode=AAC-hbr;sizelength=13;indexlength=3;indexdeltalength=3; config=1190\r\n\
a=control:trackID=1\r\n\
";


const server = rtsp.createServer((req, res) => {
  console.log(req.method, req.url);
  switch (req.method) {
    case 'OPTIONS':
      res.setHeader('Public', 'OPTIONS');
      res.end();
      break;
    case 'PLAY':
      res.setHeader('Public', 'PLAY');
      socket.onmessage = function (event) {
        console.log(event.data);
        res.write(event.data);
      }
      res.end();
      break;
    case 'SETUP':
      res.setHeader('Public', 'SETUP');
      res.end();
      break;
    case 'TEARDOWN':
      res.setHeader('Public', 'TEARDOWN');
      res.end();
      break;
    case 'DESCRIBE':
      res.setHeader('Content-Base', 'rtsp://127.0.0.1:2001');
      res.setHeader('Content-Type', 'application/sdp');
      // res.write(sdpTransform.write(sdpStr)); !!!!!!!

      res.end();
      break;
    case 'PAUSE':
      res.setHeader('Public', 'PAUSE');
      res.end();
      break;
  }



  // socket.addEventListener('open', (e) => {
  //   socket.on('message', (m) => {
  //     console.log('m', m)
  //
  //     res.end(m);
  //   });
  //   // send a message to the server
  //
  //   console.log('open');
  // });
  // will echo the CSeq header used in the request
});


server.listen(2001, () => {
  const { port } = server.address();
  console.log('RTSP server is running on port:', port);
});