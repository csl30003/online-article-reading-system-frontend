import {createRouter, createWebHistory} from 'vue-router'

// 下面页面都是假的
const routes = [
    {
        path: '/',
        component: () => import('../views/index')
    },
    {
        path: '/home',
        component: () => import('../views/home')
    },
    {
        path: '/home/detail/:id',
        component: () => import('../views/detail')
    },
    {
        path: '/home/rank',
        component: () => import('../views/rank')
    },
    {
        path: '/home/upload',
        component: () => import('../views/upload')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router