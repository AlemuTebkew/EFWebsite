<template>
  <q-card class="no-shadow q-ma-sm" bordered>
    <q-card-section class="q-mb-lg">
      <div class="text-h6 text-white">
        <q-space />
        <q-btn
          v-if="hasPermission('add project')"
          label="Add New Project"
          color="blue"
          class="float-right text-capitalize shadow-3"
          icon="add"
          @click="showDialog = true"
        />
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="table-bg">
      <div class="text-h6 text-white row justify-between items-center">
        <div>Project Lists</div>

        <div class="row items-center">
          <q-select
            outlined
            v-model="type"

            :options="categories"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            dense
            color="white"
            dark
          />

          <q-tabs
            v-model="tab"
            class="text-blue q-pa-none"
            dense
            no-caps
            narrow-indicator
          >
            <q-tab name="all" :ripple="false" label="All" />
            <q-tab class="active" name="active" label="Completed" />
            <q-tab name="inactive" label="In Completed">
              <q-badge color="red q-ml-sm" floating>{{
                projects.filter((project) => !project.is_completed).length
              }}</q-badge>
            </q-tab>
          </q-tabs>
        </div>
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="filteredProjects"
        :columns="columns"
        :row-key="projects.name"
        dense
        bordered
        square
      >
        <template v-slot:body-cell-Photo="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <!-- <q-avatar> -->
                <img
                  :src="props.row.photos[0]?.path"
                  width="100"
                  height="100"
                />
                <!-- </q-avatar> -->
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Status="props">
          <q-td :props="props">
            {{ props.row.is_completed ? "Completed" : "In completed" }}
          </q-td>
        </template>

        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
            v-if="hasPermission('update project')"
              icon="remove_red_eye"
              size="sm"
              flat
              dense
              :to="'/editProject?id=' + props.row.id"
            />
            <!-- <q-btn
            v-if="hasPermission('delete project')"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="deleteProject(props.row.id)"
            /> -->
          </q-td>
        </template>
        <template v-slot:body-cell-Progress="props">
          <q-td :props="props">
            <q-linear-progress
              dark
              :color="getColor(props.row.progress)"
              :value="props.row.progress / 100"
              class="q-mt-md"
              style="height: 20px"
              rounded
            />
            <span>{{ props.row.progress + " %" }}</span>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog" persistent>
    <q-card class="" style="width: 600px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Add New Project</q-item-label>
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
            dense
            outlined
            v-model="title"
            label="Project Title *"
            maxlength="70"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              (val) => val.length < 70 || 'max length 70',
            ]"
          />
          <q-input
          dense
            autocomplete
            outlined
            v-model="short_desc"
            label="Short Description *"
            maxlength="200"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              (val) => val.length < 200 || 'max length 200',
            ]"
          />
          <q-select
          dense
            outlined
            v-model="category"
            label="Project Category *"
            :options="categories"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            fill-input
            lazy-rules
            :rules="[(val) => val || 'Please select something']"
          />

          <q-input
            outlined
            dense
            type="number"
            v-model="progress"
            label="Project Progres *"
            hint="Enter Project rogress from between 0 and 100"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please Enter Project Progress',
              (val) =>
                (val >= 0 && val <= 100) ||
                'Please type a number between 0-100',
            ]"
          />

          <q-editor
          dense
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

          <q-file
            accept=".jpg, image/*"
            color="teal"
            filled
            dense
            v-model="photo"
            label="Upload Photo"
            multiple
            @update:model-value="fileChanged"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div class="row">
            <div v-for="(imgurl, index) in imageUrl" :key="index" class="col-6">
              <q-img
                :src="imgurl"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
              <q-btn color="red" icon="cancel" @click="removeImage"></q-btn>
            </div>
          </div>

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
             no-caps
              label="Save Project"
              :loading="loading"
              type="submit"
              color="primary"
            />
            <!-- <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            /> -->
            <q-btn no-caps v-close-popup color="primary" type="reset" label="Cancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "boot/axios";
