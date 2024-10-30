<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>
      <text class="link" @click="goto('/pages/index/play')">Play</text>
      <text class="link" @click="goto('/pages/index/qr')">QR!</text>
    </view>

    <view>
      <view v-for="(video,idx) in videoList.list" :key="idx">
        <view>{{ video.name }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {httpRequest} from "@/common/api";
import {getStorageSync} from "@/common/utils";
import {KEY_VIDEO_TAG} from "@/common/constant";

export default {
  data() {
    return {
      title: 'Hello',
      videoList: [],
    }
  },
  onLoad() {
    this.loadVideoList()
  },
  methods: {
    goto(url) {
      uni.navigateTo({ url: url })
    },
    loadVideoList() {
      httpRequest({
        url: '/api/video/list',
        method: 'GET',
        data: {
          tag: getStorageSync(KEY_VIDEO_TAG),
          page: 1,
        },
        success: (resp) => {
          this.videoList = resp.data
        },
        fail: (error) => {
          console.log('[httpRequest.error]', error)
        },
      })
    },
    loadTagList() {
      //
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

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.link {
  margin: 0 20rpx;
}
</style>
