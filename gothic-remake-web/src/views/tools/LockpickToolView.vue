<template>
  <PageWithToc>
    <section class="page-hero-section" aria-labelledby="lockpick-title">
      <div class="page-hero-content">
        <p class="page-eyebrow">Tools · Lockpicking</p>
        <h1 id="lockpick-title">Gothic 1 Remake Lockpick Calculator</h1>
        <p class="page-intro">
          A practical Gothic 1 Remake lockpicking tool for locked chests and doors. Enter the current
          groove positions, define slot links, and calculate the chest combination as a bounded state
          search. Target state is all active slots at position 3.
        </p>
        <ul class="page-meta">
          <li><strong>Input:</strong> slots, positions, link rules</li>
          <li><strong>Range:</strong> 0-6 per slot</li>
          <li><strong>Status:</strong> Manual solver ready</li>
        </ul>
        <ul class="tag-row" aria-label="Lockpick tool topics">
          <li>Chest locks</li>
          <li>Door locks</li>
          <li>Shortest path</li>
          <li>Patch data pending</li>
        </ul>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="solver-title">
      <div class="page-body-content">
          <h2 id="solver-title">Solver</h2>
          <div class="lockpick-layout">
            <form class="tool-panel lockpick-form" @submit.prevent="calculate">
              <div class="field-row">
                <label class="field">
                  <span>Slots</span>
                  <select v-model.number="slotCount">
                    <option v-for="count in slotOptions" :key="count" :value="count">{{ count }}</option>
                  </select>
                </label>
                <button type="button" class="secondary-button" @click="resetForm">Reset</button>
              </div>

              <div class="slot-grid" :style="{ '--slot-count': slotCount }">
                <label v-for="slot in activeSlots" :key="slot" class="slot-input">
                  <span>{{ slot }}</span>
                  <input
                    v-model.number="positions[slotIndex(slot)]"
                    type="number"
                    min="0"
                    max="6"
                    inputmode="numeric"
                    :aria-label="`${slot} start position`"
                  />
                </label>
              </div>

              <label class="field">
                <span>Rules</span>
                <textarea
                  v-model.trim="rulesText"
                  rows="4"
                  spellcheck="false"
                  placeholder="B:C+,E-;D:B+,E-;E:B-,C+,F-;F:E+"
                />
              </label>

              <div class="button-row">
                <button type="submit" class="primary-button">Calculate</button>
                <button type="button" class="secondary-button" :disabled="!steps.length" @click="copySteps">
                  Copy Steps
                </button>
                <RouterLink class="secondary-link" to="/tools/lockpick-submit">Report this lock</RouterLink>
              </div>

              <p v-if="copyStatus" class="copy-status">{{ copyStatus }}</p>
            </form>

            <aside class="tool-panel result-panel" aria-live="polite">
              <div class="result-head">
                <p class="result-label">Result</p>
                <span class="status-pill" :class="statusClass">{{ statusLabel }}</span>
              </div>

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <template v-else-if="steps.length">
                <p class="result-summary">
                  {{ steps.length }} steps to reach {{ targetSummary }}.
                </p>
                <ol class="step-output">
                  <li v-for="(step, index) in steps" :key="`${step.slot}-${step.dir}-${index}`">
                    <span class="step-index">{{ String(index + 1).padStart(2, '0') }}</span>
                    <strong>{{ step.slot }}</strong>
                    <span>{{ step.dir > 0 ? 'Positive' : 'Negative' }}</span>
                    <code>{{ step.dir > 0 ? '+1' : '-1' }}</code>
                  </li>
                </ol>
              </template>
              <p v-else class="empty-result">
                No plan calculated yet. Current positions must be numbers from 0 to 6.
              </p>
            </aside>
          </div>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="rules-title">
      <div class="page-body-content">
          <h2 id="rules-title">Rule Format</h2>
          <div class="reference-grid">
            <article>
              <h3>Slot Names</h3>
              <p>Use uppercase letters from A upward. A is the first active slot in your screen order.</p>
            </article>
            <article>
              <h3>Links</h3>
              <p><code>B:C+,E-</code> means turning B moves C in the same direction and E opposite.</p>
            </article>
            <article>
              <h3>Independent Slots</h3>
              <p>If a slot only moves itself, leave it out of the rules. The solver always moves the selected slot.</p>
            </article>
          </div>

          <table class="data-table rule-table">
            <caption>Example rule tokens</caption>
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>A:B+</code></td>
                <td>When A is turned, B moves in the same direction.</td>
              </tr>
              <tr>
                <td><code>A:C-</code></td>
                <td>When A is turned, C moves in the opposite direction.</td>
              </tr>
              <tr>
                <td><code>A:B+,C-</code></td>
                <td>Multiple affected slots can be listed after one source slot.</td>
              </tr>
              <tr>
                <td><code>A:B+;D:E-</code></td>
                <td>Different source slots are separated with semicolons.</td>
              </tr>
            </tbody>
          </table>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="faq-title">
      <div class="page-body-content">
          <h2 id="faq-title">Lockpicking FAQ</h2>
          <dl class="faq-list">
            <div v-for="item in faqItems" :key="item.question" class="faq-item">
              <dt>{{ item.question }}</dt>
              <dd>{{ item.answer }}</dd>
            </div>
          </dl>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="database-title">
      <div class="page-body-content">
          <h2 id="database-title">Known Locks</h2>
          <div class="database-panel">
            <div>
              <p class="database-status">DATABASE INTAKE</p>
              <p>
                Known chest and door records will load here after we convert shared sheet data into
                verified entries with location, slot count, rules, start positions, patch version, and
                source status.
              </p>
              <RouterLink class="submit-link" to="/tools/lockpick-submit">Submit lock data</RouterLink>
            </div>
            <dl class="database-schema">
              <div>
                <dt>VERIFIED</dt>
                <dd>Re-tested against the listed patch.</dd>
              </div>
              <div>
                <dt>PLAYER-REPORTED</dt>
                <dd>Complete data, not yet re-tested.</dd>
              </div>
              <div>
                <dt>PARTIAL</dt>
                <dd>Rules or start positions still missing.</dd>
              </div>
            </dl>
            <p class="database-log">
              Last updated: June 2026 · Current intake target: Patch v1.0.4 · Database status: manual
              review only.
            </p>
          </div>
      </div>
    </section>
  </PageWithToc>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import PageWithToc from '@/components/PageWithToc.vue'
