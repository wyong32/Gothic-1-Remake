<template>
  <main class="page-main">
    <div class="container">
      <section class="page-hero-section" aria-labelledby="wiki-title">
        <div class="page-hero-content">
          <p class="page-eyebrow">Encyclopedia Index</p>
          <h1 id="wiki-title">Gothic 1 Remake Wiki</h1>
          <p class="page-intro">
            Twelve reference categories with infobox stats, lore intros, and local artwork — Gods,
            Regions, Characters, Bestiary, Quests, Artifacts, Weapons, Armors, Potions, Runes,
            Trophies, and Other. For walkthroughs use
            <RouterLink to="/beginner">Beginner</RouterLink> or
            <RouterLink to="/quests-story">Quests &amp; Story</RouterLink>.
          </p>
          <ul class="page-meta">
            <li><strong>Categories:</strong> {{ categories.length }}</li>
            <li><strong>Total entries:</strong> {{ totalEntries }}</li>
            <li><strong>Updated:</strong> May 28, 2026</li>
          </ul>
        </div>
      </section>

      <section class="page-body-section">
        <div class="page-body-content">
          <h2 class="wiki-index-heading">Browse Gothic 1 Remake Wiki Categories</h2>
          <p class="wiki-section-intro">
            Each tile opens a detailed list — key stats from Gothic Wiki infoboxes plus Remake guide
            notes where relevant.
          </p>

          <div class="wiki-index-stats" aria-label="Wiki overview">
            <div class="wiki-index-stat">
              <strong>{{ categories.length }}</strong>
              <span>Categories</span>
            </div>
            <div class="wiki-index-stat">
              <strong>{{ totalEntries }}</strong>
              <span>Total entries</span>
            </div>
            <div class="wiki-index-stat">
              <strong>{{ illustratedEntries }}</strong>
              <span>With artwork</span>
            </div>
          </div>

          <nav class="wiki-bento" aria-label="Wiki categories">
            <RouterLink
              v-for="cat in categories"
              :key="cat.slug"
              :to="`/wiki/${cat.slug}`"
              class="wiki-bento__tile"
              :class="accentClass(cat.accent)"
            >
              <span class="wiki-bento__count">{{ cat.entryCount }} entries</span>
              <h3>{{ cat.title }}</h3>
              <p>{{ cat.description }}</p>
              <span class="wiki-bento__link">View reference list →</span>
            </RouterLink>
          </nav>

          <p class="wiki-footer-note">
            Fan reference for Alkimia Interactive's 2026 remake — not affiliated with THQ Nordic.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getAllWikiCategories } from '@/wiki'
import imageManifest from '@/wiki/imageManifest.json'
import '@/wiki/wiki.css'

const categories = getAllWikiCategories()
const totalEntries = computed(() => categories.reduce((sum, cat) => sum + cat.entryCount, 0))
const illustratedEntries = computed(() => Object.keys(imageManifest).length)

function accentClass(accent) {
  const map = {
    accent: 'wiki-bento__tile--accent',
    ember: 'wiki-bento__tile--ember',
    'camp-new': 'wiki-bento__tile--camp-new',
    swamp: 'wiki-bento__tile--swamp',
    'accent-3': 'wiki-bento__tile--gold',
  }
  return map[accent] || 'wiki-bento__tile--accent'
}
</script>

<style scoped>
.wiki-index-heading {
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  margin-bottom: 0.5rem;
}

.page-body-section {
  padding-bottom: 4rem;
}
</style>
