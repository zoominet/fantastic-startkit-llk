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
                title: 'Dashboard',
                requireLogin: true
            }
        },
        {
            path: 'mycard',
            component: () => import('@/views/home/mycard.vue'),
            meta: {
                title: '我的卡片',
                requireLogin: true
            }
        }
    ]
}
