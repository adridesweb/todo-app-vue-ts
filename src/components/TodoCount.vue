<template>
  <div v-if="hideTodoCount" class="todo-count">
    <strong>{{ currentUncompletedTasks }}</strong>
    {{ pluralize(currentUncompletedTasks, "item", "items") }} left
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useTodosStore } from "@/composables";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TodoCount",
  setup() {
    const route = useRoute();
    const { currentUncompletedTasks } = useTodosStore();

    const hideTodoCount = computed(() => {
      return route.params.filter !== "completed";
    });

    function pluralize(count: number, sing: string, plur: string) {
      return count === 1 ? sing : plur;
    }

    return {
      currentUncompletedTasks,
      hideTodoCount,
      pluralize,
    };
  },
});
</script>
<style scoped>
.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}
</style>
