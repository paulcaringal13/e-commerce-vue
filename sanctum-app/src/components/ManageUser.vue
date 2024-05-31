<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />

    <h1>Manage users</h1>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "ManageUser",

  components: {
    NavbarComponent,
  },

  computed: {
    userId() {
      return localStorage.getItem("id");
    },
  },
  mounted() {
    this.$store.dispatch("getUser", localStorage.getItem("id"));
  },
};
</script>
