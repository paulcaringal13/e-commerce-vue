<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />

    <div className="flex flex-row justify-between w-full">
      <h1>Products</h1>
      <router-link :to="`/add/${userId}`">Add</router-link>
    </div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.id }} | {{ product.product_name }} -
        {{ product.product_price }}
      </li>
    </ul>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "HomePage",
  components: {
    NavbarComponent,
  },
  computed: {
    userId() {
      return localStorage.getItem("id");
    },
    products() {
      return this.$store.state.products;
    },
  },
  mounted() {
    this.$store.dispatch("getProduct");
    this.$store.dispatch("getUser", localStorage.getItem("id"));
  },
};
</script>