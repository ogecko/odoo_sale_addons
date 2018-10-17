<template>
    <form method="post" @submit="confirm">
        <FormGroup label="Your Contact Details" top>
            <Field label="Name" v-model="x_snd_name"   autocomplete="name"  rules="text,required" class="col-md-4"/>
            <Field label="Email" v-model="x_snd_email" autocomplete="email" rules="email,required" class="col-md-4"/>
            <Field label="Phone" v-model="x_snd_phone" autocomplete="work phone" rules="tel" helpMsg="in case of order issues" class="col-md-4"/>
        </FormGroup>
        <FormGroup label="Personalised Card">
            <Field label="A Posy For" name="x_to" v-model="x_to" class="col-md-6"/>
            <Field label="From" name="x_from" v-model="x_from" class="col-md-6"/>
            <Field label="Message" name="x_message" v-model="x_message" rules="textarea" helpMsg="maximum 200 characters" class="clearfix col-md-12"/>
            <Field label="Help me choose a message" @input="getCardMessage" helpMsg="keep clicking until you find one" value="" :options="['Birthday','Anniversary','Thanks','Congrats','Sorry','Random']" rules="enum" class="col-md-12"/>
        </FormGroup>
        <FormGroup>
            <div v-if="confirmValidationMsg" class="has-error col-md-12">
                <p class="help-block text-right mt8 mb16">{{ confirmValidationMsg }}</p>
            </div>
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
import checkFormRules from '@/helpers/checkFormRules.js'

export default {
    props: {
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        to: { type: String, default: '' },
        from: { type: String, default: '' },
        message: { type: String, default: '' },
    },
    components: {
        FormGroup,
        Field,
    },
    data() {
        return {
            x_snd_name: this.name,
            x_snd_email: this.email,
            x_snd_phone: this.phone,
            x_to: this.to,
            x_from: this.from,
            x_message: this.message,
            confirmValidationMsg: '',
        }
    },
    methods: {
        getCardMessage(theme) {
            this.x_message = cardMessageSample(theme);    
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
    watch: {
    }
}



</script>
