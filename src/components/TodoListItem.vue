<template>
  <li :class="{ editing: task.editing, completed: task.completed }">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        v-model="currentState"
        @click="toggleCompletedTask(task)"
      />
      <label @dblclick="enterEditMode(task)">{{ localTaskTitle }}</label>
      <button @click="deleteTask(task)" class="destroy"></button>
    </div>
    <input
      class="edit"
      ref="editInput"
      @blur="handleEditInput(task)"
      @keyup.enter="editInput?.blur()"
      @keyup.esc.prevent="handleCancelEdit(task)"
      v-model="localTaskTitle"
    />
  </li>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, nextTick, computed } from "vue";
import { Task } from "@/interfaces/tasks";
import { useTodosStore } from "@/composables";

export default defineComponent({
  name: "TodoListItem",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  setup(props) {
    const oldTitle = ref(props.task.title);
    const localTaskTitle = ref(props.task.title);
    const currentState = computed(() => props.task.completed);
    const { toggleCompletedTask, toggleEditingTask, updateTitle, deleteTask } =
      useTodosStore();
    const editInput = ref<HTMLElement | null>(null);
    const fromEvent = ref("");

    async function enterEditMode(task: Task) {
      toggleEditingTask(task);
      nextTick(() => {
        if (editInput.value) {
          editInput.value.focus();
        }
      });
    }

    function handleEditInput(task: Task) {
      if (fromEvent.value === "esc") {
        fromEvent.value = "";
        return;
      }

      if (localTaskTitle.value.trim() === "") {
        deleteTask(task);
      }

      if (oldTitle.value !== localTaskTitle.value) {
        updateTitle(task, localTaskTitle.value);
        oldTitle.value = localTaskTitle.value;
      }

      toggleEditingTask(task);
    }

    function handleCancelEdit(task: Task) {
      localTaskTitle.value = oldTitle.value;
      toggleEditingTask(task);
      fromEvent.value = "esc";
    }

    return {
      oldTitle,
      localTaskTitle,
      currentState,
      toggleCompletedTask,
      enterEditMode,
      editInput,
      deleteTask,
      handleEditInput,
      handleCancelEdit,
    };
  },
});
</script>
<style lang=""></style>
