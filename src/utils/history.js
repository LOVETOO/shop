// vue插件需要install函数，然后Vue.use(xxx)安装

const History = {
  _history: JSON.parse(localStorage.getItem("iuiHistory")) || [], // 记录历史堆栈
  install(Vue) {
    // vue插件要求的安装方法
    // Object.defineProperty(obj, prop, desc)直接在一个对象上定义一个新属性，或者修改一个已经存在的属性，get\set
    Object.defineProperty(Vue.prototype, "$routerHistory", {
      get() {
        return History;
      }
    })
  },
  push(path) {
    // 入栈
    if (path=="/home" || path=="/cart" || path=="/mine") {
      localStorage.removeItem("iuiHistory")
      this._history = []
    }
    this._current += 1
    this._history.push(path)
    localStorage.setItem("iuiHistory",JSON.stringify(this._history))
  },
  pop() {
    // 出栈
    this._current -= 1
    // 删除数组最后一个元素并返回中这个元素的值
    let iuiHistoryPop = this._history.pop()
    localStorage.setItem("iuiHistory",JSON.stringify(this._history))
    return iuiHistoryPop
  },
  canBack() {
    return this._history.length > 1
  }
}

export default History