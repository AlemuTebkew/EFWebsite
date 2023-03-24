<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          EF Architect and Engineering Consulting PLC
          {{ authUser?.name }}</q-toolbar-title
        >
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              {{ noti.length }}
            </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <div>
                  <q-item
                    style="max-width: 420px"
                    v-for="msg in noti"
                    :key="msg.id"
                    clickable
                    v-ripple
                    @click="markRead(msg.data.type)"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <img
                          src="https://avatars2.githubusercontent.com/u/34883558?s=400&v=4"
                        />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ msg.data.title }}</q-item-label>
                      <q-item-label caption lines="1">{{
                        msg.data.message
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      {{ formatDate(msg.created_at) }}
                    </q-item-section>
                  </q-item>
                </div>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    v-if="noti.length"
                    label="View Detail"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                    @click="markRead()"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat to="profile">
            <q-avatar size="26px">
              <img
                :src="
                  authUser?.photo
                    ? authUser?.photo
                    : 'https://cdn.quasar.dev/img/boy-avatar.png'
                "
              />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!-- <q-footer elevated>
      <q-tabs>
         <q-tab v-for="(link,index) in essentialLinks" :name="link.title" :icon="link.icon" :label="link.title" :key="index" />
      </q-tabs>
    </q-footer> -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="767"
      :width="270"
      class="bg-primary text-white"
    >
      <EssentialLink :noti="noti"/>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import Messages from "./Messages.vue";
import { useAuthStore } from "src/stores/user-login-store";
import { storeToRefs } from "pinia";
import { useDashStore } from "src/stores/dashboard-store";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { parseISO, formatDistanceToNow } from "date-fns";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    /* eslint-disable */
    Messages,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const authStore = useAuthStore();
    const dash = useDashStore();
    const { noti } = storeToRefs(dash);
    const { authUser } = storeToRefs(authStore);

    const router = useRouter();

    const markRead = async (type) => {
      try {
        if (type === "job") {
          const resp = await api.post("/read", {type:'job'});

          router.push("/job");
          noti.value = noti.value.filter((n) => n.data.type !== "job");
        } else if (type == "service") {

          router.push("/requested");
          noti.value = noti.value.filter((n) => n.data.type !== "service");
          const resp = await api.post("/read", {type:'service'});

        } else {
          noti.value = [];
          const resp = await api.post("/read", {});


        }
      } catch (error) {}
    };

    const formatDate = (timestamp) => {
      if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        const timeago = `${timePeriod} ago`;

        return timeago;
      }
    };
    return {
      formatDate,
      markRead,
      leftDrawerOpen,
      noti,
      authUser,
      $q,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      messages: [
        {
          id: 5,
          title: "Pratik Patel",
          message:
            " -- I'll be in your neighborhood doing errands this\n" +
            "            weekend. Do you want to grab brunch?",
          avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4",
          time: "10:42 PM",
        },
      ],
    };
  },
});
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    /* visibility: hidden; */
    /* display: none; */
  }
}

.q-item.q-router-link--active,
.q-item--active {
  background-color: #474d5b;
  //  color:red !important
  // $dark      : #1D1D1D;
}
</style>
