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
        return fail('请添加奖品')
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
        return fail('该类奖品已抽完，请选择其他奖品')
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
      if (!users || users.length === 0) {
        return fail('请邀请更多人员参与')
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
      if (!prize || prize.stock === '0') {
        return fail('该类奖品已抽完，请选择其他奖品')
      }
      const userList = request.read().get('users').value()
      const noPrizeUser = userList.filter(item => {
        if (!item.prizeId) {
          return item
        }
      })
      if (!noPrizeUser || noPrizeUser.length === 0) {
        return fail('请邀请更多参与者')
      }
      // 生成和没有中奖的人数量相同的随机数,list下标从零开始--Random从零开始
      const num = Math.floor(Math.random() * noPrizeUser.length)
      const prizeUser = noPrizeUser[num]
      prizeUser.prizeId = prize.id
      prize.stock = prize.stock - 1
      const resultUser = request.read().get('users').updateById(prizeUser.id, prizeUser).write()
      if (!resultUser) {
        return fail('保存中奖用户失败')
      }
      // 更新数据
      const resultPrize = request.read().get('prizes').updateById(prize.id, prize).write()
      if (!resultPrize) {
        return fail('修改奖品数量失败')
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
      if (!prize || prize.stock === '0') {
        return fail('该类奖品已抽完，请选择其他奖品')
      }
      const userList = request.read().get('users').value()
      const noPrizeUser = userList.filter(item => {
        if (!item.prizeId) {
          return item
        }
      })
      if (!noPrizeUser || noPrizeUser.length === 0) {
        return fail('请邀请更多参与者')
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
        return fail('修改奖品数量失败')
      }
      // 更新中奖用户
      userList.map(item => {
        prizeUserList.map(user => {
          if (item.id === user.id) {
            item.prizeId = user.prizeId
          }
        })
      })
      const resultUser = request.read().set('users', userList).write()
      if (!resultUser) {
        return fail('修改奖品数量失败')
      }
      return success(prizeUserList)
    }
  },
  // reset all
  {
    url: '/lottery/resetAll',
    type: 'put',
    response: config => {
      const prizeList = request.read().get('prizes').value()
      if (prizeList) {
        prizeList.map(item => {
          item.stock = item.resetStock
        })
      }
      const resultPrize = request.read().set('prizes', prizeList).write()
      if (!resultPrize) {
        return fail('reset prize fail')
      }
      const userList = request.read().get('users').value()
      if (userList) {
        userList.map(item => {
          item.prizeId = null
        })
      }
      const resultUser = request.read().set('users', userList).write()
      if (!resultUser) {
        return fail('reset user fail')
      }
      return success('reset prize success')
    }
  }
]
