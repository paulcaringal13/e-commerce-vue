// imports
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import HomePage from "@/components/HomePage.vue";
import AddProduct from "@/components/AddProduct.vue";
import EditProduct from "@/components/EditProduct.vue";
import DeleteProduct from "@/components/DeleteProduct.vue";
import ManageUser from "@/components/ManageUser.vue";
import MyProducts from "@/components/MyProducts.vue";
import ChangePassword from "@/components/ChangePassword.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next(`/home/${localStorage.getItem("id")}`);
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next(`/home/${localStorage.getItem("id")}`);
      } else {
        next();
      }
    },
  },
  {
    path: "/home/:id",
    component: HomePage,
    name: "home",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/my-products/:id",
    component: MyProducts,
    name: "my-products",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/add/:id",
    component: AddProduct,
    name: "add",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/edit/:id",
    component: EditProduct,
    name: "edit",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/delete/:id",
    component: DeleteProduct,
    name: "delete",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/manage-user",
    component: ManageUser,
    name: "manage-user",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/change-password",
    component: ChangePassword,
    name: "change-password",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("token");
      localStorage.removeItem("postId");
      localStorage.removeItem("id");
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
