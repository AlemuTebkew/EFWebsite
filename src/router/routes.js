const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      { path: "", component: () => import("src/pages/Dashboared.vue"),
      beforeEnter: (to, from) => {


        return true ;
      } },
      { path: "pdf_preview", component: () => import("src/pages/PdfPreview.vue") },
      {
        path: "service",
        component: () => import("src/pages/Service.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view service")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "requested",
        component: () => import("src/pages/RequestedService.vue"),
      },
      {
        path: "project",
        component: () => import("src/pages/Project.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view project")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "news",
        component: () => import("src/pages/News.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view news")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "client",
        component: () => import("src/pages/Client.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view client")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "gallery",
        component: () => import("src/pages/Gallery.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view gallery")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "team",
        component: () => import("src/pages/Team.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view team")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "role",
        component: () => import("src/pages/Role.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view role")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "category",
        component: () => import("src/pages/Category.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view project")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "department",
        component: () => import("src/pages/Department.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view department")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "job",
        component: () => import("src/pages/Job.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view job")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editJob",
        component: () => import("src/pages/EditJob.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update job")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "applicant",
        component: () => import("src/pages/Applicant.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view applicant")
          );

          return access ? true : from.path;
        },
      },
      { path: "task", component: () => import("src/pages/Task.vue") },
      { path: "profile", component: () => import("src/pages/UserProfile.vue") },
      {
        path: "addTeam",
        component: () => import("src/pages/AddTeam.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("add team")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editTeam",
        component: () => import("src/pages/EditTeam.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update team")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "viewApplicant",
        component: () => import("src/pages/ViewApplicant.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view applicant")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "addGallery",
        component: () => import("src/pages/AddGallery.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("add gallery")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editGallery",
        component: () => import("src/pages/EditGallery.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update gallery")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editProject",
        component: () => import("src/pages/EditProject.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update project")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editService",
        component: () => import("src/pages/EditService.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update service")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editNews",
        component: () => import("src/pages/EditNews.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update news")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "permission",
        component: () => import("src/pages/Permission.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view permission")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "user",
        component: () => import("src/pages/User.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("view user")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "addUser",
        component: () => import("src/pages/AddUser.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("add user")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "editUser",
        component: () => import("src/pages/EditUser.vue"),
        beforeEnter: (to, from) => {
          // reject the navigation
          const user = JSON.parse(localStorage.getItem("user"));
          const access = user.role?.permissions?.some((p) =>
            p.title.toLowerCase().includes("update user")
          );

          return access ? true : from.path;
        },
      },
      {
        path: "shortlist",
        component: () => import("src/pages/Shortlisted.vue"),

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
