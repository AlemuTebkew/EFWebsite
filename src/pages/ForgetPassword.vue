<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
    <div class="row q-col-gutter-sm justify-center items-center">

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white no-shadow" bordered>
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">

            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> New Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dark
                  dense
                  outlined
                  color="white"
                  round
                  v-model="password_dict.new_password"
                  label="New Password"
                  @update:model-value="updateNew()"
                  :rules="[
                (val) => (!!val) || 'Please type something',
              ]"
                />
                <span class="text-red">{{ error.new }}</span>

              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Confirm New Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dark
                  dense
                  outlined
                  round
                  color="white"
                  v-model="password_dict.confirm_password"
                  label="Confirm New Password"
                  @update:model-value="updateConfirm()"

                  :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"

                />
                <span class="text-red">{{ error.confirm }}</span>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              :loading="ploading"
              class="text-capitalize bg-info text-white"
              @click="updatePassword()"
              label="Change Password"
              type="submit"
              />

          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useAuthStore } from "src/stores/user-login-store";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: "UserProfile",
  setup() {
    const authStore = useAuthStore();
    const user = ref({});
    const route=useRoute()
    const router=useRouter()

    const ploading = ref(false);

    const password_dict = ref({
      new_password: "",
      confirm_password: "",
    });

    const error=ref({
      new:'',
      confirm:''
    })

    const updateNew=()=>{
      error.value.new=''
    }

    const updateConfirm=()=>{
      error.value.confirm=''
    }





    const updatePassword = async() => {
      try {


        if(!password_dict.value.new_password){
          error.value.new='new password required'
        }
        if(!password_dict.value.confirm_password){
          error.value.confirm='confirm password required'
        }
        if(! (password_dict.value.confirm_password === password_dict.value.new_password)){
          error.value.confirm='passsword did not much'
        }

        if( error.value.new || error.value.confirm){
          return
        }
        ploading.value = true;



        const response = await api.post(
          "/reset/" + route.params.token,
          {password:password_dict.value.new_password}
        );
        if (response.status == 200) {
          Notify.create({ message: "Password Reset", color: "green" });
          router.push('/login')
        }
      } catch (error) {
        Notify.create({ message: "Error During Reset", color: "red" });

      } finally {
        ploading.value = false;
      }
    };


    return {
      password_dict,
      updatePassword,

      ploading,
      error,
      updateNew,
      updateConfirm,
    };
  },
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
