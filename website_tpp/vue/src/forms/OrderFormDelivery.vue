<template>
    <form method="post">
        <FormGroup label="Recipient" top>
            <Field label="Name" v-model="x_rcv_name" autocomplete="name" types="text,required" class="col-md-4"/>
            <Field label="Email" v-model="x_rcv_email" autocomplete="email" types="email" class="col-md-4"/>
            <Field label="Phone" v-model="x_rcv_phone" autocomplete="phone" types="tel" helpMsg="in case of delivery issues" class="col-md-4"/>
            <Field label="Delivery Address" v-model="x_rcv_address" autocomplete="address" types="textarea,required"  placeholder="Street Address, City, Postcode" class="clearfix col-md-6"/>
            <Field label="Special Delivery Instructions" v-model="x_rcv_special" types="textarea" helpMsg="optional" placeholder="Business Name, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <Field :label="x_subscription? 'Starting Day' : 'Day of Delivery'" v-model="x_start" name="x_start" types="date" helpMsg="within next 90 days" class="col-md-6"/>
            <Field label="Subscription Posy" v-model="x_subscription" helpMsg="Order contains multiple deliveries" types="boolean" class="col-md-6"/>
            <FormTransition :show="x_subscription" class="clearfix">
                <Field label="Delivery Frequency" v-model="x_freq" :options="['Daily','Weekly','Fortnightly','Monthly','Other']" types="enum" class="col-md-6"/>
                <Field label="Number of Deliveries" v-model="x_number" types="integer" class="col-md-6"/>
                <Field label="Delivery Days" v-model="x_days" types="text, days" class="clearfix col-md-12"/>
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
import moment from 'moment';


export default {
    props: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        special: { type: String },
        start: { type: String, default: moment().format('DD-MMM-YYYY') },
        subscription: { type: Boolean },
        freq: { type: String },
        number: { type: Number, default: 1 },
        days: { type: String },
    },
    components: {
        FormGroup,
        FormTransition,
        Field,
    },
    data() {
        return {
            x_rcv_name: this.name,
            x_rcv_email: this.email,
            x_rcv_phone: this.phone,
            x_rcv_address: this.address,
            x_rcv_special: this.special,
            x_start: this.start,
            x_subscription: this.subscription,
            x_freq: this.freq,
            x_number: Number(this.number),
            x_days: this.days,
        }
    },
    methods: {
        updateDeliveryDays() {
            this.x_days = deliveryDays(this.x_start, this.x_freq, this.x_number, this.x_days);
        }
    },
    watch: {
        'x_start'() { this.updateDeliveryDays() },
        'x_freq'() { this.updateDeliveryDays() },
        'x_number'() { this.updateDeliveryDays() },
    }
}



</script>
