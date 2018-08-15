// Field: Handles label, input/textarea and validation message. Bind Field with v-model or :value

<template>
  <div :class="localClasses">

    <label class="control-label" :for="localName">
      {{ localLabel }}
      <small v-if="helpMsg && !isFieldCheckbox" class="text-muted">({{helpMsg}})</small>
    </label>

    <div v-if="isFieldCheckbox" class="checkbox" >
      <label >
        <FieldCheckbox 
        :name="localName" :id="localName"
        :value="value"
        @input="handleInput"
      ></FieldCheckbox>
        {{ helpMsg }}
      </label>
    </div>

    <FieldTextArea v-if="isFieldTextArea"
      :name="localName" :id="localName"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    ></FieldTextArea>

    <FieldInput v-if="isFieldInput" 
      :name="localName" :id="localName"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldInput>

    <FieldDatePicker v-if="isFieldDatePicker" 
      :name="localName" :id="localName"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldDatePicker>

    <FieldRadio v-if="isFieldRadio" 
      :name="localName" :id="localName"
      :options="options"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldRadio>

    <FieldInteger v-if="isFieldInteger" 
      :name="localName" :id="localName"
      :value="value"
      @input="handleInput"
    ></FieldInteger>

    <small class="help-block">
      {{ validationMsg }}
    </small>
  </div>
</template>

<script>
import validate from '@/helpers/validate.js';
import property from '@/helpers/property.js';
import FieldTextArea from '@/components/FieldTextArea.vue'
import FieldInput from '@/components/FieldInput.vue'
import FieldCheckbox from '@/components/FieldCheckbox.vue'
import FieldRadio from '@/components/FieldRadio.vue'
import FieldInteger from '@/components/FieldInteger.vue'
import FieldDatePicker from '@/components/FieldDatePicker.vue'

export default {
  components: {
      FieldTextArea, FieldInput, FieldCheckbox, FieldRadio, FieldInteger, FieldDatePicker,
  },
  props: {
    label: { type: String, default: '' },
    name: { type: String },
    placeholder: { type: String, default: '' },
    helpMsg: { type: String, default: '' },
    types: { type: String, default: 'text' },
    value: { type: [ String, Boolean, Number ] },
    options: { type: Array },
  },
  data() {
    return {
      validationMsg : '',
      id: null,
    }
  },
  mounted() {
    this.id = this._uid;
  },
  computed: {
    localName() {   // use the explicit name, the v-model binding name, the label or the Vue uid
      const vModelName = property(['$vnode','data','model','expression'])(this);
      const labelName = this.label ? this.label.replace(/ /g,'_').toLowerCase() : '';
      return this.name ? this.name : 
            vModelName ? vModelName : 
            labelName ? labelName : 
            this.id;
    },
    localClasses() {
      return [ 
        'form-group',
        this.validationMsg ? 'has-error' : '',
      ];
    },
    localLabel() {
      return this.label + (this.isRequired() ? ' *' : '');
    },
    type() {
      return this.types.split(',')[0];
    },
    isFieldInput () {
      return (this.type!="textarea" && this.type!="boolean" && this.type!="enum" && this.type!="integer" && this.type!="date")
    },
    isFieldTextArea () {
      return (this.type=="textarea")
    },
    isFieldCheckbox () {
      return (this.type=="boolean")
    },
    isFieldRadio () {
      return (this.type=="enum")
    },
    isFieldInteger () {
      return (this.type=="integer")
    },
    isFieldDatePicker () {
      return (this.type=="date")
    },
},
  methods: {
    isRequired() {
      return this.types.split(',').includes('required');
    },
    handleInput(newVal) {
      this.validationMsg = validate(newVal, this.types);
      this.$emit('input', newVal);
    },
  },
}
</script>
