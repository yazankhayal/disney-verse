<template>
  <Transition name="cookie-slide">
    <div v-if="showBanner" class="cookie-banner"
    >
      <div
        class="cookie-banner-inner max-w-4xl mx-auto rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
        :class="isDark ? 'bg-cosmic-950/90' : 'bg-white/90'"
      >
        <!-- Cookie icon + text -->
        <div class="flex items-start gap-4 flex-1">
          <div
            class="text-3xl animate-float flex-shrink-0"
          >🍪</div>
          <div>
            <h3
              class="font-heading text-sm font-bold tracking-wide mb-1"
              :class="isDark ? 'text-star-gold' : 'text-violet-700'"
            >
              Cookies & Magic Dust
            </h3>
            <p
              class="font-body text-sm leading-relaxed"
              :class="isDark ? 'text-white/60' : 'text-gray-600'"
            >
              We use cookies to enhance your journey through the Disney universe — personalising your experience, remembering your preferences, and sprinkling a little extra magic.
            </p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <button
            @click="decline"
            class="font-heading text-xs tracking-widest uppercase px-4 py-2 rounded-xl border transition-all duration-300"
            :class="isDark ? 'border-white/50 text-white/80 hover:border-white/40 hover:text-white' : 'border-gray-200 text-gray-800 hover:border-gray-300 hover:text-gray-700'"
          >
            Decline
          </button>
          <button
            @click="accept"
            class="btn-primary"
          >
            Accept All ✨
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({ isDark: Boolean })

const showBanner = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) {
    setTimeout(() => { showBanner.value = true }, 1500)
  }
})

function accept() {
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
}

function decline() {
  localStorage.setItem('cookie-consent', 'declined')
  showBanner.value = false
}
</script>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
