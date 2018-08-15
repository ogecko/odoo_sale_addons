<template>
    <form method="post">
        <FormGroup label="Your Contact Details" top>
            <Field label="Name" :value="name" types="text,required" class="col-md-4"/>
            <Field label="Email" :value="email" types="email,required" class="col-md-4"/>
            <Field label="Phone" :value="phone" types="tel" helpMsg="in case of order issues" class="col-md-4"/>
        </FormGroup>
        <FormGroup label="Personalised Card">
            <Field label="A Posy For" name="x_to" :value="x_to" class="col-md-6"/>
            <Field label="From" name="x_from" :value="x_from" class="col-md-6"/>
            <Field label="Message" name="x_message" v-model="localMessage" types="textarea" helpMsg="maximum 200 characters" class="clearfix col-md-12"/>
            <Field label="Help me choose a message" @input="getCardMessage" helpMsg="keep clicking until you find one" value="" :options="['Birthday','Anniversary','Thanks','Congrats','Sorry','Random']" types="enum" class="col-md-12"/>
        </FormGroup>
        <FormGroup>
            <div class="col-md-12">
                <a href="/shop/cart" class="btn btn-default mb32"><span class="fa fa-long-arrow-left"/> Return to Cart</a>
                <button href="/shop/checkout" class="btn btn-default btn-primary pull-right mb32 " >Confirm <span class="fa fa-long-arrow-right"/></button>
            </div>
        </FormGroup>
    </form>
</template>

<script>
import FormGroup from '@/layout/FormGroup.vue'
import Field from '@/components/Field.vue'
import cardMessageSample from '@/helpers/cardMessageSample.js'

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
            localMessage: this.x_message,
        }
    },
    methods: {
        getCardMessage(theme) {
            this.localMessage = cardMessageSample(theme);    
        },
    },
    watch: {
    }
}



</script>
