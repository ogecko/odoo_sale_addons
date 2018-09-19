// Field: Handles label, input/textarea and validation message. Bind Field with v-model or :value

<template>
  <div :class="localClasses">

    <label v-if="localLabel" class="control-label" :for="id">
      {{ localLabel }}
      <small v-if="helpMsg && !isFieldCheckbox" class="text-muted">({{helpMsg}})</small>
    </label>

    <div v-if="isFieldCheckbox" class="checkbox" >
      <label >
        <FieldCheckbox 
        :name="localName" :id="id"
        :value="value"
        @input="handleInput"
      ></FieldCheckbox>
        {{ helpMsg }}
      </label>
    </div>

    <FieldTextArea v-if="isFieldTextArea"
      :name="localName" :id="id"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    ></FieldTextArea>

    <FieldInput v-if="isFieldInput" 
      :name="localName" :id="id"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldInput>

    <FieldDatePicker v-if="isFieldDatePicker" 
      :name="localName" :id="id"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldDatePicker>

    <FieldRadio v-if="isFieldRadio" 
      :name="localName" :id="id"
      :autocomplete="autocomplete"
      :options="options"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldRadio>

    <FieldInteger v-if="isFieldInteger" 
      :name="localName" :id="id"
      :autocomplete="autocomplete"
      :value="value"
      @input="handleInput"
      :min="min"
      :max="max"
    ></FieldInteger>

    <FieldAddress v-if="isFieldAddress" 
      :name="localName"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      @address-changed="handleAddressChanged"
    ></FieldAddress>

    <small v-if="validationMsg" class="help-block">
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
import FieldAddress from '@/components/FieldAddress.vue'

export default {
  components: {
      FieldTextArea, FieldInput, FieldCheckbox, FieldRadio, FieldInteger, FieldDatePicker, FieldAddress
  },
  props: {
    label: { type: String },
    name: { type: String },
    autocomplete: { type: String },
    placeholder: { type: String },
    helpMsg: { type: String },
    rules: { type: String, default: 'text' },
    value: { type: [ String, Boolean, Number ] },
    min: { type: Number },
    max: { type: Number },
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
      return this.rules.split(',')[0];
    },
    isFieldInput () {
      return (this.type!="textarea" && this.type!="boolean" && this.type!="enum" && this.type!="integer" && this.type!="date" && this.type!="address")
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
    isFieldAddress () {
      return (this.type=="address")
    },
},
  methods: {
    isRequired() {
      return this.rules.split(',').includes('required');
    },
    handleInput(newVal) {
      this.validationMsg = validate(newVal, this.rules, this);
      this.$emit('input', newVal);
    },
    handleAddressChanged(newVal) {
      this.$emit('address-changed',newVal);
    }
  },
}
</script>
