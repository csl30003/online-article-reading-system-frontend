import {createRouter, createWebHistory} from 'vue-router'

// 下面页面都是假的
const routes = [
    {
        path: '/',
        component: () => import('../views/index')
    },
    {
        path: '/home',
        component: () => import('../views/home'),
    //     children: [
    //         {
    //             path: 'map',
    //             component: () => import('../views/floor'),
    //         },
    //         {
    //             path: 'map/:floor',
    //             component: () => import('../views/layer')
    //         },
    //         {
    //             path: 'map/:floor/:layer',
    //             component: () => import('../views/class')
    //         },
    //         {
    //             path: 'map/:floor/:layer/:class',
    //             component: () => import('../views/seat')
    //         },
    //         {
    //             path: 'friend',
    //             component: () => import('../views/friend')
    //         }
    //     ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router