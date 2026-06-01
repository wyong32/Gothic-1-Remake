<template>
  <div class="home-page">
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-content">
          <div class="hero-copy">
            <p class="hero-eyebrow">Valley of Mines · Releases June 5, 2026</p>
            <h1 id="hero-title">Gothic 1 Remake — Walkthroughs, Wiki, Quests, Builds &amp; Map</h1>
            <p class="hero-lead">
              Walkthroughs, faction builds, quest rewards, and wiki lookups for Alkimia Interactive's
              2026 rebuild — the colony still has no quest markers, no minimap, and trainers who only
              take ore.
            </p>
            <div class="hero-actions">
              <RouterLink to="/beginner" class="hero-btn hero-btn-primary">New to the Colony</RouterLink>
              <RouterLink to="/guides/remake-vs-original" class="hero-btn">Remake vs 2001</RouterLink>
              <RouterLink to="/wiki" class="hero-btn">Wiki Index</RouterLink>
            </div>
            <ul class="hero-tags" aria-label="Gothic 1 Remake highlights">
              <li v-for="tag in heroTags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
          <aside class="hero-video-wrap" aria-label="Gothic 1 Remake video trailer">
            <div class="hero-video-content">
              <iframe
                v-if="videoPlaying"
                class="hero-video-frame"
                src="https://www.youtube.com/embed/sbpSv1dX3LY"
                title="Gothic 1 Remake trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <button
                v-else
                type="button"
                class="hero-video-mask"
                aria-label="Play Gothic 1 Remake trailer"
                @click="playVideo"
              >
                <span class="hero-video-mask-bg" aria-hidden="true"></span>
                <span class="hero-video-play" aria-hidden="true">
                  <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="31" fill="rgba(17, 15, 13, 0.58)" stroke="currentColor" stroke-width="2" />
                    <path d="M26 20 L26 44 L44 32 Z" fill="currentColor" />
                  </svg>
                </span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="situations-section" aria-labelledby="situations-title">
      <div class="container">
        <div class="situations-content">
          <header class="section-head">
            <h2 id="situations-title">Gothic 1 Remake — Common Sticking Points</h2>
            <p>
              The journal names goals, not locations. Most runs slow down at the same beats — here is
              where to pick up a walkthrough for each one.
            </p>
          </header>
          <ul class="situations-grid">
            <li v-for="item in playerSituations" :key="item.title">
              <RouterLink :to="item.to" class="situations-card">
                <p class="situations-card__phase">{{ item.phase }}</p>
                <h3>{{ item.title }}</h3>
                <p class="situations-card__summary">{{ item.summary }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="changes-section" aria-labelledby="changes-title">
      <div class="container">
        <div class="changes-content">
          <header class="section-head section-head--row">
            <div>
              <h2 id="changes-title">Gothic 1 Remake at a Glance</h2>
              <p>
                Whether you finished Gothic in 2001 or never left the barrier, these are the design
                shifts that matter once you are in the valley.
              </p>
            </div>
            <RouterLink class="section-cta" to="/guides/remake-vs-original">Full comparison →</RouterLink>
          </header>

          <blockquote class="changes-verdict">
            <p>
              Ore trainers, three camps, journal navigation, and the Sleeper arc are intact. Combat
              reads clearer, the map is denser, professions are gone, and orc storylines run deeper.
            </p>
          </blockquote>

          <div class="changes-panel">
            <div class="changes-panel__left">
              <div class="changes-table-wrap">
                <table class="data-table changes-table">
                  <caption>2001 retail vs June 2026 Remake</caption>
                  <thead>
                    <tr>
                      <th scope="col">Topic</th>
                      <th scope="col">Gothic (2001)</th>
                      <th scope="col">Gothic 1 Remake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in remakeCompareRows" :key="row.topic">
                      <th scope="row">{{ row.topic }}</th>
                      <td>{{ row.original }}</td>
                      <td>{{ row.remake }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ul class="changes-trio" aria-label="Change categories">
                <li class="changes-trio__kept">
                  <strong>Unchanged</strong>
                  <p>No minimap, journal-only quests, LP trainers, three-camp choice, Sleeper finale.</p>
                </li>
                <li class="changes-trio__added">
                  <strong>New systems</strong>
                  <p>Dodge, block, lock-on, manual bow aim, armor resistances, diving, richer NPC routines.</p>
                </li>
                <li class="changes-trio__cut">
                  <strong>Removed</strong>
                  <p>Profession tracks — extra camp quests and orc content replace that progression loop.</p>
                </li>
              </ul>
            </div>

            <aside class="changes-aside">
              <RouterLink to="/guides/remake-vs-original" class="changes-aside__link">
                <div class="changes-aside__media">
                  <img
                    src="/images/home-img-02.webp"
                    alt="Gothic 1 Remake compared to the 2001 original"
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                </div>
                <div class="changes-aside__body">
                  <p class="changes-aside__label">Comparison guide</p>
                  <h3>Gothic 1 Remake vs the 2001 Original</h3>
                  <ul>
                    <li v-for="point in remakeGuidePoints" :key="point">{{ point }}</li>
                  </ul>
                  <span class="changes-aside__cta">Read comparison →</span>
                </div>
              </RouterLink>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <section class="camps-section" aria-labelledby="camps-title">
      <div class="container">
        <div class="camps-content">
          <header class="section-head">
            <h2 id="camps-title">The Three Camps in Gothic 1 Remake</h2>
            <p>
              The magical barrier traps every convict inside the Valley. Three factions control ore,
              faith, and survival — pick one in Chapter 1 or wander unaligned until you commit.
            </p>
          </header>
          <ul class="camps-grid">
            <li class="camp-old">
              <article>
                <header>
                  <span class="camp-mark" aria-hidden="true">OC</span>
                  <div>
                    <h3>Gothic 1 Remake Old Camp</h3>
                    <p class="camp-leader">Gomez · Ore barons · Fire mages of Innos</p>
                  </div>
                </header>
                <p>
                  Densest Chapter 1 content: arena with Scatty, marketplace rogues, fire mage chapel,
                  and the Trial of Trust route through Diego. Join reward: <strong>2,450 XP</strong>,
                  Shadow Garb.
                </p>
                <ul class="camp-tags">
                  <li>Strength melee</li>
                  <li>Fire circles</li>
                  <li>26 local quests</li>
                </ul>
                <RouterLink to="/factions-builds#old-camp">Old Camp build guide →</RouterLink>
              </article>
            </li>
            <li class="camp-new">
              <article>
                <header>
                  <span class="camp-mark" aria-hidden="true">NC</span>
                  <div>
                    <h3>Gothic 1 Remake New Camp</h3>
                    <p class="camp-leader">Lee · Diggers · Water mages of Adanos</p>
                  </div>
                </header>
                <p>
                  Cliff castle, mercenary politics, and Cord's one-handed training. Best bow path with
                  manual aiming in the Remake. Join reward: <strong>2,950 XP</strong>, Light Bandit
                  Clothing. Mixer adds Remake-only coastal quests.
                </p>
                <ul class="camp-tags">
                  <li>Dex / bow</li>
                  <li>Water runes</li>
                  <li>Lee's escape plot Ch.3</li>
                </ul>
                <RouterLink to="/factions-builds#new-camp">New Camp build guide →</RouterLink>
              </article>
            </li>
            <li class="camp-swamp">
              <article>
                <header>
                  <span class="camp-mark" aria-hidden="true">SC</span>
                  <div>
                    <h3>Gothic 1 Remake Swamp Camp</h3>
                    <p class="camp-leader">Cor Kalom · Novices · Sleeper cult</p>
                  </div>
                </header>
                <p>
                  Herbs, alchemy, and the Great Calling ritual. Highest join XP at
                  <strong>3,850</strong> plus Novice Robe — but early survival is brutal without
                  mana potions and staff trainers like Gor-Na-Toth.
                </p>
                <ul class="camp-tags">
                  <li>Mana / alchemy</li>
                  <li>Novice-only trainers</li>
                  <li>Focus stone arc Ch.3</li>
                </ul>
                <RouterLink to="/factions-builds#swamp-camp">Swamp Camp build guide →</RouterLink>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="quests-section" aria-labelledby="quests-title">
      <div class="container">
        <div class="quests-content">
          <header class="section-head">
            <h2 id="quests-title">Gothic 1 Remake Quest Directory</h2>
            <p>
              Six chapters, 47 tracked quests. Rewards follow verified Gothic 1 values until launch
              data is confirmed on <time datetime="2026-06-05">June 5, 2026</time>.
            </p>
          </header>

          <div class="quest-chapters">
            <article class="quest-chapter">
              <h3>Chapter 1 — Gothic 1 Remake <span>26 quests</span></h3>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Quest</th>
                    <th scope="col">Type</th>
                    <th scope="col">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><RouterLink to="/quests-story">Joining the Old Camp</RouterLink></td>
                    <td>Main</td>
                    <td>2,450 XP · Shadow Garb</td>
                  </tr>
                  <tr>
                    <td><RouterLink to="/quests-story">Joining the New Camp</RouterLink></td>
                    <td>Main</td>
                    <td>2,950 XP · Light Bandit Clothing</td>
                  </tr>
                  <tr>
                    <td><RouterLink to="/quests-story">Joining the Swamp Camp</RouterLink></td>
                    <td>Main</td>
                    <td>3,850 XP · Novice Robe</td>
                  </tr>
                  <tr>
                    <td><RouterLink to="/quests-story">Trial of Trust</RouterLink></td>
                    <td>Side</td>
                    <td>750 XP · Diego route</td>
                  </tr>
                  <tr>
                    <td><RouterLink to="/quests-story">The Stranger</RouterLink></td>
                    <td>Side</td>
                    <td>3,350 XP · six Chromatin books</td>
                  </tr>
                  <tr>
                    <td><RouterLink to="/quests-story">Baloro's Weapon</RouterLink></td>
                    <td>Side</td>
                    <td>250 XP</td>
                  </tr>
                </tbody>
              </table>
              <RouterLink class="chapter-link" to="/quests-story">Full Chapter 1 list →</RouterLink>
            </article>

            <article class="quest-chapter">
              <h3>Chapter 2 — Gothic 1 Remake <span>3 quests</span></h3>
              <p>
                Short chapter, heavy dungeon. Includes <em>Focus for the Gurus</em> and the
                minecrawler queen egg handoff that feeds Swamp Camp's Great Calling storyline.
              </p>
              <RouterLink class="chapter-link" to="/quests-story">Chapter 2 walkthrough →</RouterLink>
            </article>

            <article class="quest-chapter">
              <h3>Chapter 3 — Gothic 1 Remake <span>10 quests</span></h3>
              <p>
                Focus stones under Stonehenge, monastery ruins, troll canyon. Old Camp declares you
                traitor — <em>Exile from the Old Camp</em> forces a New Camp pivot regardless of earlier
                loyalty.
              </p>
              <RouterLink class="chapter-link" to="/quests-story">Chapter 3 + orc cemetery →</RouterLink>
            </article>

            <article class="quest-chapter quest-chapter-compact">
              <h3>Gothic 1 Remake Chapters 4–6 <span>8 quests</span></h3>
              <ul>
                <li><strong>Ch.4 Xardas</strong> — 5 quests, arch-mage alliance</li>
                <li><strong>Ch.5 Guardians of the Portal</strong> — 2 quests, army support</li>
                <li><strong>Ch.6 Halls of the Sleeper</strong> — final dungeon, Remake pacing fixes</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section v-if="homeGuides.length" class="guides-section" aria-labelledby="guides-title">
      <div class="container">
        <div class="guides-content">
          <header class="section-head section-head--row">
            <div>
              <h2 id="guides-title">Featured Gothic 1 Remake Guides</h2>
              <p>Longer articles on Remake changes, combat rhythm, and systems the wiki tables do not cover.</p>
            </div>
            <RouterLink class="section-cta" to="/guides">All guides →</RouterLink>
          </header>

          <ul class="guide-index-list home-guide-list">
            <li v-for="guide in homeGuides" :key="guide.addressBar">
              <RouterLink :to="`/guides/${guide.addressBar}`" class="guide-index-card">
                <div class="guide-index-card__media">
                  <img
                    src="/images/about-img.webp"
                    alt="Gothic 1 Remake guide"
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                </div>
                <div class="guide-index-card__body">
                  <p class="guide-index-card__date">{{ formatDate(guide.publishDate) }}</p>
                  <h3>{{ guide.title }}</h3>
                  <p class="guide-index-card__desc">{{ guide.description }}</p>
                  <ul class="guide-index-card__tags">
                    <li v-for="tag in guide.tags.slice(0, 5)" :key="tag">{{ tag }}</li>
                    <li v-if="guide.tags.length > 5" class="guide-index-card__more">+{{ guide.tags.length - 5 }}</li>
                  </ul>
                  <span class="guide-index-card__cta">Read guide →</span>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="wiki-section" aria-labelledby="wiki-title">
      <div class="container">
        <div class="wiki-content">
          <header class="section-head section-head--row">
            <div>
              <h2 id="wiki-title">Gothic 1 Remake Wiki Highlights</h2>
              <p>NPCs, regions, gear, and runes — quick reference with infobox stats and in-game artwork.</p>
            </div>
            <RouterLink class="section-cta" to="/wiki">Browse wiki →</RouterLink>
          </header>

          <ul class="wiki-spotlight">
            <li v-for="spot in wikiSpotlights" :key="spot.title">
              <RouterLink :to="spot.to" class="wiki-spotlight__card">
                <div class="wiki-spotlight__visual">
                  <img v-if="spot.image" :src="spot.image" :alt="spot.title" loading="lazy" width="112" height="112" />
                  <span v-else class="wiki-spotlight__fallback" aria-hidden="true">{{ spot.initials }}</span>
                </div>
                <div class="wiki-spotlight__body">
                  <p class="wiki-spotlight__cat">{{ spot.category }}</p>
                  <h3>{{ spot.title }}</h3>
                  <p>{{ spot.note }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="release-section" id="release-date" aria-labelledby="release-title">
      <div class="container">
        <div class="release-content">
          <header class="section-head">
            <h2 id="release-title">Gothic 1 Remake Release Date</h2>
            <p>
              THQ Nordic and Alkimia Interactive confirmed a global launch window for the full
              remake of Piranha Bytes' 2001 RPG — not a remaster, but a ground-up rebuild on Unreal
              Engine 5.
            </p>
          </header>

          <div class="release-highlight">
            <p class="release-label">Official release date</p>
            <p class="release-date">
              <time datetime="2026-06-05">June 5, 2026</time>
            </p>
            <p class="release-note">
              Physical and digital editions ship the same day on PC and current-gen consoles. A
              one-time day-one patch (~5 GB) is required before first launch on disc copies.
            </p>
          </div>

          <div class="release-grid">
            <article class="release-card">
              <h3>Gothic 1 Remake Platforms</h3>
              <ul>
                <li>PC (Steam, Epic Games Store, GOG)</li>
                <li>PlayStation 5</li>
                <li>Xbox Series X|S</li>
              </ul>
            </article>
            <article class="release-card">
              <h3>Gothic 1 Remake — Key Facts</h3>
              <dl class="release-facts">
                <div>
                  <dt>Developer</dt>
                  <dd>Alkimia Interactive</dd>
                </div>
                <div>
                  <dt>Publisher</dt>
                  <dd>THQ Nordic</dd>
                </div>
                <div>
                  <dt>Genre</dt>
                  <dd>Action RPG · open world</dd>
                </div>
                <div>
                  <dt>Setting</dt>
                  <dd>Valley of Mines penal colony (Khorinis)</dd>
                </div>
              </dl>
            </article>
            <article class="release-card">
              <h3>Before You Play Gothic 1 Remake</h3>
              <ul>
                <li>Minimum spec: RTX 2070 / RX 6700 XT, 16 GB RAM, 60 GB storage</li>
                <li>Offline play confirmed after the day-one patch — no always-online DRM</li>
                <li>Deluxe and Collector's editions include art books and in-game cosmetics</li>
              </ul>
            </article>
          </div>

          <p class="release-footer">
            Searching <strong>Gothic 1 Remake release date</strong> or
            <strong>Gothic Remake launch</strong>? Bookmark this page — we update platform notes and
            patch details after June 5, 2026.
            <RouterLink to="/guides">Performance notes on the guide list →</RouterLink>
          </p>
        </div>
      </div>
    </section>

    <section class="about-section" id="about" aria-labelledby="about-title">
      <div class="container">
        <header class="section-head">
          <h2 id="about-title">About Gothic 1 Remake Guide</h2>
          <p>
            Walkthroughs, camp builds, and quest notes for Alkimia Interactive's 2026 rebuild of the
            Valley of Mines — still no minimap, still ore-only trainers.
          </p>
        </header>

        <article class="about-panel">
          <figure class="about-visual">
            <img
              src="/images/about-img.webp"
              alt="Gothic 1 Remake key art"
              loading="lazy"
              width="640"
              height="360"
            />
          </figure>

          <div class="about-body">
            <p class="about-intro">
              Gothic 1 Remake sends you into the barrier with journal directions instead of waypoints.
              This site documents how to survive the drop, pick a camp, clear six chapters, and look up
              trainers or items when NPC dialogue is not enough.
            </p>

            <div class="about-columns">
              <div>
                <h3>What We Cover</h3>
                <p>
                  Beginner survival, Old / New / Swamp builds, a full quest directory with XP rewards,
                  a landmark map, wiki stats, and a Remake-vs-2001 comparison for launch week.
                </p>
              </div>
              <div>
                <h3>Who It Is For</h3>
                <p>
                  First runs after the Exchange, veterans replaying skipped camp routes, and anyone
                  tracing focus stones or Sleeper ritual steps without spoiling the full plot.
                </p>
              </div>
              <div>
                <h3>Accuracy</h3>
                <p>
                  Fan-made — not THQ Nordic or Alkimia. Numbers follow Gothic 1 baseline until the
                  <time datetime="2026-06-05">June 5, 2026</time> ship is verified in-game.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="faq-section" id="faq" aria-labelledby="faq-title">
      <div class="container">
        <div class="faq-content">
          <header class="section-head">
            <h2 id="faq-title">Gothic 1 Remake FAQ</h2>
            <p>Answers pulled from demo play, official streams, and THQ Nordic statements.</p>
          </header>
          <dl>
            <div>
              <dt>Are professions still in the Remake?</dt>
              <dd>
                No — the brewer / hunter / alchemist job tracks from Gothic 1 were cut. Camp-specific
                side quests and expanded NPC routes replace that loop. See our
                <RouterLink to="/guides/remake-vs-original">Remake vs Original guide</RouterLink>
                for the full breakdown.
              </dd>
            </div>
            <div>
              <dt>Can I respec Learning Points?</dt>
              <dd>
                No. Every LP spent at a trainer is permanent. You earn roughly 10 LP per level (soft
                cap ~level 35–40). Specialize one weapon line and one attribute — spreading points
                creates a weak hero everywhere.
              </dd>
            </div>
            <div>
              <dt>How do I find quests without markers?</dt>
              <dd>
                Listen to NPC dialogue, read journal entries, and navigate by landmarks ("old tower,"
                "other side of the lake"). Our
                <RouterLink to="/interactive-map">map pages</RouterLink> describe routes in player
                language.
              </dd>
            </div>
            <div>
              <dt>Which camp is best for first-time players?</dt>
              <dd>
                Old Camp has the most Chapter 1 guidance and side XP (Scatty, Whistler, Fisk quests).
                New Camp if you want bows early. Swamp Camp only if you accept a harder opening for
                stronger late magic.
              </dd>
            </div>
            <div>
              <dt>Does the disc version need internet?</dt>
              <dd>
                Once on June 5, 2026: a one-time ~5 GB patch is required to launch. After that, THQ
                Nordic confirms full offline play — not permanent always-online DRM.
              </dd>
            </div>
            <div>
              <dt>PC requirements?</dt>
              <dd>
                Minimum: i7-7700K / R5 1600X, 16 GB RAM, RTX 2070 or RX 6700 XT, 60 GB storage.
                Demo players report stutter until settings are tuned — see the
                <RouterLink to="/guides">guides section</RouterLink> after launch.
              </dd>
            </div>
            <div>
              <dt>When is the Gothic 1 Remake release date?</dt>
              <dd>
                <strong>June 5, 2026</strong> worldwide on PC, PlayStation 5, and Xbox Series X|S.
                See our <a href="/#release-date">release date section</a> for platforms, day-one
                patch size, and offline-play confirmation.
              </dd>
            </div>
            <div>
              <dt>Is this guide official?</dt>
              <dd>
                No — fan-made for players searching "Gothic 1 Remake walkthrough." We update after
                launch when ship values differ from Gothic 1 baseline. Read more in
                <a href="/#about">About Gothic 1 Remake Guide</a>.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import guides from '@/data/guides.js'
import imageManifest from '@/wiki/imageManifest.json'
import '@/assets/styles/guides.css'

const videoPlaying = ref(false)

const heroTags = [
  'No Minimap',
  'No Quest Markers',
  'Three Camps',
  'Learning Points',
  'Ore Trainers',
  'Valley of Mines',
  'Focus Stones',
  'Sleeper Arc',
  'Unreal Engine 5',
  'June 5 2026',
  'PC · PS5 · Xbox',
]

const homeGuides = computed(() => guides.filter((guide) => guide.isHome))

const playerSituations = [
  {
    phase: 'After the drop',
    title: 'Surviving the first day',
    summary:
      'Stock ore, avoid scavenger packs until you train, and reach a camp before you spend Learning Points.',
    to: '/beginner#survival-title',
  },
  {
    phase: 'Chapter 1',
    title: 'Choosing Old, New, or Swamp in Gothic 1 Remake',
    summary:
      'Each faction gates different trainers and join rewards — compare XP payouts and early difficulty before you commit.',
    to: '/factions-builds',
  },
  {
    phase: 'Navigation',
    title: 'Finding places NPCs describe',
    summary:
      'Directions like “old tower” or “the other side of the lake” need landmarks, not a minimap — check routes by name.',
    to: '/interactive-map',
  },
  {
    phase: 'New & returning players',
    title: 'Gothic 1 Remake vs Gothic (2001)',
    summary:
      'Professions removed, combat adds dodge and block, the valley is larger — see what carries over and what does not.',
    to: '/guides/remake-vs-original',
  },
  {
    phase: 'Chapter 1',
    title: 'Paying trainers with ore',
    summary:
      'Scatty, Cord, and Gor-Na-Toth raise attack speed and unlock combos — untrained swings lose to almost everything.',
    to: '/wiki/characters',
  },
  {
    phase: 'Chapter 3',
    title: 'Focus stones and camp exile in Gothic 1 Remake',
    summary:
      'Artifact hunts under Stonehenge lead to betrayal in the Old Camp and a forced shift in who will still trade with you.',
    to: '/quests-story',
  },
]

const remakeGuidePoints = [
  'Trainer tiers still gate how fast you swing — the 2019 teaser’s generic combat was dropped.',
  'The valley is larger with fewer empty hills; Chapter 1 pacing no longer breaks on veteran routes.',
  'Plot gaps from retail Gothic (Orry, Mist Tower) are patched in dialogue, not a new main story.',
]

const wikiSpotlights = [
  {
    title: 'Scatty',
    category: 'Characters',
    note: 'Old Camp arena trainer — pay ore here before you pick fights in the open valley.',
    to: '/wiki/characters',
    image: imageManifest['characters/scatty'],
    initials: 'SC',
  },
  {
    title: 'Old Camp',
    category: 'Regions',
    note: 'Gomez, ore barons, fire mages — densest Chapter 1 quest hub.',
    to: '/wiki/regions',
    image: imageManifest['regions/old-camp'],
    initials: 'OC',
  },
  {
    title: 'Scavenger',
    category: 'Bestiary',
    note: 'First serious threat after the Exchange — packs punish heroes who skip training.',
    to: '/wiki/bestiary',
    image: imageManifest['bestiary/scavenger'],
    initials: 'SV',
  },
  {
    title: 'Uriziel',
    category: 'Artifacts',
    note: 'Ancient sword tied to the Sleeper arc — late-game artifact hunt.',
    to: '/wiki/artifacts',
    image: imageManifest['artifacts/uriziel'],
    initials: 'UR',
  },
  {
    title: 'Ice Bolt',
    category: 'Runes',
    note: 'Water mage circles — check scroll costs before you burn LP.',
    to: '/wiki/runes',
    image: imageManifest['runes/ice-bolt'],
    initials: 'IB',
  },
  {
    title: 'The Sleeper',
    category: 'Gods',
    note: 'Divine force behind the barrier ritual and Swamp Camp’s Great Calling.',
    to: '/wiki/gods',
    image: imageManifest['gods/sleeper'],
    initials: 'SL',
  },
]

const remakeCompareRows = [
  { topic: 'Quest markers', original: 'None', remake: 'Still none' },
  { topic: 'Professions', original: 'Yes', remake: 'Removed' },
  { topic: 'Combat', original: 'Clunky until trained', remake: 'Same gate + dodge / block / lock-on' },
  { topic: 'Map size', original: 'Baseline valley', remake: '~10–30% larger' },
  { topic: 'Release', original: 'March 2001 (EU)', remake: 'June 5, 2026 — PC, PS5, Xbox Series X|S' },
  { topic: 'Developer', original: 'Piranha Bytes', remake: 'Alkimia Interactive (THQ Nordic)' },
]

function playVideo() {
  videoPlaying.value = true
}

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.section-head {
  max-width: 680px;
  margin-bottom: 2.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
}

.section-head--row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  max-width: none;
}

.section-head--row > div {
  max-width: 680px;
}

.section-cta {
  flex-shrink: 0;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--color-accent);
  cursor: pointer;
  transition: color 0.2s ease;
}

.section-cta:hover {
  color: var(--color-accent-3);
}

.section-head h2 {
  background: var(--gradient-ember);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-head p {
  margin-top: 0.75rem;
  color: var(--color-muted);
  font-size: 1.05rem;
}

.hero-section h1 {
  font-size: clamp(1.75rem, 3.2vw, 2.35rem);
  line-height: 1.12;
}

.hero-section {
  position: relative;
  padding: 6.5rem 0 4rem;
}

.hero-section::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--gradient-divider);
}

