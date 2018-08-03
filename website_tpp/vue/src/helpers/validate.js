const checkFor = {
    required: {
        helpText: 'This field is required.',
        isMatched: s => ! /.+/.test(s),
    },
    text: {
        helpText: 'Please enter a text value into this field.',
        isMatched: s => ! (typeof(s)=='string'),
    },
    email: {
        helpText: 'Please enter a valid email address.',
        isMatched: s => !  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(s),
    },
    tel: {
        helpText: 'Please enter a valid phone number.',
        isMatched: s => ! /^[0-9()+ ]+$/.test(s),
      },
  }



export default function validate(value, terms) {

    function checkStringForRequiredTerm(acc, term) {
        const tterm = term.trim();
        const msg = ! checkFor[tterm] ? `Cannot find validation check "${tterm}".`
                    : checkFor[tterm].isMatched(value, tterm) ? checkFor[tterm].helpText
                    : undefined;

        if (msg)  acc.push(msg)

        return acc;
    }

    if (typeof terms != 'string') return '';

    // for all the comma separated terms, reduce to a list of error messages.
    return terms.split(',')
        .reduce(checkStringForRequiredTerm, [])
        .join(' ');
}