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

})
