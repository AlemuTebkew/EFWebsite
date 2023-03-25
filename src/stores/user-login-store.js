import { defineStore } from "pinia";
const { api } = require("src/boot/axios");
export const useAuthStore = defineStore("login", {
  state: () => ({
    authUser: null,
    isAuthenticated: false,
    token: "",
    loading: false,
    roles:[],
    permissions:[],
    error:''

  }),

  getters: {
    user: (state) => state.authUser,
    logedIn: (state) => state.isAuthenticated,
    getRoles:(state)=>state.roles,
  },

  actions: {

    setLoading(value){
      this.loading=value

    },
    setToken(token) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("token", token);
    },
    async login(data) {
      this.loading = true;
      this.error=''
      try {
        const response = await api.post("/login", {
          email: data.email,
          password: data.password,
        });

        console.log("login_data", response.data);
        if (response.status == 200) {
          this.setToken(response.data.token);
          localStorage.setItem("user",JSON.stringify(response.data.user) )

          api.defaults.headers.common.Authorization =
            "Bearer " + response.data.token;
          this.getUser();
          this.router.push("/");
        }
      } catch(er) {
        this.error="Wrong Credencials"
      } finally {
        this.loading = false;
      }
    },
    async getUser() {
      // this.getToken();
      const res = await api.get("/user");
      this.authUser = res.data;
    },
    async fetchRoles() {
      const res=await api.get("/roles")

      if(res.status ==200){
        this.roles=res.data
      }}
      ,

    async fetchPermissions(){

       const response = await api.get("/permissions");
       this.permissions=response.data


   },
   async fetchUser() {
    // this.getToken();
    const res = await api.get("/user");
    this.authUser = res.data;
  },
    async logout() {
      this.authUser = null;
      localStorage.clear()
      this.isAuthenticated = false;
       const re=await api.post('/logout')
      this.router.push("/login");
    },

    init() {
      const token = localStorage.getItem("token");
      if (token) {
        this.isAuthenticated = true;
        this.token = token;
        api.defaults.headers.common.Authorization = "Bearer " + token;
        this.getUser();
      } else {
        this.token = "";
      }
    },
  },
});
