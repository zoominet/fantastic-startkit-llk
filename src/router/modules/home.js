const HomeLayout = () => import('@/layout/home.vue')

export default {
    path: '/home',
    redirect: '/home/dashboard',
    component: HomeLayout,
    children: [
        {
            path: 'dashboard',
            component: () => import('@/views/home/dashboard.vue'),
            meta: {
                title: '学习',
                requireLogin: true
            }
        },
        {
            path: 'mycard',
            component: () => import('@/views/home/mycard.vue'),
            meta: {
                title: '浏览',
                requireLogin: true
            }
        },
        {
            path: 'newcard',
            component: () => import('@/views/home/newcard.vue'),
            meta: {
                title: '创建',
                requireLogin: true
            }
        },
        {
            path: 'search-result',
            component: () => import('@/views/home/search.result.vue'),
            meta: {
                title: '搜索结果',
                requireLogin: true
            }
        },
        {
            path: 'profile',
            component: () => import('@/views/home/profile.vue'),
            meta: {
                title: '设置',
                requireLogin: true
            }
        }
    ]
}