.hero-eyebrow {
  margin-bottom: 1.25rem;
  color: var(--color-accent-3);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.hero-lead {
  margin: 1.25rem 0 2rem;
  max-width: 54ch;
  font-size: 1.12rem;
  color: color-mix(in srgb, var(--color-text) 85%, var(--color-muted));
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 2rem;
  list-style: none;
}

.hero-tags li {
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-elevated) 75%, var(--color-accent-3) 25%);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--color-text) 78%, var(--color-accent-3));
}

.hero-btn {
  display: inline-flex;
  padding: 0.85rem 1.35rem;
  border: 1px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border-strong));
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg-elevated) 72%, transparent);
  color: var(--color-text);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.hero-btn:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-glow-accent);
  transform: translateY(-1px);
}

.hero-btn-primary {
  border: 1px solid transparent;
  background: var(--gradient-ember);
  color: var(--color-on-cta);
  box-shadow: var(--shadow-glow-ember);
}

.hero-btn-primary:hover {
  color: var(--color-on-cta);
  filter: brightness(1.06);
  box-shadow: var(--shadow-glow-ember), var(--shadow-glow-accent);
}

.hero-video-wrap {
  width: 100%;
}

.hero-video-content {
  position: relative;
  width: 100%;
  min-height: 22rem;
  aspect-ratio: 16 / 9;
  padding: 1px;
  border-radius: var(--radius-md);
  background: var(--gradient-border-gold);
  overflow: hidden;
  box-shadow: var(--shadow-panel), var(--shadow-glow-accent);
}

