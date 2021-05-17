<template>
  <div v-if="currentId === point.id">
    <PointForm :point="point" :destinations="destinations" :offers="offers" />
  </div>
  <li v-else class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">{{
        point.date_from.format("MMM-DD")
      }}</time>
      <div class="event__type">
        <img
          class="event__type-icon"
          width="42"
          height="42"
          :src="`img/icons/${point.type}.png`"
          alt="Event type icon"
        />
      </div>
      <h3 class="event__title">
        {{ point.type }} {{ point.destination.name }}
      </h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">{{
            point.date_from.format("HH-mm")
          }}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">{{
            point.date_to.format("HH-mm")
          }}</time>
        </p>
        <p class="event__duration">{{ eventDuration }}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">{{
          point.base_price
        }}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li
          v-for="(offer, index) in point.offers"
          :key="index"
          class="event__offer"
        >
          <span class="event__offer-title">{{ offer.title }}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">{{ offer.price }}</span>
        </li>
      </ul>
      <button
        class="event__favorite-btn"
        :class="{ 'event__favorite-btn--active': isFavorite }"
        type="button"
      >
        <span class="visually-hidden">Add to favorite</span>
        <svg
          class="event__favorite-icon"
          width="28"
          height="28"
          viewBox="0 0 28 28"
        >
          <path
            d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"
          />
        </svg>
      </button>
      <button
        class="event__rollup-btn"
        type="button"
        @click.prevent="$emit('change-form-mode', point.id)"
      >
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
</template>

<script>
import PointForm from "../components/PointForm";
import { getEventDuration } from "@/utils/utils";

export default {
  components: {
    PointForm,
  },
  props: {
    point: Object,
    destinations: Array,
    offers: Array,
    formMode: Boolean,
    currentId: String,
  },

  data() {
    return {
      isFavorite: this.point.is_favorite,
      isFormMode: false,
      eventDuration: getEventDuration(
        this.point.date_to.diff(this.point.date_from)
      ),
    };
  },
};
</script>
