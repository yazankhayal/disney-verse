<template>
  <div class="min-h-screen pt-28 pb-24 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- Back button -->
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 font-heading text-xs tracking-widest uppercase mb-12 transition-all duration-300 group"
        :class="isDark ? 'text-white/40 hover:text-star-blue' : 'text-gray-400 hover:text-violet-600'"
      >
        <svg
          class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to characters
      </RouterLink>

      <!-- Loading skeleton -->
      <div v-if="loading" class="animate-fade-in">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div
            class="rounded-3xl overflow-hidden aspect-square animate-pulse"
            :class="isDark ? 'bg-cosmic-800/60' : 'bg-purple-100'"
          ></div>
          <div class="space-y-6 pt-4">
            <div class="h-3 w-24 rounded animate-pulse" :class="isDark ? 'bg-cosmic-700/60' : 'bg-purple-100'"></div>
            <div class="h-10 w-3/4 rounded animate-pulse" :class="isDark ? 'bg-cosmic-700/60' : 'bg-purple-100'"></div>
            <div class="space-y-3 pt-4">
              <div class="h-4 rounded animate-pulse" :class="isDark ? 'bg-cosmic-700/40' : 'bg-purple-100/60'"></div>
              <div class="h-4 w-5/6 rounded animate-pulse" :class="isDark ? 'bg-cosmic-700/40' : 'bg-purple-100/60'"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error && !character" class="text-center py-24 space-y-4">
        <div class="text-6xl animate-float">🌌</div>
        <h2 class="font-heading text-2xl" :class="isDark ? 'text-white/60' : 'text-gray-500'">
          Character not found
        </h2>
        <p class="font-body text-sm" :class="isDark ? 'text-white/30' : 'text-gray-400'">
          Could not load this character. They might be hiding somewhere in the magic kingdom.
        </p>
        <RouterLink to="/" class="inline-block btn-primary mt-4">← Back Home</RouterLink>
      </div>

      <!-- Content -->
      <div v-else-if="character" class="animate-fade-in">
        <div class="grid md:grid-cols-2 gap-12 items-start">

          <!-- LEFT: Image -->
          <div class="relative group">
            <!-- Glow ring -->
            <div
              class="absolute -inset-1 rounded-3xl blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-70"
              :class="isDark ? 'bg-gradient-to-br from-star-blue via-star-purple to-star-gold' : 'bg-gradient-to-br from-violet-400 to-pink-400'"
            ></div>

            <div
              class="relative glass-card rounded-3xl overflow-hidden aspect-square flex items-center justify-center"
              :class="isDark ? 'bg-cosmic-800/60' : 'bg-purple-50/80'"
            >
              <!-- Decorative circles -->
              <div
                class="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
                :class="isDark ? 'bg-star-blue' : 'bg-violet-300'"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                :class="isDark ? 'bg-star-gold' : 'bg-pink-300'"
              ></div>

              <img
                v-if="character.image_url"
                :src="character.image_url"
                :alt="character.name"
                class="relative z-10 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              />
              <div v-else class="relative z-10 text-8xl animate-float">✨</div>
            </div>

            <!-- Disney ID tag -->
            <div
              class="absolute top-4 left-4 z-20 font-heading text-xs tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border"
              :class="isDark
                ? 'bg-cosmic-950/80 border-star-blue/30 text-star-blue'
                : 'bg-white/80 border-violet-200 text-violet-600'"
            >
              Disney #{{ character.disney_id }}
            </div>
          </div>

          <!-- RIGHT: Info -->
          <div class="space-y-8 pt-2">

            <!-- Name -->
            <div>
              <p
                class="font-heading text-xs tracking-widest uppercase mb-3"
                :class="isDark ? 'text-star-blue/60' : 'text-violet-400'"
              >
                Character Profile
              </p>
              <h1
                class="font-display text-4xl md:text-5xl font-bold leading-tight"
                :class="isDark ? 'text-white' : 'text-gray-900'"
              >
                {{ character.name }}
              </h1>
            </div>

            <!-- Divider -->
            <div
              class="h-px w-full"
              :class="isDark ? 'bg-gradient-to-r from-star-blue/30 via-star-purple/30 to-transparent' : 'bg-gradient-to-r from-violet-200 via-purple-200 to-transparent'"
            ></div>

            <!-- Films -->
            <div v-if="character.films?.length">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">🎬</span>
                <h2
                  class="font-heading text-sm tracking-widest uppercase"
                  :class="isDark ? 'text-star-gold' : 'text-yellow-600'"
                >
                  Films
                </h2>
                <span
                  class="ml-1 font-heading text-xs px-2 py-0.5 rounded-full"
                  :class="isDark ? 'bg-star-gold/20 text-star-gold' : 'bg-yellow-100 text-yellow-700'"
                >
                  {{ character.films.length }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="film in character.films"
                  :key="film"
                  class="badge badge-film text-sm px-3 py-1"
                >
                  {{ film }}
                </span>
              </div>
            </div>

            <!-- TV Shows -->
            <div v-if="character.tv_shows?.length">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">📺</span>
                <h2
                  class="font-heading text-sm tracking-widest uppercase"
                  :class="isDark ? 'text-star-blue' : 'text-blue-600'"
                >
                  TV Shows
                </h2>
                <span
                  class="ml-1 font-heading text-xs px-2 py-0.5 rounded-full"
                  :class="isDark ? 'bg-star-blue/20 text-star-blue' : 'bg-blue-100 text-blue-700'"
                >
                  {{ character.tv_shows.length }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="show in character.tv_shows"
                  :key="show"
                  class="badge badge-tv text-sm px-3 py-1"
                >
                  {{ show }}
                </span>
              </div>
            </div>

            <!-- Video Games -->
            <div v-if="character.video_games?.length">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">🎮</span>
                <h2
                  class="font-heading text-sm tracking-widest uppercase"
                  :class="isDark ? 'text-star-purple' : 'text-purple-600'"
                >
                  Video Games
                </h2>
                <span
                  class="ml-1 font-heading text-xs px-2 py-0.5 rounded-full"
                  :class="isDark ? 'bg-star-purple/20 text-star-purple' : 'bg-purple-100 text-purple-700'"
                >
                  {{ character.video_games.length }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="game in character.video_games"
                  :key="game"
                  class="badge badge-game text-sm px-3 py-1"
                >
                  {{ game }}
                </span>
              </div>
            </div>

            <!-- Allies -->
            <div v-if="character.allies?.length">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">🤝</span>
                <h2
                  class="font-heading text-sm tracking-widest uppercase"
                  :class="isDark ? 'text-green-400' : 'text-green-600'"
                >
                  Allies
                </h2>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="ally in character.allies"
                  :key="ally"
                  class="badge text-sm px-3 py-1"
                  :class="isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-700 border border-green-200'"
                >
                  {{ ally }}
                </span>
              </div>
            </div>

            <!-- Enemies -->
            <div v-if="character.enemies?.length">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">⚔️</span>
                <h2
                  class="font-heading text-sm tracking-widest uppercase"
                  :class="isDark ? 'text-red-400' : 'text-red-600'"
                >
                  Enemies
                </h2>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="enemy in character.enemies"
                  :key="enemy"
                  class="badge text-sm px-3 py-1"
                  :class="isDark ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-200'"
                >
                  {{ enemy }}
                </span>
              </div>
            </div>

            <!-- No appearances at all -->
            <div
              v-if="!character.films?.length && !character.tv_shows?.length && !character.video_games?.length"
              class="glass-card rounded-2xl p-6 text-center"
            >
              <div class="text-4xl mb-2">🌟</div>
              <p class="font-body text-sm" :class="isDark ? 'text-white/40' : 'text-gray-400'">
                No appearances listed yet for this character.
              </p>
            </div>

            <!-- Stats summary -->
            <div
              class="grid grid-cols-3 gap-3 pt-2"
            >
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="glass-card rounded-2xl p-4 text-center"
              >
                <div
                  class="font-display text-3xl font-bold"
                  :class="stat.color"
                >
                  {{ stat.value }}
                </div>
                <div
                  class="font-heading text-xs tracking-widest uppercase mt-1"
                  :class="isDark ? 'text-white/40' : 'text-gray-400'"
                >
                  {{ stat.label }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const character = ref(null)
const loading = ref(true)
const error = ref(null)

// Dark mode detection
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

// Stats computed from character data
const stats = computed(() => {
  if (!character.value) return []
  return [
    {
      label: 'Films',
      value: character.value.films?.length ?? 0,
      color: isDark.value ? 'text-star-gold' : 'text-yellow-600'
    },
    {
      label: 'TV Shows',
      value: character.value.tv_shows?.length ?? 0,
      color: isDark.value ? 'text-star-blue' : 'text-blue-600'
    },
    {
      label: 'Games',
      value: character.value.video_games?.length ?? 0,
      color: isDark.value ? 'text-star-purple' : 'text-purple-600'
    },
  ]
})

async function fetchCharacter(id) {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_URL}/characters/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    // API may wrap in { data: {...} } or return directly
    character.value = data.data ?? data
    // Update page title
    const siteName = import.meta.env.VITE_SITE_NAME || 'DisneyVerse'
    document.title = `${character.value.name} — ${siteName}`
  } catch (err) {
    error.value = err.message
    // Fallback: try to find in mock data
    const MOCK = [
      { id: 1, disney_id: 112, name: "Achilles", image_url: "https://static.wikia.nocookie.net/disney/images/6/67/HATS_Achilles.png", films: ["Hercules (film)"], tv_shows: ["Hercules (TV series)"], video_games: ["Kingdom Hearts III"], allies: [], enemies: [] },
      { id: 2, disney_id: 18, name: "Abigail the Cow", image_url: "https://static.wikia.nocookie.net/disney/images/0/05/Fox-disneyscreencaps_com-901.jpg", films: ["The Fox and the Hound", "The Fox and the Hound 2"], tv_shows: [], video_games: [], allies: [], enemies: [] },
      { id: 3, disney_id: 16, name: "Abdullah", image_url: "https://static.wikia.nocookie.net/disney/images/3/3a/Abdullah.jpg", films: ["Cheetah"], tv_shows: [], video_games: [], allies: [], enemies: [] },
      { id: 4, disney_id: 45, name: "Admiral Boom and Mr. Binnacle", image_url: "https://static.wikia.nocookie.net/disney/images/b/be/Marypoppins-disneyscreencaps_com-1086.jpg", films: ["Mary Poppins (film)", "Mary Poppins Returns"], tv_shows: [], video_games: [], allies: [], enemies: [] },
      { id: 5, disney_id: 7, name: ".GIFfany", image_url: "https://static.wikia.nocookie.net/disney/images/5/51/Giffany.png", films: [], tv_shows: ["Gravity Falls"], video_games: ["Disney Heroes: Battle Mode"], allies: [], enemies: [] },
      { id: 8, disney_id: 139, name: "Ahadi", image_url: "https://static.wikia.nocookie.net/disney/images/b/b3/Ahadihead.png", films: ["The Lion King", "The Lion King (2019 film)"], tv_shows: [], video_games: [], allies: [], enemies: [] },
    ]
    const found = MOCK.find(c => c.id === parseInt(id))
    if (found) character.value = found
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCharacter(route.params.id)
})

// Re-fetch if route ID changes
watch(() => route.params.id, (newId) => {
  if (newId) fetchCharacter(newId)
})
</script>
