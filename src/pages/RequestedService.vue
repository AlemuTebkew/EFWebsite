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
    <q-card-section class="q-mb-lg"> </q-card-section>
    <q-separator color="white" />
    <q-card-section class="table-bg">
      <div class="text-h6 text-white">Requested Services</div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="users"
        :columns="columns"
        auto-width
        :pagination="{ rowsPerPage: 15 }"
      >
        <template v-slot:body-cell-id="props">
          <q-td :props="props">
            {{ props.rowIndex + 1 }}
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              icon="remove_red_eye"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="
                (show = true),
                  (message = props.row.message),
                  (service = props.row.service.title),
                  (created_at = props.row.created_at)
              "
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[1, 1]"
                class="bg-blue"
              >
                <strong>View Message</strong>
              </q-tooltip>
            </q-btn>
            <q-btn
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

  <q-dialog v-model="show" persistent>
    <q-card class="">
      <q-card-section class="row justify-between items-center">
        <q-item-label class="text-h6">View Request Message</q-item-label>
        <div>
          <q-btn flat class="bg-white" icon="close" @click="show = false" />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <q-item>
          <q-item-section>message</q-item-section>
          <q-item-section>{{ message }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Requested Service</q-item-section>
          <q-item-section>{{ service }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Date</q-item-section>
          <q-item-section>{{
            new Date(created_at).toDateString()
          }}</q-item-section>
        </q-item>
      </q-card-section>
    </q-card></q-dialog
  >
</template>

<script>
const data = [];
const columns = [
  {
    name: "id",
    label: "NO",
    field: "id",
    sortable: true,
    align: "left",
  },

  {
    name: "name",
    label: "Name",
    field: "name",
    sortable: true,
    align: "left",
  },

  {
    name: "address",
    label: "Addrese",
    field: "address",
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
import { Loading, Notify, useQuasar } from "quasar";
import { useAuthStore } from "src/stores/user-login-store";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useDashStore } from 'src/stores/dashboard-store';
import { storeToRefs } from 'pinia';
export default defineComponent({
  name: "User",
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const show = ref(false);
    const message = ref("");
    const service = ref("");
    const created_at = ref("");
    const router = useRouter();
    const userStore = useAuthStore();

    const dash = useDashStore();

    const { noti } = storeToRefs(dash);
    const $q = useQuasar();
    const fetch = async () => {
      try {
        loading.value = true;
        noti.value =  noti.value.filter((n) => n.data.type !== "service");

        // Loading.show();
        const response = await api.get("/get_contacts");
        // this.showDialog = false;
        users.value = response.data;

        console.log("res", response.data);
      } catch (error) {
      } finally {
        // Loading.hide();

        loading.value = false;
      }
    };

    fetch();

    const formatDate = (timestamp) => {
      if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        const timeago = `${timePeriod} ago`;

        return timeago;
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
          deleteProjects(id);
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
    const deleteProjects = async (id) => {
      Loading.show();
      try {
        const index = users.value.findIndex((u) => u.id == id);
        const response = await api.delete("/contacts/"+id);
        if (response.status === 200) {
          users.value.splice(index, 1);
          Notify.create({
            message: "Deleted Successfully",
            color: "green",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting ",
          color: "red",
        });
      } finally {
        Loading.hide();
      }
    };
    return {
      user_details: {},
      password_dict: {},
      columns,
      users,
      showDialog: ref(false),
      title: ref(""),
      loading,
      deleteProjects,
      confirmDelete,
      fetch,
      show,
      message,
      service,
      created_at,
      formatDate,
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
