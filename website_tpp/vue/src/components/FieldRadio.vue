<template>
  <span class="btn-group">
      <button v-for="option in options" 
        :key="option"
        :class="localClass(option)"
        @click="localValue = option"
      >
          {{option}}
      </button>
  </span>
</template>

<script>
  export default {
    data: function() {
      return {
        localValue: this.value,
      }
    },
    props: {
      value: { type: String },
      options: { type: Array }, // an Array of Strings
    },
    methods: {
        localClass: function(option) {
            return [
                'btn',
                { 'btn-primary' : this.localValue == option },
                { 'btn-default' : this.localValue != option },
            ];
        },
    },
    watch: {
      localValue: function(newVal) {
        this.$emit('input', newVal);
      },
    },
  }
</script>
