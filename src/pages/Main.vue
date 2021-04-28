<template>
  <ul class="trip-events__list">
    <Point
      v-for="point in tripData"
      :key="point.id"
      :point="point"
      :destinations="destinationsData"
      :offers="offersData"
    />
  </ul>
</template>

<script>
import Point from "../components/Point";

export default {
  components: {
    Point,
  },

  data() {
    return {
      destinations: this.destinationsData,
    };
  },

  computed: {
    tripData() {
      return this.$store.state.tripData;
    },

    destinationsData() {
      return this.$store.state.destinationsData;
    },

    offersData() {
      return this.$store.state.offersData;
    },
  },

  created() {
    this.$store.dispatch("loadTripData");
    this.$store.dispatch("loadDestinations");
    this.$store.dispatch("loadOffers");
  },
};
</script>
