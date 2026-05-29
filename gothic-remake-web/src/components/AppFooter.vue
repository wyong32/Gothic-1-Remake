<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer-content">
        <div class="footer-brand">
          <div class="footer-brand-content">
            <img
            class="footer-brand-image"
            src="/images/logo.webp"
            alt=""
          />
          <span class="footer-brand-text">Gothic 1 Remake Guide</span>
          </div>
          
          <p>
            Your player hub for Gothic 1 Remake — beginner survival tips, faction builds, quest
            walkthroughs, reference wiki, in-depth guides, and an interactive valley map.
          </p>
        </div>

        <nav class="footer-nav" aria-label="Footer">
          <div>
            <h3>Navigate</h3>
            <ul>
              <li><RouterLink to="/">Home</RouterLink></li>
              <li><RouterLink to="/beginner">Beginner</RouterLink></li>
              <li><RouterLink to="/wiki">Wiki</RouterLink></li>
              <li><RouterLink to="/factions-builds">Factions &amp; Builds</RouterLink></li>
              <li><RouterLink to="/quests-story">Quests &amp; Story</RouterLink></li>
              <li><RouterLink to="/guides">Guides</RouterLink></li>
              <li><RouterLink to="/interactive-map">Interactive Map</RouterLink></li>
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              <li><RouterLink to="/legal/privacy-policy">Privacy Policy</RouterLink></li>
              <li><RouterLink to="/legal/terms-of-service">Terms of Service</RouterLink></li>
              <li><RouterLink to="/legal/copyright">Copyright</RouterLink></li>
              <li><RouterLink to="/legal/about-us">About Us</RouterLink></li>
              <li><RouterLink to="/legal/contact-us">Contact Us</RouterLink></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 gothic1remake.com. All rights reserved.</p>
        <p class="footer-disclaimer">
          The Gothic 1 Remake Guide is an independent player resource for informational purposes.
          Gothic and related marks are trademarks of their respective owners.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  margin-top: 5rem;
  padding: 3.5rem 0 2rem;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-bg-elevated) 92%, var(--color-accent) 8%) 0%,
      color-mix(in srgb, var(--color-bg) 96%, transparent) 100%
    );
  border-top: 1px solid transparent;
  border-image: var(--gradient-divider) 1;
}

.site-footer-content {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(320px, 1.4fr);
  gap: 3rem;
  padding-bottom: 2.5rem;
}

.footer-brand-content {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.footer-brand-image {
  width: 40px;
  height: auto;
}

.footer-brand-text {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.footer-nav > div {
  padding-left: 1rem;
  border-left: 2px solid transparent;
  border-image: var(--gradient-ember) 0 0 0 1;
}

.footer-nav > div:first-child {
  padding-left: 0;
  border-left: none;
}

.footer-nav h3 {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-3);
  margin-bottom: 1rem;
}

.footer-nav li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.footer-copy {
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--color-muted) 92%, var(--color-text));
  margin-bottom: 0.5rem;
}

.footer-bottom {
  padding-top: 1.5rem;
  border-top: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
  text-align: center;
}

.footer-disclaimer {
  font-size: 0.8rem;
  line-height: 1.55;
  color: color-mix(in srgb, var(--color-muted) 78%, var(--color-bg));
  max-width: 40rem;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .site-footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-nav {
    grid-template-columns: 1fr;
  }
}
</style>
