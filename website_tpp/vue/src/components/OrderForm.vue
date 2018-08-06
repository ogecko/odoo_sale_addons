<template>
    <div>
        <FormGroup label="Sender">
            <Field label="Name" v-model="sender.name" types="text,required" class="col-md-4"/>
            <Field label="Email" v-model="sender.email" types="email,required" class="col-md-4"/>
            <Field label="Phone" v-model="sender.phone" types="tel" class="col-md-4"/>
        </FormGroup>
        <FormGroup label="Recipient">
            <Field label="Name" v-model="receiver.name" types="text,required" class="col-md-4"/>
            <Field label="Email" v-model="receiver.email" types="email" class="col-md-4"/>
            <Field label="Phone" v-model="receiver.phone" types="tel" class="col-md-4"/>
            <Field label="Delivery Address" v-model="receiver.address" types="textarea,required"  placeholder="Street Address, City, Postcode" class="col-md-6"/>
            <Field label="Special Delivery Instructions" v-model="receiver.special" types="textarea" placeholder="Business Name, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <Field label="No. Deliveries" v-model="delivery.number" class="col-md-4"/>
            <Field label="Frequency" v-model="delivery.freq" class="col-md-4"/>
            <Field label="Starting Day" v-model="delivery.start" class="col-md-4"/>
            <Field label="Delivery Days" v-model="delivery.days" class="col-md-12"/>
        </FormGroup>
        <FormGroup label="Personalised Card">
            <Field label="A Posy For" v-model="card.to" class="col-md-6"/>
            <Field label="From" v-model="card.from" class="col-md-6"/>
            <Field label="Message" v-model="card.message" types="textarea" class="col-md-12"/>
        </FormGroup>
    </div>
</template>

<script>
import FormGroup from '@/components/FormGroup.vue'
import Field from '@/components/Field.vue'

export default {
    components: {
        FormGroup,
        Field,
    },
    data: function () {
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
                number: '1',
                freq: 'Once a Week',
                start: '1/1/2018',
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
}
</script>
