import request from '@/utils/request'

export function datasourceList(data) {
  return request({
    url: '/source/getSourceList',
    method: 'post',
    // crossDomain: true,                       
    // xhrFields: {withCredentials: true},
    // contentType: 'application/json;charset=UTF-8',
    data:data
  })
}
//注册

export function editSource(data) {
  return request({
    url: '/source/editSource',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    data:data
  })
}


//启用
export function enable(data) {
  return request({
    url: '/source/updateYHZT',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    data:data
  })
}

//刷新
export function linkStatus(data) {
  return request({
    url: '/source/updateLJZT',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    data:data
  })
}


//删除
export function deleteData(data) {
  return request({
    url: '/source/delSource',
    method: 'post',
    data:data
  })
}

//数据库类型
export function getDatabase(data) {
  return request({
    url: '/source/getDatabase',
    method: 'post',
    data:data
  })
}

//所属者
export function getBusiness(data) {
  return request({
    url: '/source/getBusiness',
    method: 'post',
    data:data
  })
}


