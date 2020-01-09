import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/getUsers',
//     method: 'get',
//     data:""
//   })
// }

export function logout() {
  return request({ 
    // headers: {
    //   'Access-Control-Allow-Origin': "*",
       
    //  },
    url: '/logout',
    method: 'post'
  })
}
