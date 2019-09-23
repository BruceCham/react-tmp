// https://github.com/rwu823/delegate-to
// date: 2017-05-15
function matches(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector)
    .call(el, selector)
}

function delegate(selector, dispatchEvent) {
  const isStr = typeof selector === 'string'
  return function callback(ev) {
    let { target } = ev
    if (target === ev.currentTarget) {
      return
    }
    while (isStr
      ? !matches(target, selector)
      : !selector(target)
    ) {
      target = target.parentNode

      if (target === ev.currentTarget) {
        return
      }
    }
    if (target) {
      dispatchEvent.bind(this)(ev, target)
    }
  }
}

module.exports = delegate
