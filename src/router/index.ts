import { createRouter, createWebHashHistory } from 'vue-router';
import routes from 'virtual:generated-pages';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { isLogin } from '/@/utils/auth';

const whiteList = ['/login'];
const whiteRoutes = routes.filter((it) => whiteList.includes(it.path));
export const frameRoutes = routes.filter((it) => !whiteList.includes(it.path));

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

router.beforeEach((_to, _from, next) => {
  NProgress.start();
  if (isLogin()) {
    // 登录成功，跳转到首页
    if (_to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      next();
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(_to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${_to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
