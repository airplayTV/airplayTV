<template>
  <view class="flex-row flex-justify-between padding-30rpx padding-no-bottom flex-align-center">
    <view class="flex-row flex-align-center">
      <b @click="navigateToUrl('/video/list')">AirplayTV</b>
      <view class="nav-link">
        <text class="href" @click="navigateToUrl('/video/list')">首页</text>
        <text class="href" @click="navigateToUrl('/video/controls')">遥控</text>
        <text class="href">设置</text>
      </view>
    </view>
    <view>
      <view v-if="showProvider" style="width: 200rpx">
        <uni-data-select
            v-model="selectedProvider"
            :localdata="providerList"
            :clear="false"
            @change="onProviderChange"
        ></uni-data-select>
      </view>
    </view>
  </view>
</template>

<script>
import {getStorageSync, navigateToUrl, setStorageSync} from "@/common/utils";
import {KEY_VIDEO_PROVIDERS, KEY_VIDEO_SOURCE, KEY_VIDEO_SOURCE_TAGS, KEY_VIDEO_TAG} from "@/common/constant";

export default {
  name: 'AppHeader',
  emits: ['onProviderChange'],
  props: {
    showProvider: Boolean,
  },
  data() {
    return {
      sourceTags: [],
      selectedProvider: null,
      providerList: [],
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
  }
}
</script>

<style scoped>

.link {
  margin: 0 20rpx;
}

.nav-link {
  margin-left: 10rpx;

  .href {
    padding: 0 10rpx;
  }

}
</style>
