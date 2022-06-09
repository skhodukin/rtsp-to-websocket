const express = require('express');

const app = express();

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
  url: `rtsp://127.0.0.1:8554/stream`,
  verbose: false,
  transport: 'tcp'
});

// the endpoint our RTSP uses
app.ws('/', handler);

// this is an example html page to view the stream
app.get('/', (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>
  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://' + location.host,
      canvas: document.getElementById('canvas')
    });
  </script>
`),
);

app.listen(2000);