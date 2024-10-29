<script>

import {KEY_FINGERPRINT} from "@/common/constant";
import {connect} from "@/common/websocket";
import {joinGroup} from "@/common/api";
import * as FingerprintJS from "@fingerprintjs/fingerprintjs";

export default {
  onLaunch: function () {
    console.log('App Launch')
    this.generateFingerprint()

    // 连接websocket
    uni.$on('onWebsocketOpen', () => {
      console.log('[onWebsocketOpen]')
      joinGroup(uni.getStorageSync(KEY_FINGERPRINT))
    })
    uni.$on('onWebsocketClose', () => {
      console.log('[onWebsocketClose]')
      setTimeout(() => {
        connect()
      }, 3000)
    })
    uni.$on('onWebsocketError', () => {
      console.log('[onWebsocketError]')
      setTimeout(() => {
        connect()
      }, 3000)
    })

    connect()

  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    retryConnectWebsocket(retryTimeout = 0) {
      const delay = 3000
      connect()
    },
    generateFingerprint() {
      if (uni.getStorageSync(KEY_FINGERPRINT)) {
        return
      }
      console.log('[generateFingerprint]')

      let fpPromise = FingerprintJS.load()
      fpPromise.then(fp => fp.get()).then(result => {
        uni.setStorageSync(KEY_FINGERPRINT, result.visitorId)
      }).catch(err => {
        console.log('[Fingerprint.Error]', err)
      })
    },

  },
}
</script>

<style>
/*每个页面公共css */
</style>
