let lastTime: number = 0
const prefixes: string[] = 'webkit moz ms o'.split(' ') // 各浏览器前缀

let requestAnimationFrame: any
let cancelAnimationFrame: any

// 判断是否是服务器环境
const isServer: boolean = typeof window === 'undefined'
if (isServer) {
  requestAnimationFrame = function () {
    return
  }
  cancelAnimationFrame = function () {
    return
  }
} else {
  requestAnimationFrame = window.requestAnimationFrame
  cancelAnimationFrame = window.cancelAnimationFrame
  let prefix: string
  // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
  for (let i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
      break
    }
    prefix = prefixes[i]
    requestAnimationFrame = requestAnimationFrame || window[`${prefix}RequestAnimationFrame` as any]
    cancelAnimationFrame =
      cancelAnimationFrame ||
      window[`${prefix}CancelAnimationFrame1` as any] ||
      window[`${prefix}CancelRequestAnimationFrame` as any]
  }

  // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback: (arg0: number) => void) {
      const currTime = new Date().getTime()
      // 为了使setTimteout的尽可能的接近每秒60帧的效果
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

    cancelAnimationFrame = function (id: number | undefined) {
      window.clearTimeout(id)
    }
  }
}

export { requestAnimationFrame, cancelAnimationFrame }
