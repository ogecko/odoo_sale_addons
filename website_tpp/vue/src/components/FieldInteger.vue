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
  export default {
    props: {
      value: { type: Number },
      name: { type: String },
      id: { type: Number },
    },
    data() {
      return {
        localValue: this.value,
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
      localValue(newVal) {
        this.$emit('input',newVal);
      },
    },
  }
</script>
