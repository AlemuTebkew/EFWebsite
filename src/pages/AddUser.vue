<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-between">
            <div class="">
              <div class="text-h6">Add User Profile</div>
              <div class="text-subtitle2">Complete your profile</div>
            </div>
          </q-card-section>

          <q-form @submit="onSubmit()">
            <q-card-section class="q-pa-sm">
              <q-list class="row">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section side>
                    <q-avatar size="100px">
                      <img
                        :src="
                          this.url ||
                          'https://cdn.quasar.dev/img/boy-avatar.png'
                        "
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section side rounded>
                    <q-file
                      v-model="photo"
                      @update:model-value="onFileChange()"
                      label="Upload Profile"
                      class="bg-blue text-center text-white q-p-none"
                      rounded
                      filled
                    ></q-file>
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="user_details.f_name"
                      label="First Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="user_details.l_name"
                      label="Last Name"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="user_details.phone_no"
                      label="Phone Number"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="user_details.email"
                      label="Email Address"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                    v-model="user_details.role_id"
                      :options="roles"
                      option-value="id"
                      option-label="title"
                      dark
                      color="white"
                      dense
                      emit-value
                      map-options
                      label="Role"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                :loading="loading"
                class="text-capitalize bg-info text-white"
                type="submit"
                >Save User Info</q-btn
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
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/user-login-store";
export default defineComponent({
  name: "AddUser",

  setup() {
    const user_details = ref({
      empId: "",
      f_name: "",
      l_name: "",
      phone_no: "",
      email: "",

      role_id: "",
    });
    const loading = ref(false);
    const url = ref("");
    const photo = ref("");
    const router = useRouter();
    const $q = useQuasar();

    const userStore = useAuthStore();

    const roles = userStore.getRoles;
    function onFileChange() {
      console.log("eeee", user_details.value);
      url.value = URL.createObjectURL(photo.value);
    }

    async function onSubmit() {
      loading.value = true;

      const formData = new FormData();
      Object.keys(user_details.value).forEach((key) =>
        formData.append(key, user_details.value[key])
      );
      formData.append("photo", photo.value);

      // console.log("formData", formData);
      loading.value = true;
      try {
        const response = await api.post("/users", formData, {
          // headers: { "Content-Type": "multipart/form-data" },
        });
        $q.notify({ color: "green", message: "Successfully Registerd" });
        router.push("/User");
      } catch (error) {
        $q.notify({ color: "red", message: "Error While Registering" });
      } finally {
        loading.value = false;
      }
    }
    return {
      user_details,
      url,
      photo,
      onFileChange,
      onSubmit,
      loading,
      roles,
    };
  },
  methods: {},
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
