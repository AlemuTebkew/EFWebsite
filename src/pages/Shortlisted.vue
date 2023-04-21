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
    <q-card-section class="table-bg">
      <div class="text-h6 text-white">Shortlisted Applicant Lists</div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="filteredByJob"
        :columns="columns"
        auto-width
        :pagination="{ rowsPerPage: 15 }"
      >
        <template v-slot:top-right>
          <q-select
            v-model="selected"
            outlined
            dark
            dense
            options-dense
            emit-value
            map-options
            :options="jobs"
            option-value="id"
            option-label="title"
            class="text-white"
            color="white"
            label="filter by job"
            style="min-width: 200px"
          />
        </template>

        <template v-slot:body-cell-empId="props">
          <q-td>
            {{ props.rowIndex + 1 }}
          </q-td>
        </template>

        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
            v-if="hasPermision('view applicant')"
              icon="remove_red_eye"
              size="sm"
              flat
              :to="'/viewApplicant?id=' + props.row.id"
            />
            <q-btn
            v-if="hasPermision('delete shortlist')"
              icon="cancel"
              size="sm"
              class="q-ml-sm"

              dense
              color="red"
              label="remove"
              @click="confirmDelete(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
const columns = [
  {
    name: "empId",
    label: "Employ Id",
    field: "id",
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
import { Loading, useQuasar, Notify } from "quasar";
import { useJobStore } from "src/stores/job_store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useDashStore } from "src/stores/dashboard-store";
export default defineComponent({
  name: "Shortlisted",
  setup() {
    const applicants = ref([]);
    const loading = ref(false);
    const selected = ref("");
    const $q = useQuasar();
    const jobStore = useJobStore();
    const dash = useDashStore();

    const { noti } = storeToRefs(dash);
    const { jobs } = storeToRefs(jobStore);

    const confirmDelete = (id) => {
      $q.dialog({
        title: "Confirm",
        message: "Are You Sure to Delete ?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          console.log(">>>> OK");
          deleteApplicant(id);
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

    const fetchApplicants = async () => {
      try {
        loading.value = true;

        // Loading.show();
        console.log("res", "response.data");
        const response = await api.get("/get_liked");
        // this.showDialog = false;
        applicants.value = response.data;
        const re = await api.get("/get_jobs");
        jobs.value = re.data;
        console.log("res", response.data);
      } catch (error) {
      } finally {
        // Loading.hide();

        loading.value = false;
      }
    };

    fetchApplicants();
    async function deleteApplicant(id) {
      Loading.show();
      const index = applicants.value.findIndex((ap) => ap.id == id);
      try {
        const response = await api.post("/set_liked/" + id,{liked:0});

        if (response.status == 200) {
          applicants.value.splice(index, 1);
          Notify.create({
            message: "Applicant Deleted Successfully",
            color: "green",
          });
        }
      } catch (error) {
        Notify.create({
          message: "Error While Deleting Applicant",
          color: "red",
        });
      } finally {
        Loading.hide();
      }
    }

    const filteredByJob = computed(() => {
      return selected.value
        ? applicants.value.filter((a) => a.job_id === selected.value)
        : applicants.value;
    });

    const hasPermision=(sperm)=>{
      const user=JSON.parse(localStorage.getItem("user")) ;
      console.log('ul', user.role.permissions)
      if(user?.role?.permissions){
        console.log('ul2', user.role.permissions)

        const perm=user.role?.permissions
        console.log('ul3', user.role.permissions)

       return perm?.some((p)=>p.title.toLowerCase() == sperm)
      }
    }
    return {
      hasPermision,
      filteredByJob,
      user_details: {},
      password_dict: {},
      columns,
      applicants,
      showDialog: ref(false),
      title: ref(""),
      loading,
      jobs,
      jobStore,
      deleteApplicant,
      fetchApplicants,
      confirmDelete,
      selected,
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
