const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:2000');
/** * */
const rtsp = require('rtsp-server');
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
      break;
    case 'SETUP':
      res.setHeader('Public', 'SETUP');
      res.end();
      break;
    case 'TEARDOWN':
      res.setHeader('Public', 'TEARDOWN');
      break;
    case 'DESCRIBE':
      res.setHeader('Content-Base', 'rtsp://127.0.0.1:2001');
      res.setHeader('Content-Type', 'application/sdp');
      res.end();
      break;
    case 'PAUSE':
      res.setHeader('Public', 'PAUSE');
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