<template>
  <header class="header">
    <ToggleCheckTasksVue v-if="!isTodoListEmpty" />
    <NewTask />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTodosStore } from "@/composables";

import NewTask from "../NewTask.vue";
import ToggleCheckTasksVue from "../ToggleCheckTasks.vue";

export default defineComponent({
  name: "Header",
  components: { NewTask, ToggleCheckTasksVue },
  setup() {
    const { isTodoListEmpty } = useTodosStore();
    return {
      isTodoListEmpty,
    };
  },
});
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
