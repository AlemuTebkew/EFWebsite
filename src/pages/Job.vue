<template>
  <q-page style="overflow-x: hidden">
    <q-card class="no-shadow q-ma-sm" bordered>
      <q-card-section class="q-mb-sm">
        <div class="text-h6 text-white row">
          <div class="text-black">List Of Jobs</div>
          <q-space />
          <q-btn
            label="Add New Job"
            color="blue"
            class="float-right text-capitalize shadow-3"
            icon="add"
            @click="toggleAddDialog()"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none q-ma-none">
        <q-table
          ref="table"
          class="q-mt-none q-pt-none table-bg"
          :rows="jobs"
          :columns="columns"
          :row-key="jobs.id"
          dark
          :pagination="{ rowsPerPage: 20 }"
          :filter="search"
        >
          <template v-slot:body-cell-status="props">
            <q-td>
              {{convertDdate(props.row.deadline) >= 0 ? "opened" : "closed" }}
            </q-td>
          </template>
          <template v-slot:body-cell-posted_by="props">
            <q-td>
              {{ props.row.user?.f_name +' '+ props.row.user?.l_name }}
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                icon="remove_red_eye"
                size="sm"
                flat
                dense
                @click="viewJob(props.row)"
              >
              </q-btn>
              <q-btn
                icon="delete"
                size="sm"
                class="q-ml-sm"
                color="red"
                flat
                dense
                @click="confirmDelete(props.row.id)"
              >
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
  <AddJob
    :showDialog="dataStore.dialogState"
    @closeDialog="toggleAddDialog()"
  />

  <q-dialog v-model="dataStore.viewDialogState" persistent>
    <q-card class="" style="width: 600px; min-height: 300px">
      <q-card-section class="row justify-between items-center">
        <q-item-label v-if="dataStore.editableState" class="text-h6"
          >Edit Job</q-item-label
        >
        <q-item-label v-else class="text-h6">View Job</q-item-label>
        <div>
          <q-toggle
            :model-value="dataStore.editableState"
            @update:model-value="dataStore.toggleEdit()"
          >
          </q-toggle>
          <q-btn flat class="bg-white" icon="close" @click="toggleViewDialog()">
          </q-btn>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <q-form
          @submit="onEditSubmit()"
          @reset="onReset"
          class="q-gutter-md"
          autocomplete="on"
        >
          <q-input
            :disable="!dataStore.editableState"
            autocomplete
            outlined
            dense
            v-model="title"
            label="Job Title *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-editor
            :disable="!dataStore.editableState"
            dense
            placeholder="Enter Job Description Here"
            v-model="description"
            min-height="5rem"
            toolbar-color="black"
            class=""
            title="Enter More Description"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify'],
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify'],
                },
              ],
              [
                'bold',
                'italic',
                'strike',
                'underline',
                'subscript',
                'superscript',
              ],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7',
                  ],
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          >
          </q-editor>

          <q-select
            :disable="!dataStore.editableState"
            dense
            :options="['Partime', 'Fulltime', 'Remote']"
            v-model="type"
            label="Type"
            outlined
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-select
            :disable="!dataStore.editableState"
            dense
            v-model="department_id"
            :options="departments"
            option-value="id"
            option-label="title"
            emit-value
            map-options
            outlined
            label="Select Department"
          />
          <q-input
            disable
            dense
            filled
            v-model="deadline"
            mask="date"
            label="select deadline"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    dense
                    v-model="deadline"
                    :disable="!dataStore.editableState"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-toggle
            :model-value="is_active"
            @update:model-value="toggle()"
            label="toggle job status"
          >
          </q-toggle>
          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              :label="$t('save')"
              :loading="dataStore.btnLoadingState"
              v-if="dataStore.editableState"
              class="active-button"
              type="submit"
            />

            <q-btn
              v-close-popup
              v-if="dataStore.editableState"
              color="#E8E8E8"
              class="text-black"
              type="reset"
              :label="$t('cancel')"
              @click="toggleViewDialog()"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref, computed } from "vue";
import { Loading, useQuasar } from "quasar";

import AddJob from "src/components/AddJob.vue";

import { useDataStore } from "stores/common-data-store";
import { useJobStore } from "stores/job_store";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";

