<template>
    <div>
        <FormGroup label="Sender">
            <FieldInput label="Name" v-model="sender.name" types="text,required" class="col-md-4"/>
            <FieldInput label="Email" v-model="sender.email" types="email,required" class="col-md-4"/>
            <FieldInput label="Phone" v-model="sender.phone" types="tel,required" class="col-md-4"/>
        </FormGroup>
        <FormGroup label="Recipient">
            <FieldInput label="Name" v-model="receiver.name" class="col-md-4"/>
            <FieldInput label="Email" v-model="receiver.email" types="email" class="col-md-4"/>
            <FieldInput label="Phone" v-model="receiver.phone" types="tel" class="col-md-4"/>
            <FieldInput label="Delivery Address" types="textarea" placeholder="Street Address, City, Postcode" class="col-md-6"/>
            <FieldInput label="Special Delivery Instructions" types="textarea" placeholder="Business Name, Suite, Unit, Floor, Location, etc" class="col-md-6"/>
        </FormGroup>
        <FormGroup label="Delivery Information">
            <FieldInput label="No. Deliveries" v-model="sender.name" class="col-md-4"/>
            <FieldInput label="Frequency" v-model="sender.name" class="col-md-4"/>
            <FieldInput label="Starting Day" v-model="sender.name" class="col-md-4"/>
            <FieldInput label="Delivery Days" class="col-md-12"/>
        </FormGroup>
        <FormGroup label="Personalised Card">
            <FieldInput label="A Posy For" v-model="card.to" class="col-md-6"/>
            <FieldInput label="From" v-model="card.from" class="col-md-6"/>
            <FieldInput label="Message" v-model="card.message" types="textarea" class="col-md-12"/>
        </FormGroup>
    </div>
</template>

<script>
import FormGroup from './FormGroup.vue'
import FieldInput from './FieldInput.vue'

export default {
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
                days: '1/1/2018',
            },
            card: {
                from: 'Joe',
                to: 'Mary',
                message: 'Just for you'
            },
        }
    },
    components: {
        FormGroup,
        FieldInput,
    }
}
</script>
