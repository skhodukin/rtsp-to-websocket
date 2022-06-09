const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:2000');

/** * */
const rtsp = require('rtsp-server');

const server = rtsp.createServer((req, res) => {
  console.log(req.method, req.url);

  switch (req.method) {
    case 'OPTIONS':
      res.setHeader('Public', 'OPTIONS');
      break;
    case 'PLAY':
      res.setHeader('Public', 'PLAY');
      break;
    case 'SETUP':
      res.setHeader('Public', 'SETUP');
      break;
    case 'TEARDOWN':
      res.setHeader('Public', 'TEARDOWN');
      break;
    case 'DESCRIBE':
      res.setHeader('Public', 'DESCRIBE');
      break;
    case 'PAUSE':
      res.setHeader('Public', 'PAUSE');
      break;
    default:
      res.statusCode = 501; // Not implemented
  }
  socket.addEventListener('open', (e) => {
    socket.on('message', (m) => {
      // console.log('m', m)
      res.end(m);
    });
    // send a message to the server

    console.log('open');
  });
  // will echo the CSeq header used in the request
});

server.listen(2001, () => {
  const { port } = server.address();
  console.log('RTSP server is running on port:', port);
});
