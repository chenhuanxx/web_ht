import request from '@/utils/request'

 //抽签
  export function matchchou(data) {
    return request({
      url: '/match/chou',
      method: 'post',
      data:data
    })
  }
  

  //顺序
  export function matchlist(data) {
    return request({
      url: '/match/list',
      method: 'post',
      data:data
    })
  }
 //确认生成表格/member/update
 export function matchsure(data) {
     console.log(data)
    return request({
      url: '/match/sure',
      method: 'post',
      data:data
    })
  }
   

  