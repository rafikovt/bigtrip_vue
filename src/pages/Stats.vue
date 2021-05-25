<template>
  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item statistics__item--money">
      <line-chart
        :chart-data="datacollection"
        :options="options"
        class="statistics__chart statistics__chart--money"
      ></line-chart>
    </div>
    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart statistics__chart--transport"></canvas>
    </div>
    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart statistics__chart--time"></canvas>
    </div>
  </section>
</template>

<script>
import lineChart from "../utils/lineChart";

export default {
  components: {
    lineChart,
  },

  data() {
    return {
      dataCollection: {},
      tripData: this.$store.getters["getPoints"](this.currentSortType),
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: `#000000`,
                padding: 5,
                fontSize: 13,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              barThickness: 44,
            },
          ],
          xAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              minBarLength: 50,
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    };
  },

  methods: {
    fillData() {
      this.dataCollection = {
        labels: this.types,
        datasets: [
          {
            data: this.costsForTypes,
            backgroundColor: `#1E90FF`,
            hoverBackgroundColor: `#B0E0E6`,
            anchor: `start`,
          },
        ],
      };
    },
  },

  computed: {
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

    datacollection() {
      return {
        labels: this.types,
        datasets: [
          {
            data: this.costsForTypes,
            backgroundColor: `#1E90FF`,
            hoverBackgroundColor: `#B0E0E6`,
            anchor: `start`,
          },
        ],
      };
    },
  },

  // mounted() {
  //   this.fillData();
  // },
};
</script>
