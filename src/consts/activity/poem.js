import { createApiActionTypes } from 'actions'

export default createApiActionTypes({
  POEM_GET_QUESTIONS: 'activity/poem/GET_QUESTIONS',
  POEM_SUBMIT_ANSWER: 'activity/poem/SUBMIT_ANSWER',
  POEM_GET_USERINFO: 'activity/poem/GET_USERINFO',
  POEM_SET_USERINFO: 'activity/poem/SET_USERINFO',
  POEM_GET_SCHOOLS: 'activity/poem/GET_SCHOOLS',
  POEM_GET_WEIXIN_SIGNATURE: 'activity/poem/GET_WEIXIN_SIGNATURE',
  POEM_GET_STUDENT_RANKING: 'activity/poem/GET_STUDENT_RANKING',
  POEM_GET_SCHOOL_RANKING: 'activity/poem/GET_SCHOOL_RANKING',
  POEM_ADD_SHAREINFO: 'activity/poem/ADD_SHAREINFO',
  POEM_GET_CONFIG: 'activity/poem/GET_CONFIG',
  POEM_GET_WRONG_RECORD: 'activity/poem/GET_WRONG_RECORD',
  POEM_GET_RECORD: 'activity/poem/GET_RECORD',
  POEM_GET_USERS_RANKING: 'activity/poem/GET_USERS_RANKING',
  POEM_SET_WEIXIN_CODE: 'activity/poem/set_WEIXIN_CODE',
})

export const POEM_PAGE_META = {
  title: '活动示例',
  description: '活动示例',
  meta: {
    keywords: '活动示例',
  },
}
