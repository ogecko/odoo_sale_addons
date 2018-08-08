<template>
  <div class="input-group btn-group">
      <button v-for="option in options" 
        :key="option"
        :class="localClass(option)"
        @click="localValue = option"
      >
          {{option}}
      </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        localValue: this.value,
      }
    },
    props: {
      value: { type: String },
      options: { type: Array }, // an Array of Strings
    },
    methods: {
        localClass(option) {
            return [
                'btn',
                { 'btn-primary' : this.localValue == option },
                { 'btn-default' : this.localValue != option },
            ];
        },
    },
    watch: {
      value(newVal) {
        this.localValue = this.value;
      },
      localValue(newVal) {
        this.$emit('input', newVal);
      },
    },
  }
</script>