.hero-video-content::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: calc(var(--radius-md) - 1px);
  background: var(--color-bg);
  pointer-events: none;
}

.hero-video-frame {
  position: absolute;
  inset: 1px;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: 0;
}

.hero-video-mask {
  position: absolute;
  inset: 1px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: transparent;
}

.hero-video-mask-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-accent-4) 18%, transparent) 0%,
      color-mix(in srgb, var(--color-bg) 35%, transparent) 42%,
      color-mix(in srgb, var(--color-accent) 14%, transparent) 100%
    ),
    url('/images/video-img.webp') center / cover no-repeat;
}

.hero-video-play {
  position: relative;
  z-index: 1;
  display: flex;
  color: var(--color-text);
  transition: transform 0.25s ease, color 0.25s ease;
}

.hero-video-mask:hover .hero-video-play {
  transform: scale(1.06);
  color: var(--color-accent);
}

.hero-video-mask:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.hero-note {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.78rem;
  color: var(--color-muted);
}

.situations-section {
  padding: 4rem 0;
}

.situations-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  list-style: none;
}

.situations-card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  height: 100%;
  padding: 1.25rem 1.3rem 1.15rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.22s ease,
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.situations-card:hover {
  color: var(--color-text);
  border-color: color-mix(in srgb, var(--color-accent) 45%, var(--color-border-strong));
  transform: translateY(-2px);
  box-shadow: var(--shadow-panel), var(--shadow-glow-accent);
}

