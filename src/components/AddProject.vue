<template>
  <q-dialog v-model="props.showDialog" persistent>
    <q-card class="" style="width: 450px; min-height: 300px">
      <q-card-section class="q-mb-lg">
        <q-item-label class="q-mb-lg h-4">Add New Project</q-item-label>
      </q-card-section>

      <q-card-section class="">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            dense
            v-model="name"
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            dense
            type="number"
            v-model="age"
            label="Your age *"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />

          <q-toggle dense v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-file dense color="teal" filled v-model="imageFiles" label="Upload Photo">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-section>
        <q-file dense color="teal" filled v-model="imageFiles" label="Upload Icon">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn no-caps color="primary" label="Save Gallery" />
        <!-- <q-space/> -->
        <q-btn no-caps v-close-popup color="primary" label="Cancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddProject",

  setup() {
    return {
      name: ref(""),
      age: ref(""),
      imageFiles: ref(null),
      props: {
        showDialog: Boolean,
      },
    };
  },
});
</script>
