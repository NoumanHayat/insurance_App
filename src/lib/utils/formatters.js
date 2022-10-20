import moment from "moment";

export const getTime12Hr = (time24Hr) => {
	const time12Hr = new Date("1970-01-01T" + time24Hr + "Z").toLocaleTimeString(
		"en-US",
		{ timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
	);
	return time12Hr;
};

export const getFormattedDate = (dateString) => {
	var options = { year: "numeric", month: "long", day: "numeric" };
	const date = new Date(dateString).toLocaleDateString("en-US", options);
	return date;
};

// export const getDateTime = (unformatted) => {
// 	let [date, time] = unformatted.split(" ");
// 	const formattedDate = getFormattedDate(date);
// 	const formattedTime = getTime12Hr(time);
// 	return formattedTime + " " + formattedDate;
// };

export const getFormattedCurrency = (unformatted) => {
	const formatter = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	const formattedCurrency = formatter.format(unformatted);
	return formattedCurrency;
};

export const getDateTime = (unformatted) => {
	const formatted = moment(unformatted).format("LLL")
	return formatted;
};

/** Returns the date in the "MM/DD/YYYY format" */
export const getShortDate = (unformatted) => {
	const formatted = moment(unformatted).format('L'); 
	return formatted;
}

/** Returns the date in the "MM/DD/YYYY format" */
export const getCustomShortDate = (unformatted) => {
	const formatted = moment(unformatted).format('MM/YY'); 
	return formatted;
}

export const getYear = (unformatted) => {
	const year = moment(unformatted).format("Y");
	return year;
}

export const formatPhoneNumber = (unformatted) => {
	const areaCode = unformatted.slice(0, 3);
	const first = unformatted.slice(3, 6);
	const second = unformatted.slice(6);
	const formatted = "+1 (" + areaCode + ") " + first + "-" + second;
	return formatted;
};

export const capitalize = (unformatted) => {
	const first = unformatted.slice(0,1);
	const remainder = unformatted.slice(1);
	const formatted = first.toUpperCase() + remainder;
	return formatted;
}