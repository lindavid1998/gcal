/**
 * This simple Google Workspace Add-on shows a random image of a cat in the
 * sidebar. When opened manually (the homepage card), some static text is
 * overlayed on the image, but when contextual cards are opened a new cat image
 * is shown with the text taken from that context (such as a message's subject
 * line) overlaying the image. There is also a button that updates the card with
 * a new random cat image.
 *
 * Click "File > Make a copy..." to copy the script, and "Publish > Deploy from
 * manifest > Install add-on" to install it.
 */

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
	var hour = Number(Utilities.formatDate(new Date(), e.userTimezone.id, 'H'));
	var message;
	if (hour >= 6 && hour < 12) {
		message = 'Good morning';
	} else if (hour >= 12 && hour < 18) {
		message = 'Good afternoon';
	} else {
		message = 'Good night';
	}
	message += ' ' + e.hostApp;
	return createTextCard(message);
}

/**
 * Creates a card with plain text
 * @param {String} text The text to overlay on the image.
 * @return {CardService.Card} The assembled card.
 */
function createTextCard(text) {
	const textParagraph = CardService.newTextParagraph().setText(text);

	// Create a footer to be shown at the bottom.
	var footer = CardService.newFixedFooter().setPrimaryButton(
		CardService.newTextButton()
			.setText('David Lin 2024')
			.setOpenLink(
				CardService.newOpenLink().setUrl('https://github.com/lindavid1998')
			)
	);

	// Add button to clear clicked event IDs
	const clearAction = CardService.newAction().setFunctionName(
		'clearClickedEventIds'
	);
	var clearBtn = CardService.newTextButton()
		.setText('Clear clicked events')
		.setOnClickAction(clearAction);

	// Add button to move clicked event IDs
	const moveAction =
		CardService.newAction().setFunctionName('moveClickedEvents');
	var moveBtn = CardService.newTextButton()
		.setText('Move clicked events')
		.setOnClickAction(moveAction);

	// Assemble the widgets and return the card.
	var section = CardService.newCardSection()
		.addWidget(textParagraph)
		.addWidget(clearBtn)
		.addWidget(moveBtn);
	var card = CardService.newCardBuilder()
		.addSection(section)
		.setFixedFooter(footer);

	return card.build();
}
