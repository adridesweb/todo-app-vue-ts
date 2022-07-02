<template>
  <ul class="filters">
    <li>
      <RouterLink to="/">All</RouterLink>
    </li>
    <li>
      <RouterLink to="active">Active</RouterLink>
    </li>
    <li>
      <RouterLink to="completed">Completed</RouterLink>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style scoped>
.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  left: 0;
  right: 0;
}
.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-out;
}

.filters li a.selected,
.filters li a:hover {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(35px);
}

@media (max-width: 530px) {
  .filters {
    bottom: 10px;
  }
}
</style>
