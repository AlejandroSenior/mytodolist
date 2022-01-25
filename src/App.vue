<template>
  <v-app>
    <ConfigLayout>
      <router-view />
    </ConfigLayout>
  </v-app>
</template>

<script>
import ConfigLayout from "./layouts/ConfigLayout.vue";

export default {
  name: "App",
  components: { ConfigLayout }
};
</script>
