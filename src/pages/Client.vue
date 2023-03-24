<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <q-space />
        <q-btn
          icon="add"
          label="Add Client|Partner"
          class="float-right text-white"
          color="blue"
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
            v-model="category"
            :options="['All', 'Client', 'Partner']"
            class="float-right"
            label="Category"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-sm">
          <div
            class="col-lg-3 col-sm-12 col-xs-12 col-md-4"
            v-for="(data, index) in getData2"
            :key="index"
          >
            <q-item clickable >
              <q-item-section>
                <q-card
                  style="background-color: #292845;"
                  class="text-white cont"
                >
                  <q-card-section class="text-h6 text-center q-pa-none ">
                    <q-img  :src="data.logo" height="200px" width="350" style="position:relative"> </q-img>

                    {{ data.title }}
                  </q-card-section>
                  <q-btn
                   class="bbtn"
                    icon="cancel"
                    color="red"
                    @click="confirmDelete(data.id)"
                    style="position: absolute;top:0;right: 0;"
                  />
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

    <q-dialog v-model="showDialog" persistent>
      <q-card class="" style="width: 600px; min-height: 300px">
        <q-card-section>
          <q-item-label class="q-mb-lg text-h6"
            >Add New Client|Partner</q-item-label
          >
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
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>

            <q-separator />

            <div class="row q-gutter-md">
              <q-btn
                label="Save client|partner"
                :loading="loading"
                type="submit"
                color="primary"
                no-caps
              />

              <q-btn
                v-close-popup
                color="primary"
                type="reset"
                label="Cancel"
                no-caps
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { Loading, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  /* eslint-disable */
  name: "Gallery",
  setup() {

    const $q=useQuasar()
    const showDialog = ref(false);
    const loading = ref(false);

    const title = ref("");
    const type = ref("");
    const photo = ref("");
    const clients = ref([]);

    const router = useRouter();


    function getData() {
      if (category.value == "All") {
        return clients.value;
      } else {
        return clients.value.filter(function (item) {
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

    const fetch = async () => {
      try {
        Loading.show();

        const response = await api.get("/clients");
        clients.value = response.data;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };

    fetch();

    const galleries = ref([]);
    const category = ref("All");
    const page = ref(1);
    const currentPage = ref(1);
    const card = ref(false);
    const nextPage = ref(null);
    const perPage = ref(10);

    async function onSubmit() {
      // this.imageUrl = URL.createObjectURL(photo.value);

      loading.value = true;
      try {
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("category", type.value);
        formData.append("logo", photo.value);
        const response = await api.post("/clients", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status == 201) {
          clients.value.unshift(response.data);
          showDialog.value = false;
          Notify.create({
            message: "Client Added Successfully",
            color: "green",
          });
        }

        clearData();
      } catch (error) {
        Notify.create({
          message: "Error While Saving",
          color: "red",
        });
      } finally {
        loading.value = false;
      }
    }

    const confirmDelete = (id) => {
      $q.dialog({
        title: "Confirm",
        message: "Are You Sure to Delete ?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          console.log(">>>> OK");
          deleteClient(id);
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
    const deleteClient = async (id) => {
      Loading.show();
      try {
        const response = await api.delete("/clients/" + id);
        if (response.status == 200) {
          // newsStore.deleteGallery(id);
          Notify.create({
            message: "Client Deleted Successfully",
            color: "green",
          });
          const index = clients.value.findIndex((c) => c.id === id);
          clients.value.splice(index, 1);
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error While Deleting Client",
          color: "red",
        });
        Loading.hide();
      } finally {
        loading.value = false;
        Loading.hide();
      }
    };
    return {
      card,
      galleries,
      deleteClient,
      confirmDelete,
      category,
      page,
      currentPage,
      nextPage,
      perPage,
      onMounted,
      getData2,
      getData,
      onSubmit,
      type,
      title,
      photo,
      showDialog,
      clients,
      loading,
      fetch,
    };
  },
});
</script>

<style scoped>
 .bbtn{
  opacity: 0;
}
.cont:hover  .bbtn{
  opacity: 1;
}
</style>
