<template>
  <div class="row">
    <h3 class="page-header col-md-12">
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
    label: { type: String, default: 'Default Label' }, 
  },
  data: function() {
    return {};
  }
}
</script>