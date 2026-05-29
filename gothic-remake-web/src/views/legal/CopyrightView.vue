<template>
  <main class="page-main">
    <div class="container">
      <section class="page-hero-section" aria-labelledby="copyright-title">
        <div class="page-hero-content">
          <p class="page-eyebrow">Legal · Copyright</p>
          <h1 id="copyright-title">Copyright Notice</h1>
          <p class="page-intro">
            This page describes how copyright applies to Gothic 1 Remake Guide and to third-party
            game assets referenced on the site.
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
            <h2>Game and franchise rights</h2>
            <p>
              Gothic and Gothic 1 Remake are trademarks and copyrighted works of THQ Nordic AB and
              related rights holders. Character names, location names, quest titles, and in-game text
              referenced in our guides remain the property of their respective owners. This fan site
              is not authorized or endorsed by THQ Nordic or Alkimia Interactive.
            </p>
          </article>

          <article>
            <h2>Original guide content</h2>
            <p>
              Original writing, information architecture, comparison tables, and editorial selection
              on Gothic 1 Remake Guide are copyright © {{ year }} Colony Guide contributors unless
              otherwise noted. We compile publicly available demo information, player-verified
              findings, and wiki-style reference data into new explanatory articles.
            </p>
          </article>

          <article>
            <h2>Images and media</h2>
            <p>
              Screenshots, logos, and artwork displayed on this site may belong to THQ Nordic,
              Alkimia Interactive, or original Gothic (2001) rights holders. We use such material
              under fair use / fair dealing for commentary, guide illustration, and non-commercial
              fan education where applicable. Placeholder images may appear until launch assets are
              cleared for guide use.
            </p>
            <p>
              If you are a rights holder and believe an image should be removed or credited
              differently, contact
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>.
            </p>
          </article>

          <article>
            <h2>Permitted use of our content</h2>
            <p>You may:</p>
            <ul class="bullet-list">
              <li>
                Share links to individual guide or wiki pages on social media or community forums.
              </li>
              <li>
                Quote short passages with clear attribution and a hyperlink to the canonical page.
              </li>
              <li>
                Use our tables or checklists for personal offline reference without modification.
              </li>
            </ul>
          </article>

          <article>
            <h2>Restricted use</h2>
            <p>Without written permission, you may not:</p>
            <ul class="bullet-list">
              <li>
                Mirror the entire site or bulk-export our wiki database for commercial
                republication.
              </li>
              <li>
                Remove copyright notices or present our articles as official publisher
                documentation.
              </li>
              <li>
                Train machine-learning models primarily on our full-text guides for commercial
                products.
              </li>
            </ul>
          </article>

          <article>
            <h2>Infringement claims</h2>
            <p>
              If you believe content on this site infringes your copyright, email
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>
              with a description of the work, the URL in question, and proof of ownership. We will
              review good-faith notices and remove or adjust material when appropriate.
            </p>
          </article>

          <nav class="page-links" aria-label="Legal pages">
            <RouterLink to="/legal/privacy-policy">Privacy Policy →</RouterLink>
            <RouterLink to="/legal/terms-of-service">Terms of Service →</RouterLink>
            <RouterLink to="/legal/about-us">About Us →</RouterLink>
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

const year = new Date().getFullYear()
</script>

<style scoped>
.page-body-section {
  padding-bottom: 4rem;
}
</style>
