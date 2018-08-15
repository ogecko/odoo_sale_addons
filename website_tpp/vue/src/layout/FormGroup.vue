<template>
  <div class="clearfix">
    <h3 :class="[ 'page-header', 'col-md-12', { mt16: top }]">
        {{label}}
    </h3>
    <slot />
  </div>
</template>

<style>
    .clearfix {
        display: block;
        clear: both;
    }
</style>


<script>
export default {
  props: {
    label: { type: String }, 
    top: { type: Boolean, default: false },
  },
  data() {
    return {};
  }
}
</script>