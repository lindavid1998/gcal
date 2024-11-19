/**
 *
 * @param {String} status
 * @returns {CardService.Card} The card to show to the user.
 */
function createStatusCard(status) {
	const cardHeader = CardService.newCardHeader()
		.setTitle('Status')
		.setSubtitle(status);

	const footer = createFooter();

	const card = CardService.newCardBuilder()
		.setHeader(cardHeader)
		.setFixedFooter(footer);

	return card.build();
}

/**
 * Create a footer
 * @returns {FixedFooter}
 */
function createFooter() {
	const url = 'https://github.com/lindavid1998';
	const button = CardService.newTextButton()
		.setText('David Lin 2024')
		.setOpenLink(CardService.newOpenLink().setUrl(url));

	return CardService.newFixedFooter().setPrimaryButton(button);
}

function createEventsCard() {
	const eventIds = getClickedEventIds();

	const header = CardService.newCardHeader().setTitle('Events to Move');

	const card = CardService.newCardBuilder().setHeader(header);

	for (const eventId of eventIds) {
		const section = CardService.newCardSection();
		const textParagraph = CardService.newTextParagraph().setText(eventId);

		section.addWidget(textParagraph);
		card.addSection(section);
	}

	const buttonSet = createEventsCardButtonSet();
	const btnSection = CardService.newCardSection().addWidget(buttonSet);
	card.addSection(btnSection);

	const footer = createFooter();
	card.setFixedFooter(footer);

	return card.build();
}

function createEventsCardButtonSet() {
	const textToCallback = {
		'Clear': 'clearClickedEventIds',
		'Move': 'moveClickedEvents',
	};

	// create button set
	const buttonSet = CardService.newButtonSet();

	for (const [text, callback] of Object.entries(textToCallback)) {
		let action = CardService.newAction().setFunctionName(callback);
		let button = CardService.newTextButton()
			.setText(text)
			.setOnClickAction(action);
		buttonSet.addButton(button);
	}

	return buttonSet;
}
