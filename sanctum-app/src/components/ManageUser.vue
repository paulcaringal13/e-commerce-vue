<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />

    <h1 class="text-2xl font-bold mb-4">Manage Users</h1>
    <router-link to="/change-password">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Change Password
      </button>
    </router-link>
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="name" class="font-semibold">Name:</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          class="border border-gray-300 px-2 py-1 rounded"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="email" class="font-semibold">Email:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          class="border border-gray-300 px-2 py-1 rounded"
        />
      </div>
      <button
        @click="saveChanges"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";
import axiosClient from "../../axios/axios";

export default {
  name: "ManageUser",

  components: {
    NavbarComponent,
  },

  computed: {
    userId() {
      return localStorage.getItem("id");
    },

    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    saveChanges() {
      // Send update request to backend using axiosClient
      axiosClient
        .put(/user/${this.userId}/update, {
          name: this.user.name,
          email: this.user.email,
        })
        .then((response) => {
          // Dispatch an action to update the user details in the store
          this.$store.dispatch("updateUserDetails", response.data.user);

          alert("User details updated successfully!");
          this.$router.push("/home/" + localStorage.getItem("id"));
        })
        .catch((error) => {
          // Handle error response
          console.error("Error updating user details:", error);

          alert("User credentials update failed!");
        });
    },
  },

  mounted() {
    this.$store.dispatch("getUser", localStorage.getItem("id"));
  },
};
</script>
