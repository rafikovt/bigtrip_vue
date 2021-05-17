<template>
  <section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">
      Destination
    </h3>
    <p class="event__destination-description">
      {{ destinationData.description }}
    </p>
    <div v-if="destinationData.pictures.length" class="event__photos-container">
      <div class="event__photos-tape">
        <img
          v-for="photo in destinationData.pictures"
          :key="photo.src"
          class="event__photo"
          :src="photo.src"
          :alt="photo.description"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    destination: Object,
    destinations: Array,
  },

  data() {
    return {
      destinationLocal: this.destination,
    };
  },

  computed: {
    destinationData() {
      return this.destinations.find(
        (el) => el.name === this.destinationLocal.name
      );
    },
  },
};
</script>
