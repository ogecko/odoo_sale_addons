import validate from '@/helpers/validate.js'
describe('validate.js', () => {
 
    it('Cater for no parameters', () => {
        expect(validate()).toEqual('');
    })

    it('Cater for no checks', () => {
        expect(validate('sample string')).toEqual('');
    })

    it('Will highlight if check is not available', () => {
        expect(validate('sample string','garbage')).toEqual('Cannot find validation check "garbage".');
    })

    it('Can check for a required field', () => {
        expect(validate('','required')).toEqual('This field is required.');
    })

    it('Can confirm a required field is present', () => {
        expect(validate('ok','required')).toEqual('');
    })

    it('Can check for an invalid email field', () => {
        expect(validate('joe','email')).toEqual('Please enter a valid email address.');
    })

    it('Can check for an invalid and required email field', () => {
        expect(validate('','email,required')).toEqual('Please enter a valid email address. This field is required.');
    })

    it('Allow for spaces between check terms', () => {
        expect(validate('','email, required')).toEqual('Please enter a valid email address. This field is required.');
    })

    it('Can confirm a valid email', () => {
        expect(validate('joe@gmail.com','email')).toEqual('');
    })

    it('Can check for an invalid tel field', () => {
        expect(validate('joe','tel')).toEqual('Please enter a valid phone number.');
    })

    it('Can confirm a valid tel', () => {
        expect(validate('02 3457 8923','tel')).toEqual('');
    })

    it('Can check for an invalid text field', () => {
        expect(validate(9,'text')).toEqual('Please enter a text value into this field.');
    })

    it('Can confirm a valid text', () => {
        expect(validate('02 3457 8923','text')).toEqual('');
    })

})
  