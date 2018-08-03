<template>
  <div :class="listClasses()">
    <label class="control-label" :for="name" >
      {{ label }}
    </label>
    <textarea v-if="isTextArea()" 
      class="form-control"
      @input="onInput" 
      :placeholder="placeholder"
      rows=3></textarea>
    <input v-if="isInput()" :type=type
      class="form-control" 
      :value="value"
      @input="onInput" 
      :name="name" 
      :placeholder="placeholder">
    <small class="help-block">
      {{helpText}}
    </small>
  </div>
</template>

<script>
import validate from '@/helpers/validate.js';

export default {
  data: function() {
    return {
      helpText: '',
    }
  },
  props: {
    label: { type: String, default: 'Default Label' },
    name: { type: String, default: 'Name' },
    placeholder: { type: String, default: '' },
    value: { type: String },
    types: { type: String, default: 'text' },
  },
  computed: {
    type: function() {
      return this.types.split(',')[0];
    },
    helpState: function() {
      return this.helpText ? 'isError' : '';
    }
},
  methods: {
    isInput: function () {
      return (this.type!="textarea")
    },
    isTextArea: function () {
      return (this.type=="textarea")
    },
    listClasses: function() { 
      return {
        'form-group': true, 
        'has-error': this.helpState=="isError", 
        'has-warning': this.helpState=="isWarning", 
        'has-success': this.helpState=="isSuccess", 
      }
    },
    check: function(s) {
      this.helpText=validate(s, this.types);
    },
    onInput: function(event) {
      this.check(event.target.value);
      this.$emit('input', event.target.value);
    },
  },
}
</script>
