<template>
  <view class="container">

    <AppHeader />

    <view class="padding-30rpx padding-no-bottom text-align-center">
      {{ options.name ?? videoSource.name }}
    </view>

    <view class="padding-20rpx padding-no-bottom">
      <div v-show="defaultPlayer" id="dplayer" class="dplayer" ref="dplayer"></div>
      <iframe v-show="!defaultPlayer&&videoSource" class="iframe" :src="libmediaAvpConfig"
              :key="libmediaAvpConfig"></iframe>

      <view class="padding-10rpx"></view>

      <view v-if="videoSource" class="flex-row flex-align-center" @click="onClickChangePlayer">
        <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6417">
          <path
              d="M609.834667 97.834667a42.666667 42.666667 0 0 1 60.330666 0l170.666667 170.666666a42.666667 42.666667 0 0 1 0 60.330667l-170.666667 170.666667a42.666667 42.666667 0 0 1-60.330666-60.330667L707.669333 341.333333H213.333333a42.666667 42.666667 0 0 1 0-85.333333h494.336l-97.834666-97.834667a42.666667 42.666667 0 0 1 0-60.330666z m-195.669334 426.666666a42.666667 42.666667 0 0 1 0 60.330667L316.330667 682.666667H810.666667a42.666667 42.666667 0 1 1 0 85.333333H316.330667l97.834666 97.834667a42.666667 42.666667 0 0 1-60.330666 60.330666l-170.666667-170.666666a42.666667 42.666667 0 0 1 0-60.330667l170.666667-170.666667a42.666667 42.666667 0 0 1 60.330666 0z"
              fill="#0D0D0D" p-id="6418"></path>
        </svg>
        <text v-if="defaultPlayer">切换播放器（dplayer）</text>
        <text v-else>切换播放器（libmedia）</text>
      </view>
    </view>
    <view v-if="videoSource" class="padding-20rpx padding-no-bottom color-grey source-url">
      视频地址：{{ videoSource.url }}
    </view>

    <AppFooter />
  </view>
</template>

<script>
import {QrcodeCapture, QrcodeDropZone, QrcodeStream} from 'vue-qrcode-reader'
import DPlayer from 'dplayer';
import Hls from 'hls.js';
import AppHeader from "@/pages/common/AppHeader.vue";
import AppFooter from "@/pages/common/AppFooter.vue";
import {httpRequest} from "@/common/api";
import {getStorageSync, navigateToUrl, secondsToHuman, showToast} from "@/common/utils";
import {libmediaAvpUrl} from "@/config";
import {
  CONTROL_BACK,
  CONTROL_FORWARD,
  CONTROL_FULLSCREEN,
  CONTROL_INFO,
  CONTROL_MUTE,
  CONTROL_PAUSE,
  CONTROL_PLAY,
  CONTROL_QRCODE,
  CONTROL_VOLUME,
  KEY_FINGERPRINT,
  KEY_ROOM_ID
} from "@/common/constant";

export default {
  data() {
    return {
      qrCodeUrl: null,
      clientId: null,
      dplayer: {
        player: null,
        hls: null,
        hide: true,
      },
      options: null,
      videoSource: null,
      defaultPlayer: true,
      libmediaAvpConfig: '',
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

    if (getStorageSync(KEY_FINGERPRINT) === getStorageSync(KEY_ROOM_ID)) {
      // 防止消息发送给自己，
      this.registerControlEventHandler()
    }

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
    onClickChangePlayer() {
      this.defaultPlayer = !this.defaultPlayer
      if (this.defaultPlayer) {
        this.playVideo(this.videoSource)
      } else {
        const config = btoa(JSON.stringify({ url: this.videoSource.url, _t: Date.now() }))
        this.libmediaAvpConfig = `${libmediaAvpUrl}?config=${config}`
      }
    },
    registerControlEventHandler() {
      uni.$off('onControlEvent')
      uni.$on('onControlEvent', (data) => {
        if (!this.dplayer.player) {
          showToast('播放器没有执行')
          return
        }
        switch (data.event) {
          case CONTROL_MUTE:
            this.dplayer.player.volume(0, true, false)
            break;
          case CONTROL_FULLSCREEN:
            this.dplayer.player.fullScreen.request('web');
            break;
          case CONTROL_QRCODE:
            showToast('需要显示二维码')
            break;
          case CONTROL_INFO:
            console.log('[player]', this.dplayer.player)
            console.log('[videoSource]', this.dplayer.player.videoSource)
            console.log('[video]', this.dplayer.player.video)
            const showTime = 1000 * 30;

            if (this.dplayer.player.videoSource) {
              this.dplayer.player.notice('上次进度：' + this.dplayer.player.videoSource.url, showTime);
            }
            if (this.dplayer.player.video) {
              this.dplayer.player.notice('当前进度：' + secondsToHuman(this.dplayer.player.video.currentTime), showTime);
              this.dplayer.player.notice('视频时长：' + secondsToHuman(this.dplayer.player.video.duration), showTime);
            }
            if (this.videoSource) {
              this.dplayer.player.notice('视频名称：' + this.videoSource.name, showTime);
              this.dplayer.player.notice('视频地址：' + this.videoSource.url, showTime);
            }
            break;
          case CONTROL_VOLUME:
            if (data.value <= 0) {
              const newVol = (document.querySelector(".dplayer-video").volume * 100 - 3) / 100;
              this.dplayer.player.volume(newVol, true, false);
            }
            if (data.value > 0) {
              const newVol = (document.querySelector(".dplayer-video").volume * 100 + 3) / 100;
              this.dplayer.player.volume(newVol, true, false);
            }
            break;
          case CONTROL_BACK:
            this.dplayer.player.video.currentTime = this.dplayer.player.video.currentTime - 10;
            break;
          case CONTROL_PLAY:
            this.dplayer.player.video.play();
            break;
          case CONTROL_PAUSE:
            this.dplayer.player.video.pause();
            break;
          case CONTROL_FORWARD:
            this.dplayer.player.video.currentTime = this.dplayer.player.video.currentTime + 10;
            break;
        }
      })
    },

  }
}
</script>

<style scoped>

.dplayer {
  width: 100%;
}

@media screen and (min-width: 900px) {
  iframe {
    min-height: 560px !important;
  }
}

.iframe {
  border: 0;
  width: 100%;
  min-height: 200px;
}

/* 针对IE和Edge */
iframe {
  -ms-overflow-style: none; /* IE 10+ */
}

/* 针对Firefox */
iframe {
  scrollbar-width: none; /* Firefox 64 */
}

/* 针对Chrome, Safari 和 Opera */
iframe::-webkit-scrollbar {
  display: none;
}

.source-url {
  word-wrap: break-word;
  font-size: 14px;
}

</style>
