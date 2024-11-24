// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import CanvasView from './views/CanvasView.vue'; 
import Login from './views/AuthPage.vue'; 
import Profile from './views/ProfileView.vue'
import Main from './views/MainPage.vue'
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
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
