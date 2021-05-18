<template>
  <div id="app">
    <header class="page-header">
      <div class="page-body__container page-header__container">
        <img
          class="page-header__logo"
          src="img/logo.png"
          width="42"
          height="42"
          alt="Trip logo"
        />

        <div class="trip-main">
          <!-- Маршрут и стоимость -->

          <TripInfo :totalPrice="totalPrice" />
          <div class="trip-main__trip-controls trip-controls">
            <nav class="trip-controls__trip-tabs trip-tabs">
              <router-link
                class="trip-tabs__btn trip-tabs__btn--active"
                :to="{ name: 'Main' }"
                >Table</router-link
              >
              <router-link class="trip-tabs__btn" :to="{ name: 'Stats' }"
                >Stats</router-link
              >
            </nav>

            <h2 class="visually-hidden">Filter events</h2>

            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              <div class="trip-filters__filter">
                <input
                  id="filter-everything"
                  class="trip-filters__filter-input visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="everything"
                  checked
                />
                <label
                  class="trip-filters__filter-label"
                  for="filter-everything"
                  >Everything</label
                >
              </div>

              <div class="trip-filters__filter">
                <input
                  id="filter-future"
                  class="trip-filters__filter-input visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="future"
                />
                <label class="trip-filters__filter-label" for="filter-future"
                  >Future</label
                >
              </div>

              <div class="trip-filters__filter">
                <input
                  id="filter-past"
                  class="trip-filters__filter-input visually-hidden"
                  type="radio"
                  name="trip-filter"
                  value="past"
                />
                <label class="trip-filters__filter-label" for="filter-past"
                  >Past</label
                >
              </div>

              <button class="visually-hidden" type="submit">
                Accept filter
              </button>
            </form>
          </div>

          <button
            class="trip-main__event-add-btn btn btn--big btn--yellow"
            type="button"
          >
            New event
          </button>
        </div>
      </div>
    </header>
    <main class="page-body__page-main page-main">
      <div class="page-body__container">
        <section class="trip-events">
          <!-- Сортировка -->

          <!-- Контент -->
          <router-view />
        </section>
      </div>
    </main>
    <!-- <router-view /> -->
  </div>
</template>

<script>
import TripInfo from "@/components/TripInfo.vue";
import { getTotalPrice } from "@/utils/utils.js";

export default {
  components: {
    TripInfo,
  },

  computed: {
    tripData() {
      return this.$store.getters["getPoints"]("sort-day");
    },
    totalPrice() {
      return getTotalPrice(this.tripData);
    },
  },

  // methods: {
  //   getPrice() {
  //     return getTotalPrice(this.tripData);
  //   },
  // },

  created() {
    this.$store.dispatch("loadTripData");
    this.$store.dispatch("loadDestinations");
    this.$store.dispatch("loadOffers");
  },
};
</script>
