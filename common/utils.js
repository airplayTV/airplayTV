//

function getStorageSync(key) {
  return uni.getStorageSync(key)
}

function setStorageSync(key, data) {
  return uni.setStorageSync(key, data)
}

export {
  getStorageSync,
  setStorageSync,
}
