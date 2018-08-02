<template>
  <div class="container">
    <h1>Vue Prototyping Harness for Odoo</h1>
    <OrderForm/>
  </div>
</template>

<style>@import "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css";</style>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<script>
import OrderForm from './OrderForm.vue'

export default {
  components: {
    OrderForm,
  }
}
</script>
