<template>
  <section v-if="tripData.length" class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        {{ tripData[0].destination.name }} &mdash; ... &mdash;
        {{ tripData[tripData.length - 1].destination.name }}
      </h1>

      <p class="trip-info__dates">
        {{ tripData[0].date_from.format("MMM-DD") }}&nbsp;&mdash;&nbsp;{{
          tripData[tripData.length - 1].date_to.format("MMM-DD")
        }}
      </p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">{{
        totalPrice
      }}</span>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    totalPrice: Number,
    tripData: Array,
  },
};
</script>
