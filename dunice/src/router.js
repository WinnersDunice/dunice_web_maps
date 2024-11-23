// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import CanvasView from './views/CanvasView.vue'; 
import Login from './views/AuthPage.vue'; 
import Profile from './views/ProfileView.vue'
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
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
