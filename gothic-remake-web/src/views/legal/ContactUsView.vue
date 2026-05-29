<template>
  <main class="page-main">
    <div class="container">
      <section class="page-hero-section" aria-labelledby="contact-title">
        <div class="page-hero-content">
          <p class="page-eyebrow">Legal · Contact</p>
          <h1 id="contact-title">Contact Us</h1>
          <p class="page-intro">
            Reach the Gothic 1 Remake Guide team for corrections, copyright notices, privacy
            requests, or general questions about this fan site.
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
            <h2>General inquiries</h2>
            <p>
              For questions about how to use the site, suggested guide topics, or community link
              exchanges, write to
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>.
              We read every message but may need several business days to reply during launch week
              traffic.
            </p>
          </article>

          <article>
            <h2>Guide corrections</h2>
            <p>
              When reporting a gameplay error in our walkthroughs, include the page URL, your
              platform (PC, PS5, or Xbox Series X|S), game patch version if known, and steps to
              reproduce the issue. Screenshots or short video links help us verify Remake-specific
              behavior quickly.
            </p>
          </article>

          <article>
            <h2>Privacy and legal</h2>
            <p>
              Privacy-related requests under our Privacy Policy and copyright or Terms of Service
              inquiries should use the same address:
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>.
              Put "Privacy Request" or "Legal Notice" in the subject line so we can route your
              message correctly.
            </p>
          </article>

          <article>
            <h2>What we cannot help with</h2>
            <p>
              We cannot reset save files, restore lost ore, grant game keys, or escalate bugs to
              Alkimia Interactive on your behalf. For official product support, account issues, or
              refund requests, contact THQ Nordic through their published support channels.
            </p>
          </article>

          <article>
            <h2>Email address</h2>
            <p>
              Primary contact:
              <a href="mailto:wyong@gothic1remake.com">wyong@gothic1remake.com</a>
            </p>
            <p>
              We do not operate live chat, Discord moderation, or ticket portals on this site.
              Email is the only supported contact method for legal and editorial correspondence.
            </p>
          </article>

          <nav class="page-links" aria-label="Legal pages">
            <RouterLink to="/legal/privacy-policy">Privacy Policy →</RouterLink>
            <RouterLink to="/legal/terms-of-service">Terms of Service →</RouterLink>
            <RouterLink to="/legal/copyright">Copyright →</RouterLink>
            <RouterLink to="/legal/about-us">About Us →</RouterLink>
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
