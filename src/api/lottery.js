import request from '@/utils/request'

export function selectPrize() {
  return request({
    url: '/lottery/prize',
    method: 'get'
  })
}

export function selectUser() {
  return request({
    url: '/lottery/user',
    method: 'get'
  })
}

export function selectPrizeStock(prizeId) {
  return request({
    url: '/lottery/prizeStock',
    method: 'get',
    params: { prizeId }
  })
}

export function selectNoPrizeUser(prizeId) {
  return request({
    url: '/lottery/noPrizeUser',
    method: 'get',
    params: { prizeId }
  })
}

export function startOne(prizeId) {
  return request({
    url: '/lottery/startOne',
    method: 'get',
    params: { prizeId }
  })
}

export function startAll(prizeId) {
  return request({
    url: '/lottery/startAll',
    method: 'get',
    params: { prizeId }
  })
}

export function resetStock(prizeId) {
  return request({
    url: '/lottery/resetStock',
    method: 'put',
    params: { prizeId }
  })
}
