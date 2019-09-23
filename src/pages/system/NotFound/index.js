import React from 'react'
import classNames from 'classnames/bind'
import Toast from 'components/Toast'
import styles from './style.styl'

const cx = classNames.bind(styles)
const clickEvent = () => {
  Toast.info('event')
}
const Page404 = () => {
  return (
    <div className={cx('wrapper')}>
      <p style={{ 'pointer-events': 'none' }} onClick={clickEvent}>404 Not Found</p>
    </div>
  )
}

export default Page404
