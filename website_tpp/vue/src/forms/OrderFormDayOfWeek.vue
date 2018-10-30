<template>
    <span> - {{delivery_day_of_week}}</span>
</template>

<script>
import { getNextPossibleDeliveryDayOfWeek } from '@/helpers/deliveryDays';

export default {
    props: {
    },
    components: {
    },
    computed: {
        delivery_day_of_week() {
            return getNextPossibleDeliveryDayOfWeek();
        },
    },
    methods: {
        publish() {
        },
    },
}

</script>
