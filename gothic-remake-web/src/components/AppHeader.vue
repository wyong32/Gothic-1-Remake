<template>
  <header class="site-header">
    <div class="container">
      <div class="site-header-content">
        <RouterLink to="/" class="site-logo" aria-label="Gothic 1 Remake Guide Home">
          <img
            class="site-logo-image"
            src="/images/logo.webp"
            alt=""
            width="40"
            height="40"
          />
          <span class="site-logo-text">
            <strong>Gothic 1 Remake</strong>
          </span>
        </RouterLink>

        <button
          type="button"
          class="nav-toggle"
          :aria-expanded="menuOpen"
          aria-controls="site-nav"
          @click="menuOpen = !menuOpen"
        >
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>

        <nav id="site-nav" class="site-nav" :class="{ 'is-open': menuOpen }" aria-label="Primary">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/beginner">Beginner</RouterLink>
          <RouterLink to="/wiki">Wiki</RouterLink>
          <RouterLink to="/factions-builds">Factions &amp; Builds</RouterLink>
          <RouterLink to="/quests-story">Quests &amp; Story</RouterLink>
          <RouterLink to="/guides">Guides</RouterLink>
          <RouterLink to="/interactive-map">Interactive Map</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const menuOpen = ref(false)
const route = useRoute()

watch(
  () => route.path,
  () => {
    menuOpen.value = false
  },
)
</script>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-bg) 94%, transparent) 0%,
      color-mix(in srgb, var(--color-bg) 86%, transparent) 100%
    );
  border-bottom: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
  backdrop-filter: blur(16px);
}

.site-header-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 4.25rem;
}

.site-logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: var(--color-text);
}

.site-logo-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.site-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.site-logo-text strong {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-surface);
  cursor: pointer;
}

.nav-toggle-bar {
  display: block;
  width: 1.1rem;
  height: 2px;
  margin: 0 auto;
  background: var(--color-text);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.15rem 1.5rem;
}

.site-nav a {
  position: relative;
  padding: 0.35rem 0;
  color: var(--color-muted);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.site-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-barrier);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
  box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent) 40%, transparent);
}

.site-nav a:hover,
.site-nav a.router-link-active {
  color: color-mix(in srgb, var(--color-text) 92%, var(--color-accent));
}

.site-nav a.router-link-active::after {
  transform: scaleX(1);
}

@media (max-width: 1024px) {
  .nav-toggle {
    display: flex;
  }

  .site-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem clamp(1rem, 3vw, 2rem) 1rem;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    display: none;
  }

  .site-nav.is-open {
    display: flex;
  }

  .site-nav a {
    padding: 0.85rem 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
  }

  .site-nav a::after {
    display: none;
  }
}

@media (max-width: 768px) {
  .site-header-content {
    min-height: 3.75rem;
    gap: 1rem;
  }

  .site-logo-text strong {
    font-size: 1rem;
  }

  .site-nav {
    max-height: calc(100vh - 3.75rem);
    overflow-y: auto;
  }
}
</style>
