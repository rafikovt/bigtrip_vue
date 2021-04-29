<template>
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img
            class="event__type-icon"
            width="17"
            height="17"
            :src="`img/icons/${point.type}.png`"
            alt="Event type icon"
          />
        </label>
        <input
          class="event__type-toggle visually-hidden"
          id="event-type-toggle-1"
          type="checkbox"
        />

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div
              v-for="eventType in offers"
              :key="eventType"
              class="event__type-item"
            >
              <input
                :id="`event-type-${eventType.type.toLowerCase()}-1`"
                class="event__type-input visually-hidden"
                type="radio"
                name="event-type"
                :value="eventType.type.toLowerCase()"
              />
              <label
                :class="`event__type-label event__type-label--${eventType.type.toLowerCase()}`"
                :for="`event-type-${eventType.type.toLowerCase()}-1`"
                >{{ eventType.type }}</label
              >
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label
          class="event__label event__type-output"
          for="event-destination-1"
        >
          {{ point.type }}
        </label>
        <input
          class="event__input event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          :value="point.destination.name"
          list="destination-list-1"
        />
        <datalist id="destination-list-1">
          <option
            v-for="destination in destinations"
            :key="destination.name"
            :value="destination.name"
          ></option>
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="18/03/19 12:25"
        />
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="18/03/19 13:35"
        />
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input event__input--price"
          id="event-price-1"
          type="text"
          name="event-price"
          :value="point.base_price"
        />
      </div>

      <button class="event__save-btn btn btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button @click="closeForm(false)" class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">
          Offers
        </h3>

        <div class="event__available-offers">
          <div
            v-for="offer in offersData"
            :key="offer.title"
            class="event__offer-selector"
          >
            <input
              class="event__offer-checkbox visually-hidden"
              id="event-offer-luggage-1"
              type="checkbox"
              name="event-offer-luggage"
              :checked="offer.checked"
            />
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">{{ offer.title }}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">50</span>
            </label>
          </div>
        </div>
      </section>

      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">
          Destination
        </h3>
        <p class="event__destination-description">
          {{ point.destination.description }}
        </p>
        <div
          v-if="point.destination.pictures.length"
          class="event__photos-container"
        >
          <div class="event__photos-tape">
            <img
              v-for="photo in point.destination.pictures"
              :key="photo.src"
              class="event__photo"
              :src="photo.src"
              :alt="photo.description"
            />
          </div>
        </div>
      </section>
    </section>
  </form>
</template>

<script>
import { getOffers } from "../utils/utils";

export default {
  model: {
    prop: "isFormMode",
    event: "closeForm",
  },

  props: {
    point: Object,
    destinations: Array,
    offers: Array,
  },

  data() {
    return {
      pointData: Object.assign(this.point),
    };
  },

  computed: {
    offersData() {
      return getOffers(this.pointData.type, this.offers, this.pointData.offers);
    },
  },

  methods: {
    closeForm(isFormMode) {
      this.$emit("closeForm", isFormMode);
    },
  },
};
</script>
