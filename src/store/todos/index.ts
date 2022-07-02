import { Module } from "vuex";
import { StateInterface } from "../index";

import state, { TodosState } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const todosModule: Module<TodosState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default todosModule;
