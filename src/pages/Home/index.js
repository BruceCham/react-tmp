import React from 'react'
import classNames from 'classnames/bind'
import styles from './style.styl'

const cx = classNames.bind(styles)
const Home = () => {
  return (
    <div className={cx('wrapper')}>
      it works
    </div>
  )
}

export default Home
