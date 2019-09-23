import queryString from 'query-string'

export const isFirefox = () => {
  let useragent = navigator.userAgent.toLowerCase()
  return useragent.indexOf('firefox') > -1
}
export const isChrome = () => {
  let useragent = navigator.userAgent.toLowerCase()
  return useragent.indexOf('chrome') > -1
}
export const isMobile = () => {
  let useragent = navigator.userAgent.toLowerCase()
  return useragent.indexOf('mobile') > -1 || useragent.indexOf('android') > -1
}

export const isIos = () => /iPhone|iPad|iPod/i.test(navigator.userAgent)

export const isWeiXin = () => /MicroMessenger/i.test(navigator.userAgent)

export const isDevEnv = () => {
  const { hostname } = window.location
  return hostname.indexOf('dev') === 0 || hostname === 'localhost'
}

export const isTestEnv = () => {
  const { hostname } = window.location
  return hostname.indexOf('test') === 0
}

export const enableVConsole = () => {
  return new window.VConsole({
    onReady: () => {
      const times = 6
      const consoleDom = document.getElementById('__vconsole')
      consoleDom.style.display = 'none'
      let clickedTime = 0
      if (isIos()) {
        document.body.style.cursor = 'pointer'
      }
      document.body.addEventListener('click', () => {
        clickedTime += 1
        if (clickedTime === 1) {
          setTimeout(() => {
            clickedTime = 0
          }, 2000);
        } else if (clickedTime >= times) {
          consoleDom.style.display = 'block'
        }
      })
    },
  })
}

// 获取？后面的参数对象
export const getParams = () => queryString.parse(window.location.search)

export const numToNo = no => (no < 10 ? `0${no}` : `${no}`)

export const sleep = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}