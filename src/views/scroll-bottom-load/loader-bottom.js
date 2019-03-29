export default class {
  constructor (el) {
    this.el = el
    // this.pel = el.parentElement
    this.minHeight = 36
    // this.bodyHeight = 0
    // this.windowHeight = 0
  }
  test () {
    let el = this.el
    if (el.scrollHeight - el.clientHeight - el.scrollTop < this.minHeight) {
      return true
    }
  }
  listener (fn) {
    console.log(123)
    this.el.addEventListener('scroll', fn)
  }
  removeListener (fn) {
    this.el.removeEventListener('scroll', fn)
  }
  // update () {
  //   this.bodyHeight = document.body.clientHeight
  //   this.windowHeight = window.innerHeight
  // }
}
