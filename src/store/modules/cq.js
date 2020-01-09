
import {matchchou,matchlist ,matchsure ,memberdelete} from '@/api/cq'
import qs from "qs" 

const state = { 

}
const mutations = {
   
}

const actions = {
    //抽签
    matchchou({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
      matchchou(qs.stringify(listFrom)).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //抽签顺序
  matchlist({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
        matchlist( qs.stringify(listFrom)).then(response => {
            resolve(response)
        }).catch(error => {
             reject(error)
        })
    })
  },

  //确认生成表格
  matchsure({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
        matchsure(qs.stringify(listFrom)).then(response => {
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
