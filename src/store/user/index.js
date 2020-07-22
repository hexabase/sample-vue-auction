/**
 * UserInfo
 *
 * UserInfo : {
 *   UserID,
 *   UserName,
 *   UserEmail,
 *   HexaID,
 *   IsAdmin,
 * }
 *
 */
const defaultState = {
  id: "",
  name: "",
  email: "",
  hexaID: "",
  isAdmin: false
};
/**
 * UserID
 *
 * @param {*} state
 */
const getters = {
  getId(state) {
    return state.id;
  },
  /**
   * UserName
   *
   * @param {*} state
   */
  getName(state) {
    return state.name;
  },
  /**
   * IsAdmin
   *
   * @param {*} state
   */
  getIsAdmin(state) {
    return state.isAdmin;
  },
  /**
   * Email
   *
   * @param {*} state
   */
  getEmail(state) {
    return state.email;
  },
  /**
   * HexaID
   *
   * @param {*} state
   */
  getHexaID(state) {
    return state.hexaID;
  },
  /**
   * MembershipNumber
   *
   * @param {*} state
   */
  getMembershipNumber(state) {
    return state.membershipNumber;
  }
};

const mutations = {
  /**
   * SetInit
   *
   * @param {*} state
   * @param {*} payload
   */
  stateInit(state) {
    Object.assign(state, defaultState);
  },
  /**
   * SetUserID
   *
   * @param {*} state
   * @param {*} payload
   */
  setId(state, id) {
    state.id = id;
  },
  /**
   * SetUserName
   *
   * @param {*} state
   * @param {*} payload
   */
  setName(state, name) {
    state.name = name;
  },
  /**
   * SetIsAdmin
   *
   * @param {*} state
   * @param {*} payload
   */
  setIsAdmin(state, isAdmin) {
    state.isAdmin = isAdmin;
  },
  /**
   * SetEmail
   *
   * @param {*} state
   * @param {*} payload
   */
  setEmail(state, email) {
    state.email = email;
  },
  /**
   * setHexaID
   *
   * @param {*} state
   * @param {*} payload
   */
  setHexaID(state, hexaID) {
    state.hexaID = hexaID;
  },
  /**
   * setMembershipNumber
   *
   * @param {*} state
   * @param {*} payload
   */
  setMembershipNumber(state, membershipNumber) {
    state.membershipNumber = membershipNumber;
  }
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations
};
