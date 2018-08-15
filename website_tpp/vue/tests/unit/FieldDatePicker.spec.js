import { shallowMount } from '@vue/test-utils'
import FieldDatePicker from '@/components/FieldDatePicker.vue'

// stub globals
global.moment = () => ({ local() {}});
global.jQuery = () => ({ datetimepicker() {}, on() {}, data:()=>({ setDate() {}, show() {}, hide() {}, destroy() {} }) });


describe('FieldDatePicker.vue', () => {
  it('For a text FieldDatePicker, renders an input in an input-group', () => {

    const wrapper = shallowMount(FieldDatePicker, {
      propsData: {  }
    })
    expect(wrapper.find('div').classes()).toContain('input-group');
    expect(wrapper.find('input').classes()).toContain('form-control');
  })

  it('Should emit when localValue changes', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: {  }
    })
    wrapper.setData({ localValue: 'test'});
    expect(wrapper.emitted()).toEqual({ input: [ [ 'test' ] ] });
  })

  it('Should update localValue when new value is sent down via props', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    })
    wrapper.setProps({ value: 'abc'});
    expect(wrapper.vm.localValue).toEqual('abc');
  })

  it('Should show when focus', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    })
    wrapper.vm.showDatePicker();
    expect(wrapper.vm.localValue).toEqual('a');
  })

  it('Should hide when blur', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    })
    wrapper.vm.hideDatePicker();
    expect(wrapper.vm.localValue).toEqual('a');
  })

  it('Should register events', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    })
    wrapper.vm.registerEvents();
    expect(wrapper.vm.localValue).toEqual('a');
  })

  it('Should handle when date picker changes with a junk date', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    })
    wrapper.vm.handleDatePickerChange({ junk: undefined });
    expect(wrapper.vm.localValue).toEqual(null);
  })

  it('Should handle when date picker changes with a valid date', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    })
    wrapper.vm.handleDatePickerChange({ date: { format() { return '01-Aug-2018' }} });
    expect(wrapper.vm.localValue).toEqual('01-Aug-2018');
  })

  it('Should clean up when widget is destroyed', () => {
    const wrapper = shallowMount(FieldDatePicker, {
      propsData: { value: 'a' }
    }).destroy();
  })
})
