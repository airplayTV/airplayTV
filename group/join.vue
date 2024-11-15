<template>
  <view class="container">

    <view v-if="!room" class="empty-box color-grey">
      加入房间失败
    </view>

  </view>
</template>

<script>

import {navigateToUrl, setStorageSync} from "@/common/utils";
import {KEY_ROOM_ID} from "@/common/constant";
import {joinGroup} from "@/common/api";

export default {
  data() {
    return {
      room: null,
    }
  },
  onLoad(options) {
    console.log('[options]', options)
    this.room = options.room
    setStorageSync(KEY_ROOM_ID, this.room)
    joinGroup(this.room)
    navigateToUrl(`/video/controls?from=join-room-ok&room=${this.room}`)
  },
  methods: {}
}
</script>

<style scoped>
</style>
