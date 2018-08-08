import { shallowMount } from '@vue/test-utils'
import FieldRadio from '@/components/FieldRadio.vue'

describe('FieldRadio.vue', () => {
  it('Renders a group of buttons', () => {
    const wrapper = shallowMount(FieldRadio, {
      propsData: { value: 'three', options: ['one', 'two', 'three'] }
    })
    expect(wrapper.find('div').classes()).toContain('btn-group');
    expect(wrapper.find('.btn-primary').text()).toEqual('three');
  })

  it('Should emit when localValue changes', () => {
    const wrapper = shallowMount(FieldRadio, {
        propsData: { value: 'three', options: ['one', 'two', 'three'] }
      })
    wrapper.setData({ localValue: 'two'});
    expect(wrapper.emitted()).toEqual({ input: [ [ 'two' ] ] });
  })

  it('Should update localValue when new value is sent down via props', () => {
    const wrapper = shallowMount(FieldRadio, {
      propsData: { value: 'three', options: ['one', 'two', 'three'] }
    })
    wrapper.setProps({ value: 'two'});
    expect(wrapper.vm.localValue).toEqual('two');
  })

})
