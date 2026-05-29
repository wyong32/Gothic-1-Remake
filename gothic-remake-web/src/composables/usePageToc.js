import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const SCROLL_OFFSET = '5.75rem'

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function usePageToc(contentRef) {
  const route = useRoute()
  const router = useRouter()
  const items = ref([])
  const activeSlug = ref('')
  let observer = null

  function collectHeadings() {
    const root = contentRef.value
    if (!root) return []

    const headings = [...root.querySelectorAll('h2')]
    const used = new Set()

    return headings.map((el, index) => {
      let slug = el.getAttribute('data-toc-slug')

      if (!slug) {
        slug = slugify(el.textContent || '') || `section-${index + 1}`
        let unique = slug
        let suffix = 2
        while (used.has(unique)) {
          unique = `${slug}-${suffix++}`
        }
        slug = unique
        el.setAttribute('data-toc-slug', slug)
      }

      used.add(slug)
      el.style.scrollMarginTop = SCROLL_OFFSET

      return {
        slug,
        title: el.textContent?.trim() || slug,
        el,
      }
    })
  }

  function scrollToSection(slug, { updateUrl = true } = {}) {
    const target = contentRef.value?.querySelector(`[data-toc-slug="${CSS.escape(slug)}"]`)
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSlug.value = slug

    if (updateUrl) {
      router.replace({ query: { ...route.query, section: slug } })
    }
  }

  function setupObserver() {
    observer?.disconnect()
    if (!items.value.length) return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) {
          activeSlug.value = visible[0].target.getAttribute('data-toc-slug') || ''
        }
      },
      { rootMargin: '-18% 0px -72% 0px', threshold: 0 },
    )

    items.value.forEach(({ el }) => observer.observe(el))
  }

  async function refresh() {
    await nextTick()
    items.value = collectHeadings()
    setupObserver()

    if (items.value.length && !activeSlug.value) {
      activeSlug.value = items.value[0].slug
    }
  }

  onMounted(async () => {
    await refresh()

    const section = route.query.section
    if (typeof section === 'string' && section) {
      await nextTick()
      scrollToSection(section, { updateUrl: false })
    }
  })

  watch(
    () => route.path,
    async () => {
      activeSlug.value = ''
      await refresh()

      const section = route.query.section
      if (typeof section === 'string' && section) {
        await nextTick()
        scrollToSection(section, { updateUrl: false })
      }
    },
  )

  watch(
    () => route.query.section,
    (section) => {
      if (typeof section === 'string' && section && section !== activeSlug.value) {
        scrollToSection(section, { updateUrl: false })
      }
    },
  )

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { items, activeSlug, scrollToSection }
}
