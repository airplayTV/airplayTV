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

function showToast(title, config = { duration: 3000, icon: 'none' }) {
  uni.showToast(Object.assign(config, { title: title }));
}


function handleGroupLinks(links) {
  let groupLinks = []
  let tmpGroups = []

  if (links && links.length > 0) {
    links.filter(item => {
      if (!tmpGroups.includes(item.group)) {
        tmpGroups.push(item.group)
      }
      if (!groupLinks[item.group]) {
        groupLinks[item.group] = []
      }
      groupLinks[item.group].push(item)
    })
  }

  tmpGroups = tmpGroups.map(item => {
    return {
      name: item,
      links: groupLinks[item] ?? [],
    }
  })

  return tmpGroups
}


export {
  getStorageSync,
  setStorageSync,
  navigateToUrl,
  showLoading,
  hideLoading,
  showToast,
  handleGroupLinks,
}
