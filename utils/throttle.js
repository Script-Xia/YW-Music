export default function throttle(fn, interval, options = {
  leading: true,
  trailing: false
}) {
  const {
    leading,
    trailing,
    resultCallback
  } = options
  // 记录上一次 fn 函数的执行时间
  let startTime = 0
  let timer = null

  // 触发事件时真正执行的函数
  const _throttle = function (...args) {
    return new Promise(resolve => {
      // 记录当前事件触发时的时间
      const nowTime = new Date().getTime()

      // 判断第一次触发事件的时候是否直接执行处理函数
      if (!startTime && !leading) startTime = nowTime

      // 计算出还剩余多长时间需要去触发 fn 函数
      const remainTime = interval - (nowTime - startTime)

      // 当剩余时间小于等于0时，执行 fn 函数
      if (remainTime <= 0) {
        if (timer) clearTimeout(timer)

        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        // 保留 fn 函数被执行的时间
        startTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)

          startTime = !leading ? 0 : new Date().getTime()
          timer = null
        }, remainTime)
      }
    })
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    startTime = 0
    timer = null
  }

  return _throttle
}