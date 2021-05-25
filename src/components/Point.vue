<template>
  <div v-if="currentId === point.id && !$store.state.isAddmode">
    <PointForm
      :point="point"
      :destinations="destinations"
      :offers="offers"
      @reset-currentId="$emit('change-form-mode', $event)"
    />
  </div>
  <li v-else class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">{{
        pointData.date_from.format("MMM-DD")
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
            pointData.date_from.format("HH-mm")
          }}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">{{
            pointData.date_to.format("HH-mm")
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
        :class="{ 'event__favorite-btn--active': point.is_favorite }"
        type="button"
        @click="changeFavoriteStatus"
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
        @click.prevent="changePointToForm(point.id)"
      >
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
</template>

<script>
import PointForm from "../components/PointForm";
import { getEventDuration } from "@/utils/utils";
import dayjs from "dayjs";

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
      pointLocal: this.point,
    };
  },

  computed: {
    eventDuration() {
      return getEventDuration(
        dayjs(this.point.date_to).diff(dayjs(this.point.date_from))
      );
    },

    pointData() {
      return Object.assign({}, this.point, {
        date_from: dayjs(this.point.date_from),
        date_to: dayjs(this.point.date_to),
      });
    },
  },

  methods: {
    closeAddForm() {
      this.$store.commit("disableAddMode");
    },

    changePointToForm(id) {
      this.closeAddForm();
      this.$emit("change-form-mode", id);
    },

    changeFavoriteStatus() {
      console.log(this.point);
      this.$store.dispatch(
        "updateData",
        Object.assign({}, this.point, {
          is_favorite: !this.point.is_favorite,
        })
      );
    },
  },
};
</script>
