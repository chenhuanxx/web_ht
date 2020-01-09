import request from '@/utils/request'

  //权限树
  export function permList(data) {
    return request({
      url: '/auth/findPerms',
      method: 'post',
      data:data
    })
  }
  
// 开通用户
export function setPerm(data) {
  return request({
    url: '/auth/setPerm',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    data:data
  })
}

//编辑权限
// 
export function getPerm(data) {
  return request({
    url: '/auth/getPerm',
    method: 'post',
    contentType: 'application/json;charset=UTF-8',
    data:data
  })
}


// //删除
export function del(data) {
  return request({
    url: '/auth/del',
    method: 'post',
    data:data
  })
}