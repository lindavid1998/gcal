const { DateTime, Duration } = Luxon; // import the Luxon library

var userProperties = PropertiesService.getUserProperties();

const CALENDAR_ID = 'primary';

/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
	console.log(e);

	if (!userProperties.getProperty('duration')) {
		userProperties.setProperty('duration', '30');
	}

	const message = `In the text box below, set the desired duration
		to shift events by and click Save. Enter whole minutes only. Negative
		values are permitted and will move events back. When ready, click on
		the events in calendar to move`;

	const cardHeader = CardService.newCardHeader()
		.setTitle('Instructions')
		.setSubtitle(message);

	// add card body with text input
	const validation = CardService.newValidation().setInputType(
		CardService.InputType.INTEGER
	);

	let action = CardService.newAction().setFunctionName('setDuration');
	let button = CardService.newTextButton()
		.setText('Save')
		.setOnClickAction(action);

	const input = CardService.newTextInput()
		.setFieldName('duration')
		.setTitle('Duration (Units: minutes)')
		.setHint(`Current setting: ${userProperties.getProperty('duration')}`)
		.setValue(userProperties.getProperty('duration'))
		.setValidation(validation);

	const section = CardService.newCardSection()
		.addWidget(input)
		.addWidget(button);

	const footer = createFooter();

	const card = CardService.newCardBuilder()
		.setHeader(cardHeader)
		.addSection(section)
		.setFixedFooter(footer);

	return card.build();
}

/**
 * Updates duration property with form data and reloads the root card
 * @param e - event
 * @returns {CardService.ActionResponse}
 */
function setDuration(e) {
	const minutes = e.formInput.duration;
	userProperties.setProperty('duration', minutes);

	return CardService.newActionResponseBuilder()
		.setNavigation(
			CardService.newNavigation().popToRoot().updateCard(onHomepage(e))
		)
		.build();
}
