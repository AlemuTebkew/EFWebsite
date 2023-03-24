import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    teams: [],
  }),
  getters: {
    getTeams: (state) => state.teams,
  },
  actions: {
    addTeam(team) {
      this.teams.push(team);
    },
  },
});
