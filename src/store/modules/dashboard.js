import {getBusinessNum ,  getCodeStandardNum, getDataStandardNum , getMainTableNum, getMainDataNum, getOriginalDataNum ,getSourceState} from '@/api/dashboard'
import qs from "qs"
import { stringify } from 'querystring'

const state = { 
}
const mutations = {
 
}

const actions = {
    //业务系统数量
  getBusinessNum({ commit }, listFrom) {
         return new Promise((resolve, reject) => {
          getBusinessNum(qs.stringify(listFrom)).then(response  => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },

 //代码标准数量
  getCodeStandardNum({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      getCodeStandardNum(qs.stringify(listFrom)).then(response => {
   resolve(response)
 }).catch(error => {
   reject(error)
 })
})
},
   //数据标准数量
getDataStandardNum({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      getDataStandardNum(qs.stringify(listFrom)).then(response => {
         resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },
   //数据建设数量(主题数据表个数)
  getMainTableNum({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      getMainTableNum(qs.stringify(listFrom)).then(response => {
         resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },
   //主数据(主题数据总记录数)
  getMainDataNum({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      getMainDataNum(qs.stringify(listFrom)).then(response => {
         resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },
   //原数据(原始数据库总记录数)
  getOriginalDataNum({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      getOriginalDataNum(qs.stringify(listFrom)).then(response => {
         resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },
   //业务数据量查询
  getSourceState({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      getSourceState(qs.stringify(listFrom)).then(response => {
         resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
