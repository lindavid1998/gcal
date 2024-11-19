/**
 * Adds card to stack
 * @returns {ActionResponse}
 */
function addCardToStack(card) {
	var nav = CardService.newNavigation().pushCard(card);
	return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

/**
 *  Pop a card from the stack.
 *  @return {ActionResponse}
 */
function gotoPreviousCard() {
	var nav = CardService.newNavigation().popCard();
	return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

/**
 *  Return to the initial add-on card.
 *  @return {ActionResponse}
 */
function gotoRootCard() {
	var nav = CardService.newNavigation().popToRoot();
	return CardService.newActionResponseBuilder().setNavigation(nav).build();
}
