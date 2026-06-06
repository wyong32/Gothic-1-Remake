<template>
  <main class="page-main">
    <div class="container" :class="{ 'page-shell': items.length > 1 }">
      <nav v-if="items.length > 1" class="page-toc" aria-label="On this page">
        <header class="page-toc-head">
          <span class="page-toc-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 7H20M4 12H20M4 17H14"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <div class="page-toc-head-text">
            <p class="page-toc-label">On this page</p>
            <p class="page-toc-meta">{{ items.length }} sections</p>
          </div>
        </header>

        <ol class="page-toc-list">
          <li v-for="(item, index) in items" :key="item.slug">
            <button
              type="button"
              class="page-toc-link"
              :class="{ 'is-active': activeSlug === item.slug }"
              :aria-current="activeSlug === item.slug ? 'location' : undefined"
              @click="scrollToSection(item.slug)"
            >
              <span class="page-toc-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="page-toc-text">{{ item.title }}</span>
            </button>
          </li>
        </ol>
      </nav>

      <div ref="contentRef" class="page-content">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { usePageToc } from '@/composables/usePageToc'

const contentRef = ref(null)
const { items, activeSlug, scrollToSection } = usePageToc(contentRef)
</script>

<style scoped>
.page-shell {
  display: grid;
  grid-template-columns: minmax(13.5rem, 17.5rem) minmax(0, 1fr);
  gap: 2.75rem 3rem;
  align-items: start;
  min-width: 0;
}

.page-content {
  width: 100%;
  min-width: 0;
}

.page-shell .page-content {
  grid-column: 2;
}

.page-toc {
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  top: 5.5rem;
  align-self: start;
  width: 100%;
  max-height: calc(100vh - 6.5rem);
  overflow-y: auto;
  padding: 1.15rem 1.1rem 1.2rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background:
    linear-gradient(
      165deg,
      color-mix(in srgb, var(--color-bg-elevated) 94%, var(--color-accent) 6%) 0%,
      color-mix(in srgb, var(--color-bg-elevated) 90%, transparent) 100%
    )
    padding-box,
    var(--gradient-border-gold) border-box;
  box-shadow:
    var(--shadow-panel),
    inset 3px 0 0 color-mix(in srgb, var(--color-accent-4) 70%, var(--color-accent));
}

.page-toc-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.95rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 22%, var(--color-border));
}

.page-toc-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: calc(var(--radius-sm) + 1px);
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 32%, var(--color-border));
  box-shadow: 0 0 18px color-mix(in srgb, var(--color-accent) 12%, transparent);
}

.page-toc-head-text {
  min-width: 0;
  padding-top: 0.1rem;
}

.page-toc-label {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0.02em;
  color: var(--color-text);
}

.page-toc-meta {
  margin: 0.28rem 0 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.page-toc-list {
  display: grid;
  gap: 0.35rem;
  margin: 0;
  padding: 0 0 0 0.35rem;
  list-style: none;
  border-left: 1px solid color-mix(in srgb, var(--color-border) 75%, transparent);
}

.page-toc-link {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  width: 100%;
  padding: 0.62rem 0.7rem 0.62rem 0.85rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  color: color-mix(in srgb, var(--color-text) 72%, var(--color-muted));
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.45;
  text-align: left;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.page-toc-index {
  flex-shrink: 0;
  min-width: 1.5rem;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--color-accent-3) 80%, var(--color-muted));
}

.page-toc-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
}

.page-toc-link:hover {
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-accent) 8%, transparent);
  border-color: color-mix(in srgb, var(--color-accent) 24%, var(--color-border));
}

.page-toc-link.is-active {
  color: var(--color-text);
  font-weight: 600;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-accent) 18%, transparent),
    color-mix(in srgb, var(--color-accent-4) 8%, transparent)
  );
  border-color: color-mix(in srgb, var(--color-accent) 38%, var(--color-border-strong));
  box-shadow:
    inset 3px 0 0 var(--color-accent),
    0 0 20px color-mix(in srgb, var(--color-accent) 8%, transparent);
  transform: translateX(2px);
}

.page-toc-link.is-active .page-toc-index {
  color: var(--color-accent);
}

.page-toc-link:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

@media (max-width: 1024px) {
  .page-shell {
    grid-template-columns: 1fr;
  }

  .page-shell .page-content {
    grid-column: 1;
  }

  .page-toc {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-toc-link {
    transition: none;
  }

  .page-toc-link.is-active {
    transform: none;
  }
}
</style>
