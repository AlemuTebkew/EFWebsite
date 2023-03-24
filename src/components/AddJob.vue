<template>
  <q-dialog v-model="show" persistent>
    <q-card class="" style="width: 600px; min-height: 300px">
      <q-card-section class="row justify-between items-center">
        <q-item-label class="text-h6">Add New Job</q-item-label>
        <q-btn
          flat
          class="bg-white"
          icon="close"
          @click="$emit('closeDialog')"
        />
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          autocomplete="on"
        >
          <q-input
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
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
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
              'size-7'
            ]
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
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
          >
            More</q-editor
          >

          <q-select
            dense
            :options="['Partime', 'Fulltime', 'Remote']"
            v-model="type"
            label="Type"
            outlined

            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-select
            dense
            v-model="department_id"
            :options="departments"
            option-value="id"
            option-label="title"
            color="black"
            outlined
            emit-value
            map-options
            label="Select Department"
          />
          <q-input dense filled v-model="date" mask="date" :rules="['date']" label="select deadline">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date dense v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Job"
              :loading="dataStore.btnLoadingState"
              type="submit"
              color="primary"
              no-caps
            />

            <q-btn
              v-close-popup
              color="primary"
              @click="$emit('closeDialog')"
              label="Cancel"
              no-caps
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { computed, defineComponent, ref, toRef } from "vue";
import { useQuasar } from "quasar";
import { useDataStore } from "src/stores/common-data-store";
import { useJobStore } from "src/stores/job_store.js";
import { storeToRefs } from "pinia";

export default defineComponent({
  title: "AddBank",
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["saveBank", "closeDialog"],

  setup(props, { emit }) {
    // const show = ref(props.showDialog)

    const $q = useQuasar();
    const dataStore = useDataStore();
    const jobStore = useJobStore();


    const show = computed(() => props.showDialog);

    const { departments } = storeToRefs(jobStore);
    const title = ref("");
    const description = ref("");
    const type = ref("");
    const department_id = ref("");
    const date = ref("");


    async function onSubmit() {
      try {
        dataStore.setBtnLoading(true);
        const response = await api.post("/jobs", {

          title:title.value,
          description:description.value,
          type:type.value,
          department_id:department_id.value,
          deadline:date.value,
        });

        if (response.status == 201) {
          jobStore.addJob(response.data);
          closeDialog();
          $q.notify({
            type: "positive",
            message: "Job Saved Successfully.",
          });
          console.log(response.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        dataStore.setBtnLoading(false);
      }
    }
    const handleError = (error) => {
      let message = `Internal Server error.`;

      message = error?.response?.data.message;
      console.log("err=", error.response.data.message);

      $q.notify({
        type: "negative",
        message: message,
      });
    };

    const closeDialog = () => {
      emit("closeDialog");
      clearData();
    };
    const clearData = () => {
      title.value = ""
      description.value = ""
      type.value = ""
      date.value = ""
      department_id.value=''

    };
    return {
      closeDialog,
      clearData,
      handleError,
      show,
      title,
      description,
      type,
      department_id,
      date,
      onSubmit,
      dataStore,
      departments,
    };
  },
});
</script>
