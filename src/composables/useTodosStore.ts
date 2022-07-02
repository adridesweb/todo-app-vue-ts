/* eslint-disable prettier/prettier */
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { StateInterface } from "@/store/index";
import { Task } from "@/interfaces/tasks";

import { v4 as uuid } from "uuid";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTodosStore = () => {
  const store = useStore<StateInterface>();

  return {
    newTask: ref(""),

    // State
    tasks: computed<Task[]>(() => store.state.todos.tasks),

    // Getters
    isTodoListEmpty: computed<boolean>(() => store.getters["todos/isEmpty"]),

    currentTasksAreCompleted: computed<boolean>(
      () => store.getters["todos/currentTasksAreCompleted"]
    ),
    currentUncompletedTasks: computed<number>(
      () => store.getters["todos/currentUncompletedTasks"]
    ),
    currentActiveTasks: computed<number>(
      () => store.getters["todos/currentActiveTasks"]
    ),

    // Mutations
    addTask: (taskTitle: string) => {
      if (taskTitle.trim().length === 0) {
        return;
      }

      const newTask = <Task>{
        id: uuid(),
        title: taskTitle,
        completed: false,
        editing: false,
      };

      store.commit("todos/addTask", newTask);
    },
    deleteTask: (task: Task) => {
      store.commit("todos/deleteTask", task);
    },
    deleteCompletedTasks: () => {
      store.commit("todos/deleteCompletedTasks");
    },
    toggleCompletedTask: (task: Task) =>
      store.commit("todos/toggleCompletedTask", task),
    toggleEditingTask: (task: Task) =>
      store.commit("todos/toggleEditingTask", task),
    updateTitle: (task: Task, title: string) =>
      store.commit("todos/updateTitle", { task, title }),
    switchCurrentTasksCompletedState: (newState: boolean) => {
      store.commit("todos/switchCurrentTasksCompletedState", newState);
    },
  };
};
