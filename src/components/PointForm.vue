<template>
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <EventType
        :currentType="pointData.type"
        :eventTypes="offers"
        @change-type="pointData.type = $event"
      />

      <div class="event__field-group event__field-group--destination">
        <label
          class="event__label event__type-output"
          for="event-destination-1"
        >
          {{ pointData.type }}
        </label>
        <input
          class="event__input event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          v-model="pointData.destination.name"
          list="destination-list-1"
        />
        <datalist id="destination-list-1">
          <option
            v-for="(destination, index) in destinations"
            :key="index"
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
          :value="point.date_from"
        />
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          :value="point.date_to"
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
          v-model.number="pointData.base_price"
        />
      </div>

      <button
        class="event__save-btn btn btn--blue"
        type="submit"
        @click.prevent="updatePoint"
      >
        Save
      </button>
      <button
        @click="deletePoint(point.id)"
        class="event__reset-btn"
        type="reset"
      >
        Delete
      </button>
      <button @click="closeForm" class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">
          Offers
        </h3>

        <div class="event__available-offers">
          <Offers
            v-for="(offer, index) in offersForThisType"
            :key="index"
            :offersForThisType="offersForThisType"
            :pointData="pointData"
            :offer="offer"
            @change-offer="changeOffers"
          />
        </div>
        <DestinationInfo
          :destination="destination"
          :destinations="destinations"
        />
      </section>
    </section>
  </form>
</template>

<script>
import dayjs from "dayjs";
import Offers from "@/components/Offers";
import DestinationInfo from "./Destination-Info";
import EventType from "@/components/EventType";

export default {
  model: {
    prop: "isFormMode",
    event: "closeForm",
  },

  components: {
    Offers,
    DestinationInfo,
    EventType,
  },

  props: {
    point: Object,
    destinations: Array,
    offers: Array,
  },

  data() {
    return {
      pointData: JSON.parse(JSON.stringify(this.point)),
    };
  },

  methods: {
    updatePoint() {
      this.closeForm();
      this.$store.dispatch(
        "updateData",
        Object.assign({}, this.pointData, {
          date_to: dayjs(this.point.date_to).toDate().toISOString(),
          date_from: dayjs(this.point.date_from).toDate().toISOString(),
        })
      );
    },

    changeOffers(offer) {
      if (this.pointData.offers.some((el) => el.title === offer.title)) {
        this.pointData.offers = this.pointData.offers.filter(
          (el) => el.title !== offer.title
        );
      } else {
        this.pointData.offers.push(offer);
      }
    },

    changeType(type) {
      console.log(type);
      this.pointData = type;
    },

    deletePoint(id) {
      this.$store.dispatch("deletePoint", id).then(this.closeForm());
    },

    closeForm() {
      this.$emit("reset-currentId", null);
    },
  },

  computed: {
    offersForThisType() {
      return this.offers.find((offer) => offer.type == this.pointData.type)
        .offers;
    },

    // pointData: {
    //   get: function () {
    //     return JSON.parse(JSON.stringify(this.point));
    //   },
    //   set: function (offers) {
    //     this.pointData.offers = offers;
    //   },
    // },

    destination() {
      return this.pointData.destination;
    },
  },
};
</script>
