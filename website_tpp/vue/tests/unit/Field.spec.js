import { shallowMount } from '@vue/test-utils'
import Field from '@/components/Field.vue'

describe('Field.vue', () => {
  it('For a text field, renders a label, input and validation elements', () => {
    const wrapper = shallowMount(Field, {
      propsData: { label: 'title', value: '123', helpMsg: 'help me' }
    })
    expect(wrapper.find('label').text()).toMatch('title');
    expect(wrapper.find('fieldinput-stub').attributes().type).toEqual('text');
  })

  it('For a textarea field, renders a label, textarea and validation elements', () => {
    const wrapper = shallowMount(Field, {
      propsData: { label: 'title', rules: "textarea", placeholder: 'place', value: '123' }
    })
    expect(wrapper.find('label').text()).toMatch('title');
    expect(wrapper.find('fieldtextarea-stub').attributes().placeholder).toEqual('place');
  })

  it('Checks that a required field is actually non empty', () => {
    const wrapper = shallowMount(Field, {
      propsData: { label: 'title', rules: 'required', value: '123' }
    })
    wrapper.vm.handleInput('');
    expect(wrapper.find('small').text()).toEqual('This field is required.');
  })



})
