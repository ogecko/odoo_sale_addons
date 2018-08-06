import property from '@/helpers/property.js'
describe('property.js', () => {
 
    it('Extract a single property', () => {
        expect(property('a')({a:1})).toEqual(1);
    });

    it('Caters for non-existent single property', () => {
        expect(property('a')({b:1})).toBeUndefined();
    })

    it('Extract a property path', () => {
        expect(property(['a','b'])({a:{b:2,c:3}})).toEqual(2);
    });

    it('Caters for a non-existent property path', () => {
        expect(property(['a','d'])({a:{b:2,c:3}})).toBeUndefined();
    });

    it('Caters for a non-existent property path beyond object', () => {
        expect(property(['a','b','c'])({a:{b:2,c:3}})).toBeUndefined();
    });

    it('Caters for null object', () => {
        expect(property('a')(null)).toBeUndefined();
    });

    it('Caters for an empty path', () => {
        expect(property([])({a:{b:2,c:3}})).toBeUndefined();
    });

    it('Caters for an null path', () => {
        expect(property(null)({a:{b:2,c:3}})).toBeUndefined();
    });

});