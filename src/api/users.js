import request from '@/utils/request'

export function fetchUserList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function fetchUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get',
    params: { id }
  })
}

export function createUser(formData) {
  return request({
    url: '/user',
    method: 'post',
    data: formData
  })
}

export function updateUser(formData) {
  return request({
    url: '/user/' + formData.id,
    method: 'put',
    data: formData
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete',
    params: { id }
  })
}
