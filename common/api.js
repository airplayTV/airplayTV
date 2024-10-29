const EventJoinGroup = 'joinGroup'
const EventSendToClient = 'sendToClient'
const EventLeaveGroup = 'leaveGroup'
const EventSendToGroup = 'sendToGroup'
const EventListGroupClient = 'listGroupClient'

import {send} from "@/common/websocket";

function joinGroup(groupName) {
  return send({
    data: JSON.stringify({ event: EventJoinGroup, data: groupName }),
  })
}

export {
  joinGroup
}
