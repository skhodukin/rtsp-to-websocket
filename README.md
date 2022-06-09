## This is proof of concept of the future project.

The main aim was to check conversion of input RTSP-stream to WebSocket media stream and back: Websocket media stream to RTSP stream


### Prerequisites

1. To test this application we need some input RTSP stream for conversion.
There are some in the internet:

``` rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4,```

``` rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast, ```

``` rtsp://demo:demo@ipvmdemo.dyndns.org:5542/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast ```

These streams should be used as input test streams for our application.
The main problem, that these streams very unreliable and can be fail any time.
So for this purpose there was created rtsp-streamer mechanism, which allows to create your own rtsp-stream from video file. And stream it to the ```localhost```.

To start this local RTSP-streamer, go to ```test``` folder and run ```docker-compose up```.
Folder ```test\samples``` contains video file which you would stream to RTSP.

After docker container run you will be able to get RTSP-stream of the video file by the url ```rtsp://127.0.0.1:8554/stream```.
(By the way, you can check the stream, with VLC-player.)



2. Install packages

```sh
npm install
```

--------

### RTSP to WebSocket stream starting process

1. Run the application
```sh
node rtspStreamToWebsocketStream
```

2. Open [http://localhost:2000](http://localhost:2000) in your web browser.
You should see your video, played over Websocket (```ws://localhost:2000```).

### WebSocket media stream to RTSP-stream

1. Run the application
```sh
node websocketStreamToRtspStream
```
2. In console log you should see url(something like this ```RTSP: rtsp://127.0.0.1:6554/1```), so check this output stream via VLC player or openRTSP console application:
```shell
openRTSP rtsp://127.0.0.1:6554/1
```
and ensure that the stream is translating to this url.

This application uses previously created websocket as test input WebSocket media stream (```ws://localhost:2000```) and created another RTSP-stream from WebSocket stream.

