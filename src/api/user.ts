import request from '@/utils/request'

export function login(data: any) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo(): Promise<any> {
  return request({
    url: '/sys/profile'
  })
}

/**
 * 更新密码
 * **/
export function updatePassword(data: object) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
