import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import '/@/assets/styles/index.less';
import './index.css';

// 支持SVG
import 'virtual:svg-icons-register';

createApp(App).use(router).use(piniaStore).use(ElementPlus).mount('#app');
