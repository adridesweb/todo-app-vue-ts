import { createStore } from "vuex";

import todosModule from "./todos";
import { TodosState } from "./todos/state";

export interface StateInterface {
  todos: TodosState;
}

export default createStore<StateInterface>({
  modules: {
    todos: todosModule,
  },
});
