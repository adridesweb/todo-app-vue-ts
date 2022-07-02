<template>
  <input
    v-model="newTaskTitle"
    class="new-todo"
    :class="{ empty: isTodoListEmpty }"
    placeholder="What needs to be done?"
    autofocus
    @keyup.enter="newTask()"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTodosStore } from "@/composables";

export default defineComponent({
  name: "NewTask",
  setup() {
    const newTaskTitle = ref("");
    const { addTask, isTodoListEmpty } = useTodosStore();

    function newTask() {
      addTask(newTaskTitle.value);
      newTaskTitle.value = "";
    }

    return {
      newTaskTitle,
      newTask,
      isTodoListEmpty,
    };
  },
});
</script>

<style scoped>
.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.new-todo.empty {
  padding: 16px 0;
}

input {
  color: white;
  font-family: "Poppins", sans-serif;
}

input::-webkit-input-placeholder {
  font-weight: 300;
  color: #e6e6e6;
}

input::-moz-placeholder {
  font-weight: 300;
  color: #e6e6e6;
}

input::input-placeholder {
  font-weight: 300;
  color: #e6e6e6;
}

input::placeholder {
  transition: opacity 0.3s ease-in-out;
}

input:focus::placeholder {
  opacity: 0.5;
}
</style>
