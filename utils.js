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
  return new Promise((resolve, reject) => {
    const request = gapi.client.calendar.events.get({
      calendarId: 'primary',
      eventId: eventId,
    });

    request.execute((resp) => {
      if (resp.error) {
        reject(resp.message);
      } else {
        start = resp.start.dateTime;
        end = resp.end.dateTime;
        resolve([start, end])
      }
    });
  })
};

const patchEvent = async (eventId, eventPatch, calendarId = 'primary') => {
	const request = gapi.client.calendar.events.patch({
		calendarId: calendarId,
		eventId: eventId,
		resource: eventPatch,
	});

	await request.execute((jsonResp) => {
		if (jsonResp.error) {
			console.error('Patch error: ', jsonResp.message);
		} else {
			console.log('Patched event');
		}
	});
};

module.exports = {
  shiftDateTime,
  getStartEnd,
  patchEvent
}