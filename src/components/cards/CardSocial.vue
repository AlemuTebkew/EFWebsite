<template>
  <q-card class="bg-transparent no-shadow no-border" bordered>
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm ">
        <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
            <!-- <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`"
                            class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section> -->
            <q-item-section class=" q-pa-md q-ml-none  text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="icon_position === 'left'" side class="q-mr-md text-white">
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {computed, defineComponent} from 'vue'

export default defineComponent({
  name: "CardSocial",
  props: {
    icon_position: {
      required: false,
      default: "left"
    },
    client:{
      required:false,
      type: Boolean,

    },
    o_project:{

    },
    c_project:{

    },
    team:{

    },

  },
  setup(){

   

     return {
       items,
     }
  },



})
</script>
