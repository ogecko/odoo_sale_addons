<template>
    <div class="input-group date">
        <div class="input-group-addon">
            <i class="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <input 
            class="form-control date-style"
            type="text"
            :placeholder="placeholder"
            v-model="localValue"
            :name="name"
            :id="id"
            @focus="showDatePicker"
            @blur="hideDatePicker"
        >
    </div>
</template>

<style>
    .date-style {
        max-width: 21rem;
    }
    tbody tr td.day.disabled {
        background-color: #f2dede;
    }
</style>

<script>
  /* global jQuery, moment */
  import { next90DeliveryDays } from '@/helpers/deliveryDays.js'

  export default {
    data() {
      return {
        localValue: this.value,
        elem: null,
        dp: null,
      }
    },
    props: {
      type: { type: String, default: 'text' },
      value: { type: String },  
      name: { type: String },
      id: { type: String },
      placeholder: { type: String, default: '' },
      enabledDates: { type: Array, default: undefined },
    },
    computed: {
    },
    mounted() {
        moment().local();
        this.elem = jQuery(this.$el)
        this.elem.datetimepicker({ 
            format: 'DD-MMM-YYYY', 
            pickTime: false,
            enabledDates: next90DeliveryDays(),
        });
        this.dp = this.elem.data('DateTimePicker');
        this.setDatePickerDate(this.localValue);
        this.elem.on('dp.change', this.handleDatePickerChange);
        this.registerEvents();
    },
    beforeDestroy() {
      /* istanbul ignore else */
      if (this.dp) {
        this.dp.destroy();
        this.dp = null;
        this.elem = null;
      }
    },
    watch: {
      value(newVal) {
        this.localValue = newVal;
        // this.setDatePickerDate(newVal);
      },
      localValue(newVal) {
        this.$emit('input',newVal);
      },
    },
    methods: {
      handleDatePickerChange(event) {
          const formattedDate = event.date ? event.date.format(this.dp.format) : null;
          this.localValue = formattedDate;
      },
      showDatePicker() {
          this.dp.show();
      },
      hideDatePicker() {
          this.dp.hide();
      },
      setDatePickerDate(newVal) {
          this.dp && this.dp.setDate(newVal || null)
      },
      registerEvents() {
        const events = ['hide', 'show', 'change', 'error', 'update'];
        events.forEach((name) => {
          /* istanbul ignore next */
          this.elem.on(`dp.${name}`, (...args) => this.$emit(`dp-${name}`, ...args));
        });
      },
    },
  }
</script>
