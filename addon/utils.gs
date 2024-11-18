/*
Return a new ISO 8601 datetime string that is shifted by minutes
Maintains timezone offset of the input datetime
*/
const shiftDateTime = (datetime, minutes) => {
	// convert datetime string to Date object
	const dt = DateTime.fromISO(datetime, { setZone: true });

	// add minutes to Date object
	const dur = Duration.fromObject({ minutes: minutes });
	const newDt = dt.plus(dur);

	// return new datetime
	return newDt.toISO({ suppressMilliseconds: true });
};

/*
Get start and end datetimes for an eventId
*/
const getStartEnd = (eventId, calendarId) => {
	try {
		const response = Calendar.Events.get(calendarId, eventId);

		const start = response.start.dateTime;
		const end = response.end.dateTime;

		return [start, end];
	} catch (error) {
		console.log(error);
	}
};
