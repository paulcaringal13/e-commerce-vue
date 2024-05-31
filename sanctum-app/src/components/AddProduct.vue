<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />

    <h1>Add Product</h1>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "AddProduct",

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
