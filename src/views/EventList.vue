<template>
  <div class="wrapper">
    <EventCard v-for="event in events" :event="event" :key="event.id" />
    <RouterLink
      :to="{ name: 'event-list', query: { page: pageNumber - 1 } }"
      v-if="pageNumber > 1"
    >
      &#8249; Prev
    </RouterLink>
    <RouterLink
      :to="{ name: 'event-list', query: { page: pageNumber + 1 } }"
      v-if="hasNextPage"
    >
      Next &#8250;
    </RouterLink>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "../services/EventServices";

export default {
  name: "EventList",
  props: ["pageNumber"],
  data() {
    return {
      events: null,
      totalNumberOfPages: 0,
    };
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(to, from, next) {
    EventService.getEvents(2, parseInt(to.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalNumberOfPages = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "network-error" });
      });
  },
  beforeRouteUpdate(to) {
    return EventService.getEvents(2, parseInt(to.query.page) || 1)
      .then((response) => {
        this.events = response.data;
        this.totalNumberOfPages = response.headers["x-total-count"];
      })
      .catch(() => {
        return { name: "network-error" };
      });
  },
  computed: {
    hasNextPage() {
      return Math.ceil(this.totalNumberOfPages / 2) > this.pageNumber;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
