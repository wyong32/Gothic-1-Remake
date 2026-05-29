import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { getWikiCategory } from '@/wiki'
import guides from '@/data/guides.js'
import { seoConfig } from '@/seo/config.js'
import {
  applyDocumentSeo,
  buildArticleJsonLd,
  resolveCanonicalUrl,
} from '@/seo/documentMeta.js'

const NOT_FOUND_GUIDE_TDK = {
  title: 'Guide Not Found — Gothic 1 Remake Player Guides',
  description:
    'This Gothic 1 Remake guide article does not exist yet. Browse our guide index for Remake vs original comparisons, combat tips, and launch-week walkthroughs.',
  keywords: 'Gothic 1 Remake guides, Gothic 1 Remake walkthrough, guide not found',
}

const NOT_FOUND_WIKI_TDK = {
  title: 'Wiki Category Not Found — Gothic 1 Remake Wiki',
  description:
    'This Gothic 1 Remake wiki category was not found. Return to the wiki index for gods, regions, characters, weapons, quests, and twelve reference categories.',
  keywords: 'Gothic 1 Remake wiki, wiki category, Gothic 1 Remake reference',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.query.section) {
      return false
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Gothic 1 Remake Guide — Release, Walkthroughs & Quests',
        description:
          'Gothic 1 Remake guide: June 5, 2026 release date, beginner walkthroughs, three-camp builds, quest directory, wiki, and interactive map for the Mining Valley.',
        keywords:
          'Gothic 1 Remake, Gothic 1 Remake guide, release date, walkthrough, quests, factions, wiki, interactive map',
      },
    },
    {
      path: '/beginner',
      name: 'beginner',
      component: () => import('@/views/BeginnerView.vue'),
      meta: {
        title: 'Gothic 1 Remake Beginner Guide — Survival & First Hours',
        description:
          'Gothic 1 Remake beginner guide for the Mining Valley: survival rules, LP trainers, combat basics, ore economy, and Chapter 1 faction choices for new convicts.',
        keywords:
          'Gothic 1 Remake beginner guide, survival, LP trainers, combat, ore, Chapter 1, Mining Valley',
      },
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: () => import('@/views/WikiView.vue'),
      meta: {
        title: 'Gothic 1 Remake Wiki — Gods, Items & NPC Reference Index',
        description:
          'Gothic 1 Remake wiki index: twelve categories for gods, regions, characters, bestiary, quests, weapons, armors, potions, runes, trophies, artifacts, and mechanics.',
        keywords:
          'Gothic 1 Remake wiki, NPC reference, weapons, bestiary, quests, gods, regions, encyclopedia',
      },
    },
    {
      path: '/wiki/:slug',
      name: 'wiki-category',
      component: () => import('@/views/wiki/WikiCategoryView.vue'),
    },
    {
      path: '/factions-builds',
      name: 'factions-builds',
      component: () => import('@/views/FactionsBuildsView.vue'),
      meta: {
        title: 'Gothic 1 Remake Factions & Builds — Old, New, Swamp',
        description:
          'Gothic 1 Remake factions and builds guide: compare Old Camp, New Camp, and Swamp Camp oaths, class paths, LP builds, melee, ranged, and magic for Chapter 1.',
        keywords:
          'Gothic 1 Remake factions, builds, Old Camp, New Camp, Swamp Camp, LP, melee, magic',
      },
    },
    {
      path: '/quests-story',
      name: 'quests-story',
      component: () => import('@/views/QuestsStoryView.vue'),
      meta: {
        title: 'Gothic 1 Remake Quests & Story — All Chapters Hub',
        description:
          'Gothic 1 Remake quests and story hub: chapter walkthrough index, faction admission quests, focus stones, Xardas arc, and Sleeper finale with no quest markers.',
        keywords:
          'Gothic 1 Remake quests, story walkthrough, chapters, focus stones, Sleeper, Xardas, main quest',
      },
    },
    {
      path: '/guides',
      name: 'guides',
      component: () => import('@/views/GuidesView.vue'),
      meta: {
        title: 'Gothic 1 Remake Guides — Articles, Tips & Deep Dives',
        description:
          'Gothic 1 Remake guides library: long-form articles on Remake changes, combat, economy, camp routes, and launch-week fixes beyond the wiki reference pages.',
        keywords:
          'Gothic 1 Remake guides, articles, Remake changes, combat guide, economy, deep dives',
      },
    },
    {
      path: '/guides/:slug',
      name: 'guide-detail',
      component: () => import('@/views/GuideDetailView.vue'),
    },
    {
      path: '/interactive-map',
      name: 'interactive-map',
      component: () => import('@/views/InteractiveMapView.vue'),
      meta: {
        title: 'Gothic 1 Remake Interactive Map — Valley Zones Atlas',
        description:
          'Gothic 1 Remake interactive map hub for the Mining Valley: zone danger ratings, vertical paths, trainer locations, quest landmarks, and regional atlas preview.',
        keywords:
          'Gothic 1 Remake map, interactive map, Mining Valley, zones, trainers, landmarks, atlas',
      },
    },
    {
      path: '/legal/privacy-policy',
      name: 'legal-privacy',
      component: () => import('@/views/legal/PrivacyPolicyView.vue'),
      meta: {
        title: 'Privacy Policy — Gothic 1 Remake Guide Legal',
        description:
          'Gothic 1 Remake Guide privacy policy: what data we collect on this fan walkthrough site, cookies, analytics, third-party links, and how to contact us about your privacy rights.',
        keywords:
          'Gothic 1 Remake Guide privacy policy, fan site privacy, cookies, data collection, legal',
      },
    },
    {
      path: '/legal/terms-of-service',
      name: 'legal-terms',
      component: () => import('@/views/legal/TermsOfServiceView.vue'),
      meta: {
        title: 'Terms of Service — Gothic 1 Remake Guide Legal',
        description:
          'Gothic 1 Remake Guide terms of service: acceptable use, fan content disclaimer, no warranty, limitation of liability, and rules for using our walkthrough and wiki resources.',
        keywords:
          'Gothic 1 Remake Guide terms of service, fan site terms, acceptable use, legal disclaimer',
      },
    },
    {
      path: '/legal/copyright',
      name: 'legal-copyright',
      component: () => import('@/views/legal/CopyrightView.vue'),
      meta: {
        title: 'Copyright Notice — Gothic 1 Remake Guide Legal',
        description:
          'Gothic 1 Remake Guide copyright notice: fan site ownership, THQ Nordic game trademarks, permitted linking and quotes, and DMCA-style infringement reporting contact.',
        keywords:
          'Gothic 1 Remake Guide copyright, fan site copyright, THQ Nordic, DMCA, intellectual property',
      },
    },
    {
      path: '/legal/about-us',
      name: 'legal-about',
      component: () => import('@/views/legal/AboutUsView.vue'),
      meta: {
        title: 'About Us — Gothic 1 Remake Guide Fan Site',
        description:
          'About Gothic 1 Remake Guide: independent fan walkthrough site for the 2026 Remake, covering beginner survival, quests, factions, wiki reference, and launch updates.',
        keywords:
          'Gothic 1 Remake Guide about, fan site, walkthrough team, Alkimia Interactive, colony guide',
      },
    },
    {
      path: '/legal/contact-us',
      name: 'legal-contact',
      component: () => import('@/views/legal/ContactUsView.vue'),
      meta: {
        title: 'Contact Us — Gothic 1 Remake Guide Support Email',
        description:
          'Contact Gothic 1 Remake Guide at wyong@gothic1remake.com for guide corrections, privacy requests, copyright notices, and fan site questions. No in-game support.',
        keywords:
          'Gothic 1 Remake Guide contact, fan site email, guide corrections, privacy request, copyright',
      },
    },
  ],
})

