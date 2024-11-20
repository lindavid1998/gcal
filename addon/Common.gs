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
	const message =
		'Instructions: Set duration below. Then click on event to move';

	const cardHeader = CardService.newCardHeader()
		.setTitle('Homepage')
		.setSubtitle(message);

	// add card body with text input
	const validation = CardService.newValidation().setInputType(
		CardService.InputType.INTEGER
	);

	const input = CardService.newTextInput()
		.setFieldName('duration')
		.setTitle('Enter duration in minutes')
		.setHint('Default is 30 minutes')
		.setValue('30')
		.setValidation(validation);

	const section = CardService.newCardSection()
		.setHeader('Section header')
		.addWidget(input);

	const footer = createFooter();

	const card = CardService.newCardBuilder()
		.setHeader(cardHeader)
		.addSection(section)
		.setFixedFooter(footer);

	return card.build();
}
