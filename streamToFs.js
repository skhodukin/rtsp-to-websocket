const fs = require('fs');
const websocket = require('websocket-stream');

const writeStream = fs.createWriteStream('wsStream.mp4');

writeStream.on('open', () => {
  const ws = websocket('http://localhost:2000');

  ws.pipe(writeStream);

  ws.on('error', (err) => {
    if (err) throw err;
  }).on('close', (err) => {
    if (err) throw err;
    console.log(`Closing ws with: ${fs.statSync('wsStream.mp4').size} bytes`);
  });

  writeStream.on('close', () => {
    console.log(
      `Closing file stream with: ${fs.statSync('wsStream.mp4').size} bytes`,
    );
  });
});
