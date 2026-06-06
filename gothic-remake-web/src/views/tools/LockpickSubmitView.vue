<template>
  <PageWithToc>
    <section class="page-hero-section" aria-labelledby="submit-title">
      <div class="page-hero-content">
        <p class="page-eyebrow">Tools · Community Data</p>
        <h1 id="submit-title">Submit Gothic 1 Remake Lock Data</h1>
        <p class="page-intro">
          Send chest or door lock data in the exact structure needed for the lockpick database.
          Complete entries need location, slot count, current positions, link rules, patch version,
          and proof notes.
        </p>
        <ul class="page-meta">
          <li><strong>Use for:</strong> Chests and locked doors</li>
          <li><strong>Required:</strong> cells, start positions, rules</li>
          <li><strong>Review:</strong> Manual verification before publish</li>
        </ul>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="submission-title">
      <div class="container">
        <div class="page-body-content">
          <h2 id="submission-title">Submission Form</h2>
          <form class="submit-panel" @submit.prevent="submitForm">
            <div class="form-grid">
              <label class="field">
                <span>Lock type</span>
                <select v-model="form.lockType">
                  <option value="Chest">Chest</option>
                  <option value="Door">Door</option>
                </select>
              </label>
              <label class="field">
                <span>Patch version</span>
                <input v-model.trim="form.patchVersion" type="text" placeholder="Example: 1.0.4" />
              </label>
              <label class="field">
                <span>Region</span>
                <input v-model.trim="form.region" type="text" placeholder="Old Camp, Swamp Camp..." />
              </label>
              <label class="field">
                <span>Exact location</span>
                <input
                  v-model.trim="form.location"
                  type="text"
                  placeholder="Right of the barons' house stairs"
                  required
                />
              </label>
              <label class="field">
                <span>Slot count</span>
                <select v-model.number="form.cells">
                  <option v-for="count in slotOptions" :key="count" :value="count">{{ count }}</option>
                </select>
              </label>
              <label class="field">
                <span>Source status</span>
                <select v-model="form.sourceStatus">
                  <option value="PLAYER-REPORTED">PLAYER-REPORTED</option>
                  <option value="VIDEO-PROOF">VIDEO-PROOF</option>
                  <option value="VERIFIED">VERIFIED</option>
                  <option value="PARTIAL">PARTIAL</option>
                </select>
              </label>
            </div>

            <label class="field">
              <span>Start positions</span>
              <input
                v-model.trim="form.startPositions"
                type="text"
                placeholder="Example: 1,0,5,4,3,6"
                required
              />
            </label>

            <label class="field">
              <span>Rules</span>
              <textarea
                v-model.trim="form.rules"
                rows="4"
                spellcheck="false"
                placeholder="Example: B:C+,E-;D:B+,E-;E:B-,C+,F-;F:E+"
                required
              />
            </label>

            <div class="form-grid">
              <label class="field">
                <span>Contributor</span>
                <input v-model.trim="form.contributor" type="text" placeholder="Name or handle" />
              </label>
              <label class="field">
                <span>Contact</span>
                <input v-model.trim="form.contact" type="text" placeholder="Email or Discord, optional" />
              </label>
              <label class="field">
                <span>Proof URL</span>
                <input v-model.trim="form.proofUrl" type="url" placeholder="Video, screenshot, or sheet link" />
              </label>
              <label class="field">
                <span>Timestamp</span>
                <input v-model.trim="form.timestamp" type="text" placeholder="Example: 12:05" />
              </label>
            </div>

            <label class="field">
              <span>Notes</span>
              <textarea
                v-model.trim="form.notes"
                rows="4"
                placeholder="NPC nearby, stealth requirement, item reward, failed attempts, uncertainty..."
              />
            </label>

            <input
              v-model="form.website"
              class="trap-field"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
            />

            <div class="button-row">
              <button type="submit" class="primary-button">Submit Data</button>
              <button type="button" class="secondary-button" @click="copyJson">Copy JSON</button>
              <RouterLink class="text-link" to="/tools/lockpick">Back to calculator</RouterLink>
            </div>

            <p v-if="formMessage" class="form-message" :class="formMessageClass">{{ formMessage }}</p>
          </form>
        </div>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="format-title">
      <div class="container">
        <div class="page-body-content">
          <h2 id="format-title">What Counts as Useful Data</h2>
          <div class="quality-grid">
            <article>
              <h3>Complete Entry</h3>
              <p>Location, slot count, start positions, rules, patch version, and at least one proof note.</p>
            </article>
            <article>
              <h3>Partial Entry</h3>
              <p>Location plus either rules or start positions. Usable, but not published as a default answer.</p>
            </article>
            <article>
              <h3>Rejected Entry</h3>
              <p>Only a vague location or a guessed sequence without the underlying 0-6 slot data.</p>
            </article>
          </div>

          <aside class="review-note">
            <p class="review-label">Review rule</p>
            <p>
              Submitted data is not automatically marked VERIFIED. We publish player-reported entries only
              with a status label, then upgrade them after a reproducible test or clear video proof.
            </p>
          </aside>

          <pre class="payload-preview"><code>{{ payloadPreview }}</code></pre>
        </div>
      </div>
    </section>

    <div
      v-if="showSuccessDialog"
      class="modal-backdrop"
      role="presentation"
      @click.self="showSuccessDialog = false"
    >
      <dialog class="success-dialog" open aria-labelledby="success-title">
        <p class="dialog-eyebrow">Submission received</p>
        <h2 id="success-title">Thank you for the data</h2>
        <p>
          Thanks for submitting this lock data. We will review it and update the guide as soon as possible.
        </p>
        <div class="dialog-actions">
          <button type="button" class="primary-button" @click="showSuccessDialog = false">Close</button>
        </div>
      </dialog>
    </div>
  </PageWithToc>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageWithToc from '@/components/PageWithToc.vue'
