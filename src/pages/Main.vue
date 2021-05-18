<template>
  <div>
    <h2 class="visually-hidden">Trip events</h2>

    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
      <div
        v-for="(item, index) in sortTitles"
        :key="index"
        class="trip-sort__item"
        :class="`trip-sort__item--${item}`"
      >
        <input
          :id="`sort-${item}`"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          :value="`sort-${item}`"
          :checked="currentSortType === item"
          v-model="currentSortType"
        />
        <label class="trip-sort__btn" :for="`sort-${item}`">{{ item }}</label>
      </div>
    </form>
    <ul class="trip-events__list">
      <li v-if="$store.state.isAddmode">
        <PointForm
          :destinations="destinationsData"
          :offers="offersData"
          :isAddMode="isAddMode"
          :point="newPoint"
        />
      </li>
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
  </div>
</template>

<script>
import Point from "../components/Point";
import PointForm from "../components/PointForm";
import { SORT_TITLES } from "@/const/const";

export default {
  components: {
    Point,
    PointForm,
  },

  data() {
    return {
      destinations: this.destinationsData,
      currentId: null,
      sortTitles: SORT_TITLES,
      currentSortType: "sort-day",
      isAddMode: this.$store.state.isAddmode,
    };
  },

  computed: {
    tripData() {
      return this.$store.getters["getPoints"](this.currentSortType);
    },

    destinationsData() {
      return this.$store.state.destinationsData;
    },

    offersData() {
      return this.$store.state.offersData;
    },

    newPoint() {
      return Object.assign({}, this.point, {
        id: "123",
        type: this.offersData[0].type,
        destination: this.destinationsData[0],
        base_price: 0,
        is_favorite: false,
        offers: [],
      });
    },
  },
};
</script>
