import request from '@/utils/request'
interface EmpState {
  staffPhoto: string
  username: string
  mobile: string
  workNumber: string
  formOfEmployment: string
  departmentName: string
  timeOfEntry: string
}
interface RoleTotal {
  rows: EmpState[]
  total: number
}
export function getEmployeeList(params: any): Promise<RoleTotal> {
  return request({
    url: '/sys/user',
    params // 地址参数 查询参数
  })
}
