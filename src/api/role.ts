import request from '@/utils/request'
interface RoleItem {
  id?: number
  name: string
  description: string
  state: number
}

interface RoleTotal {
  rows: RoleItem[]
  total: number
}
/** *
 * 获取角色列表
 * **/
export function getRoleList(params: any): Promise<RoleTotal> {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}

/** **
 * 新增角色
 * ***/

export function addRole(data: RoleItem): Promise<RoleItem> {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * 更新角色
 * ***/

export function updateRole(data: RoleItem) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 * 删除角色
 * **/

export function delRole(id: number) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
