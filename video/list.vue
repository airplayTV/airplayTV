<template>
  <view class="container">
    <AppHeader show-provider @on-provider-change="onProviderChange" @on-search-toggle="onSearchToggle"></AppHeader>

    <view v-show="showSearch"
          class="padding-30rpx padding-no-bottom flex-row flex-justify-between flex-align-center search">
      <input class="uni-input flex-1" v-model="keyword" focus placeholder="输入搜索内容" />
      <text class="btn" @click="onClickSearch">搜索</text>
    </view>

    <view class="padding-30rpx padding-no-bottom tags" v-if="sourceTags && sourceTags.length > 0 && !showSearch">
      <text v-for="(tag,idx) in sourceTags" :key="idx"
            class="href"
            :class="tag.value===videoTag?'selected':''"
            @click="onClickUpdateVideoTag(tag.value)">
        {{ tag.name }}
      </text>
    </view>

    <view class="padding-30rpx padding-no-bottom" v-if="videoList.total">
      <view class="flex-row videos">
        <view
            class="flex-column flex-align-center item"
            v-for="(video,idx) in videoList.list"
            :key="idx" @click="navigateToUrl(`/video/detail?id=${video.id}`)">
          <image class="thumb" :src="video.thumb" mode="aspectFill"></image>
          <!-- video.thumb -->
          <!-- defaultCover -->
          <view class="name text-ellipsis">{{ video.name }}</view>
        </view>
      </view>

      <view v-if="showSearch">
        <uni-pagination :total="videoList.total" :page-size="videoList.limit" @change="onChangeSearchPage" />
      </view>
      <view v-else>
        <uni-pagination :total="videoList.total" :page-size="videoList.limit" @change="onChangePage" />
      </view>

    </view>

    <view v-else class="padding-30rpx flex-column flex-align-center color-grey empty-box">
      <view class="padding-30rpx">暂无数据</view>
    </view>

    <AppFooter />

  </view>
</template>

<script>
import {httpRequest} from "@/common/api";
import {getStorageSync, navigateToUrl, setStorageSync, showToast} from "@/common/utils";
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
      videoTag: getStorageSync(KEY_VIDEO_TAG),
      showSearch: false,
      keyword: '',
    }
  },
  components: { AppHeader, AppFooter },
  onLoad() {


    this.resetSourceVideoTags()

    this.loadVideoList({
      page: this.page,
    })

  },
  methods: {
    navigateToUrl,
    resetSourceVideoTags() {
      this.sourceTags = getStorageSync(KEY_VIDEO_SOURCE_TAGS)
      this.selectedProvider = getStorageSync(KEY_VIDEO_SOURCE)
      this.providerList = getStorageSync(KEY_VIDEO_PROVIDERS).map(item => {
        return {
          value: item.name, text: item.name
        }
      })
    },
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
          showToast(error)
        },
      })
    },
    loadSearchList(query) {
      httpRequest({
        url: '/api/video/search',
        method: 'GET',
        data: Object.assign({
          keyword: this.keyword,
          page: this.page,
        }, query),
        success: (resp) => {
          this.videoList = resp.data
        },
        fail: (error) => {
          console.log('[httpRequest.error]', error)
          showToast(error)
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
    onChangeSearchPage(e) {
      console.log('[onChangeSearchPage]', e)
      this.page = e.current
      this.loadSearchList({
        page: this.page,
      })
    },
    onProviderChange(e) {
      console.log('[onProviderChange]@', e)
      this.resetSourceVideoTags()
      this.page = 1
      this.loadVideoList({
        page: this.page,
      })
    },
    onClickUpdateVideoTag(tag) {
      this.videoTag = tag
      setStorageSync(KEY_VIDEO_TAG, tag)

      this.page = 1
      this.loadVideoList({
        page: this.page,
      })
    },
    onSearchToggle() {
      this.showSearch = !this.showSearch

      if (!this.showSearch) {
        this.page = 1
        this.loadVideoList({
          page: this.page,
        })
      }
    },
    onClickSearch() {
      this.page = 1
      this.loadSearchList({
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
  line-height: 180%;
  color: #999999;

  .href {
    margin-right: 20rpx;
    white-space: nowrap;
    border-bottom: 1px solid #999999;
  }

  .selected {
    color: #4c4c4c;
    border-bottom: 1px solid #4c4c4c;
  }

  .href:first-child {
    //padding-left: 0;
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


@media screen and (min-width: 900px) {
  .search {
    margin: 10px 0;
  }
}

.search {
  .uni-input {
    padding: 10rpx 10rpx;
    margin-right: 30rpx;
    border-bottom: 1px solid #e5e5e5;
  }

  .btn {
    padding: 10rpx 30rpx;
    border-radius: 5px;
    background-color: #F0F0F0;
    color: #333333;
  }

}

</style>
