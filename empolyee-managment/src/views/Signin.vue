<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Swal from "sweetalert2";

const body = document.getElementsByTagName("body")[0];
const email = ref("");
const password = ref("");
const router = useRouter();

const store = useStore();

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

const login = () => {
  // Validate email and password
  if (!email.value || !password.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your email and password",
    });
    return;
  }

  store
    .dispatch("auth/login", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log("🚀 ~ .then ~ response:", response);
      if (response) {
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("UserId", JSON.stringify(response.userId));
        localStorage.setItem("userRole", JSON.stringify(response.userRole));
        store.commit("auth/setToken", response.token);
        router.push({ name: "Dashboard" });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have successfully logged in",
        });
      }
    })
    .catch((error) => {
      // Handle any errors here with SweetAlert
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text:
          error.response?.data?.message ||
          "An error occurred while logging in.",
      });
      console.error("Login error:", error);
    });
};
</script>

<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" v-on:submit.prevent="login">
                    <div class="mb-3">
                      <argon-input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                        v-model="email"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                        v-model="password"
                      />
                    </div>
                    <argon-switch id="rememberMe" name="remember-me"
                      >Remember me</argon-switch
                    >

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        >Sign in</argon-button
                      >
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="/signup"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg&quot;);
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

