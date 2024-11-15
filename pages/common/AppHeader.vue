<template>
  <view class="flex-row flex-justify-between padding-30rpx padding-no-bottom flex-align-center">
    <view class="flex-row flex-align-center flex-justify-center">
      <b @click="navigateToUrl('/video/list')">AirplayTV</b>
      <view class="nav-link">
        <text class="href href-index" @click="navigateToUrl('/video/list')">首页</text>

        <text v-if="roomId" class="href" @click="navigateToUrl('/video/controls')">遥控</text>
        <text v-else class="href" @click="navigateToUrl('/video/qr')">投射</text>

        <text class="href" @click="navigateToUrl('/video/setting')">设置</text>
      </view>
    </view>
    <view class="flex-row flex-align-center">
      <view style="width: 200rpx">
        <uni-data-select
            :disabled="!showProvider"
            v-model="selectedProvider"
            :localdata="providerList"
            :clear="false"
            @change="onProviderChange"
        ></uni-data-select>
      </view>
      <view style="margin-left: 20rpx;" @click="onSearchToggle">
        <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5776">
          <path
              d="M992.262 871.396 749.71 665.102c-25.074-22.566-51.89-32.926-73.552-31.926C733.414 566.108 768 479.098 768 384 768 171.922 596.078 0 384 0 171.924 0 0 171.922 0 384c0 212.078 171.922 384 384 384 95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356S1031.508 906.718 992.262 871.396zM384 640c-141.384 0-256-114.616-256-256S242.616 128 384 128s256 114.616 256 256S525.386 640 384 640z"
              fill="#000000" p-id="5777"></path>
        </svg>
      </view>

    </view>
  </view>
</template>

<script>
import {getStorageSync, navigateToUrl, setStorageSync} from "@/common/utils";
import {
  KEY_ROOM_ID,
  KEY_VIDEO_PROVIDERS,
  KEY_VIDEO_SOURCE,
  KEY_VIDEO_SOURCE_TAGS,
  KEY_VIDEO_TAG
} from "@/common/constant";

export default {
  name: 'AppHeader',
  emits: ['onProviderChange', 'onSearchToggle'],
  props: {
    showProvider: Boolean,
  },
  data() {
    return {
      sourceTags: [],
      selectedProvider: null,
      providerList: [],
      roomId: getStorageSync(KEY_ROOM_ID),
    }
  },
  created() {
    this.sourceTags = getStorageSync(KEY_VIDEO_SOURCE_TAGS)
    this.selectedProvider = getStorageSync(KEY_VIDEO_SOURCE)
    this.providerList = getStorageSync(KEY_VIDEO_PROVIDERS).map(item => {
      return {
        value: item.name, text: item.name
      }
    })
  },
  methods: {
    navigateToUrl,
    onProviderChange(e) {
      const source = e
      // 更新配置
      setStorageSync(KEY_VIDEO_SOURCE, source)
      getStorageSync(KEY_VIDEO_PROVIDERS).filter(provider => {
        if (provider.name === source) {
          setStorageSync(KEY_VIDEO_SOURCE_TAGS, provider.tags)
          setStorageSync(KEY_VIDEO_TAG, provider.tags[0].value)
        }
      })
      this.$emit('onProviderChange', source)
    },
    onSearchToggle() {
      this.$emit('onSearchToggle')
    },
  }
}
</script>

<style scoped>

.link {
  margin: 0 20rpx;
}

.nav-link {
  margin-left: 15rpx;

  .href {
    padding: 0 15rpx;
  }

}

/deep/ .uni-select {
  border: unset;
  border-bottom: solid 1px #e5e5e5;
}

@media screen and (max-width: 420px) {
  .href-index {
    display: none;
  }
}

</style>
