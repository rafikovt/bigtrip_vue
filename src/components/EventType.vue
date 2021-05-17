<template>
  <div class="event__type-wrapper">
    <label class="event__type event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img
        class="event__type-icon"
        width="17"
        height="17"
        :src="`img/icons/${currentType}.png`"
        alt="Event type icon"
      />
    </label>
    <input
      class="event__type-toggle visually-hidden"
      id="event-type-toggle-1"
      type="checkbox"
      v-model="openListTypes"
    />

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        <div
          v-for="(type, index) in eventTypesLocal"
          :key="index"
          class="event__type-item"
          @click.prevent="updateType(type)"
        >
          <input
            :id="`event-type-${type.toLowerCase()}-1`"
            class="event__type-input visually-hidden"
            type="radio"
            name="event-type"
            :checked="type.toLowerCase() === currentType"
          />
          <label
            :class="`event__type-label event__type-label--${type.toLowerCase()}`"
            :for="`event-type-${type.toLowerCase()}-1`"
            >{{ type }}</label
          >
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentType: String,
    eventTypes: Array,
  },

  data() {
    return {
      openListTypes: false,
    };
  },

  computed: {
    eventTypesLocal() {
      const types = [];
      this.eventTypes.forEach((e) => types.push(e.type));
      return types;
    },
  },

  methods: {
    updateType(type) {
      this.openListTypes = false;
      this.$emit("change-type", type);
    },
  },
};
</script>
