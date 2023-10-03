<template>
  <div class="flex items-center">
    <input
        class="rounded border w-full py-2 px-3"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="search..." />
  </div>
</template>

<script setup>

import {ref, defineProps} from "vue";
const emit = defineEmits(['search'])

const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}

</script>

<style scoped lang="scss">

</style>