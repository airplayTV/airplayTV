<template>
  <view class="content">
    <image class="qr" :src="qrCodeUrl"></image>
    <view class="text-area">
      <view>房间号：{{ fingerprintId }}</view>
    </view>

  </view>
</template>

<script>
import {send} from '@/common/websocket'
import QRCode from "qrcode";
import {KEY_CLIENT_ID, KEY_FINGERPRINT} from "@/common/constant";
import {joinRoomUrl} from "@/config";

export default {
  data() {
    return {
      title: 'Hello QR',
      qrCodeUrl: null,
      clientId: null,
      fingerprintId: null,
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
      const tmpUrl = `${joinRoomUrl}?room_id=${this.fingerprintId}&t=` + Date.now()
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
