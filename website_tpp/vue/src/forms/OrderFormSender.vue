<template>
    <div>
        <FormGroup label="Your Contact Details" top>
            <Field label="Name" :value="name" types="text,required" class="col-md-4"/>
            <Field label="Email" :value="email" types="email,required" class="col-md-4"/>
            <Field label="Phone" :value="phone" types="tel" helpMsg="in case of order issues" class="col-md-4"/>
        </FormGroup>
        <FormGroup label="Personalised Card">
            <Field label="A Posy For" :value="x_to" class="col-md-6"/>
            <Field label="From" :value="x_from" class="col-md-6"/>
            <Field label="Message" :value="x_message" types="textarea" helpMsg="maximum 200 characters" class="clearfix col-md-12"/>
        </FormGroup>
    </div>
</template>

<script>
import FormGroup from '@/layout/FormGroup.vue'
import Field from '@/components/Field.vue'


export default {
    props: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        x_to: { type: String },
        x_from: { type: String },
        x_message: { type: String },
    },
    components: {
        FormGroup,
        Field,
    },
    data() {
        return {
        }
    },
    methods: {
    },
    watch: {
    }
}



</script>
