<template>
  <input
    class="toggle-all"
    type="checkbox"
    v-model="currentTasksAreCompleted"
  />
  <label
    for="toggle-all"
    @click="switchCurrentTasksCompletedState(!currentTasksAreCompleted)"
  >
    Mark all as complete
  </label>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useTodosStore } from "@/composables";

export default defineComponent({
  setup() {
    const { currentTasksAreCompleted, switchCurrentTasksCompletedState } =
      useTodosStore();

    return {
      currentTasksAreCompleted,
      switchCurrentTasksCompletedState,
    };
  },
});
</script>
<style scoped>
.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  left: -14px;
  transform: rotate(90deg);
  z-index: 1;
  cursor: pointer;
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}
</style>
