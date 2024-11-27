/**
 *
 * @param {String} status
 * @returns {CardService.Card} The card to show to the user.
 */
function createStatusCard(status, message) {
	const section = CardService.newCardSection();

	const styledTitle = CardService.newTextParagraph().setText(
		`<b>${status}</b>`
	);
	section.addWidget(styledTitle);

	const text = CardService.newTextParagraph().setText(message);
	section.addWidget(text);

	const footer = createFooter();
	const card = CardService.newCardBuilder()
		.addSection(section)
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
