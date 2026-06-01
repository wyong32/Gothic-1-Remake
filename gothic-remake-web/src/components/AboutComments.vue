<template>
  <div class="about-comments" aria-labelledby="about-comments-title">
    <header class="about-comments__head">
      <h3 id="about-comments-title">Community Notes</h3>
      <p>Share a tip, correction, or launch-week finding. Fan site — not official support.</p>
    </header>

    <p v-if="!configured" class="about-comments__notice" role="status">
      Comments are not configured yet. Set <code>VITE_COMMENT_API_KEY</code> for this deployment.
    </p>

    <template v-else>
      <form class="about-comments__form" @submit.prevent="submitComment">
        <label class="about-comments__field">
          <span>Display name <em>(optional)</em></span>
          <input
            v-model.trim="displayName"
            type="text"
            maxlength="120"
            autocomplete="nickname"
            placeholder="Convict handle"
          />
        </label>

        <label class="about-comments__field">
          <span>Message</span>
          <textarea
            v-model="message"
            rows="4"
            maxlength="2000"
            required
            placeholder="Quest flag bug, ore price tweak, camp route note…"
          ></textarea>
          <span class="about-comments__count" :class="{ 'is-limit': message.trim().length >= 1900 }">
            {{ message.trim().length }} / 2000
          </span>
        </label>

        <p v-if="formError" class="about-comments__error" role="alert">{{ formError }}</p>

        <button type="submit" class="about-comments__submit" :disabled="submitting || !canSubmit">
          {{ submitting ? 'Posting…' : 'Post note' }}
        </button>
      </form>

      <div class="about-comments__list-wrap">
        <p v-if="loadError" class="about-comments__error" role="alert">{{ loadError }}</p>
        <p v-else-if="loading" class="about-comments__status">Loading notes…</p>
        <p v-else-if="reviews.length === 0" class="about-comments__status">
          No notes yet — be the first to leave a valley report.
        </p>

        <ul v-else class="about-comments__list">
          <li v-for="review in reviews" :key="review.id">
            <article>
              <header>
                <strong>{{ review.authorDisplayName || 'Anonymous convict' }}</strong>
                <time :datetime="review.createdAt">{{ formatDate(review.createdAt) }}</time>
              </header>
              <p>{{ review.body }}</p>
            </article>
          </li>
        </ul>

        <nav
          v-if="totalPages > 1"
          class="about-comments__pager"
          aria-label="Comment pages"
        >
          <button type="button" :disabled="page <= 1 || loading" @click="goToPage(page - 1)">
            Newer
          </button>
          <span>Page {{ page }} / {{ totalPages }}</span>
          <button type="button" :disabled="page >= totalPages || loading" @click="goToPage(page + 1)">
            Older
          </button>
        </nav>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { commentConfig, isCommentApiConfigured } from '@/config/comments.js'
import { createReview, listReviews } from '@/lib/commentApi.js'

const props = defineProps({
  sectionSlug: {
    type: String,
    default: () => commentConfig.aboutSectionSlug,
  },
})

const NAME_KEY = 'gothic-remake-comment-name'

const configured = isCommentApiConfigured()
const displayName = ref(localStorage.getItem(NAME_KEY) || '')
const message = ref('')
const reviews = ref([])
const page = ref(1)
const pageSize = 10
const total = ref(0)
const loading = ref(false)
const submitting = ref(false)
const loadError = ref('')
const formError = ref('')

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const canSubmit = computed(() => {
  const body = message.value.trim()
  return body.length >= 1 && body.length <= 2000
})

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

async function fetchReviews() {
  if (!configured) return
  loading.value = true
  loadError.value = ''
  try {
    const result = await listReviews(props.sectionSlug, { page: page.value, pageSize })
    reviews.value = result?.data ?? []
    total.value = result?.total ?? 0
  } catch (err) {
    loadError.value = err instanceof Error ? err.message : 'Could not load comments.'
    reviews.value = []
  } finally {
    loading.value = false
  }
}

function goToPage(next) {
  page.value = next
}

async function submitComment() {
  if (!configured || !canSubmit.value || submitting.value) return
  formError.value = ''
  submitting.value = true
  const body = message.value.trim()
  const authorDisplayName = displayName.value.trim() || undefined

  try {
    if (authorDisplayName) {
      localStorage.setItem(NAME_KEY, authorDisplayName)
    }
    await createReview(props.sectionSlug, { body, authorDisplayName })
    message.value = ''
    page.value = 1
    await fetchReviews()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Could not post your note.'
  } finally {
    submitting.value = false
  }
}

watch(page, fetchReviews)
onMounted(fetchReviews)
</script>

<style scoped>
.about-comments {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  box-shadow: var(--shadow-panel);
}

.about-comments__head h3 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-accent-3);
}

.about-comments__head p {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--color-muted);
}

.about-comments__notice,
.about-comments__status {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-muted);
}

.about-comments__notice code {
  font-size: 0.78rem;
  color: color-mix(in srgb, var(--color-accent) 70%, var(--color-text));
}

.about-comments__form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-accent) 14%, var(--color-border));
}

.about-comments__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.about-comments__field span {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-accent-3) 85%, var(--color-muted));
}

.about-comments__field em {
  font-style: normal;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  color: var(--color-muted);
}

.about-comments__field input,
.about-comments__field textarea {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 88%, var(--color-bg-elevated));
  color: var(--color-text);
  font: inherit;
  font-size: 0.92rem;
  line-height: 1.5;
  resize: vertical;
}

.about-comments__field input:focus-visible,
.about-comments__field textarea:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 1px;
}

.about-comments__count {
  align-self: flex-end;
  font-size: 0.72rem;
  color: var(--color-muted);
}

.about-comments__count.is-limit {
  color: var(--color-accent-4);
}

.about-comments__error {
  margin: 0;
  padding: 0.55rem 0.7rem;
  border-radius: var(--radius-sm);
  border: 1px solid color-mix(in srgb, var(--color-accent-4) 45%, var(--color-border));
  background: color-mix(in srgb, var(--color-accent-4) 12%, var(--color-bg));
  color: color-mix(in srgb, var(--color-text) 90%, var(--color-accent-4));
  font-size: 0.84rem;
}

.about-comments__submit {
  align-self: flex-start;
  padding: 0.65rem 1.2rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: var(--gradient-ember);
  color: var(--color-on-cta);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: var(--shadow-glow-ember);
  transition: filter 0.2s ease, transform 0.2s ease;
}

.about-comments__submit:hover:not(:disabled) {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.about-comments__submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.about-comments__list-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 0;
}

.about-comments__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 22rem;
  overflow: auto;
  list-style: none;
  padding-right: 0.15rem;
}

.about-comments__list article {
  padding: 0.85rem 0.95rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 16%, var(--color-border));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg-elevated) 82%, transparent);
}

.about-comments__list header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.35rem 0.75rem;
  margin-bottom: 0.45rem;
}

.about-comments__list strong {
  font-size: 0.88rem;
  color: var(--color-text);
}

.about-comments__list time {
  font-size: 0.72rem;
  color: var(--color-muted);
}

.about-comments__list p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--color-text) 82%, var(--color-muted));
  white-space: pre-wrap;
}

.about-comments__pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: var(--color-muted);
}

.about-comments__pager button {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg-elevated) 80%, transparent);
  color: var(--color-text);
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}

.about-comments__pager button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
