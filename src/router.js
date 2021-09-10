import vueRouter from "vue-router";
import App from "./App";
import User from "./components/User";
import Categories from "./components/Categories";
import Suppliers from "./components/Suppliers";
import Interop from "./components/Interop";

const router = new vueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "root",
      component: App
    },
    {
      path: "/user/:username",
      name: "user",
      component: User
    },
    {
      path: "/user/:username/categories/",
      name: "categories",
      component: Categories
    },
    {
      path: "/user/:username/suppliers/",
      name: "suppliers",
      component: Suppliers
    },
    {
      path: "/user/:username/interop/",
      name: "interop",
      component: Interop
    }
  ]
});

export default router;
