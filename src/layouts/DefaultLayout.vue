<template>
  <v-app id="inspire">
    <div>
      <v-app-bar color="primary" dense dark app>
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-spacer></v-spacer>

        <v-btn icon @click="toogleDarkMode()">
          <v-icon>
            {{ $vuetify.theme.dark ? "light_mode" : "mode_night" }}
          </v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <v-navigation-drawer v-model="drawer" app>
      <SideBar />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout()">Cerrar sesión</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <slot />
      <AddTaskButton />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";

export default {
  name: "DefaultLayout",
  components: { SideBar, AddTaskButton },
  data: () => ({
    drawer: null
  }),
  methods: {
    toogleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    }
  }
};
</script>
