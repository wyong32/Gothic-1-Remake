<template>
  <PageWithToc>
    <section class="page-hero-section" aria-labelledby="map-title">
      <div class="page-hero-split">
        <div class="page-hero-content">
          <p class="page-eyebrow">World Atlas · Mining Valley</p>
          <h1 id="map-title">Gothic 1 Remake — Interactive Map, Zones &amp; Landmark Navigation</h1>
          <p class="page-intro">
            The Mining Valley is a vertical, multi-layered penal colony — navigating elevation matters as
            much as combat alignment. The Remake streamlines some ladder networks into staircases, but
            the iconic vertical layout remains: height is your primary navigation mechanic.
          </p>
          <ul class="page-meta">
            <li><strong>Scope:</strong> Full barrier interior</li>
            <li><strong>Layers:</strong> Surface · mines · coast</li>
            <li><strong>In-game maps:</strong> Buy from camp cartographers</li>
          </ul>
          <ul class="tag-row" aria-label="Map topics">
            <li>Zone danger</li>
            <li>Vertical paths</li>
            <li>Trainer pins</li>
            <li>Quest landmarks</li>
          </ul>
        </div>

        <div class="map-atlas-block" aria-label="Interactive map preview">
          <aside class="map-notice">
            <span class="map-notice-icon" aria-hidden="true">📍</span>
            <div>
              <p class="map-notice-title">Interactive pin layer — coming soon</p>
              <p>
                Advanced pins (trainers, items, coordinates) deploy after June 5 launch verification.
                Use the regional index below until the live layer unlocks.
              </p>
            </div>
          </aside>
          <figure class="map-frame">
            <img
              src="/images/map-img-02.webp"
              alt="Placeholder — Gothic 1 Remake Mining Valley world map"
              width="1200"
              height="520"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="zones-title">
      <div class="page-body-content">
          <h2 id="zones-title">Gothic 1 Remake Valley Zones — Regions &amp; Danger Ratings</h2>
          <p>
            Before stepping off the main dirt paths, match your level and armor to local hazards. This
            index covers primary zones, danger ratings, and critical quest content in each region.
          </p>

          <table class="data-table">
            <caption>Regional index — danger and key spawns</caption>
            <thead>
              <tr>
                <th scope="col">Zone</th>
                <th scope="col">Danger</th>
                <th scope="col">Key content &amp; critical spawns</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Exchange / Outer Ring</strong></td>
                <td><span class="danger danger-mid">Medium</span></td>
                <td>
                  Drop zone start — Diego, introductory scavengers, path forks to all three camps.
                </td>
              </tr>
              <tr>
                <td><strong>Old Camp + Castle</strong></td>
                <td><span class="danger danger-low">Low*</span></td>
                <td>
                  Trading hub — arena, Fire Mages, Gomez, 9+ local side quests. *With camp armor.
                </td>
              </tr>
              <tr>
                <td><strong>New Camp Plateau</strong></td>
                <td><span class="danger danger-mid">Medium</span></td>
                <td>
                  Lee, Cord, Water Mages — winding cliff paths with serious fall damage risk.
                </td>
              </tr>
              <tr>
                <td><strong>Swamp / Novice Grotto</strong></td>
                <td><span class="danger danger-high">Med–High</span></td>
                <td>
                  Alchemy herbs, Cor Kalom's lab, novice trainers — bloodfly swarms in marsh gas.
                </td>
              </tr>
              <tr>
                <td><strong>Old Mine / Free Mine</strong></td>
                <td><span class="danger danger-extreme">High</span></td>
                <td>
                  Ch.1–2 dungeons — Ian's supply list, minecrawler prelude, tight torch corridors.
                </td>
              </tr>
              <tr>
                <td><strong>Mist Tower Region</strong></td>
                <td><span class="danger danger-extreme">High</span></td>
                <td>
                  Skeleton mages, coastal shipwreck, <em>The Stranger</em> book quest start — endgame
                  coastal zone.
                </td>
              </tr>
            </tbody>
          </table>

          <p class="table-footnote">* Old Camp interior is safe only while wearing faction-colored armor.</p>

          <div class="zone-cards">
            <article class="zone-card">
              <h3>Exchange / Outer Ring</h3>
              <span class="danger danger-mid">Medium</span>
              <p>First hours — scavengers, Diego, camp road signs. Stay on dirt paths until trained.</p>
            </article>
            <article class="zone-card">
              <h3>Old Camp + Castle</h3>
              <span class="danger danger-low">Low*</span>
              <p>Arena district northeast, marketplace west, fire mage chapel inside castle ring.</p>
            </article>
            <article class="zone-card">
              <h3>New Camp Plateau</h3>
              <span class="danger danger-mid">Medium</span>
              <p>Visible from exchange on clear weather — use Lee's castle as a compass if lost.</p>
            </article>
            <article class="zone-card">
              <h3>Swamp Grotto</h3>
              <span class="danger danger-high">Med–High</span>
              <p>Boardwalks south from valley floor — follow Baal Parvez from Guy's camp comparison.</p>
            </article>
            <article class="zone-card">
              <h3>Old / Free Mine</h3>
              <span class="danger danger-extreme">High</span>
              <p>Trial of Trust destination — connects to minecrawler nest in Chapter 2.</p>
            </article>
            <article class="zone-card">
              <h3>Mist Tower Coast</h3>
              <span class="danger danger-extreme">High</span>
              <p>Northwest landmark — Chromatin books, Waran patrols, harbor wreck south of tower.</p>
            </article>
          </div>
      </div>
    </section>

    <section class="page-body-section" aria-labelledby="nav-title">
      <div class="page-body-content">
          <h2 id="nav-title">Gothic 1 Remake Navigation — Landmarks Without a Minimap</h2>
          <p>
            Gothic 1 Remake has no automated GPS lines — spatial awareness, audio cues, and purchased
            paper maps replace waypoint markers.
          </p>

          <p class="map-inline-tip">
            Use the live atlas below to cross-check landmarks, trainers, ore veins, and quest pins when
            NPC directions only say &ldquo;the old tower&rdquo; — same tile layer and coordinates as the
            <a
              href="https://wand.com/maps/gothic-1-remake/the-colony"
              target="_blank"
              rel="noopener noreferrer"
              >Wand Colony map</a
            >.
          </p>

          <div class="colony-map-wrap">
            <ColonyInteractiveMap />
          </div>

          <ol class="rule-list">
            <li class="rule-card">
              <span class="rule-label">Rule 1</span>
              <h3>Verticality &amp; Fall Damage</h3>
              <p>
                New Camp Plateau and Mist Tower rely on elevation changes. Player shortcuts often mean
                instant death. If lost, look for <strong>torches or wooden scaffolding</strong> — safe
                staircases and slopes the designers placed for travel.
              </p>
              <ul class="inline-tags">
                <li>Fall damage</li>
                <li>Plateau paths</li>
              </ul>
            </li>
            <li class="rule-card">
              <span class="rule-label">Rule 2</span>
              <h3>Dynamic Ambient Cues</h3>
              <p>
                Without an unlocked map, use sound to locate yourself. Dense wet croaking → Swamp
                Grotto or lurker riverbanks. Metallic clanging and echoes → mine network entrances.
              </p>
              <ul class="inline-tags">
                <li>Audio navigation</li>
                <li>Swamp vs mine</li>
              </ul>
            </li>
            <li class="rule-card">
              <span class="rule-label">Rule 3</span>
              <h3>Unlock Local In-Game Maps</h3>
              <p>
                This atlas covers macro layout. For in-game position tracking, buy hand-drawn paper
                maps from camp cartographers — e.g. <strong>Graham in the Old Camp</strong>. They cost
                Ore but track paths between faction borders.
              </p>
              <ul class="inline-tags">
                <li>Graham</li>
                <li>Ore cost</li>
                <li>Paper maps</li>
              </ul>
            </li>
          </ol>

          <aside class="callout callout-tip">
            <p class="callout-title">Pair with quests</p>
            <p>
              Zone names in NPC dialogue often omit compass directions — cross-check
              <RouterLink to="/quests-story">Quests &amp; Story</RouterLink> when a journal entry
              references "the old tower" and you see three candidates.
            </p>
          </aside>

          <nav class="page-links">
            <RouterLink to="/beginner">Survival rules →</RouterLink>
            <RouterLink to="/quests-story">Quest directory →</RouterLink>
            <RouterLink to="/wiki">NPC &amp; trainer wiki →</RouterLink>
          </nav>
      </div>
    </section>
  </PageWithToc>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ColonyInteractiveMap from '@/components/ColonyInteractiveMap.vue'
