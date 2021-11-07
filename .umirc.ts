import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/three1', component: '@/pages/three/index' },
    { path: '/three2', component: '@/pages/three2/index' },
    { path: '/webgl1', component: '@/pages/webgl1/index' },
    { path: '/webgl2', component: '@/pages/webgl2/index' },
    { path: '/webgl3', component: '@/pages/webgl3/index' },
    { path: '/webgl4', component: '@/pages/webgl4/index' },
    { path: '/webgl5', component: '@/pages/webgl5/index' }
  ],
  fastRefresh: {},
  // headScripts: [`https://unpkg.com/three@0.134.0/build/three.module.js`],
});
