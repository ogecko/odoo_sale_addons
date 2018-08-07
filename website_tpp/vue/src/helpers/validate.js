const checkFor = {
    // validation types
    required: {
        validationMsg: 'This field is required.',
        isValid: s => /.+/.test(s),
    },

    // <input> types
    text: {
        validationMsg: 'Please enter a text value into this field.',
        isValid: s => (typeof(s)=='string'),
    },
    email: {
        validationMsg: 'Please enter a valid email address.',
        isValid: s => /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*|)$/.test(s),
    },
    tel: {
        validationMsg: 'Please enter a valid phone number.',
        isValid: s => /^([0-9()+ ]{0,20}|)$/.test(s),
      },

    // <textarea> types
    textarea: {
        validationMsg: 'Please enter a text value into this field.',
        isValid: s => (typeof(s)=='string'),
    },

    // <checkbox> types
    boolean: {
        validationMsg: 'Please enter a true or false value into this field.',
        isValid: s => (typeof(s)=='boolean'),
    },

}



export default function validate(value, terms) {

    function checkStringForRequiredTerm(acc, term) {
        const tterm = term.trim();
        const msg = ! checkFor[tterm] ? `Cannot find validation check "${tterm}".`
                    : checkFor[tterm].isValid(value, tterm) ? undefined
                    : checkFor[tterm].validationMsg;

        if (msg)  acc.push(msg)

        return acc;
    }

    if (typeof terms != 'string') return '';

    // for all the comma separated terms, reduce to a list of error messages.
    return terms.split(',')
        .reduce(checkStringForRequiredTerm, [])
        .join(' ');
}