import {
  POSITION_MAX,
  POSITION_MIN,
  SLOT_COUNT_OPTIONS,
  parseStartPositions,
  validateRules,
} from '@/lib/lockpickSolver.js'

const slotOptions = SLOT_COUNT_OPTIONS
const form = reactive({
  lockType: 'Chest',
  patchVersion: '',
  region: '',
  location: '',
  cells: 6,
  sourceStatus: 'PLAYER-REPORTED',
  startPositions: '',
  rules: '',
  contributor: '',
  contact: '',
  proofUrl: '',
  timestamp: '',
  notes: '',
  website: '',
})

const formMessage = ref('')
const formMessageClass = ref('')
const showSuccessDialog = ref(false)

const payloadPreview = computed(() =>
  JSON.stringify(
    {
      lockType: form.lockType,
      patchVersion: form.patchVersion || 'unknown',
      region: form.region || 'unknown',
      location: form.location,
      cells: form.cells,
      startPositions: parseStartPositions(form.startPositions),
      rules: form.rules,
      sourceStatus: form.sourceStatus,
      contributor: form.contributor || 'anonymous',
      contact: form.contact || '',
      proofUrl: form.proofUrl || '',
      timestamp: form.timestamp || '',
      notes: form.notes || '',
      submittedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
)

function validateForm({ allowPartial = false } = {}) {
  if (!form.location) return 'Exact location is required.'
  if (!form.startPositions && !allowPartial) return 'Start positions are required.'
  if (!form.rules && !allowPartial) return 'Rules are required.'

  if (form.startPositions) {
    const values = parseStartPositions(form.startPositions)
    if (values.length !== form.cells) {
      return `Start positions must contain exactly ${form.cells} values.`
    }
    if (values.some((value) => !Number.isInteger(value) || value < POSITION_MIN || value > POSITION_MAX)) {
      return 'Start positions must be whole numbers from 0 to 6.'
    }
  }

  if (form.rules) {
    const ruleError = validateRules(form.rules, form.cells)
    if (ruleError) return ruleError
  }

  return ''
}

async function submitForm() {
  formMessage.value = ''
  formMessageClass.value = ''
  showSuccessDialog.value = false

  if (form.website) return

  const error = validateForm()
  if (error) {
    formMessage.value = error
    formMessageClass.value = 'form-message--error'
    return
  }

  showSuccessDialog.value = true
  formMessage.value =
    'Thank you. We will review your lock data and update the guide as soon as possible.'
  formMessageClass.value = 'form-message--ok'
}

async function copyJson() {
  const error = validateForm({ allowPartial: true })
  if (error) {
    formMessage.value = error
    formMessageClass.value = 'form-message--error'
    return
  }

  try {
    await navigator.clipboard.writeText(payloadPreview.value)
    formMessage.value = 'JSON copied.'
    formMessageClass.value = 'form-message--ok'
  } catch {
    formMessage.value = 'Copy failed. Select the JSON preview manually.'
    formMessageClass.value = 'form-message--error'
  }
}
</script>

<style scoped>
.submit-panel,
.review-note {
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  box-shadow: var(--shadow-panel);
}

.submit-panel {
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 2vw, 1.35rem);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field span {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--color-accent) 20%, var(--color-border-strong));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 76%, transparent);
  color: var(--color-text);
  font: inherit;
}

