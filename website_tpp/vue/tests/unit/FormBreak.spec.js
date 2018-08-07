import { shallowMount } from '@vue/test-utils'
import FormBreak from '@/layout/FormBreak.vue'

describe('FormBreak.vue', () => {
  it('Renders a simple div with clearfix class', () => {
    const wrapper = shallowMount(FormBreak, {
      propsData: { }
    })
    expect(wrapper.find('div').classes()).toContain('clearfix');
  })
})
