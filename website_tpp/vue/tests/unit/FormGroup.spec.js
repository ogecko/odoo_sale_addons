import { shallowMount } from '@vue/test-utils'
import FormGroup from '@/components/FormGroup.vue'

describe('FormGroup.vue', () => {
  it('Renders a simple h3 with the label', () => {
    const wrapper = shallowMount(FormGroup, {
      propsData: { label: 'title' }
    })
  expect(wrapper.find('h3').text()).toMatch('title');
  })
})
