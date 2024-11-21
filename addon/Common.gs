const { DateTime, Duration } = Luxon; // import the Luxon library

var userProperties = PropertiesService.getUserProperties();
// userProperties.setProperty('duration', '30');

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
		values are permitted and will move events back.`;

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
		.setValue('30')
		.setValidation(validation);

	const section = CardService.newCardSection()
		// .setHeader('Section header')
		.addWidget(input)
		.addWidget(button);

	const footer = createFooter();

	const card = CardService.newCardBuilder()
		.setHeader(cardHeader)
		.addSection(section)
		.setFixedFooter(footer);

	return card.build();
}

function setDuration(e) {
	const minutes = e.formInput.duration;
	userProperties.setProperty('duration', minutes);

	return CardService.newActionResponseBuilder()
		.setNavigation(
			CardService.newNavigation().popToRoot().updateCard(onHomepage(e))
		)
		.build();
}
