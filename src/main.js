import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import ContactPage from './pages/ContactPage.vue'
import CharacterDetailPage from './pages/CharacterDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage, meta: { title: 'Characters' } },
    { path: '/disney/:id-:slug', component: CharacterDetailPage, meta: { title: 'Character' } },
    { path: '/about', component: AboutPage, meta: { title: 'About' } },
    { path: '/contact', component: ContactPage, meta: { title: 'Contact' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const siteName = import.meta.env.VITE_SITE_NAME || 'DisneyVerse'
  document.title = to.meta.title ? `${to.meta.title} — ${siteName}` : siteName
})

const app = createApp(App)
app.use(router)
app.mount('#app')
