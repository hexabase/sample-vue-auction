const defaultState = {
  token: "",
  status: false,
  userName: "",
  userNameKanji: ""
};

const getters = {
  getToken(state) {
    return state.token;
  },
  getStatus(state) {
    return state.status;
  },
  getUserName: state => {
    return state.userName;
  },
  getUserNameKanji: state => {
    return state.userNameKanji;
  }
};

const mutations = {
  stateInit(state) {
    Object.assign(state, defaultState);
  },
  setToken(state, token) {
    state.token = token;
  },
  setStatus(state, status) {
    state.status = status;
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setUserNameKanji(state, userNameKanji) {
    state.userNameKanji = userNameKanji;
  }
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations
};
