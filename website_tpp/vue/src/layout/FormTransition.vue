<template>
  <transition name="slide">
    <div v-if="show">
        <slot />
    </div>
  </transition>
</template>

<style>
    .slide-enter-active, .slide-leave-active {
    transition: all 500ms ease;
    }

    .slide-enter-to, .slide-leave {
    max-height: 800px;
    overflow: hidden;
    opacity: 1;
    }

    .slide-enter, .slide-leave-to {
    max-height: 0px;
    overflow: hidden;
    opacity: 0;
    }
</style>


<script>
export default {
  props: {
    show: { type: Boolean, default: true }, 
  },
  data: function() {
    return {};
  }
}
</script>