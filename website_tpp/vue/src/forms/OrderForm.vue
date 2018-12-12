<template>
    <div class="container">
      <h1>Test Harness for TPP Order Forms</h1>
      <button :class="['btn', {'btn-primary': route==pages[0]}]" @click="route = pages[0]">Sender</button>
      <button :class="['btn', {'btn-primary': route==pages[1]}]" @click="route = pages[1]; subscription = 'False'">Delivery1</button>
      <button :class="['btn', {'btn-primary': route==pages[1]}]" @click="route = pages[1]; subscription = 'True'">Delivery3</button>
      <button :class="['btn', {'btn-primary': route==pages[2]}]" @click="route = pages[2]">Daily</button>
      <button :class="['btn', {'btn-primary': route==pages[3]}]" @click="route = pages[3]">Day</button>
      <component :is="route" :subscription="subscription"/>
    </div>
</template>

<script>
import OrderFormSender from '@/forms/OrderFormSender.vue'
import OrderFormDelivery from '@/forms/OrderFormDelivery.vue'
import OrderFormDaily from '@/forms/OrderFormDaily.vue'
import OrderFormDayOfWeek from '@/forms/OrderFormDayOfWeek.vue'



export default {
    components: {
        OrderFormSender,
        OrderFormDelivery,
        OrderFormDaily,
        OrderFormDayOfWeek,
    },
    data() {
        return {
            sample: 'abc',
            route: OrderFormSender,
            subscription: 'False',
            pages: [ OrderFormSender, OrderFormDelivery, OrderFormDaily, OrderFormDayOfWeek ],
        }
    },
    methods: {
    },
    watch: {
    }
}



</script>
