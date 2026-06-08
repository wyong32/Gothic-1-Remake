<template>
  <PageWithToc v-if="guide" :key="guide.addressBar">
<GptAdSlot page-id="guide-detail" slot-id="1" unit="inter" />
    
    <section class="page-hero-section guide-detail-hero" :aria-labelledby="`${guide.addressBar}-title`">
      <div class="page-hero-split">
        <div class="page-hero-content">
          <RouterLink to="/guides" class="guide-back-link">← All guides</RouterLink>
          <p class="page-eyebrow">Player guide · {{ formattedDate }}</p>
          <h1 :id="`${guide.addressBar}-title`">{{ guide.title }}</h1>
          <p class="page-intro">{{ guide.description }}</p>
          <ul class="page-meta">
            <li><strong>Published:</strong> {{ formattedDate }}</li>
            <li><strong>Updated:</strong> {{ formattedDate }}</li>
          </ul>
          <ul class="guide-tag-row">
            <li v-for="tag in guide.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
        <figure class="page-hero-media">
          <img :src="guide.imageUrl" :alt="guide.imageAlt" loading="eager" width="640" height="360" />
        </figure>
      </div>
    </section>

    <section class="page-body-section">
<GptAdSlot page-id="guide-detail" slot-id="2" :unit="1" />

      <div class="page-body-content guide-detail-body" v-html="guide.detailsHtml" />

<GptAdSlot page-id="guide-detail" slot-id="3" :unit="2" />
    </section>

    <section class="page-body-section">
      <div class="page-body-content">
          <nav class="guide-footer-nav">
            <RouterLink to="/guides">← Back to guide list</RouterLink>
            <RouterLink to="/beginner">Beginner survival guide</RouterLink>
          </nav>
      </div>
    </section>
  </PageWithToc>

  <main v-else class="page-main guide-not-found">
    <div class="container">
      <h1>Guide not found</h1>
      <p>That article does not exist yet.</p>
      <RouterLink to="/guides">Return to guides</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import guides from '@/data/guides.js'
import '@/assets/styles/guides.css'

const route = useRoute()
const guide = computed(
  () => guides.find((item) => item.addressBar === route.params.slug) ?? null,
)

const formattedDate = computed(() => {
  if (!guide.value?.publishDate) return ''
  return new Date(`${guide.value.publishDate}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<style scoped>
.page-body-section {
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
}

.guide-detail-body {
  display: grid;
  gap: 1rem;
}

.guide-detail-body :deep(h2) {
  margin-top: 1.5rem;
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  scroll-margin-top: 6rem;
}

.guide-detail-body :deep(h2:first-child) {
  margin-top: 0;
}

.guide-detail-body :deep(p) {
  font-size: 0.95rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-muted));
}

.guide-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
