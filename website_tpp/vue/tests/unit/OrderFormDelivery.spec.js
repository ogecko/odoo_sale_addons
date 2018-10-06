import { mount } from '@vue/test-utils'
import OrderFormDelivery from '@/forms/OrderFormDelivery.vue'
import moment from 'moment';

global.moment = moment;
global.google = { maps: { places: { Autocomplete: ()=> ({ addListener() {}}) }}};
global.jQuery = () => ({ datetimepicker() {}, on() {}, data:()=>({ setDate() {}, show() {}, hide() {}, destroy() {} }) });

describe('OrderFormDelivery.vue', () => {
  it('Renders a simple post form', () => {
    const wrapper = mount(OrderFormDelivery, {
    })
    expect(wrapper.find('form').attributes().method).toMatch('post');
  })

  it('Can update x_days the expected delivery days', () => {
    const wrapper = mount(OrderFormDelivery, {
      propsData: { start: '03-Aug-2018', number: 4, freq: 'Daily' }
    })
    wrapper.vm.updateDeliveryDays();
    expect(wrapper.vm.x_days).toMatch('03-Aug-2018, 04-Aug-2018, 06-Aug-2018, 07-Aug-2018');
  })


  it('Can update x_days when the start date is changed', () => {
    const wrapper = mount(OrderFormDelivery, {
      propsData: { start: '01-Aug-2018', number: 4, freq: 'Daily' }
    })
    wrapper.setData({ x_start: '02-Aug-2018'});
    expect(wrapper.vm.x_days).toMatch('02-Aug-2018, 03-Aug-2018, 04-Aug-2018, 06-Aug-2018');
  })  

  // it('Can update x_days when the freq of delivery days is changed', () => {
  //   const wrapper = mount(OrderFormDelivery, {
  //     propsData: { start: '01-Aug-2018', number: 4, freq: 'Daily' }
  //   })
  //   wrapper.setData({ x_freq: 'Weekly'});
  //   expect(wrapper.vm.x_days).toMatch('01-Aug-2018, 08-Aug-2018, 15-Aug-2018, 22-Aug-2018');
  // })  

})
