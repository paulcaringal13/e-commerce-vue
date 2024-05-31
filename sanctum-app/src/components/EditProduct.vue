<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />

    <h1>Edit Product</h1>

    <form @submit.prevent="editProduct" class="w-full max-w-sm">
      <div class="mb-4">
        <label for="product_name" class="block text-sm font-bold mb-2"
          >Product Name</label
        >
        <input
          v-model="productName"
          type="text"
          id="product_name"
          class="form-input w-full"
        />
      </div>
      <div class="mb-4">
        <label for="product_price" class="block text-sm font-bold mb-2"
          >Product Price</label
        >
        <input
          v-model="productPrice"
          type="number"
          id="product_price"
          class="form-input w-full"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Product
      </button>
    </form>
  </div>
</template>

<script>
import NavbarComponent from "./NavbarComponent.vue";
import axiosClient from "../../axios/axios";

export default {
  name: "EditProduct",

  components: {
    NavbarComponent,
  },
  data() {
    return {
      productName: "",
      productPrice: null,
    };
  },
  computed: {
    userId() {
      return localStorage.getItem("id");
    },
  },
  mounted() {
    this.$store.dispatch("getUser", localStorage.getItem("id"));
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
    editProduct() {
      const productId = localStorage.getItem("prodId");
      const updatedProduct = {
        product_name: this.productName,
        product_price: this.productPrice,
      };

      axiosClient
        .put(`/products/${productId}/update`, updatedProduct)
        .then((response) => {
          alert("Product updated successfully!");
          this.$store.dispatch("updateProduct", response.data.product);
          // Optionally, redirect to product list page
          this.$router.push("/home/" + localStorage.getItem("id"));
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          alert("Failed to update product. Please try again.");
        });
    },
  },
};
</script>