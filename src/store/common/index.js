const defaultState = {
  loading: false,
  itemMax: 100,
  isEditable: true,
  isValid: true
};

const getters = {
  isLoading: state => {
    return state.loading;
  },
  getItemMax: state => {
    return state.itemMax;
  },
  isEditable: state => {
    return state.isEditable;
  },
  isValid: state => {
    return state.isValid;
  }
};

const mutations = {
  stateInit(state) {
    Object.assign(state, defaultState);
  },
  setLoading(state, bool) {
    state.loading = bool;
  },
  setItemMax(state, itemMax) {
    state.itemMax = itemMax;
  },
  setEditable(state, bool) {
    state.isEditable = bool;
  },
  setValid(state, bool) {
    state.isValid = bool;
  }
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations
};
