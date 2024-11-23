// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import CanvasView from './views/CanvasView.vue'; 
import Login from './views/AuthPage.vue'; 
const routes = [

  {
    path: '/auth',
    name: 'Login',
    component: Login, 
  },
  {
    path: '/canvas',
    name: 'CanvasView',
    component: CanvasView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