.situations-card__phase {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.situations-card h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  line-height: 1.25;
  color: var(--color-text);
}

.situations-card__summary {
  flex: 1;
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-muted);
}

.changes-section {
  padding: 4rem 0;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-bg-elevated) 50%, transparent) 0%,
      transparent 100%
    );
  border-block: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
}

.changes-verdict {
  margin: 0 0 1.25rem;
  padding: 1.15rem 1.35rem 1.15rem 1.5rem;
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 30%, var(--color-border-strong));
  border-left: 3px solid var(--color-accent-3);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: color-mix(in srgb, var(--color-accent-3) 6%, var(--color-bg-elevated));
  box-shadow: var(--shadow-panel);
}

.changes-verdict p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  line-height: 1.55;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-accent-3));
}

.changes-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
  gap: 1.25rem;
}

.changes-panel__left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
}

.changes-table-wrap {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.changes-table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.changes-table caption {
  margin-bottom: 0.65rem;
  text-align: left;
  font-size: 0.82rem;
  color: var(--color-muted);
}

.changes-table th,
.changes-table td {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  text-align: left;
  vertical-align: middle;
  overflow-wrap: break-word;
}

.changes-table thead th {
  padding: 0.95rem 1.15rem;
}

.changes-table tbody {
  height: 100%;
}

.changes-table tbody tr {
  height: calc(100% / 6);
}

.changes-table th[scope='row'] {
  font-weight: 600;
  color: color-mix(in srgb, var(--color-text) 85%, var(--color-muted));
}

.changes-aside {
  align-self: start;
}

.changes-aside__link {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  box-shadow: var(--shadow-panel), var(--shadow-glow-ember);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.22s ease,
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.changes-aside__link:hover {
  color: var(--color-text);
  border-color: color-mix(in srgb, var(--color-accent-4) 45%, var(--color-border-strong));
  transform: translateY(-2px);
}

.changes-aside__media {
  flex-shrink: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-accent-4) 25%, var(--color-border));
}

