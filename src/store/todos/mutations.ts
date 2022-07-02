import { MutationTree } from "vuex";
import { TodosState } from "./state";
import { Task } from "@/interfaces/tasks";

const mutation: MutationTree<TodosState> = {
  addTask(state, task: Task) {
    state.tasks.unshift(task);
  },
  toggleCompletedTask(state, task: Task) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    state.tasks[index].completed = !state.tasks[index].completed;
  },
  toggleEditingTask(state, task: Task) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    state.tasks[index].editing = !state.tasks[index].editing;
  },
  updateTitle(state, { task, title }) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    state.tasks[index].title = title;
  },
  switchCurrentTasksCompletedState(state, newState: boolean) {
    state.tasks.forEach((task) => {
      task.completed = newState;
    });
  },
  deleteTask(state, task: Task) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    state.tasks.splice(index, 1);
  },
  deleteCompletedTasks(state) {
    state.tasks = state.tasks.filter((task) => !task.completed);
  },
};

export default mutation;
