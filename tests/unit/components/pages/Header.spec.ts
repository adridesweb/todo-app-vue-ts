import { mount } from "@vue/test-utils";
import { v4 as uuid } from "uuid";
import { Task } from "@/interfaces/tasks";

import Header from "@/components/pages/Header.vue";
import createVuexStore from "../../mock-data/mock-store";

describe("tests on pages/Header.vue", () => {
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
    const wrapper = mount(Header, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
