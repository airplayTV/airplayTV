//

function getStorageSync(key) {
  return uni.getStorageSync(key)
}

function setStorageSync(key, data) {
  return uni.setStorageSync(key, data)
}

function navigateToUrl(url) {
  uni.navigateTo({ url: url })
}

function showLoading(title = '加载中...') {
  uni.showLoading({ title: title })
}

function hideLoading() {
  uni.hideLoading()
}

export {
  getStorageSync,
  setStorageSync,
  navigateToUrl,
  showLoading,
  hideLoading,
}
