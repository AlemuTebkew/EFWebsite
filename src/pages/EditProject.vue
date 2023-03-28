<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-start">
            <div class="row items-center q-px-lg q-mx-lg q-gutter-lg">
              <div class="text-h6">Project Detail</div>
              <div class="text-h6 q-gutter-sm">
                <q-btn flat icon="edit" @click="editable = !editable"> </q-btn>
                <q-btn flat style="" @click="confirmDelete()">
                  <q-icon color="red" name="delete"></q-icon>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-form @submit="saveChanges">
            <q-card-section class="q-px-lg q-mx-lg">
              <q-list
                class="row flex-center q-lg-mx-xl q-md-mx-xl q-lg-px-xl q-md-px-xl"
              >
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      :disable="!editable"
                      dark
                      color="white"
                      dense
                      v-model="title"
                      label="Title"
                      outlined
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      outlined
                      color="white"
                      :disable="!editable"
                      dense
                      label="Project Category *"
                      v-model="category"
                      :options="categories"
                      option-label="name"
                      option-value="id"
                      emit-value
                      map-options
                      dark
                      lazy-rules
                      :rules="[(val) => val || 'Please select something']"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      :disable="!editable"
                      dark
                      color="white"
                      dense
                      v-model="short_desc"
                      label="Short Description"
                      outlined
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      outlined
                      dense
                      dark
                      :disable="!editable"
                      type="number"
                      v-model="progress"
                      label="Project Progres *"
                      hint="Enter Project rogress from between 0 and 100"
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Please Enter Project Progress',
                        (val) =>
                          (val >= 0 && val <= 100) ||
                          'Please type a number between 0-100',
                      ]"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-editor
                      :disable="!editable"
                      v-model="description"
                      min-height="6rem"
                      color="black"
                      class="text-black"
                      label="Description"
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
                            options: [
                              'p',
                              'h1',
                              'h2',
                              'h3',
                              'h4',
                              'h5',
                              'h6',
                              'code',
                            ],
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
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section class="q-px-lg q-mx-lg q-mb-lg">
              <q-space />
              <q-btn
                v-if="editable"
                style="float: right"
                color="blue"
                label="Save Changes"
                class="q-mx-lg q-mb-xl q-pa-sm"
                type="submit"
                :loading="loading"
              ></q-btn>
            </q-card-section>

            <q-card-section class="q-px-sm q-mx-lg q-mb-lg">
              <!-- <div class="col-4"> -->
              <q-item-label class="q-ma-lg"
                >List Of Project Photos</q-item-label
              >
              <!-- </div> -->
              <div class="row q-px-sm q-mx-lg q-mb-lg">
                <div
                  v-for="(imgurl, index) in photos"
                  :key="index"
                  class="col-lg-6 col-md-6 col-sm-12 q-mb-sm q-gutter-sm"
                >
                  <div class="cont" style="position: relative">
                    <q-img
                      :src="imgurl.path"
                      spinner-color="white"
                      style="height: 400px; width: 80%"
                      alt="Hello"
                    />
                    <q-btn
                      v-if="editable"
                      class="bbtn"
                      color="red"
                      icon="cancel"
                      @click="deleteImage(index, imgurl.id)"
                      style="position: absolute; top: -5; right: -5; z-index: 3"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="q-px-sm q-mx-lg q-mb-lg">
              <div class="q-px-sm q-mx-sm">
                <q-file
                  v-if="editable"
                  accept=".jpg, image/*"
                  color="white"
                  class="bg-white"
                  outlined
                  v-model="newPhotos"
                  label="Upload Photos"
                  multiple
                  @update:model-value="fileChanged"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                </q-file>
              </div>
            </q-card-section>

            <q-card-section class="q-px-sm q-mx-lg q-mb-lg">
              <!-- <div class="col-4"> -->
              <q-item-label v-if="imageUrl.length" class="q-ma-lg"
                >List Of Project Photos</q-item-label
              >
              <!-- </div> -->
              <div class="row q-px-sm q-mx-lg q-mb-lg">
                <div
                  v-for="(imgurl, index) in imageUrl"
                  :key="index"
                  class="col-4"
                >
                  <q-img
                    :src="imgurl"
                    spinner-color="white"
                    style="height: 200px; max-width: 200px"
                    alt="Hello"
                  />
                  <q-btn color="red" icon="cancel" @click="removeImage"></q-btn>
                </div>
              </div>
            </q-card-section>
            <q-card-actions
              v-if="imageUrl.length"
              align="right"
              class="q-px-sm q-mx-lg q-mb-lg"
            >
              <q-btn
                class="text-capitalize bg-info text-white"
                @click="uploadImage"
                :loading="ploading"
                >Upload New Photo</q-btn
              >
              <!-- <q-btn
                class="text-capitalize bg-info text-white"
                @click="$router.back"
                >Cancel</q-btn
              > -->
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { title } from "process";
import { Notify, useQuasar, Loading } from "quasar";
import { api } from "src/boot/axios";
import { defineComponent, ref, onMounted, onUpdated } from "vue";
import { useNewsStore } from "src/stores/news-store";
import { useRoute, useRouter } from "vue-router";
import { useProjectStore } from "src/stores/project-store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "EditProject",
  setup() {
    const newsStore = useNewsStore();
    const projectStore = useProjectStore();

    // const { categories } = storeToRefs(projectStore);

    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const oneNews = newsStore.oneNews;
    const title = ref("");
    const category = ref("");
    const categories = ref([]);
    const description = ref("");
    const short_desc = ref("");
    const progress = ref("");
    const photos = ref([]);

    const newPhotos = ref([]);
    const imageUrl = ref([]);
    const loading = ref(false);
    const ploading = ref(false);
    const editable = ref(false);

    const fetchProject = async () => {
      Loading.show();
      try {
        const response = await api.get("/projects/" + route.query.id);
        const re = await api.get("/categories");
        categories.value = re.data;

        const data = response.data;

        title.value = data.title;
        category.value = data.category_id;
        description.value = data.description;
        short_desc.value = data.short_desc;
        progress.value = data.progress;
        photos.value = data.photos;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    fetchProject();

    const fileChanged = () => {
      newPhotos.value.forEach((p) => {
        imageUrl.value.push(URL.createObjectURL(p));
        console.log("url", imageUrl.value[0]);
      });
    };

    const removeImage = (index) => {
      imageUrl.value.splice(index, 1);
    };
    const confirmDelete = () => {
      $q.dialog({
        title: "Confirm",
        message: "Are You Sure to Delete ?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          console.log(">>>> OK");
          deleteProjects();
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
    const uploadImage = async () => {
      ploading.value = true;
      try {
        const formData = new FormData();
        for (let i = 0; i < newPhotos.value.length; i++) {
          const onePhoto = newPhotos.value[i];
          formData.append("photos[" + i + "]", onePhoto);
        }

        const response = await api.post(
          "/update_project_img/" + route.query.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("ddd", response.data);
        if (response.status == 200) {
          imageUrl.value = [];
          newPhotos.value = [];
          response.data.forEach((data) => {
            photos.value.push(data);
          });
          Notify.create({
            message: "Project Added Successfully",
            color: "green",
          });
        }
      } catch (error) {
        Notify.create({
          message: "Error While Adding Project",
          color: "red",
        });
      } finally {
        ploading.value = false;
      }
    };
    const saveChanges = async () => {
      loading.value = true;
      try {
        const response = await api.put("/projects/" + route.query.id, {
          title: title.value,
          description: description.value,
          progress: progress.value,
          short_desc: short_desc.value,
          category_id: category.value,
        });

        console.log("ddd", response.data);
        if (response.status == 200) {
          Notify.create({
            message: "Project Updated Successfully",
            color: "green",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Updating Project",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    };

    const deleteImage = async (index, id) => {
      Loading.show();
      // loading.value = true;
      try {
        const response = await api.delete("/project_img/" + id);
        if (response.status == 200) {
          photos.value.splice(index, 1);

          Notify.create({
            message: "Project Image Deleted Successfully",
            color: "green",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting Project Image",
          color: "red",
        });
      } finally {
        // loading.value = false;
        Loading.hide();
      }
    };

    const deleteProjects = async () => {
      loading.value = true;
      Loading.show();
      try {
        const response = await api.delete("/projects/" + route.query.id);
        if (response.status == 200) {
          Notify.create({
            message: "Project Deleted Successfully",
            color: "green",
          });
          router.back();
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting Projects ",
          color: "red",
        });
      } finally {
        loading.value = false;
        Loading.hide();
      }
    };

    onUpdated(() => {
      router.back();
    });
    return {
      title,
      category,
      description,
      short_desc,
      progress,
      photos,
      newPhotos,
      loading,
      ploading,
      imageUrl,
      editable,
      projectStore,
      categories,
      onSubmit,
      fileChanged,
      removeImage,
      uploadImage,
      deleteImage,
      saveChanges,
      confirmDelete,
      deleteProjects,
    };

    async function onSubmit() {
      loading.value = true;
      try {
        const data = new FormData();
        data.append("title", title.value);
        data.append("category", category.value);
        data.append("description", description.value);
        console.log("ph", photos.value);
        for (let i = 0; i < photos.value.length; i++) {
          const onePhoto = photos.value[i];
          data.append("photos[" + i + "]", onePhoto);
        }
        const response = await api.post("/galleries", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("data", response.data);

        Notify.create({
          message: "Project Added Successfully",
          color: "green",
        });
        router.push("/gallery");
      } catch (error) {
        Notify.create({
          message: "Error While Saving Gallery",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    }
  },
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}

.bbtn {
  opacity: 0;
}
.cont:hover .bbtn {
  opacity: 1;
}
</style>
