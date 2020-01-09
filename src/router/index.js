import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '掼蛋比赛', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/xxlr',
    component: Layout,
    redirect: '/xxlr',
    children: [
      {
        path: 'xxlr',
        component: () => import('@/views/xxlr/index'),
        name: 'xxlr',
        meta: { title: '信息录入', icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/cq',
    component: Layout,
    redirect: '/cq',
    children: [
      {
        path: 'cq',
        component: () => import('@/views/cq/index'),
        name: 'cq',
        meta: { title: '抽签', icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/cjlr',
    component: Layout,
    redirect: '/cjlr',
    children: [
      {
        path: 'cjlr',
        component: () => import('@/views/cjlr/index'),
        name: 'cjlr',
        meta: { title: '成绩录入', icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/zjzs',
    component: Layout,
    redirect: '/zjzs',
    children: [
      {
        path: 'zjzs',
        component: () => import('@/views/kbzs/zjzs'),
        name: 'zjzs',
        meta: { title: '成绩展示', icon: 'component', affix: true }
      }
    ]
  }

  // {
  //   path: '/kbzs',
  //   component: Layout,
  //   redirect: '/mData/index',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'kbzs',
  //   meta: {
  //     title: '看板展示',
  //     icon: 'component'
  //   },
  // children: [
  //   {
  //     path: '/kbzs/index',
  //     component: () => import('@/views/kbzs/index'),
  //     name: 'kbzsIndex',
  //     meta: {
  //       title: '欢迎'
  //     }
  //   },
  //   {
  //     path: '/kbzs/djs',
  //     component: () => import('@/views/kbzs/djs'),
  //     name: 'kbzsdjs',
  //     meta: {
  //       title: '倒计时'
  //     }
  //   },
  //   {
  //     path: '/kbzs/zjzs',
  //     component: () => import('@/views/kbzs/zjzs'),
  //     name: 'kbzszjzs',
  //     meta: {
  //       title: '成绩展示'
  //     }
  //   },
  // ]
  // },

  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/index',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'system',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'user'
  //   },
  //   children: [
  //     {
  //       path: '/system/user',
  //       component: () => import('@/views/system/user/user.vue'),
  //       name: 'codeUser',
  //       meta: {
  //         title: '用户管理'
  //       }
  //     },
  //     {
  //       path: '/system/index',
  //       component: () => import('@/views/system/index'),
  //       name: 'systemIndex',
  //       meta: {
  //         title: '角色管理'
  //       }
  //     },
  //     {
  //       path: '/system/jur',
  //       component: () => import('@/views/system/jur/jur.vue'),
  //       name: 'codeJur',
  //       meta: {
  //         title: '权限管理'
  //       }
  //     },
  //     {
  //       path: '/system/dic',
  //       component: () => import('@/views/system/dic/dic.vue'),
  //       name: 'codeDic',
  //       meta: {
  //         title: '字典管理'
  //       }
  //     },
//     ]
//   }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
