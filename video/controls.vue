<template>
  <view class="container">
    <AppHeader />

    <view class="empty-box color-grey">
      暂无数据
    </view>

    <AppFooter />
  </view>
</template>

<script>
import AppHeader from "@/pages/common/AppHeader.vue";
import AppFooter from "@/pages/common/AppFooter.vue";

export default {
  components: { AppFooter, AppHeader },
  data() {
    return {}
  },
  onLoad() {
  },
  methods: {}
}
</script>

<style scoped>


</style>
