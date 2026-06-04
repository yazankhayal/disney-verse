<template>
  <div class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-20 space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-body text-sm mb-4"
          :class="isDark ? 'border-star-purple/30 bg-star-purple/10 text-star-purple' : 'border-violet-200 bg-violet-50 text-violet-600'"
        >
          <span>🌟</span> Our Story
        </div>
        <h1 class="font-display text-5xl md:text-6xl font-bold">
          <span :class="isDark ? 'shimmer-text' : 'light-shimmer-text'">About</span>
          <span :class="isDark ? 'text-white' : 'text-gray-900'"> DisneyVerse</span>
        </h1>
        <p class="font-body text-lg max-w-2xl mx-auto" :class="isDark ? 'text-white/50' : 'text-gray-500'">
          A passion project built to celebrate the magic of Disney storytelling.
        </p>
      </div>

      <!-- Content cards -->
      <div class="space-y-8">

        <!-- What is this -->
        <div class="glass-card rounded-3xl p-8 md:p-10">
          <div class="flex items-start gap-6">
            <div
              class="text-4xl animate-float flex-shrink-0"
              style="animation-delay: 0s"
            >🏰</div>
            <div>
              <h2 class="font-heading text-2xl font-semibold mb-3"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >What is DisneyVerse?</h2>
              <p class="font-body text-base leading-relaxed"
                :class="isDark ? 'text-white/60' : 'text-gray-600'"
              >
                DisneyVerse is a beautifully crafted encyclopedia of Disney characters — spanning films, TV shows, and video games. From beloved classics to modern adventures, every character has a place in our universe.
              </p>
            </div>
          </div>
        </div>

        <!-- The tech -->
        <div class="glass-card rounded-3xl p-8 md:p-10">
          <div class="flex items-start gap-6">
            <div
              class="text-4xl animate-float flex-shrink-0"
              style="animation-delay: 0.5s"
            >⚡</div>
            <div class="flex-1">
              <h2 class="font-heading text-2xl font-semibold mb-3"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >Built with Modern Tech</h2>
              <p class="font-body text-base leading-relaxed mb-6"
                :class="isDark ? 'text-white/60' : 'text-gray-600'"
              >
                This project is crafted with a carefully chosen stack for performance, beauty, and developer happiness.
              </p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  v-for="tech in techStack"
                  :key="tech.name"
                  class="text-center p-3 rounded-xl border transition-all duration-300 hover:scale-105"
                  :class="isDark ? 'border-white/10 bg-white/5 hover:border-star-blue/30' : 'border-purple-100 bg-purple-50/50 hover:border-violet-300'"
                >
                  <div class="text-2xl mb-1">{{ tech.icon }}</div>
                  <div class="font-heading text-xs tracking-wide"
                    :class="isDark ? 'text-white/70' : 'text-gray-700'"
                  >{{ tech.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- The developer -->
        <div class="glass-card rounded-3xl p-8 md:p-10">
          <div class="flex items-start gap-6">
            <div
              class="text-4xl animate-float flex-shrink-0"
              style="animation-delay: 1s"
            >👨‍💻</div>
            <div class="flex-1">
              <h2 class="font-heading text-2xl font-semibold mb-3"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >The Developer</h2>
              <p class="font-body text-base leading-relaxed mb-4"
                :class="isDark ? 'text-white/60' : 'text-gray-600'"
              >
                Hi, I'm <strong :class="isDark ? 'text-star-gold' : 'text-violet-700'">Yazan Khayal</strong> — a developer who loves building delightful digital experiences. DisneyVerse is a personal project combining my love for great UX and a little Disney magic.
              </p>
              <a
                href="https://yazan-khayal.com"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 btn-primary text-sm"
              >
                Visit My Website
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(true)
const observer = new MutationObserver(() => {
  const appEl = document.querySelector('#app > div')
  if (appEl) isDark.value = appEl.classList.contains('dark')
})
onMounted(() => {
  const appEl = document.querySelector('#app > div')
  if (appEl) {
    observer.observe(appEl, { attributes: true, attributeFilter: ['class'] })
    isDark.value = appEl.classList.contains('dark')
  }
})
onUnmounted(() => observer.disconnect())

const techStack = [
  { name: 'Vue 3', icon: '💚' },
  { name: 'Vite', icon: '⚡' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Laravel', icon: '🔴' },
]
</script>
