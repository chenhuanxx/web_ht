import { datasourceList,editSource ,enable ,linkStatus ,deleteData , getBusiness,getDatabase} from '@/api/datasource'
import qs from "qs"
import { stringify } from 'querystring'

const state = {
  // tableData: []
}
const mutations = {
  // SET_tableData: (state, tableData) => {
  //   state.tableData = tableData
  // },
}

const actions = {
    //获取数据源列表
    datasourceListData({ commit }, listFrom) {
         return new Promise((resolve, reject) => {
          datasourceList(qs.stringify(listFrom)).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //注册数据源

  editSource({ commit }, source) {
    return new Promise((resolve, reject) => {
      const data=qs.stringify(source)
      // const data=qs.parse(source)
      editSource(data).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
    })
},

//启用
enable({ commit }, source) {
  return new Promise((resolve, reject) => {
    const data=qs.stringify(source)
    enable(data).then(response => {
    resolve(response)
  }).catch(error => {
    reject(error)
  })
  })
},

//删除
deleteData({ commit }, source) {
  return new Promise((resolve, reject) => {
    const data=qs.stringify(source)
    deleteData(data).then(response => {
    resolve(response)
  }).catch(error => {
    reject(error)
  })
  })
},
//数据库类型
getDatabase({ commit }) {
  return new Promise((resolve, reject) => {
    const data=qs.stringify( )
    getDatabase(data).then(response => {
    resolve(response)
  }).catch(error => {
    reject(error)
  })
  })
},

//所属者
getBusiness({ commit }) {
  return new Promise((resolve, reject) => {
    const data=qs.stringify( )
    getBusiness(data).then(response => {
    resolve(response)
  }).catch(error => {
    reject(error)
  })
  })
},

//连接状态
linkStatus({ commit }, source) {
  return new Promise((resolve, reject) => {
    const source1=JSON.stringify(source)
    const data=qs.stringify(
      {str:source1}
    )
    linkStatus(data).then(response => {
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