function resolvePageMeta(to) {
  if (to.name === 'wiki-category' && to.params.slug) {
    const cat = getWikiCategory(to.params.slug)
    return cat?.seo ?? NOT_FOUND_WIKI_TDK
  }

  if (to.name === 'guide-detail' && to.params.slug) {
    const guide = guides.find((item) => item.addressBar === to.params.slug)
    return guide?.seo ?? NOT_FOUND_GUIDE_TDK
  }

  if (to.meta.title && to.meta.description && to.meta.keywords) {
    return {
      title: to.meta.title,
      description: to.meta.description,
      keywords: to.meta.keywords,
    }
  }

  return seoConfig.defaults
}

router.afterEach((to) => {
  if (to.name === 'guide-detail') {
    const slug = to.params.slug
    const guide = guides.find((item) => item.addressBar === slug)
    const path = guide ? `/guides/${guide.addressBar}` : to.path

    if (!guide) {
      applyDocumentSeo({
        path,
        title: NOT_FOUND_GUIDE_TDK.title,
        description: NOT_FOUND_GUIDE_TDK.description,
        keywords: NOT_FOUND_GUIDE_TDK.keywords,
      })
      return
    }

    const title = guide.seo?.title || guide.title
    const description = guide.seo?.description || guide.description || seoConfig.defaults.description
    const keywords = guide.seo?.keywords || seoConfig.defaults.keywords

    applyDocumentSeo({
      path,
      title,
      description,
      keywords,
      ogImage: guide.imageUrl,
      ogType: 'article',
      jsonLd: buildArticleJsonLd({
        headline: title,
        description,
        url: resolveCanonicalUrl(path),
        datePublished: guide.publishDate,
        imageUrl: guide.imageUrl,
      }),
    })
    return
  }

  if (to.name === 'wiki-category') {
    const slug = to.params.slug
    const cat = getWikiCategory(slug)
    const path = cat ? `/wiki/${cat.slug}` : to.path
    const meta = cat?.seo ?? NOT_FOUND_WIKI_TDK

    applyDocumentSeo({
      path,
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
    })
    return
  }

  const meta = resolvePageMeta(to)
  applyDocumentSeo({
    path: to.path,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    ogImage: to.meta?.ogImage,
  })
})

export default router
