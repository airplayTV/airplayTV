<template>
  <view class="container">
    <AppHeader show-provider @on-provider-change="onProviderChange"></AppHeader>

    <view class="padding-30rpx tags hidden">
      <text v-for="(tag,idx) in sourceTags" :key="idx" class="href">
        {{ tag.name }}
      </text>
    </view>

    <view class="padding-30rpx padding-no-bottom" v-if="videoList.total">
      <view class="flex-row videos">
        <view
            class="flex-column flex-align-center item"
            v-for="(video,idx) in videoList.list"
            :key="idx" @click="navigateToUrl(`/video/detail?id=${video.id}`)">
          <image class="thumb" :src="defaultCover" mode="aspectFill"></image>
          <view class="name text-ellipsis">{{ video.name }}</view>
        </view>
      </view>

      <uni-pagination :total="videoList.total" :page-size="videoList.limit" @change="onChangePage" />

    </view>

    <view v-else class="padding-30rpx flex-column flex-align-center color-grey empty-box">
      <view class="padding-30rpx">暂无数据</view>
    </view>

    <AppFooter/>

  </view>
</template>

<script>
import {httpRequest} from "@/common/api";
import {getStorageSync, navigateToUrl} from "@/common/utils";
import {KEY_VIDEO_PROVIDERS, KEY_VIDEO_SOURCE, KEY_VIDEO_SOURCE_TAGS, KEY_VIDEO_TAG} from "@/common/constant";
import AppHeader from '@/pages/common/AppHeader.vue'
import AppFooter from '@/pages/common/AppFooter.vue'
import {defaultCover} from "@/config";

export default {
  data() {
    return {
      videoList: [],
      page: 1,
      sourceTags: [],
      providers: [],
      selectedProvider: null,
      providerList: [],
      defaultCover: defaultCover,
    }
  },
  components: { AppHeader, AppFooter },
  onLoad() {

    this.sourceTags = getStorageSync(KEY_VIDEO_SOURCE_TAGS)
    this.selectedProvider = getStorageSync(KEY_VIDEO_SOURCE)
    this.providerList = getStorageSync(KEY_VIDEO_PROVIDERS).map(item => {
      return {
        value: item.name, text: item.name
      }
    })

    this.loadVideoList({
      page: this.page,
    })

  },
  methods: {
    navigateToUrl,
    loadVideoList(query) {
      httpRequest({
        url: '/api/video/list',
        method: 'GET',
        data: Object.assign({
          tag: getStorageSync(KEY_VIDEO_TAG),
          page: this.page,
        }, query),
        success: (resp) => {
          this.videoList = resp.data
        },
        fail: (error) => {
          console.log('[httpRequest.error]', error)
        },
      })
    },
    onChangePage(e) {
      console.log('[onChangePage]', e)
      this.page = e.current
      this.loadVideoList({
        page: this.page,
      })
    },
    onProviderChange(e) {
      console.log('[onProviderChange]@', e)

      this.page = 1
      this.loadVideoList({
        page: this.page,
      })
    },
  }
}
</script>

<style scoped>


/deep/ .uni-select {
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

.tags {
  line-height: 150%;

  .href {
    padding: 0 10rpx;
  }

  .href:first-child {
    padding-left: 0;
  }
}

@media screen and (min-width: 900px) {
  .videos {
    .item {
      width: 20%;

      .thumb {
        width: 310rpx;
        height: 450rpx;
        border-radius: 10rpx;
      }

      .name {
        width: 310rpx;
        margin: 20rpx 0 50rpx;
      }
    }

    /deep/ .uni-pagination__num {
      flex: unset !important;
    }
  }
}

@media screen and (max-width: 900px) {
  .videos {
    .item {
      width: 50%;

      .thumb {
        width: 310rpx;
        height: 450rpx;
        border-radius: 10rpx;
      }

      .name {
        width: 310rpx;
        margin: 20rpx 0 30rpx;
      }
    }

    /deep/ .uni-pagination__num {
      flex: unset !important;
    }
  }
}


</style>
