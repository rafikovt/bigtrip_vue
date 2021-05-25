<template>
  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item statistics__item--money">
      <line-chart
        :chart-data="getDataforChart(costsForTypes)"
        :options="chartMoneyOptions"
        class="statistics__chart statistics__chart--money"
      ></line-chart>
    </div>
    <div class="statistics__item statistics__item--transport">
      <line-chart
        :chart-data="getDataforChart(countOfTypes)"
        :options="chartTypeOptions"
        class="statistics__chart statistics__chart--money"
      ></line-chart>
    </div>
    <div class="statistics__item statistics__item--time-spend">
      <line-chart
        :chart-data="getDataforChart(timeDuration)"
        :options="chartTimeOptions"
        class="statistics__chart statistics__chart--money"
      ></line-chart>
    </div>
  </section>
</template>

<script>
import lineChart from "../utils/lineChart";
import {
  chartMoneyOptions,
  chartTypeOptions,
  chartTimeOptions,
} from "../config";

export default {
  components: {
    lineChart,
  },

  data() {
    return {
      dataCollection: {},
      chartMoneyOptions,
      chartTypeOptions,
      chartTimeOptions,
    };
  },

  computed: {
    tripData() {
      return this.$store.getters["getPoints"](this.currentSortType);
    },

    types() {
      const types = [];
      this.tripData.forEach((element) => {
        types.push(element.type.toUpperCase());
      });
      return [...new Set(types)];
    },

    costsForTypes() {
      const costsForTypes = [];
      this.types.forEach((e) => {
        let cost = 0;
        this.tripData.forEach((point) => {
          cost += point.type.toUpperCase() === e ? +point.base_price : 0;
        });
        costsForTypes.push(cost);
      });
      return costsForTypes;
    },

    countOfTypes() {
      const countOfTypes = [];
      this.types.forEach((type) => {
        let count = 0;
        this.tripData.forEach((point) => {
          count += point.type.toUpperCase() === type ? 1 : 0;
        });
        countOfTypes.push(count);
      });
      return countOfTypes;
    },

    timeDuration() {
      const durationTimeOfTypes = [];
      this.types.forEach((type) => {
        let duration = 0;
        this.tripData.forEach((point) => {
          duration +=
            point.type.toUpperCase() === type
              ? point.date_to.diff(point.date_from)
              : 0;
        });
        durationTimeOfTypes.push(duration);
      });
      return durationTimeOfTypes;
    },
  },

  methods: {
    getDataforChart(data) {
      return {
        labels: this.types,
        datasets: [
          {
            data,
            backgroundColor: `#1E90FF`,
            hoverBackgroundColor: `#B0E0E6`,
            anchor: `start`,
          },
        ],
      };
    },
  },
};
</script>
