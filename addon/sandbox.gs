/**
 * Lists 10 upcoming events in the user's calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 */
function listUpcomingEvents() {
	const calendarId = 'primary';

	// Add query parameters in optionalArgs
	const optionalArgs = {
		timeMin: new Date().toISOString(),
		showDeleted: false,
		singleEvents: true,
		maxResults: 10,
		orderBy: 'startTime',
		// use other optional query parameter here as needed.
	};

	try {
		// call Events.list method to list the calendar events using calendarId optional query parameter
		const response = Calendar.Events.list(calendarId, optionalArgs);
		const events = response.items;
		if (events.length === 0) {
			console.log('No upcoming events found');
			return;
		}

		// Print the calendar events
		for (const event of events) {
			let when = event.start.dateTime;
			if (!when) {
				when = event.start.date;
			}
			console.log('%s (%s)', event.summary, when);
		}
	} catch (err) {
		// Handle exception from Calendar API
		console.log('Failed with error %s', err.message);
	}
}

const { DateTime, Duration } = Luxon;

function main() {
	const now = DateTime.now();
	console.log(now.toISO()); // ISO 8601 format

	console.log(DateTime.fromISO('2017-05-15')); //=> May 15, 2017 at midnight
	console.log(DateTime.fromISO('2017-05-15T08:30:00')); //=> May 15, 2017 at 8:30
}