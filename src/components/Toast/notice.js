import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './toast.styl'

const cx = classNames.bind(styles)
class Notice extends Component {
  render() {
    const icons = {
      info: 'icon-info-circle-fill',
      success: 'icon-check-circle-fill',
      warning: 'icon-warning-circle-fill',
      error: 'icon-close-circle-fill',
      loading: 'icon-loading',
    }
    const { type, content } = this.props
    return (
      <div className={cx('toast-notice', type)}>
        <svg className={cx('icon')} aria-hidden="true">
          <use xlinkHref={`#${icons[type]}`} />
        </svg>
        <span>{content}</span>
      </div>
    )
  }
}

export default Notice