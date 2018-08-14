<template>
  <input 
    class="form-control"
    :type="type"
    :placeholder="placeholder"
    v-model="localValue"
  >
</template>

<script>
  export default {
    data() {
      return {
        localValue: this.value,
      }
    },
    props: {
      type: { type: String, default: 'text' },
      value: { type: String },  
      placeholder: { type: String, default: '' },
    },
    computed: {
    },
    watch: {
      value(newVal) {
        this.localValue = newVal;
      },
      localValue(newVal) {
        this.$emit('input',newVal);
      },
    },
  }
</script>
