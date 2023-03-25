<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="
            $q.screen.lt.sm
              ? { width: '80%' }
              : { width: '40%' }
          "
          class="card-bg text-white"
        >
        <q-card-section class="">
            <div class="q-mb-lg q-pb-lg">
              <q-item-label class="absolute-center q-mb-xl text-h6 ellipsis"
                >EF Architect and Engineering Consulting PLC</q-item-label
              >
            </div>
          </q-card-section>
          <q-card-section class="">
            <!-- <q-avatar size="100px" class="q-pa-md bg-blue" > -->
            <div class="text-center ">
              <img class="" src="logo2.png" width="150" />
            </div>

            <!-- </q-avatar> -->
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-form @submit="forgot">
              <q-card-section>
                <q-input
                  v-model="username"
                  label="Email"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please Enter Email',
                    (val)=>(validateEmail(val)) || 'Enter Valid Email'
                  ]"
                  dark
                  color="white"

                  @update:model-value="onEntered()"
                />

                <q-item-label caption :label="error" />
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  label="Send Email"
                  type="submit"
                  color="blue"
                  class="q-mr-lg"
                  :loading="loading"
                  no-caps
                />
                <div class="f-btn" @click="router.push('/login')">
                    <q-item-label>Login</q-item-label>
                </div>
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/user-login-store";
import { storeToRefs } from "pinia";
import { Loading, Notify } from "quasar";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref("");
    const loading = ref(false);

    function validateEmail(email) {
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    }
    const forgot = async (e) => {
      loading.value = true;

      try {
        const response = await api.post("/forgot", {
          email: username.value,
        });

        if(response.status ==200){
              Notify.create({
          message:
            "Password reset Link Sent to Your Email Check and Click The Link",
          color: "green",
          timeout: "100000",
          position: "center",
        });
        }else{
          Notify.create({
          message:
            "Error Your Account Not Exist",
          color: "red",
          timeout: "1000",
          position: "center",
        });
        }

      } catch (error) {
        Notify.create({
          message:
            "Error Your Account Not Exist",
          color: "red",
          timeout: "1000",
          position: "center",
        });
      } finally {
        loading.value = false;
      }
    };
    return {
      username,
      loading,
      forgot,
      authStore,
      validateEmail,
      router,
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
.f-btn{
  border-bottom: 1px solid blue;
  cursor: pointer;
}
.f-btn :hover{
  color: blue;
}
.card-bg {
  background-color: #162b4d;
}
</style>
