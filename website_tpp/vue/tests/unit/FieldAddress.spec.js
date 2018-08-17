import { shallowMount } from '@vue/test-utils'
import FieldAddress from '@/components/FieldAddress.vue'

global.google = { maps: { places: { Autocomplete: ()=> ({ addListener() {}}) }}};

describe('FieldAddress.vue', () => {
  it('For a text FieldAddress, renders an input', () => {
    const wrapper = shallowMount(FieldAddress, {
      propsData: {  }
    })
    expect(wrapper.find('input').attributes().type).toMatch('text');
    expect(wrapper.find('input').classes()).toContain('form-control');
  })

  it('For a text FieldAddress, can update value', () => {
    const wrapper = shallowMount(FieldAddress, {
      propsData: {  }
    })
    wrapper.setData({ value: 'test' });
    expect(wrapper.vm.value).toContain('test');
  })

  it('For a text FieldAddress, can check if value validated', () => {
    const wrapper = shallowMount(FieldAddress, {
      propsData: {  }
    })
    expect(wrapper.vm.isValidatedAddress).toEqual(false);
  })

  it('For a text FieldAddress, can ensure autocomplete set right', () => {
    const wrapper = shallowMount(FieldAddress, {
      propsData: {  }
    })
    wrapper.vm.onFocus();
    expect(wrapper.attributes().autocomplete).toEqual('new-password');
  })

})
