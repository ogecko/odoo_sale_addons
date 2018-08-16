import { mount } from '@vue/test-utils'
import OrderFormSender from '@/forms/OrderFormSender.vue'

describe('OrderFormSender.vue', () => {
  it('Renders a simple post form', () => {
    const wrapper = mount(OrderFormSender, {
    })
    expect(wrapper.find('form').attributes().method).toMatch('post');
  })

  it('Allows automatic selection of card message', () => {
    const wrapper = mount(OrderFormSender, {
    })
    wrapper.vm.getCardMessage('Birthday');
    expect(wrapper.vm.x_message).toMatch(/Birthday/i);
  })

})
