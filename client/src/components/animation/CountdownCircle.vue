<template>
  <div class="loader-container">
    <div class="loader-spinner" :style="loaderStyle" />
    <span v-if="showTime" class="count">{{ remainingTime }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

interface Props {
  duration: number
  color?: string
  showTime?: boolean
}

const props = defineProps<Props>()

const remainingTime = ref(Math.ceil(props.duration / 1000))

onMounted(() => {
  const interval = setInterval(() => {
    remainingTime.value--
    if (remainingTime.value <= 0) clearInterval(interval)
  }, 1000)
})

const loaderStyle = computed(() => ({
  '--loader-color': props.color || '#1d572e',
  '--loader-duration': `${props.duration}ms`
}))
</script>

<style scoped>
.loader-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.loader-spinner {
  width: 100%;
  height: 100%;
  border: 3px solid #e6f9ec;
  border-top: 3px solid var(--loader-color);
  border-radius: 50%;
  animation: spin var(--loader-duration) linear;
}

.count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--loader-color);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>