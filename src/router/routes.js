const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      { path: "", component: () => import("src/pages/Dashboared.vue") },
      { path: "setting", component: () => import("src/pages/Setting.vue") },
      { path: "service", component: () => import("src/pages/Service.vue") },
      {
        path: "requested",
        component: () => import("src/pages/RequestedService.vue"),
      },
      { path: "project", component: () => import("src/pages/Project.vue") },
      { path: "news", component: () => import("src/pages/News.vue") },
      { path: "client", component: () => import("src/pages/Client.vue") },
      { path: "gallery", component: () => import("src/pages/Gallery.vue") },
      { path: "team", component: () => import("src/pages/Team.vue") },
      { path: "role", component: () => import("src/pages/Role.vue") },
      { path: "category", component: () => import("src/pages/Category.vue") },
      {
        path: "department",
        component: () => import("src/pages/Department.vue"),
      },
      { path: "job", component: () => import("src/pages/Job.vue") },
      { path: "editJob", component: () => import("src/pages/EditJob.vue") },
      { path: "applicant", component: () => import("src/pages/Applicant.vue"),
      beforeEnter: (to, from) => {
        // reject the navigation
        const user = JSON.parse(localStorage.getItem("user"));
       const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('view applicant'))

        return access? true: from.path
      }, },
      { path: "task", component: () => import("src/pages/Task.vue") },
      { path: "profile", component: () => import("src/pages/UserProfile.vue")},
      { path: "addTeam", component: () => import("src/pages/AddTeam.vue") },
      { path: "editTeam", component: () => import("src/pages/EditTeam.vue") },
      { path: "viewApplicant", component: () => import("src/pages/ViewApplicant.vue") },
      {
        path: "addGallery",
        component: () => import("src/pages/AddGallery.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('add gallery'))

          return access? true: from.path
        },
      },
      {
        path: "editGallery",
        component: () => import("src/pages/EditGallery.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('update gallery'))

          return access? true: from.path
        },
      },
      {
        path: "editProject",
        component: () => import("src/pages/EditProject.vue"),
      },
      {
        path: "editService",
        component: () => import("src/pages/EditService.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('update service'))

          return access? true: from.path
        },
      },
      {
        path: "editNews",
        component: () => import("src/pages/EditNews.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('update news'))

          return access? true: from.path
        },
      },
      {
        path: "permission",
        component: () => import("src/pages/Permission.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('view permission'))

          // return access? true: from.path
          return  true
        },
      },
      {
        path: "user",
        component: () => import("src/pages/User.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('view user'))

          return access? true: from.path
        },
      },
      {
        path: "addUser",
        component: () => import("src/pages/AddUser.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('add user'))

          return access? true: from.path
        },
      },
      {
        path: "editUser",
        component: () => import("src/pages/EditUser.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
         const access= user.role?.permissions?.some((p)=>p.title.toLowerCase().includes('update user'))

          return access? true: from.path
        },
      },
      {
        path: "/astegi",
        component: () => import("src/pages/astegi/Astegi.vue"),
      },
      {
        path: "/tetegi",
        component: () => import("src/pages/astegi/Tetegi.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("src/pages/Login.vue"),
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: () => import("src/pages/Forgot.vue"),
  },
  {
    path: "/reset-password/:token",
    name: "Reset",
    component: () => import("src/pages/ForgetPassword.vue"),
  },
  {
    path: "/notfound",
    name: "not",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
