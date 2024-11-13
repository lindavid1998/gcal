// const moment = require('moment');
const { DateTime, Duration } = require('luxon');

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
const getStartEnd = async (eventId) => {
	const request = gapi.client.calendar.events.get({
		calendarId: 'primary',
		eventId: eventId,
	});

	let start;
	let end;

	await request.execute((resp) => {
		if (resp.error) {
			console.error(resp.message);
		} else {
			start = resp.start.dateTime;
			end = resp.end.dateTime;
		}
	});

	return [start, end]
};

module.exports = {
  shiftDateTime,
  getStartEnd
}