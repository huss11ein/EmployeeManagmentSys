<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElSelect, ElOption } from "element-plus";

import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");

const handleSignup = async () => {
  try {
    await store
      .dispatch("auth/signup", {
        username: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
      })
      .then(() => {
        router.push("/dashboard-default");
      });
    // Handle successful signup (e.g., redirect to login page)
  } catch (error) {
    // Handle signup error
    console.error("Signup error:", error);
  }
};

onBeforeMount(() => {
  store.state.layout.hideConfigButton = true;
  store.state.layout.showNavbar = false;
  store.state.layout.showSidenav = false;
  store.state.layout.showFooter = false;
  body.classList.remove("bg-gray-100");
});
onBeforeUnmount(() => {
  store.state.layout.hideConfigButton = false;
  store.state.layout.showNavbar = true;
  store.state.layout.showSidenav = true;
  store.state.layout.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>
<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg&quot;);
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register Now</h5>
            </div>
            
            <div class="card-body">
              <form @submit.prevent="handleSignup">
                <argon-input
                  id="name"
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                  v-model="name"
                />
                <argon-input
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  v-model="email"
                />
                <argon-input
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  v-model="password"
                />
                <el-select
                  v-model="role"
                  placeholder="Select Role"
                  class="w-100"
                >
                  <el-option
                    v-for="item in ['ADMIN', 'USER']"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>

                <div class="text-center">
                  <argon-button
                    fullWidth
                    color="dark"
                    variant="gradient"
                    class="my-4 mb-2"
                    type="submit"
                    >Sign up</argon-button
                  >
                </div>
                <p class="mx-auto mb-4 text-sm">
                  Already have an account?
                  <a
                    href="/signin"
                    class="text-success text-gradient font-weight-bold"
                    >Sign in</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