</script>

<style scoped>

.map-atlas-block {
  position: relative;
  z-index: 1;
}

.map-notice {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 1rem 1.15rem;
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 35%, var(--color-border-strong));
  border-left: 3px solid var(--color-accent-3);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-accent-3) 8%, var(--color-bg-elevated));
}

.map-notice-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.map-notice-title {
  margin-bottom: 0.35rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.map-notice p:last-child {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-muted);
}

.map-frame {
  margin: 0;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--gradient-border-gold);
  padding: 1px;
  box-shadow: var(--shadow-panel), var(--shadow-glow-accent);
}

.map-frame img {
  display: block;
  width: 100%;
  aspect-ratio: 12 / 5;
  object-fit: cover;
  border-radius: calc(var(--radius-md) - 1px);
}

.map-frame figcaption {
  padding: 0.75rem 1rem;
  background: var(--gradient-panel);
  font-size: 0.82rem;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
}

.page-body-section {
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.25rem;
  font-size: 0.88rem;
}

.data-table caption {
  margin-bottom: 0.65rem;
  text-align: left;
  font-size: 0.82rem;
  color: var(--color-muted);
}

.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

.table-footnote {
  margin-top: 0.65rem;
  font-size: 0.8rem;
  color: var(--color-muted);
  font-style: italic;
}

