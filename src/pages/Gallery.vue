<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <q-space />
        <q-btn
          v-if="hasPermission('add gallery')"
          icon="add"
          label="Add Gallery"
          class="float-right text-white"
          color="blue"
          to="addGallery"
        />
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
          <div class="text-h6 float-left q-ml-md q-mt-sm">List Of Gallery</div>
          <q-space />
          <q-select
            dense
            outlined
            style="min-width: 200px"
            v-model="category"
            :options="['All', 'Cermony', 'Project', 'Designed', 'Certificate']"
            class="float-right text-white"
            label="Category"
             color="black"

            />
        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-sm">
          <div
            class="col-lg-3 col-sm-12 col-xs-12 col-md-6"
            v-for="(data, index) in getData2"
            :key="index"
          >
            <q-item clickable @click="editGallery(data.id)">
              <q-item-section>
                <q-card
                  style="background-color: white"
                  class="text-white my-box cursor-pointer q-hoverable"
                >
                  <span class="q-focus-helper"></span>
                  <q-img :src="data.path" height="300px">
                    <template v-slot:loading>
                      <div class="text-subtitle1 text-black">
                        <q-circular-progress
                          indeterminate
                          rounded
                          size="40px"
                          color="black"
                          class="q-ma-md"
                        />
                      </div>
                    </template>
                  </q-img>

                  <q-space />
                </q-card>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center" v-if="galleries.length > 0">
        <q-pagination
          v-model="page"
          :min="currentPage"
          :max="Math.ceil(getData().length / perPage)"
          :input="true"
          input-class="text-orange-10"
        >
        </q-pagination>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { Loading, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useRoute, useRouter } from "vue-router";

// const data = [
//   // {
//   //   id:1222,
//   //   path: "https://placeimg.com/500/300/nature?t=" + Math.random(),
//   //   category: "Project",
//   //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   //   title: "Title 1",
//   // }
// ];
export default defineComponent({
  /* eslint-disable */
  name: "Gallery",
  setup() {
    const router = useRouter();
    const editGallery = (id) => {
      // store.oneNews = store.allNews.find((n) => n.id == id);
      router.push("/editGallery?id=" + id);
    };

    function getData() {
      if (category.value == "All") {
        return galleries.value;
      } else {
        let self = this;
        return galleries.value.filter(function (item) {
          return item.category.toLowerCase() == category.value.toLowerCase();
        });
      }
    }

    const getData2 = computed(() => {
      return getData().slice(
        (page.value - 1) * perPage.value,
        (page.value - 1) * perPage.value + perPage.value
      );
    });

    onMounted(async () => {
      try {
        Loading.show();

        const response = await api.get("/galleries");
        galleries.value = response.data;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    });

    const hasPermission = (sperm) => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("ul", user.role.permissions);
      if (user?.role?.permissions) {
        console.log("ul2", user.role.permissions);

        const perm = user.role?.permissions;
        console.log("ul3", user.role.permissions);

        return perm?.some((p) => p.title.toLowerCase() == sperm);
      }
    };

    const galleries = ref([]);
    const category = ref("All");
    const page = ref(1);
    const currentPage = ref(1);
    const card = ref(false);
    const nextPage = ref(null);
    const perPage = ref(10);
    return {
      card,
      galleries,
      category,
      page,
      currentPage,
      nextPage,
      perPage,
      hasPermission,
      onMounted,
      getData2,
      getData,
      editGallery,
    };
  },
});
</script>

<style scoped></style>
