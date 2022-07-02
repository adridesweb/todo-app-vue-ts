import { useTodosStore } from "@/composables/useTodosStore";

const mockStore = {
  state: {
    todos: {
      tasks: [],
    },
  },
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "todos/isEmpty": true,
    "todos/currentTasksAreCompleted": false,
    "todos/currentUncompletedTasks": 1,
    "todos/currentActiveTasks": 1,
  },
};

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("Tests on useTodosStore composable", () => {
  beforeEach(() => jest.clearAllMocks());

  const exampleTask = {
    id: "1",
    title: "",
    completed: false,
    editing: false,
  };

  test("Computed: tasks list is correct", () => {
    const { tasks } = useTodosStore();
    expect(tasks.value).toEqual([]);
  });

  // Getters
  test("Getter: isTodoListEmpty returns the correct mock value", () => {
    const { isTodoListEmpty } = useTodosStore();
    expect(isTodoListEmpty.value).toBe(true);
  });

  test("Getter: currentTasksAreCompleted returns the correct mock value", () => {
    const { currentTasksAreCompleted } = useTodosStore();
    expect(currentTasksAreCompleted.value).toBe(false);
  });

  test("Getter: currentUncompletedTasks returns the correct mock value", () => {
    const { currentUncompletedTasks } = useTodosStore();
    expect(currentUncompletedTasks.value).toBe(1);
  });

  test("Getter: currentActiveTasks returns the correct mock value", () => {
    const { currentActiveTasks } = useTodosStore();
    expect(currentActiveTasks.value).toBe(1);
  });

  // Mutations
  test("Mutation: toggleCompletedTask commits todos/toggleCompletedTask mutation", () => {
    const { toggleCompletedTask } = useTodosStore();

    toggleCompletedTask(exampleTask);

    expect(mockStore.commit).toHaveBeenCalledWith(
      "todos/toggleCompletedTask",
      exampleTask
    );
  });

  test("Mutation: toggleEditingTask commits todos/toggleEditingTask mutation", () => {
    const { toggleEditingTask } = useTodosStore();

    toggleEditingTask(exampleTask);

    expect(mockStore.commit).toHaveBeenCalledWith(
      "todos/toggleEditingTask",
      exampleTask
    );
  });

  test("Mutation: updateTitle commits todos/updateTitle mutation", () => {
    const { updateTitle } = useTodosStore();

    updateTitle(exampleTask, "New title");

    expect(mockStore.commit).toHaveBeenCalledWith("todos/updateTitle", {
      task: exampleTask,
      title: "New title",
    });
  });

  test("Mutation: addTask commits todos/addTask mutation with the correct task", () => {
    const { addTask } = useTodosStore();
    const newTask = { ...exampleTask, title: "New task" };

    addTask("New task");

    expect(mockStore.commit).toHaveBeenCalledWith("todos/addTask", {
      ...newTask,
      id: expect.any(String),
    });
  });

  test("Mutation: addTask does not commit todos/addTask mutation if title is empty", () => {
    const { addTask } = useTodosStore();
    addTask("");
    expect(mockStore.commit).not.toHaveBeenCalled();
  });

  test("Mutation: deleteTask commits todos/deleteTask mutation", () => {
    const { deleteTask } = useTodosStore();
    deleteTask(exampleTask);
    expect(mockStore.commit).toHaveBeenCalledWith(
      "todos/deleteTask",
      exampleTask
    );
  });

  test("Mutation: deleteCompletedTasks commits todos/deleteCompletedTasks mutation", () => {
    const { deleteCompletedTasks } = useTodosStore();
    deleteCompletedTasks();
    expect(mockStore.commit).toHaveBeenCalledWith("todos/deleteCompletedTasks");
  });

  test("Mutation: switchCurrentTasksCompletedState commits todos/switchCurrentTasksCompletedState mutation", () => {
    const { switchCurrentTasksCompletedState } = useTodosStore();
    switchCurrentTasksCompletedState(true);
    expect(mockStore.commit).toHaveBeenCalledWith(
      "todos/switchCurrentTasksCompletedState",
      true
    );
  });
});
