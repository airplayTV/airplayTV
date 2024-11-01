<template>
  <view class="flex-column padding-30rpx flex-align-center footer color-grey">

    <view>
      <text class="href" @click="navigateToUrl('https://github.com/airplayTV')">本站</text>
      <text>仅作学习案例展示，切勿用作任何其他用途！</text>
    </view>
    <view>
      本站资源均来源网络，侵权即删！
    </view>

  </view>
</template>

<script>

import {navigateToUrl} from "@/common/utils";

export default {
  name: 'AppFooter',
  data() {
    return {}
  },
  created() {
  },
  methods: { navigateToUrl }
}
</script>

<style scoped>
.footer {
  line-height: 150%;
  font-size: 14px;

  .href {
    color: #8f8f8f;
    text-decoration: underline;
  }
}
</style>
