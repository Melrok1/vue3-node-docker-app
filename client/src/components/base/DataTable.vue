<template>
  <div>

    <!-- table -->
    <table>

      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.label }}
          </th>
          <th v-if="$slots.actions">Akcie</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in paginatedItems" :key="item._id">
          <td v-for="header in headers" :key="header.key">
            {{ item[header.key] }}
          </td>
          <td v-if="$slots.actions">
            <slot name="actions" :item="item" />
          </td>
        </tr>
      </tbody>

    </table>

    <!-- pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">«</button>
      <span>Strana {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">»</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Header {
  key: string
  label: string
}

const props = defineProps<{
  items: any[]
  headers: Header[]
  perPage?: number
}>()

const currentPage = ref(1)

const perPage = computed(() => props.perPage ?? 5)

const totalPages = computed(() =>
  Math.ceil(props.items.length / perPage.value)
)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return props.items.slice(start, start + perPage.value)
})

function nextPage () {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage () {
  if (currentPage.value > 1) currentPage.value--
}

// reset strany pri zmene dát
watch(() => props.items, () => {
  currentPage.value = 1
})

</script>

<style scoped lang="scss">

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: left;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

</style>
