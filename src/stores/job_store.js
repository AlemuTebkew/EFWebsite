import { defineStore } from 'pinia';

export const useJobStore = defineStore('Job', {
  state: () => ({
    jobs: [],
    departments:[],
    selectedJob:{},
  }),
  getters: {
    alljobs: (state) => state.jobs,
    getSelectedJob:(state)=>state.selectedJob,
  },
  actions: {
    setJobs(data) {
      this.jobs=data;
    },
    setDepartments(data) {
      this.departments=data;
    },

    addJob(data) {
      this.jobs.unshift(data);
    },
    deleteJob(id) {
    const index=this.jobs.findIndex((Job)=>Job.id == id)
      this.jobs.splice(index,1);
    },
    updateJob(id,data) {
    const index=this.jobs.findIndex((Job)=>Job.id == id)
      // this.jobs.push(data);
      this.jobs[index]=data;
    },
    setSelectedJob(id) {
      this.selectedJob=this.jobs.find((Job)=>Job.id == id)
      },
  },
});
