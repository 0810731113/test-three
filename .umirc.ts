import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/three1', component: '@/pages/three/index' },
  ],
  fastRefresh: {},
  // headScripts: [`https://unpkg.com/three@0.134.0/build/three.module.js`],
});
