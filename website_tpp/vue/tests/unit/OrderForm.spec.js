import { shallowMount } from '@vue/test-utils'
import OrderForm from '@/forms/OrderForm.vue'

describe('OrderForm.vue', () => {
  it('Renders a simple h3 with the label', () => {
    const wrapper = shallowMount(OrderForm, {})
    expect(wrapper.find('orderformsender-stub').props().name).toBeDefined();
  })
})
