// Field: Handles label, input/textarea and validation message. Bind Field with v-model

<template>
  <div :class="localClasses">

    <label class="control-label" :for="vModelName()">
      {{ localLabel }}
      <small v-if="helpMsg && !isFieldCheckbox" class="text-muted">({{helpMsg}})</small>
    </label>

    <div  class="checkbox">
      <label v-if="isFieldCheckbox">
        <FieldCheckbox 
        :name="vModelName()" :id="vModelName()"
        :value="value"
        @input="handleInput"
      ></FieldCheckbox>
        {{ helpMsg }}
      </label>
    </div>


    <FieldTextArea v-if="isFieldTextArea"
      :name="vModelName()" :id="vModelName()"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    ></FieldTextArea>

    <FieldInput v-if="isFieldInput" 
      :name="vModelName()" :id="vModelName()"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="handleInput"
    ></FieldInput>

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

export default {
  components: {
      FieldTextArea,
      FieldInput,
      FieldCheckbox,
  },
  data: function() {
    return {
      validationMsg : '',
    }
  },
  props: {
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    helpMsg: { type: String, default: '' },
    types: { type: String, default: 'text' },
    value: { type: [ String, Boolean ] },
  },
  computed: {
    localClasses: function() {
      return [ 
        'form-group',
        this.validationMsg ? 'has-error' : '',
      ];
    },
    localLabel: function() {
      return this.label + (this.isRequired() ? ' *' : '');
    },
    type: function() {
      return this.types.split(',')[0];
    },
    isFieldInput: function () {
      return (this.type!="textarea" && this.type!="boolean")
    },
    isFieldTextArea: function () {
      return (this.type=="textarea")
    },
    isFieldCheckbox: function () {
      return (this.type=="boolean")
    },
},
  methods: {
    vModelName: function() {
      return property(['$vnode','data','model','expression'])(this);
    },
    isRequired: function() {
      return this.types.split(',').includes('required');
    },
    handleInput: function(newVal) {
      this.validationMsg = validate(newVal, this.types);
      this.$emit('input', newVal);
    },
  },
}
</script>