import { injectJsonLd, resolveCanonicalUrl } from '@/seo/documentMeta.js'
import {
  POSITION_MAX,
  POSITION_MIN,
  SLOT_COUNT_OPTIONS,
  SLOT_LETTERS,
  TARGET_POSITION,
  parseRules,
  slotIndex,
  solveLockpick,
} from '@/lib/lockpickSolver.js'

const slotOptions = SLOT_COUNT_OPTIONS
const faqItems = [
  {
    question: 'What does the Gothic 1 Remake lockpick calculator solve?',
    answer:
      'It solves the groove puzzle used by locked chests and doors. You provide the current 0-6 slot positions and the link rules; the calculator returns a safe step order.',
  },
  {
    question: 'How do I open locked chests with this tool?',
    answer:
      'Read the slot positions from the lock screen, enter the rules for linked slots, click Calculate, then follow the generated slot steps in order.',
  },
  {
    question: 'Is every chest combination target position 3?',
    answer:
      'Current tested data uses position 3 as the aligned target for every active slot. If a later patch adds an exception, that lock should be marked separately in Known Locks.',
  },
  {
    question: 'Does this tool work for doors too?',
    answer:
      'Yes. Door locks and chest locks use the same slot-and-groove model in the footage we checked. The database keeps Chest and Door as separate types for review.',
  },
  {
    question: 'Why does the page not run an auto-lockpick macro?',
    answer:
      'The web tool only calculates the sequence. It does not send keys to the game window, because browser-based input automation is unsafe and unreliable for players.',
  },
]

const slotCount = ref(6)
const positions = ref([0, 0, 0, 0, 0, 0, 0, 0])
const rulesText = ref('')
const steps = ref([])
const errorMessage = ref('')
const alreadyAligned = ref(false)
const copyStatus = ref('')

