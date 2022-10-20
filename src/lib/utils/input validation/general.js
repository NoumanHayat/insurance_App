export 	const isNumeric = (input) => {
    const filter = new RegExp("^[0-9]+$");
    return filter.test(input);
};

export const isAlphanumeric = (input) => {
    const filter = new RegExp("^[a-zA-Z0-9]+$");
    return filter.test(input);
}

export const isAlphabetical = (input) => {
    const filter = new RegExp("^[a-zA-Z]+$");
    return filter.test(input);
}

export 	const isNumericWithBlankspace = (input) => {
    const filter = new RegExp("^[0-9 ]+$");
    return filter.test(input);
};


export const isAlphanumericWithBlankspace = (input) => {
    const filter = new RegExp("^[a-zA-Z0-9 ]+$");
    return filter.test(input);
}

export const isAlphabeticalWithBlankspace = (input) => {
    const filter = new RegExp("^[a-zA-Z ,.'-]+$");
    return filter.test(input);
}

/** This function was designed to edit the contents of the input fields such as those for the TRN and Credit Card
 *  @param {String} string - The string to be edited
 *  @param {Number} numberOfDigits - The number of digits in a group
 *  @param {String} delimiter - The delimiter to be placed between each group
 *  @returns {String} - It returns a formatted string with a hyphen inserted between each group.
 */
 export const addDelimiterToString = (string, numberOfDigits, delimiter) => {

    const filter = new RegExp(`.{${numberOfDigits}}`, "g")

    const result = string?.match(filter)
    const newString = result?.join(delimiter)
    return newString;
}

