import { mount } from "@vue/test-utils";
import { v4 as uuid } from "uuid";
import { Task } from "@/interfaces/tasks";

import Main from "@/components/pages/Main.vue";
import createVuexStore from "../../mock-data/mock-store";

describe("tests on pages/Main.vue", () => {
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
    const wrapper = mount(Main, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
