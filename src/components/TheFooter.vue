<template>
  <footer
    class="relative z-10 mt-24 border-t"
    :class="isDark ? 'border-star-blue/10 bg-cosmic-950/80' : 'border-purple-100 bg-white/80'"
  >
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10">
              <div
                class="absolute inset-0 rounded-full"
                :class="isDark ? 'bg-gradient-to-r from-star-blue via-star-purple to-star-gold' : 'bg-gradient-to-r from-violet-500 to-pink-500'"
              ></div>
              <div
                class="absolute inset-0.5 rounded-full flex items-center justify-center"
                :class="isDark ? 'bg-cosmic-950' : 'bg-white'"
              >
                <span class="text-lg">✨</span>
              </div>
            </div>
            <span
              class="font-display text-xl font-bold"
              :class="isDark ? 'shimmer-text' : 'light-shimmer-text'"
            >
              {{ siteName }}
            </span>
          </div>
          <p class="font-body text-sm leading-relaxed" :class="isDark ? 'text-white/50' : 'text-gray-500'">
            A universe of Disney characters, lovingly curated and beautifully displayed.
          </p>
          <p class="font-body text-xs" :class="isDark ? 'text-white/30' : 'text-gray-400'">
            Made with ✨ by
            <a
              href="https://yazan-khayal.com"
              target="_blank"
              rel="noopener"
              class="transition-colors hover:underline font-semibold"
              :class="isDark ? 'text-star-gold hover:text-star-gold/80' : 'text-violet-600 hover:text-violet-800'"
            >
              Yazan Khayal
            </a>
          </p>
        </div>

        <!-- Navigation -->
        <div class="space-y-4">
          <h3
            class="font-heading text-sm tracking-widest uppercase"
            :class="isDark ? 'text-star-blue' : 'text-violet-600'"
          >
            Explore
          </h3>
          <nav class="space-y-2">
            <RouterLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="block font-body text-sm transition-colors"
              :class="isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-900'"
            >
              {{ link.label }}
            </RouterLink>
          </nav>
        </div>

        <!-- Legal & Dev -->
        <div class="space-y-4">
          <h3
            class="font-heading text-sm tracking-widest uppercase"
            :class="isDark ? 'text-star-blue' : 'text-violet-600'"
          >
            Legal & Info
          </h3>
          <div class="space-y-2">
            <a
              href="#"
              class="block font-body text-sm transition-colors"
              :class="isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-900'"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              class="block font-body text-sm transition-colors"
              :class="isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-900'"
            >
              Careers
            </a>
            <a
              href="https://yazan-khayal.com"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 font-body text-sm transition-colors group"
              :class="isDark ? 'text-white/50 hover:text-star-gold' : 'text-gray-500 hover:text-violet-600'"
            >
              <span>yazan-khayal.com</span>
              <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
        :class="isDark ? 'border-white/10' : 'border-purple-100'"
      >
        <p class="font-body text-xs" :class="isDark ? 'text-white/30' : 'text-gray-400'">
          © {{ new Date().getFullYear() }} {{ siteName }}. All rights reserved.
        </p>
        <p class="font-body text-xs" :class="isDark ? 'text-white/20' : 'text-gray-300'">
          Disney characters are property of The Walt Disney Company.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({ isDark: Boolean })

const siteName = import.meta.env.VITE_SITE_NAME || 'DisneyVerse'

const navLinks = [
  { to: '/', label: 'Characters' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
</script>
