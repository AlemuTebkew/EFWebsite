<template>
  <q-page class="q-pa-lg q-ma-lg">
    <q-card class="tabel-bg">
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>View</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Add</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Update</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Delete</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-option-group
                v-model="selected"
                :options="
                  filtered.filter((ff) =>
                    ff.label.toLowerCase().includes('view') ||  ff.label.toLowerCase().includes('dashboard')
                  )
                "
                color="green"
                type="checkbox"

              />
            </q-item-section>

            <q-item-section>
              <q-option-group
                v-model="selected"
                :options="
                  filtered.filter((ff) =>
                    ff.label.toLowerCase().includes('add')
                  )
                "
                color="green"
                type="checkbox"

              />
            </q-item-section>
            <q-item-section>
              <q-option-group
                v-model="selected"
                :options="
                  filtered.filter((ff) =>
                    ff.label.toLowerCase().includes('update')
                  )
                "
                color="green"
                type="checkbox"
                inline
              />
            </q-item-section>
            <q-item-section>
              <q-option-group
                v-model="selected"
                :options="
                  filtered.filter((ff) =>
                    ff.label.toLowerCase().includes('delete')
                  )
                "
                color="green"
                type="checkbox"
                
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section>
        <q-btn
          label="Save Permission"
          @click="save()"
          :loading="loading"
          color="blue"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref, setup } from "vue";
import { useAuthStore } from "src/stores/user-login-store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { Loading, Notify } from "quasar";
export default defineComponent({
  name: "Permission",
  setup() {
    const authstore = useAuthStore();

    const { roles, permissions } = storeToRefs(authstore);

    const route = useRoute();
    const rolePermissions = ref([]);
    const selected = ref([]);
    const loading = ref(false);

    const save = async () => {
      const tosave = selected.value.map((s) => {
        return {
          role_id: route.query.id,
          permission_id: s,
        };
      });

      try {
        loading.value = true;

        const re = await api.post("/assign/" + route.query.id, tosave);

        if (re.status == 200) {
          Notify.create({
            message: "Assigned Successfully",
            type: "positive",
          });
        }
        console.log(tosave);
      } catch (error) {
      } finally {
        loading.value = false;
      }
    };
    const fetch = async () => {
      try {
        Loading.show();
        const re = await api.get("/roles/" + route.query.id);

        if (re.status == 200) {
          rolePermissions.value = re.data.permissions;

          selected.value = rolePermissions.value.map((rp) => rp.id);
        }
        console.log(re.data);
      } catch (error) {
        console.log(error);
      } finally {
        Loading.hide();
      }
    };
    fetch();
    const filtered = computed(() => {
      return permissions.value.map((p) => {
        return {
          label: p.title,
          value: p.id,
        };
      });
    });

    return {
      roles,
      permissions,
      filtered,
      save,
      fetch,
      rolePermissions,
      selected,
      loading
    };
  },
});
</script>
