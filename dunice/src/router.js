// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import Login from './views/AuthPage.vue'; 
const routes = [

  {
    path: '/auth',
    name: 'Login',
    component: Login, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
