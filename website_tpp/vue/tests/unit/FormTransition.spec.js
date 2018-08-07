import { shallowMount } from '@vue/test-utils'
import FormTransition from '@/layout/FormTransition.vue'

describe('FormTransition.vue', () => {
  it('Renders a simple div with name slide', () => {
    const wrapper = shallowMount(FormTransition, {
      propsData: { }
    })
    expect(wrapper.find('div').attributes().name).toEqual('slide');
  })

})
