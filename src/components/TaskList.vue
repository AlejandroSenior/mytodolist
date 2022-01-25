<template>
  <v-container class="py-8 px-6" :class="tasksFilteredByCategory.length === 0 ? 'fill-height' : ''" fluid>
    <v-list subheader two-line flat>
      <v-list-item-group>
        <v-card v-if="tasksFilteredByCategory.length > 0">
          <v-card-title>{{ categoryName }}</v-card-title>
          <div v-for="(task, i) in tasksFilteredByCategory" :key="i">
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox color="primary" :input-value="task.done" @click="checkBoxClick(task.id)" />
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title :class="task.done ? 'text-decoration-line-through' : ''">
                    {{ task.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle :class="task.done ? 'text-decoration-line-through' : ''">
                    {{ task.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-divider v-if="i < tasksFilteredByCategory.length - 1" />
          </div>
        </v-card>
      </v-list-item-group>
    </v-list>

    <v-row v-if="tasksFilteredByCategory.length === 0" align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <div class="text-center">
          <p class="text-h5">There are no tasks for this category yet</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("tasks", ["tasks", "categoryFilter", "categories"]),
    tasksFilteredByCategory() {
      return this.categoryFilter ? this.tasks.filter((e) => e.category === this.categoryFilter) : this.tasks;
    },
    categoryName() {
      const name = this.categoryFilter ? this.categories.find((e) => e.id === this.categoryFilter).name : "All tasks";
      return name;
    }
  },
  methods: {
    checkBoxClick(taskId) {
      this.$store.dispatch("tasks/toggleDoneTask", taskId);
    }
  }
};
</script>
