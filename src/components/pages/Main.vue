<template>
  <section class="main" id="main">
    <TodoList />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoList from "@/components/TodoList.vue";

export default defineComponent({
  name: "Main",
  components: {
    TodoList,
  },
});
</script>

<style scoped>
.main {
  position: relative;
  z-index: 2;
}
</style>
