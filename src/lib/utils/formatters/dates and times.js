import moment from 'moment';

/** Returns a date in the format June 24, 2022 */
export const getCalendarDate = (unformatted) => {
	return moment(unformatted).format('LL'); 
}

/** Returns a time in the format 2:40 PM */
export const getAbbreviatedTime = (unformatted) => {
    return moment(unformatted).format('LT');
}