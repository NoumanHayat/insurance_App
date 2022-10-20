/** This filter stage is used to check if the phone number submitted is only comprised of legal
 * 	characters.
 */
export const phoneNumFilterStage1 = (input) => {
    const filter1 = new RegExp("[^0-9-()+ ]", "g"); //checking for legal characters
    const result1 = filter1.test(input);
    if (result1) return false;
    return true;
}

/** This filter stage is used to check if the number of characters submitted is legal. */
export const phoneNumFilterStage2 = (input) => {
    const filter2 = new RegExp("[^0-9]", "g"); //checking for anything that is not a number
    const modString1 = input.replace(filter2, "");
    if (!(modString1.length == 10 || modString1.length == 11)) {
        return {
            valid: false,
            modString1
        }; //the number of digits is incorrect
    } else {
        return {
            valid: true,
            modString1
        };
    }
}

/** After it is determined that the number of characters is legal, this filter is then used to
 * 	determine if there is an illegal '1' digit at the beginning of the phone number submitted.
 */
export const phoneNumFilterStage3 = (modString1) => {
    const filter3 = new RegExp("^1"); //checking if first digit is one

    if (modString1.length == 11) {
        const result2 = filter3.test(modString1);
        if (result2) { // number is valid and begins with 1
            const modString2 = modString1.slice(1);
            return {
                valid: true,
                phoneNumber: modString2
            };
        } else {
            return {
                valid: false,
                phoneNumber: undefined
            };
        }
    } else {
        const result3 = filter3.test(modString1);
        if (result3) {
            return {
                valid: false, // Illegal value of 1 at the beginning of 10-digit input
                phoneNumber: undefined
            };
        }
        return {
            valid: true,
            phoneNumber: modString1
        };
    }
}

export const phoneNumFilter = (input, setExtracted) => {
    const filter1 = new RegExp("[^0-9-()+ ]", "g"); //checking for legal characters
    const filter2 = new RegExp("[^0-9]", "g"); //checking for anything that is not a number
    const filter3 = new RegExp("^1"); //checking if first digit is one

    const result1 = filter1.test(input);

    if (result1) {
        // there are illegal characters present
        return false;
    } else {
        const modString1 = input.replace(filter2, "");
        if (!(modString1.length == 10 || modString1.length == 11)) {
            //the number of digits is incorrect
            return false;
        } else {
            if (modString1.length == 11) {
                const result2 = filter3.test(modString1);
                if (result2) {
                    // number begins with 1
                    const modString2 = modString1.slice(1);
                    setExtracted(modString2);
                    return true;
                } else {
                    // "11 digit values must begin with a 1"
                    return false;
                }
            } else {
                const result3 = filter3.test(modString1);
                if (result3) {
                    // Illegal value of 1 at the beginning of 10-digit input
                    return false;
                }
                setExtracted(modString1);
                return true;
            }
        }
    }
};