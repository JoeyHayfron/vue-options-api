import { createRouter, createWebHashHistory } from "vue-router";
import EventListView from "../views/EventList.vue";
import EventDetailsView from "../views/event/DetailsView.vue";
import EventRegisterView from "../views/event/RegisterView.vue";
import EventLayoutView from "../views/event/LayoutView.vue";
import EventEditView from "@/views/event/EditView.vue";
import AboutView from "../views/AboutView.vue";
import NotFoundVue from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "../services/EventServices";
import GStore from "@/store";
const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventListView,
    props: (route) => ({ pageNumber: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "event-layout",
    props: true,
    component: EventLayoutView,
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data;
        })
        .catch((err) => {
          console.log("Error Occurred");
          if (err.response && err.response.status === 404) {
            return {
              name: "resource-not-found",
              params: { resource: "Event" },
            };
          } else {
            return { name: "network-error" };
          }
        });
    },
    children: [
      {
        path: "",
        name: "event-details",
        component: EventDetailsView,
      },
      {
        path: "register",
        name: "event-register",
        component: EventRegisterView,
      },
      {
        path: "edit",
        name: "event-edit",
        component: EventEditView,
      },
    ],
  },
  //REDIRECT NESTED PAGES
  // {
  //   path: '/event/:afterEvent(.*)',
  //   redirect: (to) => ({ to: '/events/' + to.params.afterEvent })
  // },
  // {
  //   path: '/event/:id',
  //   redirect: (to) => ({ name: 'event-details', params: { id: to.params.id } }),
  //   children: [
  //     { path: 'register', redirect: () => ({ name: 'event-register' }) },
  //     { path: 'edit', redirect: () => ({ name: 'event-edit' }) }
  //   ]
  // },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/:catchAll(.*)",
    name: "page-not-found",
    component: NotFoundVue,
  },
  {
    path: "/404/:resource",
    name: "resource-not-found",
    component: NotFoundVue,
    props: true,
  },
  {
    path: "/network-error",
    name: "network-error",
    component: NetworkError,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
