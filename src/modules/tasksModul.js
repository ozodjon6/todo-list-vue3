const state = {
    tasks: [],
}
const mutations = {
    addTask(state, task) {
        state.tasks.push(task);
        saveTasks(state.tasks);
    },
    removeTask(state, index) {
        state.tasks.splice(index, 1);
        saveTasks(state.tasks);
    },
    toggleTask(state, index) {
        state.tasks[index].done = !state.tasks[index].done;
        saveTasks(state.tasks);
    },
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
}

const actions = {
    loadTasks({ commit }) {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        commit('setTasks', savedTasks);
    },
}

const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export default {
    state, mutations, actions
}

export class tasksModul {
}