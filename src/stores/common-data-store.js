import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    dialog: false,
    viewDialog: false,
    isLoading:false,
    isBtnLoading:false,
    isEditable:false,
  }),
  getters: {
    dialogState: (state) => state.dialog,
    viewDialogState: (state) => state.viewDialog,
    loadingState: (state) => state.isLoading,
    btnLoadingState: (state) => state.isBtnLoading,
    editableState: (state) => state.isEditable,
  },
  actions: {
    toggleAddDialog() {
      this.dialog=!this.dialog;
    },
    toggleViewDialog() {
      this.viewDialog=!this.viewDialog;
    },
    setLoading(state) {
      this.isLoading=state;
    },
    setBtnLoading(state) {
      this.isBtnLoading=state;
    },
    toggleEdit() {
      this.isEditable=!this.isEditable;
    },
  },
});
