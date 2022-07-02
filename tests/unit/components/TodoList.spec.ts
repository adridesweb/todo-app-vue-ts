import { mount } from "@vue/test-utils";
import { v4 as uuid } from "uuid";
import { Task } from "@/interfaces/tasks";

import TodoList from "@/components/TodoList.vue";
import TodoListItem from "@/components/TodoListItem.vue";
import createVuexStore from "../mock-data/mock-store";

describe("tests on TodoList.vue", () => {
  const emptyTasks = {
    tasks: [],
  };

  const newBasicTask = <Task>{
    id: uuid(),
    title: "New task",
    completed: false,
    editing: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not render TodoListItem if no tasks are in store", () => {
    const store = createVuexStore(emptyTasks);
    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findAllComponents(TodoListItem).length).toBe(0);
  });

  test("renders a list of tasks if there are tasks in store", () => {
    const mockTasks = {
      tasks: [newBasicTask, newBasicTask, newBasicTask],
    };

    const store = createVuexStore(mockTasks);

    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findAllComponents(TodoListItem).length).toBe(3);
  });

  test("filter tasks by completed route param", async () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$router.setParams({ filter: "completed" });

    expect(wrapper.findAllComponents(TodoListItem).length).toBe(2);
  });

  test("filter tasks by active route param", async () => {
    const mockTasks = {
      tasks: [
        { ...newBasicTask, completed: false },
        { ...newBasicTask, completed: true },
        { ...newBasicTask, completed: true },
      ],
    };

    const store = createVuexStore(mockTasks);

    const wrapper = mount(TodoList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$router.setParams({ filter: "active" });

    expect(wrapper.findAllComponents(TodoListItem).length).toBe(1);
  });
});