const activeSlots = computed(() => SLOT_LETTERS.slice(0, slotCount.value))
const targetSummary = computed(() =>
  activeSlots.value.map((slot) => `${slot}=${TARGET_POSITION}`).join(', '),
)
const statusLabel = computed(() => {
  if (errorMessage.value) return 'Blocked'
  if (steps.value.length) return 'Solved'
  if (alreadyAligned.value) return 'Already aligned'
  return 'Ready'
})
const statusClass = computed(() => {
  if (errorMessage.value) return 'status-pill--error'
  if (steps.value.length || alreadyAligned.value) return 'status-pill--ok'
  return 'status-pill--idle'
})

watch(slotCount, (count) => {
  for (let index = count; index < positions.value.length; index += 1) {
    positions.value[index] = 0
  }
  clearResult()
})

watch([positions, rulesText], clearResult, { deep: true })

onMounted(() => {
  injectJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Gothic 1 Remake Lockpick Calculator',
        description:
          'Gothic 1 Remake lockpicking tool for locked chests and doors. Enter slot positions and link rules to calculate a safe chest combination.',
        url: resolveCanonicalUrl('/tools/lockpick'),
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  })
})

function clearResult() {
  steps.value = []
  errorMessage.value = ''
  alreadyAligned.value = false
  copyStatus.value = ''
}

function resetForm() {
  slotCount.value = 6
  positions.value = [0, 0, 0, 0, 0, 0, 0, 0]
  rulesText.value = ''
  clearResult()
}

function calculate() {
  steps.value = []
  errorMessage.value = ''
  copyStatus.value = ''
  alreadyAligned.value = false

  const start = positions.value.slice(0, slotCount.value).map((value) => Number(value))
  const invalidIndex = start.findIndex(
    (value) => !Number.isInteger(value) || value < POSITION_MIN || value > POSITION_MAX,
  )
  if (invalidIndex !== -1) {
    errorMessage.value = `${SLOT_LETTERS[invalidIndex]} must be a whole number from 0 to 6.`
    return
  }

  let linkMatrix
  try {
    linkMatrix = parseRules(rulesText.value, slotCount.value)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Rules could not be parsed.'
    return
  }

  const solution = solveLockpick(start, linkMatrix, slotCount.value)
  if (!solution) {
    errorMessage.value = 'No safe solution found for this layout. Recheck the rule links.'
    return
  }

  if (!solution.length) {
    alreadyAligned.value = true
    return
  }

  steps.value = solution.map(({ slotIndex: index, dir }) => ({
    slot: SLOT_LETTERS[index],
    dir,
  }))
}

async function copySteps() {
  if (!steps.value.length) return

  const text = steps.value
    .map((step, index) => `${index + 1}. ${step.slot} ${step.dir > 0 ? '+1' : '-1'}`)
    .join('\n')

  try {
    await navigator.clipboard.writeText(text)
    copyStatus.value = 'Copied.'
  } catch {
    copyStatus.value = 'Copy failed. Select the steps manually.'
  }
}
</script>

<style scoped>
.lockpick-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: start;
  gap: 1.25rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.tool-panel {
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  box-shadow: var(--shadow-panel);
}

.lockpick-form,
.result-panel {
  padding: clamp(1rem, 2vw, 1.35rem);
}

.field-row,
.button-row {
  display: flex;
  align-items: end;
  gap: 0.85rem;
}

.field-row {
  justify-content: space-between;
  margin-bottom: 1rem;
}

.button-row {
  flex-wrap: wrap;
  margin-top: 1rem;
}

.field {
  display: grid;
  gap: 0.4rem;
  width: 100%;
}

.field span,
.slot-input span {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.field select,
.field textarea,
.slot-input input {
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--color-accent) 20%, var(--color-border-strong));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 76%, transparent);
  color: var(--color-text);
  font: inherit;
}

.field select,
.slot-input input {
  min-height: 2.45rem;
  padding: 0.45rem 0.65rem;
}

.field textarea {
  min-height: 7rem;
  padding: 0.7rem 0.8rem;
  resize: vertical;
  font-family: Consolas, 'Cascadia Mono', monospace;
  line-height: 1.5;
}

