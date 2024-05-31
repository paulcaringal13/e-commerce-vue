<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />

    <div class="flex flex-row justify-between w-full">
      <h1>My Products</h1>
      <router-link :to="`/add/${userId}`">Add</router-link>
    </div>
    <ul>
      <li v-for="product in myProducts" :key="product.id">
        {{ product.id }} | {{ product.product_name }} -
        {{ product.product_price }}

        <button @click="gotoEditProduct(product.id)">Edit</button>
        <button @click="gotoDeleteProduct(product.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";

export default {
  name: "MyProducts",
  components: {
    NavbarComponent,
  },
  computed: {
    userId() {
      return localStorage.getItem("id");
    },
    myProducts() {
      // Filter products based on userId
      return this.$store.state.products.filter(
        (product) => product.user_id === parseInt(this.userId)
      );
    },
  },
  methods: {
    gotoEditProduct(prodId) {
      this.$router.push(`/edit/${this.userId}`);
      localStorage.setItem("prodId", prodId);
    },
    gotoDeleteProduct(prodId) {
      this.$router.push(`/delete/${this.userId}`);
      localStorage.setItem("prodId", prodId);
    },
  },
  mounted() {
    this.$store.dispatch("getProduct");
  },
};
</script>