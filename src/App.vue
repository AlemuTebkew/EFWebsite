<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "./stores/user-login-store";
import { useDashStore } from "./stores/dashboard-store";
import { api } from "./boot/axios";
export default defineComponent({
  name: "App",

  setup() {
    const authstore = useAuthStore();
    const dashStore = useDashStore();

    const fetchData = async () => {
      try {
        const res = await api.get("/dashboards");
        dashStore.client = res.data.client;
        dashStore.team = res.data.team;
        dashStore.o_project = res.data.o_project;
        dashStore.c_project = res.data.c_project;
        dashStore.noti = res.data.notifications;
        const maped = res.data.projects.map((p) => {
          return {
            title: p.title.slice(0, 20),
            progress: p.progress,
          };
        });
        dashStore.setSource(maped);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
    authstore.fetchUser();
    authstore.fetchRoles();
    authstore.fetchPermissions();
  },
});
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
