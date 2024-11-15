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
	return createCatCard(message, true);
}

/**
 * Creates a card with an image of a cat, overlayed with the text.
 * @param {String} text The text to overlay on the image.
 * @param {Boolean} isHomepage True if the card created here is a homepage;
 *      false otherwise. Defaults to false.
 * @return {CardService.Card} The assembled card.
 */
function createCatCard(text, isHomepage) {
	// Explicitly set the value of isHomepage as false if null or undefined.
	if (!isHomepage) {
		isHomepage = false;
	}

	// Use the "Cat as a service" API to get the cat image. Add a "time" URL
	// parameter to act as a cache buster.
	var now = new Date();
	// Replace forward slashes in the text, as they break the CataaS API.
	var caption = text.replace(/\//g, ' ');
	var imageUrl = Utilities.formatString(
		'https://cataas.com/cat/says/%s?time=%s',
		encodeURIComponent(caption),
		now.getTime()
	);
	var image = CardService.newImage().setImageUrl(imageUrl).setAltText('Meow');

	// Create a footer to be shown at the bottom.
	var footer = CardService.newFixedFooter().setPrimaryButton(
		CardService.newTextButton()
			.setText('David Lin 2024')
			.setOpenLink(
				CardService.newOpenLink().setUrl('https://github.com/lindavid1998')
			)
	);

	// Assemble the widgets and return the card.
	var section = CardService.newCardSection().addWidget(image);
	var card = CardService.newCardBuilder()
		.addSection(section)
		.setFixedFooter(footer);

	if (!isHomepage) {
		// Create the header shown when the card is minimized,
		// but only when this card is a contextual card. Peek headers
		// are never used by non-contexual cards like homepages.
		var peekHeader = CardService.newCardHeader()
			.setTitle('Contextual Cat')
			.setImageUrl(
				'https://www.gstatic.com/images/icons/material/system/1x/pets_black_48dp.png'
			)
			.setSubtitle(text);
		card.setPeekCardHeader(peekHeader);
	}

	return card.build();
}
