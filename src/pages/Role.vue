<template>
  <q-card class="no-shadow q-ma-sm" bordered>
    <q-card-section class="q-mb-lg">
      <div class="text-h6 text-white">
        <q-space />
        <q-btn
          v-if="hasPermission('add role')"
          label="Add New Role"
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
        <div>List of Roles</div>
      </div>
    </q-card-section>
    <q-separator color="white" />
    <q-card-section class="q-pa-none">
      <q-table
        dark
        class="table-bg"
        :rows="roles"
        :columns="columns"
        :row-key="roles.id"
      >
        <template v-slot:body-cell-Permission="props">
          <q-td :props="props">
            <q-item style="width: 50px">
              <q-item-section>
                <q-btn
                v-if="hasPermission('view permission')"

                  label="Permissions"
                  color="blue"
                  :to="'/permission?id=' + props.row.id"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              v-if="hasPermission('update role')"
              icon="edit"
              size="sm"
              flat
              dense
              @click="
                (showEditDialog = true),
                  (title = props.row.title),
                  (id = props.row.id)
              "
            />
            <q-btn
              v-if="hasPermission('delete role')"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="confirmDelete(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog" persistent>
    <q-card class="" style="width: 400px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Add New Role</q-item-label>
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
            label="Role Name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Role"
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
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="" style="width: 400px; min-height: 300px">
      <q-card-section>
        <q-item-label class="q-mb-lg text-h6">Edit Role</q-item-label>
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
            label="Role Name *"
            dense
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-separator />

          <div class="row q-gutter-md">
            <q-btn
              label="Save Role"
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
</template>

<script>
import { api } from "boot/axios";
import { Loading, useQuasar } from "quasar";
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
    name: "Permission",
    label: "Permissions",
    field: "permission",
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
  name: "Role",
  setup() {
    const $q = useQuasar();
    const title = ref("");
    const id = ref("");
    const roles = ref([]);
    const showDialog = ref(false);
    const showEditDialog = ref(false);
    const loading = ref(false);

    const fetchRoles = async () => {
      try {
        Loading.show();
        const res = await api.get("/roles");

        if (res.status == 200) {
          roles.value = res.data;
        }
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    fetchRoles();
    async function onSubmit() {
      // e.preventDefault()
      const data = {
        title: title.value,
      };
      loading.value = true;
      try {
        const response = await api.post("/roles", data);
        if (response.status == 201) {
          roles.value.push(response.data);
          showDialog.value = false;
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
        const response = await api.put("/roles/" + id.value, data);

        const index = roles.value.findIndex((role) => role.id == id.value);
        roles.value[index] = response.data;
        console.log(response.data);

        showEditDialog.value = false;
        title.value = "";
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
          deleteRole(id);
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

    async function deleteRole(id) {
      Loading.show();
      const index = roles.value.findIndex((role) => role.id == id);
      try {
        const response = await api.delete("/roles/" + id);

        if (response.status == 200) {
          roles.value.splice(index, 1);
        }
      } catch (error) {
      } finally {
        Loading.hide();
      }
    }

    const hasPermission = (sperm) => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("ul", user.role.permissions);
      if (user?.role?.permissions) {
        console.log("ul2", user.role.permissions);

        const perm = user.role?.permissions;
        console.log("ul3", user.role.permissions);

        return perm?.some((p) => p.title.toLowerCase() == sperm);
      }
    }
    return {
      hasPermission,
      columns,
      showDialog,
      showEditDialog,
      title,
      id,
      loading,
      confirmDelete,
      roles,
      onSubmit,
      fetchRoles,
      onEditSubmit,
    };
  },
});
</script>

<style>
.table-bg {
  background-color: #162b4d;
}
</style>
