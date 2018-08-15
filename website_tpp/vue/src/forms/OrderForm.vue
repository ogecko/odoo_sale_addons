<template>
    <div class="container">
      <h1>Test Harness for TPP Order Forms</h1>
      <button :class="['btn', {'btn-primary': route==pages[0]}]" @click="route = pages[0]">Sender</button>
      <button :class="['btn', {'btn-primary': route==pages[1]}]" @click="route = pages[1]">Delivery</button>
      <OrderFormSender name="abc" v-if="route == pages[0]"/>
      <OrderFormDelivery name="def" v-if="route == pages[1]"/>
    </div>
</template>

<script>
import OrderFormSender from '@/forms/OrderFormSender.vue'
import OrderFormDelivery from '@/forms/OrderFormDelivery.vue'
import FormGroup from '@/layout/FormGroup.vue'
import FormTransition from '@/layout/FormTransition.vue'
import Field from '@/components/Field.vue'
import deliveryDays from '@/helpers/deliveryDays'


export default {
    components: {
        OrderFormSender,
        OrderFormDelivery,
        FormGroup,
        FormTransition,
        Field,
    },
    data() {
        return {
            sample: 'abc',
            route: OrderFormSender,
            pages: [ OrderFormSender, OrderFormDelivery ],
        }
    },
    methods: {
        updateDeliveryDays() {
            this.delivery.days = deliveryDays(this.delivery.start, this.delivery.freq, this.delivery.number, this.delivery.days);
        }
    },
    watch: {
        'delivery.start'() { this.updateDeliveryDays() },
        'delivery.freq'() { this.updateDeliveryDays() },
        'delivery.number'() { this.updateDeliveryDays() },
    }
}



</script>
