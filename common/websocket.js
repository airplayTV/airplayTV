import {websocketAddr} from "@/config";
import {navigateToUrl, setStorageSync} from "@/common/utils";
import {
  CONTROL_BACK,
  CONTROL_FORWARD,
  CONTROL_FULLSCREEN,
  CONTROL_INFO,
  CONTROL_LOAD_VIDEO,
  CONTROL_MUTE,
  CONTROL_PAUSE,
  CONTROL_PLAY,
  CONTROL_QRCODE,
  CONTROL_VOLUME,
  KEY_VIDEO_SOURCE,
  KEY_CLIENT_ID
} from "@/common/constant";

let isConnecting = false
let socketHandler = null

function connect() {
  if (isConnecting) {
    console.log('[isConnecting...]')
    return
  }
  isConnecting = true

  if (socketHandler && socketHandler.readyState === socketHandler.OPEN) {
    return
  }

  socketHandler = uni.connectSocket({
    url: websocketAddr,
    complete: () => {
    }
  })
  socketHandler.onOpen(function (result) {
    uni.$emit('onWebsocketOpen', result)
  })
  socketHandler.onClose(function (result) {
    isConnecting = false
    console.log('[onClose.readyState]', socketHandler.readyState)
    uni.$emit('onWebsocketClose', result)
  })
  socketHandler.onError(function (result) {
    isConnecting = false
    console.log('[onError.readyState]', socketHandler.readyState)
    uni.$emit('onWebsocketError', result)
  })
  socketHandler.onMessage(function (result) {
    try {
      const data = JSON.parse(result.data)
      handleWebsocketEvent(data.event, data)
      uni.$emit('onWebsocketMessage', data)
    } catch (e) {
      console.log('[onWebsocketMessageParseError]', { result, e })
    }
  })
}

function send(SendSocketMessageOptions) {
  if (socketHandler.readyState === socketHandler.CLOSED) {
    uni.$emit('onWebsocketClose')
    return false;
  }
  if (socketHandler.readyState !== socketHandler.OPEN) {
    return false;
  }
  socketHandler.send(SendSocketMessageOptions)

  return true;
}

function close() {

}

function handleWebsocketEvent(event, data) {
  console.log('[handleWebsocketEvent]', event, data)
  switch (event) {
    case 'connect':
      setStorageSync(KEY_CLIENT_ID, data.client_id)
      break;
    case CONTROL_LOAD_VIDEO:
      setStorageSync(KEY_VIDEO_SOURCE, data.source)
      navigateToUrl(`/video/play?airplay=1&vid=${data.vid}&pid=${data.pid}&_t=${Date.now()}&name=${encodeURIComponent(data.name)}`)
      break;
    case CONTROL_MUTE:
    case CONTROL_FULLSCREEN:
    case CONTROL_QRCODE:
    case CONTROL_INFO:
    case CONTROL_VOLUME:
    case CONTROL_BACK:
    case CONTROL_PLAY:
    case CONTROL_PAUSE:
    case CONTROL_FORWARD:
      uni.$emit('onControlEvent', data)
      break;
  }
}


export {
  connect, send, close
}
