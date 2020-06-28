import request from '@/utils/request'

export function fetchPrizeList(params) {
  return request({
    url: '/prize/list',
    method: 'get',
    params
  })
}

export function fetchPrize(id) {
  return request({
    url: '/prize/' + id,
    method: 'get',
    params: { id }
  })
}

export function createPrize(formData) {
  return request({
    url: '/prize',
    method: 'post',
    data: formData
  })
}

export function updatePrize(formData) {
  return request({
    url: '/prize/' + formData.id,
    method: 'put',
    data: formData
  })
}

export function deletePrize(ids) {
  return request({
    url: '/prize/' + ids,
    method: 'delete',
    params: { ids }
  })
}

export function batchCreatePrize(prizeList) {
  return request({
    url: '/prize/batch',
    method: 'post',
    data: prizeList
  })
}
