<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <q-space />
        <q-btn
          icon="add"
          label="Add Client/Partner"
          color="blue"
          class="float-right text-white bg-primary"
          @click="showDialog = true"
        />
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
          <div class="text-h6 float-left q-ml-md q-mt-sm">
            List Of Clients And Partners
          </div>
          <q-space />
          <q-select
            dense
            outlined
            style="min-width: 200px"
            v-model="type"
            :options="['Client', 'Partner']"
            class="float-right"
            label="Category"
          />

        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-sm">
          <div
            class="col-lg-3 col-sm-12 col-xs-12 col-md-3"
            v-for="(data, index) in getData2"
            :key="index"
          >
            <q-card
              style="background-color: #292845"
              v-ripple
              class="text-white my-box cursor-pointer q-hoverable"
            >
              <span class="q-focus-helper"></span>
              <q-img :src="data.img" rounded>
                <template v-slot:loading>
                  <div class="text-subtitle1 text-white">Loading...</div>
                </template>
              </q-img>

              <q-card-section class="text-h6 text-center q-pa-none">{{
                data.title
              }}</q-card-section>
            </q-card>
          </div>
        </div>
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
            <q-select
              outlined
              v-model="type"
              label="Select Client|Partner *"
              :options="['Client', 'Partner']"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please select something',
              ]"
            />
            <q-input
              autocomplete
              outlined
              v-model="title"
              label="Client |Partner Name *"
              maxlength="70"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
                (val) => val.length < 70 || 'max length 70',
              ]"
            />

            <q-file
              accept=".jpg, image/*"
              color="teal"
              outlined
              v-model="photo"
              label="Upload Logo"
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
                label="Save Project"
                :loading="loading"
                type="submit"
                color="primary"
              />

              <q-btn
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
import { defineComponent } from "vue";
import { ref } from "vue";

const cards_data = [
  {
    img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
    type: "Client",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Minstry Of Health",
  },
  {
    img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
    type: "Client",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Gondar University",
  },
  {
    img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
    type: "Partner",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Addis Ababa University",
  },
  {
    img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
    type: "free",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Title 4",
  },
  {
    img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
    type: "Partner",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Title 5",
  },
  {
    img: "https://placeimg.com/500/300/nature?t=" + Math.random(),
    type: "free",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "Title 6",
  },
];
export default defineComponent({
  /* eslint-disable */
  name: "Client",
  setup() {
    const showDialog = ref(false);

    const title=ref('')
    const type=ref('')
    const photo=ref('')


        const getData2 = computed(() => {
      return getData().slice(
        (page.value - 1) * total.value.values,
        (page.value - 1) * totalPages.value + totalPages.value
      );
    });
    return {
      cards_data,
      type,
      title,
      photo,
      page: ref(1),
      currentPage: ref(1),
      nextPage: ref(null),
      totalPages: ref(4),

      showDialog,
    };
  },
  methods: {
    getData() {
      if (this.type == "All") {
        return cards_data;
      } else {
        let self = this;
        return this.cards_data.filter(function (item) {
          return item.type.toLowerCase() == self.type.toLowerCase();
        });
      }
    },
  },
  computed: {
    getData2() {
      return cards_data;
      return this.getData().slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
  },
});
</script>

<style scoped></style>