.changes-aside__media img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.changes-aside__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem 1.1rem 1.1rem;
}

.changes-aside__label {
  margin-bottom: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-4);
}

.changes-aside__body h3 {
  margin: 0 0 0.65rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.25;
}

.changes-aside__body ul {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 0.85rem;
  list-style: none;
}

.changes-aside__body li {
  position: relative;
  padding-left: 0.85rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-muted);
}

.changes-aside__body li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent-3);
}

.changes-aside__cta {
  margin-top: auto;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-accent);
}

.changes-trio {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 0;
  list-style: none;
}

.changes-trio li {
  padding: 1rem 1.05rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
}

.changes-trio strong {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.changes-trio p {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--color-muted);
}

.changes-trio__kept {
  border-top: 3px solid var(--color-accent);
}

.changes-trio__kept strong {
  color: var(--color-accent);
}

.changes-trio__added {
  border-top: 3px solid var(--color-camp-new);
}

.changes-trio__added strong {
  color: var(--color-camp-new);
}

.changes-trio__cut {
  border-top: 3px solid var(--color-accent-4);
}

.changes-trio__cut strong {
  color: var(--color-accent-4);
}

.camps-section {
  padding: 4rem 0;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-bg-elevated) 55%, transparent) 0%,
      color-mix(in srgb, var(--color-accent-4) 6%, transparent) 50%,
      color-mix(in srgb, var(--color-bg-elevated) 55%, transparent) 100%
    );
  border-block: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
}

