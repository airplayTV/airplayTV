<script>

import {
  KEY_CLIENT_ID,
  KEY_FINGERPRINT,
  KEY_ROOM_ID,
  KEY_VIDEO_PROVIDERS,
  KEY_VIDEO_SOURCE,
  KEY_VIDEO_SOURCE_TAGS,
  KEY_VIDEO_TAG,
} from "@/common/constant";
import {connect} from "@/common/websocket";
import {httpRequestAsync, joinGroup} from "@/common/api";
import * as FingerprintJS from "@fingerprintjs/fingerprintjs";
import {getStorageSync, removeStorageSync, setStorageSync} from "@/common/utils";

export default {
  onLaunch: function () {
    console.log('App Launch')
    this.generateFingerprint()

    // 连接websocket
    uni.$on('onWebsocketOpen', () => {
      console.log('[onWebsocketOpen]')
      joinGroup(getStorageSync(KEY_FINGERPRINT))
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

    this.loadOrUpdateSource()
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
      // 1、启动时删除本地指纹ID/房间ID
      // 2、重新生成指纹ID，关联到组（房间）
      // 3、扫码后关联到组（房间ID）
      removeStorageSync(KEY_CLIENT_ID)
      removeStorageSync(KEY_ROOM_ID)

      if (getStorageSync(KEY_FINGERPRINT)) {
        return
      }
      console.log('[generateFingerprint]')

      let fpPromise = FingerprintJS.load()
      fpPromise.then(fp => fp.get()).then(result => {
        setStorageSync(KEY_FINGERPRINT, result.visitorId)
      }).catch(err => {
        console.log('[Fingerprint.Error]', err)
      })
    },
    async loadOrUpdateSource() {
      const providers = await httpRequestAsync({
        url: '/api/video/provider',
        method: 'GET',
      })
      if (!providers.data) {
        console.error('[获取源列表失败]', providers)
        return
      }
      setStorageSync(KEY_VIDEO_PROVIDERS, providers.data)

      let source = getStorageSync(KEY_VIDEO_SOURCE)
      if (!source) {
        source = providers.data[0].name
        setStorageSync(KEY_VIDEO_SOURCE, source)
      }

      let tag = getStorageSync(KEY_VIDEO_TAG)
      if (!tag) {
        tag = providers.data[0].tags[0].value
        setStorageSync(KEY_VIDEO_TAG, tag)
      }

      let sourceTags = getStorageSync(KEY_VIDEO_SOURCE_TAGS)
      if (!sourceTags) {
        providers.data.filter(provider => {
          if (source && provider.name === source) {
            if (provider.tags) {
              sourceTags = provider.tags
              setStorageSync(KEY_VIDEO_SOURCE_TAGS, sourceTags)
            }
          }
        })
      }

      console.log('[defaultConfig]', { source, tag, sourceTags })
    }

  },
}
</script>

<style>
/*每个页面公共css */
</style>
