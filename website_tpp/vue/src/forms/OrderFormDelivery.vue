<template>
    <form method="post" @submit="confirm">
        <FormGroup label="Recipient" top>
            <Field label="Name" v-model="x_rcv_name" helpMsg="please ensure first and last names are given" autocomplete="name" rules="text,required" class="col-md-4"/>
            <Field label="Phone" v-model="x_rcv_phone" autocomplete="phone" rules="tel" helpMsg="include recipients phone no. whenever possible" class="col-md-4"/>
            <Field label="Email" v-model="x_rcv_email" autocomplete="email" rules="email" helpMsg="optional" class="col-md-4"/>
            <Field label="Delivery Address" v-model="x_rcv_address" rules="address,specific,nsw,required"  
                   @address-changed="updateAddress" helpMsg="please start typing and select from the autocomplete list"
                   placeholder="Business Name or Street Address, City" class="clearfix col-md-6"/>
            <Field label="Additional Delivery Info" v-model="x_rcv_special" rules="text" 
                   helpMsg="please help the driver locate the recipient or delivery place"
                   placeholder="Suite, Unit, Floor, Level, Shop, Room, Where to leave" class="col-md-6"/>
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
            <Field :label="x_subscription? 'Starting Day' : 'Day of Delivery'" v-model="x_start" name="x_start" 
                    rules="date,future,before1pm,delivery,restrict" :rulescontext="products"
                    helpMsg="within next 90 days" class="col-md-6"/>
            <Field label="Subscription Posy" disabled v-model="x_subscription" helpMsg="Order contains multiple deliveries" rules="boolean" class="col-md-6"/>
            <FormTransition :show="x_subscription" class="clearfix">
                <Field label="Number of Deliveries" v-model="x_number" :min="x_subscription ? 3 : 1" :max="x_subscription ? 50 : 1" rules="integer" class="col-md-6"/>
                <Field label="Delivery Frequency" v-model="x_freq" :options="['Daily','Weekly','Fortnightly','Monthly','Other']" rules="enum" class="col-md-6"/>
                <Field label="Delivery Days" v-model="x_days" rules="text, days" class="clearfix col-md-12"/>
            </FormTransition>
        </FormGroup>
        <FormGroup>
            <div v-if="confirmValidationMsg" class="has-error col-md-12">
                <p class="help-block text-right mt8 mb16">{{ confirmValidationMsg }}</p>
            </div>
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
import { getNextPossibleDeliveryDay } from '@/helpers/deliveryDays';
import checkFormRules from '@/helpers/checkFormRules.js'
import validate from '@/helpers/validate.js';


export default {
    props: {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        special: { type: String, default: '' },             // flags whether this is a special subscription order True or False
        products: { type: String, default: '' },            // concatenation of the short descriptions of products ordered, passed as context to Start Date
        start: { type: String, default: '' },
        subscription: { type: String, default: 'False' },   // Comes in as 'True' or 'False' from Odoo
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
        const d = {
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
            x_rcv_is_extra: '',                             // flags whether an extra delivery charge is needed for hospitals, schools, malls
            x_start: getNextPossibleDeliveryDay(this.start),
            x_subscription: (this.subscription=='True'),    // convert to JS boolean true or false
            x_freq: this.freq ? this.freq : 'Daily',
            x_number: this.number ? Number(this.number) : 1,
            confirmValidationMsg: '',
        };
        d.x_number = (d.x_subscription && d.x_number<3) ? 3 : d.x_number;           // clamp to min of 3 when order is a subscription
        d.x_days = (this.days && this.freq=='Other') ? this.days : deliveryDays(d.x_start, d.x_freq, d.x_number);
        return d;
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
            if (validate(event.types,'establishment')) {
                this.x_rcv_special = event.address;
            }
        },
        confirm(ev) {
            this.confirmValidationMsg = '';
            const errors = checkFormRules([], this);
            if (errors.length>0) {
                // eslint-disable-next-line
                console.log('Form Validation Errors',errors);
                this.confirmValidationMsg = `Please correct the following fields: ${errors.map(a=>a.label).join(', ')}.` 
                ev.preventDefault();
            }
        },
    },
}



</script>
