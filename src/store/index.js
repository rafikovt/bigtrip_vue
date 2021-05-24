import Vue from "vue";
import Vuex from "vuex";
import { API_URL } from "../config";
import { PASSWORD } from "../config";
import axios from "axios";
// import { getOffers } from "../utils/utils";
import dayjs from "dayjs";
import { sortDefault, sortPriceDown, sortTimeDown, filter } from "../utils/sort";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tripData: [],
    destinationsData: [],
    offersData: [],
    currentFilter: "everything",
    isAddmode: false,
    onSaving: false,
    onDeleting: false,
  },

  mutations: {
    updateTripData(state, data) {
      state.tripData = data;
    },

    updatePoint(state, point) {
      state.tripData = state.tripData.filter((elem) => elem.id !== point.id);
      state.tripData.push(point);
    },

    updateDestinations(state, data) {
      state.destinationsData = data;
    },

    updateOffers(state, data) {
      state.offersData = data;
    },

    deletePoint(state, id) {
      state.tripData = state.tripData.filter((elem) => elem.id !== id);
    },

    addPoint(state, data) {
      state.tripData.push(data);
    },

    setCurrentFilter(state, filter) {
      state.currentFilter = filter;
    },

    setAddMode(state) {
      console.log(1)
      state.isAddmode = true;
    },

    disableAddMode(state) {
      state.isAddmode = false;
    },
  },

  actions: {
    loadTripData(context) {
      return axios
        .get(`${API_URL}/points`, {
          auth: {
            username: "Basic",
            password: PASSWORD,
          },
        })
        .then((response) => {
          console.log(response.data);
          context.commit("updateTripData", response.data);
        });
    },

    loadDestinations(context) {
      return axios
        .get(`${API_URL}/destinations`, {
          auth: {
            username: "Basic",
            password: PASSWORD,
          },
        })
        .then((response) => {
          context.commit("updateDestinations", response.data);
        });
    },

    loadOffers(context) {
      return axios
        .get(`${API_URL}/offers`, {
          auth: {
            username: "Basic",
            password: PASSWORD,
          },
        })
        .then((response) => {
          context.commit("updateOffers", response.data);
        });
    },

    updateData(context, updatedData) {
      return axios
        .put(`${API_URL}/points/${updatedData.id}`, updatedData, {
          auth: {
            username: "Basic",
            password: PASSWORD,
          },
        })
        .then((response) => {
          context.commit("updatePoint", response.data);
          this.state.onSaving = false;
        });
    },

    deletePoint(context, id) {
      return axios
        .delete(`${API_URL}/points/${id}`, {
          auth: {
            username: "Basic",
            password: PASSWORD,
          },
        })
        .then(() => {
          context.commit("deletePoint", id);
          this.state.onDeleting = false;
        });
    },

    addPoint(context, data) {
      return axios
        .post(
          `${API_URL}/points`,

          data,

          {
            auth: {
              username: "Basic",
              password: PASSWORD,
            },
          }
        )
        .then((response) => {
          context.commit("addPoint", response.data);
          this.state.onSaving = false;
        });
    },
  },
  getters: {
    getDestinations: (state) => state.destinationsData,
    getOffers: (state) => state.offersData,
    getPoints: (state) => (sortType) => {
      let newState = state.tripData.map((point) =>
        Object.assign({}, point, {
          date_from: dayjs(point.date_from),
          date_to: dayjs(point.date_to),
        })
      );
      newState = newState.filter(filter[state.currentFilter]);
      switch (sortType) {
        case "sort-price":
          return newState.sort(sortPriceDown);
        case "sort-time":
          return newState.sort(sortTimeDown);
        default:
          return newState.sort(sortDefault);
      }
    },
  },
});
