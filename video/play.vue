<template>
  <view class="container">

    <AppHeader />

    <view class="padding-30rpx padding-no-bottom text-align-center">
      {{ options.name ?? videoSource.name }}
    </view>

    <view class="padding-20rpx">
      <div id="dplayer" class="dplayer" ref="dplayer"></div>
    </view>

    <AppFooter />

  </view>

</template>

<script>
import QRCode from "qrcode";
import {QrcodeCapture, QrcodeDropZone, QrcodeStream} from 'vue-qrcode-reader'
import {KEY_CLIENT_ID} from "@/common/constant";
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import AppHeader from "@/pages/common/AppHeader.vue";
import AppFooter from "@/pages/common/AppFooter.vue";
import {httpRequest} from "@/common/api";
import {navigateToUrl} from "@/common/utils";

export default {
  data() {
    return {
      title: 'Hello QR',
      qrCodeUrl: null,
      clientId: null,
      dplayer: {
        player: null,
        hls: null,
        hide: true,
      },
      options: null,
      videoSource: null,
    }
  },
  components: {
    AppFooter,
    AppHeader,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  onLoad(options) {
    if (!options.pid) {
      navigateToUrl('/video/list?from-detail-empty-pid')
    }
    this.options = options
    this.loadVideoSource(options.vid, options.pid)
  },
  onReady() {
    // this.playVideo({
    //   // 'url': '',
    //   // "type": "auto",
    //   // "pic": "https://example.com/GTgmY9DcDOEAh5mMo.jpg",
    //   // "thumbnails": "",
    // })
  },
  onUnload() {
    this.clearPlayerConfig()
  },
  methods: {
    qrCode() {
      const tmpUrl = `https://air.artools.cc/mobile/?version=v2&tv_id=${this.clientId}&t=` + Date.now()
      QRCode.toDataURL(tmpUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        width: 300
      }).then(url => {
        // console.log(url)
        this.qrCodeUrl = url
      }).catch(err => {
        console.error(err)
      })
    },
    loadClientId() {
      this.clientId = uni.getStorageSync(KEY_CLIENT_ID)
    },
    onDetect(detectedCodes) {
      console.log('[detectedCodes]', detectedCodes)
    },
    playVideo(data) {
      this.clearPlayerConfig()

      this.dplayer.player = new DPlayer({
        container: this.$refs.dplayer,
        autoplay: true,
        hotkey: true,
        loop: true,
        screenshot: false,
        theme: "#00b2c2",
        // logo: "https://srv.carbonads.net/static/30242/4f7f59796c5dda8f5dfc63a40583dfde7cebb050",
        video: this.getPlayerConfig(data),
      });

      this.dplayer.player.on('ended', function () {
        console.log('[player ended]');
      })
      this.dplayer.player.on('abort', function () {
        console.log('[player abort]');
      })
      this.dplayer.player.on('canplay', function () {
        console.log('[player canplay]');
      })
      this.dplayer.player.on('error', function () {
        console.log('[player error]');
      })
      this.dplayer.player.on('pause', function () {
        console.log('[player pause]');
      })
      this.dplayer.player.on('play', () => {
        console.log('[player play]', this.dplayer.player);

      })
      this.dplayer.player.on('playing', function () {
        console.log('[player playing]');
      })
      this.dplayer.player.on('fullscreen', function () {
        console.log('[player fullscreen]');
      })
      this.dplayer.player.on('loadeddata', () => {
        console.log('[player loadeddata]');
        this.dplayer.hide = false
      })
      this.dplayer.player.on('loadedmetadata', function () {
        console.log('[player loadedmetadata]');
      })
      this.dplayer.player.on('loadstart', function () {
        console.log('[player loadstart]');
      })
      this.dplayer.player.on('stalled', function () {
        console.log('[player stalled]');
      })
      this.dplayer.player.on('waiting', function () {
        console.log('[player waiting]');
      })
    },
    getPlayerConfig(data) {
      let tmpConfig = {}
      if (data.type === 'hls') {
        tmpConfig = {
          url: data.url,
          pic: data.pic,
          thumbnails: data.thumbnails,
          autoplay: true,
          type: 'customHls',
          customType: {
            customHls: (video, player) => {
              // video.controls = true
              video.autoplay = true
              video.src = data.url
              const hls2 = new Hls({ debug: false, });
              hls2.loadSource(video.src);
              hls2.attachMedia(video);
              this.dplayer.hls = hls2;
            },
          },
        }
      } else {
        tmpConfig = {
          url: data.url,
          pic: data.pic,
          thumbnails: data.thumbnails,
          autoplay: true,
          type: "auto",
        };
      }
      return tmpConfig
    },
    clearPlayerConfig() {
      if (this.dplayer.hls) {
        console.log('[hls destroy...]', this.dplayer.hls)
        this.dplayer.hls.destroy();
      }
      if (this.dplayer.player) {
        console.log('[dp destroy...]', this.dplayer.player)
        this.dplayer.player.pause();
        this.dplayer.player.destroy();
      }
    },
    onClickPlay() {
      const aaa = {
        "id": "bXZfNTY3OTQtbm1fMQ==",
        "vid": "",
        "name": "",
        "source": "https://wangchuanxin.top/m3/NIDBpweufkTkIyA58AvdyagzkEPt4CPi4QZ3fWoZqN2WbvfIa1GXLhWRPq6vqRd_wh_cHANSPxVScPdGpskI-lAYUULBDQzuNqdABloSvXo.m3u8",
        "url": "/m3u8/f6/f6fe20f9fc9cec206fb2501b0c2013c9.m3u8",
        "type": "hls",
        "thumb": ""
      }

      this.playVideo({
        url: 'xhttps://air.artools.cc/m3u8/cb/cb63a4e7e943b61b918a123986573f68.m3u8',
        "type": "hls",
      })
    },
    switchVideo() {
      const data = {
        'url': 'https://air.artools.cc/m3u8/cb/cb63a4e7e943b61b918a123986573f68.m3u8',
        "type": "hls",
      }
      this.playVideo(data)
    },
    loadVideoSource(vid, pid) {
      httpRequest({
        url: '/api/video/source',
        method: 'GET',
        data: { vid: vid, pid: pid, },
        success: (resp) => {
          this.videoSource = resp.data
          this.playVideo(this.videoSource)
        },
      })
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000000;
}

.qr {
  height: 600rpx;
  width: 600rpx;
  margin-top: 150rpx;
  margin-bottom: 50rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.dplayer {
  width: 100%;
}

</style>
