<template>
<div class="input-group col-xs-3">
  <a class="input-group-addon btn" @click="decValue"><i class="fa fa-minus"></i></a>
  <input type="text" class="form-control integer" v-model="localValue" :name="name" :id="id">
  <a class="input-group-addon btn float-left" @click="incValue"><i class="fa fa-plus"></i></a>
</div>
</template>

<style scoped>
    .integer {
        min-width: 7rem;
        text-align: center;
    }
</style>

<script>
  function clamp(min, x, max) {
    const value = (typeof x == 'number') ? x : 0;
    return Math.max(min, Math.min(max, value));
  }

  export default {
    props: {
      value: { type: Number },
      name: { type: String },
      id: { type: Number },
      min: { type: Number, default: -Infinity },
      max: { type: Number, default: +Infinity },
    },
    data() {
      return {
        localValue: clamp(this.min, this.value, this.max),
      }
    },
    computed: {
    },
    methods: {
      decValue() {
        this.localValue -= 1;
      },
      incValue() {
        this.localValue += 1;
      },
    },
    watch: {
      value(newVal) {
        this.localValue = newVal;
      },
      min(newVal) {
        this.localValue = clamp(newVal, this.localValue, this.max);
      },
      max(newVal) {
        this.localValue = clamp(this.min, this.localValue, newVal);
      },
      localValue(newVal) {
        this.localValue = clamp(this.min, newVal, this.max);
        this.$emit('input', this.localValue);
      },
    },
  }
</script>
