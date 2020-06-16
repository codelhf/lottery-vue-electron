import request from '../src/utils/init-conf'
import { success, successMsg, fail, failCodeMsg } from './mock-result'

const tokens = request.read().get('tokens').value()

const users = request.read().get('users').value()

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return failCodeMsg(60204, 'Account and password are incorrect.')
      }
      return success(token)
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return fail('Login failed, unable to get user details.')
      }
      return success(info)
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return successMsg('success')
    }
  }
]
