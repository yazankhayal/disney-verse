<template>
  <div class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-2xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-body text-sm mb-4"
          :class="isDark ? 'border-star-pink/30 bg-star-pink/10 text-star-pink' : 'border-pink-200 bg-pink-50 text-pink-600'"
        >
          <span>💌</span> Get in Touch
        </div>
        <h1 class="font-display text-5xl md:text-6xl font-bold">
          <span :class="isDark ? 'shimmer-text' : 'light-shimmer-text'">Contact</span>
        </h1>
        <p class="font-body text-lg" :class="isDark ? 'text-white/50' : 'text-gray-500'">
          Have a suggestion, found a bug, or just want to say hi?
        </p>
      </div>

      <!-- Contact card -->
      <div class="glass-card rounded-3xl p-8 md:p-12">

        <!-- Success state -->
        <Transition name="fade">
          <div v-if="submitted" class="text-center py-8 space-y-4">
            <div class="text-6xl animate-float">🎉</div>
            <h3 class="font-heading text-2xl" :class="isDark ? 'text-white' : 'text-gray-900'">
              Message sent!
            </h3>
            <p class="font-body" :class="isDark ? 'text-white/50' : 'text-gray-500'">
              Thanks for reaching out. I'll get back to you soon.
            </p>
            <button @click="submitted = false" class="btn-primary mt-4">
              Send Another
            </button>
          </div>
        </Transition>

        <!-- Form -->
        <div v-if="!submitted" class="space-y-6">
          <div>
            <label class="block font-heading text-xs tracking-widest uppercase mb-2"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >Your Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Mickey Mouse"
              class="search-input"
            />
            <p v-if="errors && errors['name']" class="font-bold text-red-400">{{ errors['name'] }}</p>
          </div>

          <div>
            <label class="block font-heading text-xs tracking-widest uppercase mb-2"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="mickey@disney.com"
              class="search-input"
            />
            <p v-if="errors && errors['email']" class="font-bold text-red-400">{{ errors['email'] }}</p>
          </div>

          <div>
            <label class="block font-heading text-xs tracking-widest uppercase mb-2"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >Subject</label>
            <input
              v-model="form.subject"
              type="text"
              placeholder="How about mickey"
              class="search-input"
            />
            <p v-if="errors && errors['subject']" class="font-bold text-red-400">{{ errors['subject'] }}</p>
          </div>

          <div>
            <label class="block font-heading text-xs tracking-widest uppercase mb-2"
              :class="isDark ? 'text-white/50' : 'text-gray-500'"
            >Message</label>
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Your message here…"
              class="search-input resize-none"
            ></textarea>
            <p v-if="errors && errors['message']" class="font-bold text-red-400">{{ errors['message'] }}</p>
          </div>

          <button
            @click="submit"
            :disabled="!form.name || !form.email || !form.subject || !form.message"
            class="w-full btn-primary py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send Message ✨
          </button>
        </div>
      </div>

      <!-- Direct contact -->
      <div class="mt-8 text-center space-y-2">
        <p class="font-body text-sm" :class="isDark ? 'text-white/30' : 'text-gray-400'">
          Or reach me directly at
        </p>
        <a
          href="https://yazan-khayal.com"
          target="_blank"
          rel="noopener"
          class="font-heading text-sm tracking-wide transition-colors"
          :class="isDark ? 'text-star-gold hover:text-star-gold/80' : 'text-violet-600 hover:text-violet-800'"
        >
          yazan-khayal.com
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

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

const submitted = ref(false)
const errors = ref({})
const form = reactive({ name: '', email: '',subject: '', message: '' })
const API_MASTER_URL = import.meta.env.VITE_API_MASTER_URL || 'http://127.0.0.1:8000/api'

async function submit() {
  if (!form.name || !form.subject ||  !form.email || !form.message) return

  try {
    const res = await axios.post(`${API_MASTER_URL}/contact-post`, form)

    const data = res.data.data;
    const isSuccess = res.data.status === 'success';

    if(isSuccess){
      // Clear state data fields completely
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
      errors.value = null
      submitted.value = true
      alert(`Thanks ${form.name}! Your support ticket has been received.`)
    }
    else{
      for (const field in data) {
        for (const field in data) {
          if(data[field][0]){
            errors.value[field] = data[field][0];
          }
        }
      }
    }
    return res.data
  } catch (err) {
    console.error(err.response?.data || err.message)
  }

}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
