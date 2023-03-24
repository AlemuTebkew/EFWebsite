<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-sm justify-center items-center">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white" bordered>
          <q-card-section class="text-h6 row justify-between">
            <div class="">
              <div class="text-h6">Edit Profile</div>
              <div class="text-subtitle2">Complete your profile</div>
            </div>

            <q-card-section align="right">
              <q-btn label="Logout" icon="logout" @click="logout()"></q-btn
            ></q-card-section>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img
                      :src="
                        authUser?.photo
                          ? authUser?.photo
                          : 'https://cdn.quasar.dev/img/boy-avatar.png'
                      "
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section side rounded>
                  <q-file
                    v-model="new_photo"
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
                    v-model="authUser.f_name"
                    label="First Name"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="authUser.l_name"
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
                    v-model="authUser.email"
                    label="Email"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="authUser.phone_no"
                    label="Phone Number"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              :loading="loading"
              class="text-capitalize bg-info text-white"
              @click="updateInfo()"
              label="Update User Info"
              />

          </q-card-actions>
        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12 q-pa-lg">
        <q-card class="card-bg text-white no-shadow" bordered>
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Current Password </q-item-section>
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
                  v-model="password_dict.old_password"
                  label="Current Password"
                  :rules="[val => !!val || 'Field is required']"
                  @update:model-value="updateOld()"


                />
                <span class="text-red">{{ error.old }}</span>

              </q-item-section>
            </q-item>
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
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12" >
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
</template>

<script>
import { storeToRefs } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useAuthStore } from "src/stores/user-login-store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "UserProfile",
  setup() {
    const authStore = useAuthStore();
    const user = ref({});
    const new_photo = ref("");
    const loading = ref(false);
    const ploading = ref(false);

    const usert=JSON.parse(localStorage.getItem('user'))

    authStore.authUser=usert
    const {authUser}=storeToRefs(authStore)
    // const authUser = ref({
    //   id: "",
    //   email: "",
    //   f_name: "",
    //   l_name: "",
    //   phone_no: "",
    //   photo: "",
    // });
    const password_dict = ref({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });

    const error=ref({
      old:'',
      new:'',
      confirm:''
    })

    const updateNew=()=>{
      error.value.new=''
    }
    const updateOld=()=>{
      error.value.old=''
    }
    const updateConfirm=()=>{
      error.value.confirm=''
    }
    function onFileChange() {
      authUser.value.photo = URL.createObjectURL(new_photo.value);
    }


    const updateInfo = async() => {
      const dataU = { ...authUser.value };

      try {
      loading.value=true

        if (new_photo.value) {
          dataU.photo = new_photo;
        }
        delete dataU.photo;
        const formData = new FormData();
        Object.keys(dataU).forEach((key) =>
          formData.append(key, authUser.value[key])
        );

        if (new_photo.value) {
          formData.append("photo", new_photo.value);
        }
        const response =await api.post(
          "/users/" + authUser.value.id + "?_method=PUT",
          formData

        );
        if (response.status == 200) {
          Notify.create({ message: "Profile Updated", color: "green" });
        }
      } catch (error) {
        console.log(error);
        Notify.create({ message: "Error During Update", color: "red" });

      } finally {
        loading.value = false;
      }
    };

    const updatePassword = async() => {
      try {

        if(!password_dict.value.old_password){
          error.value.old='old password required'
        }
        if(!password_dict.value.new_password){
          error.value.new='new password required'
        }
        if(!password_dict.value.confirm_password){
          error.value.confirm='confirm password required'
        }
        if(! (password_dict.value.confirm_password === password_dict.value.new_password)){
          error.value.confirm='passsword did not much'
        }

        if(error.value.old || error.value.new || error.value.confirm){
          return
        }
        ploading.value = true;



        const response = await api.post(
          "/change_password/" + authUser.value.id,
          password_dict.value
        );
        if (response.status == 200) {
          Notify.create({ message: "Password Updated", color: "green" });

        }
      } catch (error) {
        Notify.create({ message: "Error During Update", color: "red" });

      } finally {
        ploading.value = false;
      }
    };
    const logout = () => {
      authStore.logout();
    };

    return {
      authUser,
      password_dict,
      logout,
      user,
      updateInfo,
      updatePassword,
      authStore,
      new_photo,
      onFileChange,
      loading,
      ploading,
      error,
      updateNew,
      updateConfirm,
      updateOld,
    };
  },
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
