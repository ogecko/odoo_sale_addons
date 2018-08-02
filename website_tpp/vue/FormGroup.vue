<template>
  <div>
    <h3 class="page-header clearfix">
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
}
</script>