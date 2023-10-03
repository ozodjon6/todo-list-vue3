import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: []
    }),
    actions: {
        createTodo(todo) {
            this.todos.push({
                id : Date.now(),
                ...todo,
                createdDate: new Date().toLocaleString(),
            })
            this.saveTasksToLocalStorage()
        },
        updateTodo(updatedTodo) {
            const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id)
            if (index !== -1) {
                this.todos[index] = { ...updatedTodo }
            }
            this.saveTasksToLocalStorage()
        },
        deleteTodo(todoId) {
            this.todos = this.todos.filter((todo) => todo.id !== todoId)
            this.saveTasksToLocalStorage()
        },

        initializeStore() {
            const savedTasks = sessionStorage.getItem('todos');
            if (savedTasks) {
                this.todos = JSON.parse(savedTasks)
            }
        },

        saveTasksToLocalStorage() {
            sessionStorage.setItem('todos', JSON.stringify(this.todos))
        }
    },
    getters: {
        getTodoList: (state) => state.todos,
        getTodoById: (state) => (id) => {
            return state.todos.find((todo) => todo.id === id)
        },
        getTodoColumns: () => {
            return [
                {
                    key: 'name',
                    label: 'Task'
                },
                {
                    key: 'description',
                    label: 'Description'
                },
                {
                    key: 'status',
                    label: 'Status'
                },
                {
                    key: 'createdDate',
                    label: 'Created Date'
                },
            ]
        }
    }
})
