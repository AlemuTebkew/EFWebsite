<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white col-lg-6" bordered>
          <q-card-section class="row justify-between">
            <div class="">
              <div class="text-h6">Job Detail</div>

              <div>
                <div>Job Title :{{ applicant?.job?.title }}</div>

                <div>
                  Applied Date :
                  {{ new Date(applicant.created_at).toLocaleString() }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-between">
            <div class="">
              <div class="text-h6">View Applicant Detail</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    v-model="applicant.f_name"
                    label="First Name"
                    disable
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    disable
                    v-model="applicant.m_name"
                    label="Middle Name"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    v-model="applicant.l_name"
                    label="Last Name"
                    lazy-rules
                    disable
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    v-model="applicant.phone_no"
                    label="Phone Number"
                    disable
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    v-model="applicant.email"
                    disable
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-separator class="q-mb-sm col-lg-12" />
        <q-card class="card-bg text-white col-md-12 col-lg-12" bordered>
          <q-table
            :rows="applicant.educations"
            :columns="edcolumns"
            dark
            class="table-bg"
            title="View Applicant Education"
            hide-pagination
          >
          </q-table>
        </q-card>
        <q-separator class="q-mb-sm col-lg-12" />

        <q-card class="text-white col-md-12" bordered>
          <q-table
            :rows="applicant.experiances"
            :columns="ecolumns"
            class="table-bg"
            dark
            title="View Applicant Experiance"
            hide-pagination
          >
          </q-table>
        </q-card>
        <q-separator class="q-mb-sm col-lg-12" />

        <q-card class="card-bg text-white col-lg-12 col-md-12" bordered>
          <q-table
            dark
            class="card-bg"
            :rows="applicant.certificates"
            :columns="ccolumns"
            title="View Applicant Certificate"
            hide-pagination
          >
          </q-table>
        </q-card>
        <q-separator class="q-mb-sm col-lg-12" />

        <q-card class="card-bg text-white col-lg-6" bordered>
          <q-card-section class="text-h6">
            <div>View Applicant Documents</div>
            <div class="text-h6 row justify-center">
              <!-- <a:href="" download="download">PDF</a> -->
              <!-- <q-btn :href="applicant.cv" target="_blank"> View CV</q-btn> -->
              <div>
                <q-btn v-if="applicant.cv" @click="pdfDialog(applicant.cv)">
                  View CV Doc
                </q-btn>
              </div>
              <div>
                <q-btn
                  v-if="applicant.supporting_doc"
                  @click="pdfDialog(applicant.supporting_doc)"
                >
                  View Additional Doc
                </q-btn>
              </div>

              <div>
                <q-btn
                  v-if="hasPermision('add shortlist')"
                  label="Add to Shortlist"
                  @click="shortlist()"
                ></q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="show" maximized>
      <q-card
        class="no-scroll"
        style="
          background: white;
          min-width: 95vw;
          min-height: 100vh;
          width: 100%;
          height: 100%;
        "
      >
        <q-bar class="bg-brand-light">
          <h5 class="text-brand-text">{{ title }}</h5>
          <q-space></q-space>
          <q-btn @click="show = false" color="white" flat icon="close"></q-btn>
        </q-bar>

        <div class="fit">
          <q-pdfviewer type="html5" :src="url" />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const ecolumns = [
  {
    name: "id",
    label: "Id",
    field: "id",
    sortable: true,
    align: "left",
  },
  {
    name: "title",
    label: "Position",
    field: "title",
    sortable: true,
    align: "left",
  },
  {
    name: "company",
    label: "Organization",
    field: "company",
    sortable: true,
    align: "left",
  },

  {
    name: "start date",
    label: "Start Date",
    field: "start_date",
    sortable: true,
    align: "left",
  },
  {
    name: "end date",
    label: "End Date",
    field: "end_date",
    sortable: true,
    align: "left",
  },
];
const edcolumns = [
  {
    name: "id",
    label: "Id",
    field: "id",
    sortable: true,
    align: "left",
  },
  {
    name: "study",
    label: "Department",
    field: "study_field",
    sortable: true,
    align: "left",
  },
  {
    name: "school",
    label: "Institution",
    field: "school",
    sortable: true,
    align: "left",
  },

  {
    name: "start date",
    label: "Start Date",
    field: "start_date",
    sortable: true,
    align: "left",
  },
  {
    name: "end date",
    label: "End Date",
    field: "end_date",
    sortable: true,
    align: "left",
  },
  {
    name: "degree type ",
    label: "Qualification",
    field: "degree_type",
    sortable: true,
    align: "left",
  },
  {
    name: "cgpa ",
    label: "CGPA",
    field: "cgpa",
    sortable: true,
    align: "left",
  },
];
const ccolumns = [
  {
    name: "id",
    label: "Id",
    field: "id",
    sortable: true,
    align: "left",
  },
  {
    name: "title",
    label: "Title",
    field: "title",
    sortable: true,
    align: "left",
  },
  {
    name: "issuer",
    label: "Issuer",
    field: "issuer",
    sortable: true,
    align: "left",
  },

  {
    name: "date",
    label: " Date",
    field: "date",
    sortable: true,
    align: "left",
  },
  {
    name: "summary",
    label: "Summary",
    field: "summary",
    sortable: true,
    align: "left",
  },
];

import { defineComponent, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar, Loading, Notify } from "quasar";
import { useDashStore } from "src/stores/dashboard-store";
import { storeToRefs } from "pinia";
// import {PdfPreview} from './PdfPreview.vue'
export default defineComponent({
  name: "ViewApplicant",

  components: {
    //  PdfPreview,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const applicant = ref({});
    const url = ref("");
    const show = ref(false);
    const dash = useDashStore();
    const created_at = ref("");

    const { noti } = storeToRefs(dash);

    const pdfDialog = (urll) => {
      url.value = urll;
      show.value = true;
      console.log("url", url.value);
      console.log("show", show.value);
    };
    const fetchApplicant = async () => {
      try {
        Loading.show();
        noti.value = noti.value.filter((n) => n.data.type !== "job");
        const response = await api.get("/applicants/" + route.query.id);
        applicant.value = response.data;
        created_at.value = applicant.value.job.created_at;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };

    fetchApplicant();

    const handleClick = (file) => {
      window.open(require(file), "_blank");
    };

    const shortlist = async () => {
      try {
        const response = await api.post("/set_liked/" + route.query.id, {
          liked: 1,
        });
        if (response.status == 200) {
          Notify.create({
            message: "Shortlisted Added Successfully",
            color: "green",
          });
          router.push("/shortlist");
        }
      } catch (error) {
        Notify.create({
          message: error.message ? error.message : "Error While Shortlisting",
          color: "red",
        });
      }
    };

    const hasPermision = (sperm) => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("ul", user.role.permissions);
      if (user?.role?.permissions) {
        console.log("ul2", user.role.permissions);

        const perm = user.role?.permissions;
        console.log("ul3", user.role.permissions);

        return perm?.some((p) => p.title.toLowerCase() == sperm);
      }
    };
    return {
      hasPermision,
      handleClick,
      fetchApplicant,
      applicant,
      ccolumns,
      edcolumns,
      ecolumns,
      router,
      shortlist,
      pdfDialog,
      url,
      created_at,
      show,
    };
  },
  methods: {},
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
