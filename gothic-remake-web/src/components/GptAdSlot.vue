<template>
  <aside class="gpt-ad-wrap" aria-label="Advertisement">
    <div :id="elementId" class="gpt-ad-slot" :style="slotStyle" />
  </aside>
</template>

<script setup>
import { computed, nextTick, onMounted, watch } from 'vue'
import { mountGptAd } from '@/utils/gptAds'

const props = defineProps({
  pageId: {
    type: String,
    required: true,
  },
  slotId: {
    type: [String, Number],
    required: true,
  },
  unit: {
    type: [String, Number],
    required: true,
  },
})

const elementId = computed(() => `div-gpt-ad-${props.pageId}-${props.slotId}`)

const slotStyle = computed(() => {
  const styles = {
    inter: { minWidth: '300px', minHeight: '50px' },
    1: { minWidth: '320px', minHeight: '90px' },
    2: { minWidth: '728px', minHeight: '90px' },
    3: { minWidth: '320px', minHeight: '90px' },
  }
  return styles[props.unit] ?? styles[1]
})

function displayAd() {
  nextTick(() => mountGptAd(elementId.value, props.unit))
}

onMounted(displayAd)
watch(elementId, displayAd)
</script>

<style scoped>
.gpt-ad-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
}

.gpt-ad-slot {
  margin-inline: auto;
  overflow: hidden;
}

@media (max-width: 768px) {
  .gpt-ad-slot {
    min-width: 320px !important;
    max-width: 100%;
  }
}
</style>
