import { shallowMount } from '@vue/test-utils'
import FieldCheckbox from '@/components/FieldCheckbox.vue'

describe('FieldCheckbox.vue', () => {
  it('Renders an input as a checkbox', () => {
    const wrapper = shallowMount(FieldCheckbox, {
      propsData: { }
    })
    expect(wrapper.find('input').attributes().type).toMatch('checkbox');
  })

  it('Should emit when localValue changes', () => {
    const wrapper = shallowMount(FieldCheckbox, {
      propsData: {  }
    })
    wrapper.setData({ localValue: true});
    expect(wrapper.emitted()).toEqual({ input: [ [ true ] ] });
  })

  it('Should update localValue when new value is sent down via props', () => {
    const wrapper = shallowMount(FieldCheckbox, {
      propsData: { value: false }
    })
    wrapper.setProps({ value: true});
    expect(wrapper.vm.localValue).toEqual(true);
  })

})