.field input,
.field select {
  min-height: 2.45rem;
  padding: 0.45rem 0.65rem;
}

.field textarea {
  min-height: 6.5rem;
  padding: 0.7rem 0.8rem;
  resize: vertical;
  line-height: 1.5;
}

.field textarea[spellcheck='false'] {
  font-family: Consolas, 'Cascadia Mono', monospace;
}

.field input:focus-visible,
.field select:focus-visible,
.field textarea:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
}

.primary-button,
.secondary-button {
  min-height: 2.55rem;
  padding: 0.55rem 0.95rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
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

.text-link {
  font-size: 0.9rem;
  font-weight: 700;
}

.form-message {
  margin: 0;
  padding: 0.75rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.form-message--ok {
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-accent) 8%, transparent);
  color: var(--color-accent);
}

.form-message--error {
  border: 1px solid color-mix(in srgb, var(--color-accent-4) 42%, var(--color-border));
  background: color-mix(in srgb, var(--color-accent-4) 10%, transparent);
  color: color-mix(in srgb, var(--color-accent-4) 75%, var(--color-text));
}

.trap-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
}

.quality-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.quality-grid article {
  padding: 1rem 1.1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
}

.quality-grid h3 {
  margin-bottom: 0.45rem;
  font-size: 1rem;
}

.quality-grid p,
.review-note p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.review-note {
  margin-top: 1rem;
  padding: 1rem 1.1rem;
  border-left: 3px solid var(--color-accent-3);
}

.review-label {
  margin-bottom: 0.35rem;
  font-size: 0.72rem !important;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-3) !important;
}

.payload-preview {
  max-width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  color: color-mix(in srgb, var(--color-text) 84%, var(--color-accent));
  font-size: 0.8rem;
  line-height: 1.55;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: color-mix(in srgb, var(--color-bg) 72%, transparent);
  backdrop-filter: blur(8px);
}

.success-dialog {
  width: min(100%, 30rem);
  margin: 0;
  padding: 1.35rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border-strong));
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  color: var(--color-text);
  box-shadow: var(--shadow-panel), var(--shadow-glow-accent);
}

.dialog-eyebrow {
  margin-bottom: 0.45rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.success-dialog h2 {
  margin-bottom: 0.65rem;
  padding-left: 0;
  font-size: 1.35rem;
}

.success-dialog h2::before {
  display: none;
}

.success-dialog p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.dialog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

@media (width <= 1024px) {
  .quality-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .button-row {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-button,
  .secondary-button,
  .text-link {
    width: 100%;
    text-align: center;
  }

  .dialog-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
