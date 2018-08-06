<template>
  <textarea 
    class="form-control"
    rows=3
    :placeholder="placeholder"
    v-model="localValue"
  ></textarea>
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
      placeholder: { type: String, default: '' },
    },
    watch: {
      localValue: function(newVal) {
        this.$emit('input',newVal);
      },
    },
  }
</script>
