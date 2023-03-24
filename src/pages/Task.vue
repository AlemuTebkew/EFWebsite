<template>
  <q-page class="">
    <q-list
     separator
     padding
     bordered>
      <q-item
        v-for="task in newtasks"
        :key="task.id"
        v-ripple
        clickable
        @click="task.completed = !task.completed"
        :class="!task.completed ? 'bg-orange-1' : 'bg-green-1' "
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough' : task.completed }" >{{ task.title }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <div class="row q-gutter-md">
            <q-icon name="event" size="18px"></q-icon>
            <div class="column">
              <q-item-label>
              {{ task.dueDate }}
            </q-item-label>
             <q-item-label caption>
              {{ task.dueTime }}
            </q-item-label>
           </div>

            </div>


        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
const tasks = [
  {
    id: 1,
    title: "Go Office",
    completed: true,
    dueDate: "2023/02/09",
    dueTime: "3:00",
  },
  {
    id: 2,
    title: "Have A Lunch ",
    completed: true,
    dueDate: "2023/02/09",
    dueTime: "7:00",
  },
  {
    id: 3,
    title: "Finish DB Diagram",
    completed: false,
    dueDate: "2023/02/09",
    dueTime: "8:00",
  },
];
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  // components: {
  //   EssentialLink,
  // },

  setup() {
    const newtasks = ref(tasks);

    // props=defineProps(['ff'])

    return {
      newtasks,
    };
  },
});
</script>
