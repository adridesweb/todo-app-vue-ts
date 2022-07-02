import { GetterTree } from "vuex";
import { TodosState } from "./state";
import { StateInterface } from "../index";

const getters: GetterTree<TodosState, StateInterface> = {
  isEmpty(state): boolean {
    return state.tasks.length === 0;
  },
  currentTasksAreCompleted(state): boolean {
    if (state.tasks.length === 0) {
      return false;
    }

    const result = state.tasks.every((task) => task.completed);

    return result;
  },
  currentUncompletedTasks(state): number {
    if (state.tasks.length === 0) {
      return 0;
    }

    const uncompletedTasks = state.tasks.filter((task) => !task.completed);

    return uncompletedTasks.length;
  },
  currentActiveTasks(state): number {
    if (state.tasks.length === 0) {
      return 0;
    }

    return state.tasks.length;
  },
};

export default getters;
