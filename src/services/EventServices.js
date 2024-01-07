import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/JoeyHayfron/vue-test-db",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents(limit, pageNumber) {
    return apiClient.get("/events?_limit=" + limit + "&_page=" + pageNumber);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
};
