import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "src/stores/user-login-store";
import { api } from "src/boot/axios";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  // const isAuthenticated = true;
  Router.beforeEach(async (to, from, next) => {
    // GOOD
    const store = useAuthStore();
    const token = localStorage.getItem("token");

    // if(to.path == '/notfound'){
    //   next({ name: "not"});
    // }
    console.log("lof", store.logedIn);
    if (to.name !== "Login" && to.name !== "Forgot" && to.name !== "Reset" && !token) {
      // if (false) {
      next({ name: "Login", query: { to: to.path } });
    } else {
      // store.getUser();

      const user = JSON.parse(localStorage.getItem("user"));
      // if (user) {
        //  const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('view '+to.path))

        api.defaults.headers.common.Authorization = "Bearer " + token;
        next();
      // }
    }
  });

  return Router;
});
