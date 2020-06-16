import request from '@/utils/request'

export function fetchPrizeList(params) {
  return request({
    url: '/prize',
    type: 'get',
    params
  })
}

export function fetchPrize(id) {
  return request({
    url: '/prize/' + id,
    type: 'get'
  })
}

export function createPrize(formData) {
  return request({
    url: '/prize',
    type: 'post',
    data: formData
  })
}

export function updatePrize(formData) {
  return request({
    url: '/prize/' + formData.id,
    type: 'put',
    data: formData
  })
}

export function deletePrize(id) {
  return request({
    url: '/prize/' + id,
    type: 'delete'
  })
}
