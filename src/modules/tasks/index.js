const getDefaultState = () => {
  return {
    tasks: [],
    categories: [],
    categoryFilter: null,
  };
};
const state = getDefaultState();

const actions = {
  async addTask({ commit, getters, rootGetters }, task) {
    // ------ Call endpoint to add new task ------

    // **Esto no debería estar en el front**
    const tasks = getters["getTasks"];
    const userId = rootGetters["user/getUserId"];
    task.id = tasks[tasks.length - 1].id + 1;
    task.done = false;
    task.userId = userId;
    // /*Esto no debería estar en el front*/

    commit("SET_NEW_TASK", task);
  },

  async getUserTasks({ commit, rootGetters }) {
    // ------ Call endpoint and get task list ------
    const allTasks = await JSON.parse(localStorage.getItem("allTasks"));
    const userId = rootGetters["user/getUserId"];
    const tasksUserLogged = allTasks.filter((e) => e.userId === userId);
    if (tasksUserLogged.length > 0) commit("SET_TASKS", tasksUserLogged);
  },

  toggleDoneTask({ commit, getters }, taskId) {
    // ------ Call endpoint to change task done value ------
    const tasks = getters["getTasks"];
    const selectedTask = tasks.find((e) => e.id === taskId);
    selectedTask.done = !selectedTask.done;
    commit("SET_TASKS", tasks);
  },

  async addCategory({ commit, getters }, category) {
    // ------ Call endpoint to add new task ------

    // **This should not be in the front**
    const categories = getters["getCategories"];
    category.id = categories[categories.length - 1].id + 1;
    // /*This should not be in the front*/

    commit("SET_NEW_CATEGORY", category);
  },

  async getCategories({ commit }) {
    // ------ Call endpoint and get task list ------
    const allCategories = await JSON.parse(localStorage.getItem("allCategories"));
    if (allCategories.length > 0) commit("SET_CATEGORIES", allCategories);
  },
};

const getters = {
  getTasks: (state) => {
    return state.tasks;
  },

  getCategories: (state) => {
    return state.categories;
  },
};

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  SET_NEW_TASK(state, task) {
    state.tasks.push(task);
  },

  SET_NEW_CATEGORY(state, category) {
    state.categories.push(category);
  },

  SET_CATEGORY_FILTER(state, category) {
    state.categoryFilter = category;
  },

  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
