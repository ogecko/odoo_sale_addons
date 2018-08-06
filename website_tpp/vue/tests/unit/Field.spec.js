import { shallowMount } from '@vue/test-utils'
import Field from '@/components/Field.vue'

describe('Field.vue', () => {
  it('For a text field, renders a label, input and validation elements', () => {
    const wrapper = shallowMount(Field, {
      propsData: { label: 'title' }
    })
    expect(wrapper.find('label').text()).toMatch('title');
    expect(wrapper.find('fieldinput-stub').attributes().type).toEqual('text');
    expect(wrapper.find('small').classes()).toContain('help-block');
  })

  it('For a textarea field, renders a label, textarea and validation elements', () => {
    const wrapper = shallowMount(Field, {
      propsData: { label: 'title', types: "textarea", placeholder: 'place' }
    })
    expect(wrapper.find('label').text()).toMatch('title');
    expect(wrapper.find('fieldtextarea-stub').attributes().placeholder).toEqual('place');
    expect(wrapper.find('small').classes()).toContain('help-block');
  })

  it('Checks that a required field is actually non empty', () => {
    const wrapper = shallowMount(Field, {
      propsData: { label: 'title', types: 'required' }
    })
    wrapper.vm.handleInput('');
    expect(wrapper.find('small').text()).toEqual('This field is required.');
  })



})
