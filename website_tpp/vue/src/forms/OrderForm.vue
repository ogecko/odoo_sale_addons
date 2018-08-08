<template>
    <div>
        <FormGroup label="Sender">
            <Field label="Name" v-model="sender.name" types="text,required" class="col-md-4"/>
            <Field label="Email" v-model="sender.email" types="email,required" class="col-md-4"/>
            <Field label="Phone" v-model="sender.phone" types="tel" helpMsg="in case of order issues" class="col-md-4"/>
        </FormGroup>
        <FormGroup label="Recipient">
            <Field label="Name" v-model="receiver.name" types="text,required" class="col-md-4"/>
            <Field label="Email" v-model="receiver.email" types="email" class="col-md-4"/>
            <Field label="Phone" v-model="receiver.phone" types="tel" helpMsg="in case of delivery issues" class="col-md-4"/>
            <Field label="Delivery Address" v-model="receiver.address" types="textarea,required"  placeholder="Street Address, City, Postcode" class="clearfix col-md-6"/>
            <Field label="Special Delivery Instructions" v-model="receiver.special" types="textarea" placeholder="Business Name, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <Field :label="delivery.subscription? 'Starting Day' : 'Delivery Day'" v-model="delivery.start" class="col-md-6"/>
            <Field label="Subscription Posy" v-model="delivery.subscription" helpMsg="Order contains multiple deliveries" types="boolean" class="col-md-6"/>
            <FormTransition :show="delivery.subscription" class="clearfix">
                <Field label="Delivery Frequency" v-model="delivery.freq" :options="['Daily','Weekly','Fortnightly','Monthly','Other']" types="enum" class="col-md-6"/>
                <Field label="Number of Deliveries" v-model="delivery.number" types="integer" class="col-md-6"/>
                <Field label="Delivery Days" v-model="delivery.days" class="clearfix col-md-12"/>
            </FormTransition>
        </FormGroup>
        <FormGroup label="Personalised Card">
            <Field label="A Posy For" v-model="card.to" class="col-md-6"/>
            <Field label="From" v-model="card.from" class="col-md-6"/>
            <FormBreak />
            <Field label="Message" v-model="card.message" types="textarea" helpMsg="maximum 200 characters" class="clearfix col-md-12"/>
        </FormGroup>
    </div>
</template>

<script>
import FormGroup from '@/layout/FormGroup.vue'
import FormBreak from '@/layout/FormBreak.vue'
import FormTransition from '@/layout/FormTransition.vue'
import Field from '@/components/Field.vue'
import deliveryDays from '@/helpers/deliveryDays';

export default {
    components: {
        FormGroup,
        FormBreak,
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
                start: '1/1/2018',
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
    },
    watch: {
        'delivery.start'() {
            this.delivery.days = deliveryDays(this.delivery.start, this.delivery.freq, this.delivery.number, this.delivery.days);
        },
        'delivery.freq'() {
            this.delivery.days = deliveryDays(this.delivery.start, this.delivery.freq, this.delivery.number, this.delivery.days);
        },
        'delivery.number'() {
            this.delivery.days = deliveryDays(this.delivery.start, this.delivery.freq, this.delivery.number, this.delivery.days);
        },
    }
}



</script>
