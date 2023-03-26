<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-between">
            <div class="">
              <div class="text-h6">Edit Team Profile</div>
              <div class="text-subtitle2">Complete profile</div>
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
                      v-model="user_details.m_name"
                      label="Middle Name"
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
                      dark
                      color="white"
                      dense
                      v-model="user_details.gender"
                      label="Gender"
                      :options="['Male', 'Female']"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select
                      :options="services"
                      dark
                      map-options
                      emit-value
                      option-label="title"
                      option-value="id"
                      color="white"
                      dense
                      v-model="user_details.department_id"
                      label="Department"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="user_details.profession"
                      label="Profession"
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
                      v-model="user_details.quote"
                      label="Quote"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dark
                      color="white"
                      dense
                      v-model="user_details.empId"
                      label="Employee Id"
                    />
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-toggle
                      :model-value="user_details.is_active"
                      @update:model-value="toggleActive()"
                      label="Featured"
                      color="blue"
                      dense
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
                >Save Team Info</q-btn
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
import { useQuasar, Loading } from "quasar";
export default defineComponent({
  name: "AddTeam",

  setup() {
    const user_details = ref({
      empId: "",
      f_name: "",
      m_name: "",
      l_name: "",
      phone_no: "",
      email: "",
      profession: "",
      gender: "",
      empId: "",
      department_id: "",
      quote: "",
      is_active: false,
    });
    const loading = ref(false);
    const url = ref("");
    const photo = ref("");
    const services = ref([]);
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    function onFileChange() {
      console.log("eeee", user_details.value);
      url.value = URL.createObjectURL(photo.value);
    }

    async function onSubmit() {
      loading.value = true;

      const formData = new FormData();

      
      Object.keys(user_details.value).forEach((key) => {
        if (key === "is_active") {
          formData.append(key, user_details.value[key] ? 1 : 0);
        } else {
          formData.append(key, user_details.value[key]);
        }
      });

      if (photo.value) formData.append("photo", photo.value);

      // console.log("formData", formData);
      loading.value = true;
      try {
        const response = await api.post(
          "/teams/" + route.query.id + "?_method=PUT",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        $q.notify({ color: "green", message: "Successfully updated" });
        router.push("/team");
      } catch (error) {
        $q.notify({ color: "red", message: "Error While updating" });
      } finally {
        loading.value = false;
      }
    }

    const fetchServices = async () => {
      try {
        Loading.show();
        console.log("res", "response.data");
        const response = await api.get("/services");
        const res = await api.get("/teams/" + route.query.id);
        // this.showDialog = false;
        user_details.value.f_name = res.data.f_name;
        user_details.value.l_name = res.data.l_name;
        user_details.value.m_name = res.data.m_name;
        user_details.value.email = res.data.email;
        user_details.value.phone_no = res.data.phone_no;
        user_details.value.profession = res.data.profession;
        user_details.value.empId = res.data.empId;
        user_details.value.gender = res.data.gender;
        user_details.value.department_id = res.data.department_id;
        user_details.value.quote = res.data.quote;
        user_details.value.is_active = res.data.is_active ? true : false;
        // photo.value=res.data.photo
        url.value = res.data.photo;
        services.value = response.data;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };

    fetchServices();
    const toggleActive = () => {
      user_details.value.is_active = !user_details.value.is_active
        ? true
        : false;
    };
    return {
      fetchServices,
      toggleActive,
      user_details,
      services,
      url,
      photo,
      onFileChange,
      onSubmit,
      loading,
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
