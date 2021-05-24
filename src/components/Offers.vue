<template>
  <div
    class="event__offer-selector"
    @click.prevent="$emit('change-offer', offer)"
  >
    <input
      class="event__offer-checkbox visually-hidden"
      id="event-offer-luggage-1"
      type="checkbox"
      name="event-offer-luggage"
      :checked="pointDataLocal.offers.some((el) => el.title === offer.title)"
      :disabled="$store.state.onSaving || $store.state.onDeleting"
    />
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">{{ offer.title }}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">{{ offer.price }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    offersForThisType: Array,
    pointData: Object,
    offer: Object,
  },

  data() {
    return {
      pointDataLocal: this.pointData,
    };
  },
};
</script>
