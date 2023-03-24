<template>
  <q-list>
    <q-item-label header class="text-white"> Navigations </q-item-label>

    <q-item
      v-if="hasPermision('dashboard')"
      clickable
      to="/"
      exact
      class="text-white"
    >
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">Dashboard</q-item-label>
      </q-item-section>
    </q-item>

    <q-item
      v-if="hasPermision('view news')"
      clickable
      to="/news"
      class="text-white"
    >
      <q-item-section avatar>
        <q-icon name="newspaper"></q-icon>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">News</q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item
      v-if="hasPermision('view service')"
      class="text-bold"
      label="Service"
      icon="construction"
    >
      <q-item
        clickable
        to="/service"
        style="margin-left: 14px !important"
        class="text-white"
      >
        <q-item-section avatar>
          <q-icon name="construction" />
        </q-item-section>
        <q-item-section avatar>
          <q-item-label class="text-bold">Services</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        style="margin-left: 14px; !important"
        class="text-white"
        to="/requested"

      >
        <q-item-section avatar>
          <q-icon name="work_outline" />
        </q-item-section>
        <q-item-section
          class="q-px-none q-mx-sm row q-gutter-0"
          style="margin-left: 0px !important"
        >
          <q-item-label class="q-pa-none text-bold">
            Requested Service

            <q-badge side color="red" text-color="white">
              {{ noti?.filter((no)=>no.data.type === 'service').length }}
            </q-badge>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item class="text-bold" label="Projects" icon="work">
      <q-item
        v-if="hasPermision('view category')"
        clickable
        to="/category"
        style="margin-left: 10px !important"
        class="text-white"
      >
        <q-item-section avatar>
          <q-icon name="work_outline" />
        </q-item-section>
        <q-item-section avatar>
          <q-item-label class="text-bold">Project Category</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        v-if="hasPermision('view project')"
        clickable
        to="/project"
        class="text-white"
        style="margin-left: 10px !important"
      >
        <q-item-section avatar>
          <q-icon name="task" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Project</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <q-item clickable to="/client" class="text-white">
      <q-item-section avatar>
        <q-icon name="handshake" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">Client|Partner</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable to="/gallery" class="text-white">
      <q-item-section avatar>
        <q-icon name="collections" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold">Gallery</q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item
      class="text-bold"
      label="Jobs"
      icon="work"
    >
      <q-item
        style="margin-left: 10px !important"
        class="text-white"
        clickable
        v-if="hasPermision('view department')"
        to="/department"
      >
        <q-item-section avatar>
          <q-icon name="task" />
        </q-item-section>
        <q-item-section avatar>
          <q-item-label class="text-bold">Department</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="hasPermision('view job')"
        clickable
        to="/job"
        style="margin-left: 10px !important"
        class="text-white"
      >
        <q-item-section avatar>
          <q-icon name="work_outline" />
        </q-item-section>
        <q-item-section avatar>
          <q-item-label class="text-bold">Jobs</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-if="hasPermision('view applicant')"
        clickable
        style="margin-left: 10px !important"
        class="text-white"
        to="/applicant"
      >
        <q-item-section avatar>
          <q-icon name="work_outline" />
        </q-item-section>
        <q-item-section avatar>
          <q-item-label class="text-bold"
            >Applicants
            <q-badge side color="red" text-color="white">
              {{ noti?.filter((no)=>no.data.type === 'job').length }}
            </q-badge></q-item-label
          >
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-item
      clickable
      v-if="hasPermision('view team')"
      to="/team"
      class="text-white"
    >
      <q-item-section avatar>
        <q-icon name="groups" />
      </q-item-section>
      <q-item-section avatar>
        <q-item-label class="text-bold">Teams</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      clickable
      v-if="hasPermision('view user')"
      to="/user"
      class="text-white"
    >
      <q-item-section avatar>
        <q-icon name="person" />
      </q-item-section>
      <q-item-section avatar>
        <q-item-label class="text-bold">User</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-if="hasPermision('view role')"
      clickable
      to="/role"
      class="text-white"
    >
      <q-item-section avatar>
        <q-icon name="manage_accounts" />
      </q-item-section>
      <q-item-section avatar>
        <q-item-label class="text-bold">Role</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { storeToRefs } from "pinia";
import { api } from "src/boot/axios";
import { useAuthStore } from "src/stores/user-login-store";
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    noti: {
      type: [],
      default: [],
    },
  },
  setup() {
    const { authUser } = storeToRefs(useAuthStore());
    const router=useRouter();
    const hasPermision = (sperm) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role?.permissions) {
        const perm = user.role?.permissions;

        return perm?.some((p) => p.title.toLowerCase() == sperm);
      }
    };

    const handleRead=async(type)=>{
      try {
        if (type === "job") {
          router.push("/applicant");


        } else if (type === "service") {
          router.push("/requested");

          noti.value = noti.value.filter((n) => n.data.type !== "service");
          const resp = await api.post("/read", {type:'service'});

          // if(resp.success ==200)


        } else {
          console.log()
          const resp =  api.post("/read", {});

          noti.value = [];
        }
      } catch (error) {}

    }
    return {
      handleRead,
      hasPermision,
    };
  },
});
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
