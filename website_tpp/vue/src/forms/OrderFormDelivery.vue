<template>
    <form method="post">
        <FormGroup label="Recipient" top>
            <Field label="Name" :value="name" types="text,required" class="col-md-4"/>
            <Field label="Email" :value="email" types="email" class="col-md-4"/>
            <Field label="Phone" :value="phone" types="tel" helpMsg="in case of delivery issues" class="col-md-4"/>
            <Field label="Delivery Address" :value="address" name="address" types="textarea,required"  placeholder="Street Address, City, Postcode" class="clearfix col-md-6"/>
            <Field label="Special Delivery Instructions" :value="special" name="special" types="textarea" helpMsg="optional" placeholder="Business Name, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <Field :label="localSubscription? 'Starting Day' : 'Day of Delivery'" v-model="localStart" name="x_start" types="date" helpMsg="within next 90 days" class="col-md-6"/>
            <Field label="Subscription Posy" v-model="localSubscription"  name="x_subscription" helpMsg="Order contains multiple deliveries" types="boolean" class="col-md-6"/>
            <FormTransition :show="localSubscription" class="clearfix">
                <Field label="Delivery Frequency" v-model="localFreq" name="x_freq" :options="['Daily','Weekly','Fortnightly','Monthly','Other']" types="enum" class="col-md-6"/>
                <Field label="Number of Deliveries" v-model="localNumber" name="x_number" types="integer" class="col-md-6"/>
                <Field label="Delivery Days" v-model="localDays" name="x_days" class="clearfix col-md-12" types="text, days"/>
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
    props: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        special: { type: String },
        x_start: { type: String },
        x_subscription: { type: Boolean },
        x_freq: { type: String },
        x_number: { type: String },
        x_days: { type: String },
    },
    components: {
        FormGroup,
        FormTransition,
        Field,
    },
    data() {
        return {
            localStart: this.x_start,
            localSubscription: this.x_subscription,
            localFreq: this.x_freq,
            localNumber: Number(this.x_number),
            localDays: this.x_days,
        }
    },
    methods: {
        updateDeliveryDays() {
            this.localDays = deliveryDays(this.localStart, this.localFreq, this.localNumber, this.localDays);
        }
    },
    watch: {
        'localStart'() { this.updateDeliveryDays() },
        'localFreq'() { this.updateDeliveryDays() },
        'localNumber'() { this.updateDeliveryDays() },
    }
}



</script>
