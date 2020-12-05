import Vue from "vue";
import Vuex from "vuex";

import { getField, updateField } from "vuex-map-fields";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scope: "",
    pRun: false,
    pFocus: false,
    uWorkflowFalse: false,
    uRun: false,
    uFocus: false,

    table: "",
    sysId: "",
    encodedQuery: "",
    queryFlag: true,
    currentTabUrl: "",
    snTabError: false,

    valuesToBeUpdated: [],
    keysToBePrinted: [],
  },

  getters: {
    getField,
  },

  mutations: {
    setSettings: function(state, val) {
      state.scope = val.scope ?? "";
      state.pRun = val.pRun ?? false;
      state.pFocus = val.pFocus ?? false;
      state.uWorkflowFalse = val.uWorkflowFalse ?? false;
      state.uRun = val.uRun ?? false;
      state.uFocus = val.uFocus ?? false;
    },

    updateField,
  },
});
