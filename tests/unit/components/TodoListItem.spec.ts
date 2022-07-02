import { mount } from "@vue/test-utils";

import TodoListItem from "@/components/TodoListItem.vue";
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

  const mockStore = {
    tasks: [task],
  };

  test("renders a task correctly based on props", () => {
    const store = createVuexStore(emptyTasks);

    const wrapper = mount(TodoListItem, {
      propsData: {
        task,
      },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.html()).toContain(task.title);
  });

  test("double click on task title toggles editing state", async () => {
    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoListItem, {
      propsData: {
        task,
      },
      global: {
        plugins: [store],
      },
    });

    expect(store.state.todos.tasks[0].editing).toBe(false);
    await wrapper.find("label").trigger("dblclick");
    expect(store.state.todos.tasks[0].editing).toBe(true);
  });

  test("clicks on checkbox toggles completed state", async () => {
    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoListItem, {
      propsData: {
        task,
      },
      global: {
        plugins: [store],
      },
    });

    expect(store.state.todos.tasks[0].completed).toBe(false);
    await wrapper.find("input").trigger("click");
    expect(store.state.todos.tasks[0].completed).toBe(true);
  });

  test("click on delete button deletes task", async () => {
    const store = createVuexStore(mockStore);

    const wrapper = mount(TodoListItem, {
      propsData: {
        task,
      },
      global: {
        plugins: [store],
      },
    });

    expect(store.state.todos.tasks.length).toBe(1);
    await wrapper.find("button").trigger("click");
    expect(store.state.todos.tasks.length).toBe(0);
  });
});
