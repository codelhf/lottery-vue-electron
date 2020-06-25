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
      const { username, password } = config.body
      const token = tokens[username]
      // no username
      if (!token) {
        return failCodeMsg(5006, 'login.noUsername')
      }
      // password error
      const passwordSlat = tokens[username + 'Pwd']
      console.log(password, passwordSlat)
      if (password !== passwordSlat) {
        return failCodeMsg(5006, 'login.noPassword')
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
        return fail('login.noUserInfo')
      }
      return success(info)
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return successMsg('login.success')
    }
  }
]
