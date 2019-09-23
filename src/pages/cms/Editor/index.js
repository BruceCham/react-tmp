import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Toast from 'components/Toast'
import { getJsonDataById, saveJsonData, addJsonData } from 'service/cms/editor'
import styles from './style.styl'

const cx = classNames.bind(styles)

export default class Editor extends React.Component {
  state = {
    showTextEditor: false,
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    this.jsonEditor = new window.JSONEditor(this.jsoneditorRef, {
      language: 'en',
      onChange: () => {
        try {
          const json = this.jsonEditor.get()
          this.textEditor.set(json)
        } catch (e) { }
      },
    })
    this.textEditor = new window.JSONEditor(this.texteditorRef, {
      mode: 'code',
      ace: window.ace,
      enableSort: false,
      enableTransform: false,
      language: 'en',
      onChange: () => {
        try {
          const json = this.textEditor.get()
          this.jsonEditor.set(json)
        } catch (e) { }
      },
    })
    if (id) {
      const res = await getJsonDataById(id)
      if (res.status === 200) {
        this.jsonEditor.set(res.data)
        this.textEditor.set(res.data)
      }
    }
  }

  componentWillUnmount() {
    this.jsonEditor.destroy()
    this.textEditor.destroy()
  }

  toggleTextEditorHandle = () => {
    const { showTextEditor } = this.state
    this.setState({
      showTextEditor: !showTextEditor,
    })
  }

  saveJsonHandle = async () => {
    const { id } = this.props.match.params
    const { history } = this.props
    const key = this.pswInputRef.value
    try {
      const json = this.textEditor.get()
      let httpFn = addJsonData
      if (id) httpFn = saveJsonData
      const res = await httpFn({
        id,
        key,
        json,
      })
      // 跳转
      if (res.status === 200) {
        history.push(`/cms/editor/${res.data.name}`)
      } else {
        Toast.error(res.message)
      }
    } catch (e) {
      Toast.error('json 数据格式有误')
    }
  }

  renderDesc = () => {
    const { id } = this.props.match.params
    return (
      <React.Fragment>
        <h1>Super Simple JSON CMS</h1>
        {
          id && <p className={cx('api-addr')}>接口地址：<a target="_blank" href={`http://cms.xueersibook.com/api/${id}`}>http://cms.xueersibook.com/api/{id}</a></p>
        }
        <p className={cx('desc')}>Online JSON editor for non-devs, automatically exposed through our speedy API. Perfect for your simple site/app when you need the client to make changes (but don't need a full-fledged CMS like wordpress, squarespace etc).</p>
      </React.Fragment>
    )
  }

  renderBtn = () => {
    const { showTextEditor } = this.state
    return (
      <React.Fragment>
        <div className={cx('btn-box')}>
          <button className={cx('btn', 'btn-success')} onClick={this.saveJsonHandle}>保存</button>
          <button className={cx('btn')} onClick={this.toggleTextEditorHandle}>{showTextEditor ? '收起' : '展开'}文本编辑器</button>
          <Link to={'/cms/editor'} className={cx('btn', 'btn-primary')}>新建</Link>
        </div>
        <div className={cx('pwd-box')}>口令：<input type="password" ref={ref => this.pswInputRef = ref} /></div>
      </React.Fragment>
    )
  }

  renderEditor = () => {
    const { showTextEditor } = this.state
    return (
      <React.Fragment>
        <div style={{ display: showTextEditor ? 'block' : 'none' }} className={cx('editor-box')} ref={ref => this.texteditorRef = ref}></div>
        <div className={cx('editor-box', 'json-editor-box')} ref={ref => this.jsoneditorRef = ref}></div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className={cx('page-add')}>
        {
          this.renderDesc()
        }
        {
          this.renderBtn()
        }
        {
          this.renderEditor()
        }
        <p className={cx('footer')}>Built by <a href="https://book.xueersibook.com">出版中心-CICP</a>. Using <a href="https://github.com/josdejong/jsoneditor">jsoneditor</a></p>
      </div>
    )
  }
}
