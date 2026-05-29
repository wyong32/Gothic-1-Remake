<template>
  <main class="page-main">
    <div class="container">
      <section class="page-hero-section" aria-labelledby="about-title">
        <div class="page-hero-content">
          <p class="page-eyebrow">Legal · About</p>
          <h1 id="about-title">About Us</h1>
          <p class="page-intro">
            Gothic 1 Remake Guide is a player-run knowledge base built for the 2026 remake of
            Piranha Bytes' classic colony RPG — walkthroughs without hand-holding, just like the
            game.
          </p>
          <ul class="page-meta">
            <li><strong>Last updated:</strong> May 28, 2026</li>
            <li>
              <strong>Contact:</strong>
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>
            </li>
          </ul>
        </div>
      </section>

      <section class="page-body-section">
        <div class="page-body-content">
          <article>
            <h2>Our mission</h2>
            <p>
              We built this site because Gothic 1 Remake keeps the original's harshest design
              promises: no quest markers, no minimap, ore-paid trainers, and a permanent three-camp
              choice. New players need structured help; returning veterans need a clear list of what
              changed. We document both without pretending to be an official publisher wiki.
            </p>
          </article>

          <article>
            <h2>What we publish</h2>
            <p>Our coverage includes:</p>
            <ul class="bullet-list">
              <li>Beginner survival routes for the first hours in the Mining Valley.</li>
              <li>Faction and build planning for Old Camp, New Camp, and Swamp Camp.</li>
              <li>
                Quest and story indexes organized by chapter, with links to deeper walkthroughs as
                they ship.
              </li>
              <li>Reference wiki categories for NPCs, weapons, regions, and mechanics.</li>
              <li>Long-form guides comparing the Remake to Gothic (2001) where systems diverge.</li>
              <li>
                An interactive map hub for zone orientation (expanded after launch verification).
              </li>
            </ul>
          </article>

          <article>
            <h2>Editorial standards</h2>
            <p>
              We prioritize Remake-first information verified against public demos, developer
              interviews, and post-launch player reports. When a detail is uncertain, we say so
              rather than copying outdated Gothic 1 spreadsheets. Spoilers are structured by chapter
              so you can stop before major plot turns.
            </p>
          </article>

          <article>
            <h2>Independence</h2>
            <p>
              Gothic 1 Remake Guide is a fan project. We do not receive revenue sharing, preview
              access agreements, or editorial direction from THQ Nordic or Alkimia Interactive.
              Trademark acknowledgments appear in our footer and legal pages out of respect for
              rights holders, not as a claim of partnership.
            </p>
          </article>

          <article>
            <h2>Contributing and corrections</h2>
            <p>
              Launch week will surface edge cases no preview could cover — XP tuning, ore prices,
              quest flag bugs. If you find an error, outdated reward table, or missing camp route,
              email
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>
              with the quest name, platform, and game version. We patch guides from reproducible
              player reports.
            </p>
          </article>

          <nav class="page-links" aria-label="Legal pages">
            <RouterLink to="/legal/privacy-policy">Privacy Policy →</RouterLink>
            <RouterLink to="/legal/terms-of-service">Terms of Service →</RouterLink>
            <RouterLink to="/legal/copyright">Copyright →</RouterLink>
            <RouterLink to="/legal/contact-us">Contact Us →</RouterLink>
            <RouterLink to="/">Back to home →</RouterLink>
          </nav>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.page-body-section {
  padding-bottom: 4rem;
}
</style>
