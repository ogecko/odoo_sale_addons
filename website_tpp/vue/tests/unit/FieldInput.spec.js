import { shallowMount } from '@vue/test-utils'
import FieldInput from '@/components/FieldInput.vue'

describe('FieldInput.vue', () => {
  it('Renders a simple field input with a label', () => {
    const wrapper = shallowMount(FieldInput, {
      propsData: { label: 'title' }
    })
  expect(wrapper.find('label').text()).toMatch('title');
  })
})
