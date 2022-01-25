const getDefaultState = () => {
  return {
    user: {},
  };
};
const state = getDefaultState();

const actions = {
  async login({ commit }, credentials) {
    // ------ Call auth and login endpoint ------
    // **I search only by email, but, obviously, the password should be taken into account with an API**
    const allUsers = await JSON.parse(localStorage.getItem("allUsers"));
    const userLogged = allUsers.find((e) => e.email === credentials.email);
    if (userLogged) {
      commit("SET_USER", userLogged);
      return { success: true };
    } else return { success: false };
  },

  logout({ commit }) {
    // ------ Call auth and logout endpoint ------
    commit("RESET_STATE", null);
    commit("tasks/RESET_STATE", null, { root: true });
  },
};

const getters = {
  getUserId: (state) => {
    return state.user.id;
  },
};

const mutations = {
  SET_USER(state, data) {
    state.user = data;
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
