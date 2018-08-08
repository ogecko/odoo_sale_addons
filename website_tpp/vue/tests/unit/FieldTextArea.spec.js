import { shallowMount } from '@vue/test-utils'
import FieldTextArea from '@/components/FieldTextArea.vue'

describe('FieldTextArea.vue', () => {
  it('For a text FieldTextArea, renders an textarea', () => {
    const wrapper = shallowMount(FieldTextArea, {
      propsData: {  }
    })
    expect(wrapper.find('textarea').classes()).toContain('form-control');
  })

  it('Should emit when localValue changes', () => {
    const wrapper = shallowMount(FieldTextArea, {
      propsData: {  }
    })
    wrapper.setData({ localValue: 'test'});
    expect(wrapper.emitted()).toEqual({ input: [ [ 'test' ] ] });
  })

  it('Should update localValue when new value is sent down via props', () => {
    const wrapper = shallowMount(FieldTextArea, {
      propsData: { value: 'abc' }
    })
    wrapper.setProps({ value: 'def'});
    expect(wrapper.vm.localValue).toEqual('def');
  })
  
})
