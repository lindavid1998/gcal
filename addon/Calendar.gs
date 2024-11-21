/**
 * Callback for rendering the card for a specific Calendar event.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onCalendarEventOpen(e) {
	console.log(e);
	const calendarId = e.calendar.calendarId;
	const eventId = e.calendar.id;
	if (!eventId) {
		return;
	}
	const minutes = userProperties.getProperty('duration');
	console.log('Moving event by', minutes);

	return moveEvent(eventId, minutes, calendarId);
}

function moveEvent(eventId, minutes, calendarId) {
	let status;
	let message;

	if (typeof minutes != Number) {
		minutes = Number(minutes);
	}

	try {
		const [start, end] = getStartEnd(eventId, calendarId);

		const eventPatch = {
			start: {
				dateTime: shiftDateTime(start, minutes),
			},
			end: {
				dateTime: shiftDateTime(end, minutes),
			},
		};

		const response = Calendar.Events.patch(eventPatch, CALENDAR_ID, eventId);
		status = 'SUCCESS';
		message =
			'Event successfully moved. Page may need to be reloaded to see changes.';
		console.log(response);
	} catch (error) {
		console.error(error);
		status = 'ERROR';
		message = `${error.details.code}: ${error.details.message}`;
	}

	const statusCard = createStatusCard(status, message);
	return addCardToStack(statusCard);
}
