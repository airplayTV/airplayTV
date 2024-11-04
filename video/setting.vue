<template>

  <view class="container">
    <AppHeader />

    <view class="empty-box color-grey">
      <view @click="openUrl('https://github.com/orgs/airplayTV/repositories?from=pages.dev')">
        https://github.com/airplayTV
      </view>
    </view>

    <AppFooter />
  </view>

</template>

<script>
import AppHeader from "@/pages/common/AppHeader.vue";
import AppFooter from "@/pages/common/AppFooter.vue";
import {navigateToUrl} from "@/common/utils";

export default {
  components: { AppFooter, AppHeader },
  data() {
    return {}
  },
  onLoad() {
  },
  methods: {
    navigateToUrl,
    openUrl(url) {
      window.open(url)
    },

  }
}
</script>

<style scoped>
</style>