import { defineComponent, ref, watch, onMounted } from "vue";
import { Loading, Notify } from "quasar";
import { computed } from "vue";
import { useProjectStore } from "src/stores/project-store";
import { storeToRefs } from "pinia";
const data = [
  {
    title: "Pratik Patel",
    photos: [
      {
        id: 121,
        path: "https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
      },
    ],
    progress: 10,
    is_completed: 0,
    type: "Building",
    description: "Solutions Developer",
  },
];
const columns = [
  {
    name: "Title",
    label: "Title",
    field: "title",
    sortable: true,
    align: "left",
  },

  {
    name: "Photo",
    label: "Photo",
    field: "photos",
    sortable: true,
    align: "left",
  },
  {
    name: "Type",
    label: "Type",
    field: "type",
    sortable: true,
    align: "left",
  },
  {
    name: "Progress",
    label: "Progress",
    field: "progress",
    sortable: true,
    align: "left",
  },

  {
    name: "Status",
    label: "Status",
    field: "is_completed",
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

export default defineComponent({
  name: "Project",

  setup() {
    const projectStore = useProjectStore();

    const { categories } = storeToRefs(projectStore);
    const photo = ref([]);
    const imageUrl = ref([]);
    const title = ref("");
    const category = ref("");
    const type = ref("");
    const progress = ref("");
    const loading = ref(false);
    const description = ref("");
    const short_desc = ref("");
    const showDialog = ref(false);
    const projects = ref([]);
    const tab = ref("all");

    const fetchProjects = async () => {
      try {
        Loading.show();

        const response = await api.get("/projects");
        projects.value = response.data;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };

    fetchProjects();

    const fetchCategories = async () => {
      try {
        Loading.show();

        const response = await api.get("/categories");

        projectStore.setCategories(response.data);
        // categories.value = response.data;
        category.value=response.data[0].id
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };

    fetchCategories();

    const filteredProjects = computed(() => {
      return tab.value == "all"
        ? categorizedProjects.value
        : categorizedProjects.value.filter((project) => {
            return tab.value == "active"
              ? project.is_completed == 1
              : project.is_completed == 0;
          });
    });
    const categorizedProjects = computed(() => {
      return type.value?  projects.value.filter((project) => {
            return project.category_id == type.value
          }) : projects.value;
    });
    // watch(
    //   () => photo.value,
    //   () => {
    //     photo.value.forEach((onePhoto)=>{
    //      imageUrl.value[0]=(URL.createObjectURL(onePhoto));

    //     })
    //   }
    // );

    const fileChanged = () => {
      photo.value.forEach((p) => {
        imageUrl.value.push(URL.createObjectURL(p));
        console.log("url", imageUrl.value[0]);
      });
    };

    const removeImage = (index) => {
      imageUrl.value.splice(index, 1);
      photo.value.splice(index, 1);
    };
    const clearData = () => {
      title.value = "";
      description.value = "";
      progress.value = "";
      photo.value = "";
      imageUrl.value = "";
    };

    const deleteProject = async (id) => {
      const index = projects.value.findIndex((pro) => pro.id == id);
      try {
        const response = await api.delete("/projects/" + id);
        if (response.status == 200) {
          projects.value.splice(index, 1);
          Notify.create({
            message: "Project Deleted Successfully",
            color: "green",
            position: "top",
          });
        }
      } catch (error) {}
    };

    const hasPermission=(sperm)=>{
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
      hasPermission,
      projects,
      fetchProjects,
      fetchCategories,
      categories,
      projectStore,
      columns,
      tab,
      type,
      showDialog,
      title,
      category,
      progress,
      description,
      short_desc,
      photo,
      loading,
      imageUrl,
      onSubmit,
      onMounted,
      fileChanged,
      removeImage,
      filteredProjects,
      deleteProject,
      getColor(val) {
        if (val > 70 && val <= 100) {
          return "green";
        } else if (val > 50 && val <= 70) {
          return "blue";
        }
        return "red";
      },
    };

    async function onSubmit() {
      // this.imageUrl = URL.createObjectURL(photo.value);

      loading.value = true;
      try {
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category_id", category.value);
        formData.append("progress", progress.value);
        formData.append("description", description.value);
        formData.append("short_desc", short_desc.value);

        for (let i = 0; i < photo.value.length; i++) {
          const onePhoto = photo.value[i];
          formData.append("photos[" + i + "]", onePhoto);
        }
        const response = await api.post("/projects", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        projects.value.unshift(response.data);
        showDialog.value = false;
        Notify.create({
          message: "Project Added Successfully",
          color: "green",
        });

        clearData();
      } catch (error) {
        Notify.create({
          message: "Error While Saving Projects",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    }
  },
});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
