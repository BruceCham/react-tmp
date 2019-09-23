import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './style.styl'

const cx = classNames.bind(styles)

/**
 * @param {*} ref 需要backTop的dom节点，没有的话默认是html
 * @param {*} cb 触发backTop后的回调函数
 */
export function BackTopFn(ref, cb) {
  let dom = ref || document.querySelector('html')
  function step() {
    if (dom.scrollTop > 0) {
      dom.scrollTop -= 50
      window.requestAnimationFrame(step);
    }
  }
  if (dom.scrollTop) {
    window.requestAnimationFrame(step);
  }
  cb && cb()
}

/**
 * BackTop 组件
 * @param ref 需要backTop的dom节点
 * @param cb 触发backTop后的回调函数
 * @param className 想要扩展的class
 */
export default class BackTop extends React.Component {
  static propTypes = {
    ref: PropTypes.element,
    cb: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    ref: document.querySelector('html'),
    cb: () => {},
    className: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      BACKTOPSTATUS: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll = () => {
    const { ref } = this.props
    const { BACKTOPSTATUS } = this.state
    let dom = ref || document.querySelector('html')
    if (dom.scrollTop > 10) {
      this.setState({
        BACKTOPSTATUS: 1,
      })
    } else if (BACKTOPSTATUS !== 0) {
      this.setState({
        BACKTOPSTATUS: 2,
      })
    }
  }

  clickTotop = () => {
    const { ref, cb } = this.props
    BackTopFn(ref, cb)
  }

  render() {
    const { className } = this.props
    const { BACKTOPSTATUS } = this.state
    const statusClass = [
      '',
      cx('mescroll-fade-in'),
      cx('mescroll-fade-out'),
    ]
    return (
      <div className={`${cx('backtop')} ${className} ${statusClass[BACKTOPSTATUS]}`} onClick={this.clickTotop}/>
    )
  }
}
