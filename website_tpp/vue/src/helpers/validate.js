const validationFunctions = {
    // <text> checks
    required(s) {
        if (!s || !(s.length > 0))
            return 'This field is required.';
    },
    days(str) {
        if (typeof str!='string') return 'Please enter a text value into this field.';
        const msg=str.split(',')
            .map(s => s.trim())
            .filter(s => !/^[0-9]{1,2}[-./][a-zA-Z0-9]{1,3}[-./][0-9]{2,4}$/.test(s))
            .map(s => '"'+s+'"')
            .join(',');
        /* istanbul ignore else */
        if (msg) return 'Please enter dates, separated by commas.'+ (msg.length > 2 ? ' Need to change '+msg : '');
    },
    date(str) {
        if (!/^[0-9]{1,2}[-./][a-zA-Z0-9]{1,3}[-./][0-9]{2,4}$/.test(str))
            return 'Please choose or enter a valid date.';
    },
    // <input> types
    text(s) {
        if (typeof s!='string')
            return 'Please enter a text value into this field.';
    },
    email(s) {
        if (!/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*|)$/.test(s))
            return 'Please enter a valid email address.';
    },
    tel(s) {
        if (!/^([0-9()+ ]{0,20}|)$/.test(s))
            return 'Please enter a valid phone number.';
    },
    // <textarea> types
    textarea(s) {
        if (typeof s !='string')
            return 'Please enter a text value into this field.';
    },
    // <checkbox> types
    boolean(v) {
        if (typeof v !='boolean')
            return 'Please enter a true or false value into this field.';
    },
    // <radio> types
    enum(s) {
        if (typeof s !='string')
            return 'Please choose one of the options.';
    },
    // <integer> types
    integer(n) {
        if (typeof n !='number')
            return 'Please enter a whole number.';
    },
}


export default function validate(value, terms) {

    function checkValueForValidationReqirements(acc, term) {
        const tterm = term.trim();
        const msg = !validationFunctions[tterm] ? `Cannot find validation check "${tterm}".`
            : validationFunctions[tterm](value); //call the validationFunction
        if (msg)  acc.push(msg)

        return acc;
    }

    if (typeof terms != 'string') return '';

    // for all the comma separated terms, reduce to a list of error messages.
    return terms.split(',')
        .reduce(checkValueForValidationReqirements, [])
        .join(' ');
}