.camps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.camps-grid article {
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 1.5rem;
  background: var(--gradient-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-panel);
}

.camps-grid header {
  display: flex;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.camp-mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 35%, var(--color-border));
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-accent-3);
  background: color-mix(in srgb, var(--color-bg) 65%, var(--color-bg-elevated));
}

.camp-old .camp-mark {
  color: var(--color-accent-4);
  border-color: color-mix(in srgb, var(--color-accent-4) 40%, var(--color-border));
}

.camp-new .camp-mark {
  color: var(--color-camp-new);
  border-color: color-mix(in srgb, var(--color-camp-new) 40%, var(--color-border));
}

.camp-swamp .camp-mark {
  color: var(--color-accent-2);
  border-color: color-mix(in srgb, var(--color-accent-2) 40%, var(--color-border));
}

.camp-leader {
  font-size: 0.82rem;
  color: var(--color-muted);
}

.camps-grid article > p {
  color: var(--color-muted);
  font-size: 0.92rem;
  margin-bottom: 1rem;
}

.camp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.camp-tags li {
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-bg-elevated) 75%, var(--color-accent-3) 25%);
  font-size: 0.72rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--color-text) 70%, var(--color-accent-3));
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.camp-old article::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent-4), var(--color-accent-3));
}

.camp-new article::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-camp-new), var(--color-accent));
}

