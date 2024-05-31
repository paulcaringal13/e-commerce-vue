import { createStore } from "vuex";
import axiosClient from "../../axios/axios";


export default createStore({
  state: {
    user: {
      name: localStorage.getItem("name"),
      id: localStorage.getItem("id"),
      email: localStorage.getItem("email"),
    },
    products: [], // Initialize products array
  },
  mutations: {
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    getProduct(state, products) {
      state.products = products;
    },
    addProduct(state, newProduct) {
      state.products.unshift(newProduct);
    },
    // Mutation to edit a product to the state
    updateProduct(state, updatedProduct) {
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
  },

  actions: {
    getUser({ commit }, user_id) {
      axiosClient
        .get(`/user/${user_id}`)
        .then((res) => {
          commit("setUser", res.data);
        })
        .catch((err) => console.log(err));
    },
    setCurrentUser({ commit }, currentUser) {
      commit("setUser", currentUser);
    },
    // Action to get a new product
    getProduct({ commit }) {
      axiosClient
        .get("/products")
        .then((response) => {
          commit("getProduct", response.data.products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },
    // Action to add a new product
    addProduct({ commit }, productData) {
      // Commit the mutation to update the state with the new product
      commit("addProduct", productData);
    },
    // Action to update a product
    updateProduct({ commit }, updatedProduct) {
      // Commit the mutation to update the state with the updated product
      commit("updateProduct", updatedProduct);
    },
    // Action to delete a product
    deleteProduct({ commit }, productId) {
      commit("deleteProduct", productId);
    },
  },
});
