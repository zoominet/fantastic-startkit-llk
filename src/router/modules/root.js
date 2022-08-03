export default [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/study',
        component: () => import('@/views/card/study.vue'),
        meta: {
            title: '学习',
            requireLogin: true
        }
    }
]
