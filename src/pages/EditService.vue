<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-start">
            <div class="row items-center q-px-lg q-mx-lg q-gutter-lg">
              <div class="text-h6">Service Detail</div>
              <div class="text-h6 q-gutter-sm">
                <q-btn flat icon="edit" @click="editable = !editable"> </q-btn>
                <q-btn flat style="" @click="confirmDelete">
                  <q-icon color="red" name="delete"></q-icon>
                </q-btn>
              </div>
            </div>
          </q-card-section>
     
          <q-form @submit="onSubmit">
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
                    <q-input
                      :disable="!editable"
                      dark
                      color="white"
                      dense
                      v-model="short_desc"
                      label="Shrt Description"
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
                @click="saveChanges"
                :loading="loading"
                no-caps
              ></q-btn>
            </q-card-section>

            <q-card-section class="q-px-sm q-mx-lg q-mb-lg">
              <q-file
                v-if="editable"
                accept=".jpg, image/*"
                color="white"
                class="bg-white"
                filled
                v-model="icon"
                label="Upload Icon"
                :rules="[(val) => val || 'Please Select something']"
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>

              <!-- <div class="col-4"> -->
              <q-item-label class="q-ma-lg">Service Photo</q-item-label>
              <!-- </div> -->
              <div class="row q-px-sm q-mx-lg q-mb-lg">
                <div class="col-lg-12 col-md-12 col-sm-12 q-mb-sm " style="position: relative;">
                  <q-img
                    :src="photo"
                    spinner-color="white"
                    style="height: 400px; width: 90%"
                    alt="Hello"
                  />
                  <q-btn v-if="editable" color="red" icon="cancel"
                  style="position: absolute; right: -3px; top: 0px; z-index: 1"

                  ></q-btn>
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
                  v-model="newPhoto"
                  label="Upload Photo"
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
              <q-item-label v-if="imageUrl" class="q-ma-lg"
                >Service Photo</q-item-label
              >
              <!-- </div> -->
              <div v-if="imageUrl" class="row q-px-sm q-mx-lg q-mb-lg">
                <div class="col">
                  <q-img
                    :src="imageUrl"
                    spinner-color="white"
                    style="height: 400px; max-width: 90%"
                    alt="Hello"
                  />
                  <q-btn color="red" icon="cancel" @click="removeImage"></q-btn>
                </div>
              </div>
            </q-card-section>
            <q-card-actions
              v-if="imageUrl"
              align="right"
              class="q-px-sm q-mx-lg q-mb-lg"
            >
              <q-btn
                class="text-capitalize bg-info text-white"
                @click="uploadImage"
                :loading="loading"
                no-caps
                >Upload New Gallery</q-btn
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
import { Notify, useQuasar, Loading } from "quasar";
import { api } from "src/boot/axios";
import { defineComponent, ref, onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "EditService",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    // const oneNews = newsStore.oneNews;

    const title = ref("");
    const description = ref("");
    const short_desc = ref("");
    const photo = ref("");
    const icon = ref("");
    const newPhoto = ref("");
    const imageUrl = ref("");
    const loading = ref(false);
    const editable = ref(false);

    const fetchService = async () => {
      Loading.show();
      try {
        const response = await api.get("/services/" + route.query.id);

        // gallery.value = response.data;
        const data = response.data;
        console.log("dd", data);
        title.value = data.title;
        short_desc.value = data.short_desc;
        description.value = data.description;
        photo.value = data.photo;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    fetchService();

    const fileChanged = () => {
      imageUrl.value = URL.createObjectURL(newPhoto.value);
    };

    const removeImage = (index) => {
      imageUrl.value = "";
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
          deleteService(route.query.id);
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
      loading.value = true;
      try {
        const formData = new FormData();

        formData.append("photo", newPhoto.value);
        formData.append("logo", newLogo.value);

        const response = await api.post(
          "/update_service_img/" + route.query.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status == 200) {
          imageUrl.value = [];
          newPhoto.value = [];
          photo.value = response.data;
          Notify.create({
            message: "Service Added Successfully",
            color: "green",
          });
        }
      } catch (error) {
        Notify.create({
          message: "Error While Adding Service",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    };

    const saveChanges = async () => {
      loading.value = true;
      try {
        const response = await api.put("/services/" + route.query.id, {
          title: title.value,
          description: description.value,
          short_desc: short_desc.value,
        });

        console.log("ddd", response.data);
        if (response.status == 200) {
          Notify.create({
            message: "Service Updated Successfully",
            color: "green",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Updating Service",
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
        const response = await api.delete("/service_img/" + id);
        if (response.status == 200) {
          photos.value.splice(index, 1);

          Notify.create({
            message: "Service Image Deleted Successfully",
            color: "green",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting News Image",
          color: "red",
        });
      } finally {
        // loading.value = false;
        Loading.hide();
      }
    };

    const deleteService = async (id) => {
      loading.value = true;
      Loading.show();
      try {
        const response = await api.delete("/services/" + id);
        if (response.status == 200) {
          Notify.create({
            message: "Service Deleted Successfully",
            color: "green",
          });
          router.back();
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting Service ",
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
      icon,
      description,
      short_desc,
      photo,
      newPhoto,
      loading,
      imageUrl,
      editable,
      onSubmit,
      fileChanged,
      removeImage,
      uploadImage,
      deleteImage,
      saveChanges,
      confirmDelete,
      deleteService,
      fetchService,
    };

    async function onSubmit() {
      loading.value = true;
      try {
        const data = new FormData();
        data.append("title", title.value);
        data.append("short_desc", short_desc.value);
        data.append("description", description.value);
        data.append("photo", photos.value);

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
</style>
