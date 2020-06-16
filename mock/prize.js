import request from '../src/utils/init-data'
import { buildPage, success, successMsg, fail } from './mock-result'

export default [
  // prize list
  {
    url: '/prize',
    type: 'get',
    response: config => {
      const params = config.query
      const prizeList = request.read().get('prizes').value()
      const pageInfo = buildPage(params, prizeList)
      if (!prizeList) {
        return fail('no data')
      }
      return success(pageInfo)
    }
  },
  // prize item
  {
    url: '/prize/\*',
    type: 'get',
    response: config => {
      const { id } = config.query
      const user = request.read().get('prizes').getById(id).value()
      if (!user) {
        return fail('no data')
      }
      return success(user)
    }
  },
  // create prize
  {
    url: '/prize',
    type: 'post',
    response: config => {
      const formData = config.body
      let result = request.read().get('prizes').find({ name: formData.name, description: formData.description }).value()
      if (result) {
        return fail('repeat user')
      }
      formData.operateTime = new Date().getTime()
      result = request.read().get('prizes').insert(formData).write()
      if (!result) {
        return fail('insert data error')
      }
      return successMsg('success')
    }
  },
  // update prize
  {
    url: '/prize/\*',
    type: 'put',
    response: config => {
      const formData = config.body
      let result = request.read().get('prizes').find({ name: formData.name, description: formData.description }).value()
      if (result && result.id !== formData.id) {
        return fail('repeat user')
      }
      formData.operateTime = new Date().getTime()
      result = request.read().get('prizes').updateById(formData.id, formData).write()
      if (!result) {
        return fail('update data error')
      }
      return successMsg('success')
    }
  },
  // delete prize
  {
    url: '/prize/\*',
    type: 'delete',
    response: config => {
      const { id } = config.query
      const result = request.read().get('prizes').removeById(id).write()
      if (!result) {
        return fail('delete data error')
      }
      return successMsg('success')
    }
  }
]
