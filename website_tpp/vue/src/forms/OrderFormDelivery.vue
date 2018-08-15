<template>
    <form method="post">
        <FormGroup label="Recipient" top>
            <Field label="Name" v-model="receiver.name" types="text,required" class="col-md-4"/>
            <Field label="Email" v-model="receiver.email" types="email" class="col-md-4"/>
            <Field label="Phone" v-model="receiver.phone" types="tel" helpMsg="in case of delivery issues" class="col-md-4"/>
            <Field label="Delivery Address" v-model="receiver.address" types="textarea,required"  placeholder="Street Address, City, Postcode" class="clearfix col-md-6"/>
            <Field label="Special Delivery Instructions" v-model="receiver.special" types="textarea" helpMsg="optional" placeholder="Business Name, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <Field :label="delivery.subscription? 'Starting Day' : 'Day of Delivery'" v-model="delivery.start" types="date" helpMsg="within next 90 days" class="col-md-6"/>
            <Field label="Subscription Posy" v-model="delivery.subscription" helpMsg="Order contains multiple deliveries" types="boolean" class="col-md-6"/>
            <FormTransition :show="delivery.subscription" class="clearfix">
                <Field label="Delivery Frequency" v-model="delivery.freq" :options="['Daily','Weekly','Fortnightly','Monthly','Other']" types="enum" class="col-md-6"/>
                <Field label="Number of Deliveries" v-model="delivery.number" types="integer" class="col-md-6"/>
                <Field label="Delivery Days" v-model="delivery.days" class="clearfix col-md-12" types="text, days"/>
            </FormTransition>
        </FormGroup>
        <FormGroup>
            <div class="col-md-12">
                <a href="/shop/cart" class="btn btn-default mb32"><span class="fa fa-long-arrow-left"/> Return to Cart</a>
                <button href="/shop/delivery" class="btn btn-default btn-primary pull-right mb32 " >Confirm <span class="fa fa-long-arrow-right"/></button>
            </div>
        </FormGroup>
    </form>
</template>

<script>
import FormGroup from '@/layout/FormGroup.vue'
import FormTransition from '@/layout/FormTransition.vue'
import Field from '@/components/Field.vue'
import deliveryDays from '@/helpers/deliveryDays';


export default {
    components: {
        FormGroup,
        FormTransition,
        Field,
    },
    data() {
        return {
            sender: {
                name: 'Joe Blogs',
                phone: '02 94577909',
                email: 'joe@ogecko.com',
            },
            receiver: {
                name: 'Mary Blogs',
                phone: '02 94999909',
                email: 'mary@ogecko.com',
                address: '2 Railway Close, Gordon, 2022, NSW',
                special: 'Unit 5',
            },
            delivery: {
                start: '09-Aug-2018',
                subscription: false,
                number: 3,
                freq: 'Weekly',
                days: '1/1/2018',
            },
            card: {
                from: 'Joe',
                to: 'Mary',
                message: 'Just for you' 
            },
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
