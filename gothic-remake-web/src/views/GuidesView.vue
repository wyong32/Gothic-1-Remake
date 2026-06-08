<template>
  <main class="page-main">
    <div class="container">
<GptAdSlot page-id="guides" slot-id="1" unit="inter" />
    
      <section class="page-hero-section" aria-labelledby="guides-title">
        <div class="page-hero-content">
          <p class="page-eyebrow">Player Guides</p>
          <h1 id="guides-title">Gothic 1 Remake — Player Guides, Tips &amp; Remake Deep Dives</h1>
          <p class="page-intro">
            Long-form write-ups for systems the wiki does not explain — Remake changes, combat rhythm,
            economy loops, and launch-week fixes. Pick an article, read the sections, skip what you
            already know.
          </p>
          <ul class="page-meta">
            <li><strong>Articles:</strong> {{ guides.length }}</li>
            <li><strong>Format:</strong> Sectioned guides with tables and lists</li>
            <li><strong>Scope:</strong> Remake-first, 2001 baseline where noted</li>
          </ul>
        </div>
      </section>

<GptAdSlot page-id="guides" slot-id="2" :unit="1" />

      <section class="page-body-section">
        <div class="page-body-content">
          <h2 class="guides-index-heading">All Gothic 1 Remake Guides</h2>
          <p class="guides-index-intro">
            New articles land here as we verify them against the June 5 build. First up: what the
            Remake actually changed compared to retail Gothic.
          </p>

          <ul class="guide-index-list">
            <li v-for="guide in guides" :key="guide.addressBar">
              <RouterLink :to="`/guides/${guide.addressBar}`" class="guide-index-card">
                <div class="guide-index-card__media">
                  <img :src="guide.imageUrl" :alt="guide.imageAlt" loading="lazy" width="640" height="360" />
                </div>
                <div class="guide-index-card__body">
                  <p class="guide-index-card__date">{{ formatDate(guide.publishDate) }}</p>
                  <h3>{{ guide.title }}</h3>
                  <p class="guide-index-card__desc">{{ guide.description }}</p>
                  <ul class="guide-index-card__tags">
                    <li v-for="tag in guide.tags.slice(0, 6)" :key="tag">{{ tag }}</li>
                    <li v-if="guide.tags.length > 6" class="guide-index-card__more">+{{ guide.tags.length - 6 }}</li>
                  </ul>
                  <span class="guide-index-card__cta">Read guide →</span>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </section>

<GptAdSlot page-id="guides" slot-id="3" :unit="2" />
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import guides from '@/data/guides.js'
import '@/assets/styles/guides.css'

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.guides-index-heading {
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  margin-bottom: 0.5rem;
}

.guides-index-intro {
  max-width: 68ch;
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.65;
}

.page-body-section {
  padding-bottom: 4rem;
}
</style>
