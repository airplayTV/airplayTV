import {websocketAddr} from "@/config";
import {navigateToUrl, setStorageSync} from "@/common/utils";
import {CONTROL_LOAD_VIDEO, KEY_CLIENT_ID} from "@/common/constant";

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
    console.log('[onClose.readyState]', socketHandler.readyState)
    uni.$emit('onWebsocketClose', result)
  })
  socketHandler.onError(function (result) {
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
      navigateToUrl(`/video/play?vid=${data.vid}&pid=${data.pid}&name=${encodeURIComponent(data.name)}&_t=${Date.now()}`)
      break;
  }
}


export {
  connect, send, close
}
