import React from 'react'
import Message from 'components/Message'
import classNames from 'classnames/bind'
import styles from './style.styl'

const cx = classNames.bind(styles)
class UpdatePage extends React.Component {
  constructor(props) {
    super(props)
    this.messageRef = null
  }

  componentDidMount() {
    this.messageRef.show({
      msg: '通知：7月1日晚10点至7月2日早5点将进行系统升级，升级期间产品将无法正常使用，敬请谅解~',
      btn: ['我知道了'],
      onConfirm: () => {},
      onCancel: () => {},
      visible: false,
      clickClose: false,
    })
  }

  render() {
    return (
      <div className={cx('wrapper')}>
        <Message ref={ref => this.messageRef = ref} />
      </div>
    )
  }
}

export default UpdatePage
