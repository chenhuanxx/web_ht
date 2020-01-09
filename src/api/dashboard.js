import request from '@/utils/request'


//dashboard/getBusinessNum 业务系统数量
export function getBusinessNum(data) {
  return request({
    url: '/dashboard/getBusinessNum',
    method: 'post',
    data:data
  })
}
//codingStandard/getCodeStandardNum  代码标准数量
export function getCodeStandardNum(data) {
    return request({
      url: '/codingStandard/getCodeStandardNum',
      method: 'post',
      data:data
    })
  }
  
  
  // mainData/getMainTableNum 数据建设数量(主题数据表个数)
  export function getMainTableNum(data) {
    return request({
      url: '/mainData/getMainTableNum',
      method: 'post',
      data:data
    })
  }
  // mainData/getMainDataNum 主数据(主题数据总记录数)
  export function getMainDataNum(data) {
    return request({
      url: '/mainData/getMainDataNum',
      method: 'post',
      data:data
    })
  }
  // mainData/getOriginalDataNum 原数据(原始数据库总记录数)
  export function getOriginalDataNum(data) {
    return request({
      url: '/mainData/getOriginalDataNum',
      method: 'post',
      data:data
    })
  }

  // dashboard/getSourceState 业务数据量查询
  export function getSourceState(data) {
    return request({
      url: '/dashboard/getSourceState',
      method: 'post',
      data:data
    })
  }

 // dashboard/getDataStandardNum 数据标准数量

export function getDataStandardNum(data) {
    return request({
      url: '/dashboard/getDataStandardNum',
      method: 'post',
      data:data
    })
  }
