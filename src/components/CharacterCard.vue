<template>
  <RouterLink
    :to="`/disney/${character.id}-${slugify(character.name)}`"
    class="block"
  >
    <article
      class="character-card group"
      :style="{ animationDelay: `${index * 60}ms` }"
    >
      <!-- Image area -->
      <div class="relative h-52 overflow-hidden">
        <div
          class="absolute inset-0 transition-opacity duration-500"
          :class="isDark
            ? 'bg-gradient-to-br from-cosmic-700/80 to-cosmic-900/80'
            : 'bg-gradient-to-br from-violet-100 to-purple-100'"
        ></div>

        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          :class="isDark
            ? 'bg-gradient-to-t from-star-blue/20 to-transparent'
            : 'bg-gradient-to-t from-violet-300/30 to-transparent'"
        ></div>

        <img
          v-if="character.image_url"
          :src="character.image_url"
          :alt="character.name"
          class="relative z-10 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div
          v-else
          class="relative z-10 w-full h-full flex items-center justify-center text-6xl"
        >
          ✨
        </div>

        <div
          class="absolute top-3 right-3 z-20 font-heading text-xs tracking-wide px-2 py-1 rounded-full"
          :class="isDark ? 'bg-cosmic-950/80 text-star-blue/80' : 'bg-white/80 text-violet-500'"
        >
          #{{ character.disney_id }}
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 space-y-3">
        <h3
          class="font-heading text-base font-semibold leading-tight truncate transition-colors"
          :class="isDark ? 'text-white group-hover:text-star-gold' : 'text-gray-900 group-hover:text-violet-700'"
        >
          {{ character.name }}
        </h3>

        <div class="space-y-2 min-h-[60px]">
          <div v-if="character.films?.length" class="flex flex-wrap gap-1">
            <span
              v-for="film in character.films.slice(0, 2)"
              :key="film"
              class="badge"
              :class="isDark ? 'badge-film' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'"
            >
              🎬 {{ truncate(film, 20) }}
            </span>
            <span
              v-if="character.films.length > 2"
              class="badge"
              :class="isDark ? 'bg-white/10 text-white/40 border border-white/10' : 'bg-gray-100 text-gray-500 border border-gray-200'"
            >
              +{{ character.films.length - 2 }}
            </span>
          </div>

          <div v-if="character.tv_shows?.length" class="flex flex-wrap gap-1">
            <span
              v-for="show in character.tv_shows.slice(0, 1)"
              :key="show"
              class="badge"
              :class="isDark ? 'badge-tv' : 'bg-blue-100 text-blue-700 border border-blue-200'"
            >
              📺 {{ truncate(show, 20) }}
            </span>
            <span
              v-if="character.tv_shows.length > 1"
              class="badge"
              :class="isDark ? 'bg-white/10 text-white/40 border border-white/10' : 'bg-gray-100 text-gray-500 border border-gray-200'"
            >
              +{{ character.tv_shows.length - 1 }}
            </span>
          </div>

          <div v-if="character.video_games?.length" class="flex flex-wrap gap-1">
            <span
              class="badge"
              :class="isDark ? 'badge-game' : 'bg-purple-100 text-purple-700 border border-purple-200'"
            >
              🎮 {{ truncate(character.video_games[0], 18) }}
            </span>
          </div>

          <div
            v-if="!character.films?.length && !character.tv_shows?.length && !character.video_games?.length"
            class="font-body text-xs"
            :class="isDark ? 'text-white/25' : 'text-gray-300'"
          >
            No appearances listed
          </div>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
defineProps({
  character: { type: Object, required: true },
  isDark: Boolean,
  index: { type: Number, default: 0 }
})

function slugify(name) {
  if (!name) return 'character'
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function truncate(str, len) {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '…' : str
}
</script>
