import { shallowMount } from '@vue/test-utils'
import FieldInput from '@/components/FieldInput.vue'

describe('FieldInput.vue', () => {
  it('For a text FieldInput, renders an input', () => {
    const wrapper = shallowMount(FieldInput, {
      propsData: {  }
    })
    expect(wrapper.find('input').attributes().type).toMatch('text');
    expect(wrapper.find('input').classes()).toContain('form-control');
  })

  it('Should emit when localValue changes', () => {
    const wrapper = shallowMount(FieldInput, {
      propsData: {  }
    })
    wrapper.setData({ localValue: 'test'});
    expect(wrapper.emitted()).toEqual({ input: [ [ 'test' ] ] });
  })

  it('Should update localValue when new value is sent down via props', () => {
    const wrapper = shallowMount(FieldInput, {
      propsData: { value: 'a' }
    })
    wrapper.setProps({ value: 'abc'});
    expect(wrapper.vm.localValue).toEqual('abc');
  })

})
