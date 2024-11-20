const { DateTime, Duration } = Luxon; // import the Luxon library

var userProperties = PropertiesService.getUserProperties();
userProperties.setProperty('minutesToShift', '30');

const CALENDAR_ID = 'primary';

/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
	console.log(e);
	const message = 'Instructions: Click on event to move by 30 minutes';

	const cardHeader = CardService.newCardHeader()
		.setTitle('Homepage')
		.setSubtitle(message);
	
	const footer = createFooter();

	const card = CardService.newCardBuilder()
		.setHeader(cardHeader)
		.setFixedFooter(footer);

	return card.build();
}
