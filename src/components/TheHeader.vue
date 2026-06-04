<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
    :class="[
      scrolled ? 'py-2 shadow-lg' : 'py-4',
      isDark
        ? scrolled ? 'bg-cosmic-950/90 backdrop-blur-xl border-b border-star-blue/10' : 'bg-transparent'
        : scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-purple-100 shadow-purple-100/50' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group">
        <div class="relative w-10 h-10">
          <div
            class="absolute inset-0 rounded-full animate-spin-slow"
            :class="isDark ? 'bg-gradient-to-r from-star-blue via-star-purple to-star-gold' : 'bg-gradient-to-r from-violet-500 via-purple-600 to-pink-500'"
          ></div>
          <div
            class="absolute inset-0.5 rounded-full flex items-center justify-center"
            :class="isDark ? 'bg-cosmic-950' : 'bg-white'"
          >
            <span class="text-lg">✨</span>
          </div>
        </div>
        <span
          class="font-display text-xl font-bold tracking-wider"
          :class="isDark ? 'shimmer-text' : 'light-shimmer-text'"
        >
          {{ siteName }}
        </span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Right controls -->
      <div class="flex items-center gap-4">
        <!-- Dark mode toggle -->
        <button
          @click="$emit('toggle-dark')"
          class="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1"
          :class="isDark ? 'bg-star-blue/30 focus:ring-star-blue' : 'bg-purple-200 focus:ring-purple-400'"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <span
            class="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs"
            :class="isDark ? 'left-6 bg-star-blue shadow-glow-blue' : 'left-0.5 bg-white shadow-md'"
          >
            {{ isDark ? '🌙' : '☀️' }}
          </span>
        </button>

        <!-- Mobile menu button -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden p-2 rounded-lg transition-colors"
          :class="isDark ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'"
        >
          <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="md:hidden px-6 pb-4 pt-2 space-y-2 border-t"
        :class="isDark ? 'border-star-blue/10 bg-cosmic-950/95 backdrop-blur-xl' : 'border-purple-100 bg-white/95 backdrop-blur-xl'"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="mobileOpen = false"
          class="block font-heading text-sm tracking-widest uppercase py-2 px-3 rounded-lg transition-all"
          :class="isDark ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-purple-50'"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ isDark: Boolean })
defineEmits(['toggle-dark'])

const siteName = import.meta.env.VITE_SITE_NAME || 'DisneyVerse'
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Characters' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
