<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-36 pb-16 px-6 text-center overflow-hidden">
      <!-- Decorative orbs -->
      <div
        class="absolute top-20 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        :class="isDark ? 'bg-star-blue' : 'bg-violet-400'"
      ></div>
      <div
        class="absolute top-32 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
        :class="isDark ? 'bg-star-gold' : 'bg-pink-400'"
      ></div>

      <div class="relative z-10 max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border font-body text-sm"
          :class="isDark ? 'border-star-blue/30 bg-star-blue/10 text-star-blue' : 'border-violet-200 bg-violet-50 text-violet-600'"
        >
          <span class="animate-twinkle">✨</span>
          <span>{{ total.toLocaleString() }} characters and counting</span>
        </div>

        <h1 class="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span :class="isDark ? 'shimmer-text' : 'light-shimmer-text'">The Disney</span>
          <br />
          <span :class="isDark ? 'text-white' : 'text-gray-900'">Universe</span>
        </h1>

        <p class="font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          :class="isDark ? 'text-white/50' : 'text-gray-500'"
        >
          Every hero, villain, sidekick, and magical creature from the most enchanting stories ever told.
        </p>

        <!-- Search -->
        <div class="relative max-w-xl mx-auto">
          <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            :class="isDark ? 'text-star-blue/60' : 'text-violet-400'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search for a character…"
            class="search-input pl-12 pr-4 text-base"
          />
          <Transition name="fade">
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
              :class="isDark ? 'text-white/30 hover:text-white' : 'text-gray-300 hover:text-gray-600'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Filter bar -->
    <section class="px-6 py-3 transition-all"
      :class="isDark ? 'bg-cosmic-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-purple-100'"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-3">
          <span class="font-body text-sm" :class="isDark ? 'text-white/80' : 'text-gray-400'">
            <template v-if="!loading">
              {{ total.toLocaleString() }} characters
              <template v-if="searchQuery"> matching "<strong :class="isDark ? 'text-white/80' : 'text-gray-400'">{{ searchQuery }}</strong>"</template>
            </template>
            <template v-else>Loading…</template>
          </span>
        </div>

        <!-- Page info -->
        <span class="font-heading text-xs tracking-widest uppercase"
          :class="isDark ? 'text-white/80' : 'text-gray-400'"
        >
          Page {{ currentPage }} of {{ lastPage }}
        </span>
      </div>
    </section>

    <!-- Characters Grid -->
    <section class="relative z-10 max-w-7xl mx-auto px-6 py-12">

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div
          v-for="i in 20"
          :key="i"
          class="rounded-2xl overflow-hidden"
          :class="isDark ? 'bg-cosmic-800/40' : 'bg-purple-50'"
        >
          <div class="h-52 animate-pulse"
            :class="isDark ? 'bg-cosmic-700/60' : 'bg-purple-100/60'"
          ></div>
          <div class="p-4 space-y-3">
            <div class="h-4 rounded animate-pulse"
              :class="isDark ? 'bg-cosmic-700/60' : 'bg-purple-100/60'"
            ></div>
            <div class="h-3 w-3/4 rounded animate-pulse"
              :class="isDark ? 'bg-cosmic-700/40' : 'bg-purple-100/40'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error && !characters.length" class="text-center py-24 space-y-4">
        <div class="text-6xl animate-float">🌌</div>
        <h3 class="font-heading text-xl" :class="isDark ? 'text-white/60' : 'text-gray-500'">Lost in space</h3>
        <p class="font-body text-sm" :class="isDark ? 'text-white/30' : 'text-gray-400'">
          Couldn't connect to the API. Check your <code>.env</code> config.
        </p>
        <button @click="fetchCharacters(currentPage, searchQuery)" class="btn-primary mt-4">
          Try Again
        </button>
      </div>

      <!-- Empty results -->
      <div v-else-if="!characters.length" class="text-center py-24 space-y-4">
        <div class="text-6xl animate-float">🔭</div>
        <h3 class="font-heading text-xl" :class="isDark ? 'text-white/60' : 'text-gray-500'">
          No characters found
        </h3>
        <p class="font-body text-sm" :class="isDark ? 'text-white/30' : 'text-gray-400'">
          Try a different search term
        </p>
      </div>

      <!-- Characters grid -->
      <TransitionGroup
        v-else
        name="grid"
        tag="div"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <CharacterCard
          v-for="(character, i) in characters"
          :key="character.id"
          :character="character"
          :is-dark="isDark"
          :index="i"
          class="animate-slide-up"
        />
      </TransitionGroup>

      <!-- Pagination -->
      <div v-if="!loading && lastPage > 1" class="mt-16">
        <Pagination
          :current-page="currentPage"
          :last-page="lastPage"
          :is-dark="isDark"
          @change="goToPage"
        />
        <p class="text-center font-body text-xs mt-4"
          :class="isDark ? 'text-white/25' : 'text-gray-300'"
        >
          Showing {{ ((currentPage - 1) * 20) + 1 }}–{{ Math.min(currentPage * 20, total) }} of {{ total.toLocaleString() }} characters
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import { useCharacters } from '@/composables/useCharacters'

// Get isDark from parent App via prop drilling or provide/inject
// For simplicity, we read it from document class
const isDark = ref(document.documentElement.classList.contains('dark'))

// Watch for dark mode changes
const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains('dark') ||
    document.body.closest('.dark') !== null
})

import { onUnmounted } from 'vue'
onMounted(() => {
  // check App's isDark state via parent
  const appEl = document.querySelector('#app > div')
  if (appEl) {
    observer.observe(appEl, { attributes: true, attributeFilter: ['class'] })
    isDark.value = appEl.classList.contains('dark')
  }
})
onUnmounted(() => observer.disconnect())

const {
  characters,
  loading,
  error,
  currentPage,
  lastPage,
  total,
  fetchCharacters,
  onSearch,
  goToPage
} = useCharacters()

const searchQuery = ref('')

function handleSearch() {
  onSearch(searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  onSearch('')
}

onMounted(() => {
  fetchCharacters(1)
})
</script>

<style scoped>
.grid-enter-active,
.grid-leave-active {
  transition: all 0.3s ease;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
