// Field: Handles label, input/textarea and validation message. Bind Field with v-model

<template>
  <div :class="localClasses">
    <label class="control-label" :for="vModelName()" >
      {{ label }}
    </label>
    <FieldTextArea v-if="isFieldTextArea()"
      :name="vModelName()" :id="vModelName()"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    ></FieldTextArea>
    <FieldInput v-if="isFieldInput()" 
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

export default {
  components: {
      FieldTextArea,
      FieldInput,
  },
  data: function() {
    return {
      validationMsg : '',
    }
  },
  props: {
    label: { type: String, default: 'Default Label' },
    placeholder: { type: String, default: '' },
    types: { type: String, default: 'text' },
    value: { type: String },
  },
  computed: {
    localClasses: function() {
      return [ 
        'form-group',
        this.validationMsg ? 'has-error' : '',
      ];
    },
    type: function() {
      return this.types.split(',')[0];
    },

},
  methods: {
    isFieldInput: function () {
      return (this.type!="textarea")
    },
    isFieldTextArea: function () {
      return (this.type=="textarea")
    },
    vModelName: function() {
      return property(['$vnode','data','model','expression'])(this);
    },
    handleInput: function(newVal) {
      this.validationMsg = validate(newVal, this.types);
      this.$emit('input', newVal);
    },
  },
}
</script>
