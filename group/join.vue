<template>
  <view class="container">

    <view>
      JOIN GROUP
    </view>

  </view>
</template>

<script>

import {navigateToUrl} from "@/common/utils";

export default {
  data() {
    return {}
  },
  onLoad(options) {
    console.log('[options]', options)
    if (!options.xxx){
      navigateToUrl('/group/join?xxx=ytryt&ttt=uuu')
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
