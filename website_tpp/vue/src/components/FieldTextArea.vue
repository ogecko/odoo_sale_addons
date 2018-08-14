<template>
  <textarea 
    class="form-control"
    rows=3 maxLength=200
    :placeholder="placeholder"
    v-model="localValue"
  ></textarea>
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
      placeholder: { type: String, default: '' },
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
