import { mount } from "@vue/test-utils";
// import { v4 as uuid } from "uuid";
// import { Task } from "@/interfaces/tasks";

import NewTask from "@/components/NewTask.vue";
import createVuexStore from "../mock-data/mock-store";

describe("tests on NewTask.vue", () => {
  const emptyTasks = {
    tasks: [],
  };

  test("filling the input field and pressing enter adds a task", () => {
    const store = createVuexStore(emptyTasks);

    const wrapper = mount(NewTask, {
      global: {
        plugins: [store],
      },
    });

    const input = wrapper.find("input");
    input.setValue("New task");
    input.trigger("keyup.enter");

    expect(store.state.todos.tasks).not.toEqual([]);
    expect(store.state.todos.tasks[0].title).toEqual("New task");
  });
});
