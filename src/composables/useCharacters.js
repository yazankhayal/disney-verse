import { ref, watch } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export function useCharacters() {
  const characters = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const lastPage = ref(1)
  const total = ref(0)
  const search = ref('')
  const searchTimeout = ref(null)

  async function fetchCharacters(page = 1, query = '') {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams({ page })
      if (query) params.set('search', query)

      const res = await fetch(`${API_URL}/characters?${params}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      characters.value = data.data || []
      currentPage.value = data.meta?.current_page || page
      lastPage.value = data.meta?.last_page || 1
      total.value = data.meta?.total || 0
    } catch (err) {
      error.value = err.message
      // Use mock data in development
      if (import.meta.env.VITE_ENV !== 'production') {
        characters.value = MOCK_DATA
        lastPage.value = 492
        total.value = 9821
      }
    } finally {
      loading.value = false
    }
  }

  function onSearch(query) {
    search.value = query
    clearTimeout(searchTimeout.value)
    searchTimeout.value = setTimeout(() => {
      currentPage.value = 1
      fetchCharacters(1, query)
    }, 400)
  }

  function goToPage(page) {
    currentPage.value = page
    fetchCharacters(page, search.value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    characters,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    search,
    fetchCharacters,
    onSearch,
    goToPage
  }
}

// Mock data for local development / when API is unavailable
const MOCK_DATA = [
  { id: 1, disney_id: 112, name: "Achilles", image_url: "https://static.wikia.nocookie.net/disney/images/6/67/HATS_Achilles.png", films: ["Hercules (film)"], tv_shows: ["Hercules (TV series)"], video_games: ["Kingdom Hearts III"] },
  { id: 2, disney_id: 18, name: "Abigail the Cow", image_url: "https://static.wikia.nocookie.net/disney/images/0/05/Fox-disneyscreencaps_com-901.jpg", films: ["The Fox and the Hound", "The Fox and the Hound 2"], tv_shows: [], video_games: [] },
  { id: 3, disney_id: 16, name: "Abdullah", image_url: "https://static.wikia.nocookie.net/disney/images/3/3a/Abdullah.jpg", films: ["Cheetah"], tv_shows: [], video_games: [] },
  { id: 4, disney_id: 45, name: "Admiral Boom and Mr. Binnacle", image_url: "https://static.wikia.nocookie.net/disney/images/b/be/Marypoppins-disneyscreencaps_com-1086.jpg", films: ["Mary Poppins (film)", "Mary Poppins Returns"], tv_shows: [], video_games: [] },
  { id: 5, disney_id: 7, name: ".GIFfany", image_url: "https://static.wikia.nocookie.net/disney/images/5/51/Giffany.png", films: [], tv_shows: ["Gravity Falls"], video_games: ["Disney Heroes: Battle Mode"] },
  { id: 8, disney_id: 139, name: "Ahadi", image_url: "https://static.wikia.nocookie.net/disney/images/b/b3/Ahadihead.png", films: ["The Lion King", "The Lion King (2019 film)"], tv_shows: [], video_games: [] },
  { id: 15, disney_id: 310, name: "Queen Ariel", image_url: "https://static.wikia.nocookie.net/disney/images/e/e8/Char_49883.jpg", films: [], tv_shows: ["DuckTales"], video_games: [] },
  { id: 19, disney_id: 342, name: "Aspen", image_url: "https://static.wikia.nocookie.net/disney/images/8/8b/Bedtime_stories_aspen.jpg", films: ["Bedtime Stories"], tv_shows: [], video_games: [] },
  { id: 20, disney_id: 347, name: "Astuto", image_url: "https://static.wikia.nocookie.net/disney/images/3/3e/Lion_Guard_S03E014_-_Astuto_%28fox%29_Profile.jpg", films: [], tv_shows: ["The Lion Guard"], video_games: [] },
]
