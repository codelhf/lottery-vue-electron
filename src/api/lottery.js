import request from '@/utils/request'

export function selectPrize() {
  return request({
    url: '/lottery/prize',
    type: 'get'
  })
}

export function selectStock(prizeId) {
  return request({
    url: '/lottery/stock',
    type: 'get',
    params: { prizeId }
  })
}

export function selectUser() {
  return request({
    url: '/lottery/user',
    type: 'get'
  })
}

export function startOne(prizeId) {
  return request({
    url: '/lottery/startOne',
    type: 'get',
    params: { prizeId }
  })
}

export function startAll(prizeId) {
  return request({
    url: '/lottery/startAll',
    type: 'get',
    params: { prizeId }
  })
}

export function resetAll() {
  return request({
    url: '/lottery/resetAll',
    type: 'put'
  })
}
