import {websocketAddr} from "@/config";

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
      uni.$emit('onWebsocketMessage', data)
      console.log('[onWebsocketMessage]', data)


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
  switch (event) {
    case 'event1':
      break;
    case 'event2':
      break;
    case 'event3':
      break;
  }
}


export {
  connect, send, close
}
