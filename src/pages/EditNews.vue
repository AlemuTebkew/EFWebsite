<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-start">
            <div class="row items-center q-px-lg q-mx-lg q-gutter-lg">
              <div class="text-h6">News Detail</div>
              <div class="text-h6 q-gutter-sm">
                <q-btn
                  v-if="hasPermision('update news')"
                  icon="edit"
                  flat
                  @click="editable = !editable"
                >
                </q-btn>
                <q-btn
                flat
                  v-if="hasPermision('delete news')"
                  style=""
                  @click="confirmDelete"
                >
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
              ></q-btn>
            </q-card-section>

            <q-card-section class="q-px-sm q-mx-lg q-mb-lg">
              <!-- <div class="col-4"> -->
              <q-item-label class="q-ma-lg">List Of News Photos</q-item-label>
              <!-- </div> -->
              <div class="row q-px-sm q-mx-lg q-mb-lg">
                <div
                  v-for="(imgurl, index) in photos"
                  :key="index"
                  class="col-lg-6 col-md-6 col-sm-12 q-mb-sm q-gutter-sm"
                >
                  <q-img
                    :src="imgurl.path"
                    spinner-color="white"
                    style="height: 400px; width: 80%"
                    alt="Hello"

                  />
                  <q-btn
                    color="red"
                    icon="cancel"
                    style="position: absolute;"
                    @click="deleteImage(index, imgurl.id)"
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
                >List Of News Photos</q-item-label
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
                :loading="loading"
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
import { title } from "process";
import { Notify, useQuasar, Loading } from "quasar";
import { api } from "src/boot/axios";
import { defineComponent, ref, onMounted, onUpdated } from "vue";
import { useNewsStore } from "src/stores/news-store";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "AddGallery",
  setup() {
    const newsStore = useNewsStore();
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const title = ref("");
    const category = ref("");
    const description = ref("");
    const photos = ref([]);
    const newPhotos = ref([]);
    const imageUrl = ref([]);
    const loading = ref(false);
    const editable = ref(false);

    const fetchNews = async () => {
      Loading.show();
      try {
        const response = await api.get("/news/" + route.query.id);

        const data = response.data;

        title.value = data.title;
        category.value = data.category;
        description.value = data.description;
        photos.value = data.photos;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    fetchNews();

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
          deleteNews();
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
        for (let i = 0; i < newPhotos.value.length; i++) {
          const onePhoto = newPhotos.value[i];
          formData.append("photos[" + i + "]", onePhoto);
        }

        const response = await api.post(
          "/update_news_img/" + route.query.id,
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
            message: "News Added Successfully",
            color: "green",
          });
        }
      } catch (error) {
        Notify.create({
          message: "Error While Adding News",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    };
    const saveChanges = async () => {
      loading.value = true;
      try {
        const response = await api.put("/news/" + route.query.id, {
          title: title.value,
          description: description.value,
        });

        console.log("ddd", response.data);
        if (response.status == 200) {
          Notify.create({
            message: "News Updated Successfully",
            color: "green",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Updating News",
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
        const response = await api.delete("/news_img/" + id);
        if (response.status == 200) {
          photos.value.splice(index, 1);

          Notify.create({
            message: "News Image Deleted Successfully",
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

    const deleteNews = async () => {
      loading.value = true;
      Loading.show();
      try {
        const response = await api.delete("/news/" +  route.query.id);
        if (response.status == 200) {
          // newsStore.deleteNews(route.query.id);
          Notify.create({
            message: "News Deleted Successfully",
            color: "green",
          });
          router.back();
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting News",
          color: "red",
        });
      } finally {
        loading.value = false;
        Loading.hide();
      }
    };

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
      title,
      category,
      description,
      photos,
      newPhotos,
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
      deleteNews,
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
        const response = await api.post("/galleries/"+route.query.id+'_methode=PUT', data, {
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
