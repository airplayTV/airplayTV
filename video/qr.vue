<template>
  <view class="container">
    <AppHeader/>


    <view v-if="fromTV">
      <view class="flex-column flex-justify-center flex-align-center">
        <image style="height: 300rpx;width: 300rpx;" :src="qrCodeUrl"></image>
        <view class="text-area">
          <view>扫码投射</view>
          <view>房间号：{{ fingerprintId }}</view>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="padding-30rpx"></view>

      <view class="flex-column flex-justify-center flex-align-center">
        <image style="height: 600rpx;width: 600rpx;" :src="qrCodeUrl"></image>
        <view class="text-area">
          <view>扫码投射</view>
          <view>房间号：{{ fingerprintId }}</view>
        </view>
      </view>
    </view>


    <AppFooter/>

  </view>
</template>

<script>
import {send} from '@/common/websocket'
import QRCode from "qrcode";
import {KEY_CLIENT_ID, KEY_FINGERPRINT} from "@/common/constant";
import {joinRoomUrl} from "@/config";
import AppHeader from "@/pages/common/AppHeader.vue";
import AppFooter from "@/pages/common/AppFooter.vue";

export default {
  components: { AppFooter, AppHeader },
  data() {
    return {
      title: 'Hello QR',
      qrCodeUrl: null,
      clientId: null,
      fingerprintId: null,
      fromTV: false,
    }
  },
  onLoad(options) {
    if (options['_from'] === 'tv') {
      this.fromTV = true
    }

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
      // const tmpUrl = `${joinRoomUrl}/#/group/join?room=${this.fingerprintId}&ttt=uuu&t=` + Date.now()
      const tmpUrl = `${joinRoomUrl}?room=${this.fingerprintId}&t=` + Date.now()
      console.log('[tmpUrl]', tmpUrl)
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
  height: 100vh;
}

.qr {
  height: 600rpx;
  width: 600rpx;
}

.text-area {
  font-size: 14px;
  color: #8f8f94;
  line-height: 150%;
  text-align: center;
}

</style>
