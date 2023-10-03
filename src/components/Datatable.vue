<template>
  <div class="flex items-center justify-between my-8 px-4">
    <SearchPanel @search="handleSearch" />
    <FilterPanel v-model="selectedFilter" />
  </div>
  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
    <tr class="flex items-center justify-between w-full">
      <th v-for="column in columns" :key="column.key" class="px-4 py-4">
        {{ column.label }}
      </th>
      <th class="px-4 py-4">action</th>
    </tr>
    </thead>
    <tbody>
    <template v-if="filteredTasks.length > 0">
      <tr v-for="row in filteredTasks" :key="row.id"
          class="border-b dark:border-gray-700 flex items-center justify-between w-full"
          :class="{done: row.status === 'done'}">
        <td class="px-4 py-4">
          {{ row.name }}
        </td>
        <td class="px-4 py-4">
          {{ row.description }}
        </td>
        <td class="px-4 py-4">
        <span class="text-lg" v-if="row.status === 'todo'">
          {{ row.status }}
        </span>
          <InProgressIcon v-else-if="row.status === 'in-progress'"/>
          <DoneIcon v-else/>
        </td>
        <td class="px-4 py-4">
          {{ row.createdDate }}
        </td>
        <td class="flex items-center justify-between px-4 py-3">
          <button @click="editTodo(row.id)"
                  class="flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-2">
            Edit
          </button>
          <button @click="deleteTodo(row.id)"
                  class="flex items-center justify-center rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Delete
          </button>
        </td>
      </tr>
    </template>
    <template v-else>
      <tr
          v-if="!searchQuery"
          class="flex items-center justify-center w-full my-8"
          :class="{active: !filteredTasks.length}">
        <td class="p-4 text-center text-2xl w-full">There are no tasks at the moment</td>
      </tr>
      <tr
          v-else
          class="flex items-center justify-center w-full my-8"
          :class="{active: !filteredTasks.length}">
        <td
            class="text-center text-lg"
        >
          No tasks were found with the name you searched for
        </td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<script setup>
import InProgressIcon from "@/UI-component/InProgressIcon.vue";
import DoneIcon from "@/UI-component/DoneIcon.vue";
import {computed, defineProps, onMounted, ref, watch, watchEffect} from 'vue'
import SearchPanel from '@/components/SearchPanel.vue';
import FilterPanel from '@/components/FilterPanel.vue';

const emit = defineEmits(['edit', 'delete'])

const props = defineProps({
  rows: Array,
  columns: Array
})

const searchQuery = ref('');
const selectedFilter = ref(
    sessionStorage.getItem('selectedFilter') || 'all'
);
const editTodo = todoId => {
  emit('edit', todoId);
};

const deleteTodo = todoId => {
  emit('delete', todoId);
};

const handleSearch = (query) => {
  searchQuery.value = query;
};

const tasks = computed(() => {
  if (selectedFilter.value === 'all') {
    return props.rows;
  } else if (selectedFilter.value === 'completed') {
    return props.rows.filter((task) => task.status === 'done');
  } else if (selectedFilter.value === 'incompleted') {
    return props.rows.filter((task) => task.status !== 'done');
  }
});

const filteredTasks = computed(() => {
  return tasks.value.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const saveSelectedFilter = () => {
  sessionStorage.setItem('selectedFilter', selectedFilter.value)
}

watch(selectedFilter, () => {
  saveSelectedFilter();
});

onMounted(() => {
  saveSelectedFilter();
});

</script>

<style scoped>

table thead th,
table tbody td {
  flex: 0 0 20%;
}

table tbody tr.active td {
  flex: 0 0 100%;
}

table tbody td:first-child {
  font-weight: bold;
  color: #161F2D;
}

table tbody tr.done td:not(:last-child) {
  text-decoration: line-through;
}

table thead th:last-child {
  text-align: center;
}

</style>