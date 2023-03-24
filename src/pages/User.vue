<template>
  <div
  style="position: absolute;top: 200px;right: 40%; "
  >
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
        v-if="hasPermission('add user')"

          label="Add New User"
          color="blue"
          class="float-right text-capitalize shadow-3"
          icon="add"
          no-caps
          to="/addUser"
        />
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="table-bg">
      <div class="text-h6 text-white">System Users List</div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table dark class="table-bg" :rows="users" :columns="columns" auto-width>
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
        <template v-slot:body-cell-role="props">
          <q-td :props="props">
           {{ props.row.role?.title }}
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn v-if="hasPermission('update user')" icon="edit" size="sm" flat @click="editUser(props.row.id)" />
            <q-btn v-if="hasPermission('delete user')" icon="delete" size="sm" class="q-ml-sm" flat dense @click="confirmDelete(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
const data = [

];
const columns = [
  {
    name: "empId",
    label: "Employ Id",
    field: "id",
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
    name: "role",
    label: "Role",
    field: "role",
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
import { useAuthStore } from "src/stores/user-login-store";
export default defineComponent({
  name: "User",
  setup() {
    const users = ref([]);
     const loading = ref(false);

    const router = useRouter();
    const userStore=useAuthStore();
 const $q=useQuasar()
    onMounted(async () => {
      try {


        loading.value = true;

        // Loading.show();
        userStore.fetchRoles();
        const response = await api.get("/users");
        // this.showDialog = false;
        users.value = response.data;

        console.log("res", response.data);
      } catch (error) {
      } finally {
        // Loading.hide();

        loading.value = false;
      }
    });

    const editUser=(id)=>{

      console.log('ld',id);
      router.push("/editUser?id="+id)
      // router.push("/editService?id=" + id);

    }
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
      const index = users.value.findIndex((role) => role.id == id);
      try {
        const response = await api.delete("/users/" + id);

        if (response.status == 200) {
          users.value.splice(index, 1);
          $q.notify({ color: "green", message: "Successfully Deleted" });

        }
      } catch (error) {
        $q.notify({ color: "red", message: "Error While Deleting" });

      } finally {
        Loading.hide();
      }
    }
    return {
      hasPermission,
      user_details: {},
      password_dict: {},
      columns,
      users,
      showDialog: ref(false),
      title: ref(""),
      loading,
      editUser,
      confirmDelete,
      deleteRole
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
