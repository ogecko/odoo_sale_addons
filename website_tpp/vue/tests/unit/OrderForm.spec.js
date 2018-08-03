import { shallowMount } from '@vue/test-utils'
import OrderForm from '@/components/OrderForm.vue'

describe('OrderForm.vue', () => {
  it('Renders a simple h3 with the label', () => {
    const wrapper = shallowMount(OrderForm, {})
  expect(wrapper.find('formgroup-stub').props()).toEqual({"label": "Sender"});
  })
})
