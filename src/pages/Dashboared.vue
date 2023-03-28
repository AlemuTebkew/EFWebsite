<template>
  <q-page class="q-pa-sm">
    <!-- <card-social icon_position="left" client="122"/> -->

    <q-card class="bg-transparent no-shadow no-border" bordered>
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="col-md-3 col-sm-12 col-xs-12"
          >
            <q-item
              :style="`background-color: ${item.color1}`"
              class="q-pa-none"
            >
              <!-- <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`"
                            class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section> -->
              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{
                  item.value
                }}</q-item-label>
                <q-item-label>{{ item.title }}</q-item-label>
              </q-item-section>
              <q-item-section
                v-if="icon_position === 'left'"
                side
                class="q-mr-md text-white"
              >
                <q-icon :name="item.icon" color="white" size="44px"></q-icon>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
          <q-card class="no-shadow" bordered>
            <q-card-section class="text-h6">
              Ongoing Projects Progress graph
            </q-card-section>
            <q-card-section>
              <ECharts
                ref="barchart"
                :option="options"
                class="q-mt-md"
                :resizable="true"
                autoresize
                style="height: 400px"
              />
            </q-card-section>
          </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  computed,
  onMounted,
onBeforeMount,
} from "vue";
import * as echarts from "echarts";
import ECharts from "vue-echarts";
import { api } from "src/boot/axios";
import { useDashStore } from "src/stores/dashboard-store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "Dashboard2",
  components: {
    // CardSocial: defineAsyncComponent(() => import("components/cards/CardSocial.vue")),
    ECharts,
  },
  setup() {
    const dashStore = useDashStore();

    const { client, c_project, o_project, source, team } =
      storeToRefs(dashStore);

    // const options = ref({
    //   legend: {
    //     bottom: 10,
    //   },
    //   autoresize:true,
    //   tooltip: {},
    //   dataset: {
    //     source: [
    //          ...source.value

    //       ],
    //   },
    //   grid: {
    //     left: '3%',
    //       right: '4%',
    //       bottom: '20%',
    //       top: '5%',
    //       containLabel: true
    //   },
    //   xAxis: {type: 'category'},
    //   yAxis: {},
    //   // Declare several bar series, each will be mapped
    //   // to a column of dataset.source by default.
    //   series: [
    //     { type: "bar" },
    //     // {type: 'bar'},
    //     // {type: 'bar'}
    //   ],

    // });

    onBeforeMount(() => {
      // options.value.dataset.source = source.value
    });


    const options=computed(()=>{
      return   {
      legend: {
        bottom: 10,
      },
      autoresize:true,
      tooltip: {},
      dataset: {
        source: [
             ...source.value

          ],
      },
      grid: {
        left: '3%',
          right: '4%',
          bottom: '20%',
          top: '5%',
          containLabel: true
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: "bar" },
        // {type: 'bar'},
        // {type: 'bar'}
      ],


    }
  })
    const items = computed(() => {
      return [
        {
          title: "Our Client",
          icon: "person",
          value: client.value,
          color1: "#5064b5",
          color2: "#3e51b5",
        },
        {
          title: "Completed Projects",
          // icon: "assignment_turnd_in",
          value: c_project.value,
          color1: "#f37169",
          color2: "#f34636",
        },
        {
          title: "Ongoing Projects",
          icon: "fab fa-google",
          value: o_project.value,
          color1: "#ea6a7f",
          color2: "#ea4b64",
        },
        {
          title: "Total Team",
          icon: "bar_chart",
          value: team.value,
          color1: "#a270b1",
          color2: "#9f52b1",
        },
      ];
    });
    return {
      items,

      client,
      o_project,
      c_project,
      team,
      options,
      source,
      getColor(val) {
        if (val > 70 && val <= 100) {
          return "green";
        } else if (val > 50 && val <= 70) {
          return "blue";
        }
        return "red";
      },
      getChipColor(status) {
        if (status == "Canceled") {
          return "negative";
        } else if (status == "Sent") {
          return "positive";
        } else if (status == "Pending") {
          return "warning";
        } else if (status == "Paid") {
          return "info";
        } else {
          return "dark";
        }
      },
    };
  },
});
</script>

<style scoped></style>
