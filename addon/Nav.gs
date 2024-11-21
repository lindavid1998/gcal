/**
 * Adds card to stack
 * @returns {ActionResponse}
 */
function addCardToStack(card) {
	var nav = CardService.newNavigation().pushCard(card);
	return CardService.newActionResponseBuilder().setNavigation(nav).build();
}
