import { defineStore } from 'pinia';

export const useDashStore = defineStore('dash', {
  state: () => ({
    client: 0,
    team: 0,
    o_project: 0,
    c_project: 0,
    source:[],
    noti:[]
  }),
  getters: {
  },
  actions: {
    addTeam(team) {
    },
  },
});
