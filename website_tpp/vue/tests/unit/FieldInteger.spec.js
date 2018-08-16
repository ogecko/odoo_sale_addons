import { shallowMount } from '@vue/test-utils'
import FieldInteger from '@/components/FieldInteger.vue'

describe('FieldInteger.vue', () => {
  it('For a text FieldInteger, renders an input', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: {  }
    })
    expect(wrapper.find('div').classes()).toContain('input-group');
    expect(wrapper.find('input').attributes().type).toMatch('text');
  })

  it('Should be able to increment the integer', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20 }
    })
    wrapper.vm.incValue(); 
    expect(wrapper.vm.localValue).toEqual(21);
  })

  it('Should be able to decrement the integer', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20 }
    })
    wrapper.vm.decValue(); 
    expect(wrapper.vm.localValue).toEqual(19);
  })


  it('Should be able to increment the integer but not past its max', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20, min: 18 }
    })
    wrapper.vm.decValue(); 
    wrapper.vm.decValue(); 
    wrapper.vm.decValue(); 
    wrapper.vm.decValue(); 
    expect(wrapper.vm.localValue).toEqual(18);
  })

  it('Should clamp the initial value to within min and max', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20, min: 5, max: 10 }
    })
    expect(wrapper.vm.localValue).toEqual(10);
  })

  it('Should clamp any changed value to within min and max', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 2, min: 5, max: 10 }
    })
    wrapper.setProps({ value: 30});
    expect(wrapper.vm.localValue).toEqual(10);
  })
  
  it('Should re-clamp when the min is changed', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 2, min: 5, max: 10 }
    })
    wrapper.setProps({ min: 7});
    expect(wrapper.vm.localValue).toEqual(7);
  })

  it('Should re-clamp when the max is changed', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20, min: 5, max: 10 }
    })
    wrapper.setProps({ max: 8});
    expect(wrapper.vm.localValue).toEqual(8);
  })

  it('Should update localValue when new value is sent down via props', () => {
    const wrapper = shallowMount(FieldInteger, {
      propsData: { value: 20 }
    })
    wrapper.setProps({ value: 30});
    expect(wrapper.vm.localValue).toEqual(30);
  })

})
