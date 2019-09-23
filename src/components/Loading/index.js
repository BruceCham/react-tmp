import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import styles from './style.styl'

const cx = classNames.bind(styles)
class Loading extends Layout {
  static propTypes = {
    msg: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    msg: 'Loading...',
    type: 'reading',
  }

  render() {
    const { msg, type } = this.props
    return (
      <Layout>
        {
          type === 'reading' && (
            <div className={cx('loadingUi')}>
              <div className={cx('yingwu')} />
              <p>{msg}</p>
            </div>
          )
        }
        {
          type === 'primary' && (
            <div className={cx('loadingUi')}>
              <i />
              <i className={cx('loadingUi-layerload')} />
              <i />
              <p>{msg}</p>
            </div>
          )
        }
      </Layout>
    )
  }
}

export default Loading
