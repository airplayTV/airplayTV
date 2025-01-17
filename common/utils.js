//

function getStorageSync(key) {
  return uni.getStorageSync(key)
}

function setStorageSync(key, data) {
  return uni.setStorageSync(key, data)
}

function removeStorageSync(key) {
  return uni.removeStorageSync(key)
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
  if (typeof title == 'object') {
    if (title.errMsg) {
      title = title.errMsg
    }
  }

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
      links: groupLinks[item] ? groupLinks[item] : [],
    }
  })

  return tmpGroups
}

function trimPrefixSlash(str) {
  return str.trim().replace(new RegExp(`^\/+`, 'g'), '');
}

function trimSuffixSlash(str) {
  return str.trim().replace(new RegExp(`\/+$`, 'g'), '');
}

function secondsToHuman(ts) {
  let h = Math.floor(ts / 3600);
  let m = Math.floor((ts - h * 3600) / 60);
  let s = Math.floor(ts - h * 3600 - m * 60);

  let txt = '';
  if (h > 0) {
    txt += h + '时';
  }
  if (m > 0) {
    txt += m + '分';
  } else if (h > 0) {
    txt += '0分';
  }
  txt += s + '秒';

  return txt;
}


export {
  getStorageSync,
  setStorageSync,
  removeStorageSync,
  navigateToUrl,
  showLoading,
  hideLoading,
  showToast,
  handleGroupLinks,
  trimPrefixSlash,
  trimSuffixSlash,
  secondsToHuman,
}
