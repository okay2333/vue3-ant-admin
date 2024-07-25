import request from '@/utils/request'
interface RoleItem {
  id: number
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
