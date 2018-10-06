<template>
    <form method="post" enctype="multipart/form-data">
        <div class="row">
            <div class="col-md-12 ml16 mr16 mb32">
                <h1>Daily Posy</h1>
                <FieldInput v-show="false" name="x_primary"/>
                <FieldInput v-show="false" name="x_small"/>
                <FieldInput v-show="false" name="x_medium"/>
                <FieldInput v-show="false" name="x_large"/>
                <p>Use this page to update the Daily Posy images and description. All images will be cropped to 1:1 aspect ratio and correct resolution.</p>
                <li class="text-muted">On a PC: DRAG/DROP files onto images to replace them. SCROLL to zoom. CLICK and DRAG to move.</li>
                <li class="text-muted">On a Phone: TAP an image to replace it. Select from Camera or Gallery. PINCH to zoom. DRAG to move.</li>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <h4>&nbsp;</h4>
                <Field name="x_description" v-model="x_description" rules="textarea" 
                    label='Product Description' class="clearfix col-md-12"/>
                <Field name="x_duplicate" v-model="x_duplicate" rules="boolean" helpMsg="Publish primary image for small, medium and large product variants"
                    label='Image options' class="clearfix col-md-12"/>
                <div class="col-md-12">
                    <button @click="publish" class="btn btn-default btn-lg btn-primary mb32" >Publish Now</button>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Daily Posy (primary)</h4>
                    <croppa v-model="croppa_primary" 
                        :width="300" :height="300" :quality="2"
                        :zoom-speed="8" :placeholder-font-size="18"
                        canvas-color='#ccc'
                        show-loading replace-drop
                        accept='image/*'
                    />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Daily Posy (small)</h4>
                    <croppa v-model="croppa_small" 
                        :width="300" :height="300" :quality="2"
                        :zoom-speed="8" :placeholder-font-size="18"
                        canvas-color='#ccc'
                        show-loading replace-drop
                        accept='image/*'
                    />
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Daily Posy (medium)</h4>
                    <croppa v-model="croppa_medium" 
                        :width="300" :height="300" :quality="2"
                        :zoom-speed="8" :placeholder-font-size="18"
                        canvas-color='#ccc'
                        show-loading replace-drop
                        accept='image/*'
                    />
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <h4>Daily Posy (large)</h4>
                    <croppa v-model="croppa_large" 
                        :width="300" :height="300" :quality="2"
                        :zoom-speed="8" :placeholder-font-size="18"
                        canvas-color='#ccc'
                        show-loading replace-drop
                        accept='image/*'
                    />
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import Vue from 'vue';
import FormGroup from '@/layout/FormGroup.vue'
import FieldInput from '@/components/FieldInput.vue'
import Field from '@/components/Field.vue'
import Croppa from 'vue-croppa';
// import css from 'vue-croppa/dist/vue-croppa.min.css';

Vue.use(Croppa);

export default {
    props: {
        description: { type: String },  // description of the Daily Posy
    },
    components: {
        FormGroup,
        FieldInput,
        Field,
    },
    data() {
        return {
            croppa_primary: {},
            croppa_small: {},
            croppa_medium: {},
            croppa_large: {},
            x_description: this.description,
            x_duplicate: false,
            values: {},
        }
    },
    methods: {
        publish() {
            // ensure first four children of this component are input fields
            // for the primary, small, medium and large product variants
            this.$children[0].$el.value = this.croppa_primary.generateDataUrl().split(',').pop();
            this.$children[1].$el.value = this.croppa_small.generateDataUrl().split(',').pop();
            this.$children[2].$el.value = this.croppa_medium.generateDataUrl().split(',').pop();
            this.$children[3].$el.value = this.croppa_large.generateDataUrl().split(',').pop();
            console.log('Publishing Daily Posy Updates!!');
        },
    },
    watch: {
    }
}



</script>
