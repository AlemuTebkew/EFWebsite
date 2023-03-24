import { boot } from "quasar/wrappers";

  const can = (sperm) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("ul", user.role.permissions);
  if (user?.role?.permissions) {
    console.log("ul2", user.role.permissions);

    const perm = user.role?.permissions;
    console.log("ul3", user.role.permissions);

    return perm?.some((p) => p.title.toLowerCase() == sperm);
  }
};
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$can = can;
});


export { can };
