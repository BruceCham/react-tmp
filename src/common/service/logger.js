// 用法用量：
// 添加host，devlog.com到指定日志收集服务器
// 开启debug
// 在 日志收集服务器上看access_log
const log = (msg) => {
  if (typeof window.__DEBUG__ !== 'undefined' && window.__DEBUG__) {
    const tmsg = typeof msg === 'string' ? msg : JSON.stringify(msg)
    let img = document.createElement('img')
    img.src = `//devlog.com/a.png?msg=${tmsg}`
  }
}

export default {
  log,
}
