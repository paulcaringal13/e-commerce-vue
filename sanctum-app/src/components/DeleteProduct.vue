<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />

    <h1>Delete Product</h1>

    <div>
      <p>Are you sure you want to delete this product?</p>
      <p>Product Name: {{ productName }}</p>
      <p>Product Price: {{ productPrice }}</p>
    </div>

    <button
      @click="deleteProduct"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Confirm Delete
    </button>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";
import axiosClient from "../../axios/axios";

export default {
  name: "DeleteProduct",

  components: {
    NavbarComponent,
  },
  data() {
    return {
      productName: "",
      productPrice: null,
    };
  },
  mounted() {
    this.getProductDetails();
  },
  methods: {
    getProductDetails() {
      const productId = localStorage.getItem("prodId");
      axiosClient
        .get(`/products/${productId}`)
        .then((response) => {
          this.productName = response.data.product_name;
          this.productPrice = response.data.product_price;
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    },
    deleteProduct() {
      const productId = localStorage.getItem("prodId");

      axiosClient
        .delete(`/products/${productId}/delete`)
        .then(() => {
          alert("Product deleted successfully!");
          // Dispatch action to update the state
          this.$store.dispatch("deleteProduct", productId);
          // Optionally, redirect to product list page
          this.$router.push("/home/" + localStorage.getItem("id"));
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        });
    },
  },
};
</script>