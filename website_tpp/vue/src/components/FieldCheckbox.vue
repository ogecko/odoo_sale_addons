<template>
  <input 
    type="checkbox"
    v-model="localValue"
  >
</template>

<script>
  export default {
    data: function() {
      return {
        localValue: this.value,
      }
    },
    props: {
      value: { type: Boolean },
    },
    computed: {
    },
    watch: {
      localValue: function(newVal) {
        this.$emit('input',newVal);
      },
    },
  }
</script>
