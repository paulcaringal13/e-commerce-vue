<template>
  <div className="flex flex-col h-full w-full">
    <NavbarComponent />
    <button @click="gotoEditProduct(1)">Edit</button>
    <button @click="gotoAddProduct()">Add</button>
    <button @click="gotoDeleteProduct(1)">Delete</button>
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
  },
  methods: {
    gotoEditProduct(prodId) {
      this.$router.push(`/edit/${localStorage.getItem("id")}`);
      localStorage.setItem("prodId", prodId);
    },
    gotoAddProduct() {
      this.$router.push(`/add/${localStorage.getItem("id")}`);
    },
    gotoDeleteProduct(prodId) {
      this.$router.push(`/delete/${localStorage.getItem("id")}`);
      localStorage.setItem("prodId", prodId);
    },
  },
  mounted() {
    this.$store.dispatch("getUser", localStorage.getItem("id"));
  },
};
</script>
