import {
    createWebHistory,
    createRouter,
    type RouteRecordRaw
} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        name: 'homepage',
        path: '/',
        component: () => import('../views/HomePage.vue')
    },
    {
        name: 'blog-page',
        path: '/blog',
        component: () => import('../views/BlogPage.vue'),

        children: [
            {
                name: 'blog-detail',
                path: '/blog/installation',
                component: () =>
                    // import('../views/HomePage.vue')
                    import('@/../content/installation/1.Installation.md')
            }
        ]
    },
    {
        name: 'not-found',
        path: '/:pathMatch(.*)*',
        component: () => import('../views/NotFound.vue')
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
