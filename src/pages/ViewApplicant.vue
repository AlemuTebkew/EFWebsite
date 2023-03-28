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
                  {{ new Date(applicant?.job?.created_at).toDateString() }}
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
          <q-card-section class="text-h6 row justify-between">
            <div class="">
              <div class="text-h6">View Applicant Documents</div>

              <!-- <a:href="" download="download">PDF</a> -->
              <!-- <q-btn :href="applicant.cv" target="_blank"> View CV</q-btn> -->
              <div>
                <a v-if="applicant.cv" :href="applicant.cv" download="false">
                  View CV</a
                >
              </div>
              <div>
                <a
                  v-if="applicant.supporting_doc"
                  :href="applicant.supporting_doc"
                  download
                  >View Additional Doc</a
                >
              </div>


                <button clickable @click="handleClick(applicant.supporting_doc)">a pdf file</button>

            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
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
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar, Loading } from "quasar";
import { useDashStore } from "src/stores/dashboard-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ViewApplicant",

  setup() {
    const route = useRoute();
    const applicant = ref({});
    const dash = useDashStore();

    const { noti } = storeToRefs(dash);
    const fetchApplicant = async () => {
      try {
        Loading.show();
        noti.value = noti.value.filter((n) => n.data.type !== "job");
        const response = await api.get("/applicants/" + route.query.id);
        applicant.value = response.data;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };

    fetchApplicant();

    const handleClick=(file)=>
    {
      window.open(require(file), '_blank')

    }
    return {
      handleClick,
      fetchApplicant,
      applicant,
      ccolumns,
      edcolumns,
      ecolumns,
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
