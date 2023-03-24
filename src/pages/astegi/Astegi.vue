<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-lg">
        <div
          class="row q-col-gutter-sm justify-center items-right q-lg-mx-xl"
          style=""
        >
          <div
            class="col-lg-12 col-md-12 col-xs-12 col-sm-12 q-lg-px-xl q-lg-mx-xl"
          >
            <q-card class="card-bg text-white" bordered>
              <q-card-section class="text-h6 row justify-between">
                <div class="">
                  <div class="text-h6">አስጠጊ መዝግብ</div>
                </div>
              </q-card-section>

              <q-form @submit="onSubmit()">
                <q-card-section class="q-lg-ma-xl">
                  <q-list class="row">
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input
                          dark
                          outlined
                          color="white"
                          dense
                          v-model="user_details.f_name"
                          label="ስም"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
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
                          outlined
                          v-model="user_details.m_name"
                          label="የ አባት ስም"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
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
                          outlined
                          v-model="user_details.l_name"
                          label="የ አያት ስም"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
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
                          label="ስልክ ቁጥር"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
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
                          label="የ ኢሜል አድራሻ"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input
                          dark
                          outlined
                          color="white"
                          dense
                          type="number"
                          v-model="user_details.dob"
                          label="የሚረዱት አቅም"
                        >
                        </q-input>
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-input
                          dark
                          color="white"
                          dense
                          outlined
                          type="textarea"
                          v-model="user_details.gender"
                          label="ተጨማሪ"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        />
                      </q-item-section>
                    </q-item>

                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-select
                          :options="[
                            'መጠለያ',
                            'ምግብ',
                            'ስራ',
                            'ብር(ገንዘብ)',
                            'ሙሉ ወጭ',
                            'ሌላ',
                          ]"
                          dark
                          color="white"
                          dense
                          v-model="user_details.department_id"
                          label="የሚሰጡት የእርዳታ አይነት"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>

                <q-card-section>
                  <hr style="width: 80%" />
                  <q-item-label class="q-px-xl text-center" style="width: ;">የአድራሻ መረጃ መሙያ</q-item-label>

                  <hr style="width: 80%" />
                </q-card-section>

                <q-card-section class="q-lg-ma-xl" style="">
                  <q-list class="row">
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-select
                          :options="['ትግራይ', 'አፋር', 'አማራ', 'ኦሮሚያ', 'ደቡብ', 'ሌላ']"
                          dark
                          color="white"
                          dense
                          v-model="user_details.department_id"
                          label="ክልል"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-select
                          :options="['ትግራይ', 'አፋር', 'አማራ', 'ኦሮሚያ', 'ደቡብ', 'ሌላ']"
                          dark
                          color="white"
                          dense
                          v-model="user_details.department_id"
                          label="ዞን"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-select
                          :options="['ትግራይ', 'አፋር', 'አማራ', 'ኦሮሚያ', 'ደቡብ', 'ሌላ']"
                          dark
                          color="white"
                          dense
                          v-model="user_details.department_id"
                          label="ወረዳ"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <q-item-section>
                        <q-select
                          :options="['ትግራይ', 'አፋር', 'አማራ', 'ኦሮሚያ', 'ደቡብ', 'ሌላ']"
                          dark
                          color="white"
                          dense
                          v-model="user_details.department_id"
                          label="ቀበሌ"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
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
                          outlined
                          type="textarea"
                          v-model="user_details.gender"
                          label="ተጨማሪ"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Please type something',
                          ]"
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
                    >መዝግብ</q-btn
                  >
                  <q-btn
                    class="text-capitalize bg-info text-white"
                    @click="$router.back"
                    >ሰርዝ</q-btn
                  >
                </q-card-actions>
              </q-form>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
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
      dob: new Date().toISOString(),
      city: "",
      empId: "",
      department_id: "",
    });
    const loading = ref(false);
    const url = ref("");
    const photo = ref("");
    const router = useRouter();
    const $q = useQuasar();

    function onFileChange() {
      console.log("eeee", user_details.value);
      url.value = URL.createObjectURL(photo.value);
    }

    async function onSubmit() {
      loading.value = true;
      const data = {
        title: this.title,
      };

      const formData = new FormData();
      Object.keys(user_details.value).forEach((key) =>
        formData.append(key, user_details.value[key])
      );
      console.log("ddd", photo.value);
      formData.append("photo", photo.value);

      // console.log("formData", formData);
      loading.value = true;
      try {
        const response = await api.post("/teams", formData, {
          // headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("res", response.data);
        $q.notify({ color: "green", message: "Successfully Registerd" });
        router.push("/team");
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
