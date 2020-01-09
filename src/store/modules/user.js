import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken ,setSesion ,getSesion,setAdmin ,removeAdmin ,getcd ,setcd} from '@/utils/auth'
import router, { resetRouter } from '@/router'

import qs from "qs"

const state = {
  token: getToken(),
  sesion:getSesion(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },

  SET_SESION: (state, sesion) => {
    state.sesion = sesion
  }
}

const actions = { 
  login({ commit }, userInfo) { 
    return new Promise((resolve, reject) => { 
         var data = "12" 
         
        const { mm , yhm} = userInfo 
        commit('SET_TOKEN', data); 
        setAdmin(yhm)
        if(data!=null){
          setToken(data)
        } 
        resolve(data) 
    })
 
    
  // login({ commit }, userInfo) {
  //   const { yhm, mm } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login(qs.stringify({ yhm: yhm.trim(), mm: mm })).then(response => { 
         
  //       const { data , yhm} = response 
  //       commit('SET_TOKEN', data); 
  //       setAdmin(yhm)
  //       if(data!=null){
  //         setToken(data)
  //       }
          
  //       resolve(response)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  },

  // // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
        const roles = ["admin"]
        commit('SET_ROLES', roles)
        resolve(roles)
      
    })
  },

  // 退出登录
  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    localStorage.removeItem("CD");
    removeToken()
    removeAdmin()
    resetRouter()
    
  },

  // 删除令牌
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

   
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
