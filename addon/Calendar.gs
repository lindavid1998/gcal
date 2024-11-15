/**
 * Callback for rendering the card for a specific Calendar event.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onCalendarEventOpen(e) {
	var calendar = CalendarApp.getCalendarById(e.calendar.calendarId);
	// The event metadata doesn't include the event's title, so using the
	// calendar.readonly scope and fetching the event by it's ID.
	// var event = calendar.getEventById(e.calendar.id);
	addToClickedEventIds(e.calendar.id);

	return createTextCard(userProperties.getProperty('clickedEventIds'));
}

/**
 * Get array of clicked event IDs
 * @return {Array}
 */
function getClickedEventIds() {
	var eventIds = userProperties.getProperty('clickedEventIds');
	return eventIds ? JSON.parse(eventIds) : [];
}

/**
 * Add eventId to array of clicked event IDs
 * @param {string} eventId The event ID.
 * @return None
 */
function addToClickedEventIds(eventId) {
	var currentIds = getClickedEventIds();

	if (!currentIds.includes(eventId)) {
		currentIds.push(eventId);
	}
	userProperties.setProperty('clickedEventIds', JSON.stringify(currentIds));
}

function clearClickedEventIds() {
	userProperties.deleteProperty('clickedEventIds');
}

async function patchEvent(eventPatch, eventId, calendarId = 'primary') {
	// TO DO
	// const request = gapi.client.calendar.events.patch({
	// 	calendarId: calendarId,
	// 	eventId: eventId,
	// 	resource: eventPatch,
	// });

	// await request.execute((jsonResp) => {
	// 	if (jsonResp.error) {
	// 		console.error('Patch error: ', jsonResp.message);
	// 	} else {
	// 		console.log('Patched event');
	// 	}
	// });
}

function moveClickedEvents() {
	// TODO
	// var eventIds = getClickedEventIds();
	// for (const eventId of eventIds) {
	// 	try {
	// 		// const [start, end] = await getStartEnd(eventId);

	// 		// newStartDatetime = shiftDateTime(start, minutes);
	// 		// newEndDatetime = shiftDateTime(end, minutes);

	// 		const eventPatch = {
	// 			start: {
	// 				dateTime: '2024-11-07T16:30:00-08:00',
	// 			},
	// 			// end: {
	// 			// 	dateTime: newEndDatetime,
	// 			// },
	// 		};

	// 		patchEvent(eventId, eventPatch);
	// 	} catch (error) {
	// 		console.error('Failed to retrieve start and end times:', error);
	// 	}
	// }
}
