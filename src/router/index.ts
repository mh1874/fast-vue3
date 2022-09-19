import { createRouter, createWebHashHistory } from 'vue-router';
import routes from 'virtual:generated-pages';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const whiteList = ['login'];
const whiteRoutes = routes.filter((it) => whiteList.includes(it.name));
const frameRoutes = routes.filter((it) => !whiteList.includes(it.name));

const handledRoutes = [
  {
    path: '/',
    name: 'Frame',
    redirect: '/dashboard',
    component: () => import('../layout/frame.vue'),
    children: [...frameRoutes],
  },
  ...whiteRoutes,
];

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes: handledRoutes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
