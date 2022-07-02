import { mount } from "@vue/test-utils";

import TodoCount from "@/components/TodoCount.vue";
import { v4 as uuid } from "uuid";
import { Task } from "@/interfaces/tasks";
import createVuexStore from "../mock-data/mock-store";

describe("tests on TodoListItem.vue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emptyTasks = {
    tasks: [],
  };

  const task = <Task>{
    id: uuid(),
    title: "New task",
    completed: false,
    editing: false,
  };

  test('it says "0 items left" if all the task are completed', () => {
    const mockStore = {
      tasks: [
        { ...task, completed: true },
        { ...task, completed: true },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoCount, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toContain("<strong>0</strong> items left ");
  });

  test('it says "1 item left" if there is one task left', () => {
    const mockStore = {
      tasks: [
        { ...task, completed: false },
        { ...task, completed: true },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoCount, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toContain("<strong>1</strong> item left ");
  });

  test('it says "2 items left" if there are two tasks left', () => {
    const mockStore = {
      tasks: [
        { ...task, completed: false },
        { ...task, completed: false },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoCount, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toContain("<strong>2</strong> items left ");
  });

  test("its hidden if router param is 'completed'", async () => {
    const mockStore = {
      tasks: [
        { ...task, completed: false },
        { ...task, completed: false },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);
    const wrapper = mount(TodoCount, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$router.setParams({ filter: "completed" });
    expect(wrapper.html()).toBe("<!--v-if-->");
  });

  test("it prints the correct number of tasks left", async () => {
    const mockStore = {
      tasks: [
        { ...task, completed: false },
        { ...task, completed: false },
        { ...task, completed: false },
        { ...task, completed: false },
        { ...task, completed: true },
      ],
    };

    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoCount, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$router.setParams({ filter: "active" });
    expect(wrapper.find("strong").text()).toBe("4");
  });
});
