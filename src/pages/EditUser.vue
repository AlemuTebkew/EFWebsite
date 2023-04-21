<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-between">
            <div class="row">
              <div v-if="editable" class="text-h6">Edit User Profile</div>
              <div v-else class="text-h62">View your profile</div>
              <div>
                <q-btn icon="edit" @click="editable = !editable"></q-btn>
              </div>
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
                          url || 'https://cdn.quasar.dev/img/boy-avatar.png'
                        "
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section v-if="editable" side rounded>
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
                      :disable="!editable"
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
                      :disable="!editable"
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
                      :disable="!editable"
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
                      :disable="!editable"
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
                      :disable="!editable"
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
                      lazy-rules
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-toggle
                    :disable="!editable"

                      :model-value="user_details.is_active"
                      @update:model-value="toggleActive()"
                      label="Active"
                      dense
                      color="blue"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions v-if="editable" align="right">
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
import { useRouter, useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { Loading, useQuasar } from "quasar";
import { useAuthStore } from "stores/user-login-store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "AddUser",

  setup() {
    const user_details = ref({
      id: "",
      f_name: "",
      l_name: "",
      phone_no: "",
      email: "",
      role_id: "",
      is_active: false,

    });
    const loading = ref(false);
    const editable = ref(false);
    const url = ref("");
    const photo = ref("");
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    const userStore = useAuthStore();

    const { roles } = storeToRefs(userStore);

    const fetchUser = async () => {


      Loading.show();
      try {
             const resp = await api.get("/users/" + route.query.id);

      const user = resp.data;
      console.log("user", user);
      user_details.value.f_name = user.f_name;
      user_details.value.l_name = user.l_name;
      user_details.value.phone_no = user.phone_no;
      user_details.value.email = user.email;
      user_details.value.role_id = resp.data.role.id;
      // user_details.value.photo = user.photo;
      url.value = user.photo;
      user_details.value.is_active = user.is_active ==1 ? true : false;
 
      } catch (error) {
        
      }finally{
        Loading.hide()
      }

    };
    fetchUser();
    function onFileChange() {
      console.log("eeee", user_details.value);
      url.value = URL.createObjectURL(photo.value);
    }

    async function onSubmit() {
      loading.value = true;

      const formData = new FormData();
      Object.keys(user_details.value).forEach((key) => {
        if (key === "is_active") {
          const keyy = user_details.value[key] ? 1 : 0;
          formData.append(key, keyy);
        }else if(key === "role_id"){

          if(!user_details.value[key]){

            delete user_details.value[key]
          }

        }
         else {
          formData.append(key, user_details.value[key]);
        }
      });
      if (photo.value) formData.append("photo", photo.value);

      // console.log("formData", formData);
      loading.value = true;
      try {
        const response = await api.post(
          "/users/" + route.query.id + "?_method=PUT",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status == 200) {
          $q.notify({ color: "green", message: "Successfully Registerd" });
          router.push("/user");
        }
      } catch (error) {
        $q.notify({ color: "red", message: "Error While Updating" });
      } finally {
        loading.value = false;
      }
    }

    const toggleActive = () => {
      user_details.value.is_active = !user_details.value.is_active
        ? true
        : false;
    };
    return {
      toggleActive,
      user_details,
      url,
      photo,
      onFileChange,
      onSubmit,
      loading,
      editable,
      roles,
      fetchUser,
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
