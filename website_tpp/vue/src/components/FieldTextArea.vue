<template>
  <textarea 
    class="form-control"
    rows=3 maxLength=200
    :placeholder="placeholder"
    v-model="localValue"
    :name="name"
    :id="id"
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
      name: { type: String },
      id: { type: Number },
      placeholder: { type: String },
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