const columns = [
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
    name: "type",
    label: "Type",
    field: "type",
    sortable: true,
    align: "left",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
    align: "left",
  },
  {
    name: "posted_by",
    label: "Posted By",
    field: "posted_by",
    sortable: true,
    align: "left",
  },
  {
    name: "deadline",
    label: "Deadline",
    field: "deadline",
    sortable: true,
    align: "left",
  },

  {
    name: "action",
    label: "Action",
    field: "Action",
    sortable: false,
    align: "center",
  },
];

export default defineComponent({
  /* eslint-disable */
  name: "Bank",
  components: {
    AddJob,
  },
  setup() {
    const $q = useQuasar();
    const dataStore = useDataStore();
    const jobStore = useJobStore();
    const router = useRouter();
    const table = ref(null);

    const search = ref("");
    const { jobs, departments } = storeToRefs(jobStore);
    const selectedBank = ref({});

    const id = ref("");
    const title = ref("");
    const description = ref("");
    const type = ref("");
    const deadline = ref("");
    const department_id = ref("");
    const is_active = ref(false);

    const toggleAddDialog = () => {
      dataStore.toggleAddDialog();
    };
    const toggle = () => {
      is_active.value = !is_active.value;
    };
    const toggleViewDialog = () => {
      if (dataStore.editableState) dataStore.toggleEdit();
      dataStore.toggleViewDialog();
    };

    async function onEditSubmit() {
      try {
        dataStore.setBtnLoading(true);

        const response = await api.put("/jobs/" + id.value, {
          title: title.value,
          description: description.value,
          type: type.value,
          department_id: department_id.value,
          deadline: deadline.value,
          is_active: is_active.value,
        });

        if (response.status == 200) {
          dataStore.toggleEdit();
          dataStore.toggleViewDialog();
          jobStore.updateJob(id.value, response.data);
          $q.notify({
            type: "positive",
            message: "Job Updated Successfully.",
          });
        }
      } catch (error) {
        handleError(error);
      } finally {
        dataStore.setBtnLoading(false);
      }
    }

    const convertDdate = (ddd) => {

      console.log('ff',ddd)
      console.log('ff2',new Date().toISOString())
      var date1 = new Date();
      var date2 = new Date(ddd);
      var diff =date2.getTime() - date1.getTime();
      // diff is: Thu Jul 05 1973 04:00:00 GMT+0300 (EEST)

      diff / (1000 * 3600 * 24)
      // console.log(diff.getUTCFullYear() - 1970); // Gives difference as year
      // // 3

      // console.log(diff.getUTCMonth()); // Gives month count of difference
      // // 6

      console.log('dif',diff / (1000 * 3600 * 24)); // Gives day count of difference
      // 4

      return (diff / (1000 * 3600 * 24))

    };
    const viewJob = (data) => {
      id.value = data.id;
      title.value = data.title;
      description.value = data.description;
      type.value = data.type;
      department_id.value = data.department_id;
      deadline.value = data.deadline;
      is_active.value = data.is_active ? true : false;

      toggleViewDialog();
      // selectedBank.value = { ...data };
    };

    const deleteJob = async (id) => {
      Loading.show();
      try {
        const response = await api.delete("/jobs/" + id);
        if (response.status == 200) {
          const index = jobs.value.findIndex((bank) => bank.id == id);
          jobs.value.splice(index, 1);
          $q.notify({
            type: "positive",
            message: "Job Deleted Successfully.",
          });
        }
      } catch (error) {
        handleError(error);
      } finally {
        Loading.hide();
      }
    };

    const handleError = (error) => {
      let message = `Internal Server error.`;

      message = error?.response?.data?.message;

      if (!message) {
        message = error.message;
      }
      $q.notify({
        type: "negative",
        message: message,
      });
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
          deleteJob(id);
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

    const fetchJobs = async () => {
      try {
        Loading.show();
        const res = await api.get("/departments");
        jobStore.setDepartments(res.data);
        const response = await api.get("/get_jobs");
        if (response.status == 200) {
          jobStore.setJobs(response.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        Loading.hide();
      }
    };

    fetchJobs();
    const clearData = () => {
      title.value = "";
      description.value = "";
      title.value = "";
    };

    return {
      convertDdate,
      table,
      jobs,
      departments,
      columns,
      fetchJobs,
      toggleAddDialog,
      toggleViewDialog,
      search,
      confirmDelete,
      jobs,
      deleteJob,
      handleError,
      onEditSubmit,
      toggle,

      id,
      title,
      description,
      type,
      department_id,
      deadline,
      dataStore,
      jobStore,
      viewJob,
      clearData,
      is_active,
    };
  },
});
</script>

<style lang="scss"></style>
