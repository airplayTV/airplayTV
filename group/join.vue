<template>
  <view class="container">

    <view>
      JOIN GROUP
    </view>

    <view v-if="!room" class="empty-box color-grey">
      加入房间失败
    </view>

  </view>
</template>

<script>

import {setStorageSync} from "@/common/utils";
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
  },
  methods: {}
}
</script>

<style scoped>
</style>
