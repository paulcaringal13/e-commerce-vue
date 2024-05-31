<template>
  <div class="flex flex-col h-full w-full">
    <NavbarComponent />
    <div className="flex flex-row min-w-[95%] mt-5 mx-auto justify-between">
      <h1 className="text-2xl font-extrabold">My Products</h1>
      <button
        @click="gotoAddProduct()"
        className="bg-slate-800 hover:bg-slate-800/75 rounded-md shadow-md text-white items-center justify-center flex gap-1 px-2"
      >
        <v-icon name="ri-add-circle-line" scale="1.1" />
        <span className="text-sm"> Product</span>
      </button>
    </div>
    <div class="flex grow mb-8 mt-5 items-center justify-center">
      <table
        class="min-w-[95%] min-h-[95%] bg-white shadow-md rounded-xl overflow-auto"
      >
        <thead class="border-b border-blue-gray-200">
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-6 px-4 text-left">Name</th>
            <th class="py-6 px-4 text-left">Price</th>
            <th class="py-6 px-4 text-left">Seller</th>
            <th class="py-6 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="text-blue-gray-900">
          <tr
            class="border-b border-blue-gray-200"
            v-for="product in myProducts"
            :key="product.id"
          >
            <td class="py-3 px-4 font-bold">
              {{ product.product_name }}
            </td>
            <td class="py-3 px-4">₱ {{ product.product_price }}</td>
            <td class="py-3 px-4">
              {{ product.user.name }}
            </td>
            <td class="py-3 px-4 space-x-1">
              <button
                @click="gotoEditProduct(product.id)"
                className="bg-green-500 hover:bg-green-500/75 shadow-lg text-white px-2 pb-1 rounded-md"
              >
                <v-icon name="ri-edit-line" scale=".9" />
              </button>
              <button
                @click="gotoDeleteProduct(product.id)"
                className="bg-red-500 hover:bg-red-500/75 shadow-lg text-white px-2 pb-1 rounded-md"
              >
                <v-icon name="ri-delete-bin-line" scale=".9" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    gotoAddProduct() {
      this.$router.push(`/add/${this.userId}`);
    },
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
