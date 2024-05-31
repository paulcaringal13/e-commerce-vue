import { createStore } from "vuex";
import axiosClient from "../../axios/axios";

export default createStore({
  state: {
    products: [], // Initialize products array
    user: {
      name: "",
      id: 0,
      email: "",
    },
  },
  mutations: {
    // USER MANAGEMENT
    setUser(state, currentUser) {
      state.user = currentUser;
    },

    // Mutation to update user details in the state
    updateUserDetails(state, updatedUser) {
      state.user = updatedUser;
    },

    //
    // PRODUCT MUTATIONS
    //

    getProduct(state, products) {
      state.products = products;

      console.log(products);
    },

    // Mutation to add a product to the state
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
    //
    // USER MANAGEMENT
    //
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

    // Action to update user details
    updateUserDetails({ commit }, updatedUser) {
      commit("updateUserDetails", updatedUser);
    },

    //
    // PRODUCT CRUD OPERATIONS
    //

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
