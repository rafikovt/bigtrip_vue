import Vue from "vue";
import Vuex from "vuex";
import { API_URL } from "../config";
import { PASSWORD } from "../config";
import axios from "axios";
import { getOffers } from "../utils/utils";
import dayjs from "dayjs";
import { sortDefault } from "@/utils/sort";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tripData: [],
    destinationsData: [],
    offersData: [],
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
        });
    },
  },
  getters: {
    getDestinations: (state) => state.destinationsData,
    getOffers: (state) => state.offersData,
    getPoints: (state) => {
      console.log(state.tripData);
      const newState = state.tripData.map((point) =>
        Object.assign({}, point, {
          offers: getOffers(point.type, state.offersData, point.offers),
          date_from: dayjs(point.date_from),
          date_to: dayjs(point.date_to),
        }))
      console.log(newState)
      return newState.sort(sortDefault);

    },
  },
});
