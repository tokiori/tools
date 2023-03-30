// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  { path: '/notes', name: 'Notes', component: () => import('@/views/Notes.vue'), },
  { path: '/transcript', name: 'Transcript', component: () => import('@/views/Transcript.vue'), meta: { title: '音声認識＆書写' } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

/**
 * ページタイトル設定
 * @param pathTitle
 * @returns {string}
 */
export const setTitle = (pathTitle:string) => {
  const siteTitle = 'Tools';
  const pageTitle = !pathTitle ? siteTitle : pathTitle + ' | ' + siteTitle;
  return (window.document.title = pageTitle);
};

router.beforeEach((to, from, next) => {
  setTitle(to.meta.title as string);
  next();
});

export default router
