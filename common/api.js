import {apiUrl} from "@/config";
import {send} from "@/common/websocket";
import {KEY_VIDEO_SOURCE} from "@/common/constant";
import {getStorageSync, hideLoading, showLoading} from "@/common/utils";

const EventJoinGroup = 'joinGroup'
const EventSendToClient = 'sendToClient'
const EventLeaveGroup = 'leaveGroup'
const EventSendToGroup = 'sendToGroup'
const EventListGroupClient = 'listGroupClient'


function joinGroup(groupName) {
  return send({
    data: JSON.stringify({ group: groupName, event: EventJoinGroup, data: null }),
  })
}

function sendToGroup(data) {
  return send({
    data: JSON.stringify({ group: data.group, event: EventSendToGroup, data: data, }),
  })
}

function isFunction(v) {
  return typeof v == 'function';
}

function httpRequest(obj) {
  if (!obj.url) {
    console.error('[httpRequest] 参数错误')
    return
  }
  obj.url = `${apiUrl}${obj.url}`
  if (!obj.data) {
    obj.data = {}
  }

  showLoading()

  obj.data._source = getStorageSync(KEY_VIDEO_SOURCE)
  uni.request({
    url: obj.url,
    data: obj.data,
    header: obj.header,
    method: obj.method,
    timeout: obj.timeout,
    dataType: obj.dataType,
    responseType: obj.responseType,
    sslVerify: obj.sslVerify,
    withCredentials: obj.withCredentials,
    success: function (resp) {
      if (resp.statusCode !== 200) {
        if (isFunction(obj.fail)) {
          obj.fail(resp.data ? resp.data : resp.errMsg)
        }
        return
      }
      if (resp.data.code !== 200) {
        if (isFunction(obj.fail)) {
          obj.fail(resp.data.msg)
        }
        return
      }
      if (isFunction(obj.success)) {
        obj.success(resp.data)
      }
    },
    fail: obj.fail,
    complete: () => {
      hideLoading()

      if (isFunction(obj.complete)) {
        obj.complete()
      }
    },
  })
}

function httpRequestAsync(obj) {
  return new Promise((resolve, reject) => {
    obj.success = (resp) => {
      resolve(resp)
    }
    obj.fail = (error) => {
      resolve({ msg: error })
    }
    httpRequest(obj)
  })
}

async function httpRequestSync(obj) {
  return await httpRequestAsync(obj)
}

export {
  joinGroup,
  sendToGroup,
  httpRequest,
  httpRequestAsync,
  httpRequestSync,
}
