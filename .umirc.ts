import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: 'webgl',
  publicPath: '/webgl/',
  routes: [
    { path: '/', component: '@/pages/three5/index' },
    // { path: '/three1', component: '@/pages/three/index' },
    // { path: '/three2', component: '@/pages/three2/index' },
    // { path: '/three3', component: '@/pages/three3/index' },
    { path: '/webgl1', component: '@/pages/webgl1/index' },
    { path: '/webgl2', component: '@/pages/webgl2/index' },
    { path: '/webgl3', component: '@/pages/webgl3/index' },
    { path: '/webgl4', component: '@/pages/webgl4/index' },
    { path: '/webgl5', component: '@/pages/webgl5/index' },
  ],
  fastRefresh: {},
  copy: [
    {
      from: 'src/assets',
      to: '/',
    },
  ],
  // headScripts: [`https://unpkg.com/three@0.134.0/build/three.module.js`],
});
