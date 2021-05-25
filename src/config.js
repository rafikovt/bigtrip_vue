import { getDurationDays } from "@/utils/utils";

export const API_URL = "https://13.ecmascript.pages.academy/big-trip";
export const PASSWORD = "asdffswqewqeheaddd1231jh";
export const chartMoneyOptions = {
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
};

export const chartTypeOptions = {
  plugins: {
    datalabels: {
      font: {
        size: 13,
      },
      color: `#000000`,
      anchor: `end`,
      align: `start`,
      formatter: (val) => `${val}x`,
    },
  },
  title: {
    display: true,
    text: `TYPE`,
    fontColor: `#000000`,
    fontSize: 23,
    position: `left`,
  },
  scales: {
    yAxes: [{
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
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
      minBarLength: 50,
    }],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};

export const chartTimeOptions = {
  plugins: {
    datalabels: {
      font: {
        size: 13,
      },
      color: `#000000`,
      anchor: `end`,
      align: `start`,
      formatter: (val) => getDurationDays(val),
    },
  },
  title: {
    display: true,
    text: `TIME-SPEND`,
    fontColor: `#000000`,
    fontSize: 23,
    position: `left`,
  },
  scales: {
    yAxes: [{
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
    }],
    xAxes: [{
      ticks: {
        display: false,
        beginAtZero: true,
      },
      gridLines: {
        display: false,
        drawBorder: false,
      },
      minBarLength: 50,
    }],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};


