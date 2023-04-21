<template>
  <q-card class="no-shadow q-ma-sm" bordered>
    <q-card-section class="q-mb-lg">
      <div class="text-h6 text-white">
        <q-space />
        <q-btn
        v-if="hasPermision('add service')"
          label="Add New Service"
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
        <div>Service Lists</div>
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="services"
        :columns="columns"
        row-key="services.id"
        dense
        bordered
        square
        v-model:selected="selected"
      >
        <template v-slot:body-cell-Icon="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <!-- <q-avatar> -->
                <img :src="props.row.icon" width="100" height="100" />
                <!-- </q-avatar> -->
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Photo="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <!-- <q-avatar> -->
                <img :src="props.row.photo" width="100" height="100" />
                <!-- </q-avatar> -->
              </q-item-section>
            </q-item>
          </q-td>
        </template>

        <template v-slot:body-cell-Title="props">
          <q-td :props="props" style="white-space: normal">
            <q-item>
              <q-item-section class="text-wrap">
                <span v-html="props.row.title"></span>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
            v-if="hasPermision('update service')"
              icon="remove_red_eye"
              size="sm"
              flat
              dense
              @click="editService(props.row.id)"
            />
            <!-- <q-btn
            v-if="hasPermision('delete service')"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="deleteService(props.row.id)"
            /> -->
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog" persistent>
    <q-card class="" style="width: 600px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Add New Service</q-item-label>
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
            label="Service Name *"
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
        
          />
          <q-editor dense v-model="description" min-height="5rem" class="" :toolbar="[
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
      }"/>
          <q-file
          dense
            accept=".jpg, image/*"
            color="teal"
            filled
            v-model="icon"
            label="Upload Icon"
            :rules="[
              (val) => (val) || 'Please Select something',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
          <q-file
            accept=".jpg, image/*"
            color="teal"
            filled
            dense
            v-model="photo"
            label="Upload Photo"
            @update:model-value="fileChanged"
            :rules="[
              (val) => (val) || 'Please Select something',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
          <div class="row" v-if="imageUrl">
            <div class="col-12">
              <q-img
                :src="imageUrl"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
              <q-btn color="red" icon="cancel" @click="removeImage"></q-btn>
            </div>
          </div>
          <q-separator />
          <div class="row q-gutter-md">
            <q-btn
              label="Save Service"
              :loading="loading"
              type="submit"
              color="primary"
              no-caps
            />

            <q-btn v-close-popup color="primary" type="reset" label="Cancel" no-caps/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="" style="width: 600px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Edit Service</q-item-label>
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <q-form
          @submit="onEditSubmit"
          @reset="onReset"
          class="q-gutter-md"
          autocomplete="on"
        >
          <q-input
          dense
            autocomplete
            outlined
            v-model="title"
            label="Service Name *"
            maxlength="70"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              (val) => val.length < 70 || 'max length 70',
            ]"
          />
          <q-editor dense v-model="description" min-height="5rem" class="" />

          <q-file
          dense
            accept=".jpg, image/*"
            color="teal"
            filled
            v-model="icon"
            label="Upload Icon"
            :rules="[
              (val) => (val) || 'Please Select something',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
          <q-file
          dense
            accept=".jpg, image/*"
            color="teal"
            filled
            v-model="photo"
            label="Upload Photo"
            @update:model-value="fileChanged"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
          <div class="row" v-if="imageUrl">
            <div class="col-12">
              <q-img
                :src="imageUrl"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
              />
              <q-btn color="red" icon="cancel" @click="removeImage"></q-btn>
            </div>
          </div>
          <q-separator />
          <div class="row q-gutter-md">
            <q-btn
              label="Save Service"
              :loading="loading"
              type="submit"
              color="primary"
            />

            <q-btn v-close-popup color="primary" type="reset" label="Cancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref, onMounted } from "vue";
import { Loading, Notify } from "quasar";
import { useRouter } from "vue-router";

const columns = [
  // {
  //   name: "Id",
  //   label: "Id",
  //   field: "id",
  //   sortable: true,
  //   align: "left",
  // },
  {
    name: "Title",
    label: "Title",
    field: "title",
    sortable: true,
    align: "left",
  },

  {
    name: "Icon",
    label: "Icon",
    field: "icon",
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
    name: "Action",
    label: "Action",
    field: "Action",
    sortable: false,
    align: "center",
  },
];

export default defineComponent({
  name: "Service",

  setup() {
    const icon = ref("");
    const photo = ref("");
    const imageUrl = ref("");
    const title = ref("");
    const id = ref("");
    const selected = ref([]);
    const loading = ref(false);
    const description = ref("");
    const short_desc = ref("");
    const showDialog = ref(false);
    const showEditDialog = ref(false);
    const services = ref([]);

    const router=useRouter()

    onMounted(async () => {
      try {
        Loading.show();
        const response = await api.get("/services");

        if (response.status ==200) {
        services.value=response.data;
        }

      } catch (error) {
      } finally {
        Loading.hide();
      }
    });

    const fileChanged = () => {
      imageUrl.value = URL.createObjectURL(photo.value);
    };

    const removeImage = () => {
      imageUrl.value = null;
      photo.value = null;
    };
    const clearData = () => {
      title.value = "";
      description.value = "";
      photo.value = "";
      imageUrl.value = "";
    };

    const deleteService = async (id) => {
      const index = services.value.findIndex((pro) => pro.id == id);
      try {
        const response = await api.delete("/services/" + id);
        if (response.status == 200) {
          services.value.splice(index, 1);
        }
      } catch (error) {}
    };
    const editService = (id) => {

      // store.oneNews = store.allNews.find((n) => n.id == id);
      router.push("/editService?id=" + id);

      // const index = services.value.findIndex((ser) => ser.id == id);

      // const service = services.value[index];

      // // id.value = service.id;
      // title.value = service.title;
      // description.value = service.description;
      // short_desc.value = service.short_desc;
      // photo.value = service.photo;
      // imageUrl.value=service.photo
      // showEditDialog.value = true;
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
      services,
      columns,
      showDialog,
      showEditDialog,
      id,
      selected,
      title,
      description,
      short_desc,
      photo,
      icon,
      loading,
      imageUrl,
      onSubmit,
      // onEditSubmit,
      // editService,
      onMounted,
      fileChanged,
      removeImage,
      deleteService,
      editService,
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
        formData.append("description", description.value);
        formData.append("short_desc", short_desc.value);
        formData.append("icon", icon.value);
        formData.append("photo", photo.value);
        const response = await api.post("/services", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status ==201) {
          services.value.unshift(response.data);
        showDialog.value = false;
        Notify.create({
          message: "Service Added Successfully",
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
    async function onEditSubmit() {
      // this.imageUrl = URL.createObjectURL(photo.value);
      loading.value = true;
      try {
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("description", description.value);
        formData.append("short_desc", short_desc.value);
        formData.append("icon", icon.value);
        formData.append("photo", photo.value);
        const response = await api.post("/services", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        services.value.unshift(response.data);
        showDialog.value = false;
        Notify.create({
          message: "Project Added Successfully",
          color: "green",
        });

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


  },
});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
