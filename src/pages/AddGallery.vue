<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-start">
            <div class="row flex-center q-px-lg q-mx-lg">
              <div class="text-h6">Add Gallery</div>
            </div>
          </q-card-section>

          <q-form @submit="onSubmit">
            <q-card-section class="q-px-lg q-mx-lg">
              <q-list class="row flex-center q-lg-mx-xl q-md-mx-xl q-lg-px-xl q-md-px-xl">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      outlined
                      v-model="title"
                      label="Title"
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
                    <!-- <q-space /> -->
                    <q-select
                      outlined
                      color="white"
                      style="width: 300px"
                      v-model="category"
                      :options="[
                        'Cermony',
                        'Project',
                        'Certificate',
                        'Designed',
                      ]"
                      label="Category"
                      dark

                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-editor
                      v-model="description"
                      min-height="6rem"
                      color="black"
                      class="text-black"
                      placeholder="Description Here"

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

                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-file
                      accept=".jpg, image/*"
                      color="white"
                      filled
                      multiple
                      v-model="photos"
                      label="Upload Photo"
                      dark
                      @update:model-value="fileChanged"
                    >
                      <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                      </template>
                    </q-file>
                  </q-item-section>
                </q-item>

              </q-list>
              <div class="row q-px-sm q-mx-lg q-my-lg">
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
            <q-card-actions align="right">
              <q-btn class="text-capitalize bg-info text-white" type="submit" :loading="loading"
                >Save Gallery</q-btn
              >
              <q-btn
                class="text-capitalize bg-info text-white"
                @click="$router.back"
                >Cancel</q-btn
              >
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { title } from "process";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "AddGallery",
  setup() {
    const title = ref("");
    const category = ref("");
    const description = ref("");
    const photos = ref([]);
    const imageUrl = ref([]);
    const loading = ref(false);
    const router=useRouter();

    const fileChanged = () => {
      photos.value.forEach((p) => {
        imageUrl.value.push(URL.createObjectURL(p));
        console.log("url", imageUrl.value[0]);
      });
    };

    const removeImage = (index) => {
      imageUrl.value.splice(index, 1);
    };
    return {
      title,
      category,
      description,
      photos,
      loading,
      imageUrl,
      onSubmit,
      fileChanged,
      removeImage,
    };

    async function onSubmit() {
      loading.value = true;
      try {
        const data = new FormData();
        data.append("title", title.value);
        data.append("category", category.value);
        data.append("description", description.value);
        console.log('ph',photos.value)
        for (let i = 0; i < photos.value.length; i++) {
          const onePhoto = photos.value[i];
          data.append("photos[" + i + "]", onePhoto);
        }
        const response = await api.post("/galleries", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("data", response.data);

        Notify.create({
          message: "Gallery Added Successfully",
          color: "green",
        });
        router.push('/gallery')
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
