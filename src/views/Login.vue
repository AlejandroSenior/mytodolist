<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="loginForm" v-model="loginFormValid">
            <v-text-field
              v-model="email"
              label="Email"
              name="email"
              prepend-icon="mdi-account"
              type="text"
              @keydown.enter="login({ email, password })"
              :rules="[
                (v) => /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,10}$/.test(v) || 'Enter a valid Email',
                (v) => !!v || 'Required field'
              ]"
            />

            <v-text-field
              v-model="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              @keydown.enter="login({ email, password })"
              :rules="[(v) => !!v || 'Required field']"
            />
          </v-form>
          <small v-if="invalidCredentials" class="red--text">Email or password invalid</small>
        </v-card-text>
        <v-card-actions>
          <v-btn class="mx-auto" color="primary" :loading="isLoading" @click="login({ email, password })">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    isLoading: false,
    loginFormValid: false,
    invalidCredentials: false
  }),
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        this.isLoading = true;
        const response = await this.$store.dispatch("user/login", { email: this.email, password: this.password });
        if (response.success) this.$router.push("/");
        else this.invalidCredentials = true;
        this.isLoading = false;
      }
    }
  }
};
</script>
