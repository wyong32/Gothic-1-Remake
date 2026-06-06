<template>
  <PageWithToc v-if="category">
    <section class="page-hero-section" :aria-labelledby="`${category.slug}-title`">
      <div class="page-hero-content">
          <RouterLink to="/wiki" class="wiki-back-link">← Wiki categories</RouterLink>
          <p class="page-eyebrow">{{ category.title }} · Gothic 1 Remake</p>
          <h1 :id="`${category.slug}-title`">Gothic 1 Remake — Wiki Reference: {{ category.title }}</h1>
          <p class="page-intro">{{ category.description }}</p>
          <ul class="page-meta">
            <li><strong>Entries:</strong> {{ entryCount }}</li>
            <li><strong>Sections:</strong> {{ category.sections.length }}</li>
            <li><strong>Illustrated:</strong> {{ imageCount }}</li>
            <li><strong>Detailed:</strong> {{ detailedCount }}</li>
          </ul>
      </div>
    </section>

    <section
      v-for="section in category.sections"
      :key="section.id"
      class="page-body-section"
      :aria-labelledby="section.id"
    >
      <div class="page-body-content">
          <div class="wiki-section-head">
            <h2 :id="section.id">{{ section.title }}</h2>
            <span class="wiki-section-count">{{ section.entries.length }} entries</span>
          </div>
          <p v-if="section.intro" class="wiki-section-intro">{{ section.intro }}</p>

          <ul class="wiki-entry-list">
            <li v-for="entry in section.entries" :key="entry.name" class="wiki-entry-card">
              <div class="wiki-entry-card__visual">
                <img
                  v-if="entry.image"
                  :src="entry.image"
                  :alt="entry.name"
                  class="wiki-entry-card__thumb"
                  loading="lazy"
                  width="112"
                  height="112"
                />
                <span
                  v-else
                  class="wiki-entry-card__thumb wiki-entry-card__thumb--empty"
                  aria-hidden="true"
                >
                  {{ entryInitial(entry.name) }}
                </span>
              </div>

              <article class="wiki-entry-card__body">
                <header class="wiki-entry-card__head">
                  <h3>{{ entry.name }}</h3>
                  <ul v-if="entry.tags?.length" class="wiki-entry-card__tags">
                    <li v-for="tag in entry.tags" :key="tag">{{ tag }}</li>
                  </ul>
                </header>

                <p class="wiki-entry-card__intro">{{ entry.intro }}</p>

                <dl v-if="entry.facts?.length" class="wiki-entry-card__stats">
                  <div v-for="fact in entry.facts" :key="`${entry.name}-${fact.label}`">
                    <dt>{{ fact.label }}</dt>
                    <dd>{{ fact.value }}</dd>
                  </div>
                </dl>

                <aside v-if="entry.guideNote" class="wiki-entry-card__remake">
                  <strong>Remake guide note</strong>
                  {{ entry.guideNote }}
                </aside>
              </article>
            </li>
          </ul>
      </div>
    </section>

    <section class="page-body-section">
      <div class="page-body-content">
          <p class="wiki-footer-note">
            Lore and stats sourced from Gothic Wiki infobox data, condensed for the Remake guide.
            Gameplay tips appear where they differ from classic Gothic 1.
          </p>
          <nav class="page-links">
            <RouterLink to="/wiki">All categories</RouterLink>
            <RouterLink to="/quests-story">Quest directory</RouterLink>
            <RouterLink to="/interactive-map">Map atlas</RouterLink>
          </nav>
      </div>
    </section>
  </PageWithToc>

  <main v-else class="page-main wiki-not-found">
    <div class="container">
      <h1>Wiki category not found</h1>
      <p>The category you requested does not exist in this guide.</p>
      <RouterLink to="/wiki">Return to wiki index</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getWikiCategory } from '@/wiki'
import '@/wiki/wiki.css'

const route = useRoute()

const category = computed(() => getWikiCategory(route.params.slug))

const entryCount = computed(
  () => category.value?.sections.reduce((sum, s) => sum + (s.entries?.length || 0), 0) ?? 0,
)

const imageCount = computed(() => {
  if (!category.value) return 0
  return category.value.sections.reduce(
    (sum, section) => sum + section.entries.filter((entry) => entry.image).length,
    0,
  )
})

const detailedCount = computed(() => {
  if (!category.value) return 0
  return category.value.sections.reduce(
    (sum, section) => sum + section.entries.filter((entry) => entry.facts?.length).length,
    0,
  )
})

function entryInitial(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase() || '?'
}
</script>

<style scoped>
.page-body-section {
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
}
</style>
