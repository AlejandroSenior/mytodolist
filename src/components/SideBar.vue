<template>
  <div>
    <v-sheet color="secondary" class="pa-4 text-center">
      <v-avatar class="mb-4" color="primary" size="64">
        <span class="white--text">{{ userInitials }}</span>
      </v-avatar>

      <div>{{ userCompleteName }}</div>
    </v-sheet>

    <v-divider />

    <v-list>
      <v-list-item link @click="setCategoryFilter(null)">
        <v-list-item-icon>
          <v-icon>list</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>All tasks</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list>
      <v-list-item v-for="(category, i) in $store.state.tasks.categories" :key="i" link @click="setCategoryFilter(category.id)">
        <v-list-item-icon>
          <v-icon>adjust</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-form ref="formCreateCategory" v-model="formCreateCategoryValid" lazy-validation @submit.prevent="">
        <v-text-field
          v-model="newCategory.name"
          label="New category"
          solo
          dense
          outlined
          append-icon="add_box"
          class="mx-3 mt-2"
          :rules="[(v) => !!v || 'Required field']"
          @focusout="$refs.formCreateCategory.resetValidation()"
          @click:append="addCategory()"
          @keydown.enter="addCategory()"
        />
      </v-form>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data: () => ({
    formCreateCategoryValid: false,

    // New category object
    newCategory: {
      name: "",
    },
  }),
  computed: {
    userCompleteName() {
      const user = this.$store.state.user.user;
      return `${user.name} ${user.lastName}`;
    },
    userInitials() {
      const user = this.$store.state.user.user;
      const nameInitial = user.name.charAt(0);
      const lastNameInitial = user.lastName.charAt(0);
      return nameInitial + lastNameInitial;
    },
  },
  methods: {
    setCategoryFilter(category) {
      this.$store.commit("tasks/SET_CATEGORY_FILTER", category);
    },
    addCategory() {
      if (this.$refs.formCreateCategory.validate()) {
        this.$store.dispatch("tasks/addCategory", this.newCategory);
        this.$refs.formCreateCategory.resetValidation();
        this.newCategory = this.$options.data().newCategory;
      }
    },
  },
};
</script>
