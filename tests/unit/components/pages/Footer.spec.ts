import { mount } from "@vue/test-utils";
import { v4 as uuid } from "uuid";
import { Task } from "@/interfaces/tasks";

import Footer from "@/components/pages/Footer.vue";
import createVuexStore from "../../mock-data/mock-store";

describe("tests on pages/Footer.vue", () => {
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

  test("renders correctly with one task in store", () => {
    const store = createVuexStore({ tasks: [newBasicTask] });
    const wrapper = mount(Footer, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  test("does not show footer if no tasks are in store", () => {
    const store = createVuexStore(emptyTasks);
    const wrapper = mount(Footer, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find("footer").exists()).toBe(false);
  });

  test("does show footer if there are tasks in store", () => {
    const store = createVuexStore({ tasks: [newBasicTask] });
    const wrapper = mount(Footer, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find("footer").exists()).toBe(true);
  });
});
