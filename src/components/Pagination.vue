<template>
  <div class="flex items-center justify-center gap-2 flex-wrap">
    <!-- Prev -->
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      :class="isDark
        ? 'border border-white/10 text-white/60 hover:border-star-blue/50 hover:text-star-blue hover:bg-star-blue/10'
        : 'border border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- Page numbers -->
    <template v-for="page in pages" :key="page">
      <span
        v-if="page === '...'"
        class="w-10 h-10 flex items-center justify-center font-body text-sm"
        :class="isDark ? 'text-white/30' : 'text-gray-400'"
      >
        ···
      </span>
      <button
        v-else
        @click="$emit('change', page)"
        class="w-10 h-10 rounded-xl font-heading text-sm transition-all duration-200"
        :class="page === currentPage
          ? isDark
            ? 'bg-gradient-to-r from-star-blue to-star-purple text-cosmic-950 font-bold shadow-glow-blue'
            : 'bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold shadow-md'
          : isDark
            ? 'border border-white/10 text-white/60 hover:border-star-blue/50 hover:text-star-blue hover:bg-star-blue/10'
            : 'border border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage >= lastPage"
      class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      :class="isDark
        ? 'border border-white/10 text-white/60 hover:border-star-blue/50 hover:text-star-blue hover:bg-star-blue/10'
        : 'border border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  lastPage: { type: Number, required: true },
  isDark: Boolean
})
defineEmits(['change'])

const pages = computed(() => {
  const total = props.lastPage
  const cur = props.currentPage
  const delta = 2
  const range = []
  const rangeWithDots = []

  range.push(1)
  for (let i = Math.max(2, cur - delta); i <= Math.min(total - 1, cur + delta); i++) {
    range.push(i)
  }
  if (total > 1) range.push(total)

  let l
  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l > 2) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
})
</script>