.camp-swamp article::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent-2), var(--color-accent));
}

.quests-section {
  padding: 4rem 0;
}

.quest-chapters {
  display: grid;
  gap: 2rem;
}

.quest-chapter {
  position: relative;
  padding: 1.75rem 1.75rem 1.75rem 2rem;
  background: var(--gradient-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-panel);
}

.quest-chapter::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: var(--gradient-barrier);
  box-shadow: 0 0 14px color-mix(in srgb, var(--color-accent) 30%, transparent);
}

.quest-chapter h3 {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: baseline;
  margin-bottom: 1.25rem;
}

.quest-chapter h3 span {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-muted);
}

.quest-chapter table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.quest-chapter th,
.quest-chapter td {
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}

.quest-chapter th {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.quest-chapter td {
  color: color-mix(in srgb, var(--color-text) 80%, var(--color-muted));
}

.quest-chapter-compact ul {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: var(--color-muted);
  font-size: 0.92rem;
}

.chapter-link {
  font-size: 0.88rem;
  font-weight: 600;
}

.guides-section {
  padding: 4rem 0;
}

.home-guide-list {
  margin-top: 0;
}

.wiki-section {
  padding: 4rem 0;
  border-block: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
  background:
    linear-gradient(
      180deg,
      transparent 0%,
      color-mix(in srgb, var(--color-accent-4) 5%, transparent) 50%,
      transparent 100%
    );
}

.wiki-spotlight {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  list-style: none;
}

.wiki-spotlight__card {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 0.95rem;
  align-items: start;
  height: 100%;
  padding: 1rem 1.05rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.22s ease,
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.wiki-spotlight__card:hover {
  color: var(--color-text);
  border-color: color-mix(in srgb, var(--color-accent) 42%, var(--color-border-strong));
  transform: translateY(-2px);
  box-shadow: var(--shadow-panel), var(--shadow-glow-accent);
}

.wiki-spotlight__visual {
  position: relative;
}

.wiki-spotlight__visual img,
.wiki-spotlight__fallback {
  width: 88px;
  height: 88px;
  border-radius: calc(var(--radius-md) - 2px);
  border: 1px solid color-mix(in srgb, var(--color-accent-3) 35%, var(--color-border));
  object-fit: cover;
}

.wiki-spotlight__fallback {
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  background:
    radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 55%),
    color-mix(in srgb, var(--color-bg-elevated) 88%, transparent);
}

.wiki-spotlight__cat {
  margin-bottom: 0.2rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.wiki-spotlight__body h3 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 1.12rem;
  line-height: 1.15;
}

.wiki-spotlight__body p {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-muted);
}

