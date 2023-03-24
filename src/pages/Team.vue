<template>
  <div style="position: absolute; top: 200px; right: 40%">
    <q-circular-progress
      v-if="loading"
      indeterminate
      rounded
      size="40px"
      color="black"
      class="q-ma-md"
    />
  </div>

  <q-card v-if="!loading" class="no-shadow q-ma-sm" bordered>
    <q-card-section class="q-mb-lg">
      <div class="text-h6 text-white">
        <q-space />
        <q-btn
          v-if="hasPermission('add team')"
          label="Add New Team"
          color="blue"
          class="float-right text-capitalize shadow-3"
          icon="add"
          to="/addTeam"
          no-caps
        />
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="table-bg">
      <div class="text-h6 text-white">Team Lists</div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="teams"
        :columns="columns"
        auto-width
      >
        <template v-slot:body-cell-photo="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.photo" />
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-is_active="props">
            <q-td :props="props">
              <q-item-label>
                <q-badge v-if="props.row.is_active" color="green">
                  yes
                </q-badge>
                <q-badge v-else color="red"> no </q-badge>
              </q-item-label>
            </q-td>
          </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              v-if="hasPermission('update team')"
              icon="edit"
              size="sm"
              flat
              :to="'/editTeam?id='+props.row.id"
            />
            <q-btn
              v-if="hasPermission('delete team')"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="confirmDelete(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
const data = [
  {
    empId: "EF111002",
    f_name: "Jeff Galbraith",
    m_name: "Jeff Galbraith",
    l_name: "Jeff Galbraith",
    phone_no: "0908676655",
    email: "jeffi@gmail.com",
    photo:
      "https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
  },
];
const columns = [
  {
    name: "empId",
    label: "Employ Id",
    field: "empId",
    sortable: true,
    align: "left",
  },
  {
    name: "photo",
    label: "Photo",
    field: "photo",
    sortable: true,
    align: "left",
  },
  {
    name: "f_name",
    label: "First Name",
    field: "f_name",
    sortable: true,
    align: "left",
  },
  {
    name: "m_name",
    label: "Middle Name",
    field: "m_name",
    sortable: true,
    align: "left",
  },
  {
    name: "l_name",
    label: "Last Name",
    field: "l_name",
    sortable: true,
    align: "left",
  },
  {
    name: "phone_no",
    label: "Phone Number",
    field: "phone_no",
    sortable: true,
    align: "left",
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    sortable: true,
    align: "left",
  },
  {
    name: "is_active",
    label: "Featured",
    field: "is_active",
    sortable: true,
    align: "left",
  },

  {
    name: "Action",
    label: "Action",
    field: "Action",
    sortable: false,
    align: "center",
  },
];
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // <- import useRoute here
import { api } from "boot/axios";
import { Loading,useQuasar } from "quasar";

export default defineComponent({
  name: "Team",
  setup() {
    const teams = ref(data);
    const loading = ref(false);

    const router = useRouter();
    const $q = useQuasar();
    onMounted(async () => {
      try {
        loading.value = true;

        // Loading.show();
        console.log("res", "response.data");
        const response = await api.get("/teams");
        // this.showDialog = false;
        teams.value = response.data;

        console.log("res", response.data);
      } catch (error) {
      } finally {
        // Loading.hide();

        loading.value = false;
      }
    });

    const hasPermission = (sperm) => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("ul", user.role.permissions);
      if (user?.role?.permissions) {
        console.log("ul2", user.role.permissions);

        const perm = user.role?.permissions;
        console.log("ul3", user.role.permissions);

        return perm?.some((p) => p.title.toLowerCase() == sperm);
      }
    };

    const confirmDelete = (id) => {
      $q.dialog({
        title: "Confirm",
        message: "Are You Sure to Delete ?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          console.log(">>>> OK");
          deleteRole(id);
        })
        .onOk(() => {
          console.log(">>>> second OK catcher");
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };

    async function deleteRole(id) {
      Loading.show();
      const index = teams.value.findIndex((role) => role.id == id);
      try {
        const response = await api.delete("/teams/" + id);

        if (response.status == 200) {
          teams.value.splice(index, 1);
        }
      } catch (error) {
      } finally {
        Loading.hide();
      }
    }
    return {
      hasPermission,
      user_details: {},
      password_dict: {},
      columns,
      teams,
      showDialog: ref(false),
      title: ref(""),
      loading,
      confirmDelete,
      deleteRole,
    };
  },
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
.table-bg {
  background-color: #162b4d;
}
</style>
