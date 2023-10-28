<template>
  <div class="flex">
    <button
        class="p-3 border rounded-tl-md rounded-bl-md w-full"
        :class="{active: selectedFilter === 'all'}"
        @click="setFilter('all')">All</button>
    <button
        class="p-3 border-t border-b w-full"
        :class="{active: selectedFilter === 'completed'}"
        @click="setFilter('completed')">Completed</button>
    <button
        class="p-3 border rounded-tr-md rounded-br-md w-full"
        :class="{active: selectedFilter === 'incompleted'}"
        @click="setFilter('incompleted')">Incompleted</button>
  </div>
</template>

<script setup>

import {ref, defineProps, defineEmits, computed} from "vue";

const emit = defineEmits(['update:modelValue'])

const {modelValue} = defineProps(['modelValue']);
const selectedFilter = ref(modelValue);

const setFilter = (filter) => {
  selectedFilter.value = filter;
  emit('update:modelValue', filter);
};

</script>

<style scoped lang="scss">

button.active {
  background-color: #007bff;
  color: white;
}

</style>