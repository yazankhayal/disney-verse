# ✨ DisneyVerse

A creative, dark-mode-first Vue 3 character encyclopedia for the Disney universe.

## Tech Stack

- **Vue 3** + Composition API
- **Vite** — fast build tooling
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Vue Router 4** — SPA navigation

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://127.0.0.1:8000/api   # Your Laravel API base URL
VITE_SITE_NAME=DisneyVerse               # Site display name
VITE_ENV=production                      # "production" or "development"
```

> In `development` mode, if the API is unavailable, mock data will load automatically.

## Project Structure

```
src/
├── components/
│   ├── TheHeader.vue       — Fixed nav with dark mode toggle
│   ├── TheFooter.vue       — Links, credits, legal
│   ├── CookieBanner.vue    — Animated cookie consent
│   ├── CharacterCard.vue   — Individual character card
│   └── Pagination.vue      — Smart page number component
├── composables/
│   └── useCharacters.js    — API fetching, search, pagination logic
├── pages/
│   ├── HomePage.vue        — Characters grid with search
│   ├── AboutPage.vue       — Project info page
│   └── ContactPage.vue     — Contact form page
├── App.vue                 — Root, dark mode state, routing
├── main.js                 — App bootstrap
└── style.css               — Tailwind + custom CSS
```

## Features

- 🌙 Dark mode (default) / ☀️ Light mode toggle with localStorage persistence
- 🔍 Debounced character search
- 📄 Full pagination (492 pages / 9,821+ characters)
- 🍪 Cookie consent banner
- ✨ Animated character cards with hover effects
- 📱 Fully responsive mobile layout
- 🏷️ Film / TV / Games badges per character
- ⚡ Skeleton loading states

## Developer

Built by **Yazan Khayal** — [yazan-khayal.com](https://yazan-khayal.com)
