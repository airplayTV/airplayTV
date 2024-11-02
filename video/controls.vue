<template>
  <view class="container">
    <AppHeader />

    <view class="padding-30rpx">

      <view class="padding-10rpx"></view>
      <view v-if="room" class="flex-row flex-justify-between flex-align-center color-grey">
        <view class="flex-row">
          <text>当前房间：</text>
          <text class="text-ellipsis" style="max-width: 300rpx;">{{ room }}</text>

        </view>
        <view class="room-quit flex-row flex-align-center" @click="onClickQuitRoom">
          退出&nbsp;
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2924">
            <path
                d="M832 16A176 176 0 0 1 1008 192a48 48 0 0 1-95.552 6.528L912 192a80 80 0 0 0-71.808-79.616L832 112H192a80 80 0 0 0-79.616 71.808L112 192v640c0 41.408 31.488 75.52 71.808 79.616L192 912h640a80 80 0 0 0 79.616-71.808L912 832a48 48 0 1 1 96 0 176 176 0 0 1-165.248 175.68L832 1008H192a176 176 0 0 1-175.68-165.248L16 832V192A176 176 0 0 1 181.248 16.32L192 16h640z m-67.84 280.256L967.68 499.84a48 48 0 0 1 0 67.84l-203.648 203.648a48 48 0 1 1-67.84-67.84L823.68 576H368a48 48 0 0 1 0-96h444.096l-115.84-115.84a48 48 0 1 1 67.84-67.904z"
                fill="#45454D" p-id="2925"></path>
          </svg>
        </view>
      </view>
      <view v-else class="color-grey">
        尚未加入任何房间，无法遥控操作
      </view>

      <view class="padding-30rpx controls">
        <view class="padding-20rpx"></view>

        <!-- 四个按钮 -->
        <view class="flex-row flex-justify-between">
          <!-- 静音 -->
          <view @click="sendControl({event:CONTROL_MUTE})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5668">
              <path
                  d="M534.4 842.154667c-11.221333 0-24.021333-4.821333-32-12.8L334.378667 674.133333H176.042667A47.146667 47.146667 0 0 1 128 626.133333v-236.8C128 362.112 148.778667 341.333333 176 341.333333h158.421333l167.978667-155.221333a46.506667 46.506667 0 0 1 51.2-7.978667c17.578667 7.978667 28.8 25.6 28.8 43.178667v572.8c0 19.2-11.221333 36.821333-28.8 43.221333-6.4 4.821333-12.8 4.821333-19.2 4.821334z m-310.4-262.4h128c12.8 0 24.021333 4.778667 32 12.8l100.821333 92.8V330.069333L384 422.912c-9.6 8.021333-20.821333 12.8-32 12.8h-128v144.042667zM900.821333 648.533333c-11.221333 0-24.021333-4.821333-32-12.8L678.4 445.312a45.397333 45.397333 0 0 1 0-64 45.397333 45.397333 0 0 1 64 0l190.421333 190.421333a45.397333 45.397333 0 0 1 0 64c-8.021333 7.978667-20.821333 12.8-32 12.8z"
                  fill="#172B4D" p-id="5669"></path>
              <path
                  d="M710.4 648.533333c-11.178667 0-24.021333-4.821333-32-12.8a45.397333 45.397333 0 0 1 0-64l190.421333-190.421333a45.397333 45.397333 0 0 1 64 0 45.397333 45.397333 0 0 1 0 64L744.021333 635.733333a51.626667 51.626667 0 0 1-33.621333 12.8z"
                  fill="#172B4D" p-id="5670"></path>
            </svg>
          </view>

          <!-- 全屏 -->
          <view v-if="isFullscreen" @click="sendControl({event:CONTROL_FULLSCREEN_EXIT})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5040">
              <path
                  d="M213.333333 682.666667h128v128h85.333334v-213.333334H213.333333v85.333334z m128-341.333334H213.333333v85.333334h213.333334V213.333333H341.333333v128z m256 469.333334h85.333334v-128h128v-85.333334h-213.333334v213.333334z m85.333334-469.333334V213.333333h-85.333334v213.333334h213.333334V341.333333h-128z"
                  fill="#000000" p-id="5041"></path>
            </svg>
          </view>
          <view v-else @click="sendControl({event:CONTROL_FULLSCREEN})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11590">
              <path
                  d="M170.666667 256h85.333333a42.666667 42.666667 0 0 0 0-85.333333H128l-4.992 0.298666A42.666667 42.666667 0 0 0 85.333333 213.333333v128a42.666667 42.666667 0 0 0 85.333334 0V256zM853.333333 256h-85.333333a42.666667 42.666667 0 1 1 0-85.333333h128l4.992 0.298666A42.666667 42.666667 0 0 1 938.666667 213.333333v128a42.666667 42.666667 0 1 1-85.333334 0V256zM298.666667 810.666667a42.666667 42.666667 0 0 0-42.666667-42.666667H170.666667v-85.333333a42.666667 42.666667 0 1 0-85.333334 0v128a42.666667 42.666667 0 0 0 37.674667 42.368L128 853.333333h128a42.666667 42.666667 0 0 0 42.666667-42.666666zM853.333333 768h-85.333333a42.666667 42.666667 0 1 0 0 85.333333h128l4.992-0.298666A42.666667 42.666667 0 0 0 938.666667 810.666667v-128a42.666667 42.666667 0 1 0-85.333334 0v85.333333z"
                  fill="#000000" p-id="11591"></path>
              <path
                  d="M256 341.333333m42.666667 0l426.666666 0q42.666667 0 42.666667 42.666667l0 256q0 42.666667-42.666667 42.666667l-426.666666 0q-42.666667 0-42.666667-42.666667l0-256q0-42.666667 42.666667-42.666667Z"
                  fill="#000000" p-id="11592"></path>
            </svg>
          </view>

          <!-- 二维码 -->
          <view @click="sendControl({event:CONTROL_QRCODE})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="31233">
              <path
                  d="M129 102h321c16.569 0 30 13.431 30 30v322c0 16.569-13.431 30-30 30H129c-16.569 0-30-13.431-30-30V132c0-16.569 13.431-30 30-30z m70.692 70.877c-16.569 0-30 13.432-30 30v180.246c0 16.568 13.431 30 30 30h179.616c16.569 0 30-13.432 30-30V202.877c0-16.568-13.431-30-30-30H199.692z m56.92 57.07h65.776c16.568 0 30 13.431 30 30v66.106c0 16.569-13.432 30-30 30h-65.776c-16.568 0-30-13.431-30-30v-66.106c0-16.569 13.432-30 30-30zM129 540h321c16.569 0 30 13.431 30 30v322c0 16.569-13.431 30-30 30H129c-16.569 0-30-13.431-30-30V570c0-16.569 13.431-30 30-30z m70.692 70.877c-16.569 0-30 13.432-30 30v180.246c0 16.568 13.431 30 30 30h179.616c16.569 0 30-13.432 30-30V640.877c0-16.568-13.431-30-30-30H199.692z m56.92 57.07h65.776c16.568 0 30 13.431 30 30v66.106c0 16.569-13.432 30-30 30h-65.776c-16.568 0-30-13.431-30-30v-66.106c0-16.569 13.432-30 30-30zM574 102h321c16.569 0 30 13.431 30 30v322c0 16.569-13.431 30-30 30H574c-16.569 0-30-13.431-30-30V132c0-16.569 13.431-30 30-30z m70.692 70.877c-16.569 0-30 13.432-30 30v180.246c0 16.568 13.431 30 30 30h179.616c16.569 0 30-13.432 30-30V202.877c0-16.568-13.431-30-30-30H644.692z m56.92 57.07h65.776c16.568 0 30 13.431 30 30v66.106c0 16.569-13.432 30-30 30h-65.776c-16.568 0-30-13.431-30-30v-66.106c0-16.569 13.432-30 30-30zM574 541h31q30 0 30 30v31q0 30-30 30h-31q-30 0-30-30v-31q0-30 30-30zM864 541h31q30 0 30 30v31q0 30-30 30h-31q-30 0-30-30v-31q0-30 30-30zM574 831h31q30 0 30 30v31q0 30-30 30h-31q-30 0-30-30v-31q0-30 30-30zM665 632h31q30 0 30 30v139q0 30-30 30h-31q-30 0-30-30V662q0-30 30-30zM864 723h31q30 0 30 30v139q0 30-30 30h-31q-30 0-30-30V753q0-30 30-30z"
                  fill="#2C2C2C" p-id="31234"></path>
              <path
                  d="M925 861v31c0 16.569-13.431 30-30 30H756c-16.569 0-30-13.431-30-30v-31c0-16.569 13.431-30 30-30h139c16.569 0 30 13.431 30 30z"
                  fill="#2C2C2C" p-id="31235"></path>
            </svg>
          </view>

          <!-- 信息 -->
          <view @click="sendControl({event:CONTROL_INFO})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4191">
              <path
                  d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-938.666667C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 682.666667a42.666667 42.666667 0 0 1-42.368-42.666667v-255.573333a42.368 42.368 0 1 1 84.693333 0V725.333333A42.410667 42.410667 0 0 1 512 768z m0-426.666667a42.325333 42.325333 0 1 1-0.085333-84.650666A42.325333 42.325333 0 0 1 512 341.333333z m42.325333-42.666666v0z"
                  fill="#101010" p-id="4192"></path>
            </svg>
          </view>
        </view>

        <view class="padding-30rpx"></view>
        <view class="padding-30rpx"></view>

        <!-- 声音小 -->
        <view class="flex-row flex-justify-center" @click="sendControl({event:CONTROL_VOLUME,value:-1})">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6000">
            <path
                d="M513.984 810.624a45.824 45.824 0 0 1-30.784-12.288l-161.92-149.568H168.768a45.44 45.44 0 0 1-46.208-46.208V374.4a45.44 45.44 0 0 1 46.208-46.208h152.64L483.2 178.688a44.8 44.8 0 0 1 49.28-7.68c16.96 7.68 27.776 24.576 27.776 41.6v551.808a43.712 43.712 0 0 1-27.776 41.6c-6.144 4.608-12.288 4.608-18.496 4.608zM215.04 557.824h123.328c12.288 0 23.104 4.672 30.784 12.352l97.152 89.408V317.376L369.088 406.784a48.96 48.96 0 0 1-30.784 12.352H214.976v138.688zM686.656 639.552c-4.608 0-9.28 0-13.888-1.536a46.848 46.848 0 0 1-30.848-58.56c18.56-58.56 15.424-121.792-7.68-177.28-9.28-23.104 1.536-50.88 24.64-60.16 23.168-9.216 50.88 1.6 60.16 24.704 32.384 75.52 35.456 161.92 10.752 240.448-4.608 20.096-23.104 32.384-43.136 32.384z"
                fill="#172B4D" p-id="6001"></path>
          </svg>
        </view>

        <view class="padding-30rpx"></view>
        <view class="padding-30rpx"></view>
        <view class="padding-30rpx"></view>

        <!-- 三个按钮 -->
        <view class="flex-row flex-justify-between">

          <!-- 后退 -->
          <view @click="sendControl({event:CONTROL_BACK})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5854">
              <path
                  d="M497.92 546.944l330.944 231.68A42.666667 42.666667 0 0 0 896 743.616V280.362667a42.666667 42.666667 0 0 0-67.136-34.944L497.941333 477.056a42.666667 42.666667 0 0 0 0 69.888z"
                  fill="#000000" p-id="5855"></path>
              <path
                  d="M81.92 546.944l330.944 231.68a42.666667 42.666667 0 0 0 67.136-34.986667V280.362667a42.666667 42.666667 0 0 0-67.136-34.944L81.941333 477.056a42.666667 42.666667 0 0 0 0 69.888z"
                  fill="#000000" p-id="5856"></path>
            </svg>
          </view>

          <!-- 播放/暂停 -->
          <view>

            <view v-if="isPlay" @click="sendControl({event:CONTROL_PAUSE})">
              <svg class="icon"
                   style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6935">
                <path
                    d="M341.333333 853.333333C170.666667 786.090667 170.666667 237.909333 341.333333 170.666667c170.666667-67.242667 512 170.666667 512 341.333333s-341.333333 408.576-512 341.333333z"
                    fill="#000000" p-id="6936"></path>
              </svg>
            </view>
            <view v-else @click="sendControl({event:CONTROL_PLAY})">
              <svg class="icon"
                   style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8206">
                <path
                    d="M298.666667 170.666667c-50.133333 0-93.781333 34.176-102.656 83.541333C184.192 319.829333 170.666667 415.914667 170.666667 512s13.525333 192.170667 25.344 257.792C204.885333 819.157333 248.490667 853.333333 298.666667 853.333333c50.133333 0 93.781333-34.176 102.656-83.541333 11.818667-65.621333 25.344-161.706667 25.344-257.792s-13.525333-192.170667-25.344-257.792C392.448 204.842667 348.842667 170.666667 298.666667 170.666667z m426.666666 0c-50.133333 0-93.781333 34.176-102.656 83.541333C610.858667 319.829333 597.333333 415.914667 597.333333 512s13.525333 192.170667 25.344 257.792C631.552 819.157333 675.157333 853.333333 725.333333 853.333333c50.133333 0 93.781333-34.176 102.656-83.541333 11.818667-65.621333 25.344-161.706667 25.344-257.792s-13.525333-192.170667-25.344-257.792C819.114667 204.842667 775.509333 170.666667 725.333333 170.666667z"
                    fill="#000000" p-id="8207"></path>
              </svg>
            </view>


          </view>

          <!-- 前进 -->
          <view @click="sendControl({event:CONTROL_FORWARD})">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                 viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6819">
              <path
                  d="M942.08 546.944l-330.944 231.68a42.666667 42.666667 0 0 1-67.136-34.986667V280.362667a42.666667 42.666667 0 0 1 67.136-34.944l330.922667 231.658666a42.666667 42.666667 0 0 1 0 69.888z"
                  fill="#000000" p-id="6820"></path>
              <path
                  d="M526.08 546.944L195.114667 778.624A42.666667 42.666667 0 0 1 128 743.616V280.362667a42.666667 42.666667 0 0 1 67.136-34.944l330.922667 231.658666a42.666667 42.666667 0 0 1 0 69.888z"
                  fill="#000000" p-id="6821"></path>
            </svg>
          </view>
        </view>

        <view class="padding-30rpx"></view>
        <view class="padding-30rpx"></view>
        <view class="padding-30rpx"></view>

        <!-- 声音大 -->
        <view class="flex-row flex-justify-center" @click="sendControl({event:CONTROL_VOLUME,value:1})">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6015">
            <path
                d="M511.808 810.688a45.568 45.568 0 0 1-30.656-12.288l-160.96-148.672h-151.68a45.184 45.184 0 0 1-46.08-46.016V376.832c0-26.048 19.968-45.952 46.08-45.952h151.68l160.96-148.736a44.544 44.544 0 0 1 49.088-7.68 46.72 46.72 0 0 1 27.584 41.408v548.8a43.52 43.52 0 0 1-27.584 41.408c-6.144 4.608-12.288 4.608-18.432 4.608zM214.464 559.296h122.624c12.288 0 23.04 4.608 30.656 12.224l96.576 88.96V320.128l-96.64 88.96a48.64 48.64 0 0 1-30.592 12.224H214.4v137.984zM683.52 640.512c-4.608 0-9.216 0-13.76-1.536a46.592 46.592 0 0 1-30.72-58.24 257.92 257.92 0 0 0-7.68-176.32c-9.152-23.04 1.6-50.56 24.576-59.776 23.04-9.216 50.56 1.536 59.776 24.512 32.192 75.136 35.264 160.96 10.752 239.168-4.608 19.904-23.04 32.192-42.88 32.192zM807.68 763.136a54.144 54.144 0 0 1-21.44-4.608 46.208 46.208 0 0 1-19.904-61.312 430.72 430.72 0 0 0-10.752-409.28c-12.288-21.44-6.144-50.56 16.832-62.848 21.504-12.288 50.56-6.144 62.848 16.832 88.96 151.808 95.104 341.888 13.824 498.24-7.68 13.76-24.512 23.04-41.408 23.04z"
                fill="#172B4D" p-id="6016"></path>
          </svg>
        </view>

      </view>
    </view>

    <view class="padding-30rpx"></view>

    <AppFooter />
  </view>
