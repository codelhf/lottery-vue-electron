import request from '../src/utils/init-data'
import { buildPage, success, successMsg, fail } from './mock-result'

export default [
  // user list
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const params = config.query
      const userList = request.read().get('users').value()
      if (!userList) {
        return fail('users.list')
      }
      const pageInfo = buildPage(params, userList)
      const prizeList = request.read().get('prizes').value()
      pageInfo.list.map(item => {
        prizeList.map(prize => {
          if (item.prizeId && item.prizeId === prize.id) {
            item.prizeImage = prize.image
            item.prizeName = prize.name
          } else {
            item.prizeImage = ''
            item.prizeName = ''
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
        return fail('users.get')
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
        return fail('users.create.repeat')
      }
      formData.operateTime = new Date().getTime()
      result = request.read().get('users').insert(formData).write()
      if (!result) {
        return fail('users.create.saveError')
      }
      return successMsg('users.create.success')
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
        return fail('users.update.repeat')
      }
      formData.operateTime = new Date().getTime()
      result = request.read().get('users').updateById(formData.id, formData).write()
      if (!result) {
        return fail('users.update.updateError')
      }
      return successMsg('users.update.success')
    }
  },
  // delete user
  {
    url: '/user/',
    type: 'delete',
    response: config => {
      const { ids } = config.query
      let result = null
      if (ids) {
        // delete selected
        const idArr = ids.split(',')
        idArr.map((id) => {
          result = request.read().get('users').removeById(id).write()
        })
      } else {
        // delete all
        result = request.read().set('users', []).write()
      }
      if (!result) {
        return fail('users.delete.deleteError')
      }
      return successMsg('users.delete.success')
    }
  },
  // batch create user
  {
    url: '/user/batch',
    type: 'post',
    response: config => {
      const userList = config.body
      if (userList.length === 0) {
        return fail('users.batchCreate.noUser')
      }
      for (const i in userList) {
        const user = userList[i]
        // 进行表单验证
        if (user && user.username && user.description) {
          let result = request.read().get('users').find({ username: user.username, description: user.description }).value()
          if (result) {
            return fail('users.create.repeat')
          }
          user.operateTime = new Date().getTime()
          result = request.read().get('users').insert(user).write()
          if (!result) {
            return fail('users.create.saveError')
          }
        }
      }
      return successMsg('users.create.success')
    }
  }
]
