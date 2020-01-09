import request from '@/utils/request'

 //列表查询
  export function memberlist(data) {
    return request({
      url: '/member/list',
      method: 'post',
      data:data
    })
  }
  

  //新增
  export function membersave(data) {
    return request({
      url: '/member/save',
      method: 'post',
      data:data
    })
  }
 //修改/member/update
 export function memberupdate(data) {
    return request({
      url: '/member/update',
      method: 'post',
      data:data
    })
  }
  //删除/member/delete
  export function memberdelete(data) {
    return request({
      url: '/member/delete',
      method: 'post',
      data:data
    })
  }