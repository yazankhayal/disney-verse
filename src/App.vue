<template>
  <div :class="isDark ? 'dark' : ''" class="min-h-screen transition-colors duration-300">
    <div :class="isDark ? 'starfield-bg min-h-screen' : 'light-bg min-h-screen'">
      <TheHeader :is-dark="isDark" @toggle-dark="toggleDark" />

      <main class="relative z-10">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <TheFooter :is-dark="isDark" />
      <CookieBanner :is-dark="isDark" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import CookieBanner from './components/CookieBanner.vue'

const isDark = ref(true)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) isDark.value = saved === 'dark'
})

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
