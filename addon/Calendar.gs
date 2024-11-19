/**
 * Callback for rendering the card for a specific Calendar event.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onCalendarEventOpen(e) {
	var calendar = CalendarApp.getCalendarById(e.calendar.calendarId);
	addToClickedEventIds(e.calendar.id);

	return createEventsCard();
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

function moveClickedEvents() {
	const minutes = Number(userProperties.getProperty('minutesToShift'));
	var eventIds = getClickedEventIds();

	for (const eventId of eventIds) {
		try {
			const [start, end] = getStartEnd(eventId, CALENDAR_ID);

			const eventPatch = {
				start: {
					dateTime: shiftDateTime(start, minutes),
				},
				end: {
					dateTime: shiftDateTime(end, minutes),
				},
			};

			const response = Calendar.Events.patch(eventPatch, CALENDAR_ID, eventId);
			console.log(response);
		} catch (error) {
			console.error(error);
			// return createStatusCard('Error', error);
		}
	}

	clearClickedEventIds();

	// show success message
	// createStatusCard('Success', 'Events moved');
}
