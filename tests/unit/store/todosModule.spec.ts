import { Task } from "@/interfaces/tasks";
import createVuexStore from "../mock-data/mock-store";
import { v4 as uuid } from "uuid";

describe("Vuex: test in todos store", () => {
  let emptyTasks = {
    tasks: [],
  };

  const newBasicTask = <Task>{
    id: uuid(),
    title: "New task",
    completed: false,
    editing: false,
  };

  beforeEach(() => {
    emptyTasks = { tasks: [] };
  });

  test("module state is correct", () => {
    const store = createVuexStore(emptyTasks);
    expect(store.state).toEqual({ todos: { tasks: [] } });
  });

  // Mutations
  test("Mutation: addTask adds a new task to the state", () => {
    const store = createVuexStore(emptyTasks);

    store.commit("todos/addTask", newBasicTask);
    expect(store.state.todos.tasks).toEqual([newBasicTask]);
  });

  test("Mutation: toggleCompletedTask toggles completed property", () => {
    const tasks = { tasks: [newBasicTask] };
    const store = createVuexStore(tasks);

    store.commit("todos/toggleCompletedTask", newBasicTask);

    expect(store.state.todos.tasks).toEqual([
      { ...newBasicTask, completed: true },
    ]);
  });

  test("Mutation: toggleEditingTask toggles editing property", () => {
    const tasks = { tasks: [newBasicTask] };
    const store = createVuexStore(tasks);

    store.commit("todos/toggleEditingTask", newBasicTask);

    expect(store.state.todos.tasks).toEqual([
      { ...newBasicTask, editing: true },
    ]);
  });

  test("Mutation: updateTitle updates title", () => {
    const tasks = { tasks: [newBasicTask] };
    const store = createVuexStore(tasks);

    store.commit("todos/updateTitle", {
      task: newBasicTask,
      title: "New title",
    });

    expect(store.state.todos.tasks).toEqual([
      { ...newBasicTask, title: "New title" },
    ]);
  });

  test("Mutation: switchCurrentTasksCompletedState toggles completed property on all the tasks", () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    // Toggle all tasks to uncompleted
    store.commit("todos/switchCurrentTasksCompletedState", false);
    expect(store.state.todos.tasks).toEqual([
      { ...newBasicTask, completed: false },
      { ...newBasicTask, completed: false },
      { ...newBasicTask, completed: false },
    ]);

    // Toggle all tasks to completed
    store.commit("todos/switchCurrentTasksCompletedState", true);
    expect(store.state.todos.tasks).toEqual([
      { ...newBasicTask, completed: true },
      { ...newBasicTask, completed: true },
      { ...newBasicTask, completed: true },
    ]);
  });

  test("Mutation: deleteTask removes a task from the state", () => {
    const mockTasks = {
      tasks: [newBasicTask],
    };

    const store = createVuexStore(mockTasks);
    store.commit("todos/deleteTask", newBasicTask);
    expect(store.state.todos.tasks).toEqual([]);
  });

  test("Mutation: deleteCompletedTasks removes all completed tasks from the state", () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    store.commit("todos/deleteCompletedTasks");
    expect(store.state.todos.tasks.length).toEqual(1);
  });

  // Getters
  test("Getter: isEmpty returns true if tasks list is empty", () => {
    const store = createVuexStore(emptyTasks);
    expect(store.getters["todos/isEmpty"]).toBe(true);
  });

  test("Getter: currentTasksAreCompleted returns true if all tasks are completed", () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    expect(store.getters["todos/currentTasksAreCompleted"]).toBe(true);
  });

  test("Getter: currentTasksAreCompleted returns false if there are tasks that are not completed", () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    expect(store.getters["todos/currentTasksAreCompleted"]).toBe(false);
  });

  test("Getter: currentTasksAreCompleted returns false if there is no tasks", () => {
    const store = createVuexStore(emptyTasks);
    expect(store.getters["todos/currentTasksAreCompleted"]).toBe(false);
  });

  test("Getter: currentUncompletedTasks returns 0 if there is no tasks", () => {
    const store = createVuexStore(emptyTasks);
    expect(store.getters["todos/currentUncompletedTasks"]).toBe(0);
  });

  test("Getter: currentUncompletedTasks returns correct number of uncompleted tasks", () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    expect(store.getters["todos/currentUncompletedTasks"]).toBe(2);
  });

  test("Getter: currentActiveTasks returns 0 if there is no tasks", () => {
    const store = createVuexStore(emptyTasks);
    expect(store.getters["todos/currentActiveTasks"]).toBe(0);
  });

  test("Getter: currentActiveTasks returns correct number of active tasks", () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    expect(store.getters["todos/currentActiveTasks"]).toBe(3);
  });
});