.danger {
  display: inline-block;
  padding: 0.18rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.danger-low {
  background: color-mix(in srgb, var(--color-accent-2) 22%, transparent);
  color: var(--color-accent-2);
}

.danger-mid {
  background: color-mix(in srgb, var(--color-accent-3) 20%, transparent);
  color: var(--color-accent-3);
}

.danger-high {
  background: color-mix(in srgb, var(--color-accent-4) 18%, transparent);
  color: var(--color-accent-4);
}

.danger-extreme {
  background: color-mix(in srgb, var(--color-accent-4) 28%, transparent);
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-accent-4));
  border: 1px solid color-mix(in srgb, var(--color-accent-4) 40%, var(--color-border));
}

.zone-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  margin-top: 1.5rem;
}

.zone-card {
  padding: 1rem 1.1rem;
  background: var(--gradient-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-panel);
}

.zone-card h3 {
  margin: 0 0 0.45rem;
  font-size: 0.95rem;
}

.zone-card .danger {
  margin-bottom: 0.55rem;
}

.zone-card p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.5;
}

.colony-map-wrap {
  margin: 1.25rem 0 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
}

.colony-map-wrap :deep(.colony-map) {
  max-width: 100%;
}

.map-inline-tip {
  margin: 1rem 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.map-inline-tip a {
  color: var(--color-accent);
  font-weight: 600;
}

.content-figure {
  margin: 1.25rem 0;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-panel);
}

.content-figure img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.content-figure figcaption {
  padding: 0.75rem 1rem;
  background: var(--gradient-panel);
  font-size: 0.82rem;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
}

.rule-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
  list-style: none;
}

.rule-card {
  padding: 1.25rem 1.35rem;
  background: var(--gradient-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-panel);
}

.rule-label {
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border));
  color: var(--color-accent);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.rule-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.rule-card p {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.inline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.85rem;
  list-style: none;
}

.inline-tags li {
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-border) 50%, transparent);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.callout {
  margin-top: 1.5rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border-strong));
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-elevated));
}

.callout-tip {
  border-left-color: var(--color-accent-3);
  background: color-mix(in srgb, var(--color-accent-3) 8%, var(--color-bg-elevated));
}

.callout-title {
  margin-bottom: 0.45rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.callout p:last-child {
  margin-bottom: 0;
  color: var(--color-muted);
  font-size: 0.92rem;
}

.page-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .map-atlas-block {
    order: -1;
  }

  .zone-cards {
    grid-template-columns: 1fr;
  }
}
</style>
