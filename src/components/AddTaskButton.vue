<template>
  <div id="lateral">
    <v-fab-transition>
      <v-btn fab color="primary" class="v-btn--newtask ma-5" @click="dialogAddTask = true">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialogAddTask" transition="dialog-top-transition" max-width="400">
      <v-card class="text-center">
        <v-form ref="formCreateTask" v-model="formCreateTaskValid" lazy-validation @submit.prevent="">
          <v-toolbar color="primary" dark>
            <span>New task</span>
            <v-spacer />
            <v-icon @click="dialogAddTask = false">clear</v-icon>
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-text-field v-model="newTask.name" label="Name" :rules="[(v) => !!v || 'Required field']" />
            <v-text-field v-model="newTask.description" label="Description" />
            <v-select
              v-model.number="newTask.category"
              :items="categories"
              item-text="name"
              item-value="id"
              label="Category"
              :rules="[(v) => !!v || 'Required field']"
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="addTask()">Create</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    dialogAddTask: false,
    formCreateTaskValid: false,

    // New task object
    newTask: {
      name: "",
      description: "",
      category: 0
    }
  }),
  computed: {
    ...mapState("tasks", ["categories"])
  },
  async created() {
    if (this.categories.length === 0) await this.$store.dispatch("tasks/getCategories");
  },
  methods: {
    addTask() {
      if (this.$refs.formCreateTask.validate()) {
        this.$store.dispatch("tasks/addTask", this.newTask);
        this.dialogAddTask = false;
      }
    }
  }
};
</script>

<style scoped>
#lateral .v-btn--newtask {
  bottom: 0;
  right: 0;
  position: absolute;
}
</style>
