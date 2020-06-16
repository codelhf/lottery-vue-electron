import request from '@/utils/request'

export function fetchUserList(params) {
  return request({
    url: '/user',
    type: 'get',
    params
  })
}

export function fetchUser(id) {
  return request({
    url: '/user/' + id,
    type: 'get'
  })
}

export function createUser(formData) {
  return request({
    url: '/user',
    type: 'post',
    data: formData
  })
}

export function updateUser(formData) {
  return request({
    url: '/user/' + formData.id,
    type: 'put',
    data: formData
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    type: 'delete'
  })
}
