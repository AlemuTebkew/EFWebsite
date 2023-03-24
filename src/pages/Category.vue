<template>
  <q-card class="no-shadow q-ma-sm" bordered>
    <q-card-section class="q-mb-lg">
      <div class="text-h6 text-white">
        <q-space />
        <q-btn
          label="Add Project category"
          color="blue"
          class="float-right text-capitalize shadow-3"
          icon="add"
          @click="showDialog = true"
        />
      </div>
    </q-card-section>
    <q-separator color="white " />
    <q-card-section class="table-bg">
      <div class="text-h6 text-white row justify-between items-center">
        <div> List of Category</div>
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="categories"
        :columns="columns"
        :row-key="categories.id"
      >

        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense @click="showEditDialog=true, title=props.row.name, id=props.row.id" />
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="confirmDelete(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog" persistent>
    <q-card class="" style="width: 400px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Add New Category</q-item-label>
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
            outlined
            v-model="title"
            label="Category Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Category"
              :loading="loading"
              type="submit"
              color="primary"
              no-caps
            />

            <q-btn no-caps v-close-popup color="primary" type="reset" label="Cancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="" style="width: 400px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Edit Category</q-item-label>
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
            autocomplete
            outlined
            v-model="title"
            label="Category Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Category"
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
import { api } from "boot/axios";
import { Loading, useQuasar, Notify } from 'quasar';
import { defineComponent, ref } from "vue";


const columns = [
  {
    name: "Id",
    label: "Id",
    field: "id",
    sortable: true,
    align: "left",
  },
  {
    name: "Title",
    label: "Title",
    field: "name",
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
  name: "Category",
  setup() {


    const $q=useQuasar()
    const title=ref('');
    const id=ref('');
    const categories=ref([]);
    const showDialog=ref(false);
    const showEditDialog=ref(false);
    const loading=ref(false)


    const fetchRoles=async()=>{

      try {
        Loading.show()
        const res=await api.get("/categories")

        if(res.status ==200){
          categories.value=res.data
        }
      } catch (error) {

      }finally{
        Loading.hide()
      }
    }
    fetchRoles();
    async function onSubmit() {
      // e.preventDefault()
      const data = {
        name: title.value,

      };
      loading.value = true;
      try {
        const response = await api.post("/categories", data);
        if (response.status ==201) {

          categories.value.push(response.data);
          showDialog.value=false;

          Notify.create({message:'Successfully Added',color:'green'})
        }
      } catch (error) {
        Notify.create({message:'Not Added',color:'red'})

      } finally {
        loading.value = false;
      }
    }
    async function onEditSubmit() {
      // e.preventDefault()
      const data = {
        name: title.value,

      };
      loading.value = true;
      try {
        const response = await api.put("/categories/"+id.value, data);

        const index=categories.value.findIndex((role)=>role.id == id.value);
        categories.value[index]=response.data
        console.log(response.data);

        showEditDialog.value=false;
        title.value=''
      } catch (error) {
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
          deleteCategory(id);
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

    async function deleteCategory(id) {

      Loading.show();
      const index=categories.value.findIndex((role)=>role.id == id)
      try {
        const response = await api.delete("/categories/"+id);

        if (response.status ==200) {
           categories.value.splice(index,1)
        }
      } catch (error) {
      } finally {
        Loading.hide()
      }
    }

    return {
      columns,
      showDialog,
      showEditDialog,
      title,
      id,
      loading,
      confirmDelete,
      categories,
      onSubmit,
      fetchRoles,
      onEditSubmit,
      deleteCategory
    };
  },

});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
