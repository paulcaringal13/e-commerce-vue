<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />

    <h1 class="text-2xl font-bold mb-4">Change Password</h1>

    <div class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="oldPassword" class="font-semibold">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          v-model="oldPassword"
          class="border border-gray-300 px-2 py-1 rounded"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="newPassword" class="font-semibold">New Password:</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          class="border border-gray-300 px-2 py-1 rounded"
        />
      </div>

      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        @click="changePassword"
      >
        Change Password
      </button>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";
import axiosClient from "../../axios/axios";

export default {
  name: "ChangePassword",

  components: {
    NavbarComponent,
  },

  data() {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },

  methods: {
    changePassword() {
      axiosClient
        .put(`/user/${localStorage.getItem("id")}/change-password`, {
          old_password: this.oldPassword,
          new_password: this.newPassword,
        })
        .then((response) => {
          alert(response.data.message);
          // Reset password fields
          this.oldPassword = "";
          this.newPassword = "";

          localStorage.removeItem("id");
          localStorage.removeItem("prodId");
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(`${error.response.data.error}`);
        });
    },
  },
};
</script>
