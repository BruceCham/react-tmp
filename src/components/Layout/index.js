import { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { isIos } from 'common/service/util'
import styles from './style.styl'

const cx = classNames.bind(styles)
class Layout extends Component {
  static propTypes = {
    layoutClick: PropTypes.func,
  }

  static defaultProps = {
    layoutClick: () => {},
  }

  componentDidMount() {
    if (this.props.scrollStatus === 'stop') {
      this.domOverflow = document.documentElement.style.overflow
      this.bodyOverflow = document.body.style.overflow
      this.bodyPosition = document.body.style.position
      if (isIos()) {
        document.body.style.position = 'fixed'
      } else {
        document.documentElement.style.overflow = 'hidden'
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.stopEvent, false)
    }
  }

  componentWillUnmount() {
    if (this.props.scrollStatus === 'stop') {
      if (isIos()) {
        document.body.style.position = this.bodyPosition
      } else {
        document.documentElement.style.overflow = this.domOverflow
      }
      document.body.style.overflow = this.bodyOverflow
      document.removeEventListener('touchmove', this.stopEvent, false)
      delete this.domOverflow
      delete this.bodyOverflow
      delete this.bodyPosition
    }
  }

  stopEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  render() {
    return (
      <div className={cx('layoutUi')} onClick={this.props.layoutClick}>
        <div className={cx('layoutUi-shade')} />
        <div className={cx('layoutUi-main')}>
        {
          this.props.children
        }
        </div>
      </div>
    )
  }
}
export default Layout
