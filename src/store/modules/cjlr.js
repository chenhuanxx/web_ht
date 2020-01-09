 
import {cjupdate,broad } from '@/api/cjlr'
import qs from "qs" 

const state = { 

}
const mutations = {
   
}

const actions = {
    
    cjupdate({ commit }, listFrom) {
         return new Promise((resolve, reject) => {
            cjupdate( listFrom ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },


  broad({ commit }, listFrom) {
    return new Promise((resolve, reject) => {
        broad( listFrom ).then(response => {
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
