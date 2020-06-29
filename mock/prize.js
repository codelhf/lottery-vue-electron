import request from '../src/utils/init-data'
import { buildPage, success, successMsg, fail } from './mock-result'

export default [
  // prize list
  {
    url: '/prize/list',
    type: 'get',
    response: config => {
      const params = config.query
      const prizeList = request.read().get('prizes').value()
      if (!prizeList) {
        return fail('prize.list')
      }
      const pageInfo = buildPage(params, prizeList)
      return success(pageInfo)
    }
  },
  // prize item
  {
    url: '/prize/',
    type: 'get',
    response: config => {
      const { id } = config.query
      const user = request.read().get('prizes').getById(id).value()
      if (!user) {
        return fail('prize.get')
      }
      return success(user)
    }
  },
  // create prize
  {
    url: '/prize\$',
    type: 'post',
    response: config => {
      const formData = config.body
      let result = request.read().get('prizes').find({ name: formData.name, description: formData.description }).value()
      if (result) {
        return fail('prize.create.repeat')
      }
      formData.resetStock = formData.stock
      formData.operateTime = new Date().getTime()
      result = request.read().get('prizes').insert(formData).write()
      if (!result) {
        return fail('prize.create.saveError')
      }
      return successMsg('prize.update.success')
    }
  },
  // update prize
  {
    url: '/prize/',
    type: 'put',
    response: config => {
      const formData = config.body
      let result = request.read().get('prizes').find({ name: formData.name, description: formData.description }).value()
      if (result && result.id !== formData.id) {
        return fail('prize.update.repeat')
      }
      formData.resetStock = formData.stock
      formData.operateTime = new Date().getTime()
      result = request.read().get('prizes').updateById(formData.id, formData).write()
      if (!result) {
        return fail('prize.update.updateError')
      }
      return successMsg('prize.update.success')
    }
  },
  // delete prize
  {
    url: '/prize/',
    type: 'delete',
    response: config => {
      const { ids } = config.query
      let result = null
      if (ids) {
        // delete selected
        const idArr = ids.split(',')
        for (const id of idArr) {
          result = request.read().get('prizes').removeById(id).write()
        }
      } else {
        // delete all
        result = request.read().set('prizes', []).write()
      }
      if (!result) {
        return fail('prize.delete.deleteError')
      }
      return successMsg('prize.delete.success')
    }
  },
  // batch create prize
  {
    url: '/prize/batch',
    type: 'post',
    response: config => {
      const prizeList = config.body
      if (prizeList.length === 0) {
        return fail('prize.batchCreate.noPrize')
      }
      for (const i in prizeList) {
        const prize = prizeList[i]
        // 进行表单验证
        if (prize && prize.name && prize.description && prize.stock && prize.number) {
          let result = request.read().get('prizes').find({ name: prize.name, description: prize.description }).value()
          if (result) {
            return fail('prize.batchCreate.repeat', prize.name)
          }
          prize.operateTime = new Date().getTime()
          result = request.read().get('prizes').insert(prize).write()
          if (!result) {
            return fail('prize.batchCreate.saveError')
          }
        }
      }
      return successMsg('prize.batchCreate.success')
    }
  }
]
