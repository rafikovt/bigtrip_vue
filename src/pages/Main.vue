<template>
  <ul class="trip-events__list">
    <Point
      v-for="point in tripData"
      :key="point.id"
      :point="point"
      :destinations="destinationsData"
      :offers="offersData"
      :currentId="currentId"
      @change-form-mode="currentId = $event"
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
      currentId: null,
    };
  },

  computed: {
    tripData() {
      return this.$store.getters.getPoints;
    },

    destinationsData() {
      return this.$store.state.destinationsData;
    },

    offersData() {
      return this.$store.state.offersData;
    },
  },
};
</script>
