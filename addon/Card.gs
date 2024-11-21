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
