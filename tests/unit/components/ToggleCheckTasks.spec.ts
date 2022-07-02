import { mount } from "@vue/test-utils";

import ToggleCheckTasks from "@/components/ToggleCheckTasks.vue";
import { v4 as uuid } from "uuid";
import { Task } from "@/interfaces/tasks";
import createVuexStore from "../mock-data/mock-store";

describe("tests on TodoListItem.vue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const task = <Task>{
    id: uuid(),
    title: "New task",
    completed: false,
    editing: false,
  };

  test("is checked if all the task are completed", () => {
    const mockStore = {
      tasks: [
        { ...task, completed: true },
        { ...task, completed: true },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);

    const wrapper = mount(ToggleCheckTasks, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find("input").element.checked).toBe(true);
  });

  test("it toggles the completed status of all the tasks", async () => {
    const mockStore = {
      tasks: [
        { ...task, completed: false },
        { ...task, completed: true },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);

    const wrapper = mount(ToggleCheckTasks, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("label").trigger("click");

    console.log(store.state.todos.tasks);

    expect(store.state.todos.tasks).toEqual([
      { ...task, completed: true },
      { ...task, completed: true },
      { ...task, completed: true },
    ]);

    await wrapper.find("label").trigger("click");

    expect(store.state.todos.tasks).toEqual([
      { ...task, completed: false },
      { ...task, completed: false },
      { ...task, completed: false },
    ]);
  });
});
