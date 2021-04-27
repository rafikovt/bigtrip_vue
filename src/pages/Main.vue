<template>
  <ul class="trip-events__list">
    <Point v-for="point in tripData" :key="point.id" :point="point" />
  </ul>
</template>

<script>
import axios from "axios";
import { API_URL } from "../config";
import Point from "../components/Point.vue";

export default {
  components: {
    Point,
  },

  data() {
    return {
      tripData: null,
    };
  },

  methods: {
    loadTripData() {
      axios
        .get(`${API_URL}/points`, {
          auth: {
            username: "Basic",
            password: "asdjhkj12njnasjdbha",
          },
        })
        .then((response) => (this.tripData = response.data));
    },
  },

  created() {
    this.loadTripData();
  },
};
</script>
