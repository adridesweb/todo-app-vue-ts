import { createStore } from "vuex";

import { StateInterface } from "@/store";
import todosModule from "@/store/todos";
import todosState from "./test-todos-state";

/**
 * TODO: refactor this if have time
 * It can be done on a better way but I did it this way because we have only a module
 * and is for demo purposes for the technical test */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createVuexStore = (todosInitialState = todosState) =>
  createStore<StateInterface>({
    modules: {
      todos: {
        ...todosModule,
        state: { ...todosInitialState },
      },
    },
  });

export default createVuexStore;
