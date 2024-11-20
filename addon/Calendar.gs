/**
 * Callback for rendering the card for a specific Calendar event.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onCalendarEventOpen(e) {
	const calendarId = e.calendar.calendarId;
	const eventId = e.calendar.id;
	if (!eventId) {
		return;
	}
	const minutes = 30;

	return moveEvent(eventId, minutes, calendarId);
}

function moveEvent(eventId, minutes, calendarId) {
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
		console.log(response);
	} catch (error) {
		console.error(error);
		const statusCard = createStatusCard(
			`Error ${error.details.code}: ${error.details.message}`
		);
		return addCardToStack(statusCard);
	}

	const statusCard = createStatusCard('Success');
	return addCardToStack(statusCard);
}
