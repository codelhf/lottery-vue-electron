import request from '../src/utils/init-data'
import { success, fail } from './mock-result'

export default [
  // select prize all
  {
    url: '/lottery/prize',
    type: 'get',
    response: config => {
      const prizeList = request.read().get('prizes').value()
      if (!prizeList || prizeList.length === 0) {
        return fail('lottery.prize')
      }
      return success(prizeList)
    }
  },
  // select prize stock
  {
    url: '/lottery/stock',
    type: 'get',
    response: config => {
      const { prizeId } = config.query
      const prize = request.read().get('prizes').getById(prizeId).value()
      if (!prize || prize.stock === 0) {
        return fail('lottery.stock')
      }
      return success(prize)
    }
  },
  // select user no prize
  {
    url: '/lottery/user',
    type: 'get',
    response: config => {
      let users = request.read().get('users').value()
      users = users.filter(item => {
        if (!item.prizeId) {
          return item
        }
      })
      if (!users || users.length <= 1) {
        return fail('lottery.user')
      }
      return success(users)
    }
  },
  // start one
  {
    url: '/lottery/startOne',
    type: 'get',
    response: config => {
      const { prizeId } = config.query
      const prize = request.read().get('prizes').find({ id: prizeId }).value()
      if (!prize || prize.stock === 0) {
        return fail('lottery.startOne.noStock')
      }
      const userList = request.read().get('users').value()
      const noPrizeUser = userList.filter(item => {
        if (!item.prizeId) {
          return item
        }
      })
      if (!noPrizeUser || noPrizeUser.length <= 1) {
        return fail('lottery.startOne.noUser')
      }
      // 生成和没有中奖的人数量相同的随机数,list下标从零开始--Random从零开始
      const num = Math.floor(Math.random() * noPrizeUser.length)
      const prizeUser = noPrizeUser[num]
      // 更新数据
      prize.stock = prize.stock - 1
      const resultPrize = request.read().get('prizes').updateById(prize.id, prize).write()
      if (!resultPrize) {
        return fail('lottery.startOne.updatePrize')
      }
      // 保存中奖用户
      prizeUser.prizeId = prize.id
      const resultUser = request.read().get('users').updateById(prizeUser.id, prizeUser).write()
      if (!resultUser) {
        return fail('lottery.startOne.savePrizeUser')
      }
      return success(prizeUser)
    }
  },
  // start all
  {
    url: '/lottery/startAll',
    type: 'get',
    response: config => {
      const { prizeId } = config.query
      const prize = request.read().get('prizes').find({ id: prizeId }).value()
      if (!prize || prize.stock === 0) {
        return fail('lottery.startAll.noStock')
      }
      const userList = request.read().get('users').value()
      const noPrizeUser = userList.filter(item => {
        if (!item.prizeId) {
          return item
        }
      })
      if (!noPrizeUser || noPrizeUser.length <= prize.stock) {
        return fail('lottery.startAll.noUser')
      }
      // 保存已中奖人员
      const prizeUserList = []
      for (let i = 0, iLength = prize.stock; i < iLength; i++) {
        // 生成总人数之间的随机数,list下标从零开始--Random从零开始
        const num = Math.floor(Math.random() * noPrizeUser.length)
        const prizeUser = noPrizeUser[num]
        if (!prizeUserList.includes(prizeUser)) {
          prizeUser.prizeId = prize.id
          prizeUserList.push(prizeUser)
        } else {
          // 生成相同的添加失败, i不增加
          i--
        }
      }
      // 更新数据
      prize.stock = 0
      const resultPrize = request.read().get('prizes').updateById(prize.id, prize).write()
      if (!resultPrize) {
        return fail('lottery.startAll.updatePrize')
      }
      // 保存中奖用户
      userList.map(item => {
        prizeUserList.map(user => {
          if (item.id === user.id) {
            item.prizeId = user.prizeId
          }
        })
      })
      const resultUser = request.read().set('users', userList).write()
      if (!resultUser) {
        return fail('lottery.startAll.savePrizeUser')
      }
      return success(prizeUserList)
    }
  },
  // reset all
  {
    url: '/lottery/resetAll',
    type: 'put',
    response: config => {
      const { prizeId } = config.query
      const prize = request.read().get('prizes').getById(prizeId).value()
      if (prize && prize.id === prizeId) {
        prize.stock = prize.resetStock
      }
      const resultPrize = request.read().get('prizes').updateById(prize.id, prize).write()
      if (!resultPrize) {
        return fail('lottery.resetAll.resetPrize')
      }
      const userList = request.read().get('users').value()
      if (userList) {
        userList.map(item => {
          if (item.prizeId === prizeId) {
            item.prizeId = null
          }
        })
      }
      const resultUser = request.read().set('users', userList).write()
      if (!resultUser) {
        return fail('lottery.resetAll.resetUsers')
      }
      return success('lottery.resetAll.success')
    }
  }
]
