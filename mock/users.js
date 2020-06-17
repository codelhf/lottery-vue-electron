import request from '../src/utils/init-data'
import { buildPage, success, successMsg, fail } from './mock-result'

export default [
  // user list
  {
    url: '/user\$',
    type: 'get',
    response: config => {
      const params = config.query
      const userList = request.read().get('users').value()
      if (!userList) {
        return fail('no data')
      }
      const pageInfo = buildPage(params, userList)
      const prizeList = request.read().get('prizes').value()
      pageInfo.list.map(item => {
        prizeList.map(prize => {
          if (item.prizeId && item.prizeId === prize.id) {
            item.prizeImage = prize.image
            item.prizeName = prize.name
          }
        })
      })
      return success(pageInfo)
    }
  },
  // user item
  {
    url: '/user/',
    type: 'get',
    response: config => {
      const { id } = config.query
      const user = request.read().get('users').getById(id).value()
      if (!user) {
        return fail('no data')
      }
      return success(user)
    }
  },
  // create user
  {
    url: '/user',
    type: 'post',
    response: config => {
      const formData = config.body
      let result = request.read().get('users').find({ username: formData.username, description: formData.description }).value()
      if (result) {
        return fail('repeat user')
      }
      formData.operateTime = new Date().getTime()
      result = request.read().get('users').insert(formData).write()
      if (!result) {
        return fail('insert data error')
      }
      return successMsg('success')
    }
  },
  // update user
  {
    url: '/user/',
    type: 'put',
    response: config => {
      const formData = config.body
      let result = request.read().get('users').find({ username: formData.username, description: formData.description }).value()
      if (result && result.id !== formData.id) {
        return fail('repeat user')
      }
      formData.operateTime = new Date().getTime()
      result = request.read().get('users').updateById(formData.id, formData).write()
      if (!result) {
        return fail('update data error')
      }
      return successMsg('success')
    }
  },
  // delete user
  {
    url: '/user/',
    type: 'delete',
    response: config => {
      const { id } = config.query
      const result = request.read().get('users').removeById(id).write()
      if (!result) {
        return fail('delete data error')
      }
      return successMsg('success')
    }
  }
]
