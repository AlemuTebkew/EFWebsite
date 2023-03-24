<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '45%' }"
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
              <img class="" src="logo2.png" width="200" />
            </div>

            <!-- </q-avatar> -->
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md" @submit="login()">
              <q-card-section>
                <q-input

                  v-model="username"
                  label="Email"
                  type="email"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please Enter Login Email',
                      (val)=>(validateEmail(val)) || 'Please Enter Valid Email'
                  ]"
                  @update:model-value="onEntered()"
                  dark
                  color="white"

                />
                <q-input
                  type="password"
                  v-model="password"
                  label="Password"
                  @update:model-value="onEntered()"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please Enter Password',
                  ]"
                  color="white"
                  dark
                />
                <span class="text-subtitle5 q-mb-sm q-ms-lg text-red">{{
                  error
                }}</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  style="padding-left: 20px; padding-right: 20px"
                  label=" Login "
                  type="submit"
                  color="blue"
                  class="q-mx-lg"
                  :loading="loading"
                  no-caps
                />
                <div class="f-btn" @click="router.push('/forgot')">
                    <q-item-label>Forgot Password</q-item-label>
                </div>
                <!-- <q-btn class="f-btn" @click="router.push('/forgot')" no-caps flat push>Forgot Password</q-btn> -->
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

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const { loading, error } = storeToRefs(authStore);
    const login = async () => {
      // console.log('lo',username.value)


      authStore.login({ email: username.value, password: password.value });
      // router.push("/");
    };

    function validateEmail(email) {
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    }
    const onEntered=()=>{
      error.value=''
    }
    return {
      username,
      validateEmail,
      onEntered,
      password,
      login,
      error,
      loading,
      authStore,
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
