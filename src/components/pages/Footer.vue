<template>
  <footer v-if="!isTodoListEmpty" class="footer" id="footer">
    <TodoCount />
    <Filters />
    <button
      v-if="hideClearCompletedButton"
      @click="deleteCompletedTasks"
      class="clear-completed"
    >
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useTodosStore } from "@/composables";

import TodoCount from "@/components/TodoCount.vue";
import Filters from "@/components/Filters.vue";

export default defineComponent({
  name: "Footer",
  components: {
    TodoCount,
    Filters,
  },
  setup() {
    const {
      isTodoListEmpty,
      currentUncompletedTasks,
      currentActiveTasks,
      deleteCompletedTasks,
    } = useTodosStore();

    const route = useRoute();

    const hideClearCompletedButton = computed(() => {
      return (
        currentUncompletedTasks.value !== currentActiveTasks.value &&
        route.params.filter !== "active"
      );
    });

    return {
      isTodoListEmpty,
      currentUncompletedTasks,
      currentActiveTasks,
      hideClearCompletedButton,
      deleteCompletedTasks,
    };
  },
});
</script>

<style scoped>
.footer {
  color: white;
  font-family: "Space Mono", monospace;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.clear-completed,
html .clear-completed:active {
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  margin-left: auto;
}

.clear-completed:hover {
  text-decoration: underline;
}

@media (max-width: 530px) {
  .footer {
    height: 50px;
  }
}
</style>
