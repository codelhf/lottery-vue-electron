import request from '@/utils/request'

export function selectPrize() {
  return request({
    url: '/lottery/prize',
    method: 'get'
  })
}

export function selectStock(prizeId) {
  return request({
    url: '/lottery/stock',
    method: 'get',
    params: { prizeId }
  })
}

export function selectUser() {
  return request({
    url: '/lottery/user',
    method: 'get'
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

export function resetAll(prizeId) {
  return request({
    url: '/lottery/resetAll',
    method: 'put',
    params: { prizeId }
  })
}
