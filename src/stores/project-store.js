import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    categories: [],
  }),
  getters: {
    getTeams: (state) => state.teams,
  },
  actions: {
    setCategories(data) {
      this.categories=data;
    },
  },
});
