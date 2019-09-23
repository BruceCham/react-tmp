import { Component } from 'react'
import classNames from 'classnames/bind'
import Layout from 'components/Layout'
import styles from './style.styl'

const cx = classNames.bind(styles)
class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'Hello World',
      btn: ['我知道了'],
      onConfirm: () => {},
      onCancel: () => {},
      visible: false,
      clickClose: false,
    }
  }

  cancelHandle = () => {
    const { onCancel } = this.state
    this.setState({
      visible: false,
    })
    onCancel && onCancel()
  }

  confirmHandler = () => {
    const { onConfirm } = this.state
    this.setState({
      visible: false,
    })
    onConfirm && onConfirm()
  }

  clickClose = () => {
    const { clickClose } = this.state
    if (clickClose) this.cancelHandle()
  }

  show = (options) => {
    const newState = Object.assign({}, this.state, options)
    this.setState({
      ...newState,
      visible: true,
    })
  }

  renderBtn = () => {
    const { btn } = this.state
    if (btn.length === 2) {
      return (
        <div className={cx('messageUi-btn')}>
          <div no="no" type={0} onClick={this.cancelHandle}>{btn[0]}</div>
          <div yes="yes" type={1} onClick={this.confirmHandler}>{btn[1]}</div>
        </div>
      )
    }
    return (
      <div className={cx('messageUi-btn')}>
        <div yes="yes" type={1} onClick={this.confirmHandler}>{btn[0]}</div>
      </div>
    )
  }

  render() {
    const { msg } = this.state
    const { visible } = this.state
    if (!visible) {
      return null
    }
    return (
      <Layout layoutClick={this.clickClose}>
        <div className={cx('messageUi', 'messageUi-scale')}>
          <div className={cx('messageUi-content')}>{msg}</div>
          {
            this.renderBtn()
          }
        </div>
      </Layout>
    )
  }
}
/**
 * 引入到页面中 <Message ref={ref => this.Message = ref} />
 * 需要弹出消息的地方执行
  this.Message.show({
    msg: 'Hello World!!!',
    btn: ['取消', '确认'],
    onConfirm: () => {},
    onCancel: () => {}
  })
  this.Message.show({
    msg: <div>Hello</div><div>World</div>,
    clickClose: true, // 点击蒙层可关闭
    btn: ['确认']
  })
 */
export default Message
