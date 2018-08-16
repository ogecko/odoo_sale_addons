import { mount } from '@vue/test-utils'
import OrderForm from '@/forms/OrderForm.vue'

describe('OrderForm.vue', () => {
  it('Renders a simple h3 with the label', () => {
    const wrapper = mount(OrderForm, {
      stubs: {
        OrderFormDelivery: true,
      }
    })
    expect(wrapper.find('h1').text()).toMatch('Harness');
  })
})