</template>

<script>
import AppHeader from "@/pages/common/AppHeader.vue";
import AppFooter from "@/pages/common/AppFooter.vue";
import {sendToGroup} from "@/common/api";
import {getStorageSync, navigateToUrl, removeStorageSync, showToast} from "@/common/utils";
import {
  CONTROL_BACK,
  CONTROL_FORWARD,
  CONTROL_FULLSCREEN,
  CONTROL_FULLSCREEN_EXIT,
  CONTROL_INFO,
  CONTROL_MUTE,
  CONTROL_PAUSE,
  CONTROL_PLAY,
  CONTROL_QRCODE,
  CONTROL_VOLUME,
  KEY_CLIENT_ID,
  KEY_ROOM_ID
} from "@/common/constant";

export default {
  components: { AppFooter, AppHeader },
  data() {
    return {
      room: null,
      clientId: null,
      isPlay: true,
      isFullscreen: false,

      CONTROL_MUTE: CONTROL_MUTE,
      CONTROL_FULLSCREEN: CONTROL_FULLSCREEN,
      CONTROL_FULLSCREEN_EXIT: CONTROL_FULLSCREEN_EXIT,
      CONTROL_QRCODE: CONTROL_QRCODE,
      CONTROL_INFO: CONTROL_INFO,
      CONTROL_VOLUME: CONTROL_VOLUME,
      CONTROL_BACK: CONTROL_BACK,
      CONTROL_PLAY: CONTROL_PLAY,
      CONTROL_PAUSE: CONTROL_PAUSE,
      CONTROL_FORWARD: CONTROL_FORWARD,
    }
  },
  onLoad() {
    this.room = getStorageSync(KEY_ROOM_ID)
    this.clientId = getStorageSync(KEY_CLIENT_ID)
  },
  methods: {
    sendControl(data) {
      if (!this.room) {
        showToast('未加入任何房间')
        return
      }
      switch (data.event) {
        case CONTROL_PAUSE:
          this.isPlay = false
          break;
        case CONTROL_PLAY:
          this.isPlay = true
          break;
        case CONTROL_FULLSCREEN:
          this.isFullscreen = true
          break
        case CONTROL_FULLSCREEN_EXIT:
          this.isFullscreen = false
          break
      }
      let post = {
        group: this.room,
        event: data.event,
        value: data.value,
        from: this.clientId,
      }
      if (!sendToGroup(post)) {
        showToast('发送失败：网络异常')
        return;
      }
      showToast('发送成功')
    },
    onClickQuitRoom() {
      removeStorageSync(KEY_ROOM_ID)
      navigateToUrl('/')
    },
  }
}
</script>

<style scoped>
.controls {
  .icon {
    font-size: 64rpx;
    color: #000000;
  }

  svg {
    color: #000000;
    fill: #000000;
  }
}

.room-quit {
//color: #ffffff; //background-color: #007aff; //border-radius: 8rpx; //padding: 6rpx 16rpx;
}

</style>
