<template>
  <q-card class="no-shadow q-ma-sm" bordered>
    <q-card-section class="q-mb-lg">
      <div class="text-h6 text-white">
        <q-space />
        <q-btn
          label="Add Department"
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
        <div> List of Department</div>
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="departments"
        :columns="columns"
        :row-key="departments.id"
      >

        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense @click="showEditDialog=true, title=props.row.title, id=props.row.id" />
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="confirmDelete(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog" persistent>
    <q-card class="" style="width: 400px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Add New Department</q-item-label>
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
            label="Department Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Department"
              :loading="loading"
              type="submit"
              color="primary"
              no-caps
            />

            <q-btn v-close-popup color="primary" type="reset" label="Cancel"                no-caps
/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="" style="width: 400px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Edit Department</q-item-label>
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
            label="Department Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Department"
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
</template>

<script>
import { api } from "boot/axios";
import { Loading,useQuasar } from "quasar";
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
    field: "title",
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
  name: "Department",
  setup() {


    const $q=useQuasar()
    const title=ref('');
    const id=ref('');
    const departments=ref([]);
    const showDialog=ref(false);
    const showEditDialog=ref(false);
    const loading=ref(false)


    const fetchRoles=async()=>{

      try {
        Loading.show()
        const res=await api.get("/departments")

        if(res.status ==200){
          departments.value=res.data
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
        title: title.value,

      };
      loading.value = true;
      try {
        const response = await api.post("/departments", data);
        if (response.status ==201) {

          departments.value.push(response.data);
          showDialog.value=false;

          title.value=''
        }
      } catch (error) {
      } finally {
        loading.value = false;
      }
    }
    async function onEditSubmit() {
      // e.preventDefault()
      const data = {
        title: title.value,

      };
      loading.value = true;
      try {
        const response = await api.put("/departments/"+id.value, data);

        const index=departments.value.findIndex((role)=>role.id == id.value);
        departments.value[index]=response.data
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
          deleteDepartment(id);
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

    async function deleteDepartment(id) {

      Loading.show();
      const index=departments.value.findIndex((role)=>role.id == id)
      try {
        const response = await api.delete("/departments/"+id);

        if (response.status ==200) {
           departments.value.splice(index,1)
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
      departments,
      onSubmit,
      fetchRoles,
      onEditSubmit,
      deleteDepartment
    };
  },

});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
