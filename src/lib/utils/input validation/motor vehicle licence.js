export 	const isPrivateLicence = (input) => {
    const filter = /([0-9]{4}[a-zA-Z]{2})/;
    const regex = new RegExp(filter);
    const result = regex.test(input);
    return result;
};

export 	const isServiceLicence = (input) => {
    const filter = /([a-zA-Z]{2}[0-9]{4})/;
    const regex = new RegExp(filter);
    const result = regex.test(input);
    return result;
};

export 	const universalLicenceFilter = (input) => {
    const filter = /[0-9a-zA-Z]{6}/;
    const regex = new RegExp(filter);
    const result = regex.test(input);
    return result;
};