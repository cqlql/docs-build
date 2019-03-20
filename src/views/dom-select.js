
export default class DomSelect {
  select (curr) {
    let { pre } = this
    pre && pre.classList.remove('selected')
    curr.classList.add('selected')
    this.pre = curr
  }
}
