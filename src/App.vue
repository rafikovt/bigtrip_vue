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
          <TripInfo />
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
            <!-- Фильтры -->
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
export default {
  components: {
    TripInfo,
  },
};
</script>
