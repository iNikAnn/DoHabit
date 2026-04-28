/**
 * Formats a Date object into "YYYY-MM-DD" or "YYYY-MM-DD HH:mm".
 */

interface Options {
	includeTime?: boolean;
}

function getFormattedDate(date: Date, options?: Options): string {
	const {
		includeTime
	} = options ?? {};

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	const datePart = `${year}-${month}-${day}`;

	if (includeTime) {
		const timePart = date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		});

		return `${datePart} ${timePart}`;
	}

	return datePart;
}

export default getFormattedDate;