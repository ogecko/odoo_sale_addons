import { shallowMount } from '@vue/test-utils'
import FieldInteger from '@/components/FieldInteger.vue'

describe('FieldInteger.vue', () => {
  it('For a text FieldInteger, renders an input', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: {  }
    })
    expect(wrapper.find('div').classes()).toContain('input-group');
    expect(wrapper.find('input').attributes().type).toMatch('text');
  })

  it('Should be able to increment the integer', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20 }
    })
    wrapper.vm.incValue(); 
    expect(wrapper.vm.localValue).toEqual(21);
  })

  it('Should be able to decrement the integer', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20 }
    })
    wrapper.vm.decValue(); 
    expect(wrapper.vm.localValue).toEqual(19);
  })

})
