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

/**
 * 导出员工的excel
 * **/

export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}

/**
 * 上传用户的excel
 *
 */
export function uploadExcel(data: any) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型 因为要上传文件类型
  })
}

/**
 * 下载员工导入模版
 * **/

export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 二进制文件流
  })
}

/**
 * 删除员工
 * **/

export function delEmployee(id: number) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

export function addEmployee(data: any) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 *  获取员工详情
 * **/

export function getEmployeeDetail(id?: number): Promise<any> {
  return request({
    url: `/sys/user/${id}`
  })
}
/**
 * 获取可用的角色
 * **/

export function getEnableRoleList() {
  return request({
    url: '/sys/role/list/enabled'
  })
}
/**
 * 分配员工角色
 * ***/

export function assignRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
