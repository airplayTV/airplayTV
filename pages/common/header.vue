<template>
  <view class="flex-row flex-justify-between padding-30rpx padding-no-bottom flex-align-center">
    <view class="flex-row">
      <b style="">App<!--AirplayTV--></b>
      <view class="nav-link">
        <text class="href">Home</text>
        <text class="href">Control</text>
        <text class="href">Setting</text>
      </view>
    </view>
    <view>
      <view style="width: 200rpx">
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
import {getStorageSync, setStorageSync} from "@/common/utils";
import {KEY_VIDEO_PROVIDERS, KEY_VIDEO_SOURCE, KEY_VIDEO_SOURCE_TAGS, KEY_VIDEO_TAG} from "@/common/constant";

export default {
  emits: ['onProviderChange'],
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
  margin-left: 20rpx;

  .href {
    padding: 0 10rpx;
  }

}
</style>
