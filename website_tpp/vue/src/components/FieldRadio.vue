<template>
  <div class="input-group btn-group">
      <input type="text" hidden v-model="localValue" :name="name" :id="id">
      <button v-for="option in options" 
        :key="option"
        :class="localClass(option)"
        @click.prevent="handleClick(option)"
      >
          {{option}}
      </button>
  </div>
</template>

<script>
  export default {
    props: {
      value: { type: String },
      name: { type: String },
      id: { type: Number },
      options: { type: Array }, // an Array of Strings
    },
    data() {
      return {
        localValue: this.value,
      }
    },
    methods: {
        localClass(option) {
            return [
                'btn',
                { '' : this.localValue == option },
                { 'btn-default' : this.localValue != option },
            ];
        },
      handleClick(newVal) {
        this.localValue = newVal;
        this.$emit('input', newVal);
      },
    },
    watch: {
      value(newVal) {
        this.localValue = newVal;
      },
    },
  }
</script>
