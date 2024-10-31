<template>
  <view class="container">

    <AppHeader />

    <view v-if="videoInfo">
      <view class="padding-30rpx padding-no-bottom flex-column flex-align-center">
        <view class="padding-20rpx padding-no-bottom">
          <image class="thumb" :src="videoInfo.thumb" mode="aspectFill"></image>
          <!-- videoInfo.thumb -->
        </view>
      </view>
      <view class="padding-30rpx padding-no-bottom">
        <h1>{{ videoInfo.name }}</h1>
        <view class="padding-10rpx"></view>
        <view class="line-height-150 text-ellipsis-5">
          <b>简介：</b>
          {{ videoInfo.intro }}
        </view>
      </view>

      <view class="padding-30rpx group-links line-height-180">
        <view v-for="(item,idx) in groupLinks" :key="idx" class="group-link">
          <view class="name">{{ item.name }}</view>
          <view class="flex-row">
            <view v-for="(link,idxLink) in item.links"
                  :key="idxLink"
                  class="link"
                  @click="navigateToUrl(`/video/play?vid=${videoInfo.id}&pid=${link.id}&name=${encodeURIComponent(videoInfo.name)}`)">
              {{ link.name }}
            </view>
          </view>
        </view>
      </view>

    </view>
    <view v-else>
      <view class="empty-box color-grey">
        无视频数据
      </view>
    </view>

    <AppFooter />

  </view>
</template>

<script>
import {httpRequest} from "@/common/api";
import {handleGroupLinks, navigateToUrl} from "@/common/utils";
import {defaultCover} from "@/config";
import AppHeader from '@/pages/common/AppHeader.vue'
import AppFooter from '@/pages/common/AppFooter.vue'

export default {
  components: { AppHeader, AppFooter },
  data() {
    return {
      defaultCover: defaultCover,
      videoInfo: null,
      groupLinks: [],
    }
  },
  onLoad(options) {
    if (!options.id) {
      navigateToUrl('/video/list?from-detail-empty-id')
    }
    this.loadVideoInfo(options.id)
  },
  methods: {
    navigateToUrl,
    loadVideoInfo(id) {
      httpRequest({
        url: '/api/video/detail',
        method: 'GET',
        data: { id: id, },
        success: (resp) => {
          this.videoInfo = resp.data
          this.groupLinks = handleGroupLinks(this.videoInfo.links)
        },
      })
    },
  }
}
</script>

<style scoped>

.thumb {
  width: 496rpx;
  height: 720rpx;
  border-radius: 10rpx;

}

/**
      <view class="padding-30rpx group-links">
        <view v-for="(item,idx) in groupLinks" :key="idx">
          <view class="name">{{item.name}}</view>
          <view class="flex-row">
            <view v-for="(link,idxLink) in item.links" :key="idxLink" class="link">
              {{link.name}}
            </view>
          </view>
        </view>
      </view>
 */

.group-links {

  .group-link {
    padding-bottom: 20rpx;
  }

  .name {
    font-weight: bold;
  }

  .link {
    background-color: #0c81e8;
    color: #c8dde6;
    padding: 8rpx 16rpx;;
    border-radius: 5px;
    margin: 7px;
    text-align: center;
    font-size: 24rpx;
  }
}

</style>