.field select:focus-visible,
.field textarea:focus-visible,
.slot-input input:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.slot-grid {
  display: grid;
  grid-template-columns: repeat(var(--slot-count), minmax(0, 1fr));
  gap: 0.55rem;
  margin-bottom: 1rem;
}

.slot-input {
  display: grid;
  gap: 0.35rem;
  min-width: 0;
}

.slot-input input {
  text-align: center;
  font-weight: 700;
}

.primary-button,
.secondary-button,
.secondary-link {
  min-height: 2.55rem;
  padding: 0.55rem 0.95rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.primary-button,
.secondary-button {
  cursor: pointer;
}

.primary-button {
  border: 1px solid color-mix(in srgb, var(--color-accent) 55%, var(--color-border));
  background: var(--gradient-barrier);
  color: var(--color-on-cta);
}

.secondary-button {
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-elevated) 72%, transparent);
  color: var(--color-text);
}

.secondary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-elevated));
  color: var(--color-accent);
}

.secondary-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.result-label,
.database-status {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.status-pill {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  padding: 0.22rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-pill--idle {
  border: 1px solid var(--color-border);
  color: var(--color-muted);
}

.status-pill--ok {
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);
}

.status-pill--error {
  border: 1px solid color-mix(in srgb, var(--color-accent-4) 42%, var(--color-border));
  color: var(--color-accent-4);
  background: color-mix(in srgb, var(--color-accent-4) 10%, transparent);
}

.result-summary,
.empty-result,
.error-message,
.copy-status {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.error-message {
  color: color-mix(in srgb, var(--color-accent-4) 75%, var(--color-text));
}

.copy-status {
  margin-top: 0.65rem;
}

.step-output {
  display: grid;
  gap: 0.45rem;
  margin-top: 0.9rem;
}

.step-output li {
  display: grid;
  grid-template-columns: 2.5rem minmax(2.5rem, 0.35fr) minmax(5.5rem, 1fr) auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 18%, var(--color-border));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 55%, transparent);
}

.step-index {
  font-family: var(--font-display);
  color: var(--color-accent-3);
}

.step-output code,
.rule-table code {
  padding: 0.12rem 0.35rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  color: var(--color-accent);
}

.reference-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin-bottom: 1.25rem;
}

.reference-grid article,
.database-panel {
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
}

.reference-grid article {
  padding: 1rem 1.1rem;
}

.reference-grid h3 {
  margin-bottom: 0.45rem;
  font-size: 1rem;
}

.reference-grid p,
.faq-item dd,
.database-panel p,
.database-schema dd {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.faq-list {
  display: grid;
  gap: 0.85rem;
}

.faq-item {
  padding: 1rem 1.1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
}

.faq-item dt {
  margin-bottom: 0.4rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-accent-3);
}

.submit-link {
  display: inline-flex;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
}

.rule-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.rule-table caption {
  margin-bottom: 0.65rem;
  text-align: left;
  font-size: 0.82rem;
  color: var(--color-muted);
}

.rule-table th,
.rule-table td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

.database-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.75fr);
  gap: 1rem;
  padding: 1.25rem;
}

.database-schema {
  display: grid;
  gap: 0.65rem;
}

.database-schema div {
  padding: 0.75rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 18%, var(--color-border));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 55%, transparent);
}

.database-schema dt {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-accent-3);
}

.database-log {
  grid-column: 1 / -1;
  margin: 0;
  padding-top: 0.85rem;
  border-top: 1px solid color-mix(in srgb, var(--color-accent-3) 22%, var(--color-border));
  font-size: 0.82rem !important;
  color: color-mix(in srgb, var(--color-muted) 88%, var(--color-accent-3)) !important;
}

@media (width <= 1024px) {
  .lockpick-layout,
  .reference-grid,
  .database-panel {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .slot-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .field-row {
    flex-direction: column;
    align-items: stretch;
  }

  .step-output li {
    grid-template-columns: 2.25rem 2.25rem minmax(0, 1fr);
  }

  .step-output code {
    grid-column: 2 / -1;
  }

  .primary-button,
  .secondary-button,
  .secondary-link {
    width: 100%;
  }
}
</style>
