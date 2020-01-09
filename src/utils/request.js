import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken ,getSesion } from '@/utils/auth'


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url/
  // withCredentials: true, // 跨域请求时发送cookie
  timeout: 50000 ,// request timeout
  
  // headers: {
  //   // 'Content-Type': """application/json;charset=utf-8,
  //   // 'Access-Control-Allow-Origin':"*"
  // }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情

    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token'] is a custom headers key
      // 请根据实际情况进行修改
      
      config.headers['Authorization'] = getToken() 
      // config.headers["Access-Control-Allow-Origin"]="*"
    }
    return config
  },
  error => {
    // 做一些请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取诸如标题或状态之类的http信息
   * Please return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态代码判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是20000，则判断为错误.
    if (res.code == 404) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
     else {
      return res
    }
  },
  error => {
    Message({
      message: "网络有误",
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
