import cardMessageSample from '@/helpers/cardMessageSample.js'

describe('cardMessageSample.js', () => {
 
    it('Caters for no parameters', () => {
        expect(typeof cardMessageSample()).toEqual('string');
    })

    it('Generates a birthday message', () => {
        expect(cardMessageSample('Birthday')).toMatch(/Birthday/i);
    })
 
});