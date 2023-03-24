<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <q-space />
        <q-btn
        v-if="hasPermision('add news')"
        no-caps
          icon="add"
          label="Add News"
          color="blue"
          class="float-right text-white bg-primary"
          @click="showDialog = true"
        />
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
          <div class="text-h6 float-left q-ml-md q-mt-sm">List Of News</div>
          <q-space />
          <!-- <q-select dense outlined style="min-width: 200px" v-model="type" :options="['All','Free','Paid']"
                    class="float-right" label="Category"/> -->
        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-sm">
          <div
            class="col-lg-4 col-sm-12 col-xs-12 col-md-4"
            v-for="(data, index) in news"
            :key="index"
          >
            <q-card
              style="background-color: #292845; height: 400px"
              v-ripple
              class="col text-white cursor-pointer q-hoverable"
              @click="editNews(data.id)"
            >
              <span class="q-focus-helper"></span>
              <q-card-section class="text-h6 text-center q-pa-none">
                <q-img :src="data.photos[0]?.path" style="height: 400px">
                  <template v-slot:loading>
                    <div class="text-subtitle1 text-white">
                      <q-circular-progress
                        indeterminate
                        rounded
                        size="40px"
                        color="black"
                        class="q-ma-md"
                      />
                    </div>
                  </template>
                  <div class="absolute-full text-subtitle2 flex flex-center">
                    {{ data.title }}
                  </div>
                </q-img>
              </q-card-section>
              <!-- <q-separator></q-separator> -->
              <!-- <q-card-section class="text-h6 text-center q-pa-none">
                <p v-html="data.title"></p>
              </q-card-section> -->
              <!-- <q-card-section class="text-justify">
                <div>{{ data.text.substring(0,20) }}</div>
              </q-card-section> -->
              <!-- <q-card-actions class="q-pa-none">
                <q-btn
                  align="center"
                  color
                  icon="remove_red_eye"
                  class="bg-transparent text-capitalize"
                  flat
                  label="View Detail"
                /> -->

              <!-- <q-btn color  class="" flat label="Veiw More.."></q-btn> -->
              <!-- <q-btn color icon="chat_bubble" class="bg-transparent" flat label="56"/> -->
              <!-- </q-card-actions> -->
            </q-card>
          </div>
        </div>
      </q-card-section>

      <!-- <q-inner-loading
        :showing="visible"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      /> -->

      <q-card-actions align="center" v-if="news.length > 0">
        <q-pagination
          v-model="page"
          :min="currentPage"
          :max="Math.ceil(news.length / totalPages)"
          :input="true"
          input-class="text-orange-10"
        >
        </q-pagination>
      </q-card-actions>
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
            dense
              autocomplete
              outlined
              v-model="title"
              label="News Title *"
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

            <q-editor
            dense
              placeholder="Enter News Description Here"
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
              v-model="photos"
              label="Upload Photos"
              multiple
              @update:model-value="fileChanged"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>

            <div class="row">
              <div
                v-for="(imgurl, index) in imageUrl"
                :key="index"
                class="col-6"
              >
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
                label="Save News"
                :loading="loading"
                type="submit"
                color="primary"
                no-caps
              />

              <q-btn
              no-caps

                v-close-popup
                color="primary"
                type="reset"
                label="Cancel"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useNewsStore } from "src/stores/news-store";
const cards_data = [
  {
    photos: [
      { path: "https://placeimg.com/500/300/nature?t=" + Math.random() },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Title 1",
  },
];

export default defineComponent({
  /* eslint-disable */
  name: "News",
  setup() {
    const showDialog = ref(false);
    const photos = ref([]);
    const imageUrl = ref([]);
    const title = ref("");
    const news = ref([]);
    const loading = ref(false);
    const visible = ref(false);
    const description = ref("");
    const short_desc = ref("");
    const router = useRouter();

    const type = ref("All");
    const page = ref(1);
    const currentPage = ref(1);
    const nextPage = ref(null);
    const totalPages = ref(4);

    const store=useNewsStore();
    onMounted(async () => {

      try {
        Loading.show();
        visible.value = true;
        const response = await api.get("/news");
        store.setNews(response.data)
     //   console.log('new',store.allNews);

        news.value = response.data;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    });

    const getData = () => {
      if (type.value == "All") {
        return cards_data.value;
      } else {
        return cards_data.value.filter(function (item) {
          return item.type.toLowerCase() == type.value.toLowerCase();
        });
      }
    };


    const getData2 = computed(() => {
      return getData().slice(
        (page.value - 1) * total.value.values,
        (page.value - 1) * totalPages.value + totalPages.value
      );
    });

    const editNews = (id) => {

      store.oneNews=store.allNews.find((n)=>n.id == id)
      router.push("/editNews?id=" + id);
    };
    async function onSubmit() {
      // this.imageUrl = URL.createObjectURL(photo.value);

      loading.value = true;
      try {
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("description", description.value);
        formData.append("short_desc", short_desc.value);

        for (let i = 0; i < photos.value.length; i++) {
          const onePhoto = photos.value[i];
          formData.append("photos[" + i + "]", onePhoto);
        }
        const response = await api.post("/news", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status == 201) {
          news.value.unshift(response.data);
          loading.value = false;
          showDialog.value = false;
          Notify.create({
            message: "News Added Successfully",
            color: "green",
          });
        }

         clearData();
      } catch (error) {
        Notify.create({
          message: "Error While Adding News",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    }

    const fileChanged = () => {
      photos.value.forEach((p) => {
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
      short_desc.value = "";
      photos.value = "";
      imageUrl.value = "";
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

      cards_data,
      type,
      page,
      currentPage,
      nextPage,
      totalPages,
      showDialog,

      title,
      description,
      short_desc,
      photos,
      loading,
      visible,
      news,
      imageUrl,
      onSubmit,
      fileChanged,
      removeImage,
      editNews,
      getData,
      getData2,
    };
  },
});
</script>

<style scoped></style>
