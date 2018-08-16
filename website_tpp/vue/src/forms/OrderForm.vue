<template>
    <div class="container">
      <h1>Test Harness for TPP Order Forms</h1>
      <button :class="['btn', {'btn-primary': route==pages[0]}]" @click="route = pages[0]">Sender</button>
      <button :class="['btn', {'btn-primary': route==pages[1]}]" @click="route = pages[1]">Delivery</button>
      <component :is="route"/>
    </div>
</template>

<script>
import OrderFormSender from '@/forms/OrderFormSender.vue'
import OrderFormDelivery from '@/forms/OrderFormDelivery.vue'



export default {
    components: {
        OrderFormSender,
        OrderFormDelivery,
    },
    data() {
        return {
            sample: 'abc',
            route: OrderFormSender,
            pages: [ OrderFormSender, OrderFormDelivery ],
        }
    },
    methods: {
    },
    watch: {
    }
}



</script>
