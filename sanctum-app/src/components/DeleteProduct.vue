<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />

    <div className="flex flex-row min-w-[95%] mt-5 mx-auto justify-between">
      <h1 className="text-2xl font-extrabold">Delete Product</h1>
    </div>
    <div className="flex flex-col min-w-[95%] mt-5 mx-auto justify-between">
      <div className="flex flex-col gap-1">
        <p>Product Name: {{ productName }}</p>
        <p>Product Price: {{ productPrice }}</p>
      </div>
      <p className="my-2 font-bold">
        Are you sure you want to delete this product?
      </p>

      <button
        @click="deleteProduct"
        class="bg-red-500 hover:bg-red-500/75 text-white font-bold py-2 px-4 rounded w-[25%]"
      >
        Confirm Delete
      </button>
    </div>
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
