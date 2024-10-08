import request from '@/utils/request'
import { number } from 'echarts'
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

/**
 * 获取角色详情
 * **/

export function getRoleDetail(id: number): Promise<any> {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 给角色分配权限
 *
 * ***/

export function assignPerm(data: any) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
