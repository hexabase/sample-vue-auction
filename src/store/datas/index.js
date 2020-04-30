const defaultState = {
  workspaceId: null,
  applicationId: null,
  datastores: null,
  datastoreIds: null,
  fields: null,
  currentItemId: null
};

const getters = {
  getWorkspaceId: state => {
    return state.workspaceId;
  },
  getApplicationId: state => {
    return state.applicationId;
  },
  getDatastores: state => {
    return state.datastores;
  },
  getDatastoreIds: state => {
    return state.datastoreIds;
  },
  getFields: state => {
    return state.fields;
  },
  getCurrentItemId: state => {
    return state.currentItemId;
  }
};

const mutations = {
  stateInit(state) {
    Object.assign(state, defaultState);
  },
  setWorkspaceId(state, workspaceId) {
    state.workspaceId = workspaceId;
  },
  setApplicationId(state, applicationId) {
    state.applicationId = applicationId;
  },
  setDatastores(state, datastores) {
    state.datastores = datastores;
  },
  setDatastoreIds(state, datastoreIds) {
    state.datastoreIds = datastoreIds;
  },
  setFields(state, fields) {
    state.fields = fields;
  },
  setCurrentItemId(state, currentItemId) {
    state.currentItemId = currentItemId;
  }
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations
};
