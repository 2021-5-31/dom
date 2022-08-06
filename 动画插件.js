function Animation(options) {
  const defaultOptions = {
    duration: 16,
    total: 1000,
    beginValue: {},
    endValue: {}
  }
  this.options = Object.assign({}, defaultOptions, options)
  this.timer = null
  this.intervalNum = Math.ceil(this.options.total / this.options.duration) //动画执行次数
  this.currentNum = 0
  this.distance = {} //每个属性的总差值
  this.everyDistance = {} //每个属性 每次动画执行的差值
  for (let prop in this.options.beginValue) {
    this.distance[prop] = this.options.endValue[prop] - this.options.beginValue[prop]
    this.everyDistance[prop] = this.distance[prop] / this.intervalNum
  }
  this.currentValue = { ...this.options.beginValue } //每个属性当前动画执行的值
}
Animation.prototype.start = function () {
  if (this.timer || this.currentNum === this.intervalNum) {
    return
  }
  if (this.options.onStart && typeof this.options.onStart === 'function') {
    this.options.onStart.call(this)
  }
  this.timer = setInterval(() => {
    this.currentNum++
    for (let prop in this.currentValue) {
      if (this.currentNum === this.intervalNum) {
        this.currentValue[prop] = this.options.endValue[prop]
      } else {
        this.currentValue[prop] += this.everyDistance[prop]
      }
    }
    if (this.options.onMove && typeof this.options.onMove === 'function') {
      this.options.onMove.call(this)
    }
    if (this.currentNum === this.intervalNum) {
      this.stop()
    }
  }, this.options.duration)
}
Animation.prototype.stop = function () {
  clearInterval(this.timer)
  if (this.options.onStop && typeof this.options.onStop === 'function') {
    this.options.onStop.call(this)
  }
  this.timer = null
}