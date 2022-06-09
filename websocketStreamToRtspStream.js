const RtspServer = require('rtsp-streaming-server').default;
const child_process = require('child_process');
const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:2000');

class Server {
    static get IsWindows() { return process.platform === "win32"; }
    static start = async () => {

        let proc = null;
        try {
            this.server = new RtspServer({
                serverPort: 5554,
                clientPort: 6554,
                rtpPortStart: 10000,
                rtpPortCount: 10000
            });
            await this.server.start();
            await this.delay(2000);
            console.log("ffmpeg Starting");
            proc = await this.ffmpeg();

          proc.on('close', (code, signal) => {
            console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);

          });

          proc.stdin.on('error', (e) => {
           // console.log('FFmpeg STDIN Error', e);
          });

          proc.stderr.on('data', (data) => {
          });

            socket.onmessage = function (event) {
               // console.log(event.data);
                proc.stdin.write(event.data);
            }

            socket.onclose = function (event) {
               // console.log(event);
                proc.kill('SIGINT');
            }

        } catch (ex) {
            console.log(ex);
        }
    }

    static guid() {
        return '1';

    }

    static ffmpeg = async () => {
        let streamId = this.guid();
        console.log(`RTSP: rtsp://127.0.0.1:6554/${streamId}`);
        return child_process.spawn(`ffmpeg`, [
                // FFmpeg will read input video from STDIN
                '-i', '-',
                '-c', 'copy',
                '-f', 'rtsp', `rtsp://127.0.0.1:5554/${streamId}`
        ]);
    }

    static delay = async (ms) => {
        return new Promise((res) => setTimeout(res, ms));
    }
}

Server.start();