<template>
    <form method="post" @submit="confirm">
        <FormGroup label="Recipient" top>
            <Field label="Name" v-model="x_rcv_name" autocomplete="name" rules="text,required" class="col-md-4"/>
            <Field label="Email" v-model="x_rcv_email" autocomplete="email" rules="email" class="col-md-4"/>
            <Field label="Phone" v-model="x_rcv_phone" autocomplete="phone" rules="tel" helpMsg="in case of delivery issues" class="col-md-4"/>
            <Field label="Delivery Address" v-model="x_rcv_address" rules="address,specific,nsw,required"  
                   @address-changed="updateAddress"
                   placeholder="Business Name or Street Address, City" class="clearfix col-md-6"/>
            <Field label="Additional Delivery Instructions" v-model="x_rcv_special" rules="text" 
                   helpMsg="optional" placeholder="Location, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
            <Field v-show="false" v-model="x_rcv_business"/>
            <Field v-show="false" v-model="x_rcv_street"/>
            <Field v-show="false" v-model="x_rcv_city"/>
            <Field v-show="false" v-model="x_rcv_zip"/>
            <Field v-show="false" v-model="x_rcv_state"/>
            <Field v-show="false" v-model="x_rcv_country"/>
            <Field v-show="false" v-model="x_rcv_latitude"/>
            <Field v-show="false" v-model="x_rcv_longitude"/>
            <Field v-show="false" v-model="x_rcv_is_extra"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <Field :label="x_subscription? 'Starting Day' : 'Day of Delivery'" v-model="x_start" name="x_start" rules="date,future,before1pm,delivery" helpMsg="within next 90 days" class="col-md-6"/>
            <Field label="Subscription Posy" v-model="x_subscription" helpMsg="Order contains multiple deliveries" rules="boolean" class="col-md-6"/>
            <FormTransition :show="x_subscription" class="clearfix">
                <Field label="Number of Deliveries" v-model="x_number" :min="x_subscription ? 3 : 1" :max="x_subscription ? 50 : 1" rules="integer" class="col-md-6"/>
                <Field label="Delivery Frequency" v-model="x_freq" :options="['Daily','Weekly','Fortnightly','Monthly','Other']" rules="enum" class="col-md-6"/>
                <Field label="Delivery Days" v-model="x_days" rules="text, days" class="clearfix col-md-12"/>
            </FormTransition>
        </FormGroup>
        <FormGroup>
            <div class="col-md-12">
                <a href="/shop/cart" class="btn btn-default mb32"><span class="fa fa-long-arrow-left"/> Return to Cart</a>
                <button href="/shop/delivery" class="btn btn-default btn-primary pull-right mb32 " >Confirm <span class="fa fa-long-arrow-right"/></button>
            </div>
            <div class="col-md-12">
                <small v-if="confirmValidationMsg" class="pull-right text-danger mt8 mb16">
                {{ confirmValidationMsg }}
                </small>
            </div>
        </FormGroup>
    </form>
</template>

<script>
import FormGroup from '@/layout/FormGroup.vue'
import FormTransition from '@/layout/FormTransition.vue'
import Field from '@/components/Field.vue'
import deliveryDays from '@/helpers/deliveryDays';
import { getNextPossibleDeliveryDay } from '@/helpers/deliveryDays';
import checkFormRules from '@/helpers/checkFormRules.js'
import validate from '@/helpers/validate.js';


export default {
    props: {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        special: { type: String, default: '' },
        start: { type: String, default: '' },
        subscription: { type: Boolean, default: false },
        freq: { type: String, default: 'Daily' },
        number: { type: Number, default: 1 },
        days: { type: String, default: '' },
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
            x_rcv_business: '',
            x_rcv_street: '',
            x_rcv_city: '',
            x_rcv_zip: '',
            x_rcv_state: '',
            x_rcv_country: '',
            x_rcv_latitude: '',
            x_rcv_longitude: '',
            x_rcv_is_extra: '',                      // flags whether an extra delivery charge is needed for hospitals, schools, malls
            x_start: getNextPossibleDeliveryDay(this.start),
            x_subscription: this.subscription,
            x_freq: this.freq ? this.freq : 'Daily',
            x_number: this.number ? Number(this.number) : 1,
            x_days: (this.days && this.freq=='Other') ? this.days : deliveryDays(getNextPossibleDeliveryDay(this.start), this.freq, this.number),
            confirmValidationMsg: '',
        }
    },
    watch: {
        'x_start'() { this.updateDeliveryDays() },
        'x_freq'() { this.updateDeliveryDays() },
        'x_number'() { this.updateDeliveryDays() },
    },
    methods: {
        updateDeliveryDays() {
            this.x_days = deliveryDays(this.x_start, this.x_freq, this.x_number);
        },
        updateAddress(event) {
            const is_extra_schools_malls_medical = validate(event.types,'extra');
            this.x_rcv_business = event.business;
            this.x_rcv_street = [
                event.subpremise? event.subpremise+' /' : undefined, 
                event.street_number, event.street_name
                ].filter(s=>s).join(' ');
            this.x_rcv_city = event.city;
            this.x_rcv_zip = event.postcode;
            this.x_rcv_state = event.state;
            this.x_rcv_country = event.country;
            this.x_rcv_latitude = String(event.latitude);
            this.x_rcv_longitude = String(event.longitude);
            this.x_rcv_is_extra = is_extra_schools_malls_medical ? 'true' : 'false';   // force to 'true' or 'false'
        },
        confirm(ev) {
            const errors = checkFormRules([], this);
            if (errors.length>0) {
                console.log('Form Validation Errors',errors);
                this.confirmValidationMsg = `Please correct the following fields: ${errors.map(a=>a.label).join(', ')}.` 
                ev.preventDefault();
            }
        },
    },
}



</script>