.release-section {
  padding: 4rem 0;
  border-top: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
}

.release-highlight {
  margin-bottom: 2rem;
  padding: 2rem 2.25rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background:
    linear-gradient(
      165deg,
      color-mix(in srgb, var(--color-bg-elevated) 92%, var(--color-accent-4) 8%) 0%,
      color-mix(in srgb, var(--color-bg-elevated) 88%, var(--color-accent) 12%) 100%
    )
    padding-box,
    var(--gradient-border-gold) border-box;
  box-shadow: var(--shadow-panel), var(--shadow-glow-ember);
  text-align: center;
}

.release-label {
  margin-bottom: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.release-date {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.release-date time {
  background: var(--gradient-ember);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.release-note {
  max-width: 52ch;
  margin: 1rem auto 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.release-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.release-card {
  padding: 1.35rem 1.4rem;
  background: var(--gradient-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-panel);
}

.release-card h3 {
  margin-bottom: 0.85rem;
  font-size: 1.05rem;
  color: var(--color-accent);
}

.release-card ul {
  display: grid;
  gap: 0.5rem;
}

.release-card li {
  position: relative;
  padding-left: 1rem;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.release-card li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent-3);
}

.release-facts {
  display: grid;
  gap: 0.65rem;
}

.release-facts dt {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.release-facts dd {
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--color-text) 82%, var(--color-muted));
}

.release-footer {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--color-muted);
}

.release-footer strong {
  color: color-mix(in srgb, var(--color-text) 80%, var(--color-accent-3));
}

.release-footer a {
  display: inline-block;
  margin-left: 0.35rem;
  font-weight: 600;
}

.about-section {
  padding: 4rem 0;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-bg-elevated) 50%, transparent) 0%,
      transparent 100%
    );
  border-top: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
}

.about-panel {
  display: grid;
  grid-template-columns: minmax(240px, 38%) minmax(0, 1fr);
  gap: 0;
  align-items: stretch;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
}

.about-visual {
  margin: 0;
  min-height: 100%;
}

.about-visual img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center top;
}

.about-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.35rem;
  padding: clamp(1.35rem, 2.5vw, 2rem);
  border-left: 1px solid color-mix(in srgb, var(--color-accent) 18%, var(--color-border));
}

.about-intro {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-muted));
}

.about-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem 1.25rem;
}

.about-columns h3 {
  margin: 0 0 0.4rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.25;
  color: var(--color-accent-3);
}

.about-columns p {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.faq-section {
  padding: 4rem 0 6rem;
}

.faq-content dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.faq-content div {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem 1.3rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-surface);
  box-shadow: var(--shadow-panel);
}

.faq-content dt {
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-accent-3);
}

.faq-content dd {
  flex: 1;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
  }

  .situations-grid,
  .camps-grid,
  .changes-panel {
    grid-template-columns: 1fr;
  }

  .changes-table-wrap {
    flex: none;
  }

  .changes-table {
    height: auto;
  }

  .changes-table tbody tr {
    height: auto;
  }

  .changes-table th,
  .changes-table td {
    padding: 0.85rem 1rem;
  }

  .changes-trio {
    grid-template-columns: 1fr;
  }

  .release-grid {
    grid-template-columns: 1fr;
  }

  .about-panel {
    grid-template-columns: 1fr;
  }

  .about-body {
    border-left: 0;
    border-top: 1px solid color-mix(in srgb, var(--color-accent) 18%, var(--color-border));
  }

  .about-visual img {
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 0;
  }

  .about-columns {
    grid-template-columns: 1fr;
  }

  .faq-content dl {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .wiki-spotlight {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .faq-content dl {
    grid-template-columns: 1fr;
  }

  .quest-chapter table {
    font-size: 0.8rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-btn {
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .situations-card:hover,
  .changes-aside__link:hover,
  .wiki-spotlight__card:hover {
    transform: none;
  }
}
</style>
