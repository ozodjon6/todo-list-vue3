<template>
  <div class="container mx-auto dark:bg-gray-800 sm:rounded-lg">
    <nav class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
         aria-label="Table navigation">
      <h2 class="mb-4 text-3xl text-center font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl">
        TODO LIST
      </h2>
    </nav>

    <div
        class="flex w-full flex-shrink-0 px-4 pb-4 justify-start space-y-2 md:w-auto md:items-center md:space-x-3 md:space-y-0">
      <button type="button"
              class="flex items-center justify-center rounded-lg bg-[#1929B9] px-4 py-2 text-sm font-medium text-white hover:bg-[#16228D] focus:outline-none focus:#1929B9 focus:ring-green-300 dark:bg-[#1929B9] dark:hover:bg-[#1929B9] dark:focus:ring-[#1929B9]"
              @click="toggleModal">
        Add Task
      </button>
    </div>
    <div class="overflow-x-auto px-4">
      <Datatable :rows="rows" :columns="columns" @edit="openEditModal" @delete="deleteTodo"  />
    </div>
  </div>
  <BaseModel :modalActive="modalActive" @close-modal="toggleModal">
    <TodoForm @close-modal="toggleModal" v-model:todoId="todoId" />
  </BaseModel>
</template>

<script setup>
import { ref , computed } from 'vue';
import Datatable from '@/components/Datatable.vue'
import BaseModel from '@/components/BaseModal.vue'
import TodoForm from '@/components/TodoForm.vue'

import { useTodoStore } from '@/stores/todo';

const modalActive = ref(null);
const todoId = ref(null);


const tasksStore = useTodoStore();

const columns =computed(() => tasksStore.getTodoColumns);

const rows = computed(() => tasksStore.getTodoList);

const toggleModal = () => {
  modalActive.value = !modalActive.value
  if(!modalActive.value){
    todoId.value = null
  }
}


const openEditModal = (id) => {
  todoId.value =  id
  toggleModal();
};

const deleteTodo = (id) => {
  tasksStore.deleteTodo(id)
};

</script>

<style scoped>
/* Apply Tailwind CSS classes here */
</style>
