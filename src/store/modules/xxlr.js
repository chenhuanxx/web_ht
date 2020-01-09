
import {memberlist,membersave ,memberupdate ,memberdelete} from '@/api/xxlr'
import qs from "qs" 

const state = { 
}
const mutations = {
   
}

const actions = {
    //获取数据源列表
    memberlist({ commit }, listFrom) {
         return new Promise((resolve, reject) => {
            memberlist(qs.stringify(listFrom)).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //新增
  membersave({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
        membersave( listFrom ).then(response => {
   resolve(response)
 }).catch(error => {
   reject(error)
 })
})
},
  //修改
  memberupdate({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
        memberupdate( listFrom ).then(response => {
         resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
},
//删除
memberdelete({ commit }, source) {
  return new Promise((resolve, reject) => {
    
    memberdelete( source ).then(response => {
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
