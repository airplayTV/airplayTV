<template>
  <view class="content">
    <!--    <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>-->
    <web-view :webview-styles="webviewStyles" src="https://airplay-tv.pages.dev/#/"></web-view>
    <!-- https://airplay-tv.pages.dev/#/ -->
  </view>
</template>

<script>
import {send} from '@/common/websocket'
import QRCode from "qrcode";
import {KEY_CLIENT_ID, KEY_FINGERPRINT} from "@/common/constant";
import {qrUrl} from "@/config";

export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: '#FF3333'
        }
      }
    }
  },
  onLoad() {
    this.loadLocalStorage()
    this.qrCode()
  },
  methods: {
    onClickHandler() {
      console.log('[onClickHandler]')
      send({
        data: 'sdfsdf',
        success: (data) => {
          console.log('[send.success]', data)
        },
        fail: (error) => {
          console.log('[send.fail]', error)
        },
      })
    },
    qrCode() {
      const tmpUrl = `${qrUrl}?version=v2&client_id=${this.clientId}&t=` + Date.now()
      QRCode.toDataURL(tmpUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        width: 300
      }).then(url => {
        this.qrCodeUrl = url
      }).catch(err => {
        console.error(err)
      })
    },
    loadLocalStorage() {
      this.clientId = uni.getStorageSync(KEY_CLIENT_ID)
      this.fingerprintId = uni.getStorageSync(KEY_FINGERPRINT)
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr {
  height: 600rpx;
  width: 600rpx;
  margin-top: 150rpx;
  margin-bottom: 50rpx;
}


.text-area {
  font-size: 36rpx;
  color: #8f8f94;
  line-height: 150%;
}

</style>
