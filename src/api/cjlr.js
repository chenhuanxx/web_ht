import request from '@/utils/request'

 //成绩修改
  export function cjupdate(data) {
    return request({
      url: '/match/update',
      method: 'post',
      data:data
    })
  }

  //成绩展示
  export function broad( ) {
    return request({
      url: '/match/broad',
      method: 'post', 
    })
  }
  
 