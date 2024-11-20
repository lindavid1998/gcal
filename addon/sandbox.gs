/**
 * Lists 10 upcoming events in the user's calendar.
 * @see https://developers.google.com/calendar/api/v3/reference/events/list
 */
function listUpcomingEvents() {
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
		const response = Calendar.Events.list(CALENDAR_ID, optionalArgs);
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

/**
 * How to use the Luxon library:
 */
function luxon() {
	const now = DateTime.now();
	console.log(now.toISO()); // ISO 8601 format

	console.log(DateTime.fromISO('2017-05-15')); //=> May 15, 2017 at midnight
	console.log(DateTime.fromISO('2017-05-15T08:30:00')); //=> May 15, 2017 at 8:30
}

/**
 * Move list of events by 30 minutes
 */
function main() {
	const eventIds = ['6nr0ojsrtuj6tp80tsj0m1nfce', '63o1vlqbpgq6oe8g4bjnmass9s'];
	const calendarId = 'primary';
	const minutes = 30;

	for (const eventId of eventIds) {
		try {
			// const response = Calendar.Events.get(calendarId, eventId);
			const [start, end] = getStartEnd(eventId, calendarId);

			newStartDatetime = shiftDateTime(start, minutes);
			newEndDatetime = shiftDateTime(end, minutes);

			console.log(start, end);
			console.log(newStartDatetime, newEndDatetime);

			const eventPatch = {
				start: {
					dateTime: newStartDatetime,
				},
				end: {
					dateTime: newEndDatetime,
				},
			};

			const response = Calendar.Events.patch(eventPatch, calendarId, eventId);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
}

/** How to patch an event:
const eventPatch = {
	start: {
		dateTime: '2024-11-14T14:30:00-08:00',
	},
};
const eventId = '1k3k3h3bqsk8soiks7cbp39pps';
const calendarId = 'primary';

const response = Calendar.Events.patch(eventPatch, calendarId, eventId);
 */

/** 
 * Response object returned from patch method
{ sequence: 4,
  start: 
   { timeZone: 'America/Los_Angeles',
     dateTime: '2024-11-17T07:00:00-08:00' },
  iCalUID: '6nr0ojsrtuj6tp80tsj0m1nfce@google.com',
  creator: { self: true, email: 'lindavid1998@gmail.com' },
  status: 'confirmed',
  end: 
   { timeZone: 'America/Los_Angeles',
     dateTime: '2024-11-17T08:00:00-08:00' },
  organizer: { self: true, email: 'lindavid1998@gmail.com' },
  htmlLink: 'https://www.google.com/calendar/event?eid=Nm5yMG9qc3J0dWo2dHA4MHRzajBtMW5mY2UgbGluZGF2aWQxOTk4QG0',
  updated: '2024-11-18T00:56:10.719Z',
  summary: 'test1',
  created: '2024-11-18T00:07:58.000Z',
  etag: '"3463782741438000"',
  id: '6nr0ojsrtuj6tp80tsj0m1nfce',
  reminders: { useDefault: true },
  kind: 'calendar#event',
  eventType: 'default' }
*/