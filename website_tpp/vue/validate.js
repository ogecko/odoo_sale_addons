const validationTerms = {
    required: {
      isMatched: s => ! /.+/.test(s),
      helpState: 'isError', helpText: 'This field is required.',
    },
    email: {
      isMatched: s => !  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(s),
      helpState: 'isError', helpText: 'Please enter a valid email address.',
    },
    tel: {
        isMatched: s => ! /^[0-9()+ ]+$/.test(s),
        helpState: 'isError', helpText: 'Please enter a valid phone number.',
      },
  }



export default function validate(str, types) {

    function checkStringForErrorMessage(acc, type) {
        if (validationTerms[type] && validationTerms[type].isMatched(str)) {
            acc.push(validationTerms[type].helpText)
        }
        return acc;
    }

    if (typeof types != 'string') return '';

    // for all the comma separated types, reduce to a list of error messages.
    return types.split(',')
        .reduce(checkStringForErrorMessage, [])
        .join(' ');
}