import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useNewsStore = defineStore("news", {
  state: () => {
    return {
      allNews: [],
      oneNews: {},
      loading: false,
      error: "",
    };
  },
  getters: {
    getSelectedNews: (id) => {
      return this.allNews;
    },
  },

  actions: {
    async fetchNews() {
      this.allNews = [];
      this.loading = true;
      try {
        const response = await api.get("/news");
        this.allNews = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    setNews(data) {
      this.allNews = data;
    },
    setOneNews(data) {
      this.oneNews = data;
    },

    deleteNews(id) {
      const index = this.allNews.findIndex((nn) => nn.id == id);
      this.allNews.splice(index, 1);
    },
  },
});
