
## Install

```sh
npm install -S rtsp-relay express
```
Then run your application: ```node rtspToWbsckt.js```

Open [http://localhost:3000](http://localhost:3000) in your web browser.



## Contributing

We have end-to-end tests to ensure that the module actually works. These tests spin up a RTSP server using [aler9/rtsp-simple-server](https://github.com/aler9/rtsp-simple-server) and create several different streams for testing. These tests are far from complete.

To make developing easier, run `node test/setupTests`. This creates two RTSP streams that can be used instead of real IP cameras (`rtsp://localhost:8554/sync-test-1` and `rtsp://localhost:8554/sync-test-2`).
