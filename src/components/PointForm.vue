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
        <flatPickr
          class="event__input event__input--time"
          id="event-start-time-1"
          v-model="pointData.date_from"
          :config="config"
        />
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <flatPickr
          class="event__input event__input--time"
          id="event-end-time-1"
          v-model="pointData.date_to"
          :config="config"
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
        @click.prevent="isAddMode ? addPoint() : updatePoint()"
      >
        Save
      </button>
      <button
        @click="isAddMode ? closeAddForm() : deletePoint(point.id)"
        class="event__reset-btn"
        type="reset"
      >
        {{ isAddMode ? "Cancel" : "Delete" }}
      </button>
      <button
        @click="isAddMode ? closeAddForm() : closeForm()"
        class="event__rollup-btn"
        type="button"
      >
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    Offers,
    DestinationInfo,
    EventType,
    flatPickr,
  },

  props: {
    point: Object,
    destinations: Array,
    offers: Array,
  },

  data() {
    return {
      pointData: JSON.parse(JSON.stringify(this.point)),
      isAddMode: this.$store.state.isAddmode,
      config: {
        enableTime: true,
        dateFormat: "Y/m/d H:i",
      },
    };
  },

  methods: {
    updatePoint() {
      this.closeForm();
      console.log(this.pointData.date_from);
      console.log(
        Object.assign({}, this.pointData, {
          date_from: dayjs(this.pointData.date_from),
          date_to: dayjs(this.pointData.date_to),
        })
      );

      this.$store.dispatch(
        "updateData",
        Object.assign({}, this.pointData, {
          date_from: dayjs(this.pointData.date_from).toDate().toISOString(),
          date_to: dayjs(this.pointData.date_to).toDate().toISOString(),
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

    closeAddForm() {
      this.$store.commit("disableAddMode");
    },

    addPoint() {
      this.closeAddForm();
      this.$store.dispatch(
        "addPoint",
        Object.assign({}, this.pointData, {
          date_to: dayjs(this.pointData.date_to).toDate().toISOString(),
          date_from: dayjs(this.pointData.date_from).toDate().toISOString(),
        })
      );
    },
  },

  computed: {
    offersForThisType() {
      return this.offers.find((offer) => offer.type == this.pointData.type)
        .offers;
    },

    destination() {
      return this.pointData.destination;
    },
  },

  beforeDestroy() {
    this.closeForm();
  },
};
</script>
