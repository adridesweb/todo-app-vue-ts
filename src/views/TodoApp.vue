<template>
  <div class="todoapp">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Header from "@/components/pages/Header.vue";
import Main from "@/components/pages/Main.vue";
import Footer from "@/components/pages/Footer.vue";

export default defineComponent({
  name: "TodoApp",
  components: {
    Header,
    Main,
    Footer,
  },
});
</script>

<style>
.todoapp {
  min-width: 550px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 80px rgb(0 0 0 / 25%);
  padding: 0px 30px 0px 30px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}
</style>
