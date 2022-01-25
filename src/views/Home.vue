<template>
  <task-list :list="tasks" />
</template>

<script>
import { mapState } from "vuex";
import TaskList from "../components/TaskList.vue";

export default {
  components: { TaskList },
  computed: {
    ...mapState("tasks", ["tasks"])
  },
  async created() {
    if (this.tasks.length === 0) await this.$store.dispatch("tasks/getUserTasks");
  }
};
</script>

<style></style>
